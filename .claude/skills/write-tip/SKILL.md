---
name: write-tip
description: The DailyDatabricks house writing style and structure for tip posts (site/tips/**/*.qmd). Use this whenever you are writing a new tip, drafting a post from a Databricks release note, editing or reviewing an existing tip, or being asked to match "the usual style", "the house style", or "how the other posts read". Also use it when writing carousel copy or LinkedIn copy for a post, so the voice stays consistent across the site and social. Consult it before writing the first line — the framing rules change how the post opens, not just how it is worded.
---

# Writing a DailyDatabricks tip

The site publishes short, high-signal posts for working Databricks
practitioners. The reader is busy, already competent, and is scanning to find
out whether this thing solves a problem they have. Everything below follows
from that one fact.

The canonical example is `site/tips/Unity Catalog/FineGrainedDMLPrivileges.qmd`.
Read it before writing — it is faster than internalising rules in the abstract.

## Framing: lead with the problem

This is the rule that most changes the finished post, so decide it first.

Open with what was broken, painful, or over-permissioned *before* this feature
existed. The feature is the answer to a question the reader already has. A post
that opens by describing the feature asks the reader to care first and learn
why later, which is backwards for someone scanning.

The title names the outcome or the consequence, not the feature:

- Good: "Grant Write Access Without Handing Over the Schema"
- Bad: "Fine-Grained DML Privileges in Unity Catalog"

The second is what the vendor called it. The first is what the reader wanted.

Assume a working practitioner. Do not explain what Unity Catalog or a Delta
table is. Explain only what is new, non-obvious, or easy to get wrong.

## Voice and grammar

Google developer documentation grammar: second person, active voice, present
tense, imperative mood for instructions.

- Paragraphs run two to four sentences. Longer blocks do not get read.
- No marketing language. Avoid "powerful", "seamlessly", "unlock",
  "game-changer", "in this post we will", "let's dive in". No exclamation marks.
- State facts plainly. When something is a trade-off, name both sides in one
  sentence rather than selling one side.
- Title Case for headings. British spelling ("behaviour", "authorised"),
  matching the rest of the site.

Allow yourself exactly one line of earned judgement per post — a sentence that
tells the reader what this actually means for them:

> The blast radius of a bad deploy is now bounded by the privilege, not by
> review discipline.

One. A second one dilutes the first and starts to read as opinion rather than
insight.

## Structure

1. **YAML front matter** — `title`, `description` (two sentences: what changed,
   then what to do with it), `date-modified` in `DD/MM/YYYY`, `date-format`,
   `categories`, `toc: true`, `toc-title: Navigation`, `tags`, `draft: false`.
2. **`## Summary`** — exactly three bullets, one line each, declarative, with no
   lead-in sentence. Many readers stop here; they should still leave with
   something usable.
3. **`## The Problem With <X>`** — the pain, concretely, in two short paragraphs.
4. **`## Working Example`** — a numbered walkthrough (`### 1. …`, `### 2. …`).
5. **A mapping table** where the detail is combinatorial (operation → required
   privilege, setting → default → recommendation). Tables beat prose lists for
   anything the reader will come back to look up.
6. **A gotchas section** — the one or two behaviours most likely to bite in
   production. This is often the most valuable part of the post, because it is
   the part the vendor documentation buries.
7. **A decision table** — which reader, role, or principal should do which thing.
8. **`## References & Further Reading`** — primary vendor docs, plus the release
   note.

Not every post needs all eight. A post with no combinatorial detail should not
manufacture a table. Keep the opening, the example, and the references.

## The working example

This is what separates a tip from a summary of a release note, so it carries
the most weight.

- **Runnable start to finish**: setup, the feature, then verification. A reader
  should be able to paste it into a notebook and watch it work.
- **Name the scenario.** Use plausible identifiers — `order-loaders`,
  `main.dml_demo.orders` — never `foo`, `my_table`, or `test1`. A named scenario
  carries the reasoning for free: the reader can see *why* someone would grant
  this.
- **Demonstrate the negative case.** Show what fails, not just the happy path.
  Proving where the boundary sits is what makes an example sufficient rather
  than merely illustrative.
- **Let code comments teach.** `-- Fails. Requires DELETE.` /
  `-- Succeeds. Covered by INSERT.` The comments do work that surrounding prose
  would otherwise have to repeat.
- **Include verification.** A `SHOW GRANTS`, a `SELECT`, an expected-output
  block. Without it the reader cannot tell whether their run worked.

## Callouts

Use Quarto callouts sparingly, and only for constraints: Beta or preview
status, minimum runtime version, unsupported compute types, destructive side
effects such as a restart.

```
::: {.callout-important title="Beta" appearance="simple"}
...
:::
```

Never use a callout for emphasis or to restate body text. Callouts work because
they are rare; a post with four of them has none.

## Accuracy

Verify every claim against the primary vendor documentation page, not the
release-note blurb. Release notes routinely omit prerequisites, limitations,
and the interaction rules that decide whether an example actually runs.

Always state, where they apply: preview or Beta status, the minimum Databricks
Runtime version, unsupported compute or access modes, and any path-based,
dialect, or region limitations. A reader who copies an example that cannot run
in their workspace will not come back.

Do not invent verbatim error messages. Describe the failure
("fails with `PERMISSION_DENIED`") rather than quoting output you have not seen.

## Length

Aim for 120–180 lines of `.qmd`. Short and focused beats comprehensive. If the
post is growing past that, it is usually two posts, or it has drifted into
explaining background the reader already has.

## Repo conventions

- Posts live in `site/tips/<Category>/<PascalCaseName>.qmd`. Create the category
  directory if the topic needs a new one.
- Add a short link for the post to `site/staticwebapp.config.json`:
  a `/s/<slug>` route redirecting to `/tips/<Category>/<Name>.html` with status
  301.
- Posts with no executable chunks need no `_freeze` artifacts. CI renders the
  site with Quarto on merge, so do not commit rendered HTML by hand.
- To produce the LinkedIn carousel, see the `scripts/generate_carousel.py`
  usage in the `/new-tip` command, or run it with `--list-code` to choose which
  snippets become slides.
