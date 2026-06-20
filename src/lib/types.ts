// ============================================================================
// The Twelve Steps Companion — domain types
// ----------------------------------------------------------------------------
// Everything here is local-only. No PII leaves the device.
// ============================================================================

/** The four study facets every Step is read through (the tabs on a Step page). */
export type Facet = "step" | "principle" | "working" | "promise";

/** The three phases of the journey. */
export type Phase = "surrender" | "house" | "maintenance";

export interface BigBookRef {
  /** e.g. "Alcoholics Anonymous (the Big Book)" or "Twelve Steps and Twelve Traditions". */
  work: string;
  /** Chapter / essay + approximate page range — a citation locator, never source text. */
  locator: string;
  /** Our own 1–2 sentence summary of what's there. */
  summary: string;
  /** Why it matters for THIS Step. */
  whyItMatters: string;
}

export interface Step {
  id: number; // 1..12
  /** Short name, e.g. "Powerlessness". */
  shortName: string;
  /** The reprint-permitted Step wording, verbatim. */
  verbatim: string;
  /** The spiritual principle behind the Step (Honesty, Hope, …). */
  principle: string;
  phase: Phase;
  active: true;
  /** One-line essence per facet. */
  essence: Record<Facet, string>;
  /** Teaching prose per facet (original voice). */
  statements: Record<Facet, string>;
  bigBookRefs: BigBookRef[];
  /** 4–6 ready-to-use meeting-share prompts for this Step. */
  shareIdeas: string[];
}

export interface ReflectionQuestion {
  stepId: number;
  facet: Facet;
  index: number;
  question: string;
}

export interface JournalEntry {
  id: string;
  stepId: number;
  facet: Facet;
  questionIndex: number;
  content: string;
  updatedAt: string;
}

export interface ShareDraft {
  stepId: number;
  content: string;
  updatedAt: string;
}

export interface Concept {
  id: string;
  name: string;
  shortDefinition: string;
  longDefinition: string;
  relatedSteps: number[];
}

export type ConnectionKind =
  | "surrender" // 1→2→3
  | "house" // 4→5→6→7→8→9
  | "maintenance" // 10·11·12
  | "feedback"; // 10→4, 11→3, 12→1

export interface StepConnection {
  from: number;
  to: number;
  kind: ConnectionKind;
  label: string;
}

export interface Tradition {
  id: number;
  text: string;
}

export interface Promise {
  id: number;
  title: string;
  /** Original paraphrase — never the copyrighted source text. */
  text: string;
}

// ============================================================================
// Exercise entry types (one family per Step workflow + shared daily library)
// ============================================================================

/** Step 1 — powerlessness incident. */
export interface PowerlessnessEntry {
  id: string;
  incident: string;
  lifeArea: string; // money / relationships / health / legal / mood / time
  promiseBroken: string;
  timestamp: string;
}

/** Step 1 — unmanageability across life domains (0–100 per domain). */
export interface UnmanageabilityEntry {
  id: string;
  domains: Record<string, number>; // domain -> 0..100
  note: string;
  timestamp: string;
}

/** Step 2 — higher-power sketch ("what it is / what it is NOT"). */
export interface HigherPowerSketch {
  id: string;
  isThings: string;
  isNotThings: string;
  timestamp: string;
}

/** Step 2 — evidence a Power may be at work + a belief reading 0–100. */
export interface BeliefPoint {
  id: string;
  evidence: string;
  belief: number; // 0..100
  timestamp: string;
}

/** Step 3 — something I'm gripping / a decision statement / a daily turn-over. */
export interface SurrenderItem {
  id: string;
  kind: "gripping" | "decision" | "checkin";
  content: string;
  timestamp: string;
}

/** Step 4 — resentment grid row. */
export type ResentmentAffects =
  | "self-esteem"
  | "security"
  | "ambition"
  | "relationships"
  | "pride"
  | "pocketbook";

export interface ResentmentEntry {
  id: string;
  who: string;
  cause: string;
  affects: ResentmentAffects[];
  myPart: string;
  timestamp: string;
}

/** Step 4 — fear inventory. */
export interface FearEntry {
  id: string;
  fear: string;
  why: string;
  cost: string;
  faithAction: string;
  timestamp: string;
}

/** Step 4 — gentle, optional conduct/relationships note. */
export interface ConductEntry {
  id: string;
  who: string;
  whatHappened: string;
  myPart: string;
  timestamp: string;
}

/** Step 4 / 8 — a harm I noticed (seeds the Step 8 list). */
export interface HarmEntry {
  id: string;
  who: string;
  harm: string;
  willingness: number; // 0..100 (used in Step 8)
  timestamp: string;
}

/** Step 5 — a session of sharing the inventory, with relief deltas. */
export interface FifthStepSession {
  id: string;
  sharedWith: string; // role only, no names needed: "sponsor", "clergy", "friend"
  checklist: string[]; // items the user marked ready to share
  weightBefore: number; // 0..100
  weightAfter: number; // 0..100
  note: string;
  timestamp: string;
}

/** Step 6 — readiness per defect. */
export interface ReadinessEntry {
  id: string;
  defect: string;
  readiness: number; // 0..100
  fearItProtects: string;
  practiceInstead: string;
  timestamp: string;
}

/** Step 7 — a shortcoming + humility reframe + daily check. */
export interface ShortcomingEntry {
  id: string;
  shortcoming: string;
  rightSizedView: string;
  askedToday: boolean;
  timestamp: string;
}

/** Step 9 — amends ledger card (kanban). */
export type AmendsType = "direct" | "living" | "indirect" | "none-yet";
export type AmendsStatus = "willing" | "planned" | "made";

export interface AmendsEntry {
  id: string;
  who: string;
  harm: string;
  type: AmendsType;
  wouldInjure: boolean;
  plan: string;
  status: AmendsStatus;
  madeOn?: string;
  timestamp: string;
}

/** Step 10 — nightly spot-check. */
export interface TenthStepEntry {
  id: string;
  resentful: boolean;
  selfish: boolean;
  dishonest: boolean;
  afraid: boolean;
  oweAmends: string;
  gratitude: string;
  mood: number; // 0..100
  timestamp: string;
}

/** Step 11 — conscious-contact session with before/after calm. */
export interface ConsciousContactEntry {
  id: string;
  intention: string;
  practice: "prayer" | "meditation" | "quiet-sit" | "walk";
  minutes: number;
  calmBefore: number; // 0..100
  calmAfter: number; // 0..100
  nightReview: string;
  timestamp: string;
}

/** Step 12 — service / carrying-the-message log. */
export interface ServiceLogEntry {
  id: string;
  action: string;
  principlePracticed: string;
  reflection: string;
  timestamp: string;
}

// ---- Shared daily library ----

export interface GratitudeEntry {
  id: string;
  items: string[];
  timestamp: string;
}

export interface HaltCheckIn {
  id: string;
  hungry: boolean;
  angry: boolean;
  lonely: boolean;
  tired: boolean;
  note: string;
  timestamp: string;
}

export interface TapeEntry {
  id: string;
  urge: string;
  firstDrink: string;
  thenWhat: string;
  insteadIWill: string;
  timestamp: string;
}

export interface PromiseProgress {
  id: number; // promise id
  firstNoticed: string; // ISO date
  note: string;
}

// ---- Calendar / meetings ----

export interface MeetingLog {
  id: string;
  date: string; // YYYY-MM-DD
  name: string;
  format: "in-person" | "online" | "phone";
  shared: boolean;
  note: string;
}

export interface StepDates {
  started?: string; // ISO date
  worked?: string; // ISO date
}
