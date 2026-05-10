# /// script
# dependencies = ["pillow", "python-frontmatter"]
# ///
"""
Generate 1200x675 cover images for blog posts.

Style: dark editorial minimalism — slate background, big bold title,
category eyebrow with category-specific accent color, subtle terminal
brand mark.

Usage:
    uv run scripts/generate-blog-covers.py [--force]

By default, only generates covers for posts whose current `cover` field
points to /blog/placeholder.svg. Pass --force to regenerate all posts.
"""
from __future__ import annotations

import argparse
import hashlib
from pathlib import Path

import frontmatter
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
POSTS_DIR = ROOT / "content" / "blog"
PUBLIC_BLOG_DIR = ROOT / "public" / "blog"

W, H = 1200, 675
BG = (15, 23, 42)            # slate-900
BG_BOTTOM = (30, 41, 59)     # slate-800
MUTED = (148, 163, 184)      # slate-400
FG = (248, 250, 252)         # slate-50

# Curated accent palette — picked deterministically per first category
ACCENTS = [
    (96, 165, 250),   # blue-400
    (52, 211, 153),   # emerald-400
    (251, 191, 36),   # amber-400
    (244, 114, 182),  # pink-400
    (167, 139, 250),  # violet-400
    (45, 212, 191),   # teal-400
    (251, 113, 133),  # rose-400
    (250, 204, 21),   # yellow-400
]

PADDING = 72
TITLE_MAX_WIDTH = W - PADDING * 2


def find_font(candidates: list[str], size: int) -> ImageFont.FreeTypeFont:
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def title_font(size: int) -> ImageFont.FreeTypeFont:
    return find_font(
        [
            "/System/Library/Fonts/SFNS.ttf",
            "/System/Library/Fonts/Helvetica.ttc",
            "/Library/Fonts/Arial.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        ],
        size,
    )


def mono_font(size: int) -> ImageFont.FreeTypeFont:
    return find_font(
        [
            "/System/Library/Fonts/Menlo.ttc",
            "/System/Library/Fonts/SFNSMono.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
        ],
        size,
    )


def accent_for(category: str) -> tuple[int, int, int]:
    digest = hashlib.md5(category.encode("utf-8")).digest()
    return ACCENTS[digest[0] % len(ACCENTS)]


def make_gradient() -> Image.Image:
    img = Image.new("RGB", (W, H), BG)
    pixels = img.load()
    for y in range(H):
        t = y / (H - 1)
        r = round(BG[0] + (BG_BOTTOM[0] - BG[0]) * t)
        g = round(BG[1] + (BG_BOTTOM[1] - BG[1]) * t)
        b = round(BG[2] + (BG_BOTTOM[2] - BG[2]) * t)
        for x in range(W):
            pixels[x, y] = (r, g, b)
    return img


def wrap_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    font: ImageFont.FreeTypeFont,
    max_width: int,
) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current: list[str] = []
    for word in words:
        candidate = " ".join(current + [word])
        if draw.textlength(candidate, font=font) <= max_width:
            current.append(word)
        else:
            if current:
                lines.append(" ".join(current))
            current = [word]
    if current:
        lines.append(" ".join(current))
    return lines


def fit_title(
    draw: ImageDraw.ImageDraw, text: str, max_width: int
) -> tuple[ImageFont.FreeTypeFont, list[str]]:
    for size in (88, 80, 72, 64, 56, 50):
        font = title_font(size)
        lines = wrap_text(draw, text, font, max_width)
        if len(lines) <= 4:
            return font, lines
    return title_font(50), wrap_text(draw, text, title_font(50), max_width)


def render_cover(title: str, categories: list[str], out_path: Path) -> None:
    img = make_gradient()
    draw = ImageDraw.Draw(img)

    accent = accent_for(categories[0]) if categories else ACCENTS[0]

    # Top accent bar
    draw.rectangle([(PADDING, PADDING), (PADDING + 56, PADDING + 4)], fill=accent)

    # Eyebrow: categories
    eyebrow_font = mono_font(20)
    eyebrow = "  ·  ".join(c.upper() for c in categories[:3]) if categories else "BLOG"
    draw.text((PADDING, PADDING + 24), eyebrow, font=eyebrow_font, fill=MUTED)

    # Title (wrapped, auto-fit)
    font, lines = fit_title(draw, title, TITLE_MAX_WIDTH)
    line_height = int(font.size * 1.12)
    total_height = line_height * len(lines)
    y = (H - total_height) // 2 + 40  # nudge slightly below center
    for line in lines:
        draw.text((PADDING, y), line, font=font, fill=FG)
        y += line_height

    # Footer: brand mark
    brand_font = mono_font(18)
    brand_text = "gustavo@pop-os:~"
    brand_w = draw.textlength(brand_text, font=brand_font)
    bx = W - PADDING - brand_w
    by = H - PADDING - 24
    # Split into colored parts for terminal vibe
    parts = [
        ("gustavo@", MUTED),
        ("pop-os", FG),
        (":~", MUTED),
    ]
    cx = bx
    for text, color in parts:
        draw.text((cx, by), text, font=brand_font, fill=color)
        cx += draw.textlength(text, font=brand_font)

    img.save(out_path, "PNG", optimize=True)
    print(f"  -> {out_path.relative_to(ROOT)}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--force",
        action="store_true",
        help="Regenerate covers for all posts (default: only placeholders).",
    )
    args = parser.parse_args()

    PUBLIC_BLOG_DIR.mkdir(parents=True, exist_ok=True)

    for post_path in sorted(POSTS_DIR.glob("*.mdx")):
        post = frontmatter.load(post_path)
        title = post.get("title")
        cover = post.get("cover", "")
        categories = post.get("categories") or post.get("category") or []
        if isinstance(categories, str):
            categories = [categories]

        if not title:
            print(f"skip {post_path.name}: missing title")
            continue

        is_placeholder = cover == "/blog/placeholder.svg" or not cover
        if not is_placeholder and not args.force:
            print(f"skip {post_path.name}: already has cover {cover}")
            continue

        slug = post_path.stem
        out_file = PUBLIC_BLOG_DIR / f"{slug}.png"
        new_cover = f"/blog/{slug}.png"

        print(f"render {post_path.name}: {title!r}")
        render_cover(str(title), [str(c) for c in categories], out_file)

        if cover != new_cover:
            post["cover"] = new_cover
            post_path.write_text(frontmatter.dumps(post) + "\n", encoding="utf-8")
            print(f"  updated frontmatter cover -> {new_cover}")


if __name__ == "__main__":
    main()
