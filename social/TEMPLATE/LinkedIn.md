---
# Path to the carousel PDF, relative to the repository root.
pdf: carrousels/YourCarousel.pdf

# Path to the Quarto source of the post this carousel is about. The canonical
# URL is derived from it, so this must be the real published post.
post: "site/tips/Category/YourPost.qmd"

# Title shown on the document card in the feed. Max 100 characters.
document_title: "The headline that appears on the carousel card"

# Optional. PUBLIC (default) or LOGGED_IN.
# visibility: PUBLIC

# Optional. Overrides the URL derived from `post` — only needed if the post
# lives somewhere the path convention does not cover.
# url: https://dailydatabricks.tips/s/your-short-link
---

Everything below the frontmatter is the post copy, published verbatim.

Write it as you want it to read in the feed: blank lines between paragraphs,
no markdown formatting (LinkedIn does not render it), #hashtags stay clickable.

Put {{url}} wherever the link to the full write-up should go. If you leave the
placeholder out entirely, the canonical URL is appended as the last line.

Full write-up: {{url}}

#databricks #dataengineering
