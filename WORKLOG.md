# Worklog — Guillermo & Pilar Nutrition Guide

---

## 2026-06-30 (Teil 2): "Move Your Body · Part 3" — YouTube-Video-Sektion + Audio, Stimme auf Toni reduziert

**Erledigt:**
- Neue Sektion `#move3` ("Part 3 of 3"), zweisprachig EN/ES, mit Menü-Eintrag (🎬) und Navigation
  (Part 1 → 2 → 3 → Power Page). Eyebrows von Part 1/2 auf "of 3 / de 3".
- **4 YouTube-Videos im 2er-Raster** (eins links, eins rechts), zwei Reihen:
  - Reihe 1 (Erklärungen): "Los 5 ejercicios después de los 50" (Viejo Pero Activo, 1,4 M) +
    "50 y más fuerte que nunca" (Dr. Borja Bandera, 939 K).
  - Reihe 2 (zwei Programme): "Rutina principiantes 20 min" (Chuy Almada, 6,8 M) +
    "Cuerpo completo 25 min" (Memo Fitgame, 1,1 M).
- Jede Karte: **Original-Thumbnail** lokal als WebP (`assets/img/move/yt/v1..4.webp`, von i.ytimg
  maxresdefault, via shared `to-webp.js`), Typ-Tag, Titel, Kanal · Aufrufzahl (Social Proof),
  Beschreibung, "Watch on YouTube". Klick lädt das Embed (youtube-nocookie, Facade-Pattern, `loadVid()`).
- Text geschärft: "wichtigster/erster Schritt", handverlesene ruhige Leute, Physios aus Part 1 +
  langsam ohne Ego anfangen; Reihe 1 = Warum + 1-2 Übungen; Reihe 2 = zwei einfache aber starke
  Programme für 2-3 Monate (Kalorien verbrennen, langsam fit werden).
- **Audio Part 3 (Toni)** gerendert → `toni/10-mover-el-cuerpo-3.mp3`; `build-audio.js`-Kapitel `move3`
  (voices:['toni']). Video-Karten per `no-audio` von der Vertonung ausgenommen (Vorlese-Text block-für-block
  geprüft: keine Titel/Aufrufe/Links).
- **Langsame Stimme (Dave) aus dem Player entfernt:** Stimmen-Umschalter verschwindet automatisch
  (nur noch Toni), Default = Toni. QR-Player `player.html` ebenfalls um Parte 3 ergänzt.
- Verifiziert: JS 0 Fehler, keine neuen Em-Dashes, Player-Menü zeigt "13. Mover el cuerpo · Parte 3"
  ohne Umschalter, EN/ES/mobil per Screenshot, kein horizontaler Überlauf.

**Offen / morgen:**
1. **Großer Tagesjob: 45-Tage-Essensplan** (Rezepte) für Frühstück / Mittag / Abendbrot zum Abnehmen.
   Dazu **Einkaufsliste** mit Mengen für **zwei Personen, aber kleinere Portionen** (keine Riesenportionen),
   und klare **max. Kalorien pro Tag**, um in 45 Tagen starke Fortschritte zu sehen.
2. **Feinschliff** an Part 3 (Ton / Look / Reihenfolge nach Martens Review).
3. **`audiolibro-es.zip` neu bauen** (aktuell 13 Kapitel, es fehlt Parte 3; soll 14 werden).
4. ⚠️ **ElevenLabs-Key rotieren** (Alt-To-do).

---

## 2026-06-30: Sicherheits-Cleanup — Chrome-Profil aus History entfernt (main + gh-pages)

**Erledigt:**
- **Versehentlich committetes Headless-Chrome-Profil komplett aus der Git-History entfernt.** `6fe126b` hatte
  `site/assets/worksheets/_chrome-profile/` mitgeschleppt (223 Dateien, ~11 MB, inkl. `Login Data`, `Cookies`,
  `History`, Tokens). Lag auf `origin/main` UND auf der **öffentlichen `origin/gh-pages`**.
- Vorgehen: Sicherungs-Tag `backup-before-profile-purge` gesetzt; `git filter-branch --index-filter` über
  `8719f0f..HEAD` löschte den Pfad aus allen 4 betroffenen Commits (echter Inhalt unangetastet, nur das Profil
  weg); `**/_chrome-profile/` in `.gitignore` aufgenommen; physisches Profil von der Platte gelöscht;
  `main` und `gh-pages` per Force-Push neu geschrieben; lokal Reflog/GC zum Purgen der Blobs.
- **Regel bekräftigt:** sensible Daten (Chrome-Profile, Keys, Cookies, Login-Daten) NIEMALS committen.

---

## 2026-06-29: "Move Your Body" in 2 Teile, 45-Tage-Plan auf Spanisch, neue PDFs, Intro-Rewrite, Player-Bar fix, Toni-Hörbuch komplett

**Erledigt (4 Commits `6fe126b` → `9e7fd33`, committet + auf `origin/main` UND `origin/gh-pages` deployed, live):**
- **"Move Your Body" in zwei Sektionen + zwei Audio-Teile gesplittet** (Teil 1 = Warum/Sicher bleiben, Teil 2
  = der einfache Plan); Menü + Player führen jeden Teil getrennt. (`6fe126b`)
- **Preparation-Sektion gelöscht;** der Contract ist jetzt selbsttragend (Gewohnheits-Zeilen, Auswärts-Essen-Regel,
  "wir wiegen alle 7 Tage").
- **"Want it faster?" + Cheat Sheet gestrafft:** 16:8 oben erklärt, Lower-Carb-Einzeiler, ehrliches Morgen-Glas;
  Cheat Sheet: Bewegung nach oben, Kalimotxo, HALT erklärt.
- **Neue Druck-PDFs:** `ws-faster` + `ws-cheatsheet`; Cheat-Sheet-Bilder verkleinert (Cheat-Sheet-PDF 9,5 MB → 3,9 MB).
- **45-Tage-Plan komplett auf Spanisch;** Gewichtstabelle jetzt zweiköpfig (Guillermo + Pilar, kg + verloren).
- **Intro:** Whisky-Cheesecake-Wiederholung raus, Hero gestärkt, Bewegung eingebracht, neuer Badge.
- **Audio neu gerendert:** Intro (welcome + start, beide Stimmen); **Toni jetzt komplett** (Calorías, Página de
  Poder, Mover el cuerpo dazu). Grüner "done"-Haken aus der Nav entfernt.
- **QR-Player (`player.html`) fertiggestellt + auf Toni umgestellt:** hatte nur 9 Kapitel mit Dave, jetzt 13
  Kapitel (+ Calorías, Mover el cuerpo Teil 1+2, Página de Poder); BASE auf `assets/audio/toni/`, damit das ganze
  Hörbuch in EINER Stimme läuft (Power Page existiert nur als Toni). (`a5fdd5e`)
- **Sticky-Player-Bar immer sichtbar:** bleibt auch auf Sektionen ohne Audio sichtbar (und spielt weiter), schon
  ab dem Laden (erstes Kapitel beim Init gecued, `hidden`-Attribut entfernt). (`41c1a77`, `9e7fd33`)
- **`audiolibro-es.zip` neu gebaut** aus dem kompletten Toni-Hörbuch (13 Kapitel), passend zum QR-Web-Player
  (34 MB → 45 MB). (`41c1a77`)
- **Tooling:** `tools/audio/split-move.js` neu, `build-audio.js` erweitert.
- Hinweis: dieser Worklog wurde damals NICHT mitgeschrieben (nur der 27.06.-Eintrag wurde in `6fe126b` committet);
  hier am 30.06. aus den vier Commits nachgezogen.

**Offen / als Nächstes:**
1. ✅ **Chrome-Profil aus dem Repo entfernt** (am 2026-06-30, siehe Eintrag oben). Erledigt.
2. **Martens Review zu "Move Your Body"** (Ton/Bilder/Intensität, war am Strand) steht noch aus.
3. ⚠️ **ElevenLabs-Key rotieren** (Alt-To-do, war mal in einem Screenshot sichtbar).

---

## 2026-06-27: Toni-Stimme + Voice-Switcher, "Move Your Body" komplett ausgebaut (Physios, echte Bilder, Pilar), KI-Guide-Logbuch

**Erledigt (alles committet + auf gh-pages deployed, live):**
- **Offenen Stand live gebracht** (war nur lokal): Kalorien-Hörbuch-Sektion, erweiterter Check-in, alle 16
  Worksheet-PDFs, `audiolibro-es.zip`, neues `09-calorias.mp3`. In #move (EN) die zwei sichtbaren
  "(Marten: ...)"-Platzhalter raus, Geschenk-Gutschein-Box entfernt (fällt raus). (`ca80782`)
- **Zweite Stimme "Toni"** (`851ejYcv2BoNPjrkw93G`, schnell/expressiv) in `build-audio.js` + Player. Player
  zeigt jetzt einen Voice-Switcher **"voz Lenta (dave) | Rápida (toni)"**; **QR-Button + Popup im Player
  raus** (QR liegt schon im Sticky-Header + Footer). Toni rendert **welcome..close (9 Kapitel, 00-08)**, nur
  die Kalorien-Sektion `how` bleibt dave-only. (`5835ac9`, `9a6a44b`)
- **"Move Your Body" (#move, EN) komplett überarbeitet:**
  - Stärkere Headline "Move Your Body: This Is How You Last" (Bezug zum Slogan), Eyebrow "Not the extra. The engine."
  - Empathie neu, geerdet auf Guillermos echte Geschichte: Baustelle, Vorfall am Kabelzug (Griff rutscht,
    Rücken knackt), Studio so vielleicht nicht mehr, harte Arbeit, aber kein Grund aufzuhören. "stupidly" raus.
  - **Reihenfolge umgestellt** (Marten): erst die Sorge wegnehmen, dann Übungen. Neuer Einwand-Satz, dann
    **"First get cleared, then train"** + 3 echte Physios als Karten (Hodei = Top-Pick, Eguzki, Espazio Bizia,
    je Website/Google-Maps/Anruf + Bewertung, Quelle: Martens Recherche-Doc in Downloads), dann "do it right,
    not hard" (Sarah = Chiropraktikerin, OP vermieden), DANN der einfache Plan + Bilder.
  - **Bilder erst Gouache, dann auf Wunsch fotorealistisch neu** via Nano Banana Pro (`gemini-3-pro-image`)
    + WebP-Kompression (sharp): Wohnzimmer-Liegestütz mit TV + 4-Panel-Übungstafel.
  - **Pilar-Teil ergänzt** ("And Pilar, this is just as much for you"): gleiche Basics/Core, Tanzkurs gut aber
    ersetzt es nicht, gleiche Effekte, Morgen/Spaziergang-Logistik, + 2 eigene fotorealistische Frauen-Bilder.
  - Commits `8cdbe2c`, `e1dad76`, `4088a01`, `3588584`, `d0e05af`, `8719f0f`. Letzter Stand: main `8719f0f`,
    gh-pages `ca29e4f`.
- **Tooling:** `sharp` einmal in den geteilten Ordner `tools\images` installiert (PNG zu WebP) + `to-webp.js`.
  Neues `tools/gen-move-images.js` (Nano Banana Pro + sharp, re-runnable).
- **KI-Medien-Guide:** neue Sektion "Installierte Programme: das Logbuch" (#installs) + Sidebar-Eintrag,
  dokumentiert PNG/WebP/sharp; 2 alte Em-Dashes gefixt. (lokale Datei, kein Repo)
- **Global:** `C:\Users\marte\.claude\CLAUDE.md` neu angelegt (geteilte Bild-Tools, Key-Ordner, Regel
  "Installationen ins Logbuch", Deutsch, keine Em-Dashes), gilt projektübergreifend. Memory
  `feedback-log-installed-programs` gespeichert.
- Verifiziert: 0 Em-Dashes, `node --check` OK, Live-Checks (Stimmen + Bilder liefern 200), Section-Renders geprüft.

**Offen / morgen weitermachen:**
1. **Marten reviewt "Move Your Body"** (ist am Strand) und kommt mit Feedback zurück (Ton/Bilder/Intensität).
2. **Spanische Fassung von #move** ist noch die ALTE Kurzversion, komplett out of sync mit dem EN-Ausbau.
   Nach EN-Lock: ganze Section + alle Captions + Pilar-Teil auf Spanisch (vosotros), danach ES-Audio.
3. Optional: **Toni auch für `how`** (Kalorien) rendern, dann ist Toni komplett (1 Befehl + `has[]`-Eintrag).
4. ⚠️ **ElevenLabs-Key rotieren** (Alt-To-do, war mal in einem Screenshot sichtbar).
5. Dieser WORKLOG-Eintrag ist noch nicht committet (Rest der Session ist alles live).

---

## 2026-06-25: Kalorien-Sektion als Hörbuch + Audio-Kapitel, Sport-Check-in, Move Your Body (EN)

**Erledigt:**
- **Kalorien-Sektion (#how) als Hörbuch-Sektion umgebaut:** kompletter Lesetext oben, Rechner darunter. Hook
  mehrfach überarbeitet (final: "There is a whole industry built on making this sound complicated..."), die
  Daily-Burn-Erklärung aus dem "?"-Popover in den Fließtext geholt (Popover jetzt nur kurze Methoden-Fußnote).
  Holzofen-Bild, klares Zahlen-Beispiel (2.500), neues Ende mit Überleitung zum Rechner (ausgedruckte Zahl,
  ändert sich mit Aktivität). Fließtext danach gestrafft.
- **Ganze Kalorien-Sektion auf Spanisch (tú)** übersetzt und in lang-en/lang-es verpackt (Rechner bleibt
  gemeinsam). **Rechner-UI komplett zweisprachig:** Labels (lang-Spans), Dropdown-Optionen (data-en/data-es +
  JS), JS-Texte (Chip/Zusammenfassung/Notiz/Schritte) über neues CIO_T, spanisches Zahlenformat (es-ES,
  Dezimalkomma). Scoped CSS, damit die ES-Spans im Rechner inline bleiben.
- **Audio-Kapitel "Calorías que entran y salen":** build-audio.js extractEs schneidet jetzt beim Rechner ab;
  neues Kapitel `how` -> `09-calorias.mp3`, mit der getunten Dave-Stimme gerendert (von Marten nach Test-Clip
  abgenommen), in den Player gehängt (AUDIO_CHAPTERS + dave has[]), `audiolibro-es.zip` neu gebaut (10 MP3s).
- **Honest Check-in (#checkin):** Sport/Bewegung rausgekitzelt. Frage 8 von "bewegst dich wenig" auf die
  Positiv-Frage "regelmäßiger Spaziergang, 5.000 bis 10.000 Schritte" geändert (JA = gut, daher NEIN = Hebel
  via `QUIZ_INV=[7]`), plus neue Frage zu Trainings-Motivation/allein. EN+ES, fließt auch ins Worksheet.
- **Worksheet-PDFs neu gebaut** (16 Dateien). Chequeo bleibt 1 Seite (jetzt 9 Fragen), Booklet 8 Seiten.
- **Move Your Body (#move), nur EN ausgebaut:** warum Bewegung wichtig (Muskelverlust ab ~50, Haltung,
  Rücken), Rücken-Empathie ("what can I do instead?"), so simpel wie möglich, zwei Optionen (Walk
  5.000-10.000 Schritte ODER 10-15-Min-Workout), Push-up als Ganzkörper-Held, Versprechen "2x/Woche, 10-15
  Min", "keine Zeit gibt's nicht" via YouTube/TV/Kettlebell, Geschenk-Kasten, Dranbleiben. Doppeltes "Here
  is" entschärft.
- 0 neue Em-/En-Dashes, JS-Syntax mehrfach geprüft, ES-Rechner + Player + Quiz per DOM-Dump verifiziert.

**Offen / morgen weitermachen:**
1. **Zwei Platzhalter in #move (EN):** Video-Links (YouTube/TV) und Geschenk-Details (Sarah/Melanie) von
   Marten einsetzen. Stehen im Text als kursive "Marten:"-Notizen.
2. **Spanische Version von #move** schreiben (der ES-Block ist noch die ALTE kurze Fassung, passt nicht mehr
   zum EN). Erst nach Martens OK zum englischen Text.
3. **Deploy steht aus:** nichts committet/gepusht, Live-Seite ist alt. Wenn freigegeben: committen +
   `git subtree push --prefix site origin gh-pages`.
4. ⚠️ **ElevenLabs-Key rotieren** (Alt-To-do, war in einem Screenshot sichtbar).
5. Optional: Kalorien-Audio sitzt im Player nach "close"; ggf. umsortieren oder #checkin auch vertonen.
6. Anrede: Kalorien-Sektion ist "tú", Mindset-Kapitel "vosotros" (so belassen, falls keine Angleichung
   gewünscht).

---

## 2026-06-24 (spät) — Live-Deploy gefixt, Mobile-Politur, Worksheets als echte Download-PDFs

**Erledigt:**
- **Kernursache „nichts ist live": GitHub Pages serviert vom Branch `gh-pages` (nicht `main`).** Der
  Deploy-Schritt `git subtree push --prefix site origin gh-pages` war nach den Commits nie ausgeführt
  worden, darum hing die Live-Seite auf altem Stand. Nachgeholt; ab jetzt Routine: nach jeder Änderung
  **committen + subtree-push** (sonst bleibt die Live-Seite alt). Mehrere Builds geprüft. Letzter Stand:
  main `36584f2`, gh-pages `a468e75`.
- **Mobile-Politur (live):** großer Hamburger-Button + zentrierte Marke, kein Links-Rechts-Wackeln,
  runder „nach oben"-Button, Erste-Besuch-Tour (EN/ES, erklärt Menü/Sprache/Kopfhörer/Player-Pfeil).
- **Sticky-Header-Regression gefixt:** mein Wackel-Fix `overflow-x:hidden` auf `html,body` brach
  `position:sticky`; jetzt `overflow-x:clip`, nur in `@media screen` (Druck unberührt).
- **„Nach oben"-Pfeil entschärft:** kleiner (46→40px), weiches halbtransparentes Grün statt vollem Oliv,
  höher auf Mobile (über dem Player), leicht zurückgenommen (Player bleibt wichtiger).
- **Worksheets komplett umgestellt: Browser-Druck raus, echte PDF-Dateien rein.** Print-to-PDF war auf
  Mobile unbrauchbar (druckte den ganzen Guide ~41 Seiten, Seite wurde sogar blank → Browser schließen).
  iframe-Druck-Versuch ebenfalls verworfen. Jetzt: `tools/gen-worksheet-pdfs.js` rendert via Headless
  Chrome **alle 7 Blätter + Gesamt-Booklet, je ES + EN (16 Dateien)** nach `site/assets/worksheets/`. Die
  Buttons sind reine Downloads (`dlWorksheet`, Sprache folgt `data-lang`); der komplette Druck-Code wurde
  entfernt (behebt das Blank-Bug). Begleittexte angepasst (Download statt „Druckfenster").
- **Fehlende dynamische Inhalte gefixt:** Chequeo-Fragen (`buildCheckinSheet`) und 45-Tage-Raster
  (`buildWsGrid`) werden per JS gebaut → Generator nutzt jetzt Chrome `--dump-dom` (DOM NACH JS-Lauf),
  sonst leere Blätter. **Contrato** per `#ws-contract{zoom:.86}` (Print) auf eine Seite gebracht.
  **Kalorien-Blatt** = ausfüllbare Vorlage (Platzhalter `·`→`______`).
- **Verifiziert:** Seitenzahlen je Einzelblatt = 1 (Mindset bewusst 2), Booklet 8; Chequeo/Contrato/Calorías
  per Screenshot kontrolliert; Live-PDFs Byte-gleich mit lokal, `%PDF`-Header, `application/pdf`. Von Marten
  abgenommen („passt").

**Offen / morgen weitermachen:**
1. Marten testet die finalen Download-PDFs am Handy (Chequeo + Contrato waren die Problemfälle). Bei
   Feinschliff an einem Blatt (Abstand/Größe) gezielt nachziehen. **Merke: nach JEDER Worksheet-Änderung
   Generator neu laufen lassen UND subtree-push, sonst sind die Live-PDFs veraltet.**
2. **ES-Read-aloud-Audio neu generieren** für die seit dem Umbau geänderten/neuen Kapitel, sobald der Text
   endgültig gelockt ist (laut [[feedback-build-order]] genuinely last; Credits sparen).
3. ⚠️ **ElevenLabs-Key rotieren** (war mal in einem Screenshot sichtbar) — offenes Sicherheits-To-do.
4. Optional: Kalorien-Blatt **mit ausgefüllten Zahlen** als Download (statt leer) — bräuchte clientseitige
   PDF-Erzeugung; nur falls gewünscht.
5. Optional: Preparation-Sektion als PDF (zurückgestellt); Mindset-Seite-2-Feinschliff.

---

## 2026-06-24 — Spanish recipes/cheat-sheet + printable PDF worksheets

- **Cheat Sheet + Recipes now bilingual.** Added the full ES `.lang-es` block for the Cheat Sheet, and
  made the JS-driven Recipes language-aware (ES recipe names, filters, tag chips, the detail modal with
  ingredients/macros/shopping-list/tweaks). `setLang()` now re-renders recipes + relabels filters.
- **New "Print worksheets" section (`#printables`) + nav entry** ("Print & keep" / "Imprimir y guardar").
  Has a shared name field (`#wsName`, saved to `gp_wsname`) and 6 buttons.
- **Print-to-PDF worksheet system.** A body-level `<div id="worksheets">` holds 6 bilingual sheets
  (`ws-cover`, `ws-checkin`, `ws-calc`, `ws-power`, `ws-plan`, `ws-contract`). `printWorksheet(id)` adds
  `body.ws-print`, marks one `.ws.active`, `window.print()`; cleanup on `afterprint` + `matchMedia('print')`.
  New `@media print` block isolates one sheet (`body.ws-print .shell,#hills{display:none}` + show only
  `.ws.active`). Language follows the page via the global `.lang-en/.lang-es` rule. `@page{margin:13mm}`.
  - **Cover:** Ikurriña + Amorebieta + logo + audiobook QR (scan → audio).
  - **Calorie sheet is DYNAMIC:** `fillCalorieSheet()` reads live calculator (`#cioBurn`, age/ht/wt, sex
    toggle, `#cioAct`→`WS_ACT` bilingual label), writes name + base need + target band (burn−500…−300)
    into `.wc-*` spans in both lang blocks. Marten sets calc + name, saves; repeats for the other person.
  - **45-day sheet:** habits checklist + JS-built 45-cell phase-coloured grid (`buildWsGrid`) + weekly
    weight table with **split "Peso Pilar" / "Peso Guillermo"** columns.
  - **Check-in sheet:** `buildCheckinSheet()` emits the 8 Qs + commit (Sí/No boxes) from `QUIZ_T`.
  - **Power + Contract:** curated power copy (ES authored fresh) + reused contract markup w/ signatures.
- **Spanish flag instead of Basque ribbon below the top.** New `.es-ribbon` (red-yellow-red); swapped the
  Power-page (`#motivation`) and footer `eus-ribbon`→`es-ribbon` (+ print rule). **Top Ikurriña +
  "Amorebieta · Euskal Herria" kept Basque** per Marten. Worksheet inner sheets use `.es-ribbon`.
- **Honest check-in EN/ES re-aligned:** ES Q3 (post-dinner sweets) and Q7 (lift vs stairs) now match EN.
- **Verified by rendering real PDFs** (headless Chrome `--print-to-pdf` of each isolated sheet, read back):
  all 6 print alone, correct language, dynamic calc fills, no guide bleed. JS syntax OK; 0 em-dashes
  (placeholders switched to `·`). **NOT pushed to GitHub yet** (awaiting Marten's OK).
- **UX round (Marten feedback):** header now has a **📄 Worksheets** link (scrolls to `#printables`, no
  popup); the **name field + "Save this as a PDF" button live ON the calculator** (`#how`) so each person's
  sheet is made in place (name printed on the sheet → Guillermo/Pilar never mixed up); `#printables`
  calorie button just links up to the calculator. Added **"All in one PDF (with cover)"** =
  `printAllWorksheets()` (body `ws-print-all`, every `.ws` one-per-page, cover first; verified 6-page booklet).
  Print tiles made compact (flex-wrap chips, not fat grid).
- **New cover design** (Marten picked variant 2 of 3 rendered options): full-bleed **mountain-band** cover
  (`.wc2-*`), dark-olive clipped mountain range bleeding to the page edge, QR card on it, eguzkilore stamp
  top-right, Ikurriña top-left, Basque tricolor at the very bottom. Needed `@page{size:A4; margin:0}` +
  `html`/body margin reset + `.ws-cover{height:297mm; overflow:hidden}` so it prints as exactly ONE
  full-bleed page (text sheets keep `padding:14mm 13mm`). Fixed `var(--saffron)`→`var(--honey)` (saffron
  was undefined). All re-verified via headless-Chrome PDF renders.
- **Contract PDF expanded:** now also carries the on-screen "Why a contract, and why now?" callout +
  "Put something on the line" before the signable box (EN+ES), still one page.
- **New "Mindset" finale PDF** (`#ws-mindset`, button 🧭 in `#printables`, in the booklet between power &
  plan): a distilled bilingual manifesto of the deepest truths pulled from every mindset section, +
  `.ws-truth`/`.ws-finale` styles. **Expanded to 2 pages** with the funniest lines per Marten (cornflakes
  breakfast-myth, the "I've seen your arms" Guillermo joke, the cheesecake "Vete a tu puta casa", "cannot
  out-train a fork on the scaffolding", Pilar's frying-pan + Einstein) and a green **audiobook QR block**
  at the end (`.ws-audio`): scan → listen in the player OR download all audio to the phone. Booklet now 9 pages.
- **Footer audiobook CTA on one line:** `.dl-zip{white-space:nowrap}`, QR 190→160px, card max-width 470→520px.
- **Mindset PDF round 2 (Marten):** trimmed to **fewer, longer** points and properly balanced across 2
  pages (5 truths page 1 / 3 + finale + QR page 2, no split sections). Dropped "Your why", "Fall, get back
  up", "You are not alone" (latter lives in the contract); lengthened the kept ones and added the Bible line
  **"the spirit is willing, but the flesh is weak"** to the strong/weak-self point. **Power Page moved to the
  very LAST sheet** (DOM + booklet + button order). Booklet now 8 pages.
- **Out of scope (Marten):** the Preparation section as PDF was explicitly deferred.

**Feierabend-Stand 2026-06-24 — alles lokal in `site/index.html`, von Marten abgenommen ("passt"),
NICHT committet/gepusht.** Worksheet-Reihenfolge final: Cover · Honest check-in · Calorie sheet · Mindset ·
45-day plan · Contract · Power page (Power ganz hinten). "All in one PDF" = 8-Seiten-Booklet. Verifiziert
per headless-Chrome-PDF-Render; JS sauber (847 Z.), 0 Em-Dashes.

**Offen / morgen weitermachen:**
1. **Committen + Push auf GitHub** (`main` + `git subtree push --prefix site origin gh-pages`) — wartet auf
   Martens ausdrückliches OK; heute bewusst nicht gemacht.
2. **Genuinely last** (laut [[feedback-build-order]]): **ES-Read-aloud-Audio neu generieren** für die seit dem
   Umbau geänderten/neuen Kapitel, sobald der Text endgültig gelockt ist (Credits sparen).
3. ⚠️ **ElevenLabs-Key rotieren** (war mal in einem Screenshot sichtbar) — offenes Sicherheits-To-do.
4. Optional: **Preparation-Sektion als PDF** (heute bewusst zurückgestellt), falls gewünscht.
5. Optional-Feinschliff: Mindset-Seite 2 hat unten noch etwas Luft — bei Bedarf weiter ausbauen.

---

## 🟢 START HERE NEXT (where we left off, end of day 2026-06-18)

`site/index.html` is the live file (JS clean, 0 em-dashes, internal links resolve). Resume here.

**Done 2026-06-18:**
- **Cover chosen** (the switcher work is considered closed).
- **ES read-aloud audio extended to chapters 2 to 4 at speed 1.12** (voice `QtPMrakdgePQIUwOX7Ut`):
  re-recorded `02-quien-es-el-capitan.mp3` (the old one had an error, backed up to `_backup/*.OLD`),
  added `03-esto-te-suena.mp3` and `04-fuerza-de-voluntad.mp3` (Systems stops before the grid2 table,
  ends at "...los que lo consiguen."). `AUDIO_CHAPTERS` now lists 4 chapters, the dropdown auto-fills.
- **New printable "Cheat Sheet" section** (`#cheatsheet`, EN only for now) added before the Power page,
  plus a menu entry. Same content captured in `content/en/17-cheatsheet.md`. Three to four print pages:
  the 7 biggest levers, an "avoid → do instead" table (14 swaps), a visual buy/avoid board, and 6 gap
  mini-tips (sleep, stress/HALT, steps/NEAT, keep-your-muscle, patience/plateaus, track-it-right).
- **12 food illustrations generated** (OpenAI gpt-image-1, warm gouache, compressed WebP < ~130 KB each)
  in `site/assets/img/cheatsheet/`. The red crossing-out is done in CSS, not by the model. Re-run via
  `tools/gen-food-images.js`. Credits note in that folder.
- Fixed 5 stray em-dashes that had crept into the cover/welcome copy. File is back to 0 em-dashes.
- **Power page (`#motivation`): added the core resilience message** as a bold `.creed` panel ("The one
  that matters most": a bad morning is not a bad day ... it is not how often you fall, it is how often you
  get back up ... "I am just practicing" ... chase consistency not miracles ... a lasting transformation).
  Trimmed the truths list to 8 (3 new resilience lines first). **Compacted via print CSS so the whole
  power page fits on ONE printed page** (verified with a Chrome headless print-to-pdf proof: 1 page). In
  print it hides the lead + the "Make them yours" callout, shows 3 affirmations per set and 6 truths in
  2 columns; on screen everything stays full.
- **Slimmed the guide: removed 4 sections** (`#cut` What to cut, `#volume` Eat more weigh less, `#sugar`
  Sugar & factory food, `#natural` Real vs factory) plus the dead NVI table JS/CSS. The MD sources in
  `content/en` stay as archive. **The mayonnaise / hidden-calories example was preserved** as a new
  accordion in Extra Tips (`#tips`), and the two links that pointed to `#cut` now point to `#tips`. Nav,
  nextprev chain and internal links all re-verified (no broken `#` links). Full guide print dropped from
  44 to 38 pages.
- **Renamed "How it works" → "Calories In, Calories Out"** and built a real **interactive live graph**
  (`.cio` in `#how`, frontend-design skill): a daily-burn number (example 2,600, or the user's own once the
  calculator runs), an IN vs OUT bar pair, a slider for what you eat, and a **12-week weight curve** that
  bends down on a deficit and climbs on a surplus, with live numbers (kcal gap, kg/week, kg in 12 weeks) and
  a colour swap (olive = losing, terracotta = gaining). Hooked into `calcTDEE()` so it uses real numbers;
  the slider is hidden in print so it renders as a clean static infographic. Verified both states by Chrome
  headless screenshot. Kept the "metabolic flexibility" accordion, dropped "cravings vs hunger" (covered
  elsewhere), added a hidden-calories transition to the extra tips.
- **Trimmed 2 more sections:** removed `#day` (Daily adjustments) and `#shopping` (Shopping & danger zones).
  The buy/avoid list is already the cheat-sheet visual board; the unique bits were preserved into Extra Tips
  (a "Budget your day like money" accordion and a "Danger zones" accordion). Full guide print now 35 pages
  (was 44 at the start of the day). No broken internal links after all the cuts.
- **CIO widget v2:** the daily-burn number is now an editable input; added a "Walking on top" steps control
  (desk/+2k/+5k/+10k, ~40 kcal per 1,000), a "?" help popover (Mifflin-St Jeor + activity + steps, the
  scale is the real test, sources), and a live analysis sentence. Wired to `calcTDEE()`.
- **Deleted "What you get" (#guide)** recap section (redundant); links + nav fixed.
- **Premium design pass** (frontend-design skill, verified by Chrome screenshots): (1) **chapter menu**
  redesigned from a plain white box to a warm card with grouped sections, icon chips, 2-column grid, hover
  slide and a soft rise-in animation (groups now also show in the overlay, not just the rail); (2) **audio
  player** redesigned into a floating rounded pill with an Ikurriña accent line, lifted buttons, a hover
  thumb on the progress track and a pulsing "voz española" live dot; (3) **background** got a subtle
  **Eguzkilore** (Basque sun-flower) watermark at `assets/img/eguzkilore.svg` plus tasteful hover lifts on
  cards/affirmations/badges. All hidden/handled in print.

- **Recipes: click-through detail view** added. Recipe cards are now clickable and open a modal
  (`#recipeModal`) with the dish, "what is in it" (new `RDETAIL` ingredient + lighter-tip data for all 19
  recipes), and **calorie + protein bars for one portion and two portions**, plus a "Lighter" swap tip.
  Reuses the journal styling, animates in, closes on backdrop click.
- **Player + calculator round (Marten feedback):** the audio player's native `<select>` (which opened as
  an ugly Win98 dropdown) was replaced with a **custom journal-styled chapter dropdown** (numbered list,
  hover, animation), and the player got a faint **Basque mountain silhouette** background
  (`assets/img/player-mountains.svg`) for a cooler look. Steps "desk day" renamed to **"home day"**. The
  calculator now has a visible **Man/Woman segmented toggle** (hidden `#cSex` input, `setSex()`), and the
  activity dropdown was reworded to **everyday-life levels** (mostly sitting / at home with light moving /
  on your feet / active job / hard job + training) so the "mostly home, a bit of walking" case fits. Added
  a subtle **cursor spotlight** on the hero (mouse effect), and a **funny generated illustration** (a
  whisky cheesecake batting its eyelashes getting a go-home wave) at the "Vete a tu puta casa" spot.
  **(Note: Marten then asked to remove that cheesecake image, so it and its file are gone again.)**
- **Big "make it cooler" round (all in one go, per Marten):**
  - **Audio player:** replaced the native `<select>` with a **custom journal-styled dropdown** (numbered
    chapters, animation) so it no longer opens as a white OS box, and added a faint **Basque mountain
    silhouette** behind the controls (`assets/img/player-mountains.svg`).
  - **CIO widget:** added a **Man/Woman toggle** that sets the example base burn (man ~2,600 / woman
    ~2,000, since base need differs), synced from the calculator. "desk day" is now "home day".
  - **Calculator:** added a visible **Man/Woman segmented toggle** and reworded activity to everyday-life
    levels (covers "mostly home, a bit of walking").
  - **Background:** a faint **Basque hills** silhouette bottom-left (`assets/img/bg-hills.svg`).
  - **Scrawl effect:** a hand-drawn terracotta underline (`assets/img/scrawl.svg`) that draws itself in on
    reveal, on the hero "keep them off" / "que no vuelvan" and "systems over willpower".
  - **Recipes overhaul:** added a **Basque classics** filter + 2 new Basque recipes (Bacalao light pil-pil,
    Piperrada with egg) and tagged marmitako/pisto Basque. The **detail modal** now shows **macros bars
    (protein/carbs/fat)**, a **1-portion vs 2-portion table** (calories/protein/carbs/fat), and a **"small
    changes that add up"** panel (+1 tbsp oil +120, +tsp sugar +16, +cola +140, dessert→watermelon −250).
    Recipe cards now show a **real photo** (hover-zoom) where available; first two are **real free-licensed
    Wikimedia photos** (San Sebastián tortilla + a yogurt parfait) in `assets/img/recipes/` with a
    `CREDITS.md`. More photos can be added by setting `img` per recipe.
- **Photos for every recipe + calculator merge round (per Marten):**
  - **Every recipe now has a real-looking photo.** The 2 named ones stay real free-licensed Wikimedia
    JPGs; the other 20 are **photorealistic images generated with gpt-image-1 (medium, a few cents each)**
    saved as compressed WebP in `assets/img/recipes/`. (Marten OK'd generating when real ones are hard.)
  - Added the Basque dish **Garbanzos with morcilla** (chickpeas + blood sausage) he asked for.
  - **Merged the standalone Calculator (#calc) into the Calories In/Out widget** so it is now ONE big
    interactive panel: sex (man/woman), age, height, weight, an everyday-life activity dropdown and a
    walking/steps row all feed a **live daily-burn** (Mifflin-St Jeor x activity + steps, e.g. ~3,150 for
    the Guillermo example), which drives the IN/OUT bars, intake slider and 12-week weight curve in real
    time. The burn stays manually editable. Removed the old `#calc` section, its nav entry, `calcTDEE` and
    `setSex`; saved/restored via the same `gp_calc` key (now through `cioInit`/`cioSave`).
- **Castellano translation pass (text only, no audio yet):** added `.lang-es` blocks for **How you do it
  (#honest), Your Why (#why), Your Path (#paths) and the Contract (#contract)** (vosotros, lightly Basque).
  So ES text now covers cover..Willpower **and** How-you-do-it..Contract. **Still need ES:** the
  interactive/structured sections, which need surgical prose-only wrapping so their shared widgets/IDs are
  not duplicated: **#how (Calories In/Out widget prose), #plan (45-day tracker), #recipes (grid/modal data
  is JS), #tips, #cheatsheet, #motivation.** Audio for all the new ES is also still to be generated.
- **Saved to GitHub:** private repo **https://github.com/Martennwt/guillermo-y-pilar-guide** (branch
  `main`). No secrets in the repo (API keys live outside the project; scripts only read them by path).

**Still open (next): recipe photos + research** — add real (free-licensed, web-sourced, NOT AI) photos
starting with the Veggie Omelette and Yogurt Bowl (the modal already supports an `img` field per recipe,
just set it once the files exist in `assets/img/recipes/`), and optionally refine the calorie/protein
numbers against real Basque recipe sources.

**Section order now:** Welcome → Before you begin → Who's the captain? → Sound familiar? → Willpower vs
Systems → How you do it → Your Why → How it works → Calculator → ... → Contract → What you get → Recipes
→ Extra tips → **Cheat sheet (new)** → Power page.

**Done today:**
- Voice locked to first-person **"I" everywhere** (see [[feedback-voice-and-tone]]). Humor sprinkles +
  hard one-liners added. **WHY** styled big/red + linked to #why (`.why` class).
- Opener split into "Before you begin" + the "What you get" recap (moved to before Recipes).
  De-duplicated the mindset sections (removed the willpower "foundation" box + a duplicate nugget).
- Reordered so the light "Sound familiar?" sits right after Captain, before the heavy Willpower section.
- **"Sound familiar?" redesigned**: compact speech-bubble grid (`.voices`/`.voice`), 9 voices Marten chose.
- Willpower section rewritten: flesh/spirit + bucket + the kitchen-chorus scene + Mundaka wave + grid.
- **Castellano translation of the FIRST TWO chapters** (start + captain) behind the EN/ES toggle
  (`.lang-en`/`.lang-es` per section). Build order intentionally advanced for these two as a prototype.
- **Read-aloud audio LIVE** for those two: sticky footer player (play/stop/progress/time) + QR popover.
  MP3s at `site/assets/audio/start.mp3` + `captain.mp3`, voice `QtPMrakdgePQIUwOX7Ut`
  (see [[reference-elevenlabs-tts]]).
- Effects: gentle scroll-reveal + hover. **First real photo** wired (a breaking wave, Crescent Bay,
  CC BY 2.0, ken-burns zoom) at the "craving is a wave" spot. Real photos load online like the Google
  fonts; offline they fall back to alt text (acceptable for the interactive version).

**Open / next time:**
1. **Marten to confirm the captain audio fix** (re-recorded from the current ES text; if a specific
   wording error in the visible text is meant, point it out and I will fix the text too).
2. **Optional: more real photos** elsewhere in the guide (free-licensed, with credit). The green
   "fill the cart" hero images are already generated.
3. **QR download to phone needs a reachable URL** (Drive link from Marten, or a LAN test server). LAN
   IP was 192.168.1.227; Norton VPN may block phone-to-PC.
4. **Translate the Cheat Sheet to Castellano** once EN is locked (it is EN only for now).
5. ⚠️ **Rotate the ElevenLabs key** (was visible in a screenshot).
6. Then the fixed order for the rest: **PDF (Version B)** → **full Castellano translation + audio**.
   For the PDF, reuse the compressed cheat-sheet images and the print page breaks already in place.

---

## What we accomplished today (2026-06-16)

**Project kicked off from zero.** Goal: a warm but hard-hitting, mindset-driven weight-loss guide for
Guillermo (construction worker) and Pilar (cooks Basque/Mediterranean) in Amorebieta. Origin hook: the
oat-flour shake Guillermo asked about.

- **Scaffolded the project** (folders, `README.md`).
- **Wrote `data/` files**: onboarding questions, myth quiz, calorie-calc method (Mifflin-St Jeor +
  activity factor), profile templates for Guillermo & Pilar.
- **Wrote English content modules** `content/en/00–16` + reusable mindset nuggets (the markdown source
  of truth; researched with cited sources: WHO sugar/trans-fat, IARC processed meat, Lenoir/Ahmed 2007
  sugar-vs-cocaine, ghrelin, metabolic flexibility, etc.).
- **Seeded the recipe database** (`recipes/` breakfast/lunch/dinner/snacks) + documented free image
  sources (`assets/images/CREDITS.md`).
- **Built the interactive site** `site/index.html` (single offline HTML, warm Basque-Mediterranean
  design, Ikurriña flag, system-font fallbacks so it works offline).
- **Revised the site heavily across many rounds of Marten's feedback** (see "Decisions" below).
- **Found & verified the ElevenLabs key** for the planned read-aloud feature (works, scoped to TTS).

## Current site structure (order of sections)

Welcome (hero "Take Back Control") → Before we begin → **Who's the captain?** (the "vete a tu puta
casa 😄" story, brain-rewiring payoff) → **Does this sound familiar?** (the brain's excuses) → How we
do it (it's not about food, it's a mindset/lifestyle shift) → Your Why (fridge note + mirror exercise)
→ Willpower vs Systems → How it works (calorie balance, metabolic flexibility) → Calculator (TDEE) →
**What could you cut?** (hidden calories made visible, with kcal) → Eat more, weigh less → Sugar &
factory food → Real vs factory (hover table) → Your path (Mediterranean / low-carb) → Daily
adjustments (teeth analogy) → Shopping & danger zones → 45-day plan (tracker + badges) → **Contract**
(pre-written, reward + stake) → Recipes (filterable) → Extra tips (ghrelin) → **Power page**
(affirmations: fighter 💪 + loving 💗).

**Interactive (vanilla JS, localStorage):** EN/ES toggle (ES = "coming soon" banner for now), TDEE
calculator, 45-day tracker with milestone badges, hover natural-vs-industrial table, filterable recipe
cards, chapter menu + scroll progress.

## Key decisions locked

- **Two versions from one source:** A = interactive HTML (for Marten/demo), B = print/PDF (for
  Guillermo & Pilar, who have no computer).
- **Tone:** blunt, motivational, funny, no sugarcoating, personal ("Hey Guillermo"). Goggins/Robbins
  energy mixed with soft/loving lines for Pilar.
- **Core thesis:** it's NOT about food or rules — it's a psychological + lifestyle shift (captain of
  your ship, systems over willpower, rewiring the brain, 25 minutes vs 30 years).
- **Two diet paths:** Mediterranean (main, fits Pilar's cooking) + low-carb/high-protein.
- **Language:** English first → finalize → then Castellano (Spain, lightly Basque), as the last step.
- **No em-dashes** anywhere in the guide copy (verified 0).
- **Removed per feedback:** myth quiz, food diary, glossary, the why-textarea (the why is done on
  paper/PDF).

## Verification done

- JS syntax: OK (`node --check` on extracted script).
- Em-dashes / en-dashes: 0 (checked reading file as UTF-8; PowerShell 5.1 mis-reads emoji as dashes).
- All internal `#` links resolve; all nav chapters have sections.

## Open / pending

- Audio read-aloud (ElevenLabs) — see "Start here tomorrow".
- PDF (Version B) — second-to-last step.
- Spanish (Castellano) translation — last step.
- Real data for `data/guillermo-profile.md` / `pilar-profile.md` (weight/height/age) — still to come
  from Marten.

## File map

```
README.md                 overview + build status
WORKLOG.md                this file
content/en/00–16 + _mindset-nuggets.md   markdown source of truth (English)
content/es/               empty (filled last)
data/                     onboarding, myth-quiz, calorie-calc, profiles
recipes/                  breakfast/lunch/dinner/snacks
assets/images/CREDITS.md  free image sources
site/index.html           Version A — the interactive guide (current focus)
print/                    empty (Version B, later)
```

Plan file: `C:\Users\marte\.claude\plans\functional-knitting-lynx.md`
