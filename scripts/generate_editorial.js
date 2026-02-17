#!/usr/bin/env node
/**
 * Generate editorial-style social media cards for databricks.news
 *
 * Usage:
 *   # From a QMD file (auto-extracts title, description, tags, quote)
 *   node scripts/generate_editorial.js --qmd site/tips/Performance/NOOP.qmd
 *
 *   # From a QMD file with content type override
 *   node scripts/generate_editorial.js --qmd site/tips/Performance/NOOP.qmd --type announcements
 *
 *   # Manual mode (no QMD file needed)
 *   node scripts/generate_editorial.js \
 *     --title "Delta Lake Custom Metadata" \
 *     --description "Learn how to attach custom metadata to every Delta write." \
 *     --quote "Every Delta write should log custom metadata." \
 *     --tags "Delta,Metadata,DataEngineering" \
 *     --type tips
 *
 *   Content types: tips (default), announcements, news
 */

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

// ── Brand constants (databricks.news) ───────────────────────────────
const BRAND = {
  red: "#E3242B",
  charcoal: "#1A1A2E",
  offWhite: "#FAFAFA",
  warmGray: "#9CA3AF",
  codeBg: "#282C34",
  white: "#FFFFFF",
  site: "databricks.news",
};

const CONTENT_TYPES = {
  tips: "Tips & Tricks",
  announcements: "Announcements",
  news: "News",
};

const OUTPUT_DIR = path.join(__dirname, "..", "output");

// Logo paths — horizontal wordmark (dark for light bg, white for dark bg)
const LOGO_LIGHT_PATH = path.join(
  __dirname,
  "..",
  "assets",
  "databricks.news",
  "LOGO fILE",
  "TRANSPERENT PNG",
  "Logo-01.png"
);
const LOGO_DARK_PATH = path.join(
  __dirname,
  "..",
  "assets",
  "databricks.news",
  "LOGO fILE",
  "TRANSPERENT PNG",
  "Logo-03.png"
);
const LOGO_ICON_PATH = path.join(
  __dirname,
  "..",
  "assets",
  "databricks.news",
  "LOGO fILE",
  "TRANSPERENT PNG",
  "Logo-06.png"
);

// ── Logo as base64 data URL ─────────────────────────────────────────
function logoDataUrl(logoPath) {
  if (!fs.existsSync(logoPath)) return "";
  const buf = fs.readFileSync(logoPath);
  return `data:image/png;base64,${buf.toString("base64")}`;
}

// ── QMD Parser ──────────────────────────────────────────────────────
function parseQmd(filepath) {
  const content = fs.readFileSync(filepath, "utf-8");
  const result = {
    title: "",
    description: "",
    categories: [],
    tags: [],
    codeSnippet: "",
    codeLang: "",
    calloutText: "",
    summaryPoints: [],
  };

  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (fmMatch) {
    try {
      const fm = yaml.parse(fmMatch[1]);
      if (fm) {
        result.title = fm.title || "";
        result.description = fm.description || "";
        result.categories = Array.isArray(fm.categories)
          ? fm.categories
          : typeof fm.categories === "string"
          ? fm.categories.split(",").map((s) => s.trim())
          : [];
        result.tags = Array.isArray(fm.tags) ? fm.tags : [];
      }
    } catch (e) {
      /* skip parse errors */
    }
  }

  const body = fmMatch ? content.slice(fmMatch[0].length) : content;

  // Extract code blocks — prefer longest Python block
  const codeBlocks = [...body.matchAll(/```\s*(\w+)?\n([\s\S]*?)```/g)];
  if (codeBlocks.length) {
    const pyBlocks = codeBlocks.filter(
      (b) => b[1] && b[1].toLowerCase() === "python"
    );
    if (pyBlocks.length) {
      const longest = pyBlocks.reduce((a, b) =>
        b[2].trim().length > a[2].trim().length ? b : a
      );
      result.codeLang = longest[1];
      result.codeSnippet = longest[2].trim();
    } else {
      const longest = codeBlocks.reduce((a, b) =>
        b[2].trim().length > a[2].trim().length ? b : a
      );
      result.codeLang = longest[1] || "text";
      result.codeSnippet = longest[2].trim();
    }
  }

  // Extract callout text
  const calloutMatch = body.match(
    /::: \{\.callout-\w+.*?\}\n([\s\S]*?)\n:::/
  );
  if (calloutMatch) {
    result.calloutText = calloutMatch[1].trim();
  }

  // Extract summary points
  const summaryMatch =
    body.match(/## Summary\n\n((?:-\s+.*\n?)+)/) ||
    body.match(/# Summary\n\n((?:-\s+.*\n?)+)/);
  if (summaryMatch) {
    result.summaryPoints = [...summaryMatch[1].matchAll(/-\s+(.*)/g)].map(
      (m) => m[1].trim()
    );
  }

  return result;
}

// ── Helpers ─────────────────────────────────────────────────────────
function esc(s) {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripMd(s) {
  return (s || "")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/__/g, "")
    .replace(/_/g, " ");
}

// ── Editorial Template ──────────────────────────────────────────────
function templateEditorial(tip, contentType) {
  const mastheadText = CONTENT_TYPES[contentType] || CONTENT_TYPES.tips;

  const quote = stripMd(
    tip.summaryPoints[0] ||
      tip.calloutText ||
      tip.description.substring(0, 120)
  );

  // Smart drop cap: use first word if short (<= 4 chars), else first letter
  const words = tip.title.split(" ");
  const firstWord = words[0] || "D";
  const useWordCap = firstWord.length <= 4;
  const dropCapText = useWordCap ? firstWord : firstWord[0];
  const remainingTitle = useWordCap
    ? words.slice(1).join(" ")
    : firstWord.substring(1) + " " + words.slice(1).join(" ");

  const logoB64 = logoDataUrl(LOGO_LIGHT_PATH);
  const iconB64 = logoDataUrl(LOGO_ICON_PATH);

  // Use categories if available, fall back to tags, limit to 4
  const tagList = tip.categories.length
    ? tip.categories.slice(0, 4)
    : tip.tags.slice(0, 4);

  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  width:1080px; height:1080px;
  background: ${BRAND.offWhite};
  font-family: 'Inter', sans-serif;
  overflow:hidden; position:relative;
}
/* Red frame */
body::before { content:''; position:absolute; inset:0;
  border:10px solid ${BRAND.red}; z-index:10; pointer-events:none; }

.container { padding:72px 80px; height:100%; display:flex;
  flex-direction:column; }

/* Brand bar */
.brand-bar { display:flex; align-items:center; justify-content:space-between;
  border-bottom: 2px solid ${BRAND.charcoal}; padding-bottom:16px;
  margin-bottom:40px; }
.brand-left { display:flex; align-items:center; gap:14px; }
.brand-left img { height:44px; }
.brand-right { font-size:13px; color:${BRAND.warmGray};
  letter-spacing:1.5px; text-transform:uppercase; font-weight:600; }

/* Title area with drop cap */
.title-area { margin-bottom:28px; }
.drop-cap {
  font-family:'Playfair Display',serif; font-weight:900;
  font-size:${useWordCap ? "100" : "140"}px; line-height:0.85;
  color:${BRAND.red};
  float:left; margin-right:16px; margin-top:6px;
}
.title {
  font-family:'Playfair Display',serif; font-weight:900;
  font-size:48px; color:${BRAND.charcoal}; line-height:1.15;
  text-transform: none;
}

.rule { height:3px; background:${BRAND.red}; width:80px;
  margin:20px 0 28px; clear:both; }

/* Pull quote */
.quote-block {
  border-left: 4px solid ${BRAND.red};
  padding: 24px 32px;
  background: rgba(227,36,43,0.04);
  margin-bottom:28px;
}
.quote-text { font-family:'Playfair Display',serif;
  font-size:26px; font-style:italic; color:${BRAND.charcoal};
  line-height:1.45; }

/* Description */
.desc { font-size:20px; color:#555; line-height:1.6;
  flex-grow:1; }

/* Bottom bar with tags and CTA */
.bottom-bar { display:flex; justify-content:space-between;
  align-items:center; border-top:1px solid #ddd; padding-top:20px;
  margin-top:auto; }
.tags { display:flex; gap:8px; flex-wrap:wrap; }
.tag { background:${BRAND.charcoal}; color:${BRAND.white};
  font-size:12px; font-weight:700; padding:6px 14px;
  border-radius:20px; letter-spacing:1px; text-transform:uppercase; }
.cta-bar { display:flex; align-items:center; gap:10px; }
.cta-icon { height:28px; }
.cta-text { font-size:16px; font-weight:700; color:${BRAND.red};
  letter-spacing:1px; }
</style></head><body>
<div class="container">
  <div class="brand-bar">
    <div class="brand-left">
      ${logoB64 ? `<img src="${logoB64}" alt="databricks.news">` : `<span style="font-weight:700;font-size:18px;color:${BRAND.charcoal};letter-spacing:2px;">DATABRICKS.NEWS</span>`}
    </div>
    <div class="brand-right">${esc(mastheadText)}</div>
  </div>
  <div class="title-area">
    <span class="drop-cap">${esc(dropCapText)}</span>
    <span class="title">${esc(remainingTitle)}</span>
  </div>
  <div class="rule"></div>
  <div class="quote-block">
    <div class="quote-text">\u201C${esc(quote)}\u201D</div>
  </div>
  <div class="desc">${esc(tip.description).substring(0, 280)}</div>
  <div class="bottom-bar">
    <div class="tags">
      ${tagList.map((c) => `<span class="tag">${esc(c)}</span>`).join("")}
    </div>
    <div class="cta-bar">
      ${iconB64 ? `<img class="cta-icon" src="${iconB64}">` : ""}
      <span class="cta-text">${BRAND.site}</span>
    </div>
  </div>
</div>
</body></html>`;
}

// ── Render ───────────────────────────────────────────────────────────
async function renderCard(browser, html, outputPath) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "networkidle0", timeout: 15000 });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: outputPath, type: "png" });
  await page.close();
  console.log(`  \u2713 ${path.basename(outputPath)}`);
}

// ── CLI ──────────────────────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    qmd: null,
    title: null,
    description: null,
    quote: null,
    tags: null,
    type: "tips",
    output: null,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--qmd":
        opts.qmd = args[++i];
        break;
      case "--title":
        opts.title = args[++i];
        break;
      case "--description":
      case "--desc":
        opts.description = args[++i];
        break;
      case "--quote":
        opts.quote = args[++i];
        break;
      case "--tags":
        opts.tags = args[++i];
        break;
      case "--type":
        opts.type = args[++i];
        break;
      case "--output":
      case "-o":
        opts.output = args[++i];
        break;
    }
  }
  return opts;
}

async function main() {
  const opts = parseArgs();

  let tip;
  let baseName;

  if (opts.qmd) {
    // Parse QMD file
    const qmdPath = path.isAbsolute(opts.qmd)
      ? opts.qmd
      : path.join(process.cwd(), opts.qmd);

    if (!fs.existsSync(qmdPath)) {
      console.error(`File not found: ${qmdPath}`);
      process.exit(1);
    }

    tip = parseQmd(qmdPath);
    baseName = path.basename(qmdPath, ".qmd");
    console.log(`\nParsed: ${baseName}`);
    console.log(`  Title: ${tip.title}`);
    console.log(`  Categories: ${tip.categories.join(", ")}`);
  } else if (opts.title) {
    // Manual mode
    tip = {
      title: opts.title,
      description: opts.description || "",
      categories: opts.tags ? opts.tags.split(",").map((s) => s.trim()) : [],
      tags: opts.tags ? opts.tags.split(",").map((s) => s.trim()) : [],
      summaryPoints: opts.quote ? [opts.quote] : [],
      calloutText: opts.quote || "",
      codeSnippet: "",
      codeLang: "",
    };
    baseName = opts.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .substring(0, 40);
    console.log(`\nManual: ${opts.title}`);
  } else {
    console.log(`
databricks.news Editorial Card Generator
=========================================

Usage:
  # From a QMD file
  node scripts/generate_editorial.js --qmd site/tips/Performance/NOOP.qmd

  # With content type
  node scripts/generate_editorial.js --qmd site/tips/Performance/NOOP.qmd --type announcements

  # Manual mode
  node scripts/generate_editorial.js \\
    --title "Your Title Here" \\
    --description "A short description." \\
    --quote "The key insight or pull quote." \\
    --tags "Tag1,Tag2,Tag3" \\
    --type tips

Options:
  --qmd <path>     Path to a .qmd file to parse
  --title <text>   Title (manual mode)
  --desc <text>    Description (manual mode)
  --quote <text>   Pull quote (manual mode)
  --tags <csv>     Comma-separated tags (manual mode)
  --type <type>    Content type: tips (default), announcements, news
  -o <path>        Custom output path for PNG
`);
    process.exit(0);
  }

  // Validate content type
  if (!CONTENT_TYPES[opts.type]) {
    console.error(
      `Unknown content type: "${opts.type}". Use: ${Object.keys(CONTENT_TYPES).join(", ")}`
    );
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`  Type: ${CONTENT_TYPES[opts.type]}`);
  console.log(`\nGenerating editorial card...`);

  const html = templateEditorial(tip, opts.type);

  // Save HTML for debugging/preview
  const htmlPath = path.join(OUTPUT_DIR, `${baseName}-editorial.html`);
  fs.writeFileSync(htmlPath, html);
  console.log(`  \u2713 ${path.basename(htmlPath)} (preview)`);

  // Render PNG
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const pngPath = opts.output || path.join(OUTPUT_DIR, `${baseName}-editorial.png`);
  await renderCard(browser, html, pngPath);

  await browser.close();
  console.log(`\nDone! Output: ${pngPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
