# Guillermo & Pilar — Nutrition & Weight-Loss Guide

A simple, motivating, **bilingual (EN/ES)** nutrition program built for Guillermo and Pilar
(Amorebieta, Basque Country). The goal: lose weight in a healthy, sustainable way by building
a **system instead of relying on willpower** — creating awareness around hidden calories, sugar,
and industrial fats, understanding calorie balance, and making a long-term lifestyle change
**without giving up the food they love**.

> Origin story: Guillermo sent an oat-flour shake product and asked if it was good for losing
> weight. Great question — that's exactly where we start. (Short answer: liquid calories don't
> keep you full for long.) We meet him where he is, with zero judgment.

## Two versions, one source

| Version | For | What it is |
|---|---|---|
| **A — Interactive** (`site/index.html`) | Marten (to demo & go through together) | Beautiful, self-contained HTML. Works offline, opens by double-click. On-page food log + daily check-in saved in the browser. Language toggle EN/ES. |
| **B — Print/PDF** (`print/`) | Guillermo & Pilar (no computer) | Same content as clean A4 print pages + printable paper log/tracking sheets. Export via "Print → Save as PDF". |

The **content lives in Markdown** (`content/`) as the single source of truth. The HTML and PDF
are built from it.

## Language

- Architecture is bilingual (EN/ES toggle).
- **English is written first**, fully reviewed, then translated to **Castellano (Spain, lightly
  Basque-flavored — not Latin American)**. Tone: warm, informal, simple enough for a child, with
  a bit of humor.

## Two dietary paths (both fully worked out)

1. **Mediterranean** — fits Pilar's Basque cooking, heart-healthy, easy to adapt. *(Main path.)*
2. **Low-carb / High-protein** — the proven "get-in-shape" approach many coaches use.

Carnivore is mentioned briefly as the extreme end of the low-carb spectrum, in the comparison.

## Folder structure

```
content/en/        English Markdown modules (source of truth) — written first
content/es/        Spanish (Castellano) — mirror of en/, filled after EN is approved
data/              Onboarding questions, myth quiz, calorie-calc method, person profiles
recipes/           Recipe database seed (breakfast/lunch/dinner/snacks)
assets/images/     Free stock images (Unsplash/Pexels/Pixabay) + CREDITS.md
site/              Version A — interactive index.html
print/             Version B — print/PDF stylesheet + log sheets
```

## Build status

- [x] Folder structure + README
- [x] `data/` files (onboarding, quiz, calorie calc, profiles)
- [x] English content modules (00 to 16 + mindset nuggets)
- [x] Interactive `site/index.html` (EN), built and verified (JS clean, 0 em-dashes, links resolve)
- [x] Recipe database seed + image sources documented
- [~] Reviewing/refining the EN site with Marten (ongoing, many rounds done 2026-06-16)
- [ ] Read-aloud audio (ElevenLabs) — added at the Spanish step (key + voices ready)
- [ ] Print/PDF version + log sheets *(second-to-last step)*
- [ ] Spanish translation (Castellano) *(very last step)*

> 📓 Daily progress and "where to start tomorrow" live in **`WORKLOG.md`**.

## How to use (once built)

1. Open `site/index.html` in any browser (double-click) — go through the guide together.
2. Use the calorie calculator and the daily log/check-in.
3. For Guillermo & Pilar: print the `print/` version + the log sheets.

## Phase 2 (later, optional)

Real voice / WhatsApp auto-logging (needs hosting + a backend + speech recognition). Deliberately
deferred — for now, Marten dictates and Claude updates the log.

## Sources

Every health claim in the content modules is backed by a reputable source (WHO, IARC, peer-reviewed
studies), cited inline in each Markdown file. Image licenses are tracked in `assets/images/CREDITS.md`.
