# Worklog — Guillermo & Pilar Nutrition Guide

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
