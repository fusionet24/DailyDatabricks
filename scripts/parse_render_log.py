#!/usr/bin/env python3
"""Extract diagnostics from a `quarto render` log and emit them as JSON.

Quarto reports problems on stderr/stdout as it walks the document list, but a
green build hides them: the render succeeds and the warnings scroll away. This
parses the captured log, attributes each diagnostic to the document that was
being rendered at the time, and collapses repeats so the caller can raise one
ticket per distinct problem.

Usage:  parse_render_log.py render.log [--render-failed] > findings.json
"""

import argparse
import hashlib
import json
import re
import sys

ANSI = re.compile(r"\x1b\[[0-9;]*[A-Za-z]")
# "[ 8/30] tips/Notebook/Customcellmagics.qmd" - the document Quarto is on.
DOC = re.compile(r"^\[\s*\d+\s*/\s*\d+\]\s+(?P<path>\S.*?)\s*$")
# "WARN: ...", "WARNING (/opt/quarto/.../main.lua:10090)", "ERROR: ..."
DIAG = re.compile(r"^(?P<sev>WARN|WARNING|ERROR)\b:?\s*(?P<rest>.*)$")
# Quarto embeds its own install paths and line numbers; they churn between
# versions and would otherwise fingerprint as a brand new problem each upgrade.
NOISE = re.compile(r"\((?:/|[A-Za-z]:\\)[^)]*?:\d+\)")

SEVERITY = {"WARN": "warning", "WARNING": "warning", "ERROR": "error"}


def normalise(message):
    """Strip version-dependent detail so the same problem fingerprints alike."""
    message = NOISE.sub("", message)
    message = re.sub(r"\s+", " ", message)
    return message.strip(" :\t")


def parse(lines):
    findings = {}
    current_doc = None
    index = 0

    while index < len(lines):
        line = ANSI.sub("", lines[index]).rstrip()

        doc_match = DOC.match(line)
        if doc_match:
            current_doc = doc_match.group("path")
            index += 1
            continue

        diag_match = DIAG.match(line)
        if not diag_match:
            index += 1
            continue

        severity = SEVERITY[diag_match.group("sev")]
        parts = [diag_match.group("rest").strip()]

        # A Quarto warning header is often bare, with the actual complaint on
        # the following lines. Keep reading until the next document or
        # diagnostic, tolerating the blank line Quarto puts mid-message.
        lookahead = index + 1
        blanks = 0
        while lookahead < len(lines):
            nxt = ANSI.sub("", lines[lookahead]).rstrip()
            if not nxt.strip():
                blanks += 1
                if blanks > 1:
                    break
                lookahead += 1
                continue
            if DOC.match(nxt) or DIAG.match(nxt) or nxt.startswith("Output created:"):
                break
            parts.append(nxt.strip())
            lookahead += 1
        index = lookahead

        message = normalise(" ".join(p for p in parts if p))
        if not message:
            continue

        document = current_doc or "(site)"
        fingerprint = hashlib.sha1(
            f"{document}\n{message}".encode("utf-8")
        ).hexdigest()[:12]

        if fingerprint in findings:
            findings[fingerprint]["occurrences"] += 1
        else:
            findings[fingerprint] = {
                "fingerprint": fingerprint,
                "severity": severity,
                "document": document,
                "message": message,
                "occurrences": 1,
            }

    return list(findings.values())


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("log", help="captured `quarto render` output")
    parser.add_argument(
        "--render-failed",
        action="store_true",
        help="the render itself exited non-zero; ensure that is reported even "
             "if no line matched",
    )
    args = parser.parse_args()

    with open(args.log, encoding="utf-8", errors="replace") as handle:
        findings = parse(handle.read().splitlines())

    if args.render_failed and not any(f["severity"] == "error" for f in findings):
        findings.append({
            "fingerprint": "render-failed",
            "severity": "error",
            "document": "(site)",
            "message": "quarto render exited non-zero without a parseable error "
                       "line; see the workflow log",
            "occurrences": 1,
        })

    findings.sort(key=lambda f: (f["severity"] != "error", f["document"], f["message"]))
    json.dump(findings, sys.stdout, indent=2)
    sys.stdout.write("\n")


if __name__ == "__main__":
    main()
