#!/usr/bin/env python3
"""Generate social media images from .qmd tip files.

Usage:
    python scripts/generate_social_image.py site/tips/Performance/NOOP.qmd
    python scripts/generate_social_image.py site/tips/Performance/NOOP.qmd --style code_card
    python scripts/generate_social_image.py site/tips/Performance/NOOP.qmd --style statement
    python scripts/generate_social_image.py site/tips/Performance/NOOP.qmd --style split
"""

import argparse
import os
import re
import sys

from PIL import Image, ImageDraw

from brand import (
    RED, CHARCOAL, OFF_WHITE, WARM_GRAY, CODE_BG, WHITE, BLACK,
    SYN_KEYWORD, SYN_STRING, SYN_COMMENT, SYN_DEFAULT,
    SOCIAL_SIZE, FRAME_WIDTH,
    CTA_NEWSLETTER, CTA_SITE,
    font_bold, font_regular, font_mono,
    draw_red_frame, load_and_fit_image, paste_centered,
    load_logo, add_rounded_rect, text_width, wrap_text,
    OUTPUT_DIR,
)
from qmd_parser import parse_qmd, TipContent

W, H = SOCIAL_SIZE


# --- Syntax highlighting (basic) ---

PYTHON_KEYWORDS = {
    "import", "from", "def", "class", "return", "if", "else", "elif",
    "for", "while", "with", "as", "try", "except", "finally", "raise",
    "yield", "lambda", "and", "or", "not", "in", "is", "None", "True",
    "False", "pass", "break", "continue", "global", "nonlocal", "assert",
    "del", "print",
}


def _highlight_line(draw, x, y, line, mono_font):
    """Draw a single line of code with basic syntax highlighting."""
    cursor_x = x

    # Handle comments
    if line.strip().startswith("#"):
        draw.text((cursor_x, y), line, font=mono_font, fill=SYN_COMMENT)
        return
    if line.strip().startswith("--"):
        draw.text((cursor_x, y), line, font=mono_font, fill=SYN_COMMENT)
        return

    # Tokenize by splitting on word boundaries while preserving whitespace
    tokens = re.findall(r'(\s+|"[^"]*"|\'[^\']*\'|\w+|[^\s\w])', line)
    for token in tokens:
        if not token:
            continue
        if (token.startswith('"') and token.endswith('"')) or \
           (token.startswith("'") and token.endswith("'")):
            color = SYN_STRING
        elif token in PYTHON_KEYWORDS:
            color = SYN_KEYWORD
        else:
            color = SYN_DEFAULT
        draw.text((cursor_x, y), token, font=mono_font, fill=color)
        bbox = draw.textbbox((0, 0), token, font=mono_font)
        cursor_x += bbox[2] - bbox[0]


def _truncate_line(line, mono_font, max_w, draw):
    """Truncate a code line to fit within max_w pixels."""
    if not line:
        return line
    bbox = draw.textbbox((0, 0), line, font=mono_font)
    if bbox[2] - bbox[0] <= max_w:
        return line
    # Binary search for the right length
    lo, hi = 0, len(line)
    while lo < hi:
        mid = (lo + hi + 1) // 2
        test = line[:mid] + "..."
        bbox = draw.textbbox((0, 0), test, font=mono_font)
        if bbox[2] - bbox[0] <= max_w:
            lo = mid
        else:
            hi = mid - 1
    return line[:lo] + "..." if lo < len(line) else line


def _draw_code_block(draw, canvas, code, x, y, max_w, max_h, code_font_size=22, min_h=None):
    """Draw a syntax-highlighted code block with dark background."""
    padding = 24
    mono = font_mono(code_font_size)
    text_area_w = max_w - padding * 2

    lines = code.split("\n")
    # Truncate long lines
    lines = [_truncate_line(l, mono, text_area_w, draw) for l in lines]

    # Limit lines to fit
    line_h = code_font_size + 8
    max_lines = (max_h - padding * 2) // line_h
    if len(lines) > max_lines:
        lines = lines[:max_lines - 1] + ["..."]

    block_h = len(lines) * line_h + padding * 2
    if min_h and block_h < min_h:
        block_h = min_h
    block_h = min(block_h, max_h)
    block_w = max_w

    # Draw rounded rect background
    add_rounded_rect(draw, [x, y, x + block_w, y + block_h], 12, CODE_BG)

    # Draw each line with highlighting
    text_y = y + padding
    for line in lines:
        _highlight_line(draw, x + padding, text_y, line, mono)
        text_y += line_h

    return block_h


# --- Option A: Code Card ---

def generate_code_card(tip, theme="light"):
    """Generate a Code Card social image (Option A)."""
    bg = OFF_WHITE if theme == "light" else CHARCOAL
    title_color = CHARCOAL if theme == "light" else WHITE
    desc_color = WARM_GRAY if theme == "light" else WARM_GRAY
    brand_color = CHARCOAL if theme == "light" else WARM_GRAY

    canvas = Image.new("RGB", (W, H), bg)
    draw = ImageDraw.Draw(canvas)
    draw_red_frame(draw, W, H)

    margin = FRAME_WIDTH + 48
    content_w = W - margin * 2

    # Pre-calculate content heights to center everything
    code = tip.code_snippet or "# No code snippet found"
    code_lines = code.split("\n")
    code_line_h = 30
    code_padding = 24
    code_block_h = min(len(code_lines) * code_line_h + code_padding * 2, 400)
    code_block_h = max(code_block_h, 100)

    title_font = font_bold(48)
    title_text = tip.title.upper()
    title_lines = wrap_text(title_text, title_font, content_w, draw)[:3]
    title_h = len(title_lines) * 56

    desc_font = font_regular(26)
    desc_lines = wrap_text(tip.description, desc_font, content_w, draw)[:2]
    desc_h = len(desc_lines) * 34

    # Fixed elements: logo bar (56) + separator (27) + CTA (52)
    fixed_h = 56 + 27 + 52
    content_h = fixed_h + title_h + 16 + code_block_h + 24 + desc_h

    # Distribute remaining vertical space
    available = H - FRAME_WIDTH * 2 - content_h
    top_pad = max(40, available // 3)  # bias content upward slightly

    y = FRAME_WIDTH + top_pad

    # Logo + brand name
    logo = load_logo("tip", max_height=48)
    canvas.paste(logo.convert("RGB") if logo.mode != "RGBA" else logo,
                 (margin, y),
                 logo if logo.mode == "RGBA" else None)
    brand_f = font_bold(20)
    draw.text((margin + logo.width + 12, y + 14),
              "DAILY DATABRICKS", font=brand_f, fill=brand_color)
    y += 56

    # Red separator
    draw.rectangle([margin, y, margin + 60, y + 3], fill=RED)
    y += 27

    # Title
    for line in title_lines:
        draw.text((margin, y), line, font=title_font, fill=title_color)
        y += 56
    y += 16

    # Code block
    code_h = _draw_code_block(draw, canvas, code, margin, y, content_w, 400, min_h=100)
    y += code_h + 24

    # Description
    for line in desc_lines:
        draw.text((margin, y), line, font=desc_font, fill=desc_color)
        y += 34

    # CTA bar at bottom
    cta_y = H - FRAME_WIDTH - 52
    cta_font = font_bold(22)
    cta = f"{CTA_NEWSLETTER}  |  {CTA_SITE}"
    cta_w = text_width(draw, cta, cta_font)
    draw.text(((W - cta_w) // 2, cta_y), cta, font=cta_font, fill=RED)

    return canvas


# --- Option B: Statement Card ---

def generate_statement_card(tip, theme="light"):
    """Generate a Statement Card social image (Option B)."""
    # Statement cards are always dark for impact
    bg = CHARCOAL if theme == "light" else BLACK
    canvas = Image.new("RGB", (W, H), bg)
    draw = ImageDraw.Draw(canvas)
    draw_red_frame(draw, W, H)

    margin = FRAME_WIDTH + 60
    content_w = W - margin * 2

    # Title - large, centered, white
    title_font = font_bold(64)
    title_text = tip.title.upper()
    title_lines = wrap_text(title_text, title_font, content_w, draw)

    # Calculate vertical centering
    line_h = 76
    total_title_h = len(title_lines[:4]) * line_h
    # Center the title block with some upward bias
    title_start_y = (H - total_title_h) // 2 - 80

    y = title_start_y
    for line in title_lines[:4]:
        lw = text_width(draw, line, title_font)
        draw.text(((W - lw) // 2, y), line, font=title_font, fill=WHITE)
        y += line_h

    # Red separator
    y += 20
    sep_w = 80
    draw.rectangle([(W - sep_w) // 2, y, (W + sep_w) // 2, y + 4], fill=RED)
    y += 32

    # Description
    desc_font = font_regular(28)
    desc_lines = wrap_text(tip.description, desc_font, content_w, draw)
    for line in desc_lines[:3]:
        lw = text_width(draw, line, desc_font)
        draw.text(((W - lw) // 2, y), line, font=desc_font, fill=WARM_GRAY)
        y += 38

    # Logo at bottom
    logo = load_logo("tip", max_height=44)
    paste_centered(canvas, logo, H - FRAME_WIDTH - 100)

    # CTA
    cta_y = H - FRAME_WIDTH - 48
    cta_font = font_bold(20)
    cta = f"{CTA_NEWSLETTER}  |  {CTA_SITE}"
    cta_w = text_width(draw, cta, cta_font)
    draw.text(((W - cta_w) // 2, cta_y), cta, font=cta_font, fill=RED)

    return canvas


# --- Option C: Split Card ---

def generate_split_card(tip, theme="light"):
    """Generate a Split Card social image (Option C)."""
    canvas = Image.new("RGB", (W, H), OFF_WHITE if theme == "light" else BLACK)
    draw = ImageDraw.Draw(canvas)

    # Left panel (40%)
    left_w = int(W * 0.40)
    draw.rectangle([0, 0, left_w, H], fill=CHARCOAL)

    # Right panel background
    right_bg = OFF_WHITE if theme == "light" else CODE_BG
    draw.rectangle([left_w, 0, W, H], fill=right_bg)

    # Red frame on top of everything
    draw_red_frame(draw, W, H)

    # Red divider between panels
    draw.rectangle([left_w - 2, FRAME_WIDTH, left_w + 2, H - FRAME_WIDTH], fill=RED)

    # --- Left panel content ---
    left_margin = FRAME_WIDTH + 28
    left_content_w = left_w - left_margin - 20
    y = FRAME_WIDTH + 48

    # Title
    title_font = font_bold(38)
    title_lines = wrap_text(tip.title.upper(), title_font, left_content_w, draw)
    for line in title_lines[:5]:
        draw.text((left_margin, y), line, font=title_font, fill=WHITE)
        y += 46

    # Red separator
    y += 16
    draw.rectangle([left_margin, y, left_margin + 50, y + 3], fill=RED)
    y += 28

    # Description
    desc_font = font_regular(22)
    desc_lines = wrap_text(tip.description, desc_font, left_content_w, draw)
    for line in desc_lines[:6]:
        draw.text((left_margin, y), line, font=desc_font, fill=WARM_GRAY)
        y += 30

    # Logo and CTA at bottom of left panel
    logo = load_logo("tip", max_height=36)
    paste_centered(canvas, logo, H - FRAME_WIDTH - 100, x_center=left_w // 2)

    cta_font = font_regular(16)
    cta1 = CTA_NEWSLETTER
    cta2 = CTA_SITE
    cta1_w = text_width(draw, cta1, cta_font)
    cta2_w = text_width(draw, cta2, cta_font)
    draw.text(((left_w - cta1_w) // 2, H - FRAME_WIDTH - 56),
              cta1, font=cta_font, fill=RED)
    draw.text(((left_w - cta2_w) // 2, H - FRAME_WIDTH - 36),
              cta2, font=cta_font, fill=RED)

    # --- Right panel: code block ---
    right_margin = left_w + 24
    right_content_w = W - right_margin - FRAME_WIDTH - 24
    code = tip.code_snippet or "# No code snippet found"

    code_y = FRAME_WIDTH + 48
    code_max_h = H - FRAME_WIDTH * 2 - 96

    # Draw code block on right panel
    if theme == "light":
        _draw_code_block(draw, canvas, code, right_margin, code_y,
                         right_content_w, code_max_h, code_font_size=18)
    else:
        # Dark theme: code directly on CODE_BG background
        mono = font_mono(18)
        text_area_w = right_content_w - 32
        lines = code.split("\n")
        lines = [_truncate_line(l, mono, text_area_w, draw) for l in lines]
        line_h = 26
        max_lines = code_max_h // line_h
        for i, line in enumerate(lines[:max_lines]):
            _highlight_line(draw, right_margin + 16, code_y + i * line_h, line, mono)

    return canvas


# --- Option D: Hero Card ---

def generate_hero_card(tip, theme="light"):
    """Generate a Hero Card with bold red banner across top third.

    The magazine-cover scroll-stopper. The red becomes a dominant
    surface instead of just a frame -- commands attention in any feed.
    """
    canvas = Image.new("RGB", (W, H), CHARCOAL if theme == "light" else BLACK)
    draw = ImageDraw.Draw(canvas)

    # Red banner across top ~30%
    banner_h = 320
    draw.rectangle([0, 0, W, banner_h], fill=RED)

    # Title on the red banner - white, large, left-aligned with padding
    margin = 72
    content_w = W - margin * 2
    title_font = font_bold(56)
    title_text = tip.title.upper()
    title_lines = wrap_text(title_text, title_font, content_w, draw)

    # Vertically center title within the banner
    line_h = 66
    total_title_h = min(len(title_lines), 4) * line_h
    y = (banner_h - total_title_h) // 2

    for line in title_lines[:4]:
        draw.text((margin, y), line, font=title_font, fill=WHITE)
        y += line_h

    # Below banner: content area on dark background
    y = banner_h + 40

    # Logo + brand name
    logo = load_logo("tip", max_height=40)
    canvas.paste(logo.convert("RGB") if logo.mode != "RGBA" else logo,
                 (margin, y),
                 logo if logo.mode == "RGBA" else None)
    brand_f = font_bold(18)
    draw.text((margin + logo.width + 10, y + 10),
              "DAILY DATABRICKS", font=brand_f, fill=WARM_GRAY)
    y += 56

    # Code block if available
    code = tip.code_snippet
    if code and len(code) > 10:
        code_h = _draw_code_block(draw, canvas, code, margin, y,
                                  content_w, 340, code_font_size=20, min_h=80)
        y += code_h + 24

    # Description
    desc_font = font_regular(26)
    desc_lines = wrap_text(tip.description, desc_font, content_w, draw)
    remaining = H - y - 80
    max_lines = max(1, remaining // 36)
    for line in desc_lines[:max_lines]:
        draw.text((margin, y), line, font=desc_font, fill=WARM_GRAY)
        y += 36

    # CTA at bottom
    cta_y = H - 52
    cta_font = font_bold(20)
    cta = f"{CTA_NEWSLETTER}  |  {CTA_SITE}"
    cta_w = text_width(draw, cta, cta_font)
    draw.text(((W - cta_w) // 2, cta_y), cta, font=cta_font, fill=RED)

    # Red frame wraps everything (on top of banner)
    draw_red_frame(draw, W, H)

    return canvas


# --- Option E: Number Card ---

def generate_number_card(tip, theme="light"):
    """Generate a Number Card with giant numeral as hero element.

    Perfect for series content (Part 1 of 4), listicles, or creating
    FOMO. The big number is the visual hook that stops the scroll.
    """
    bg = CHARCOAL if theme == "light" else BLACK
    canvas = Image.new("RGB", (W, H), bg)
    draw = ImageDraw.Draw(canvas)
    draw_red_frame(draw, W, H)

    margin = FRAME_WIDTH + 60
    content_w = W - margin * 2

    # Extract a number from the title or use "01"
    import re as _re
    num_match = _re.search(r'Part\s*(\d+)', tip.title, _re.IGNORECASE)
    if not num_match:
        num_match = _re.search(r'(\d+)', tip.title)
    number_text = num_match.group(1).zfill(2) if num_match else "01"

    # Giant number - semi-transparent feel via warm gray outline
    num_font = font_bold(220)
    num_w = text_width(draw, number_text, num_font)
    num_x = (W - num_w) // 2
    num_y = FRAME_WIDTH + 60

    # Draw number in red
    draw.text((num_x, num_y), number_text, font=num_font, fill=RED)

    y = num_y + 240

    # Title below number - white, centered
    title_font = font_bold(52)
    title_text = tip.title.upper()
    title_lines = wrap_text(title_text, title_font, content_w, draw)

    for line in title_lines[:3]:
        lw = text_width(draw, line, title_font)
        draw.text(((W - lw) // 2, y), line, font=title_font, fill=WHITE)
        y += 62

    # Red separator
    y += 16
    sep_w = 80
    draw.rectangle([(W - sep_w) // 2, y, (W + sep_w) // 2, y + 4], fill=RED)
    y += 32

    # Subtitle / description
    desc_font = font_regular(26)
    desc_lines = wrap_text(tip.description, desc_font, content_w, draw)
    for line in desc_lines[:3]:
        lw = text_width(draw, line, desc_font)
        draw.text(((W - lw) // 2, y), line, font=desc_font, fill=WARM_GRAY)
        y += 36

    # Logo at bottom
    logo = load_logo("tip", max_height=44)
    paste_centered(canvas, logo, H - FRAME_WIDTH - 100)

    # CTA
    cta_y = H - FRAME_WIDTH - 48
    cta_font = font_bold(20)
    cta = f"{CTA_NEWSLETTER}  |  {CTA_SITE}"
    cta_w = text_width(draw, cta, cta_font)
    draw.text(((W - cta_w) // 2, cta_y), cta, font=cta_font, fill=RED)

    return canvas


# --- Option F: Pullquote Card ---

def generate_pullquote_card(tip, theme="light"):
    """Generate an editorial Pull Quote card.

    Leads with a key insight in large quotation marks -- the
    thought-leadership play. Positions the brand as authoritative,
    not just informational. Think magazine editorial opening.
    """
    bg = OFF_WHITE if theme == "light" else CHARCOAL
    text_color = CHARCOAL if theme == "light" else WHITE
    quote_mark_color = RED

    canvas = Image.new("RGB", (W, H), bg)
    draw = ImageDraw.Draw(canvas)
    draw_red_frame(draw, W, H)

    margin = FRAME_WIDTH + 72
    content_w = W - margin * 2

    # Pull quote text - use callout, first summary point, or description
    quote_text = ""
    if tip.summary_points:
        quote_text = tip.summary_points[0]
    elif tip.callout_text:
        quote_text = tip.callout_text
    else:
        quote_text = tip.description

    # Pre-calculate heights to vertically center everything
    quote_font_size = font_bold(40)
    quote_lines = wrap_text(quote_text, quote_font_size, content_w - 40, draw)[:5]
    quote_line_h = 52
    quote_h = len(quote_lines) * quote_line_h

    title_font = font_bold(32)
    title_text = tip.title.upper()
    title_lines = wrap_text(title_text, title_font, content_w, draw)[:2]
    title_h = len(title_lines) * 42

    # Total content: logo(50) + open_quote(100) + quote + close_quote(60) + sep(36) + title
    total_content = 50 + 100 + quote_h + 60 + 36 + title_h
    start_y = max(FRAME_WIDTH + 40, (H - total_content) // 2 - 40)

    y = start_y

    # Logo + brand at top
    logo = load_logo("tip", max_height=40)
    canvas.paste(logo.convert("RGB") if logo.mode != "RGBA" else logo,
                 (margin, y),
                 logo if logo.mode == "RGBA" else None)
    brand_f = font_bold(16)
    brand_color = CHARCOAL if theme == "light" else WARM_GRAY
    draw.text((margin + logo.width + 10, y + 10),
              "DAILY DATABRICKS", font=brand_f, fill=brand_color)
    y += 60

    # Opening quotation mark - giant red
    open_quote_font = font_bold(200)
    draw.text((margin - 20, y - 50), "\u201C", font=open_quote_font, fill=quote_mark_color)
    y += 100

    # Quote text
    for line in quote_lines:
        draw.text((margin + 20, y), line, font=quote_font_size, fill=text_color)
        y += quote_line_h

    # Closing quotation mark - aligned to right edge of quote
    y += 4
    close_font = font_bold(200)
    close_text = "\u201D"
    cw = text_width(draw, close_text, close_font)
    draw.text((margin + content_w - cw + 20, y - 60), close_text,
              font=close_font, fill=quote_mark_color)
    y += 48

    # Red separator
    draw.rectangle([margin, y, margin + 60, y + 4], fill=RED)
    y += 36

    # Title below in smaller text
    for line in title_lines:
        draw.text((margin, y), line, font=title_font, fill=text_color)
        y += 42

    # Logo at bottom
    logo_bottom = load_logo("tip", max_height=36)
    paste_centered(canvas, logo_bottom, H - FRAME_WIDTH - 90)

    # CTA at bottom
    cta_y = H - FRAME_WIDTH - 44
    cta_font = font_bold(18)
    cta = f"{CTA_NEWSLETTER}  |  {CTA_SITE}"
    cta_w = text_width(draw, cta, cta_font)
    draw.text(((W - cta_w) // 2, cta_y), cta, font=cta_font, fill=RED)

    return canvas


# --- Option G: Minimal Card ---

def generate_minimal_card(tip, theme="light"):
    """Generate an ultra-minimal Apple-keynote style card.

    Radical simplicity: huge title, maximum whitespace, single accent.
    This is the anti-information-density play. It stops the scroll
    because it's SO different from every other tech post in the feed.
    """
    bg = OFF_WHITE if theme == "light" else CHARCOAL
    text_color = CHARCOAL if theme == "light" else WHITE
    desc_color = WARM_GRAY

    canvas = Image.new("RGB", (W, H), bg)
    draw = ImageDraw.Draw(canvas)
    draw_red_frame(draw, W, H)

    margin = FRAME_WIDTH + 80
    content_w = W - margin * 2

    # Title - MASSIVE, centered
    title_font = font_bold(80)
    title_text = tip.title.upper()
    title_lines = wrap_text(title_text, title_font, content_w, draw)

    # Center the title block vertically with slight upward bias
    line_h = 92
    total_h = min(len(title_lines), 4) * line_h
    y = (H - total_h) // 2 - 80

    for line in title_lines[:4]:
        lw = text_width(draw, line, title_font)
        draw.text(((W - lw) // 2, y), line, font=title_font, fill=text_color)
        y += line_h

    # Single thin red line - centered
    y += 24
    line_w = 100
    draw.rectangle([(W - line_w) // 2, y, (W + line_w) // 2, y + 3], fill=RED)
    y += 36

    # One short description line - warm gray, centered
    desc_font = font_regular(28)
    # Use a short version of description
    short_desc = tip.description
    if len(short_desc) > 80:
        short_desc = short_desc[:77] + "..."
    desc_w = text_width(draw, short_desc, desc_font)
    if desc_w > content_w:
        desc_lines = wrap_text(short_desc, desc_font, content_w, draw)
        for line in desc_lines[:2]:
            lw = text_width(draw, line, desc_font)
            draw.text(((W - lw) // 2, y), line, font=desc_font, fill=desc_color)
            y += 38
    else:
        draw.text(((W - desc_w) // 2, y), short_desc, font=desc_font, fill=desc_color)

    # Logo at very bottom
    logo = load_logo("tip", max_height=36)
    paste_centered(canvas, logo, H - FRAME_WIDTH - 90)

    # CTA
    cta_y = H - FRAME_WIDTH - 44
    cta_font = font_bold(18)
    cta = f"{CTA_NEWSLETTER}  |  {CTA_SITE}"
    cta_w = text_width(draw, cta, cta_font)
    draw.text(((W - cta_w) // 2, cta_y), cta, font=cta_font, fill=RED)

    return canvas


# --- Option H: Accent Card ---

def generate_accent_card(tip, theme="light"):
    """Generate an asymmetric Accent Card with bold red side panel.

    The left panel is an 80px solid red stripe (not the standard 12px
    frame). This creates a strong asymmetric pull that feels modern
    and deliberately designed. Code + text on the charcoal main area.
    """
    canvas = Image.new("RGB", (W, H), CHARCOAL if theme == "light" else BLACK)
    draw = ImageDraw.Draw(canvas)

    # Bold red accent panel on left (80px wide)
    accent_w = 80
    draw.rectangle([0, 0, accent_w, H], fill=RED)

    # Standard red frame on remaining three sides
    f = FRAME_WIDTH
    draw.rectangle([0, 0, W, f], fill=RED)          # top
    draw.rectangle([0, H - f, W, H], fill=RED)      # bottom
    draw.rectangle([W - f, 0, W, H], fill=RED)       # right

    # Content starts after the accent panel
    margin = accent_w + 48
    content_w = W - margin - f - 48
    y = f + 52

    # Logo + brand
    logo = load_logo("tip", max_height=40)
    canvas.paste(logo.convert("RGB") if logo.mode != "RGBA" else logo,
                 (margin, y),
                 logo if logo.mode == "RGBA" else None)
    brand_f = font_bold(18)
    draw.text((margin + logo.width + 10, y + 10),
              "DAILY DATABRICKS", font=brand_f, fill=WARM_GRAY)
    y += 56

    # Title - white, left-aligned
    title_font = font_bold(48)
    title_text = tip.title.upper()
    title_lines = wrap_text(title_text, title_font, content_w, draw)
    for line in title_lines[:3]:
        draw.text((margin, y), line, font=title_font, fill=WHITE)
        y += 58
    y += 16

    # Code block if available
    code = tip.code_snippet
    if code and len(code) > 10:
        code_h = _draw_code_block(draw, canvas, code, margin, y,
                                  content_w, 320, code_font_size=20, min_h=80)
        y += code_h + 24

    # Description
    desc_font = font_regular(24)
    desc_lines = wrap_text(tip.description, desc_font, content_w, draw)
    remaining = H - y - 80
    max_lines = max(1, remaining // 34)
    for line in desc_lines[:max_lines]:
        draw.text((margin, y), line, font=desc_font, fill=WARM_GRAY)
        y += 34

    # CTA at bottom
    cta_y = H - f - 48
    cta_font = font_bold(20)
    cta = f"{CTA_NEWSLETTER}  |  {CTA_SITE}"
    cta_w = text_width(draw, cta, cta_font)
    draw.text(((W + accent_w - cta_w) // 2, cta_y), cta, font=cta_font, fill=RED)

    return canvas


# --- Auto-detect best style ---

ALL_STYLES = [
    "code_card", "statement", "split",
    "hero", "number", "pullquote", "minimal", "accent",
]

def auto_detect_style(tip):
    """Pick the best style based on tip content."""
    has_code = bool(tip.code_snippet and len(tip.code_snippet) > 10)
    code_lines = tip.code_snippet.count("\n") + 1 if has_code else 0
    has_long_code = code_lines >= 5
    has_long_desc = bool(tip.description and len(tip.description) > 100)

    if has_long_code and has_long_desc:
        return "split"
    elif has_code:
        return "code_card"
    else:
        return "statement"


# --- Main ---

GENERATORS = {
    "code_card": generate_code_card,
    "statement": generate_statement_card,
    "split": generate_split_card,
    "hero": generate_hero_card,
    "number": generate_number_card,
    "pullquote": generate_pullquote_card,
    "minimal": generate_minimal_card,
    "accent": generate_accent_card,
}


def generate(qmd_path, style=None, output_dir=None, themes=("light", "dark")):
    """Generate social images from a .qmd file."""
    tip = parse_qmd(qmd_path)
    if not tip.title:
        print(f"Error: Could not parse title from {qmd_path}")
        sys.exit(1)

    if style is None:
        style = auto_detect_style(tip)

    if style not in GENERATORS:
        print(f"Error: Unknown style '{style}'. Choose from: {', '.join(GENERATORS)}")
        sys.exit(1)

    gen_fn = GENERATORS[style]
    out_dir = output_dir or OUTPUT_DIR
    os.makedirs(out_dir, exist_ok=True)

    # Derive filename from qmd
    basename = os.path.splitext(os.path.basename(qmd_path))[0]

    results = []
    for theme in themes:
        img = gen_fn(tip, theme=theme)
        filename = f"{basename}-{style}-{theme}.png"
        path = os.path.join(out_dir, filename)
        img.save(path, "PNG", quality=95)
        results.append(path)
        print(f"  {theme}: {path}")

    return results


def main():
    parser = argparse.ArgumentParser(
        description="Generate social media images from .qmd tip files."
    )
    parser.add_argument("qmd_file", help="Path to the .qmd tip file")
    parser.add_argument(
        "--style",
        choices=ALL_STYLES,
        default=None,
        help="Image style (auto-detected if not specified)",
    )
    parser.add_argument(
        "--output-dir",
        default=None,
        help="Output directory (default: output/)",
    )
    args = parser.parse_args()

    if not os.path.exists(args.qmd_file):
        print(f"Error: File not found: {args.qmd_file}")
        sys.exit(1)

    print(f"Generating social images for: {args.qmd_file}")
    if args.style:
        print(f"Style: {args.style}")
    else:
        tip = parse_qmd(args.qmd_file)
        detected = auto_detect_style(tip)
        print(f"Auto-detected style: {detected}")

    results = generate(args.qmd_file, style=args.style, output_dir=args.output_dir)
    print(f"\nGenerated {len(results)} images.")


if __name__ == "__main__":
    main()
