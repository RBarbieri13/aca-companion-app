"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  Facet,
  JournalEntry,
  ShareDraft,
  StepDates,
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
  AmendsStatus,
  TenthStepEntry,
  ConsciousContactEntry,
  ServiceLogEntry,
  GratitudeEntry,
  HaltCheckIn,
  TapeEntry,
  PromiseProgress,
  MeetingLog,
} from "@/lib/types";

function nowId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function makeKey(stepId: number, facet: Facet, qi: number) {
  return `${stepId}::${facet}::${qi}`;
}

type WithoutMeta<T> = Omit<T, "id" | "timestamp">;

interface AppState {
  // Core study data
  journal: Record<string, JournalEntry>;
  shareDrafts: Record<number, ShareDraft>;
  currentStepId: number;
  stepDates: Record<number, StepDates>;

  // Recovery tracking
  sobrietyDate: string | null;
  favoriteAffirmations: string[];

  // Per-step exercise stores
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

  // Shared daily library
  gratitude: GratitudeEntry[];
  haltCheckIns: HaltCheckIn[];
  tapeEntries: TapeEntry[];
  promiseProgress: PromiseProgress[];

  // Calendar
  meetings: MeetingLog[];

  // ---- Actions ----
  upsertJournal: (e: { stepId: number; facet: Facet; questionIndex: number; content: string }) => void;
  getJournalEntry: (stepId: number, facet: Facet, qi: number) => JournalEntry | undefined;
  upsertShareDraft: (stepId: number, content: string) => void;
  getShareDraft: (stepId: number) => ShareDraft | undefined;
  setCurrentStep: (id: number) => void;
  setStepDate: (id: number, which: "started" | "worked", date: string) => void;

  setSobrietyDate: (date: string | null) => void;
  toggleFavoriteAffirmation: (text: string) => void;

  logPowerlessness: (e: WithoutMeta<PowerlessnessEntry>) => void;
  deletePowerlessness: (id: string) => void;
  logUnmanageability: (e: WithoutMeta<UnmanageabilityEntry>) => void;
  deleteUnmanageability: (id: string) => void;
  logHigherPowerSketch: (e: WithoutMeta<HigherPowerSketch>) => void;
  deleteHigherPowerSketch: (id: string) => void;
  logBeliefPoint: (e: WithoutMeta<BeliefPoint>) => void;
  deleteBeliefPoint: (id: string) => void;
  logSurrenderItem: (e: WithoutMeta<SurrenderItem>) => void;
  deleteSurrenderItem: (id: string) => void;
  logResentment: (e: WithoutMeta<ResentmentEntry>) => void;
  deleteResentment: (id: string) => void;
  logFear: (e: WithoutMeta<FearEntry>) => void;
  deleteFear: (id: string) => void;
  logConduct: (e: WithoutMeta<ConductEntry>) => void;
  deleteConduct: (id: string) => void;
  logHarm: (e: WithoutMeta<HarmEntry>) => void;
  updateHarm: (id: string, patch: Partial<HarmEntry>) => void;
  deleteHarm: (id: string) => void;
  logFifthStep: (e: WithoutMeta<FifthStepSession>) => void;
  deleteFifthStep: (id: string) => void;
  logReadiness: (e: WithoutMeta<ReadinessEntry>) => void;
  deleteReadiness: (id: string) => void;
  logShortcoming: (e: WithoutMeta<ShortcomingEntry>) => void;
  updateShortcoming: (id: string, patch: Partial<ShortcomingEntry>) => void;
  deleteShortcoming: (id: string) => void;
  logAmends: (e: WithoutMeta<AmendsEntry>) => void;
  updateAmends: (id: string, patch: Partial<AmendsEntry>) => void;
  setAmendsStatus: (id: string, status: AmendsStatus) => void;
  deleteAmends: (id: string) => void;
  logTenthStep: (e: WithoutMeta<TenthStepEntry>) => void;
  deleteTenthStep: (id: string) => void;
  logConsciousContact: (e: WithoutMeta<ConsciousContactEntry>) => void;
  deleteConsciousContact: (id: string) => void;
  logService: (e: WithoutMeta<ServiceLogEntry>) => void;
  deleteService: (id: string) => void;

  logGratitude: (items: string[]) => void;
  deleteGratitude: (id: string) => void;
  logHalt: (e: WithoutMeta<HaltCheckIn>) => void;
  deleteHalt: (id: string) => void;
  logTape: (e: WithoutMeta<TapeEntry>) => void;
  deleteTape: (id: string) => void;
  setPromiseProgress: (id: number, firstNoticed: string, note: string) => void;
  clearPromiseProgress: (id: number) => void;

  logMeeting: (e: Omit<MeetingLog, "id">) => void;
  deleteMeeting: (id: string) => void;
}

function listAdder<T extends { id: string; timestamp: string }>(
  set: (fn: (s: AppState) => Partial<AppState>) => void,
  key: keyof AppState
) {
  return (e: WithoutMeta<T>) =>
    set((s) => ({
      [key]: [{ ...(e as object), id: nowId(), timestamp: new Date().toISOString() } as T, ...(s[key] as T[])],
    }));
}

function listDeleter(
  set: (fn: (s: AppState) => Partial<AppState>) => void,
  key: keyof AppState
) {
  return (id: string) =>
    set((s) => ({ [key]: (s[key] as { id: string }[]).filter((x) => x.id !== id) }));
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      journal: {},
      shareDrafts: {},
      currentStepId: 1,
      stepDates: {},
      sobrietyDate: null,
      favoriteAffirmations: [],

      powerlessness: [],
      unmanageability: [],
      higherPowerSketches: [],
      beliefPoints: [],
      surrenderItems: [],
      resentments: [],
      fears: [],
      conduct: [],
      harms: [],
      fifthStepSessions: [],
      readiness: [],
      shortcomings: [],
      amends: [],
      tenthSteps: [],
      consciousContact: [],
      serviceLog: [],

      gratitude: [],
      haltCheckIns: [],
      tapeEntries: [],
      promiseProgress: [],

      meetings: [],

      upsertJournal: ({ stepId, facet, questionIndex, content }) => {
        const key = makeKey(stepId, facet, questionIndex);
        const existing = get().journal[key];
        const entry: JournalEntry = {
          id: existing?.id ?? nowId(),
          stepId,
          facet,
          questionIndex,
          content,
          updatedAt: new Date().toISOString(),
        };
        set({ journal: { ...get().journal, [key]: entry } });
      },
      getJournalEntry: (stepId, facet, qi) => get().journal[makeKey(stepId, facet, qi)],

      upsertShareDraft: (stepId, content) => {
        set({
          shareDrafts: {
            ...get().shareDrafts,
            [stepId]: { stepId, content, updatedAt: new Date().toISOString() },
          },
        });
      },
      getShareDraft: (stepId) => get().shareDrafts[stepId],

      setCurrentStep: (id) => set({ currentStepId: id }),
      setStepDate: (id, which, date) => {
        const existing = get().stepDates[id] ?? {};
        set({ stepDates: { ...get().stepDates, [id]: { ...existing, [which]: date } } });
      },

      setSobrietyDate: (date) => set({ sobrietyDate: date }),
      toggleFavoriteAffirmation: (text) => {
        const cur = get().favoriteAffirmations;
        set({
          favoriteAffirmations: cur.includes(text)
            ? cur.filter((t) => t !== text)
            : [...cur, text],
        });
      },

      logPowerlessness: listAdder<PowerlessnessEntry>(set, "powerlessness"),
      deletePowerlessness: listDeleter(set, "powerlessness"),
      logUnmanageability: listAdder<UnmanageabilityEntry>(set, "unmanageability"),
      deleteUnmanageability: listDeleter(set, "unmanageability"),
      logHigherPowerSketch: listAdder<HigherPowerSketch>(set, "higherPowerSketches"),
      deleteHigherPowerSketch: listDeleter(set, "higherPowerSketches"),
      logBeliefPoint: listAdder<BeliefPoint>(set, "beliefPoints"),
      deleteBeliefPoint: listDeleter(set, "beliefPoints"),
      logSurrenderItem: listAdder<SurrenderItem>(set, "surrenderItems"),
      deleteSurrenderItem: listDeleter(set, "surrenderItems"),
      logResentment: listAdder<ResentmentEntry>(set, "resentments"),
      deleteResentment: listDeleter(set, "resentments"),
      logFear: listAdder<FearEntry>(set, "fears"),
      deleteFear: listDeleter(set, "fears"),
      logConduct: listAdder<ConductEntry>(set, "conduct"),
      deleteConduct: listDeleter(set, "conduct"),
      logHarm: listAdder<HarmEntry>(set, "harms"),
      updateHarm: (id, patch) =>
        set((s) => ({ harms: s.harms.map((h) => (h.id === id ? { ...h, ...patch } : h)) })),
      deleteHarm: listDeleter(set, "harms"),
      logFifthStep: listAdder<FifthStepSession>(set, "fifthStepSessions"),
      deleteFifthStep: listDeleter(set, "fifthStepSessions"),
      logReadiness: listAdder<ReadinessEntry>(set, "readiness"),
      deleteReadiness: listDeleter(set, "readiness"),
      logShortcoming: listAdder<ShortcomingEntry>(set, "shortcomings"),
      updateShortcoming: (id, patch) =>
        set((s) => ({
          shortcomings: s.shortcomings.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        })),
      deleteShortcoming: listDeleter(set, "shortcomings"),
      logAmends: listAdder<AmendsEntry>(set, "amends"),
      updateAmends: (id, patch) =>
        set((s) => ({ amends: s.amends.map((a) => (a.id === id ? { ...a, ...patch } : a)) })),
      setAmendsStatus: (id, status) =>
        set((s) => ({
          amends: s.amends.map((a) =>
            a.id === id
              ? { ...a, status, madeOn: status === "made" ? new Date().toISOString() : a.madeOn }
              : a
          ),
        })),
      deleteAmends: listDeleter(set, "amends"),
      logTenthStep: listAdder<TenthStepEntry>(set, "tenthSteps"),
      deleteTenthStep: listDeleter(set, "tenthSteps"),
      logConsciousContact: listAdder<ConsciousContactEntry>(set, "consciousContact"),
      deleteConsciousContact: listDeleter(set, "consciousContact"),
      logService: listAdder<ServiceLogEntry>(set, "serviceLog"),
      deleteService: listDeleter(set, "serviceLog"),

      logGratitude: (items) =>
        set((s) => ({
          gratitude: [
            { id: nowId(), items: items.filter(Boolean), timestamp: new Date().toISOString() },
            ...s.gratitude,
          ],
        })),
      deleteGratitude: listDeleter(set, "gratitude"),
      logHalt: listAdder<HaltCheckIn>(set, "haltCheckIns"),
      deleteHalt: listDeleter(set, "haltCheckIns"),
      logTape: listAdder<TapeEntry>(set, "tapeEntries"),
      deleteTape: listDeleter(set, "tapeEntries"),
      setPromiseProgress: (id, firstNoticed, note) => {
        const others = get().promiseProgress.filter((p) => p.id !== id);
        set({ promiseProgress: [...others, { id, firstNoticed, note }] });
      },
      clearPromiseProgress: (id) =>
        set((s) => ({ promiseProgress: s.promiseProgress.filter((p) => p.id !== id) })),

      logMeeting: (e) => set((s) => ({ meetings: [{ ...e, id: nowId() }, ...s.meetings] })),
      deleteMeeting: listDeleter(set, "meetings"),
    }),
    {
      name: "twelve-steps-companion-store",
      version: 1,
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : (undefined as unknown as Storage)
      ),
    }
  )
);
