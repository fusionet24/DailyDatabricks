"""Parse .qmd tip files to extract content for social image generation."""

import re
import yaml
from dataclasses import dataclass, field


@dataclass
class TipContent:
    """Structured content extracted from a .qmd tip file."""
    title: str = ""
    description: str = ""
    categories: list = field(default_factory=list)
    tags: list = field(default_factory=list)
    date_modified: str = ""
    image: str = ""
    code_lang: str = ""
    code_snippet: str = ""
    callout_text: str = ""
    summary_points: list = field(default_factory=list)


def parse_qmd(filepath):
    """Parse a .qmd file and return a TipContent dataclass."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    tip = TipContent()

    # Parse YAML frontmatter
    fm_match = re.match(r"^---\n(.*?)\n---", content, re.DOTALL)
    if fm_match:
        try:
            fm = yaml.safe_load(fm_match.group(1))
            if fm:
                tip.title = fm.get("title", "")
                tip.description = fm.get("description", "")
                tip.date_modified = fm.get("date-modified", "")
                tip.image = fm.get("image", "")

                cats = fm.get("categories", [])
                if isinstance(cats, list):
                    tip.categories = cats
                elif isinstance(cats, str):
                    tip.categories = [c.strip() for c in cats.split(",")]

                tags = fm.get("tags", [])
                if isinstance(tags, list):
                    tip.tags = tags
                elif isinstance(tags, str):
                    tip.tags = [t.strip() for t in tags.split(",")]
        except yaml.YAMLError:
            pass

    body = content[fm_match.end():] if fm_match else content

    # Extract first code block (prefer Python, then any)
    code_blocks = re.findall(
        r"```\s*(\w+)?\n(.*?)```",
        body,
        re.DOTALL,
    )
    if code_blocks:
        # Prefer Python blocks
        python_blocks = [(lang, code) for lang, code in code_blocks
                         if lang and lang.lower() == "python"]
        if python_blocks:
            tip.code_lang, tip.code_snippet = python_blocks[0]
        else:
            tip.code_lang = code_blocks[0][0] or "text"
            tip.code_snippet = code_blocks[0][1]
        tip.code_snippet = tip.code_snippet.strip()

    # Extract first callout block text
    callout_match = re.search(
        r'::: \{\.callout-\w+.*?\}\n(.*?)\n:::',
        body,
        re.DOTALL,
    )
    if callout_match:
        tip.callout_text = callout_match.group(1).strip()

    # Extract summary bullet points
    summary_match = re.search(
        r'## Summary\n\n((?:-\s+.*\n?)+)',
        body,
    )
    if not summary_match:
        summary_match = re.search(
            r'# Summary\n\n((?:-\s+.*\n?)+)',
            body,
        )
    if summary_match:
        points = re.findall(r'-\s+(.*)', summary_match.group(1))
        tip.summary_points = [p.strip() for p in points]

    return tip
