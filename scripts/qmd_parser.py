"""Parse .qmd tip files to extract content for social image generation."""

import re
import yaml
from dataclasses import dataclass, field


def strip_inline_markdown(text):
    """Remove inline markdown so text renders cleanly as plain pixels.

    Images cannot render `code`, **bold** or [links](url), so the markers
    would otherwise be drawn literally.
    """
    if not text:
        return text
    # Links and images: keep the label, drop the target.
    text = re.sub(r"!?\[([^\]]*)\]\([^)]*\)", r"\1", text)
    # Bold, italic, and inline code markers.
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"(?<!\*)\*([^*\n]+)\*(?!\*)", r"\1", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    return re.sub(r"[ \t]+", " ", text).strip()


@dataclass
class CodeBlock:
    """A fenced code block, with the heading it sits under."""
    lang: str = ""
    code: str = ""
    heading: str = ""


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
    code_blocks: list = field(default_factory=list)


def _extract_code_blocks(body):
    """Return every fenced code block, tagged with its nearest heading."""
    blocks = []
    heading = ""
    # DOTALL is needed for the code body, so the heading branch must use
    # [^\n]* rather than .* or it would swallow the rest of the document.
    pattern = re.compile(
        r"^(#{1,6})[ \t]+([^\n]*)$|^```[ \t]*(\w+)?[ \t]*\n(.*?)^```",
        re.DOTALL | re.MULTILINE,
    )
    for match in pattern.finditer(body):
        if match.group(1):
            heading = strip_inline_markdown(match.group(2).strip())
        else:
            code = match.group(4).strip()
            if code:
                blocks.append(CodeBlock(
                    lang=(match.group(3) or "text").lower(),
                    code=code,
                    heading=heading,
                ))
    return blocks


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
                tip.description = strip_inline_markdown(fm.get("description", ""))
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

    # Extract every code block, then pick a default (prefer Python).
    tip.code_blocks = _extract_code_blocks(body)
    if tip.code_blocks:
        python_blocks = [b for b in tip.code_blocks if b.lang == "python"]
        default = python_blocks[0] if python_blocks else tip.code_blocks[0]
        tip.code_lang = default.lang
        tip.code_snippet = default.code

    # Extract first callout block text
    callout_match = re.search(
        r'::: \{\.callout-\w+.*?\}\n(.*?)\n:::',
        body,
        re.DOTALL,
    )
    if callout_match:
        tip.callout_text = strip_inline_markdown(callout_match.group(1).strip())

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
        tip.summary_points = [strip_inline_markdown(p.strip()) for p in points]

    return tip
