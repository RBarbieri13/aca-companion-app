# BUILD PROMPT — "The Twelve Steps Companion" (AA Recovery Web App)

You are building a **complete, production-ready companion web app for the Alcoholics
Anonymous Twelve Steps**, modeled on an existing sibling app (an ACA "Laundry List"
companion). Reuse that app's **design system, architecture, component patterns, and
interaction model exactly** — only the recovery framework and content change. Unlike the
sibling app (which unlocked content week-by-week), **this app ships with ALL content fully
authored and available on day one. No placeholders, no "coming soon," no gated steps.**

When you finish, every one of the 12 Steps must have: full study content, a complete bank of
reflection questions across all facets, related concepts, **exactly three custom SVG
infographics**, **Big Book references**, **a multi-segment interactive exercise**, **per-step
insights**, and **per-step meeting-share ideas** — all working, persisted, and reachable in
the UI. The Steps hub must include an **interactive, hyper-detailed Step Map** with drill-
downs, step-to-step connections, and aggregate insights.

---

## 1. Product summary

A calm, book-like, privacy-first study companion for someone working the AA Twelve Steps —
alone, with a sponsor, or alongside a home group. It turns the Steps into an interactive
workbook: read each Step, study it from multiple angles, follow Big Book references, journal
answers to reflection prompts, run **multi-segment guided exercises** (inventories, trackers,
daily practices), rehearse **what to share at a meeting**, see **per-step and aggregate
insights**, and explore an **interactive map of how the Steps connect** — all stored locally
in the browser, nothing sent anywhere.

**Tone:** warm, literary, non-clinical, never preachy. Spiritually inclusive ("Higher Power /
God of your understanding") and welcoming to atheists/agnostics. Recovery-affirming, trauma-
aware, never shaming.

---

## 2. Tech stack (match exactly)

- **Next.js (App Router) with `output: "export"`** (fully static site) + **Turbopack**
- **React 19 + TypeScript** (strict)
- **Tailwind CSS v4** (via `@tailwindcss/postcss`, CSS-first `@theme` — no tailwind.config.js)
- **Zustand** with `persist` middleware → `localStorage` (all user data local-only)
- **Recharts** (charts), **Framer Motion** (subtle motion + map interactions), **lucide-
  react** (icons), **date-fns** (dates), **clsx + tailwind-merge** (`cn()`), **class-
  variance-authority** (variant components)
- **pnpm**. ESLint via `eslint-config-next`.
- Deploy via **GitHub Pages** (Actions workflow on push to `main`); `GH_PAGES=1` build sets
  `basePath`/`assetPrefix` to the repo name. `images:{unoptimized:true}`, `trailingSlash:true`.

No backend, database, auth, analytics, or network calls. Offline-capable.

---

## 3. Design system (reproduce these tokens verbatim)

Fonts (next/font/google): **Inter** (`--font-inter`), **Fraunces** (`--font-fraunces`, with
`font-feature-settings:"ss01","ss02"`), **Lora** (`--font-lora`, journal text).

```css
:root {
  --background:#faf7f2; --foreground:#1f2937;
  --card:#ffffff; --card-foreground:#1f2937;
  --primary:#2d4a3e; --primary-foreground:#faf7f2;     /* deep forest green */
  --accent:#c97b5e; --accent-foreground:#ffffff;        /* terracotta */
  --muted:#ede8df; --muted-foreground:#6b7360;
  --border:#e5dfd1; --ring:#2d4a3e;
  --sage:#a8b8a0; --radius:0.75rem;
}
@media (prefers-color-scheme: dark) {
  :root {
    --background:#0f172a; --foreground:#f5f1e8; --card:#1a2438;
    --primary:#7dd3a8; --primary-foreground:#0f172a; --accent:#e89c7f;
    --muted:#1e2a42; --muted-foreground:#94a3b8; --border:#2a3a55; --sage:#8ba588;
  }
}
```

Map through Tailwind v4 `@theme inline` (`--color-*`, `--font-sans/serif/journal`,
`--radius-*`). Include global border color, antialiasing, custom scrollbar, `:focus-visible`
ring, and `.journal-input`/`.font-journal` (Lora, 1rem, line-height 1.7) for all user text.

**Color semantics (consistent across every graphic):** `--primary` = the Step/program/
grounded recovery · `--accent` = the problem/defect/active addiction/warning · `--sage` =
growth/the promise/healed state · violet `#8B7BA8` and gold `#D4A84B` as 4th/5th categoricals.

**UI primitives** (`src/components/ui/`): `Button` (cva: default/accent/outline/ghost/subtle;
sizes sm/default/lg/icon), `Card`, `Badge` (default/outline/muted/sage), `Textarea`+`Input`,
`Tabs`, `ProgressRing`. Soft, paper-like, rounded aesthetic.

**Layout:** desktop left **Sidebar**, mobile bottom **MobileNav**. Routes: Dashboard `/`,
Steps `/steps`, Step detail `/steps/[id]`, Step Map `/map` (or a prominent panel on `/steps`),
Exercises `/exercises`, Calendar `/calendar`, Insights `/insights`, Concepts/Reference
`/concepts`. Dismissible **privacy banner** on first load.

---

## 4. The per-Step model (four facets)

Every Step is studied across **four facets** (tabs). Every Step is `active: true` from launch.

1. **The Step** — exact Step text + plain-language "what this is really asking."
2. **The Principle** — the spiritual principle behind the Step (table in §5b) lived out.
3. **Working It** — the concrete practice: how people do this Step (sponsor, paper, prayer/
   meditation, conversation), common pitfalls, "you'll know it's working when…".
4. **The Promise** — what the Step gives back; the relief on the other side; the bridge to the
   next Step.

Each facet renders: a one-line essence, **one of the Step's three infographics** with a
teaching caption, a set of **reflection questions** (journaled, autosaved), optional
supplement tables, **Big Book references**, and a related-concepts accordion.

A **manual "current Step"** (user-set, persisted) drives the dashboard; the user can set
per-Step **started / worked dates**.

---

## 5. Canonical content to embed (authoritative dataset)

> Licensing: The **Twelve Steps** and **Twelve Traditions** short-form wordings are reprint-
> permitted by A.A. World Services — include them verbatim. **Do NOT reproduce other
> copyrighted Big Book text verbatim** (the Promises paragraph, "How It Works," the Doctor's
> Opinion, etc.). **Big Book references are CITATIONS ONLY** — chapter title + page range +
> a 1–2 sentence ORIGINAL summary of what's there and why it matters to this Step. Author all
> other prose originally.

### 5a. The Twelve Steps (embed verbatim) — same as standard AA wording

1. We admitted we were powerless over alcohol—that our lives had become unmanageable.
2. Came to believe that a Power greater than ourselves could restore us to sanity.
3. Made a decision to turn our will and our lives over to the care of God *as we understood
   Him*.
4. Made a searching and fearless moral inventory of ourselves.
5. Admitted to God, to ourselves, and to another human being the exact nature of our wrongs.
6. Were entirely ready to have God remove all these defects of character.
7. Humbly asked Him to remove our shortcomings.
8. Made a list of all persons we had harmed, and became willing to make amends to them all.
9. Made direct amends to such people wherever possible, except when to do so would injure them
   or others.
10. Continued to take personal inventory and when we were wrong promptly admitted it.
11. Sought through prayer and meditation to improve our conscious contact with God *as we
    understood Him*, praying only for knowledge of His will for us and the power to carry that
    out.
12. Having had a spiritual awakening as the result of these Steps, we tried to carry this
    message to alcoholics, and to practice these principles in all our affairs.

### 5b. Spiritual principle per Step (the "Principle" facet anchor)

1 Honesty · 2 Hope · 3 Faith · 4 Courage · 5 Integrity · 6 Willingness · 7 Humility ·
8 Brotherly Love · 9 Justice · 10 Perseverance · 11 Spiritual Awareness/Patience · 12 Service.

### 5c. Big Book references per Step (CITATIONS + original summaries — embed a `bigBookRefs[]`
on each Step; ~2–4 refs each). Use these chapter anchors and approximate page ranges; write
your own one-line gloss for each:

- **Step 1** — "The Doctor's Opinion"; "Bill's Story" (ch. 1); "More About Alcoholism"
  (ch. 3, ~pp. 30–43); the idea of powerlessness + the mental obsession/physical craving.
- **Step 2** — "We Agnostics" (ch. 4, ~pp. 44–57); coming to believe; the inclusive Higher
  Power.
- **Step 3** — "How It Works" (ch. 5, ~pp. 60–63); the decision; the Third-Step idea (cite,
  don't quote the prayer verbatim — paraphrase or label it).
- **Step 4** — "How It Works" continued (~pp. 63–71); the inventory method (resentment, fear,
  sex/conduct columns).
- **Step 5** — "Into Action" (ch. 6, ~pp. 72–75); admitting to another human being.
- **Steps 6–7** — "Into Action" (~pp. 75–76); readiness + the Seventh-Step idea (paraphrase
  the prayer/label it).
- **Steps 8–9** — "Into Action" (~pp. 76–84); the amends list and making amends; the "would
  it injure" caution; leads into the Promises.
- **Step 9 Promises** — "Into Action" (~pp. 83–84) — reference by location; PARAPHRASE the
  nine promises in original words (see §5e).
- **Step 10** — "Into Action" (~pp. 84–85); continuing inventory; the spot-check.
- **Step 11** — "Into Action" (~pp. 85–88); prayer & meditation; morning/night practices
  (paraphrase, don't quote).
- **Step 12** — "Working With Others" (ch. 7) + "A Vision For You" (ch. 11); carrying the
  message; "practice these principles in all our affairs."
- Cross-cutting — "The Family Afterward," "To Wives," "To Employers" for relational context;
  the **Twelve & Twelve** (Twelve Steps and Twelve Traditions) as a second reference work,
  cited per Step by essay.

Render each ref as a tidy citation card: **work · chapter/essay · page range · your 1–2
sentence summary** + a "why it matters for this Step" line. Never paste the source text.

### 5d. Twelve Traditions (embed verbatim) — surface on `/concepts` and within Step 12.

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

### 5e. The Promises — author an **original** paraphrased nine-card set (freedom & happiness;
no regret over the past; serenity & peace; our experience now benefits others; self-pity
fades; less self-seeking; intuition replaces fear; we handle what used to baffle us; a sense
that a Power greater than ourselves is doing for us what we could not). Use in the Step-9
"Promise" facet and the Promises Tracker.

### 5f. Concepts glossary (author original ~120–180 word definitions; tag `relatedSteps[]`;
build a 48–64px SVG glyph for each):

Powerlessness · Unmanageability · The Allergy & the Obsession · Hitting Bottom · Higher Power
/ God of your understanding · Restoration to Sanity · Surrender vs. Self-Will · "Acting As
If" · The Moral Inventory · Resentment · Fear (the corrosive thread) · Character Defects vs.
Assets · Self-Will Run Riot · The Fifth Step (confession & relief) · Entire Readiness ·
Humility (right-sizing) · Shortcomings · The Amends List · Direct vs. Living vs. Indirect
Amends · "Except When to Do So Would Injure" · The Spot-Check Inventory · The Daily Inventory
· Prayer & Meditation (conscious contact) · Spiritual Awakening (educational vs. sudden) ·
Carrying the Message / Sponsorship · "Principles Before Personalities" · The Promises · HALT ·
Playing the Tape Forward · One Day at a Time · The Pink Cloud · Dry Drunk · Relapse as
process · Anonymity.

---

## 6. Reflection questions — REQUIRED for every Step

Author a **complete bank for all 12 Steps**, distributed across the four facets. Target
**7–10 questions per Step** (≈100 total). Original, specific, open-ended, practical. Persist
each answer keyed by `stepId::facet::index`; show a per-Step progress ring. (Style examples:
"Describe a time your drinking did something you'd promised yourself it wouldn't — what did it
cost?"; "What does 'restored to sanity' look like in one ordinary moment?"; "Pick one
resentment: who, the cause, what it threatens in you, and your part.") No empty banks.

---

## 7. Interactive exercises — MULTI-SEGMENT, one per Step (plus a shared daily library)

Every Step gets a **dedicated, multi-segment exercise workflow** — a guided sequence of
2–4 segments shown as steps/accordions/tabs within the exercise, each segment persisted
independently, with a combined visual summary and deletable history. Build all twelve:

1. **Step 1 — Powerlessness Workshop**: ① Powerlessness incidents (tag life-area) → ②
   Unmanageability map (domain heat-bars: money/relationships/health/legal/mood/time) → ③
   "Tape forward" on one denial. Summary: a powerless/unmanageable two-axis plot.
2. **Step 2 — Coming-to-Believe Builder**: ① Higher-Power Sketchpad ("what it is / what it is
   NOT") → ② Evidence log (moments that hint a Power is at work) → ③ "Restored to sanity"
   vision board (text cards). Summary: belief-over-time slider trend.
3. **Step 3 — Turning-It-Over Practice**: ① What I'm gripping → ② Decision statement (author
   your own, save versions) → ③ Daily "turned over today" check-in. Summary: days-held streak.
4. **Step 4 — The Inventory (the big one, 4 segments)**: ① Resentment grid (4 columns: who/
   cause / affects [self-esteem·security·ambition·relationships·pride·pocketbook, multi-
   select] / my part) → ② Fear inventory (fear→why→cost→faith/action) → ③ Conduct/relationships
   inventory (gentle, optional) → ④ Harms-noticed list (seeds Step 8). Summary: resentment-by-
   category bars, fear count, a printable inventory view.
5. **Step 5 — Sharing the Inventory**: ① What to read/say checklist → ② "Weight on my chest"
   before slider → ③ After-debrief + relief delta. Summary: relief trend chart.
6. **Step 6 — Entire Readiness**: ① Defect list (auto-pulled from Step 4 themes) → ② per-defect
   readiness slider + "the fear it protects" → ③ "what I get to keep practicing instead."
   Summary: readiness heat-strip.
7. **Step 7 — Humility & Shortcomings**: ① Shortcomings list → ② Humility reframes (defect →
   right-sized self-view) → ③ a daily "humbly asked" check-in. Summary: practiced-today streak.
8. **Step 8 — The Amends List & Willingness**: ① People harmed (import Step-4 harms) → ② the
   harm, in a sentence → ③ willingness slider per person (unwilling → willing). Summary:
   willingness board.
9. **Step 9 — Amends Ledger (Kanban)**: ① amends type (direct/living/indirect/none-yet) → ②
   "would it injure?" flag + plan → ③ status columns (willing → planned → made) with dates.
   Summary: progress board + counts; gentle "go at the pace of safety" note.
10. **Step 10 — Daily Tenth-Step**: ① nightly spot-check (resentful? selfish? dishonest?
    afraid? what do I owe?) → ② prompt corrections/amends owed → ③ a gratitude line. Summary:
    daily streak + honesty/mood sparkline.
11. **Step 11 — Conscious Contact**: ① morning intention → ② prayer/meditation/quiet-sit timer
    log with before/after calm slider → ③ night review. Summary: capacity-over-time trend chart.
12. **Step 12 — Carrying the Message**: ① service-action log (shared, answered a call,
    sponsored, set up chairs) → ② "principles in all my affairs" check (where did I practice
    one today?) → ③ a "give it away to keep it" reflection. Summary: service streak + spiral.

**Shared daily library** (cross-step, always available): Gratitude List, HALT Check-in,
Playing-the-Tape-Forward writer, Promises Tracker (paraphrased nine, with "first noticed"
dates), Daily Reflection/Affirmation card (author ~60 original short affirmations; favoritable).

All exercises: localStorage-persisted, empty states, delete, and surfaced in each Step's
bundle with per-Step context copy.

---

## 8. Infographics — EXACTLY THREE per Step (custom inline SVG, house style) + shared graphics

For **each Step**, author **three** original SVG infographics (so 36 step-specific graphics),
each wired to the most fitting facet and carrying a one-line teaching caption. House style:
`viewBox`-based, `var(--*)` colors, Fraunces titles, Inter labels, soft rounded nodes, dashed
guide rings, labeled arrows, small legends, concrete example micro-copy. Suggested trio per
Step (adapt as needed, but ship three each):

- **Step 1**: Cycle of Addiction loop · Powerlessness×Unmanageability quadrant · "the first
  drink → the phenomenon of craving" arrow diagram.
- **Step 2**: Self-Will vs. Higher-Will pendulum · "coming to believe" gradient (disbelief →
  willingness → faith) · the inclusive-HP options ring (group/nature/love/God/HP).
- **Step 3**: The Decision gate · "my will vs. care of a Higher Power" handoff · what-I-grip →
  open-hand release.
- **Step 4**: Resentment Anatomy (4-column map) · Fear-the-corrosive-thread diagram · the
  inventory "rooms of the house" metaphor.
- **Step 5**: The Weight Lifted before/after · "God, self, another human being" triangle · the
  secrets-lose-power funnel.
- **Step 6**: Entire-Readiness gauge · Defect↔Asset mirror · "the fear each defect protects"
  map.
- **Step 7**: Humility right-sizing scale (not self-loathing, not grandiosity) · Shortcomings
  → asked-to-be-removed flow · the "willing hands open" glyph-scene.
- **Step 8**: The Harms Ledger · willingness spectrum · "the list before the amends" sequencing.
- **Step 9**: Amends decision tree (direct/living/indirect + would-it-injure branch) · the
  "clean your side of the street" diagram · the Promises bridge.
- **Step 10**: Daily Maintenance Loop (spot-check→admit→correct→continue) · the "promptly"
  time-decay curve · resentment-early-warning radar.
- **Step 11**: Conscious-Contact widening circles / signal strength · morning/night bookends ·
  "knowledge of His will + power to carry it out" two-part diagram.
- **Step 12**: The Spiral of Service (keep it by giving it) · spiritual-awakening spectrum
  (educational ↔ sudden) · "principles in all our affairs" radial of life-domains.

**Shared/overview graphics**: the **Step Map** (see §9), a **Spiritual-Principles ring**
(12 principles), a **Three-Phases** banner (give up 1–3 · clean house 4–9 · maintain & grow
10–12), and **responsive HTML reference tables**: Step → Principle → Promise; Kinds of Amends;
the Three Phases. Plus small **concept glyphs** for every glossary item.

---

## 9. The interactive Step Map (hyper-detailed, with drill-downs, connections, aggregate
insights) — REQUIRED, the centerpiece of `/steps` (and/or `/map`)

Build a rich, **interactive SVG/Framer-Motion map of all 12 Steps** that doubles as navigation
and as an insight surface:

- **Nodes**: one per Step, color-graded accent→sage along the journey, sized/ringed by the
  user's **progress** (answered questions + exercise activity for that Step). Each node shows
  Step number, principle, and a completion ring.
- **Connections (draw the relationships as labeled edges)**:
  - **Surrender triad** 1→2→3 ("give up");
  - **House-cleaning chain** 4→5→6→7→8→9 ("clean house"), with the tight 4→5 (inventory→share),
    6→7 (ready→ask), 8→9 (list→amends) couplings emphasized;
  - **Maintenance & growth** 10·11·12 ("keep it"), with feedback edges 10→4 (inventory
    continues), 11→3 (daily turning-over), 12→1 (carry the message back to Step 1's newcomer);
  - **Principle threads** (optional overlay) connecting Steps that share a virtue family.
- **Drill-down**: clicking/tapping a node expands an inline detail card (essence, principle,
  progress, Big Book refs count, exercise status) with a "Open Step" button → `/steps/[id]`;
  hovering an edge explains the relationship.
- **Phase grouping**: visually band the three phases; allow filtering the map by phase or by
  principle.
- **Aggregate insights panel** beside the map: overall completion %, Steps in progress vs.
  untouched, current-Step spotlight, "most-journaled Step," resentments logged, amends made vs.
  pending, 10th-step streak, conscious-contact trend, promises coming true — each linking to
  the relevant Step/exercise. The map and the panel update live from the store.
- Fully keyboard-navigable and responsive (the map gracefully reflows/zooms on mobile, or
  falls back to a vertical connected list with the same drill-downs).

---

## 10. Per-Step Insights & Meeting-Share ideas — REQUIRED on every Step page

Each `/steps/[id]` page includes two dedicated sections in addition to the four facets:

- **Insights for this Step** — a small data panel personalized from the store: this Step's
  question-completion ring, this Step's exercise summary (e.g., "7 resentments logged, top
  category: security"), time since started, related-Step nudges ("Step 4 feeds Step 8 — you've
  noted 3 harms"), and a gentle next-action suggestion. Show graceful empty states before the
  user has data.
- **Bring it to a meeting** — author **per-Step share ideas**: 4–6 original, ready-to-use
  meeting-share prompts and talking points for that Step (e.g., Step 1: "Share the moment you
  first knew you were powerless — not the worst story, the truest one."). Include a "share
  etiquette" micro-note (timing, 'I' statements, anonymity, no cross-talk) and a **personal
  share drafting box** (journaled, autosaved) so the user can prepare what they'll say. Also
  surface relevant **Traditions** reminders (anonymity, principles before personalities).

Also add an aggregate **Meeting Prep** view (on `/calendar` or `/insights`) listing the
user's drafted shares across Steps, plus a meeting log.

---

## 11. Other screens

- **Dashboard `/`** — current-Step spotlight (user-set), overall progress ring, daily
  affirmation, "today's small practice" (gratitude / HALT / 10th-step), a compact Step-Map
  preview, quick links.
- **Steps hub `/steps`** — the interactive Step Map (§9) + all 12 as cards (principle, essence,
  progress, phase) + the principles ring and three-phase banner.
- **Exercises `/exercises`** — per-Step multi-segment exercises (§7) with a Step picker + the
  shared daily library, each with "why this practice for Step N" context.
- **Calendar `/calendar`** — flexible meeting & milestone tracker (no fixed schedule): log
  meetings, set a **sobriety date** with a day/chip counter (24h, 30/60/90 days, 6/9 months,
  yearly), sponsor check-ins, notes, and the Meeting-Prep list of drafted shares.
- **Insights `/insights`** — aggregate version of §9's panel: progress rings per Step + overall;
  inventory-activity trendline; resentment-by-category; defect-readiness; amends board summary;
  10th-step streak; conscious-contact trend; promises coming true; 30-day journaling rhythm.
- **Concepts/Reference `/concepts`** — full glossary with glyphs/accordion; the 12 Traditions;
  paraphrased Promises; Step→Principle→Promise master table; the Big Book reference index.

---

## 12. Data model (zustand store, persisted; mirror sibling app shapes)

Types: `Step` (`id, title, principle, phase, statements{step,principle,working,promise},
bigBookRefs[], shareIdeas[]`), `BigBookRef` (`work, locator, summary, whyItMatters`),
`ReflectionQuestion` (`stepId, facet, index, question`), `JournalEntry` (`stepId::facet::
index`), `ShareDraft` (`stepId, content, updatedAt`), `Concept` (`id, name, shortDefinition,
longDefinition, relatedSteps[]`), `StepConnection` (`from, to, kind, label`), plus per-
exercise entry types for every §7 workflow segment (ResentmentEntry, FearEntry,
ConductEntry, HarmEntry, ReadinessEntry, ShortcomingEntry, AmendsEntry, TenthStepEntry,
ConsciousContactEntry, ServiceLogEntry, GratitudeEntry, HaltCheckIn, PromiseProgress,
HigherPowerSketch, SurrenderItem, FifthStepSession, BeliefPoint, MeetingLog), `sobrietyDate`,
`favorites`, `currentStepId`, `stepDates`. Actions: upsert/get journal & share drafts; set
current step & dates; log/update/delete for every exercise list; set sobriety date; toggle
favorites. `persist` to one versioned `localStorage` key. Derive map/insight aggregates with
selectors.

---

## 13. Quality bar & acceptance criteria (ALL must be true at completion)

1. `pnpm build` passes clean; static export prerenders `/steps/1` … `/steps/12` + all top-
   level routes. Lint clean.
2. **Every Step fully authored** — four facets with essence + caption; **exactly three SVG
   infographics**; **Big Book reference cards**; complete reflection-question bank; **per-Step
   insights panel**; **4–6 meeting-share ideas + a share-draft box**; a **multi-segment
   exercise**. No empty arrays, no placeholders, nothing gated.
3. The **interactive Step Map** works: nodes sized by progress, drawn step-to-step connections
   with hover/label explanations, drill-down detail cards, phase filtering, and a live
   aggregate-insights panel.
4. Full concepts glossary (with glyphs), 12 Traditions, paraphrased Promises, reference tables,
   and the Big Book reference index are present and reachable.
5. **All §7 exercises work end-to-end** (every segment persists), with empty states, delete,
   visual summaries, and per-Step context.
6. The 36 step infographics + shared graphics are original inline SVG in the house style, wired
   to the right facets/pages.
7. Dashboard, Steps hub + map, Exercises, Calendar (sobriety counter + meeting prep), Insights,
   and Concepts render with real data and graceful empty states.
8. Light/dark both correct; mobile (bottom nav, reflowing map) and desktop (sidebar) both work;
   keyboard-focusable throughout.
9. No backend, no network calls, no PII leaves the device; privacy banner present.
10. GitHub Pages deploy workflow + README documenting stack, structure, the Step-Map, and the
    "all content ships day one" guarantee.

A person should be able to open the app cold and work all twelve Steps end to end today —
reading, journaling, running every multi-segment exercise, following Big Book references,
prepping meeting shares, and exploring the connected Step Map — with nothing locked.

---

## 14. Content-authoring guardrails

- Use the reprint-permitted **Step and Tradition** wordings verbatim (§5a, §5d).
- **Big Book references are citations only** — work + chapter/essay + page range + your own
  short summary. **Never paste source text**; paraphrase the Promises and any prayers/quotes.
- Write all reflection prompts, concept write-ups, exercise copy, meeting-share ideas, and
  insights **originally**, in the app's warm voice.
- Spiritually inclusive throughout ("Higher Power / God of your understanding / the group /
  love / nature — whatever works for you").
- Trauma-aware and non-shaming; make heavier inventories (Step 4 conduct, amends) explicitly
  optional and gentle; "go at the pace of safety."
- Quiet, non-alarmist medical note: alcohol detox can be dangerous — seek medical help.
  Educational, not clinical.
