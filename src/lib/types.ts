export type Quadrant = "laundry" | "other" | "flipSide" | "flipSideOther";

export interface Trait {
  id: number;
  shortName: string;
  statements: Record<Quadrant, string>;
  active: boolean;
  mainListDate: string;
  flipSideDate: string;
}

export interface ReflectionQuestion {
  traitId: number;
  quadrant: Quadrant;
  index: number;
  question: string;
}

export interface JournalEntry {
  id: string;
  traitId: number;
  quadrant: Quadrant;
  questionIndex: number;
  content: string;
  tags: string[];
  intensity?: number;
  updatedAt: string;
}

export interface Session {
  date: string;
  traitId: number | null;
  quadrant: "mainList" | "flipSide" | null;
  type: "session" | "break" | "wrapup";
  label?: string;
  attended?: boolean;
  notes?: string;
}

export interface FeelingLog {
  id: string;
  feeling: string;
  category: string;
  note: string;
  timestamp: string;
}

export interface TriggerLog {
  id: string;
  event: string;
  traitId?: number;
  response: string;
  desiredResponse: string;
  timestamp: string;
}

export interface InnerChildEntry {
  id: string;
  adultVoice: string;
  childVoice: string;
  updatedAt: string;
}

export type IdentityCategory =
  | "values"
  | "strengths"
  | "enjoy"
  | "rolesVsSelf"
  | "knownInternally";

export interface IdentityEntry {
  id: string;
  category: IdentityCategory;
  content: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Trait 2 weekly check-in: when alone this week, was it more sanctuary or prison?
 * Slider: 0 = fully prison, 100 = fully sanctuary.
 */
export interface SanctuaryCheckIn {
  id: string;
  weekOf: string; // ISO date (the Sunday of the week)
  value: number; // 0-100
  note: string;
  timestamp: string;
}

/**
 * Trait 3 reflection log: receiving anger or criticism from True Self esteem.
 * Mirrors the workbook's "Thank you for sharing / If it doesn't apply, let it fly" flow.
 */
export interface SoberListeningEntry {
  id: string;
  source: string;          // Who said it / context
  criticism: string;       // What was said
  hadTruth: boolean | null; // null = haven't decided yet
  truthFound: string;      // What's true here that could benefit me
  responseTaken: string;   // What I did or plan to do
  selfWorth: number;       // 0-100 sober self-worth in the moment after
  timestamp: string;
}

/**
 * Trait 4 bonding-pattern inventory: an emotional inventory of how we bond, to reveal where
 * we recreate or recycle abandonment. Each entry is one relationship / job / group / event.
 */
export type BondingRole = "rescuer" | "victim" | "victimizer" | "avoider";
export type BondingEnding = "left-first" | "they-left" | "faded" | "ongoing";

export interface BondingInventoryEntry {
  id: string;
  who: string;              // who / what (person, job, group, event)
  role: BondingRole;        // the seat we played in the Game of Dissociation
  compulsion: string;       // compulsion present (alcoholic, workaholic, none, etc.)
  ending: BondingEnding;    // how it ended
  recreatedAbandonment: boolean; // did this recreate the old wound?
  note: string;
  timestamp: string;
}

/**
 * Trait 4 "safe person" work: building a personal, conscious definition of what makes a
 * person safe vs. unsafe (Flip Side Q4), then optionally checking a specific person against it.
 */
export type SafeFlagKind = "green" | "red";

export interface SafePersonCriterion {
  id: string;
  text: string;
  kind: SafeFlagKind;
}

export interface SafePersonCheck {
  id: string;
  who: string;
  greens: string[]; // text snapshots of green flags present
  reds: string[];   // text snapshots of red flags present
  note: string;
  timestamp: string;
}

/**
 * Trait 5 power-seat check: in a given situation, which seat of the Game did I take?
 * Mirrors the four roles named in the workbook + the recovery seat (humble participant).
 */
export type GameSeat = "victim" | "victimizer" | "rescuer-1" | "rescuer-2" | "humble";

export interface SeatCheckEntry {
  id: string;
  situation: string;
  seat: GameSeat;
  fearUnderneath: string;
  desiredResponse: string;
  timestamp: string;
}

/**
 * Trait 5 solo-sit tracker: a session of intentional quiet, to build the capacity to be
 * alone in silence with nothing happening. Slider values: 0 = restless, 100 = settled.
 */
export interface SoloSitEntry {
  id: string;
  durationMinutes: number;
  beforeState: number; // 0-100
  afterState: number;  // 0-100
  hadActivity: boolean; // false = pure quiet; true = activity (music, walk, etc.)
  note: string;
  timestamp: string;
}

/**
 * Trait 5 self-talk library: each entry captures a victim-viewpoint phrase (the kind that
 * swirls in the head) and an empowered, whole/complete rewrite.
 */
export interface SelfTalkRewrite {
  id: string;
  victimPhrase: string;
  empoweredRewrite: string;
  context: string; // optional — where it shows up
  isFavorite: boolean;
  timestamp: string;
}

export interface Concept {
  id: string;
  name: string;
  shortDefinition: string;
  longDefinition: string;
  relatedTraits: number[];
}
