#!/usr/bin/env python3
"""Publish a carousel PDF to the DailyDatabricks LinkedIn page.

Driven by a manifest file (``social/<slug>/LinkedIn.md``) whose YAML
frontmatter names the PDF and the source post, and whose body is the
approved post copy.

Two modes:

    validate  parse the manifest and check every referenced file and limit.
              Runs on the pull request so reviewers approve something known
              to be publishable. Never touches the network.

    post      refresh the access token, upload the PDF as a LinkedIn
              document, and publish it to the organization page.

Usage:
    python scripts/linkedin_post.py validate social/transactions/LinkedIn.md
    python scripts/linkedin_post.py post social/transactions/LinkedIn.md [--dry-run]

Environment (post mode only):
    LINKEDIN_CLIENT_ID        LinkedIn developer app client id
    LINKEDIN_CLIENT_SECRET    LinkedIn developer app client secret
    LINKEDIN_REFRESH_TOKEN    refresh token for a page admin (12 month life)
    LINKEDIN_ORGANIZATION_ID  numeric id of the DailyDatabricks page
    LINKEDIN_API_VERSION      optional, YYYYMM, defaults to DEFAULT_API_VERSION
    SITE_BASE_URL             optional, defaults to https://dailydatabricks.tips
"""

import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent

DEFAULT_SITE_BASE_URL = "https://dailydatabricks.tips"
# LinkedIn versions the REST API monthly and supports each version for a year.
# Bump this when it nears expiry; the API returns 426 when it has lapsed.
DEFAULT_API_VERSION = "202506"

# LinkedIn's own limits, checked up front so a bad manifest fails on the PR
# rather than halfway through publishing.
MAX_COMMENTARY_CHARS = 3000
MAX_DOCUMENT_TITLE_CHARS = 100
MAX_PDF_BYTES = 100 * 1024 * 1024
MAX_PDF_PAGES = 300

VALID_VISIBILITY = {"PUBLIC", "LOGGED_IN"}

# The Posts API takes commentary in LinkedIn's "little text" format, where
# these characters carry markup meaning and must be backslash escaped.
ESCAPE_CHARS = r"\|{}@[]()<>#*_~"

URL_PLACEHOLDER = "{{url}}"


class ManifestError(Exception):
    """A manifest that cannot be published as written."""


# ---------------------------------------------------------------------------
# manifest
# ---------------------------------------------------------------------------


def split_frontmatter(text, source):
    """Return (frontmatter dict, body) from a markdown file with YAML frontmatter."""
    if not text.startswith("---"):
        raise ManifestError(f"{source}: expected YAML frontmatter starting with '---'")

    match = re.match(r"^---\s*\n(.*?)\n---\s*\n?(.*)$", text, re.DOTALL)
    if not match:
        raise ManifestError(f"{source}: frontmatter is not closed with a '---' line")

    try:
        frontmatter = yaml.safe_load(match.group(1)) or {}
    except yaml.YAMLError as exc:
        raise ManifestError(f"{source}: frontmatter is not valid YAML: {exc}") from exc

    if not isinstance(frontmatter, dict):
        raise ManifestError(f"{source}: frontmatter must be a mapping of keys to values")

    return frontmatter, match.group(2)


def post_url_from_qmd(qmd_path, base_url):
    """Map a Quarto source path to its published canonical URL.

    site/tips/Unity Catalog/Transactions.qmd
        -> https://dailydatabricks.tips/tips/Unity%20Catalog/Transactions.html

    An index.qmd resolves to its containing directory, which is how Quarto
    links to it from the site itself.
    """
    path = Path(qmd_path)
    parts = list(path.parts)
    if parts and parts[0] == "site":
        parts = parts[1:]
    if not parts:
        raise ManifestError(f"post: '{qmd_path}' does not point inside site/")

    stem = Path(parts[-1]).stem
    if stem == "index":
        parts = parts[:-1]
        trailing = "/"
    else:
        parts[-1] = stem + ".html"
        trailing = ""

    encoded = "/".join(urllib.parse.quote(part) for part in parts)
    return f"{base_url.rstrip('/')}/{encoded}{trailing}"


def escape_commentary(text):
    r"""Escape little-text control characters, leaving hashtags clickable.

    Every character in ESCAPE_CHARS is escaped, except a '#' that opens a
    hashtag (``#databricks``) — escaping those would render them as literal
    text instead of linking them.
    """
    out = []
    for index, char in enumerate(text):
        if char == "#":
            following = text[index + 1] if index + 1 < len(text) else ""
            if following.isalnum() or following == "_":
                out.append(char)
                continue
        if char in ESCAPE_CHARS:
            out.append("\\")
        out.append(char)
    return "".join(out)


def count_pdf_pages(pdf_bytes):
    """Best effort page count. Returns None when the structure is unreadable."""
    pages = len(re.findall(rb"/Type\s*/Page[^s]", pdf_bytes))
    return pages or None


def load_manifest(manifest_path, base_url):
    """Read and fully validate a manifest, returning everything needed to post."""
    manifest_path = Path(manifest_path)
    if not manifest_path.is_file():
        raise ManifestError(f"{manifest_path}: no such file")

    frontmatter, body = split_frontmatter(
        manifest_path.read_text(encoding="utf-8"), manifest_path
    )

    for key in ("pdf", "post", "document_title"):
        if not frontmatter.get(key):
            raise ManifestError(f"{manifest_path}: frontmatter is missing required key '{key}'")

    pdf_path = REPO_ROOT / str(frontmatter["pdf"])
    if not pdf_path.is_file():
        raise ManifestError(f"{manifest_path}: pdf '{frontmatter['pdf']}' does not exist")
    if pdf_path.suffix.lower() != ".pdf":
        raise ManifestError(f"{manifest_path}: pdf '{frontmatter['pdf']}' is not a .pdf file")

    pdf_bytes = pdf_path.read_bytes()
    if len(pdf_bytes) > MAX_PDF_BYTES:
        raise ManifestError(
            f"{manifest_path}: pdf is {len(pdf_bytes) / 1_048_576:.1f}MB, "
            f"over LinkedIn's {MAX_PDF_BYTES // 1_048_576}MB limit"
        )
    pages = count_pdf_pages(pdf_bytes)
    if pages and pages > MAX_PDF_PAGES:
        raise ManifestError(
            f"{manifest_path}: pdf has {pages} pages, over LinkedIn's {MAX_PDF_PAGES} page limit"
        )

    post_path = REPO_ROOT / str(frontmatter["post"])
    if not post_path.is_file():
        raise ManifestError(f"{manifest_path}: post '{frontmatter['post']}' does not exist")

    url = frontmatter.get("url") or post_url_from_qmd(str(frontmatter["post"]), base_url)

    document_title = str(frontmatter["document_title"]).strip()
    if len(document_title) > MAX_DOCUMENT_TITLE_CHARS:
        raise ManifestError(
            f"{manifest_path}: document_title is {len(document_title)} characters, "
            f"over LinkedIn's {MAX_DOCUMENT_TITLE_CHARS} character limit"
        )

    visibility = str(frontmatter.get("visibility", "PUBLIC")).upper()
    if visibility not in VALID_VISIBILITY:
        raise ManifestError(
            f"{manifest_path}: visibility '{visibility}' must be one of "
            f"{', '.join(sorted(VALID_VISIBILITY))}"
        )

    commentary = body.strip()
    if not commentary:
        raise ManifestError(f"{manifest_path}: the post copy (body below the frontmatter) is empty")

    if URL_PLACEHOLDER in commentary:
        commentary = commentary.replace(URL_PLACEHOLDER, url)
    elif url not in commentary:
        commentary = f"{commentary}\n\n{url}"

    if len(commentary) > MAX_COMMENTARY_CHARS:
        raise ManifestError(
            f"{manifest_path}: post copy is {len(commentary)} characters after adding the "
            f"link, over LinkedIn's {MAX_COMMENTARY_CHARS} character limit"
        )

    return {
        "manifest": manifest_path,
        "pdf_path": pdf_path,
        "pdf_bytes": pdf_bytes,
        "pdf_pages": pages,
        "post_path": post_path,
        "url": url,
        "document_title": document_title,
        "visibility": visibility,
        "commentary": commentary,
    }


# ---------------------------------------------------------------------------
# LinkedIn API
# ---------------------------------------------------------------------------


def request_json(url, method="GET", headers=None, data=None):
    """Issue a request and return (parsed body or None, response headers)."""
    req = urllib.request.Request(url, method=method, data=data, headers=headers or {})
    try:
        with urllib.request.urlopen(req) as response:
            raw = response.read()
            payload = json.loads(raw) if raw else None
            return payload, dict(response.headers)
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", "replace")
        raise RuntimeError(f"{method} {url} failed with HTTP {exc.code}: {detail}") from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(f"{method} {url} failed: {exc.reason}") from exc


def refresh_access_token(client_id, client_secret, refresh_token):
    """Trade the long-lived refresh token for a fresh access token."""
    body = urllib.parse.urlencode(
        {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
            "client_id": client_id,
            "client_secret": client_secret,
        }
    ).encode()
    payload, _ = request_json(
        "https://www.linkedin.com/oauth/v2/accessToken",
        method="POST",
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        data=body,
    )
    token = (payload or {}).get("access_token")
    if not token:
        raise RuntimeError("token refresh returned no access_token")
    return token


def api_headers(access_token, api_version):
    return {
        "Authorization": f"Bearer {access_token}",
        "LinkedIn-Version": api_version,
        "X-Restli-Protocol-Version": "2.0.0",
        "Content-Type": "application/json",
    }


def initialize_document_upload(access_token, api_version, owner_urn):
    """Reserve a document slot and get the URL to PUT the bytes to."""
    body = json.dumps({"initializeUploadRequest": {"owner": owner_urn}}).encode()
    payload, _ = request_json(
        "https://api.linkedin.com/rest/documents?action=initializeUpload",
        method="POST",
        headers=api_headers(access_token, api_version),
        data=body,
    )
    value = (payload or {}).get("value") or {}
    upload_url = value.get("uploadUrl")
    document_urn = value.get("document")
    if not upload_url or not document_urn:
        raise RuntimeError(f"initializeUpload returned an unexpected body: {payload}")
    return upload_url, document_urn


def upload_document(upload_url, access_token, pdf_bytes):
    req = urllib.request.Request(
        upload_url,
        method="PUT",
        data=pdf_bytes,
        headers={
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/octet-stream",
        },
    )
    try:
        with urllib.request.urlopen(req) as response:
            if response.status not in (200, 201):
                raise RuntimeError(f"document upload returned HTTP {response.status}")
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", "replace")
        raise RuntimeError(f"document upload failed with HTTP {exc.code}: {detail}") from exc


def create_post(access_token, api_version, owner_urn, document_urn, manifest):
    body = json.dumps(
        {
            "author": owner_urn,
            "commentary": escape_commentary(manifest["commentary"]),
            "visibility": manifest["visibility"],
            "distribution": {
                "feedDistribution": "MAIN_FEED",
                "targetEntities": [],
                "thirdPartyDistributionChannels": [],
            },
            "content": {
                "media": {
                    "id": document_urn,
                    "title": manifest["document_title"],
                }
            },
            "lifecycleState": "PUBLISHED",
            "isReshareDisabledByAuthor": False,
        }
    ).encode("utf-8")

    _, headers = request_json(
        "https://api.linkedin.com/rest/posts",
        method="POST",
        headers=api_headers(access_token, api_version),
        data=body,
    )
    post_urn = headers.get("x-restli-id") or headers.get("X-RestLi-Id")
    if not post_urn:
        raise RuntimeError("post was created but LinkedIn returned no post id header")
    return post_urn


# ---------------------------------------------------------------------------
# commands
# ---------------------------------------------------------------------------


def describe(manifest):
    pages = manifest["pdf_pages"] or "unknown"
    return "\n".join(
        [
            f"manifest:  {manifest['manifest']}",
            f"pdf:       {manifest['pdf_path'].relative_to(REPO_ROOT)} "
            f"({len(manifest['pdf_bytes']) / 1024:.0f}KB, {pages} pages)",
            f"post:      {manifest['post_path'].relative_to(REPO_ROOT)}",
            f"url:       {manifest['url']}",
            f"title:     {manifest['document_title']}",
            f"visibility:{manifest['visibility']}",
            f"copy:      {len(manifest['commentary'])}/{MAX_COMMENTARY_CHARS} characters",
            "",
            "--- post copy ---",
            manifest["commentary"],
            "--- end ---",
        ]
    )


def command_validate(args):
    base_url = os.environ.get("SITE_BASE_URL", DEFAULT_SITE_BASE_URL)
    failures = 0
    for path in args.manifests:
        try:
            print(describe(load_manifest(path, base_url)))
            print(f"\nOK {path}\n")
        except ManifestError as exc:
            print(f"FAIL {exc}", file=sys.stderr)
            failures += 1
    return 1 if failures else 0


def command_post(args):
    base_url = os.environ.get("SITE_BASE_URL", DEFAULT_SITE_BASE_URL)
    api_version = os.environ.get("LINKEDIN_API_VERSION", DEFAULT_API_VERSION)

    manifest = load_manifest(args.manifest, base_url)
    print(describe(manifest))

    if args.dry_run:
        print("\nDry run — nothing was sent to LinkedIn.")
        return 0

    missing = [
        name
        for name in (
            "LINKEDIN_CLIENT_ID",
            "LINKEDIN_CLIENT_SECRET",
            "LINKEDIN_REFRESH_TOKEN",
            "LINKEDIN_ORGANIZATION_ID",
        )
        if not os.environ.get(name)
    ]
    if missing:
        print(f"Missing required secrets: {', '.join(missing)}", file=sys.stderr)
        return 1

    owner_urn = f"urn:li:organization:{os.environ['LINKEDIN_ORGANIZATION_ID']}"

    print("\nRefreshing access token...")
    access_token = refresh_access_token(
        os.environ["LINKEDIN_CLIENT_ID"],
        os.environ["LINKEDIN_CLIENT_SECRET"],
        os.environ["LINKEDIN_REFRESH_TOKEN"],
    )

    print("Initializing document upload...")
    upload_url, document_urn = initialize_document_upload(access_token, api_version, owner_urn)

    print(f"Uploading {manifest['pdf_path'].name}...")
    upload_document(upload_url, access_token, manifest["pdf_bytes"])

    print("Publishing post...")
    post_urn = create_post(access_token, api_version, owner_urn, document_urn, manifest)
    post_link = f"https://www.linkedin.com/feed/update/{post_urn}"
    print(f"\nPublished: {post_link}")

    if args.output:
        Path(args.output).write_text(
            json.dumps(
                {
                    "post_urn": post_urn,
                    "post_link": post_link,
                    "document_urn": document_urn,
                    "manifest": str(Path(args.manifest)),
                    "article_url": manifest["url"],
                },
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )
    return 0


def main():
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    subparsers = parser.add_subparsers(dest="command", required=True)

    validate = subparsers.add_parser("validate", help="check manifests without posting")
    validate.add_argument("manifests", nargs="+")
    validate.set_defaults(func=command_validate)

    post = subparsers.add_parser("post", help="publish a manifest to LinkedIn")
    post.add_argument("manifest")
    post.add_argument("--dry-run", action="store_true", help="resolve everything but do not post")
    post.add_argument("--output", help="write a JSON receipt of the published post here")
    post.set_defaults(func=command_post)

    args = parser.parse_args()
    try:
        return args.func(args)
    except (ManifestError, RuntimeError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
