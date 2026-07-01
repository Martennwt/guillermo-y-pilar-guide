/* Renders tools/worksheet-es.html -> site/assets/mi-porque-worksheet.pdf (2 pages, print-friendly).
   Static, single headless-Chrome pass. Usage: node tools/gen-why-worksheet-pdf.js ["<chrome.exe>"] */
const { execFileSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const CHROME = process.argv[2] || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ROOT = path.resolve(__dirname, "..");
const inHtml = "file:///" + path.resolve(ROOT, "tools", "worksheet-es.html").split(path.sep).join("/");
const outPdf = path.resolve(ROOT, "site", "assets", "mi-porque-worksheet.pdf");
const PROFILE = path.join(os.tmpdir(), "_chrome-why");
fs.mkdirSync(path.dirname(outPdf), { recursive: true });
fs.mkdirSync(PROFILE, { recursive: true });
execFileSync(CHROME, [
  "--headless", "--disable-gpu", "--no-first-run", "--no-pdf-header-footer",
  "--user-data-dir=" + PROFILE, "--virtual-time-budget=6000",
  "--print-to-pdf=" + outPdf, inHtml
], { stdio: "ignore" });
try { fs.rmSync(PROFILE, { recursive: true, force: true }); } catch (e) {}
console.log(fs.existsSync(outPdf) ? "OK  " + outPdf + "  (" + fs.statSync(outPdf).size + " bytes)" : "FAILED");
