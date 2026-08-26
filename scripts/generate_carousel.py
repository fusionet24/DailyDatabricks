#!/usr/bin/env python3
"""Generate a LinkedIn carousel PDF from a .qmd tip file.

Slides are: a hook, one slide per selected code block, the Summary bullets,
and a call to action.

Usage:
    python scripts/generate_carousel.py site/tips/Performance/NOOP.qmd
    python scripts/generate_carousel.py site/tips/Performance/NOOP.qmd --list-code
    python scripts/generate_carousel.py site/tips/Performance/NOOP.qmd --code-index 2 5
"""

import argparse
import os
import sys

from PIL import Image, ImageDraw

from brand import (
    RED, CHARCOAL, OFF_WHITE, WARM_GRAY, CODE_BG, WHITE, BLACK,
    SYN_KEYWORD, SYN_STRING, SYN_COMMENT, SYN_DEFAULT,
    CAROUSEL_SIZE, FRAME_WIDTH,
    CTA_NEWSLETTER, CTA_SITE,
    font_bold, font_regular, font_mono,
    draw_red_frame, paste_centered, load_logo,
    add_rounded_rect, text_width, wrap_text,
    OUTPUT_DIR,
    LOGO_BRICKS, LOGO_DATABRICKS_NEWS,
    load_and_fit_image,
)
from qmd_parser import parse_qmd
from generate_social_image import _draw_code_block, _highlight_line

W, H = CAROUSEL_SIZE


def _slide_hook(tip):
    """Slide 1: Bold statement hook (Statement Card style, portrait)."""
    canvas = Image.new("RGB", (W, H), CHARCOAL)
    draw = ImageDraw.Draw(canvas)
    draw_red_frame(draw, W, H)

    margin = FRAME_WIDTH + 60
    content_w = W - margin * 2

    # Title - very large, white, centered
    title_font = font_bold(68)
    title_text = tip.title.upper()
    title_lines = wrap_text(title_text, title_font, content_w, draw)

    line_h = 82
    total_h = len(title_lines[:5]) * line_h
    y = (H - total_h) // 2 - 60

    for line in title_lines[:5]:
        lw = text_width(draw, line, title_font)
        draw.text(((W - lw) // 2, y), line, font=title_font, fill=WHITE)
        y += line_h

    # Red separator
    y += 24
    sep_w = 80
    draw.rectangle([(W - sep_w) // 2, y, (W + sep_w) // 2, y + 4], fill=RED)
    y += 36

    # Description
    desc_font = font_regular(30)
    desc_lines = wrap_text(tip.description, desc_font, content_w, draw)
    for line in desc_lines[:3]:
        lw = text_width(draw, line, desc_font)
        draw.text(((W - lw) // 2, y), line, font=desc_font, fill=WARM_GRAY)
        y += 40

    # Logo at bottom
    logo = load_logo("tip", max_height=50)
    paste_centered(canvas, logo, H - FRAME_WIDTH - 80)

    return canvas


def _fit_code_font_size(draw, code, max_w, max_h, lo=20, hi=40):
    """Pick the largest mono font size where the code fits width and height.

    Short snippets are the common case, so scaling up avoids a small block
    stranded in the middle of a portrait slide.
    """
    lines = code.split("\n")
    longest = max(lines, key=len) if lines else ""
    padding = 24
    for size in range(hi, lo - 1, -1):
        mono = font_mono(size)
        fits_width = text_width(draw, longest, mono) <= max_w - padding * 2
        fits_height = len(lines) * (size + 8) + padding * 2 <= max_h
        if fits_width and fits_height:
            return size
    return lo


def _slide_code(tip, block, show_description=False):
    """Content slide: one code block, titled by the section it came from.

    `show_description` adds the post description under the code. It is used
    on the first code slide only, so later slides do not repeat it.
    """
    canvas = Image.new("RGB", (W, H), OFF_WHITE)
    draw = ImageDraw.Draw(canvas)
    draw_red_frame(draw, W, H)

    margin = FRAME_WIDTH + 48
    content_w = W - margin * 2
    y = FRAME_WIDTH + 40

    # Logo + brand
    logo = load_logo("tip", max_height=44)
    canvas.paste(logo.convert("RGB") if logo.mode != "RGBA" else logo,
                 (margin, y),
                 logo if logo.mode == "RGBA" else None)
    brand_font = font_bold(18)
    draw.text((margin + logo.width + 10, y + 12),
              "DAILY DATABRICKS", font=brand_font, fill=CHARCOAL)
    y += 52

    # Red separator
    draw.rectangle([margin, y, margin + 50, y + 3], fill=RED)
    y += 26

    # Kicker: the post title, so each slide stands alone in the feed
    kicker_font = font_bold(20)
    kicker_lines = wrap_text(tip.title.upper(), kicker_font, content_w, draw)
    for line in kicker_lines[:2]:
        draw.text((margin, y), line, font=kicker_font, fill=RED)
        y += 26
    y += 14

    # Headline: the section heading this code block sits under
    headline = block.heading or tip.title
    title_font = font_bold(46)
    for line in wrap_text(headline, title_font, content_w, draw)[:3]:
        draw.text((margin, y), line, font=title_font, fill=CHARCOAL)
        y += 56
    y += 24

    # Code block, scaled up to use the space that is actually left
    cta_reserve = 90
    available_h = H - y - FRAME_WIDTH - cta_reserve
    desc_font = font_regular(26)
    desc_lines = (
        wrap_text(tip.description, desc_font, content_w, draw)[:4]
        if show_description else []
    )
    desc_h = len(desc_lines) * 34 + (28 if desc_lines else 0)

    code_max_h = available_h - desc_h
    code_size = _fit_code_font_size(draw, block.code, content_w, code_max_h)

    # A wide snippet is capped by line length, not height, so centre whatever
    # slack is left rather than stranding it all below the block.
    n_lines = len(block.code.split("\n"))
    estimated_h = min(n_lines * (code_size + 8) + 48, code_max_h)
    y += max(0, (available_h - estimated_h - desc_h) // 2)

    code_h = _draw_code_block(
        draw, canvas, block.code, margin, y, content_w, code_max_h,
        code_font_size=code_size, lang=block.lang,
    )
    y += code_h + 28

    for line in desc_lines:
        draw.text((margin, y), line, font=desc_font, fill=WARM_GRAY)
        y += 34

    # CTA at bottom
    cta_y = H - FRAME_WIDTH - 48
    cta_font = font_bold(20)
    cta = f"{CTA_NEWSLETTER}  |  {CTA_SITE}"
    cta_w = text_width(draw, cta, cta_font)
    draw.text(((W - cta_w) // 2, cta_y), cta, font=cta_font, fill=RED)

    return canvas


def _slide_summary(tip):
    """Key takeaway slide: the Summary bullets, rendered as bullets."""
    canvas = Image.new("RGB", (W, H), CHARCOAL)
    draw = ImageDraw.Draw(canvas)
    draw_red_frame(draw, W, H)

    margin = FRAME_WIDTH + 60
    content_w = W - margin * 2

    # "Key Takeaway" label
    label_font = font_bold(24)
    label = "KEY TAKEAWAY"
    lw = text_width(draw, label, label_font)
    draw.text(((W - lw) // 2, FRAME_WIDTH + 80), label, font=label_font, fill=RED)

    # Red separator under label
    y_sep = FRAME_WIDTH + 120
    sep_w = 60
    draw.rectangle([(W - sep_w) // 2, y_sep, (W + sep_w) // 2, y_sep + 3], fill=RED)

    text_font = font_regular(34)
    line_h = 46
    bullet_gap = 26
    bullet_indent = 40

    if tip.summary_points:
        # Wrap each point separately so bullets stay distinct.
        points = [
            wrap_text(p, text_font, content_w - bullet_indent, draw)
            for p in tip.summary_points[:4]
        ]
        total_h = sum(len(p) * line_h for p in points) + bullet_gap * (len(points) - 1)
        y = (H - total_h) // 2

        for point_lines in points:
            draw.ellipse(
                [margin, y + 16, margin + 10, y + 26], fill=RED
            )
            for line in point_lines:
                draw.text((margin + bullet_indent, y), line, font=text_font, fill=WHITE)
                y += line_h
            y += bullet_gap
    else:
        text = tip.callout_text or tip.description
        lines = wrap_text(text, text_font, content_w, draw)[:10]
        y = (H - len(lines) * line_h) // 2
        for line in lines:
            lw_line = text_width(draw, line, text_font)
            draw.text(((W - lw_line) // 2, y), line, font=text_font, fill=WHITE)
            y += line_h

    # Logo at bottom
    logo = load_logo("tip", max_height=44)
    paste_centered(canvas, logo, H - FRAME_WIDTH - 80)

    return canvas


def _slide_cta(tip):
    """Slide 5: Call to action with both logos and URLs."""
    canvas = Image.new("RGB", (W, H), OFF_WHITE)
    draw = ImageDraw.Draw(canvas)
    draw_red_frame(draw, W, H)

    y = FRAME_WIDTH + 120

    # DailyDatabricks logo (large)
    db_logo = load_logo("tip", max_height=140)
    paste_centered(canvas, db_logo, y)
    y += 160

    # "More tips at" text
    label_font = font_regular(28)
    label = "More tips & tricks at"
    lw = text_width(draw, label, label_font)
    draw.text(((W - lw) // 2, y), label, font=label_font, fill=WARM_GRAY)
    y += 52

    # Site URL (big, red button style)
    btn_font = font_bold(36)
    btn_text = CTA_SITE
    btn_w = text_width(draw, btn_text, btn_font) + 80
    btn_h = 64
    btn_x = (W - btn_w) // 2
    add_rounded_rect(draw, [btn_x, y, btn_x + btn_w, y + btn_h], 12, RED)
    btn_tw = text_width(draw, btn_text, btn_font)
    draw.text(((W - btn_tw) // 2, y + 12), btn_text, font=btn_font, fill=WHITE)
    y += btn_h + 48

    # Divider
    draw.rectangle([(W // 2 - 100), y, (W // 2 + 100), y + 1], fill=WARM_GRAY)
    y += 32

    # Newsletter section
    label2 = "Subscribe to the newsletter"
    lw2 = text_width(draw, label2, label_font)
    draw.text(((W - lw2) // 2, y), label2, font=label_font, fill=WARM_GRAY)
    y += 52

    # Databricks.news logo
    try:
        news_logo = load_and_fit_image(LOGO_DATABRICKS_NEWS, 400, 80)
        paste_centered(canvas, news_logo, y)
        y += news_logo.height + 16
    except Exception:
        news_font = font_bold(36)
        nw = text_width(draw, CTA_NEWSLETTER, news_font)
        draw.text(((W - nw) // 2, y), CTA_NEWSLETTER, font=news_font, fill=CHARCOAL)
        y += 52

    # Newsletter URL button
    btn2_text = CTA_NEWSLETTER
    btn2_w = text_width(draw, btn2_text, btn_font) + 80
    btn2_x = (W - btn2_w) // 2
    add_rounded_rect(draw, [btn2_x, y + 16, btn2_x + btn2_w, y + 16 + btn_h], 12, RED)
    btn2_tw = text_width(draw, btn2_text, btn_font)
    draw.text(((W - btn2_tw) // 2, y + 28), btn2_text, font=btn_font, fill=WHITE)
    y += btn_h + 80

    # Follow prompt
    follow_font = font_regular(24)
    follow = "Follow for daily Databricks tips"
    fw = text_width(draw, follow, follow_font)
    draw.text(((W - fw) // 2, y), follow, font=follow_font, fill=CHARCOAL)

    return canvas


def generate_carousel(qmd_path, output_dir=None, code_indices=None):
    """Generate a carousel PDF from a .qmd file.

    `code_indices` is a list of 1-based indices into the post's fenced code
    blocks, choosing which become content slides. Defaults to the first block.
    """
    tip = parse_qmd(qmd_path)
    if not tip.title:
        print(f"Error: Could not parse title from {qmd_path}")
        sys.exit(1)

    if not tip.code_blocks:
        print(f"Error: No code blocks found in {qmd_path}")
        sys.exit(1)

    if code_indices:
        try:
            blocks = [tip.code_blocks[i - 1] for i in code_indices]
        except IndexError:
            print(
                f"Error: --code-index out of range. {qmd_path} has "
                f"{len(tip.code_blocks)} code blocks."
            )
            sys.exit(1)
    else:
        blocks = [tip.code_blocks[0]]

    slides = [_slide_hook(tip)]
    slides += [
        _slide_code(tip, block, show_description=(i == 0))
        for i, block in enumerate(blocks)
    ]
    slides += [_slide_summary(tip), _slide_cta(tip)]

    out_dir = output_dir or OUTPUT_DIR
    os.makedirs(out_dir, exist_ok=True)

    basename = os.path.splitext(os.path.basename(qmd_path))[0]
    pdf_path = os.path.join(out_dir, f"{basename}-carousel.pdf")

    slides[0].save(
        pdf_path,
        save_all=True,
        append_images=slides[1:],
        resolution=150,
    )
    print(f"Carousel PDF saved to: {pdf_path}")
    print(f"Total slides: {len(slides)}")
    print(f"Dimensions: {W}x{H} px (LinkedIn portrait)")

    return pdf_path


def list_code_blocks(qmd_path):
    """Print the post's code blocks so you can pick indices for --code-index."""
    tip = parse_qmd(qmd_path)
    if not tip.code_blocks:
        print("No code blocks found.")
        return
    for i, block in enumerate(tip.code_blocks, 1):
        first_line = block.code.splitlines()[0][:60]
        print(f"{i:>2}. [{block.lang}] {block.heading or '(no heading)'}")
        print(f"    {first_line}")


def main():
    parser = argparse.ArgumentParser(
        description="Generate a LinkedIn carousel PDF from a .qmd tip file."
    )
    parser.add_argument("qmd_file", help="Path to the .qmd tip file")
    parser.add_argument(
        "--output-dir",
        default=None,
        help="Output directory (default: output/)",
    )
    parser.add_argument(
        "--code-index",
        type=int,
        nargs="+",
        default=None,
        metavar="N",
        help="1-based code block indices to turn into slides, in order "
             "(default: the first block). Use --list-code to see them.",
    )
    parser.add_argument(
        "--list-code",
        action="store_true",
        help="List the post's code blocks with their indices, then exit.",
    )
    args = parser.parse_args()

    if not os.path.exists(args.qmd_file):
        print(f"Error: File not found: {args.qmd_file}")
        sys.exit(1)

    if args.list_code:
        list_code_blocks(args.qmd_file)
        return

    generate_carousel(
        args.qmd_file,
        output_dir=args.output_dir,
        code_indices=args.code_index,
    )


if __name__ == "__main__":
    main()
