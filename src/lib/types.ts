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

export interface Concept {
  id: string;
  name: string;
  shortDefinition: string;
  longDefinition: string;
  relatedTraits: number[];
}
