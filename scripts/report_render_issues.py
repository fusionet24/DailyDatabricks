#!/usr/bin/env python3
"""Raise (or revive) a GitHub issue for each finding from the render log.

One ticket per distinct problem, keyed by the fingerprint the parser assigns and
embedded in the issue body as an HTML comment. A finding whose fingerprint is
already tracked never opens a second ticket: an open issue is left alone, and a
closed one is reopened with a note pointing at the run that brought it back.

Issues are deliberately never auto-closed. Quarto's freeze cache means an
unchanged document is not re-rendered, so a warning missing from one run is not
evidence that it was fixed.

Usage:  report_render_issues.py findings.json [--dry-run]
"""

import argparse
import json
import os
import re
import subprocess
import sys

MARKER_LABEL = "render-issue"
FINGERPRINT = re.compile(r"<!--\s*render-issue-fingerprint:\s*(?P<fp>\S+)\s*-->")
TITLE_LIMIT = 100


def gh(*args, **kwargs):
    """Run a gh command, returning stdout."""
    return subprocess.run(
        ["gh", *args], check=True, capture_output=True, text=True, **kwargs
    ).stdout


def tracked_issues():
    """Map fingerprint -> issue, for every issue this workflow has ever filed."""
    raw = gh(
        "issue", "list",
        "--label", MARKER_LABEL,
        "--state", "all",
        "--limit", "500",
        "--json", "number,state,title,body",
    )
    tracked = {}
    for issue in json.loads(raw or "[]"):
        match = FINGERPRINT.search(issue.get("body") or "")
        if match:
            tracked[match.group("fp")] = issue
    return tracked


def build_title(finding):
    title = f"[render] {finding['document']}: {finding['message']}"
    if len(title) > TITLE_LIMIT:
        title = title[: TITLE_LIMIT - 1].rstrip() + "…"
    return title


def build_body(finding, run_url):
    document = finding["document"]
    source = f"site/{document}" if document != "(site)" else "site/"
    occurrences = finding["occurrences"]
    plural = "" if occurrences == 1 else "s"
    return f"""\
Raised automatically by the **Validate Site and Deploy** workflow while rendering the site.

| | |
|---|---|
| Document | `{document}` |
| Severity | {finding['severity']} |
| Occurrences in that run | {occurrences} time{plural} |

### Message

```
{finding['message']}
```

### Reproduce locally

```bash
quarto render "{source}"
```

Source run: {run_url}

<!-- render-issue-fingerprint: {finding['fingerprint']} -->
"""


def summarise(lines):
    summary_path = os.environ.get("GITHUB_STEP_SUMMARY")
    text = "\n".join(lines)
    print(text)
    if summary_path:
        with open(summary_path, "a", encoding="utf-8") as handle:
            handle.write(text + "\n")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("findings", help="JSON produced by parse_render_log.py")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="report what would be filed without touching GitHub",
    )
    args = parser.parse_args()

    with open(args.findings, encoding="utf-8") as handle:
        findings = json.load(handle)

    server = os.environ.get("GITHUB_SERVER_URL", "https://github.com")
    repository = os.environ.get("GITHUB_REPOSITORY", "")
    run_id = os.environ.get("GITHUB_RUN_ID", "")
    run_url = f"{server}/{repository}/actions/runs/{run_id}" if run_id else "(local run)"

    if not findings:
        summarise(["## Render diagnostics", "", "No warnings or errors. ✅"])
        return 0

    tracked = {} if args.dry_run else tracked_issues()
    lines = [
        "## Render diagnostics",
        "",
        f"{len(findings)} distinct problem(s) found."
        + (" _Dry run - no issues were filed._" if args.dry_run else ""),
        "",
        "| Severity | Document | Problem | Action |",
        "|---|---|---|---|",
    ]

    for finding in findings:
        fingerprint = finding["fingerprint"]
        title = build_title(finding)
        existing = tracked.get(fingerprint)

        if args.dry_run:
            action = "would file"
        elif existing and existing["state"].upper() == "OPEN":
            action = f"already open (#{existing['number']})"
        elif existing:
            number = str(existing["number"])
            gh("issue", "reopen", number,
               "--comment", f"This recurred in {run_url}.")
            action = f"reopened (#{number})"
        else:
            url = gh(
                "issue", "create",
                "--title", title,
                "--body", build_body(finding, run_url),
                "--label", MARKER_LABEL,
                "--label", f"render-{finding['severity']}",
                "--label", "automated",
            ).strip()
            action = f"filed ({url.rsplit('/', 1)[-1] if url else 'new'})"

        cell = finding["message"].replace("|", "\\|")
        if len(cell) > 80:
            cell = cell[:79].rstrip() + "…"
        lines.append(
            f"| {finding['severity']} | `{finding['document']}` | {cell} | {action} |"
        )

    summarise(lines)
    return 0


if __name__ == "__main__":
    sys.exit(main())
