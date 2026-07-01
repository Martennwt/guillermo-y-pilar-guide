/* ============================================================================
   Meal-plan narration (Spanish, Toni / fast voice only).

   This is a CURATED narration, not a verbatim read of the section: it reads the
   intro and the 8 rules, then EXPLAINS how the plan is built (strict vs flexible,
   3 breakfasts / 3 lunches / 3 dinners, the example weeks in the PDF). It does NOT
   read the recipe tables. One ElevenLabs call, Toni voice, <break> pauses.

   Run: node "tools/audio/gen-mealplan-audio.js"          (real render)
        node "tools/audio/gen-mealplan-audio.js" --dry     (no API, char count)
   ============================================================================ */
const fs = require('fs');
const path = require('path');

const ROOT = 'C:/Users/marte/Documents/Claude/Guillermo Y Pillar';
const OUT = path.join(ROOT, 'site/assets/audio/toni/12-plato-45-dias.mp3');
const KEYDIR = 'C:/Users/marte/Documents/Claude/API keys';
const MODEL = 'eleven_multilingual_v2';
const TONI = { id: '851ejYcv2BoNPjrkw93G',
  settings: { stability: 0.5, similarity_boost: 0.85, style: 0.5, use_speaker_boost: true, speed: 1.08 } };

const P = '<break time="0.6s" />';
const SCRIPT = [
  'El plan de comidas de 45 días.',
  'Un plan de comidas sencillo y alto en proteína para Guillermo y Pilar. No es una dieta para sufrir: es una lista corta de comidas que vais rotando, pensada para que la grasa baje mientras el músculo se queda, y crezca en cuanto empecéis a entrenar.',
  'No son 45 menús distintos. Es una lista corta de la que elegís cada día, en dos tamaños de ración: un plato más grande para Guillermo, uno más pequeño para Pilar.',
  'Se puede hacer de dos maneras. La estricta, el reto de 45 días: seguís el plan a rajatabla, dais en el objetivo casi todos los días, y solo una comida libre cada dos semanas. Y la relajada: el mismo menú, pero más flexible. La misma comida; solo cambia lo apretado que llevéis la línea.',
  'Y recordad una cosa: el plan es solo la mitad. Comer quita el peso, pero lo que hacéis con el cuerpo decide qué tipo de peso se va. Lo más fuerte es juntar tres cosas: este plan, un poco de fuerza, y pasear. La comida os hace más pequeños; la comida, más un poco de fuerza, más caminar, os transforma.',
  'Ahora, las reglas que hacen que funcione.',
  'Uno: la proteína manda en el plato. En déficit, el cuerpo puede quemar grasa o músculo; la proteína le dice que queme grasa y guarde el músculo. El objetivo al día: Guillermo, unos ciento sesenta gramos; Pilar, unos ciento diez.',
  'Dos: vuestras calorías al día. Guillermo, entre dos mil doscientas y dos mil cuatrocientas. Pilar, entre mil trescientas y mil quinientas. La versión estricta apunta a la parte baja. Pero no bajéis de ahí: recortar más de unas quinientas calorías empieza a quemar músculo, y no queremos eso.',
  'Tres: dos tamaños de ración, una sola cocina. Los mismos platos para los dos, Guillermo con el plato más grande, porque en la obra quema mucho más. Se cocina una vez y se sirve en dos tamaños.',
  'Cuatro: comed hasta que ya no tengáis hambre, no hasta que estéis llenos. La señal de estar lleno tarda, unos quince a veinte minutos. El truco es sencillo: un vaso de agua antes de comer, comer despacio, y esperar.',
  'Cinco: la verdura es libre y obligatoria en comida y cena. Es casi toda agua: mucho volumen y casi cero calorías. La verdura no se pesa.',
  'Seis: dos a tres litros de agua al día, y pesaos tres veces por semana, mirando solo la media de la semana, nunca un solo día.',
  'Siete: una comida libre cada dos semanas. Disfrutadla entera, sin culpa, y a la siguiente comida, de vuelta al plan.',
  'Y ocho, Guillermo, para ti: el fin de semana es la trampa. Fuera del andamio quemas mucho menos, así que el sábado y el domingo mantén el plan base y deja los extras de los días de trabajo.',
  'Y así está montado el plan, para que no tengáis que leer receta por receta. Hay tres desayunos, tres comidas y tres cenas. Cada día elegís uno de cada, en el orden que queráis, y si un día no os apetece uno, lo cambiáis por otro. La estructura es fija, la elección es vuestra.',
  'Además, en el PDF os he dejado tres semanas de ejemplo ya montadas, con el desayuno, la comida y la cena puestos día a día, para que veáis cómo se combina. Miradlas, copiadlas si queréis, y a partir de ahí lo hacéis vuestro.',
  'Y para lo que no os guste, hay una lista de cambios: cualquier proteína por otra, cualquier hidrato por otro, y la verdura, siempre libre. Nunca os saltéis una comida: la cambiáis y ya está.',
  'Eso es todo. Sencillo, con la proteína por delante, y hecho para durar. Vamos a por ello.',
].join(' ' + P + ' ');

function readKey() {
  const txt = fs.readFileSync(path.join(KEYDIR, 'ElevenLabs.txt'), 'utf8');
  const m = txt.match(/ELEVENLABS_API_KEY=(.+)/) || txt.match(/(sk_[A-Za-z0-9]+)/);
  if (!m) throw new Error('ELEVENLABS_API_KEY not found');
  return m[1].trim();
}

(async () => {
  if (process.argv.includes('--dry')) {
    console.log('chars:', SCRIPT.length, '\n\n', SCRIPT.slice(0, 400), '...');
    return;
  }
  const key = readKey();
  const url = 'https://api.elevenlabs.io/v1/text-to-speech/' + TONI.id + '?output_format=mp3_44100_192';
  process.stdout.write('rendering ' + SCRIPT.length + ' chars with Toni ... ');
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'xi-api-key': key, 'Accept': 'audio/mpeg', 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: SCRIPT, model_id: MODEL, voice_settings: TONI.settings }),
  });
  if (!r.ok) throw new Error('HTTP ' + r.status + ' ' + (await r.text()).slice(0, 300));
  const buf = Buffer.from(await r.arrayBuffer());
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, buf);
  console.log((buf.length / 1024).toFixed(0) + ' KB -> ' + OUT);
})().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
