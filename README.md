# ACA Companion App

A study companion for ACA groups working through **The Laundry List Workbook**.

Built as a v1 for a Saturday group running April 11 – November 14, 2026. Currently fully
functional for **Trait 1**; Traits 2–14 appear on the traits list with their scheduled dates
and open up over time.

## Stack

- Next.js 15 (static export) · React 19 · TypeScript
- Tailwind CSS v4
- Zustand + localStorage (all data stays in your browser)
- Recharts, Framer Motion, Lucide icons
- date-fns

## Sections

- **Dashboard** — this week's study, progress ring, daily affirmation, quick links
- **Traits** — grid of all 14; Trait 1 opens into a 4-quadrant study (Laundry List / Other
  Laundry List / Flip Side / Flip Side of the Other) with reflection journaling, tags,
  intensity ratings, and an expandable key-concepts reference
- **Calendar** — full 2026 Saturday schedule with attendance tracking and meeting notes
- **Exercises** — Inner Child Dialogue, Feelings Wheel, Trigger Log, Affirmations
- **Insights** — progress rings, intensity trendline, 30-day journaling rhythm, feelings by
  family, tag frequency

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
pnpm build
# → static site in ./out
```

## Deploy to GitHub Pages

```bash
GH_PAGES=1 pnpm build
# → ./out with /aca-companion-app base path baked in
# then push ./out to the gh-pages branch
```

## Adding more traits

Each trait is pure data. To open Trait 2, edit `src/data/traits.ts` and set `active: true` on
the trait, then add its reflection questions to `src/data/questions.ts`. No component changes
needed.

## Privacy

Everything is stored in your browser's localStorage. Nothing is sent to any server. Clearing
your browser data will clear your reflections.
