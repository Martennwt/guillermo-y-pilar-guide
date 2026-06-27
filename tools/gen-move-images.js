/*
 * Generate the "Move Your Body" illustrations via OpenAI gpt-image-1, returned as
 * already-compressed WebP (output_format + output_compression) so no local image tool is needed.
 * Warm Basque-journal gouache style (matches the cheat-sheet images), no text/labels
 * (the panel labels are added in HTML/CSS, not by the model).
 *
 *   node tools/gen-move-images.js            # generate missing images only
 *   node tools/gen-move-images.js --force    # regenerate all
 *   node tools/gen-move-images.js --only livingroom
 */
const fs = require('fs');
const path = require('path');

const KEYDIR = 'C:/Users/marte/Documents/Claude/API keys';
const OUTDIR = path.resolve(__dirname, '..', 'site', 'assets', 'img', 'move');
const key = fs.readFileSync(path.join(KEYDIR, 'OpenAI.txt'), 'utf8').match(/OPENAI_API_KEY=(.+)/)[1].trim();

const STYLE =
  'Warm hand-painted gouache illustration, Mediterranean journal style, soft natural light, ' +
  'muted olive-green and terracotta palette on a soft cream background, subtle paper grain, ' +
  'friendly and encouraging mood. The man is an ordinary middle-aged everyday person with a ' +
  'normal realistic body, short greying hair, casual home clothes, NOT a muscular fitness model, ' +
  'NOT a gym. No text, no words, no letters, no labels, no numbers.';

const JOBS = [
  {
    id: 'livingroom',
    size: '1536x1024',
    prompt:
      'A cozy living room at home. An ordinary middle-aged man in comfortable clothes does a push-up ' +
      'on a small exercise mat on the floor, calm and focused. On the wall in front of him a flat ' +
      'television shows a friendly fitness instructor leading a short workout. A simple sofa and a ' +
      'window with soft daylight in the background. It feels homely and doable, not intimidating. ' + STYLE,
  },
  {
    id: 'exercises',
    size: '1024x1024',
    prompt:
      'An instructional panel cleanly divided into FOUR equal quadrants by thin soft dividing lines ' +
      '(a 2 by 2 grid: two panels on top, two on the bottom). The SAME ordinary middle-aged man ' +
      'demonstrates one simple home exercise in each quadrant, clearly and recognisably: ' +
      'TOP-LEFT: a push-up on the floor. ' +
      'TOP-RIGHT: a bodyweight squat, knees bent, standing. ' +
      'BOTTOM-LEFT: a core exercise lying on his back on the floor, knees bent. ' +
      'BOTTOM-RIGHT: a back exercise pulling a resistance band that is anchored to a closed door. ' +
      'Each quadrant is simple, uncluttered and easy to read so the movement is obvious. ' + STYLE,
  },
];

function has(flag) { return process.argv.includes(flag); }
function val(flag) { const i = process.argv.indexOf(flag); return i >= 0 ? process.argv[i + 1] : null; }

async function gen(prompt, size) {
  const r = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
    body: JSON.stringify({
      model: 'gpt-image-1', prompt, n: 1, size: size || '1024x1024',
      quality: 'high', output_format: 'webp', output_compression: 75,
    }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}: ${(await r.text()).slice(0, 300)}`);
  const j = await r.json();
  return Buffer.from(j.data[0].b64_json, 'base64');
}

(async () => {
  fs.mkdirSync(OUTDIR, { recursive: true });
  const force = has('--force');
  const only = val('--only'); const onlySet = only ? new Set(only.split(',')) : null;
  for (const job of JOBS) {
    if (onlySet && !onlySet.has(job.id)) continue;
    const out = path.join(OUTDIR, job.id + '.webp');
    if (!force && fs.existsSync(out)) { console.log(`skip  ${job.id} (exists)`); continue; }
    const buf = await gen(job.prompt, job.size);
    fs.writeFileSync(out, buf);
    console.log(`ok    ${job.id} -> ${(buf.length / 1024).toFixed(0)} KB  (${job.size})`);
  }
  console.log('DONE ->', OUTDIR);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
