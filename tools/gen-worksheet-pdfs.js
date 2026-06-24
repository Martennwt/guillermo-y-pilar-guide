/* ============================================================================
   Generate the printable worksheet PDFs straight from site/index.html.

   Why: browser "print to PDF" was unreliable on mobile (it printed the whole
   guide / blanked the page). Instead we pre-render each worksheet to a real PDF
   here, ship the files, and make the buttons plain downloads. Identical on every
   device, nothing to print.

   Each worksheet is isolated in its own standalone document (only #worksheets +
   the page's own styles/fonts), exactly like the print stylesheet expects.
   The calorie sheet (ws-calc) is dynamic on the page, so here its placeholders
   become blank lines: a fillable template.

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

const html = fs.readFileSync(path.join(ROOT, "site", "index.html"), "utf8");

// the page's own fonts + styles, same set wsPrintHead() used
const links = (html.match(/<link\b[^>]*>/gi) || []).filter(s => /rel=("?)(stylesheet|preconnect)/i.test(s));
const styles = (html.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || []);
const head = links.join("") + styles.join("");

const siteDir = path.resolve(ROOT, "site").split(path.sep).join("/");
const base = "file:///" + siteDir + "/";

// pull #worksheets out via a balanced <div> scan
const start = html.indexOf('<div id="worksheets"');
let depth = 0, end = -1; const reTok = /<div\b|<\/div>/gi; reTok.lastIndex = start; let t;
while ((t = reTok.exec(html))) {
  if (t[0].toLowerCase() === "</div>") { depth--; if (depth === 0) { end = reTok.lastIndex; break; } } else depth++;
}
const wsBlock = html.slice(start, end);
const inner = wsBlock.slice(wsBlock.indexOf(">") + 1, wsBlock.lastIndexOf("</div>"));

// flat <section> worksheets (they do not nest)
const sections = [];
for (const m of inner.matchAll(/<section\b[\s\S]*?<\/section>/gi)) {
  const idm = m[0].match(/id="(ws-[a-z]+)"/);
  const id = idm ? idm[1] : ("sec" + sections.length);
  let secHtml = m[0];
  if (id === "ws-calc") secHtml = secHtml.replace(/>·</g, ">______<"); // dynamic -> fillable template
  sections.push({ id, html: secHtml });
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
