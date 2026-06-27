/*
 * Generate the "Move Your Body" PHOTOREALISTIC images via Google "Nano Banana Pro"
 * (gemini-3-pro-image), then compress PNG -> WebP with sharp so the files stay small.
 * (Marten asked for real photos, not the earlier gouache illustrations.)
 *
 * Keys are read from C:/Users/marte/Documents/Claude/API keys/Nano-Banana-Google.txt.
 * sharp lives in the shared image-tools folder (one-time: npm install sharp --prefix that folder).
 *
 *   node tools/gen-move-images.js            # generate missing images only
 *   node tools/gen-move-images.js --force    # regenerate all
 *   node tools/gen-move-images.js --only livingroom
 */
const fs = require('fs');
const path = require('path');

const KEYDIR = 'C:/Users/marte/Documents/Claude/API keys';
const TOOLS = 'C:/Users/marte/Documents/Claude/tools/images'; // shared tools, holds node_modules/sharp
const OUTDIR = path.resolve(__dirname, '..', 'site', 'assets', 'img', 'move');
const MODEL = 'gemini-3-pro-image';

let sharp;
try { sharp = require(path.join(TOOLS, 'node_modules', 'sharp')); }
catch (e) { console.error('sharp not found. Run once:  npm install sharp --prefix "' + TOOLS + '"'); process.exit(1); }
const key = fs.readFileSync(path.join(KEYDIR, 'Nano-Banana-Google.txt'), 'utf8').match(/GEMINI_API_KEY=(.+)/)[1].trim();

const STYLE =
  'Photorealistic, candid and natural, soft warm lighting. An ordinary middle-aged man around 58 with a ' +
  'normal everyday body (not a fitness model), short greying hair, casual home clothes. No text, no labels.';

const JOBS = [
  { id: 'livingroom', prompt:
      'A warm natural photograph of the man doing a push-up on a small exercise mat on the floor of a cozy ' +
      'lived-in living room. On the wall in front of him a flat-screen TV shows a fitness instructor leading a ' +
      'workout. A simple sofa, a houseplant and a window with soft daylight behind him. 35mm, shallow depth of field. ' + STYLE },
  { id: 'exercises', prompt:
      'A clean four-panel photo grid, two by two, thin white gutters, plain light neutral background. The SAME ' +
      'man demonstrates one simple home exercise per panel, clearly visible from the side: TOP-LEFT a push-up on ' +
      'the floor; TOP-RIGHT a bodyweight squat with knees bent; BOTTOM-LEFT a core crunch lying on his back with ' +
      'knees bent; BOTTOM-RIGHT a back exercise pulling a resistance band anchored to a closed door. Consistent ' +
      'same person and clothing in all four panels. ' + STYLE },
];

function has(f) { return process.argv.includes(f); }
function val(f) { const i = process.argv.indexOf(f); return i >= 0 ? process.argv[i + 1] : null; }

async function gen(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`;
  const r = await fetch(url, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}: ${(await r.text()).slice(0, 300)}`);
  const j = await r.json();
  const part = (j?.candidates?.[0]?.content?.parts || []).find((p) => p.inlineData?.data);
  if (!part) throw new Error('no image in response: ' + JSON.stringify(j).slice(0, 200));
  return Buffer.from(part.inlineData.data, 'base64');
}

(async () => {
  fs.mkdirSync(OUTDIR, { recursive: true });
  const force = has('--force');
  const only = val('--only'); const onlySet = only ? new Set(only.split(',')) : null;
  for (const job of JOBS) {
    if (onlySet && !onlySet.has(job.id)) continue;
    const out = path.join(OUTDIR, job.id + '.webp');
    if (!force && fs.existsSync(out)) { console.log(`skip  ${job.id} (exists)`); continue; }
    const png = await gen(job.prompt);
    const webp = await sharp(png).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
    fs.writeFileSync(out, webp);
    console.log(`ok    ${job.id} -> ${(webp.length / 1024).toFixed(0)} KB`);
  }
  console.log('DONE ->', OUTDIR);
})().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
