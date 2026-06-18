/* ============================================================================
   say.js — Text zu Sprache (ElevenLabs), gleiche "dunkle" Stimme wie der
   Vorlese-Teil des Projekts.

   Nutzung:
     node "tools/audio/say.js" <textdatei> <ausgabe.mp3>

   Beispiel:
     node "tools/audio/say.js" site/assets/audio/team-claude-code.txt site/assets/audio/team-claude-code.mp3

   Voice/Model/Settings sind identisch zu build-audio.js.
   ============================================================================ */
const fs = require('fs');

const KEY_FILE = 'C:/Users/marte/Documents/Claude/App-Launch/elevenlabs_key.txt';
const VOICE    = 'QtPMrakdgePQIUwOX7Ut';
const MODEL    = 'eleven_multilingual_v2';
const SETTINGS = { stability: 0.5, similarity_boost: 0.8, style: 0.0, use_speaker_boost: true, speed: 1.12 };

const [, , textPath, outPath] = process.argv;
if (!textPath || !outPath) {
  console.error('Nutzung: node "tools/audio/say.js" <textdatei> <ausgabe.mp3>');
  process.exit(1);
}

const KEY = (() => {
  const raw = fs.readFileSync(KEY_FILE, 'utf8');
  return (raw.split(/\r?\n/).find(l => l.trim().startsWith('sk_')) || raw).trim();
})();
const text = fs.readFileSync(textPath, 'utf8').trim();

(async () => {
  process.stdout.write(`Erzeuge Audio (${text.length} Zeichen) ... `);
  const res = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + VOICE, {
    method: 'POST',
    headers: { 'xi-api-key': KEY, 'Accept': 'audio/mpeg', 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, model_id: MODEL, voice_settings: SETTINGS }),
  });
  if (!res.ok) {
    console.error('\nHTTP ' + res.status + ' ' + (await res.text()).slice(0, 400));
    process.exit(1);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buf);
  console.log(buf.length + ' Bytes -> ' + outPath);
})().catch(e => { console.error('\nFEHLER:', e.message); process.exit(1); });
