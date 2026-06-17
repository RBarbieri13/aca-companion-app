# The Twelve Steps Companion

A calm, book-like, **privacy-first** study companion for someone working the Alcoholics
Anonymous **Twelve Steps** — alone, with a sponsor, or alongside a home group. It turns the
Steps into an interactive workbook: read each Step, study it from four angles, follow Big Book
references, journal answers to reflection prompts, run multi-segment guided exercises, rehearse
what to share at a meeting, and explore an interactive map of how the Steps connect.

> **All content ships day one.** Every one of the twelve Steps is fully authored and unlocked
> from the first launch — four study facets, a complete reflection-question bank, three custom
> SVG infographics each, Big Book reference cards, a multi-segment exercise, a per-Step insights
> panel, and meeting-share ideas. Nothing is gated, nothing is a placeholder, nothing is "coming
> soon."

## Privacy

There is **no backend, no account, no analytics, and no network call.** Everything you write —
reflections, inventories, amends lists, daily check-ins, meeting-share drafts, your sobriety
date — lives only in this browser's `localStorage`. Anonymity is built in. A dismissible privacy
banner explains this on first load.

## Stack

- **Next.js (App Router)** with `output: "export"` (fully static) + **Turbopack**
- **React 19 + TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first `@theme`, no `tailwind.config.js`)
- **Zustand** with `persist` middleware → `localStorage`
- **Recharts** (charts), **Framer Motion** (map motion), **lucide-react** (icons),
  **date-fns**, **clsx + tailwind-merge**, **class-variance-authority**
- **pnpm** · ESLint via `eslint-config-next`

Design system: forest-green / terracotta / sage palette; **Inter / Fraunces / Lora** type;
soft, paper-like, rounded aesthetic; full light + dark support.

## Sections

- **Dashboard `/`** — current-Step spotlight, overall progress, daily reflection, sobriety
  counter, today's small practice, quick links.
- **The Steps `/steps`** — the interactive Step Map, all twelve as cards, the spiritual-principles
  ring, and the three-phase banner.
- **Step detail `/steps/[id]`** — four facets (The Step · The Principle · Working It · The
  Promise), each with an essence line, a custom infographic + teaching caption, reflection
  questions (autosaved), plus Big Book references, a per-Step insights panel, meeting-share
  ideas with a draft box, and related concepts.
- **Step Map `/map`** — the centerpiece (also embedded in `/steps`): progress-sized nodes, drawn
  step-to-step connections with hover labels, drill-down detail cards, phase filtering, and a
  live aggregate-insights panel.
- **Exercises `/exercises`** — a dedicated multi-segment workflow for every Step, plus a shared
  daily library (Gratitude, HALT, Play the Tape Forward, Promises Tracker, Daily Reflection).
- **Calendar `/calendar`** — sobriety date with a milestone day-counter, meeting & sponsor
  check-in log, and the meeting-prep list of your drafted shares.
- **Insights `/insights`** — per-Step and overall progress, resentments by category, defect
  readiness, conscious-contact trend, amends board, and a 30-day journaling rhythm.
- **Concepts `/concepts`** — the full glossary (with glyphs), the Twelve Traditions, the
  paraphrased Promises, master reference tables, and the Big Book citation index.

## The Step Map

The map draws the journey as connected nodes:

- **Surrender triad** 1→2→3 ("give up")
- **Housecleaning chain** 4→5→6→7→8→9 ("clean house")
- **Maintenance & growth** 10·11·12 ("keep it"), with **feedback edges** 10→4, 11→3, and 12→1
  (carrying the message back to a newcomer at Step 1).

Each node is sized and ringed by **your own progress** (reflection answers + exercise activity).
Tap a node to drill into a detail card; hover an edge to read the relationship. The aggregate
panel beside it updates live from your work.

## Content & licensing

- The **Twelve Steps** and **Twelve Traditions** short forms are reprint-permitted by A.A. World
  Services and appear **verbatim**.
- **Big Book material is cited, never reproduced** — chapter/essay + page locator + our own
  original summary. The Promises and any prayers are **paraphrased in original words**.
- All reflection prompts, concept write-ups, exercise copy, infographics, and meeting-share ideas
  are written originally, in a warm, literary, spiritually inclusive ("Higher Power / God of your
  understanding / nature / the group — whatever works for you"), trauma-aware voice.
- A quiet, non-alarmist note reminds readers that alcohol detox can be medically dangerous and to
  seek medical help. This app is educational, not clinical, and is not affiliated with A.A.W.S.

## Project structure

```
src/
  app/                     # routes (dashboard, steps, steps/[id], map, exercises, calendar, insights, concepts)
  components/
    ui/                    # Button, Card, Badge, Tabs, ProgressRing, Textarea/Input
    infographics/          # step1..step12 (3 graphics each) + shared graphics/tables + concept glyphs + registry
    exercises/             # step1..step12 workflows + shared daily library + registry
    step-map.tsx           # the interactive map
    step-study-view.tsx    # the four-facet Step page
    ...                    # dashboard, steps-hub, calendar, insights, concepts views, etc.
  data/                    # steps, questions, concepts, traditions, promises, connections, affirmations
  lib/                     # types, selectors (progress/aggregates), utils
  store/app-store.ts       # the single persisted Zustand store
```

## Local development

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # static site in ./out
pnpm lint
```

## Deploy to GitHub Pages

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys on push to `main`.
A `GH_PAGES=1` build sets the `basePath`/`assetPrefix` to the repository name.

```bash
GH_PAGES=1 pnpm build    # → ./out with the repo base path baked in
```

## A note of care

This is a study companion, not treatment, a sponsor, or a substitute for a meeting. If you're in
danger or considering harming yourself, please reach out to a crisis line or emergency services in
your area. You're worth the call.
