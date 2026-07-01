/* Renders site/guillermo-scenarios.html -> site/assets/worksheets/guillermo-scenarios-en.pdf
   Static one-pager (SVG chart, no JS), single headless-Chrome pass.
   Usage: node tools/gen-scenarios-pdf.js ["<chrome.exe>"] */
const { execFileSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const CHROME = process.argv[2] || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const LANG = process.argv[3] || "en";
const NAME = process.argv[4] || "guillermo-scenarios";   // e.g. guillermo-scenarios | pilar-scenarios
const ROOT = path.resolve(__dirname, "..");
const srcName = NAME + (LANG === "es" ? "-es" : "") + ".html";
const inHtml = "file:///" + path.resolve(ROOT, "site", srcName).split(path.sep).join("/");
const outPdf = path.resolve(ROOT, "site", "assets", "worksheets", NAME + "-" + LANG + ".pdf");
const PROFILE = path.join(os.tmpdir(), "_chrome-profile-scen");
fs.mkdirSync(path.dirname(outPdf), { recursive: true });
fs.mkdirSync(PROFILE, { recursive: true });
execFileSync(CHROME, [
  "--headless", "--disable-gpu", "--no-first-run", "--no-pdf-header-footer",
  "--user-data-dir=" + PROFILE, "--virtual-time-budget=6000",
  "--print-to-pdf=" + outPdf, inHtml
], { stdio: "ignore" });
try { fs.rmSync(PROFILE, { recursive: true, force: true }); } catch (e) {}
console.log(fs.existsSync(outPdf) ? "OK  " + outPdf + "  (" + fs.statSync(outPdf).size + " bytes)" : "FAILED");
