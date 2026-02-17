#!/usr/bin/env node
/**
 * Generate visually rich social media cards using HTML/CSS + Puppeteer.
 *
 * Usage:
 *   node scripts/generate_html_cards.js
 *   node scripts/generate_html_cards.js --style glassmorphism --qmd site/tips/Performance/NOOP.qmd
 */

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

// ── Brand constants ──────────────────────────────────────────────────
const BRAND = {
  red: "#E3242B",
  charcoal: "#1A1A2E",
  offWhite: "#FAFAFA",
  warmGray: "#9CA3AF",
  codeBg: "#282C34",
  white: "#FFFFFF",
  black: "#0A0A0A",
  ctaNewsletter: "databricks.news",
  ctaSite: "dailydatabricks.tips",
};

const OUTPUT_DIR = path.join(__dirname, "..", "output");
const LOGO_PATH = path.join(
  __dirname,
  "..",
  "logo",
  "Logo Stacked with Red Square Box.jpg"
);

// ── QMD Parser ───────────────────────────────────────────────────────
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

  // Parse YAML frontmatter
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

  // Extract code blocks - prefer longest Python block
  const codeBlocks = [...body.matchAll(/```\s*(\w+)?\n([\s\S]*?)```/g)];
  if (codeBlocks.length) {
    const pyBlocks = codeBlocks.filter(
      (b) => b[1] && b[1].toLowerCase() === "python"
    );
    if (pyBlocks.length) {
      // Pick the longest Python block for richer visuals
      const longest = pyBlocks.reduce((a, b) =>
        b[2].trim().length > a[2].trim().length ? b : a
      );
      result.codeLang = longest[1];
      result.codeSnippet = longest[2].trim();
    } else {
      // Pick the longest block of any language
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

// ── Logo as base64 data URL ──────────────────────────────────────────
function logoDataUrl() {
  if (!fs.existsSync(LOGO_PATH)) return "";
  const buf = fs.readFileSync(LOGO_PATH);
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

const LOGO_B64 = logoDataUrl();

// ── Escape HTML ──────────────────────────────────────────────────────
function esc(s) {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Strip markdown formatting ────────────────────────────────────────
function stripMd(s) {
  return (s || "").replace(/\*\*/g, "").replace(/\*/g, "").replace(/__/g, "").replace(/_/g, "");
}

// ── Syntax-highlighted code (basic) ──────────────────────────────────
function highlightCode(code) {
  const keywords = new Set([
    "import","from","def","class","return","if","else","elif","for",
    "while","with","as","try","except","finally","raise","yield",
    "lambda","and","or","not","in","is","None","True","False","pass",
    "break","continue","global","nonlocal","assert","del","print",
    "SELECT","FROM","WHERE","ORDER","BY","AS","SET","GRANT","REVOKE",
    "INSERT","UPDATE","DELETE","CREATE","TABLE","INTO","VALUES",
    "WINDOW","OVER","PARTITION","SUM","AVG","DESCRIBE","HISTORY",
  ]);

  return code
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("#") || trimmed.startsWith("--")) {
        return `<span class="comment">${esc(line)}</span>`;
      }
      // Tokenize
      const tokens = line.match(/(\s+|"[^"]*"|'[^']*'|\w+|[^\s\w])/g) || [
        line,
      ];
      return tokens
        .map((t) => {
          if (
            (t.startsWith('"') && t.endsWith('"')) ||
            (t.startsWith("'") && t.endsWith("'"))
          )
            return `<span class="string">${esc(t)}</span>`;
          if (keywords.has(t))
            return `<span class="keyword">${esc(t)}</span>`;
          if (/^\d+$/.test(t))
            return `<span class="number">${esc(t)}</span>`;
          return esc(t);
        })
        .join("");
    })
    .join("\n");
}

// ═══════════════════════════════════════════════════════════════════════
//  STYLE 1: GLASSMORPHISM
//  Frosted glass card on a gradient mesh. Modern SaaS startup aesthetic.
// ═══════════════════════════════════════════════════════════════════════
function templateGlassmorphism(tip) {
  const codeHtml = tip.codeSnippet
    ? `<div class="code-block"><pre><code>${highlightCode(
        tip.codeSnippet
      )}</code></pre></div>`
    : "";

  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  width: 1080px; height: 1080px;
  background: linear-gradient(135deg, ${BRAND.charcoal} 0%, #2d1b3d 30%, ${BRAND.charcoal} 60%, #1a0a0a 100%);
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  position: relative;
}
/* Gradient mesh blobs */
.blob1 { position:absolute; width:600px; height:600px; border-radius:50%;
  background: radial-gradient(circle, rgba(227,36,43,0.35) 0%, transparent 70%);
  top: -100px; right: -100px; filter: blur(80px); }
.blob2 { position:absolute; width:500px; height:500px; border-radius:50%;
  background: radial-gradient(circle, rgba(227,36,43,0.2) 0%, transparent 70%);
  bottom: -80px; left: -80px; filter: blur(80px); }
.blob3 { position:absolute; width:300px; height:300px; border-radius:50%;
  background: radial-gradient(circle, rgba(97,175,239,0.15) 0%, transparent 70%);
  top: 40%; left: 30%; filter: blur(60px); }

/* Red frame */
.frame { position:absolute; inset:0;
  border: 10px solid ${BRAND.red}; pointer-events:none; z-index:10; }

/* Glass card */
.glass {
  position: absolute;
  top: 80px; left: 60px; right: 60px; bottom: 100px;
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 24px;
  padding: 56px;
  display: flex; flex-direction: column;
}
.brand { display:flex; align-items:center; gap:12px; margin-bottom:24px; }
.brand img { height:40px; border-radius:6px; }
.brand span { font-weight:700; font-size:16px; color:${BRAND.warmGray};
  letter-spacing:2px; text-transform:uppercase; }
.title { font-size:46px; font-weight:900; color:${BRAND.white};
  line-height:1.15; margin-bottom:20px; text-transform:uppercase; }
.sep { width:60px; height:4px; background:${BRAND.red}; border-radius:2px;
  margin-bottom:20px; }
.code-block {
  background: rgba(40,44,52,0.85); border-radius:16px;
  padding:24px 28px; margin-bottom:20px;
  border: 1px solid rgba(255,255,255,0.08);
  flex-shrink: 0; overflow:hidden; max-height: 340px;
}
.code-block pre { margin:0; font-family:'JetBrains Mono',monospace;
  font-size:18px; line-height:1.6; color:#abb2bf; white-space:pre-wrap; }
.keyword { color:#c678dd; } .string { color:#98c379; }
.comment { color:#5c6370; font-style:italic; } .number { color:#d19a66; }
.desc { font-size:22px; color:${BRAND.warmGray}; line-height:1.5;
  flex-grow:1; }
.cta { font-size:16px; font-weight:700; color:${BRAND.red};
  letter-spacing:1px; text-align:center; position:absolute;
  bottom: 36px; left:0; right:0; }
</style></head><body>
<div class="blob1"></div><div class="blob2"></div><div class="blob3"></div>
<div class="frame"></div>
<div class="glass">
  <div class="brand">
    ${LOGO_B64 ? `<img src="${LOGO_B64}">` : ""}
    <span>Daily Databricks</span>
  </div>
  <div class="title">${esc(tip.title)}</div>
  <div class="sep"></div>
  ${codeHtml}
  <div class="desc">${esc(tip.description).substring(0, 200)}</div>
</div>
<div class="cta">${BRAND.ctaNewsletter}  &bull;  ${BRAND.ctaSite}</div>
</body></html>`;
}

// ═══════════════════════════════════════════════════════════════════════
//  STYLE 2: TERMINAL
//  Looks like a real macOS terminal. Developer-native, authentic.
// ═══════════════════════════════════════════════════════════════════════
function templateTerminal(tip) {
  const code = tip.codeSnippet || "# No code snippet";
  const codeLines = code.split("\n").map((l) => esc(l));

  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@700;900&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  width:1080px; height:1080px;
  background: ${BRAND.charcoal};
  font-family: 'Inter', sans-serif;
  overflow:hidden; display:flex; flex-direction:column;
  padding:48px 48px 36px;
}
/* Red frame */
body::before { content:''; position:absolute; inset:0;
  border:10px solid ${BRAND.red}; z-index:10; pointer-events:none; }

.header { text-align:center; margin-bottom:28px; }
.brand { display:flex; align-items:center; justify-content:center;
  gap:12px; margin-bottom:16px; }
.brand img { height:44px; border-radius:6px; }
.brand span { font-weight:700; font-size:18px; color:${BRAND.warmGray};
  letter-spacing:2px; text-transform:uppercase; }
.title { font-size:36px; font-weight:900; color:${BRAND.white};
  text-transform:uppercase; line-height:1.2; }

/* Terminal window */
.terminal {
  width:100%; background:#1e1e1e; border-radius:12px;
  box-shadow: 0 25px 80px rgba(0,0,0,0.6);
  overflow:hidden; flex: 1 1 auto;
  display:flex; flex-direction:column;
}
.terminal-bar {
  height:40px; background:#323232; display:flex;
  align-items:center; padding:0 16px; gap:8px; flex-shrink:0;
}
.dot { width:12px; height:12px; border-radius:50%; }
.dot-red { background:#ff5f57; } .dot-yellow { background:#febc2e; }
.dot-green { background:#28c840; }
.terminal-title { flex:1; text-align:center; font-family:'JetBrains Mono',monospace;
  font-size:13px; color:#888; }
.terminal-body {
  padding:28px 32px; font-family:'JetBrains Mono',monospace;
  font-size:16px; line-height:1.65; color:#d4d4d4;
  flex:1; overflow:hidden;
}
.terminal-body .prompt { color:${BRAND.red}; font-weight:700; }
.terminal-body .keyword { color:#c678dd; }
.terminal-body .string { color:#98c379; }
.terminal-body .comment { color:#5c6370; font-style:italic; }
.terminal-body .number { color:#d19a66; }
.code-line { white-space:pre; overflow:hidden; text-overflow:ellipsis; }
.terminal-body .line-num { color:#555; user-select:none; margin-right:16px;
  display:inline-block; width:28px; text-align:right; }

.footer { display:flex; justify-content:space-between; align-items:center;
  margin-top:20px; flex-shrink:0; }
.desc { font-size:18px; color:${BRAND.warmGray}; line-height:1.4;
  max-width:640px; }
.cta { font-size:16px; font-weight:700; color:${BRAND.red};
  letter-spacing:1px; text-align:right; white-space:nowrap; }
</style></head><body>
<div class="header">
  <div class="brand">
    ${LOGO_B64 ? `<img src="${LOGO_B64}">` : ""}
    <span>Daily Databricks</span>
  </div>
  <div class="title">${esc(tip.title)}</div>
</div>
<div class="terminal">
  <div class="terminal-bar">
    <div class="dot dot-red"></div>
    <div class="dot dot-yellow"></div>
    <div class="dot dot-green"></div>
    <div class="terminal-title">${esc(tip.codeLang || "python")} — databricks notebook</div>
  </div>
  <div class="terminal-body">
${code
  .split("\n")
  .slice(0, 22)
  .map(
    (line, i) =>
      `<div class="code-line"><span class="line-num">${String(i + 1).padStart(2, " ")}</span>${highlightCode(line)}</div>`
  )
  .join("")}
  </div>
</div>
<div class="footer">
  <div class="desc">${esc(tip.description).substring(0, 120)}</div>
  <div class="cta">${BRAND.ctaNewsletter}<br>${BRAND.ctaSite}</div>
</div>
</body></html>`;
}

// ═══════════════════════════════════════════════════════════════════════
//  STYLE 3: EDITORIAL / MAGAZINE
//  Serif fonts, drop caps, rule lines. Premium content authority.
// ═══════════════════════════════════════════════════════════════════════
function templateEditorial(tip) {
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

  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
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

.brand-bar { display:flex; align-items:center; justify-content:space-between;
  border-bottom: 2px solid ${BRAND.charcoal}; padding-bottom:16px;
  margin-bottom:40px; }
.brand-left { display:flex; align-items:center; gap:12px; }
.brand-left img { height:36px; border-radius:4px; }
.brand-left span { font-weight:700; font-size:14px; color:${BRAND.charcoal};
  letter-spacing:3px; text-transform:uppercase; }
.brand-right { font-size:13px; color:${BRAND.warmGray};
  letter-spacing:1px; text-transform:uppercase; }

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

.quote-block {
  border-left: 4px solid ${BRAND.red};
  padding: 24px 32px;
  background: rgba(227,36,43,0.04);
  margin-bottom:28px;
}
.quote-text { font-family:'Playfair Display',serif;
  font-size:26px; font-style:italic; color:${BRAND.charcoal};
  line-height:1.45; }

.desc { font-size:20px; color:#555; line-height:1.6;
  flex-grow:1; }

.bottom-bar { display:flex; justify-content:space-between;
  align-items:center; border-top:1px solid #ddd; padding-top:20px;
  margin-top:auto; }
.tags { display:flex; gap:8px; flex-wrap:wrap; }
.tag { background:${BRAND.charcoal}; color:${BRAND.white};
  font-size:12px; font-weight:700; padding:6px 14px;
  border-radius:20px; letter-spacing:1px; text-transform:uppercase; }
.cta-bar { font-size:15px; font-weight:700; color:${BRAND.red};
  letter-spacing:1px; }
</style></head><body>
<div class="container">
  <div class="brand-bar">
    <div class="brand-left">
      ${LOGO_B64 ? `<img src="${LOGO_B64}">` : ""}
      <span>Daily Databricks</span>
    </div>
    <div class="brand-right">Tips & Tricks</div>
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
      ${tip.categories
        .slice(0, 3)
        .map((c) => `<span class="tag">${esc(c)}</span>`)
        .join("")}
    </div>
    <div class="cta-bar">${BRAND.ctaNewsletter} &bull; ${
    BRAND.ctaSite
  }</div>
  </div>
</div>
</body></html>`;
}

// ═══════════════════════════════════════════════════════════════════════
//  STYLE 4: NEON GLOW
//  Dark mode with glowing red neon text. Cyberpunk/tech editorial.
// ═══════════════════════════════════════════════════════════════════════
function templateNeon(tip) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  width:1080px; height:1080px;
  background: ${BRAND.black};
  font-family: 'Inter', sans-serif;
  overflow:hidden; display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  position:relative;
}
/* Red frame with glow */
body::before { content:''; position:absolute; inset:0;
  border:10px solid ${BRAND.red}; z-index:10; pointer-events:none;
  box-shadow: inset 0 0 60px rgba(227,36,43,0.15),
              inset 0 0 120px rgba(227,36,43,0.05); }

/* Subtle grid pattern */
body::after { content:''; position:absolute; inset:0;
  background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 40px 40px; z-index:1; pointer-events:none; }

.content { position:relative; z-index:5; text-align:center;
  padding:0 80px; max-width:100%; }

.brand { display:flex; align-items:center; justify-content:center;
  gap:12px; margin-bottom:48px; }
.brand img { height:48px; border-radius:6px;
  filter: drop-shadow(0 0 12px rgba(227,36,43,0.4)); }
.brand span { font-weight:700; font-size:16px; color:${BRAND.warmGray};
  letter-spacing:3px; text-transform:uppercase; }

.title {
  font-size:72px; font-weight:900; color:${BRAND.white};
  text-transform:uppercase; line-height:1.1; margin-bottom:32px;
  text-shadow: 0 0 40px rgba(227,36,43,0.4),
               0 0 80px rgba(227,36,43,0.2);
}
.title .accent { color:${BRAND.red};
  text-shadow: 0 0 30px rgba(227,36,43,0.8),
               0 0 60px rgba(227,36,43,0.4),
               0 0 100px rgba(227,36,43,0.2); }

.sep { width:120px; height:4px; margin:0 auto 36px;
  background: ${BRAND.red};
  box-shadow: 0 0 20px rgba(227,36,43,0.6),
              0 0 40px rgba(227,36,43,0.3); border-radius:2px; }

.desc { font-size:26px; color:${BRAND.warmGray}; line-height:1.5;
  max-width:700px; margin:0 auto; }

.cta { position:absolute; bottom:44px; left:0; right:0;
  text-align:center; z-index:5; }
.cta-text { font-size:18px; font-weight:700; color:${BRAND.red};
  letter-spacing:2px;
  text-shadow: 0 0 20px rgba(227,36,43,0.5); }
</style></head><body>
<div class="content">
  <div class="brand">
    ${LOGO_B64 ? `<img src="${LOGO_B64}">` : ""}
    <span>Daily Databricks</span>
  </div>
  <div class="title">
    ${esc(tip.title)
      .split(" ")
      .map((word, i) => (i % 3 === 0 ? `<span class="accent">${word}</span>` : word))
      .join(" ")}
  </div>
  <div class="sep"></div>
  <div class="desc">${esc(tip.description).substring(0, 180)}</div>
</div>
<div class="cta">
  <span class="cta-text">${BRAND.ctaNewsletter}  &bull;  ${
    BRAND.ctaSite
  }</span>
</div>
</body></html>`;
}

// ═══════════════════════════════════════════════════════════════════════
//  STYLE 5: GRADIENT SPLIT
//  Rich gradient background, floating white card, modern UI components.
// ═══════════════════════════════════════════════════════════════════════
function templateGradientSplit(tip) {
  const codeHtml = tip.codeSnippet
    ? `<div class="code-card"><pre><code>${highlightCode(
        tip.codeSnippet
      )}</code></pre></div>`
    : "";

  const points = tip.summaryPoints.length
    ? tip.summaryPoints
        .slice(0, 3)
        .map((p) => `<li>${esc(stripMd(p))}</li>`)
        .join("")
    : `<li>${esc(stripMd(tip.description)).substring(0, 120)}</li>`;

  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&family=JetBrains+Mono&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  width:1080px; height:1080px; overflow:hidden;
  font-family:'Inter',sans-serif; position:relative;
  background: linear-gradient(160deg, ${BRAND.charcoal} 0%, #2a1020 40%, ${BRAND.red} 100%);
}
/* Red frame */
body::before { content:''; position:absolute; inset:0;
  border:10px solid ${BRAND.red}; z-index:10; pointer-events:none; }

/* Decorative circles */
.deco1 { position:absolute; width:300px; height:300px; border-radius:50%;
  border:2px solid rgba(255,255,255,0.06);
  top:-80px; right:-60px; }
.deco2 { position:absolute; width:200px; height:200px; border-radius:50%;
  border:2px solid rgba(255,255,255,0.04);
  bottom:100px; left:-40px; }

.layout { display:grid; grid-template-columns:1fr 1fr;
  height:100%; padding:64px; gap:48px; position:relative; z-index:5; }

/* Left column */
.left { display:flex; flex-direction:column; justify-content:center; }
.brand { display:flex; align-items:center; gap:12px; margin-bottom:32px; }
.brand img { height:44px; border-radius:6px; }
.brand span { font-weight:700; font-size:16px; color:rgba(255,255,255,0.6);
  letter-spacing:2px; text-transform:uppercase; }
.title { font-size:48px; font-weight:900; color:${BRAND.white};
  line-height:1.15; margin-bottom:24px; text-transform:uppercase; }
.sep { width:60px; height:4px; background:${BRAND.white}; opacity:0.4;
  border-radius:2px; margin-bottom:28px; }
.points { list-style:none; }
.points li { font-size:20px; color:rgba(255,255,255,0.8);
  line-height:1.5; padding:10px 0; padding-left:24px;
  position:relative; }
.points li::before { content:''; position:absolute; left:0; top:18px;
  width:10px; height:10px; background:${BRAND.red};
  border-radius:50%; }
.cta-bottom { margin-top:auto; padding-top:24px; }
.cta-bottom a, .cta-bottom span { display:block; font-size:18px;
  font-weight:700; color:${BRAND.white}; margin-bottom:8px;
  letter-spacing:1px; text-decoration:none; }

/* Right column */
.right { display:flex; flex-direction:column; justify-content:center; }
.code-card {
  background:rgba(40,44,52,0.95); border-radius:20px;
  padding:32px; box-shadow:0 20px 60px rgba(0,0,0,0.4);
  border:1px solid rgba(255,255,255,0.08);
  overflow:hidden; max-height:600px;
}
.code-card pre { margin:0; font-family:'JetBrains Mono',monospace;
  font-size:17px; line-height:1.6; color:#abb2bf; white-space:pre-wrap; }
.keyword { color:#c678dd; } .string { color:#98c379; }
.comment { color:#5c6370; font-style:italic; } .number { color:#d19a66; }

.desc-card {
  background: rgba(255,255,255,0.08); border-radius:16px;
  padding:28px; margin-top:20px;
  border:1px solid rgba(255,255,255,0.08);
}
.desc-card p { font-size:22px; color:rgba(255,255,255,0.7);
  line-height:1.5; }
</style></head><body>
<div class="deco1"></div><div class="deco2"></div>
<div class="layout">
  <div class="left">
    <div class="brand">
      ${LOGO_B64 ? `<img src="${LOGO_B64}">` : ""}
      <span>Daily Databricks</span>
    </div>
    <div class="title">${esc(tip.title)}</div>
    <div class="sep"></div>
    <ul class="points">${points}</ul>
    <div class="cta-bottom">
      <span>${BRAND.ctaNewsletter}</span>
      <span>${BRAND.ctaSite}</span>
    </div>
  </div>
  <div class="right">
    ${codeHtml}
    ${
      !tip.codeSnippet
        ? `<div class="desc-card"><p>${esc(tip.description).substring(
            0,
            200
          )}</p></div>`
        : ""
    }
  </div>
</div>
</body></html>`;
}

// ── Render functions ─────────────────────────────────────────────────
const TEMPLATES = {
  glassmorphism: templateGlassmorphism,
  terminal: templateTerminal,
  editorial: templateEditorial,
  neon: templateNeon,
  gradient_split: templateGradientSplit,
};

async function renderCard(browser, html, outputPath) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "networkidle0", timeout: 15000 });
  // Wait for fonts
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: outputPath, type: "png" });
  await page.close();
  console.log(`  ✓ ${path.basename(outputPath)}`);
}

// ── Main ─────────────────────────────────────────────────────────────
async function main() {
  // Default showcase: 5 different tips x 5 different styles
  const showcase = [
    {
      qmd: "site/tips/Data Engineering/windowfunctions.qmd",
      style: "glassmorphism",
    },
    { qmd: "site/tips/Notebook/Customcellmagics.qmd", style: "terminal" },
    {
      qmd: "site/tips/Identity/AIAgentsDataAccess-Part1.qmd",
      style: "editorial",
    },
    { qmd: "site/tips/Identity/managedIdentity.qmd", style: "neon" },
    { qmd: "site/tips/Notebook/bindings.qmd", style: "gradient_split" },
  ];

  // Check for single run via args
  const args = process.argv.slice(2);
  let tasks = showcase;
  if (args.includes("--qmd")) {
    const qmdIdx = args.indexOf("--qmd");
    const styleIdx = args.indexOf("--style");
    const qmd = args[qmdIdx + 1];
    const style = styleIdx >= 0 ? args[styleIdx + 1] : "glassmorphism";
    tasks = [{ qmd, style }];
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const { qmd, style } of tasks) {
    const qmdPath = path.join(__dirname, "..", qmd);
    if (!fs.existsSync(qmdPath)) {
      console.error(`  ✗ File not found: ${qmd}`);
      continue;
    }
    const tip = parseQmd(qmdPath);
    const basename = path.basename(qmd, ".qmd");
    const templateFn = TEMPLATES[style];
    if (!templateFn) {
      console.error(`  ✗ Unknown style: ${style}`);
      continue;
    }

    console.log(`\n${basename} → ${style}`);
    const html = templateFn(tip);

    // Save HTML for debugging
    const htmlPath = path.join(OUTPUT_DIR, `${basename}-${style}.html`);
    fs.writeFileSync(htmlPath, html);

    const pngPath = path.join(OUTPUT_DIR, `${basename}-${style}.png`);
    await renderCard(browser, html, pngPath);
  }

  await browser.close();
  console.log("\nDone! Images saved to output/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
