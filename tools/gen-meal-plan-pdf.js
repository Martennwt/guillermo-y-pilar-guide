/*
 * Renders the standalone meal-plan print page to a PDF via headless Chrome.
 *   in:  site/meal-plan-print.html   (static, self-contained, white/print-first)
 *   out: site/assets/worksheets/meal-plan-en.pdf
 *
 * The page is fully static (no JS-built content), so a single --print-to-pdf pass is enough
 * (no --dump-dom two-pass like gen-worksheet-pdfs.js needs). The download button in the guide
 * (dlWorksheet('meal-plan')) points at the file this writes.
 *
 * Usage: node tools/gen-meal-plan-pdf.js ["<chrome.exe>"] [lang=en]
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const CHROME = process.argv[2] || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const LANG = process.argv[3] || "en";
const ROOT = path.resolve(__dirname, "..");

const srcName = LANG === "es" ? "meal-plan-print-es.html" : "meal-plan-print.html";
const inHtml = "file:///" + path.resolve(ROOT, "site", srcName).split(path.sep).join("/");
const outPdf = path.resolve(ROOT, "site", "assets", "worksheets", "meal-plan-" + LANG + ".pdf");
const PROFILE = path.join(os.tmpdir(), "_chrome-profile-meal");

fs.mkdirSync(path.dirname(outPdf), { recursive: true });
fs.mkdirSync(PROFILE, { recursive: true });

execFileSync(CHROME, [
  "--headless", "--disable-gpu", "--no-first-run", "--no-pdf-header-footer",
  "--user-data-dir=" + PROFILE, "--virtual-time-budget=6000",
  "--print-to-pdf=" + outPdf, inHtml
], { stdio: "ignore" });

try { fs.rmSync(PROFILE, { recursive: true, force: true }); } catch (e) {}

console.log(fs.existsSync(outPdf)
  ? "OK  " + outPdf + "  (" + fs.statSync(outPdf).size + " bytes)"
  : "FAILED: no PDF written");
