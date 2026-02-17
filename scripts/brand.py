"""Shared brand constants, colors, fonts, and helpers for DailyDatabricks visual identity."""

import os
from PIL import Image, ImageDraw, ImageFont

# --- Paths ---
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS_DIR = os.path.join(PROJECT_ROOT, "assets", "fonts")
OUTPUT_DIR = os.path.join(PROJECT_ROOT, "output")

# Logo paths
LOGO_BRICKS = os.path.join(
    PROJECT_ROOT, "logo", "Logo Stacked with Red Square Box.jpg"
)
LOGO_DIAMOND_ICON = os.path.join(
    PROJECT_ROOT, "assets", "databricks.news", "LOGO fILE",
    "TRANSPERENT PNG", "Logo-06.png"
)
LOGO_DATABRICKS_NEWS = os.path.join(
    PROJECT_ROOT, "assets", "databricks.news", "LOGO fILE",
    "TRANSPERENT PNG", "Logo-01.png"
)
LOGO_DATABRICKS_NEWS_WHITE = os.path.join(
    PROJECT_ROOT, "assets", "databricks.news", "LOGO fILE",
    "TRANSPERENT PNG", "Logo-03.png"
)

# --- Colors ---
RED = "#E3242B"
CHARCOAL = "#1A1A2E"
OFF_WHITE = "#FAFAFA"
WARM_GRAY = "#9CA3AF"
CODE_BG = "#282C34"
WHITE = "#FFFFFF"
BLACK = "#0A0A0A"

# Syntax highlighting colors (One Dark inspired)
SYN_KEYWORD = "#C678DD"   # purple for keywords
SYN_STRING = "#98C379"    # green for strings
SYN_COMMENT = "#5C6370"   # gray for comments
SYN_FUNCTION = "#61AFEF"  # blue for functions
SYN_NUMBER = "#D19A66"    # orange for numbers
SYN_DEFAULT = "#ABB2BF"   # default text in code

# --- Dimensions ---
SOCIAL_SIZE = (1080, 1080)
CAROUSEL_SIZE = (1080, 1350)
FRAME_WIDTH = 12

# --- CTA ---
CTA_NEWSLETTER = "databricks.news"
CTA_SITE = "dailydatabricks.tips"

# --- Font loading ---

# Font fallback chains
_FONT_BOLD_CHAIN = [
    os.path.join(FONTS_DIR, "Inter-Bold.ttf"),
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]

_FONT_REGULAR_CHAIN = [
    os.path.join(FONTS_DIR, "Inter-Regular.ttf"),
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]

_FONT_MONO_CHAIN = [
    os.path.join(FONTS_DIR, "JetBrainsMono-Regular.ttf"),
    "/System/Library/Fonts/Supplemental/Courier New.ttf",
    "/System/Library/Fonts/Monaco.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
]

_FONT_MONO_BOLD_CHAIN = [
    os.path.join(FONTS_DIR, "JetBrainsMono-Bold.ttf"),
    "/System/Library/Fonts/Supplemental/Courier New Bold.ttf",
    "/System/Library/Fonts/Monaco.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf",
]


def _resolve_font(chain):
    """Return the first font path that exists in the fallback chain."""
    for path in chain:
        if os.path.exists(path):
            return path
    return None


def font_bold(size):
    """Load bold heading font at given size."""
    path = _resolve_font(_FONT_BOLD_CHAIN)
    if path:
        return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def font_regular(size):
    """Load regular body font at given size."""
    path = _resolve_font(_FONT_REGULAR_CHAIN)
    if path:
        return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def font_mono(size):
    """Load monospace font at given size."""
    path = _resolve_font(_FONT_MONO_CHAIN)
    if path:
        return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def font_mono_bold(size):
    """Load bold monospace font at given size."""
    path = _resolve_font(_FONT_MONO_BOLD_CHAIN)
    if path:
        return ImageFont.truetype(path, size)
    return ImageFont.load_default()


# --- Drawing helpers ---

def draw_red_frame(draw, w, h):
    """Draw the signature 12px red border on all four sides."""
    f = FRAME_WIDTH
    draw.rectangle([0, 0, w, f], fill=RED)          # top
    draw.rectangle([0, h - f, w, h], fill=RED)      # bottom
    draw.rectangle([0, 0, f, h], fill=RED)           # left
    draw.rectangle([w - f, 0, w, h], fill=RED)       # right


def load_and_fit_image(path, max_w, max_h):
    """Load an image and scale to fit within max_w x max_h, preserving aspect ratio."""
    img = Image.open(path).convert("RGBA")
    ratio = min(max_w / img.width, max_h / img.height)
    new_w = int(img.width * ratio)
    new_h = int(img.height * ratio)
    return img.resize((new_w, new_h), Image.LANCZOS)


def paste_centered(canvas, img, y_offset, x_center=None):
    """Paste an image horizontally centered at given y offset."""
    if x_center is None:
        x_center = canvas.width // 2
    x = x_center - img.width // 2
    if img.mode == "RGBA":
        canvas.paste(img, (x, y_offset), img)
    else:
        canvas.paste(img, (x, y_offset))


def load_logo(context="tip", max_height=80):
    """Load the appropriate logo mark.

    context="tip" -> DailyDatabricks stacked bricks
    context="newsletter" -> Databricks.news triple diamond
    """
    if context == "newsletter":
        path = LOGO_DIAMOND_ICON
    else:
        path = LOGO_BRICKS
    return load_and_fit_image(path, max_w=max_height * 3, max_h=max_height)


def draw_cta_bar(draw, y, w, theme="light"):
    """Draw the CTA bar with both domains at the bottom of the image."""
    f = font_regular(24)
    cta = f"{CTA_NEWSLETTER}  |  {CTA_SITE}"
    bbox = draw.textbbox((0, 0), cta, font=f)
    tw = bbox[2] - bbox[0]
    text_color = WARM_GRAY if theme == "dark" else CHARCOAL
    draw.text(((w - tw) // 2, y), cta, font=f, fill=text_color)


def create_canvas(size, theme="light"):
    """Create a base canvas with the appropriate background color."""
    bg = OFF_WHITE if theme == "light" else CHARCOAL
    return Image.new("RGB", size, bg)


def add_rounded_rect(draw, xy, radius, fill):
    """Draw a rounded rectangle."""
    draw.rounded_rectangle(xy, radius=radius, fill=fill)


def text_width(draw, text, font):
    """Get the width of rendered text."""
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0]


def text_height(draw, text, font):
    """Get the height of rendered text."""
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[3] - bbox[1]


def wrap_text(text, font, max_width, draw):
    """Word-wrap text to fit within max_width pixels. Returns list of lines."""
    words = text.split()
    lines = []
    current_line = ""
    for word in words:
        test = f"{current_line} {word}".strip()
        if text_width(draw, test, font) <= max_width:
            current_line = test
        else:
            if current_line:
                lines.append(current_line)
            current_line = word
    if current_line:
        lines.append(current_line)
    return lines
