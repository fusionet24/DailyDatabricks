---
description: Write a new DailyDatabricks tip from the latest uncovered Databricks release note, with carousel and PR
argument-hint: "[release notes URL | feature name | empty to pick the newest uncovered feature]"
---

Write and ship a new DailyDatabricks tip, end to end.

Target: $ARGUMENTS

If no target is given above, use the current month's Azure Databricks platform
release notes: https://learn.microsoft.com/en-us/azure/databricks/release-notes/product/2026/august
(adjust the year and month in that URL to the current date).

Follow the `write-tip` skill for all voice, structure, and style decisions.
Read it before drafting.

## 1. Pick the feature

Check existing coverage first so you do not repeat a post:

```
ls site/tips/**/*.qmd
```

Also check merged and open PRs, since a post may be written but not yet merged.

Choose the most recent release-note entry that has a genuinely demonstrable
code example. This constraint matters more than recency: a feature that is
purely a UI toggle or a connector announcement produces a post that restates
the release note, which is exactly what the site is not for. If the newest
entry cannot carry a runnable example, take the next one that can, and say in
your summary why you skipped past it.

## 2. Verify against the primary docs

Follow the release note through to the actual documentation page and confirm
the details there — syntax, prerequisites, runtime requirements, supported
compute, and limitations. Release notes omit the things that decide whether an
example runs. Do not write from the blurb alone.

## 3. Write the post

Create `site/tips/<Category>/<PascalCaseName>.qmd` following the `write-tip`
skill. Create a new category directory if the topic warrants one.

## 4. Add the short link

Add a `/s/<slug>` route to `site/staticwebapp.config.json` redirecting to the
post's rendered path with status 301, matching the existing entries.

## 5. Generate the LinkedIn carousel

List the post's code blocks, then pick the ones that best carry the idea —
usually the core usage and the block that proves the boundary or the failure
case, not the setup boilerplate:

```
python scripts/generate_carousel.py "site/tips/<Category>/<Name>.qmd" --list-code
python scripts/generate_carousel.py "site/tips/<Category>/<Name>.qmd" --code-index <N> <M>
```

Copy the result to `carrousels/<Name>.pdf`. The generator needs `pillow` and
`pyyaml`. Without `assets/fonts/` present it falls back to DejaVu, which
changes the typeface but not the layout — note that if it happens.

## 6. Verify before committing

- Confirm the YAML front matter parses.
- Confirm `site/staticwebapp.config.json` is still valid JSON.
- Render the carousel slides and actually look at them before shipping.
- If you changed anything under `scripts/`, regenerate a couple of existing
  posts' carousels to check you have not broken them.

## 7. Commit, push, and raise the PR

Work on a branch cut fresh from the latest `origin/main`. Push with
`git push -u origin <branch>`. Open a PR describing the feature chosen, why it
was chosen, what the working example demonstrates, and any generator changes.

Finally, draft one paragraph of LinkedIn copy for the post, in the same voice:
open on the problem, land the mechanism, name the gotcha, close with the short
link.
