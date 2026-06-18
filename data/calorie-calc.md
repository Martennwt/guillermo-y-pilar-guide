# Calorie Calculation — Find your "base number"

The whole game in one sentence: **eat below the energy your body uses → you lose; eat above it →
you gain.** So first we estimate that "base number" (your daily energy use), then we set a gentle
deficit. It's not exact science — it's a starting estimate we **adjust** based on what the scale
and the mirror do over 2–3 weeks.

This file is the *method*. In the interactive site it becomes a calculator widget; on paper it's a
fill-in box.

---

## Step 1 — BMR (energy at complete rest), Mifflin-St Jeor

This is the most widely used, well-validated formula.

```
Men:   BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age(years) + 5
Women: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age(years) − 161
```

## Step 2 — TDEE (total daily energy use) = BMR × activity factor

| Activity level | Factor | Who |
|---|---|---|
| Sedentary (desk, little movement) | 1.2 | — |
| Light (light exercise 1–3 days) | 1.375 | — |
| Moderate (exercise 3–5 days) | 1.55 | — |
| **Very active (hard daily labor / sport 6–7 days)** | **1.725** | **Guillermo — construction, 5 hard days/week** |
| Extremely active (very hard physical job + training) | 1.9 | — |

> Guillermo does heavy physical work 5 days a week, so his weekday burn is high (use ~1.725).
> Important consequence: on the **weekend he burns much less** — so the same big meals that are
> "fine" on a work day are a surplus on Saturday/Sunday. That gap is a classic place weight sneaks
> back on. (We address this with calorie *budgeting* in module 09.)

## Step 3 — Set the deficit (lose ~0.5 kg/week)

- 1 kg of body fat ≈ **7,700 kcal**. To lose ~0.5 kg/week, aim for about **−500 kcal/day** vs TDEE.
- Don't go too aggressive. A modest deficit protects muscle, energy for work, and sanity. Slow loss
  is kept loss.
- **Target calories = TDEE − 500.**

## Step 4 — Protein target (keeps you full & protects muscle)

- Aim **~1.6–2.0 g protein per kg of body weight** (use a sensible bodyweight, not extreme).
- Protein is the most filling macronutrient and helps you keep muscle while losing fat — important
  for someone doing hard physical work.

## Step 5 — Adjust (the real secret)

- Weigh yourself ~3× a week, same conditions (morning, after toilet, before eating), and look at the
  **weekly average**, not single days (water weight is noisy).
- After 2–3 weeks: losing ~0.3–0.7 kg/week → perfect, keep going. Not moving → trim ~150–200 kcal
  or add movement. Losing too fast / feeling wrecked → eat a bit more.

---

## Worked example (placeholder — replace with Guillermo's real data)

> Example only, numbers invented. Assume male, 45 y, 178 cm, 95 kg, very active (1.725).

```
BMR  = 10×95 + 6.25×178 − 5×45 + 5 = 950 + 1112.5 − 225 + 5 = 1842.5 kcal
TDEE = 1842.5 × 1.725 ≈ 3178 kcal   (a hard-working body burns a lot!)
Target (−500) ≈ 2678 kcal/day
Protein ≈ 1.8 g × 95 ≈ 170 g/day
```

This is why crash-starving makes no sense for him: with that kind of burn, he can eat a genuinely
satisfying amount of real food and still lose fat. The job is **structure and awareness**, not
suffering.

→ Fill the real numbers into `guillermo-profile.md` and `pilar-profile.md` once we have them.

### Sources
- Mifflin MD, St Jeor ST, et al. (1990), *Am J Clin Nutr* — the Mifflin-St Jeor equation.
- Energy density of body fat (~7,700 kcal/kg): widely used clinical estimate.
- Protein for satiety & muscle retention in a deficit: see module 08 source list.
