/* ============================================================================
   Split the long "Mover el cuerpo" chapter into two parts WITHOUT re-rendering.

   The chapter audio (dave ~11 min, toni ~8.5 min) is cut once, in place, at a
   real pause near the ~57% mark: the boundary between the "first make it safe"
   half (why move, the back story, get cleared, the physios) and the "now just do
   it" half (keep it simple, walk, workout, Pilar, close). The cut lands in the
   middle of a detected silence, so no word is clipped, and the original take is
   kept (no ElevenLabs credits spent).

   Input :  site/assets/audio/<voice>/10-mover-el-cuerpo.mp3
   Output:  10-mover-el-cuerpo-1.mp3  +  10-mover-el-cuerpo-2.mp3   (-c copy)

   Run:  node tools/audio/split-move.js
   ============================================================================ */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = "C:/Users/marte/Documents/Claude/Guillermo Y Pillar";
const AUDIO = path.join(ROOT, "site/assets/audio");
const VOICES = ["dave", "toni"];
const SRC = "10-mover-el-cuerpo.mp3";
const TARGET = 0.565;                 // split near here (the "now keep it simple" boundary)
const SILENCE = "silencedetect=noise=-34dB:d=0.3";

// find ffmpeg/ffprobe (winget Gyan build, or ffmpeg-static, or PATH)
function findBin(name) {
  const cands = [
    "C:/Users/marte/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.1-full_build/bin/" + name + ".exe",
    "C:/Users/marte/Documents/Claude/tools/video/node_modules/ffmpeg-static/" + name + ".exe",
    name,
  ];
  for (const c of cands) { if (c === name || fs.existsSync(c)) return c; }
  return name;
}
const FF = findBin("ffmpeg"), FP = findBin("ffprobe");

function duration(file) {
  const r = spawnSync(FP, ["-v", "error", "-show_entries", "format=duration", "-of", "default=nk=1:nw=1", file], { encoding: "utf8" });
  return parseFloat(r.stdout.trim());
}
function silences(file) {
  const er = spawnSync(FF, ["-i", file, "-af", SILENCE, "-f", "null", "-"], { encoding: "utf8" }).stderr;
  const out = []; let cur = null;
  for (const line of er.split(/\r?\n/)) {
    let m = line.match(/silence_start:\s*([\d.]+)/); if (m) cur = { start: +m[1] };
    m = line.match(/silence_end:\s*([\d.]+)/); if (m && cur) { cur.end = +m[1]; cur.mid = (cur.start + cur.end) / 2; out.push(cur); cur = null; }
  }
  return out;
}
function cut(file, ss, t, out) {
  const args = ["-y", "-v", "error"];
  if (ss != null) args.push("-ss", String(ss));
  args.push("-i", file);
  if (t != null) args.push("-t", String(t));
  args.push("-c", "copy", out);
  const r = spawnSync(FF, args, { encoding: "utf8" });
  if (r.status !== 0) throw new Error("ffmpeg cut failed: " + r.stderr);
}

for (const v of VOICES) {
  const inp = path.join(AUDIO, v, SRC);
  if (!fs.existsSync(inp)) { console.log("[" + v + "] no " + SRC + " - skip"); continue; }
  const dur = duration(inp);
  const sil = silences(inp);
  const target = TARGET * dur;
  let best = sil[0];
  for (const s of sil) if (Math.abs(s.mid - target) < Math.abs(best.mid - target)) best = s;
  const at = best.mid;
  const p1 = path.join(AUDIO, v, "10-mover-el-cuerpo-1.mp3");
  const p2 = path.join(AUDIO, v, "10-mover-el-cuerpo-2.mp3");
  cut(inp, null, at, p1);
  cut(inp, at, null, p2);
  console.log("[" + v + "] " + dur.toFixed(0) + "s split at " + at.toFixed(1) + "s (" + (at / dur * 100).toFixed(0) + "%)"
    + "  -> part1 " + Math.round(duration(p1)) + "s, part2 " + Math.round(duration(p2)) + "s");
}
console.log("done.");
