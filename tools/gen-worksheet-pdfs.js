/* ============================================================================
   Generate the printable worksheet PDFs from the LIVE, JS-rendered page.

   Why: browser "print to PDF" was unreliable on mobile (printed the whole guide
   / blanked the page). We pre-render each worksheet to a real PDF here and the
   buttons just download them.

   IMPORTANT: some worksheets are built by JavaScript at load time — the honest
   check-in questions (#wsCheckEn/#wsCheckEs) and the 45-day grid (#wsGrid). So we
   must read the DOM *after* JS runs. We do that with Chrome's --dump-dom, then
   isolate each worksheet exactly as the print stylesheet expects.

   The calorie sheet (ws-calc) is personal, so its value fields are blanked here
   into a fillable template.

   Usage:  node tools/gen-worksheet-pdfs.js "<chrome.exe>" "<project root>"
   Output: site/assets/worksheets/<id>-<lang>.pdf  +  worksheets-all-<lang>.pdf
   ============================================================================ */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const CHROME = process.argv[2];
const ROOT = process.argv[3];
if (!CHROME || !ROOT) { console.error("usage: node gen-worksheet-pdfs.js <chrome> <root>"); process.exit(1); }

const OUT = path.join(ROOT, "site", "assets", "worksheets");
fs.mkdirSync(OUT, { recursive: true });
const PROFILE = path.join(OUT, "_chrome-profile");

const indexUrl = "file:///" + path.resolve(ROOT, "site", "index.html").split(path.sep).join("/");

// --- render the page with JS, grab the post-load DOM ---
console.log("dumping JS-rendered DOM ...");
const html = execFileSync(CHROME, [
  "--headless", "--disable-gpu", "--no-first-run", "--user-data-dir=" + PROFILE,
  "--virtual-time-budget=8000", "--dump-dom", indexUrl
], { encoding: "utf8", maxBuffer: 128 * 1024 * 1024 });

// the page's own fonts + styles
const links = (html.match(/<link\b[^>]*>/gi) || []).filter(s => /rel=("?)(stylesheet|preconnect)/i.test(s));
const styles = (html.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || []);
const head = links.join("") + styles.join("");

const siteDir = path.resolve(ROOT, "site").split(path.sep).join("/");
const base = "file:///" + siteDir + "/";

// pull #worksheets out via a balanced <div> scan
const start = html.indexOf('<div id="worksheets"');
if (start < 0) { console.error("no #worksheets in dumped DOM"); process.exit(1); }
let depth = 0, end = -1; const reTok = /<div\b|<\/div>/gi; reTok.lastIndex = start; let t;
while ((t = reTok.exec(html))) {
  if (t[0].toLowerCase() === "</div>") { depth--; if (depth === 0) { end = reTok.lastIndex; break; } } else depth++;
}
const inner = html.slice(start, end).replace(/^[^>]*>/, "").replace(/<\/div>\s*$/, "");

// blank the calorie sheet's value fields -> fillable template
function blankCalc(secHtml) {
  return secHtml
    .replace(/(<(?:span|td|strong)\b[^>]*\bwc-(?:name|age|ht|wt|sex|act|burn|low|high)\b[^>]*>)[\s\S]*?(<\/(?:span|td|strong)>)/gi, "$1______$2")
    .replace(/>·</g, ">______<");
}

// flat <section> worksheets (they do not nest)
const sections = [];
for (const m of inner.matchAll(/<section\b[\s\S]*?<\/section>/gi)) {
  const idm = m[0].match(/id="(ws-[a-z]+)"/);
  const id = idm ? idm[1] : ("sec" + sections.length);
  sections.push({ id, html: id === "ws-calc" ? blankCalc(m[0]) : m[0] });
}
console.log("found " + sections.length + " worksheets: " + sections.map(s => s.id).join(", "));

function doc(lang, innerHtml) {
  return '<!doctype html><html lang="' + lang + '" data-lang="' + lang + '">' +
    '<head><meta charset="utf-8"><title>WS</title><base href="' + base + '">' + head + '</head>' +
    '<body class="ws-print-all"><div id="worksheets">' + innerHtml + '</div></body></html>';
}

function render(name, lang, innerHtml) {
  const tmp = path.join(OUT, "_tmp-" + name + "-" + lang + ".html");
  const pdf = path.join(OUT, name + "-" + lang + ".pdf");
  fs.writeFileSync(tmp, doc(lang, innerHtml));
  execFileSync(CHROME, [
    "--headless", "--disable-gpu", "--no-first-run", "--no-pdf-header-footer",
    "--user-data-dir=" + PROFILE, "--virtual-time-budget=6000",
    "--print-to-pdf=" + pdf, tmp
  ], { stdio: "ignore" });
  fs.unlinkSync(tmp);
  console.log("  " + path.basename(pdf) + "  (" + Math.round(fs.statSync(pdf).size / 1024) + " KB)");
}

const allInner = sections.map(s => s.html).join("\n");
for (const lang of ["es", "en"]) {
  console.log("[" + lang + "]");
  for (const s of sections) render(s.id, lang, s.html);
  render("worksheets-all", lang, allInner);
}
try { fs.rmSync(PROFILE, { recursive: true, force: true }); } catch (e) {}
console.log("done -> " + OUT);
