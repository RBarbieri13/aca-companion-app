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

export interface Concept {
  id: string;
  name: string;
  shortDefinition: string;
  longDefinition: string;
  relatedTraits: number[];
}
