# BUILD PROMPT — "The Twelve Steps Companion" (AA Recovery Web App)

You are building a **complete, production-ready companion web app for the Alcoholics
Anonymous Twelve Steps**, modeled on an existing sibling app (an ACA "Laundry List"
companion). Reuse that app's **design system, architecture, component patterns, and
interaction model exactly** — only the recovery framework and content change. Unlike the
sibling app (which unlocked content week-by-week), **this app ships with ALL content fully
authored and available on day one. No placeholders, no "coming soon," no gated steps.**

When you finish, every one of the 12 Steps must have: full study content, a complete bank of
reflection questions across all facets, related concepts, custom SVG infographics, and at
least one dedicated interactive exercise — all working, persisted, and reachable in the UI.

---

## 1. Product summary

A calm, book-like, privacy-first study companion for someone working the AA Twelve Steps —
alone, with a sponsor, or alongside a home group. It turns the Steps into an interactive
workbook: read each Step, study it from multiple angles, journal answers to reflection
prompts, run guided exercises (inventories, trackers, daily practices), and watch progress
accumulate — all stored locally in the browser, nothing sent anywhere.

**Tone:** warm, literary, non-clinical, never preachy. Spiritually inclusive ("Higher Power
/ God of your understanding") and welcoming to atheists/agnostics. Recovery-affirming,
trauma-aware, never shaming.

---

## 2. Tech stack (match exactly)

- **Next.js (App Router) with `output: "export"`** (fully static site) + **Turbopack**
- **React 19 + TypeScript** (strict)
- **Tailwind CSS v4** (via `@tailwindcss/postcss`, CSS-first `@theme` config — no
  tailwind.config.js)
- **Zustand** with `persist` middleware → `localStorage` (all user data local-only)
- **Recharts** for charts, **Framer Motion** for subtle motion, **lucide-react** for icons,
  **date-fns** for dates, **clsx + tailwind-merge** (`cn()` helper), **class-variance-
  authority** for variant components
- **pnpm**. ESLint via `eslint-config-next`.
- Deploy via **GitHub Pages** (GitHub Actions workflow on push to `main`), with a
  `GH_PAGES=1` build that sets `basePath`/`assetPrefix` to the repo name. `images:
  { unoptimized: true }`, `trailingSlash: true`.

Do not add a backend, database, auth, or analytics. Everything is client-side and offline-
capable.

---

## 3. Design system (reproduce these tokens verbatim)

Fonts (next/font/google): **Inter** (`--font-inter`, sans/UI), **Fraunces**
(`--font-fraunces`, serif/headings, with `font-feature-settings: "ss01","ss02"`), **Lora**
(`--font-lora`, journal/handwriting feel for user-written text).

CSS variables in `:root` (light) and a `prefers-color-scheme: dark` override:

```css
:root {
  --background:#faf7f2; --foreground:#1f2937;
  --card:#ffffff; --card-foreground:#1f2937;
  --primary:#2d4a3e; --primary-foreground:#faf7f2;     /* deep forest green */
  --accent:#c97b5e; --accent-foreground:#ffffff;        /* terracotta */
  --muted:#ede8df; --muted-foreground:#6b7360;
  --border:#e5dfd1; --ring:#2d4a3e;
  --sage:#a8b8a0;                                        /* recovery/positive */
  --radius:0.75rem;
}
@media (prefers-color-scheme: dark) {
  :root {
    --background:#0f172a; --foreground:#f5f1e8; --card:#1a2438;
    --primary:#7dd3a8; --primary-foreground:#0f172a; --accent:#e89c7f;
    --muted:#1e2a42; --muted-foreground:#94a3b8; --border:#2a3a55; --sage:#8ba588;
  }
}
```

Map them through Tailwind v4 `@theme inline` (`--color-*`, `--font-sans/serif/journal`,
`--radius-*`). Include: global border color, antialiasing, custom scrollbar, `:focus-visible`
ring, and a `.journal-input` / `.font-journal` class (Lora, 1rem, line-height 1.7) used for
all user-authored text areas and rendered journal entries.

**Color semantics (keep consistent across all graphics):**
- `--primary` (forest green) = the Step / the program / grounded recovery
- `--accent` (terracotta) = the problem, the defect, the active addiction, the warning
- `--sage` = growth, the promise, the healed state
- a violet `#8B7BA8` and gold `#D4A84B` are allowed as 4th/5th categorical colors

**UI primitives** (in `src/components/ui/`): `Button` (cva variants: default/accent/outline/
ghost/subtle; sizes sm/default/lg/icon), `Card`, `Badge` (default/outline/muted/sage),
`Textarea` + `Input`, `Tabs/TabsList/TabsTrigger/TabsContent`, `ProgressRing` (SVG circular
progress). Match the sibling app's class strings and rounded, soft, paper-like aesthetic.

**Layout:** persistent left **Sidebar** on desktop, bottom **MobileNav** on small screens.
Routes: Dashboard `/`, Steps `/steps`, Step detail `/steps/[id]`, Exercises `/exercises`,
Calendar `/calendar`, Insights `/insights`. A dismissible **privacy banner** ("Everything
stays on this device") on first load.

---

## 4. Information architecture & the per-Step model

The sibling app studied each item across **four quadrants**. For the Steps, use an analogous
**four-facet model** so every Step is examined from multiple angles. Use these four facets
(tabs) for every Step:

1. **The Step** — the exact Step text + a plain-language "what this is really asking."
2. **The Principle** — the spiritual principle behind the Step (see table) and what it looks
   like lived out; the inner shift it asks for.
3. **Working It** — the concrete practice: how people actually do this Step (with a sponsor,
   on paper, in prayer/meditation, in conversation), common pitfalls, and "you'll know it's
   working when…".
4. **The Promise** — what this Step gives back; the freedom/relief on the other side; how it
   connects to the AA Promises and to the next Step.

Each facet has: a one-line essence, a **custom SVG infographic** with a caption, a set of
**reflection questions** (journaled, autosaved), optional **supplement graphics/tables**, and
a **related-concepts** accordion at the bottom of the page.

Every Step is `active: true` from launch. Provide a "current step" concept for the dashboard
(let the user **set/advance their current Step** manually, persisted — since there's no fixed
calendar) and a manual **Step start/worked dates** the user can set.

---

## 5. Canonical content to embed (this is the authoritative dataset)

> Licensing note: The **Twelve Steps** and **Twelve Traditions** short-form wordings are
> reproduced here because A.A. World Services permits their reprinting; include them verbatim.
> **Do NOT copy other copyrighted Big Book passages** (e.g., the exact "Promises" paragraph,
> "How It Works", the Doctor's Opinion) verbatim. Instead, **author original** summaries,
> reflection questions, concept explanations, and exercise copy in the app's own voice.

### 5a. The Twelve Steps (embed verbatim)

1. We admitted we were powerless over alcohol—that our lives had become unmanageable.
2. Came to believe that a Power greater than ourselves could restore us to sanity.
3. Made a decision to turn our will and our lives over to the care of God *as we understood
   Him*.
4. Made a searching and fearless moral inventory of ourselves.
5. Admitted to God, to ourselves, and to another human being the exact nature of our wrongs.
6. Were entirely ready to have God remove all these defects of character.
7. Humbly asked Him to remove our shortcomings.
8. Made a list of all persons we had harmed, and became willing to make amends to them all.
9. Made direct amends to such people wherever possible, except when to do so would injure
   them or others.
10. Continued to take personal inventory and when we were wrong promptly admitted it.
11. Sought through prayer and meditation to improve our conscious contact with God *as we
    understood Him*, praying only for knowledge of His will for us and the power to carry that
    out.
12. Having had a spiritual awakening as the result of these Steps, we tried to carry this
    message to alcoholics, and to practice these principles in all our affairs.

### 5b. Spiritual principle per Step (use as each Step's "Principle" facet anchor)

1 Honesty · 2 Hope · 3 Faith · 4 Courage · 5 Integrity · 6 Willingness · 7 Humility ·
8 Brotherly Love · 9 Justice · 10 Perseverance · 11 Spiritual Awareness/Patience ·
12 Service.

### 5c. The Twelve Traditions (embed verbatim; surface in a `/traditions` reference section
or within Step 12 / a Concepts page)

1. Our common welfare should come first; personal recovery depends upon A.A. unity.
2. For our group purpose there is but one ultimate authority—a loving God as He may express
   Himself in our group conscience. Our leaders are but trusted servants; they do not govern.
3. The only requirement for A.A. membership is a desire to stop drinking.
4. Each group should be autonomous except in matters affecting other groups or A.A. as a
   whole.
5. Each group has but one primary purpose—to carry its message to the alcoholic who still
   suffers.
6. An A.A. group ought never endorse, finance, or lend the A.A. name to any related facility
   or outside enterprise, lest problems of money, property, and prestige divert us from our
   primary purpose.
7. Every A.A. group ought to be fully self-supporting, declining outside contributions.
8. Alcoholics Anonymous should remain forever nonprofessional, but our service centers may
   employ special workers.
9. A.A., as such, ought never be organized; but we may create service boards or committees
   directly responsible to those they serve.
10. Alcoholics Anonymous has no opinion on outside issues; hence the A.A. name ought never be
    drawn into public controversy.
11. Our public relations policy is based on attraction rather than promotion; we need always
    maintain personal anonymity at the level of press, radio, and films.
12. Anonymity is the spiritual foundation of all our Traditions, ever reminding us to place
    principles before personalities.

### 5d. Concepts glossary (author original ~120–180 word definitions for each; tag each with
the Steps it relates to). Build at least these:

Powerlessness · Unmanageability · The Allergy & the Obsession (disease model) · Hitting
Bottom · Higher Power / God of your understanding · Restoration to Sanity · Surrender vs.
Self-Will · "Acting As If" · The Moral Inventory · Resentment · Fear (the corrosive thread) ·
Character Defects vs. Character Assets · Self-Will Run Riot · The Fifth Step (confession &
relief) · Entire Readiness · Humility (right-sizing, not self-loathing) · Shortcomings ·
The Amends List (harms ledger) · Direct vs. Living vs. Indirect Amends · "Except When to Do
So Would Injure" · The Spot-Check Inventory · The Daily Inventory · Prayer & Meditation
(conscious contact) · Step 11 practices (e.g., the morning/night reflection) · Spiritual
Awakening (educational vs. burning-bush) · Carrying the Message / Sponsorship · "Principles
Before Personalities" · The Promises · HALT (Hungry/Angry/Lonely/Tired) · Playing the Tape
Forward · One Day at a Time · The Pink Cloud · Dry Drunk · Relapse as process, not event.

### 5e. The AA Promises — author an **original** distilled list (do not quote verbatim). E.g.,
summarize the nine "Ninth-Step Promises" as short paraphrased cards (freedom & happiness; no
regret over the past; serenity & peace; our experience benefits others; self-pity vanishes;
less self-seeking; intuition replacing fear; we handle situations that used to baffle us; a
sense that a Power greater than ourselves is doing for us what we could not). Use these as the
"Promise" facet payoff and in a Promises tracker exercise.

---

## 6. Reflection questions — REQUIRED for every Step

Author a **complete bank for all 12 Steps**, distributed across the four facets (The Step /
The Principle / Working It / The Promise). Target **7–10 questions per Step** (≈100 total).
Questions must be original, specific, open-ended, and practical. Persist each answer keyed by
`stepId::facet::index`. Show a per-Step progress ring (answered / total).

Style examples to match (write the rest at this quality):

- **Step 1 · The Step:** "Describe, in concrete detail, a time your drinking did something you
  had promised yourself it wouldn't. What did that cost you?"
- **Step 1 · The Principle (Honesty):** "Where are you still negotiating with the word
  'powerless'? What would it mean to stop bargaining with it?"
- **Step 1 · Working It:** "List the areas of your life that feel unmanageable right now —
  money, relationships, health, time, mood. Which one is loudest today?"
- **Step 2 · The Principle (Hope):** "What does 'restored to sanity' look like for you,
  specifically? Describe an ordinary moment that would tell you it's happening."
- **Step 4 · Working It:** "Pick one resentment. Name the person, the cause, and the part of
  you it threatens (self-esteem, security, ambition, a relationship). What is your part?"
- **Step 9 · The Step:** "Choose one amends you've been avoiding. What's the fear underneath
  the avoidance — and whose injury are you actually protecting?"
- **Step 11 · The Promise:** "After a week of a small morning practice, what is different in
  how you meet the first difficult moment of the day?"

Provide all banks fully populated — no Step may ship with empty questions.

---

## 7. Interactive exercises — REQUIRED (build all of these, persisted via zustand)

Each exercise mirrors the sibling app's pattern: a "How to practice" card (with an embedded
infographic), a form/interaction, a visual summary (bars / rings / charts / streaks), and a
deletable history. Provide a curated **per-Step bundle** plus a cross-step library.

Build at least these twelve exercises:

1. **Powerlessness & Unmanageability Inventory** (Step 1) — log incidents; tag life-area
   (money/relationships/health/legal/mood); a domain heat-bar summary.
2. **Higher Power Sketchpad** (Steps 2–3, 11) — define/redefine your conception of a Higher
   Power over time; "what it is / what it is NOT" two-column builder; revision history.
3. **Surrender / Letting-Go Log** (Step 3) — capture what you're holding; move it to
   "turned over today"; a count of days something stayed turned over.
4. **Resentment Inventory (4th-Step Grid)** — the classic four-column tool, fully interactive:
   *Who/what I resent · The cause · What it affects in me (self-esteem, security, ambitions,
   personal/sex relations, pride, pocketbook) · My part*. Multi-select "affects," summary by
   category, export-to-print view.
5. **Fear Inventory** (Step 4) — fear → why I have it → what it has cost → what faith/action
   replaces it.
6. **Sex/Relationships Conduct Inventory** (Step 4) — gentle, optional, non-shaming version.
7. **Fifth-Step Prep & Debrief** (Step 5) — checklist of what to share; a before/after
   "weight on my chest" slider (0–100) with a relief delta and trend chart.
8. **Defects → Assets Mapper** (Steps 6–7) — for each defect, name the fear it protects and
   the opposing asset/virtue to practice; readiness slider per defect.
9. **Amends Ledger** (Steps 8–9) — people harmed; the harm; amends type (direct / living /
   indirect / none-yet); status (willing → planned → made); "would it injure?" flag; a
   progress board (Kanban-style columns) and counts.
10. **Daily / Spot-Check Tenth-Step Inventory** (Step 10) — nightly review: where was I
    resentful, selfish, dishonest, afraid? what do I owe? a daily streak + a weekly mood/
    honesty sparkline.
11. **Conscious-Contact Tracker** (Step 11) — log prayer/meditation/quiet sits with duration
    and before/after calm slider; trend chart of capacity over time (reuse the sibling app's
    "Solo Sit" pattern).
12. **Message-Carried / Service Log** (Step 12) — log service actions (shared at a meeting,
    answered a call, sponsored, set up chairs); a "12th-Step muscle" streak; gentle reminder
    that helping is also for you.

Plus daily-practice helpers reusable across Steps: **Gratitude List**, **HALT Check-in**
(Hungry/Angry/Lonely/Tired quick log with a nudge), **Playing-the-Tape-Forward** guided
writer, **Promises Tracker** (which of the paraphrased Promises are coming true — toggled over
time with a "first noticed" date), and a **Daily Reflection / Affirmation** card (author an
original library of ~60 short recovery affirmations; allow favoriting).

All exercises must work end-to-end with localStorage persistence, empty states, and delete.

---

## 8. Infographics — REQUIRED (custom inline SVG, same house style)

Author **original SVG infographics** in the sibling app's visual language: `viewBox`-based,
`var(--*)` colors, Fraunces for serif titles, Inter for labels, soft rounded nodes, dashed
guide rings, labeled arrows, small legends, and a one-line teaching caption rendered beneath
each in the study view. Build **at least one primary graphic per Step facet** (so ~2–4 per
Step) plus synthesis graphics and reference tables. Required set includes:

- **The Cycle of Addiction** loop (Step 1) — craving → use → consequence → shame → craving,
  with the break-point where powerlessness is admitted.
- **Powerlessness vs. Unmanageability** two-axis quadrant (Step 1).
- **The Bridge of Steps** — a 12-node journey map (overview, used on `/steps` and the
  dashboard), color-graded accent→sage, grouped as "give up (1–3) · clean house (4–9) ·
  maintain & grow (10–12)."
- **Self-Will vs. Higher-Will** pendulum/compass (Steps 2–3).
- **The Resentment Anatomy** diagram (Step 4) — how a resentment maps onto the four columns;
  "what it threatens in me."
- **Fear, the Corrosive Thread** (Step 4) — fear running under resentment, dishonesty, control.
- **The Weight Lifted** before/after (Step 5).
- **Defect ↔ Asset mirror** (Steps 6–7) — each defect paired with the virtue that replaces it.
- **The Harms Ledger / Amends decision tree** (Steps 8–9) — direct vs living vs indirect, and
  the "would it injure?" branch.
- **The Daily Maintenance Loop** (Step 10) — spot-check → admit → correct → continue.
- **Conscious Contact** widening-circle / signal-strength graphic (Step 11).
- **The Spiral of Service** (Step 12) — keeping it by giving it away; the upward spiral.
- **Spiritual-principles ring** — the 12 principles around a circle (overview/Concepts page).
- **Reference tables** (responsive HTML, like the sibling app's comparison tables): a
  **Step → Principle → Promise** master table; a **Three Phases of the Steps** table; a
  **Kinds of Amends** comparison table.

Also build small **concept glyphs** (48–64px inline SVG) for each glossary concept, shown in
the concepts accordion and concept chips — same approach as the sibling app's `GLYPHS` map.

---

## 9. Other screens

- **Dashboard `/`** — current Step spotlight (user-set), progress ring across all answered
  questions, a daily affirmation, quick links to study/exercises/concepts, the Bridge-of-Steps
  overview graphic, and a "today's small practice" suggestion (gratitude / HALT / 10th-step).
- **Steps hub `/steps`** — all 12 as cards with principle, short essence, progress, and the
  three-phase grouping; a Step picker/spotlight; the principles ring and bridge graphics.
- **Calendar `/calendar`** — a flexible **meeting & milestone tracker** (no fixed schedule):
  log meetings attended, mark a sobriety date and show a **day counter / chips** (24h, 30/60/
  90 days, 6/9 months, multiples of years), sponsor check-ins, and notes. Sobriety date drives
  a celebratory milestone strip.
- **Insights `/insights`** — progress rings per Step and overall; an inventory-activity
  trendline; resentment-by-category and defect-readiness summaries; 10th-step honesty streak;
  conscious-contact trend; promises-coming-true count; journaling rhythm (last 30 days).
- **Concepts/Reference** — full glossary with glyphs and accordion; the 12 Traditions; the
  paraphrased Promises; the master Step→Principle→Promise table.

---

## 10. Data model (zustand store, persisted; mirror the sibling app's shapes)

Types include (TypeScript): `Step` (`id, title, principle, phase, statements{step,
principle, working, promise}, sobrietyRelevant`), `ReflectionQuestion`
(`stepId, facet, index, question`), `JournalEntry` (keyed `stepId::facet::index`), `Concept`
(`id, name, shortDefinition, longDefinition, relatedSteps[]`), plus per-exercise entry types
(ResentmentEntry, FearEntry, AmendsEntry, DefectAssetEntry, TenthStepEntry,
ConsciousContactEntry, ServiceLogEntry, GratitudeEntry, HaltCheckIn, PromiseProgress,
HigherPowerSketch, SurrenderItem, FifthStepSession, sobrietyDate, favorites, currentStepId,
etc.). Store actions: upsert/get journal, and log/update/delete for every exercise list.
`persist` to `localStorage` under a single key with a version number.

---

## 11. Quality bar & acceptance criteria (must ALL be true at completion)

1. `pnpm build` passes clean; static export generates `/steps/1` … `/steps/12` (all 12
   prerendered) plus all top-level routes. Lint clean (no new errors).
2. **Every Step is fully authored** — four facets with essence + infographic + caption +
   complete question bank; no empty arrays, no "coming soon," nothing gated.
3. The full concepts glossary (with glyphs), all 12 Traditions, paraphrased Promises, and the
   reference tables are present and reachable.
4. **All exercises in §7 work end-to-end**, persist to localStorage, have empty states and
   delete, and at least the curated ones appear in each Step's bundle with per-Step context
   copy.
5. The infographics in §8 are implemented as original inline SVG in the house style and wired
   into the correct facets/pages.
6. Dashboard, Steps hub, Calendar (with sobriety counter), Insights, and Concepts pages all
   render with real data and graceful empty states.
7. Light/dark theme both look correct; mobile (bottom nav) and desktop (sidebar) layouts both
   work; everything is keyboard-focusable.
8. No backend, no network calls, no PII leaves the device; privacy banner present.
9. Provide a GitHub Pages deploy workflow and a README documenting stack, structure, and the
   "all content ships on day one" guarantee.

Build it so a person could open the app cold and work all twelve Steps end to end, today,
without anything being locked. Prioritize correctness, warmth, and completeness over cleverness.

---

## 12. Content-authoring guardrails

- Use the **public, reprint-permitted** Step and Tradition wordings verbatim (§5a, §5c).
- **Write all other prose originally** — do not paste copyrighted Big Book passages. Paraphrase
  the Promises and any disease-model framing into the app's own voice.
- Keep spiritually inclusive language throughout ("Higher Power / God of your understanding /
  the group / love / nature — whatever works for you").
- Be trauma-aware and non-shaming; make the heavier inventories (Step 4 sex conduct, amends)
  explicitly optional and gentle.
- Medical safety: include a quiet, non-alarmist note that detox from alcohol can be dangerous
  and to seek medical help — but keep the app educational, not clinical.
```
