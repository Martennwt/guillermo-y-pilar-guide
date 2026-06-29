/* ============================================================================
   Audio builder — ONE ElevenLabs call per chapter (consistent timbre + seekable).

   Reads the CURRENT Spanish (lang-es) prose straight out of site/index.html, so
   the audio always matches the latest text. Strips tags, eyebrows, nav buttons,
   figures, CTA and emojis. One call per chapter, manifest-hashed to skip unchanged,
   old files backed up once into _backup/<voice>/.

   Two voices, switchable in the player. Files go to assets/audio/<voiceFolder>/.

   Run:
     node "tools/audio/build-audio.js" --voice guillermo          (all chapters)
     node "tools/audio/build-audio.js" --voice guillermo --only welcome
     node "tools/audio/build-audio.js" --voice guillermo --dry    (no API, just preview)
   ============================================================================ */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT  = 'C:/Users/marte/Documents/Claude/Guillermo Y Pillar';
const SITE  = path.join(ROOT, 'site');
const HTML  = path.join(SITE, 'index.html');
const AUDIO = path.join(SITE, 'assets/audio');
const KEYDIR = 'C:/Users/marte/Documents/Claude/API keys';
const MODEL = 'eleven_multilingual_v2';

const VOICES = {
  guillermo: { id: 'qUPtETgSYRhCRb2pfOla', folder: 'guillermo',
    settings: { stability: 0.9, similarity_boost: 0.9, style: 0.4, use_speaker_boost: true, speed: 1.0 } },
  dave:      { id: 'QtPMrakdgePQIUwOX7Ut', folder: 'dave', pause: 0,
    settings: { stability: 0.9, similarity_boost: 0.9, style: 0.4, use_speaker_boost: true, speed: 1.08 } },
  // Toni: expressive, fast and spontaneous. The "fast voice" alternative to the slower dave.
  // pause: seconds of silence inserted between paragraphs/headings so the fast voice does not rush.
  toni:      { id: '851ejYcv2BoNPjrkw93G', folder: 'toni', pause: 0.6,
    settings: { stability: 0.5, similarity_boost: 0.85, style: 0.5, use_speaker_boost: true, speed: 1.08 } },
};

/* Sections to voice, top down to "How you do it". id = the section's id in index.html. */
const CHAPTERS = [
  { id: 'welcome',   out: '00-welcome.mp3' },
  { id: 'start',     out: '01-antes-de-empezar.mp3' },
  { id: 'captain',   out: '02-quien-es-el-capitan.mp3' },
  { id: 'struggles', out: '03-esto-te-suena.mp3' },
  { id: 'systems',   out: '04-fuerza-de-voluntad.mp3' },
  { id: 'honest',    out: '05-como-se-hace.mp3', set: { stability: 0.8 } },
  { id: 'why',       out: '06-vuestro-porque.mp3' },
  { id: 'insanity',  out: '07-la-locura.mp3' },
  { id: 'close',     out: '08-sigue-volviendo.mp3' },
  { id: 'how',       out: '09-calorias.mp3', voices: ['dave', 'toni'] },
  { id: 'move',      out: '10-mover-el-cuerpo.mp3' },
  { id: 'motivation', out: '11-pagina-de-poder.mp3', voices: ['toni'] },  // fast voice only from here on
];

// Remove a whole <div class="<cls>..."> block (incl. nested divs) from the HTML before voicing.
// Used to skip the physio address cards in #move: they are shown in the guide, never read aloud.
function stripDiv(html, cls) {
  let out = html;
  for (;;) {
    const start = out.indexOf('<div class="' + cls);
    if (start < 0) break;
    const re = /<\/?div\b/g; re.lastIndex = start;
    let m, depth = 0, endTag = -1;
    while ((m = re.exec(out))) {
      if (m[0] === '<div') depth++;
      else if (--depth === 0) { endTag = m.index; break; }
    }
    if (endTag < 0) break;                       // unbalanced: bail, do not loop forever
    const close = out.indexOf('>', endTag);
    if (close < 0) break;
    out = out.slice(0, start) + ' ' + out.slice(close + 1);
  }
  return out;
}

function readKey() {
  const txt = fs.readFileSync(path.join(KEYDIR, 'ElevenLabs.txt'), 'utf8');
  const m = txt.match(/ELEVENLABS_API_KEY=(.+)/) || txt.match(/(sk_[A-Za-z0-9]+)/);
  if (!m) throw new Error('ELEVENLABS_API_KEY not found in ElevenLabs.txt');
  return m[1].trim();
}

function extractEs(html, id, pauseSec = 0) {
  const i = html.indexOf('id="' + id + '"');
  if (i < 0) throw new Error('section not found: ' + id);
  const esTag = '<div class="lang-es">';
  const s = html.indexOf(esTag, i);
  const secEnd = html.indexOf('</section>', s);
  if (s < 0 || secEnd < 0 || s > secEnd) throw new Error('lang-es not found for ' + id);
  let b = html.slice(s + esTag.length, secEnd);
  b = b.split('<div class="cio"')[0];   // drop the shared calculator widget (and anything after it) from the voiced text
  b = stripDiv(b, 'physios');           // #move: skip the physio address cards, an audio-only line points to them instead
  b = stripDiv(b, 'no-audio');          // generic "shown in the guide, not read aloud" marker (e.g. the affirmation cards)
  b = b
    .replace(/<div class="eyebrow">[\s\S]*?<\/div>/g, ' ')
    .replace(/<div class="nextprev">[\s\S]*?<\/div>/g, ' ')
    .replace(/<div class="cta">[\s\S]*?<\/div>/g, ' ')
    .replace(/<p class="why-dl">[\s\S]*?<\/p>/g, ' ')
    .replace(/<figure[\s\S]*?<\/figure>/g, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/<br\s*\/?>/g, ' ');
  // mark the end of every block (paragraph, heading, list item) so we can pause there
  b = b.replace(/<\/(?:p|h1|h2|h3|h4|li|blockquote)>/g, '');
  b = b.replace(/<[^>]+>/g, ' ');
  b = b.replace(/&amp;/g, 'y').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
       .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
  b = b.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}️‍]/gu, '');
  // one clean chunk per block; drop empties
  const chunks = b.split('')
    .map(t => t.replace(/\s+([.,;:!?»])/g, '$1').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  // the fast voice rushes between paragraphs, so glue blocks with a real pause;
  // the slow voice (pause 0) joins with a plain space, so its text stays byte-identical (no needless re-render)
  const joiner = pauseSec > 0 ? ` <break time="${pauseSec}s" /> ` : ' ';
  return chunks.join(joiner);
}

const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i >= 0 ? process.argv[i + 1] : d; };
const has = (n) => process.argv.includes('--' + n);

async function tts(text, voice, key) {
  const url = 'https://api.elevenlabs.io/v1/text-to-speech/' + voice.id + '?output_format=mp3_44100_192';
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'xi-api-key': key, 'Accept': 'audio/mpeg', 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, model_id: MODEL, voice_settings: voice.settings }),
  });
  if (!r.ok) throw new Error('HTTP ' + r.status + ' ' + (await r.text()).slice(0, 300));
  return Buffer.from(await r.arrayBuffer());
}

(async () => {
  const voiceName = arg('voice', 'guillermo');
  const voice = VOICES[voiceName];
  if (!voice) throw new Error('unknown voice: ' + voiceName + ' (use guillermo|dave|toni)');
  const only = arg('only');
  const dry = has('dry');
  const html = fs.readFileSync(HTML, 'utf8');
  const outDir = path.join(AUDIO, voice.folder);
  const stateDir = path.join(outDir, '_state');
  const backupDir = path.join(outDir, '_backup');
  const key = dry ? null : readKey();

  for (const ch of CHAPTERS) {
    if (only && ch.id !== only) continue;
    if (ch.voices && !ch.voices.includes(voiceName)) { console.log(`[${ch.id}] not for ${voiceName} — skip`); continue; }
    const text = extractEs(html, ch.id, voice.pause || 0);
    const settings = Object.assign({}, voice.settings, ch.set || {});
    if (dry) { console.log(`[${ch.id}] ${text.length} chars :: ${text.slice(0, 140)}...`); continue; }
    fs.mkdirSync(stateDir, { recursive: true });
    const h = crypto.createHash('sha1').update(JSON.stringify({ text, MODEL, v: voice.id, s: settings })).digest('hex');
    const manPath = path.join(stateDir, ch.id + '.json');
    const man = fs.existsSync(manPath) ? JSON.parse(fs.readFileSync(manPath, 'utf8')) : {};
    const outPath = path.join(outDir, ch.out);
    if (man.hash === h && fs.existsSync(outPath)) { console.log(`[${ch.id}] unchanged — skip`); continue; }
    if (fs.existsSync(outPath)) {
      fs.mkdirSync(backupDir, { recursive: true });
      const bak = path.join(backupDir, ch.out.replace(/\.mp3$/, '.' + Date.now() + '.mp3'));
      fs.copyFileSync(outPath, bak);
    }
    process.stdout.write(`[${ch.id}] ${voiceName}, ${text.length} chars ... `);
    const buf = await tts(text, { id: voice.id, settings }, key);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outPath, buf);
    fs.writeFileSync(manPath, JSON.stringify({ hash: h, chars: text.length, bytes: buf.length }, null, 2));
    console.log((buf.length / 1024).toFixed(0) + ' KB -> ' + voice.folder + '/' + ch.out);
  }
  console.log('done.');
})().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
