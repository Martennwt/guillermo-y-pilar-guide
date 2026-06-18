/* ============================================================================
   Audio builder — ONE API call per chapter (App-Bau pattern, see App-Bau-Patterns.md)

   WHY one call per chapter (not per-block stitching):
   - Neural TTS is non-deterministic: separate calls drift in timbre/energy, so
     stitched blocks sound inconsistent (one block deeper/bassier than the next).
   - Naive MP3 concatenation has no corrected duration/seek header -> seeking breaks.
   A single call per chapter is internally consistent AND correctly seekable.

   Chapters here are small (~3k chars) and fit comfortably in one request.
   For content too large for one call, use ElevenLabs "request stitching"
   (previous_text / next_text / previous_request_ids) + ffmpeg remux instead.

   Only regenerates a chapter when its text (or voice settings) changed (manifest hash).
   Backs up any existing final file once into _backup/ before overwriting.
   Run:  node "tools/audio/build-audio.js"
   ============================================================================ */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const KEY_FILE = 'C:/Users/marte/Documents/Claude/App-Launch/elevenlabs_key.txt';
const SITE     = 'C:/Users/marte/Documents/Claude/Guillermo Y Pillar/site';
const AUDIO    = path.join(SITE, 'assets/audio');
const STATE    = path.join(AUDIO, '_state');   // manifest hashes
const BACKUP   = path.join(AUDIO, '_backup');

const VOICE = 'QtPMrakdgePQIUwOX7Ut';
const MODEL = 'eleven_multilingual_v2';
const SETTINGS = { stability: 0.5, similarity_boost: 0.8, style: 0.0, use_speaker_boost: true, speed: 1.12 };

/* ---- Chapters. `parts` are joined with blank lines and sent in ONE request. ---- */
const CHAPTERS = [
  {
    id: 'antes-de-empezar',
    out: '01-antes-de-empezar.mp3',
    parts: [
      "Ya lo habéis intentado antes. Lo entiendo. Dentro de un momento os contaré una pequeña historia sobre una tarta de queso al whisky en un restaurante chino, y cinco palabras que os vais a morir de ganas de usar, de esas que no se dicen delante del capataz. Pero antes de esa historia, algo importante. Hola Guillermo y Pilar. Sé perfectamente lo que estaréis pensando ahora mismo: «Madre mía, cuánto para leer. Yo solo quiero la solución, el remedio rápido. No me apetece estudiarme un libro entero». Me parece justo.",
      "Así que mirad qué fácil os lo pongo: ni siquiera tenéis que leerlo. Las manos ya han levantado bastante por hoy. Por una vez, que trabajen los oídos. Dadle al play y dejad que una voz española de verdad os lo lea todo, en voz alta. Con calma, ladrillo a ladrillo. Mejor aún en el sofá, al lado de Pilar (tu cómplice, y la cocinera que te tiene como a un rey, que es justo por lo que esto es deporte de equipo), media hora como mucho. Eso es todo lo que hace falta. Y Pilar, esto es igual de tuyo. Tú eres el corazón de esta cocina, una auténtica maestra de la cocina española y vasca, la que se asegura de que tu hombre siempre tenga un plato caliente después de un día duro. Eso es amor. Y también os convierte en un equipo, porque Guillermo puede estar fuerte como un toro todo el día, llegar a casa, ver tu famoso ali-oli sonriéndole desde la mesa con 800 calorías por cucharada, y vuelta a empezar la batalla. Más sobre cómo domar esa mayonesa en el capítulo de las calorías escondidas.",
      "Seguramente ya habéis intentado adelgazar antes. Seguramente más de una vez. A lo mejor aguantasteis unos días, unas semanas, incluso unos meses, perdisteis un par de kilos y os sentíais genial, y entonces la vida se complicó y las viejas costumbres se colaron de nuevo. A veces, sencillamente, cuesta seguir las normas. Y puede que todavía no estéis a gusto con donde estáis. Justo por eso existe esta guía. No empezáis de cero, empezáis con más cabeza. Así que la verdadera pregunta es esta: ¿Vais a dedicar 25 minutos, una sola vez, para cambiar cómo vais a vivir los próximos 30 años?",
      "No se trata de seguir otra dieta estricta más, con una lista de normas de las que no veis la hora de escapar. Ya conocéis la escena: tarde por la noche, a gustito en el sofá, viendo vuestra serie favorita y mirando fijamente vuestro dulce favorito como si os debiera dinero, con el cerebro a tope buscando el argumento perfecto para justificar por qué hay que comérselo esta noche sí o sí. Porque esa es la trampa: apretáis los dientes, perdéis unos kilos, volvéis a las andadas, lo recuperáis todo, y vuelta a empezar. Perder, ganar, perder, ganar. Agotador, y no se acaba nunca. No os voy a hacer pasar por eso. Voy detrás de algo completamente distinto: el momento en que hace clic. Cuando por fin entendéis el porqué, algo se enciende dentro de vosotros y se queda encendido. No una dieta que aguantar. Una persona en la que os convertís. Esta es la diferencia entre perder peso para un verano, y cambiar para el resto de vuestra vida. Así que dejadme enseñaros dónde empieza todo de verdad: con el capitán de vuestro barco.",
    ],
  },
];

const KEY = (() => {
  const raw = fs.readFileSync(KEY_FILE, 'utf8');
  return (raw.split(/\r?\n/).find(l => l.trim().startsWith('sk_')) || raw).trim();
})();
const hashOf = (text) => crypto.createHash('sha1')
  .update(JSON.stringify({ text, MODEL, VOICE, SETTINGS })).digest('hex');

async function tts(text) {
  const res = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + VOICE, {
    method: 'POST',
    headers: { 'xi-api-key': KEY, 'Accept': 'audio/mpeg', 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, model_id: MODEL, voice_settings: SETTINGS }),
  });
  if (!res.ok) throw new Error('HTTP ' + res.status + ' ' + (await res.text()).slice(0, 400));
  return Buffer.from(await res.arrayBuffer());
}

async function buildChapter(ch) {
  fs.mkdirSync(STATE, { recursive: true });
  const text = ch.parts.join('\n\n');
  const h = hashOf(text);
  const manPath = path.join(STATE, ch.id + '.json');
  const man = fs.existsSync(manPath) ? JSON.parse(fs.readFileSync(manPath, 'utf8')) : {};
  const outPath = path.join(AUDIO, ch.out);

  if (man.hash === h && fs.existsSync(outPath)) { console.log(`  [${ch.id}] unchanged — skip`); return; }

  if (fs.existsSync(outPath)) {
    fs.mkdirSync(BACKUP, { recursive: true });
    const bak = path.join(BACKUP, ch.out.replace(/\.mp3$/, '.OLD.mp3'));
    if (!fs.existsSync(bak)) { fs.copyFileSync(outPath, bak); console.log('  backed up old ->', path.basename(bak)); }
  }

  process.stdout.write(`  [${ch.id}] one call, ${text.length} chars ... `);
  const buf = await tts(text);
  fs.writeFileSync(outPath, buf);
  fs.writeFileSync(manPath, JSON.stringify({ hash: h, chars: text.length, bytes: buf.length }, null, 2));
  console.log(buf.length + ' bytes -> ' + ch.out);
}

(async () => {
  for (const ch of CHAPTERS) await buildChapter(ch);
  console.log('done.');
})().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
