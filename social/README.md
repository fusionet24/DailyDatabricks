# LinkedIn posts

Carousel PDFs are published to the [DailyDatabricks LinkedIn page][page] by the
`LinkedIn Post` workflow (`.github/workflows/linkedin-post.yml`). The copy is
written and reviewed in the same pull request as the tip and the carousel, so
approving the PR approves the post.

## How it works

1. Add `social/<slug>/LinkedIn.md` to the PR that adds the tip and its carousel.
   Copy `social/TEMPLATE/LinkedIn.md` to start.
2. Every push to the PR validates that manifest — the PDF exists and is within
   LinkedIn's limits, the post exists, the URL resolves, the copy fits in 3000
   characters — and prints the fully resolved post to the run summary. Reviewers
   approve exactly what will go out.
3. Add the **`linkedin`** label to the PR.
4. Merging the PR publishes it. A `posted.json` receipt is committed next to the
   manifest and the post link is commented back on the PR.

No label means no post: the tip and carousel merge as normal and you can publish
later by running the workflow manually.

## The manifest

`social/transactions/LinkedIn.md`:

```markdown
---
pdf: carrousels/Transactions.pdf
post: "site/tips/Unity Catalog/Transactions.qmd"
document_title: "Make multi-table writes all-or-nothing"
---
Three statements. Each one commits on its own...

Full write-up: {{url}}

#databricks #unitycatalog
```

| Key | Required | Meaning |
| --- | --- | --- |
| `pdf` | yes | Carousel PDF, path relative to the repository root. |
| `post` | yes | Quarto source of the tip. The canonical URL is derived from it. |
| `document_title` | yes | Title on the document card. Max 100 characters. |
| `visibility` | no | `PUBLIC` (default) or `LOGGED_IN`. |
| `url` | no | Overrides the derived URL. |

The body is the post copy, published verbatim. `{{url}}` is replaced with the
canonical URL; if the placeholder is absent and the URL is not already in the
copy, it is appended as a final line.

### How the URL is derived

The `post` path maps to the published page, so the post links to the long
canonical URL rather than a redirect:

```
site/tips/Unity Catalog/Transactions.qmd
  -> https://dailydatabricks.tips/tips/Unity%20Catalog/Transactions.html

site/Tutorials/TellR-GettingStarted/index.qmd
  -> https://dailydatabricks.tips/Tutorials/TellR-GettingStarted/
```

Set the `SITE_BASE_URL` repository variable to change the base.

## Checking a manifest locally

```bash
pip install pyyaml
python scripts/linkedin_post.py validate social/transactions/LinkedIn.md
```

This prints the resolved PDF, URL and final copy without touching the network.
To exercise the whole path without publishing:

```bash
python scripts/linkedin_post.py post social/transactions/LinkedIn.md --dry-run
```

## One-time setup

### 1. Create the LinkedIn app

1. At <https://www.linkedin.com/developers/apps> create an app and associate it
   with the DailyDatabricks company page. You must be a page admin.
2. On the **Products** tab request **Community Management API**. Approval gates
   posting as an organization, and is the step that takes time.
3. On the **Auth** tab note the Client ID and Client Secret, and add a redirect
   URL you can capture a code on (`http://localhost:8000/callback` is fine).

### 2. Get a refresh token

Authorize with the scopes `w_organization_social` and `r_organization_social`:

```
https://www.linkedin.com/oauth/v2/authorization
  ?response_type=code
  &client_id=<CLIENT_ID>
  &redirect_uri=http://localhost:8000/callback
  &scope=w_organization_social%20r_organization_social
```

Approve, then exchange the `code` from the redirect for tokens:

```bash
curl -X POST https://www.linkedin.com/oauth/v2/accessToken \
  -d grant_type=authorization_code \
  -d code=<CODE> \
  -d redirect_uri=http://localhost:8000/callback \
  -d client_id=<CLIENT_ID> \
  -d client_secret=<CLIENT_SECRET>
```

Keep the `refresh_token`. Access tokens last 60 days and the workflow mints a
fresh one on every run, so only the refresh token needs storing — but it expires
after 12 months, so this has to be repeated once a year.

### 3. Find the organization id

It is the numeric id in the page's admin URL:
`https://www.linkedin.com/company/<id>/admin/`.

### 4. Add the secrets

Repository → Settings → Secrets and variables → Actions:

| Secret | Value |
| --- | --- |
| `LINKEDIN_CLIENT_ID` | App client id |
| `LINKEDIN_CLIENT_SECRET` | App client secret |
| `LINKEDIN_REFRESH_TOKEN` | Refresh token from step 2 |
| `LINKEDIN_ORGANIZATION_ID` | Numeric page id from step 3 |

Optional repository *variables*:

| Variable | Default | Purpose |
| --- | --- | --- |
| `SITE_BASE_URL` | `https://dailydatabricks.tips` | Base for canonical URLs. |
| `LINKEDIN_API_VERSION` | `202506` | LinkedIn REST version, `YYYYMM`. |

### 5. Create the label

Create a `linkedin` label on the repository. Without it, nothing publishes.

## Notes

- **Publishing is irreversible.** Merging a labelled PR posts immediately, with
  no second approval step. The validation output on the PR is the last chance to
  read the copy before it goes out.
- **Re-runs are safe.** The `posted.json` receipt next to a manifest means it has
  already been published; the workflow skips it. To deliberately repost, delete
  the receipt.
- **Forked PRs cannot publish.** Secrets are unavailable to `pull_request` runs
  from forks, so the post step fails rather than posting.
- **LinkedIn versions expire.** Each `LinkedIn-Version` is supported for about a
  year. A `426` from the API means bump the `LINKEDIN_API_VERSION` variable.
- **PDF limits.** 100MB and 300 pages; both are checked during validation.

[page]: https://www.linkedin.com/company/dailydatabricks/
