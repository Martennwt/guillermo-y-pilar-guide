/*
 * Generate the cheat-sheet food illustrations via OpenAI gpt-image-1, returned as
 * already-compressed WebP (output_format + output_compression) so no local image tool is needed.
 * Warm Basque-journal style, no text/labels (red "crossed out" is done in CSS, not by the model).
 *
 *   node gen-food-images.js            # generate missing images only
 *   node gen-food-images.js --force    # regenerate all
 *   node gen-food-images.js --only cola,sweets
 */
const fs = require('fs');
const path = require('path');

const KEYDIR = 'C:/Users/marte/Documents/Claude/API keys';
const OUTDIR = path.resolve(__dirname, '..', 'site', 'assets', 'img', 'cheatsheet');
const key = fs.readFileSync(path.join(KEYDIR, 'OpenAI.txt'), 'utf8').match(/OPENAI_API_KEY=(.+)/)[1].trim();

const STYLE =
  'Warm hand-painted gouache illustration, centered on a soft cream paper background, ' +
  'Mediterranean cookbook journal style, gentle natural light, muted olive-green and terracotta palette, ' +
  'subtle paper grain, plain unbranded packaging, no text, no words, no letters, no labels, ' +
  'a single clear subject, flat lay seen slightly from above.';

const JOBS = [
  // --- "leave it on the shelf" offenders (red list) ---
  { id: 'cola',     prompt: 'A glass bottle and a can of dark cola fizzing, beside a pile of sugar cubes. ' + STYLE },
  { id: 'sweets',   prompt: 'A small heap of sweets: a chocolate bar, two biscuits and a sugary pastry. ' + STYLE },
  { id: 'chips',    prompt: 'A bowl of salty potato crisps with a few spilling onto the surface. ' + STYLE },
  { id: 'meat',     prompt: 'A few links of cured sausage and rashers of bacon on a board. ' + STYLE },
  { id: 'white',    prompt: 'Sliced soft white bread and a bowl of brightly coloured sugary breakfast cereal. ' + STYLE },
  { id: 'ready',    prompt: 'A plastic microwave ready-meal tray and a cup of instant noodles. ' + STYLE },
  // --- optional "fill the cart" heroes (green list) ---
  { id: 'veg',      prompt: 'A colourful pile of fresh vegetables: tomatoes, peppers, lettuce, onion, garlic. ' + STYLE, group: 'good' },
  { id: 'fish',     prompt: 'Fresh fish and a tin of sardines beside a lemon. ' + STYLE, group: 'good' },
  { id: 'eggs',     prompt: 'A small bowl of fresh eggs, two cracked open showing the yolk. ' + STYLE, group: 'good' },
  { id: 'beans',    prompt: 'A bowl of cooked beans, lentils and chickpeas. ' + STYLE, group: 'good' },
  { id: 'fruit',    prompt: 'A simple arrangement of seasonal fruit: apples, oranges and a bunch of grapes. ' + STYLE, group: 'good' },
  { id: 'yogurt',   prompt: 'A bowl of plain yogurt topped with berries and a small handful of nuts. ' + STYLE, group: 'good' },
];

function has(flag) { return process.argv.includes(flag); }
function val(flag) { const i = process.argv.indexOf(flag); return i >= 0 ? process.argv[i + 1] : null; }

async function gen(prompt) {
  const r = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
    body: JSON.stringify({
      model: 'gpt-image-1', prompt, n: 1, size: '1024x1024',
      quality: 'medium', output_format: 'webp', output_compression: 70,
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
    const buf = await gen(job.prompt);
    fs.writeFileSync(out, buf);
    console.log(`ok    ${job.id} -> ${(buf.length / 1024).toFixed(0)} KB`);
  }
  console.log('DONE ->', OUTDIR);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
