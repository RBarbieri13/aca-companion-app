import type {
  JournalEntry,
  PowerlessnessEntry,
  UnmanageabilityEntry,
  HigherPowerSketch,
  BeliefPoint,
  SurrenderItem,
  ResentmentEntry,
  FearEntry,
  ConductEntry,
  HarmEntry,
  FifthStepSession,
  ReadinessEntry,
  ShortcomingEntry,
  AmendsEntry,
  TenthStepEntry,
  ConsciousContactEntry,
  ServiceLogEntry,
  PromiseProgress,
} from "@/lib/types";

/** The read-only data slice the selectors operate on (no actions). */
export interface AppStateSnapshot {
  journal: Record<string, JournalEntry>;
  powerlessness: PowerlessnessEntry[];
  unmanageability: UnmanageabilityEntry[];
  higherPowerSketches: HigherPowerSketch[];
  beliefPoints: BeliefPoint[];
  surrenderItems: SurrenderItem[];
  resentments: ResentmentEntry[];
  fears: FearEntry[];
  conduct: ConductEntry[];
  harms: HarmEntry[];
  fifthStepSessions: FifthStepSession[];
  readiness: ReadinessEntry[];
  shortcomings: ShortcomingEntry[];
  amends: AmendsEntry[];
  tenthSteps: TenthStepEntry[];
  consciousContact: ConsciousContactEntry[];
  serviceLog: ServiceLogEntry[];
  promiseProgress: PromiseProgress[];
}
