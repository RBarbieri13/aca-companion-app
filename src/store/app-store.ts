"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  JournalEntry,
  FeelingLog,
  TriggerLog,
  InnerChildEntry,
  IdentityEntry,
  IdentityCategory,
  SanctuaryCheckIn,
  SoberListeningEntry,
  BondingInventoryEntry,
  SafePersonCriterion,
  SafePersonCheck,
  SafeFlagKind,
  SeatCheckEntry,
  SoloSitEntry,
  Quadrant,
} from "@/lib/types";

interface AttendanceRecord {
  attended: boolean;
  notes: string;
}

interface AppState {
  journal: Record<string, JournalEntry>;
  feelings: FeelingLog[];
  triggers: TriggerLog[];
  innerChild: InnerChildEntry[];
  identity: IdentityEntry[];
  sanctuaryCheckIns: SanctuaryCheckIn[];
  soberListening: SoberListeningEntry[];
  bondingInventory: BondingInventoryEntry[];
  safePersonCriteria: SafePersonCriterion[];
  safePersonChecks: SafePersonCheck[];
  seatChecks: SeatCheckEntry[];
  soloSits: SoloSitEntry[];
  attendance: Record<string, AttendanceRecord>;
  favoriteAffirmations: string[];

  // Actions
  upsertJournal: (entry: {
    traitId: number;
    quadrant: Quadrant;
    questionIndex: number;
    content: string;
    tags?: string[];
    intensity?: number;
  }) => void;
  getJournalEntry: (
    traitId: number,
    quadrant: Quadrant,
    questionIndex: number
  ) => JournalEntry | undefined;
  logFeeling: (feeling: string, category: string, note: string) => void;
  logTrigger: (log: Omit<TriggerLog, "id" | "timestamp">) => void;
  upsertInnerChild: (entry: { id?: string; adultVoice: string; childVoice: string }) => void;
  deleteInnerChild: (id: string) => void;
  addIdentityEntry: (category: IdentityCategory, content: string) => void;
  updateIdentityEntry: (id: string, content: string) => void;
  deleteIdentityEntry: (id: string) => void;
  logSanctuaryCheckIn: (weekOf: string, value: number, note: string) => void;
  deleteSanctuaryCheckIn: (id: string) => void;
  logSoberListening: (entry: Omit<SoberListeningEntry, "id" | "timestamp">) => void;
  deleteSoberListening: (id: string) => void;
  logBondingEntry: (entry: Omit<BondingInventoryEntry, "id" | "timestamp">) => void;
  deleteBondingEntry: (id: string) => void;
  addSafeCriterion: (text: string, kind: SafeFlagKind) => void;
  deleteSafeCriterion: (id: string) => void;
  logSafeCheck: (entry: Omit<SafePersonCheck, "id" | "timestamp">) => void;
  deleteSafeCheck: (id: string) => void;
  logSeatCheck: (entry: Omit<SeatCheckEntry, "id" | "timestamp">) => void;
  deleteSeatCheck: (id: string) => void;
  logSoloSit: (entry: Omit<SoloSitEntry, "id" | "timestamp">) => void;
  deleteSoloSit: (id: string) => void;
  setAttendance: (date: string, attended: boolean) => void;
  setAttendanceNotes: (date: string, notes: string) => void;
  toggleFavoriteAffirmation: (text: string) => void;
}

function makeKey(traitId: number, quadrant: Quadrant, qi: number) {
  return `${traitId}::${quadrant}::${qi}`;
}

function nowId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      journal: {},
      feelings: [],
      triggers: [],
      innerChild: [],
      identity: [],
      sanctuaryCheckIns: [],
      soberListening: [],
      bondingInventory: [],
      safePersonCriteria: [],
      safePersonChecks: [],
      seatChecks: [],
      soloSits: [],
      attendance: {},
      favoriteAffirmations: [],

      upsertJournal: ({ traitId, quadrant, questionIndex, content, tags, intensity }) => {
        const key = makeKey(traitId, quadrant, questionIndex);
        const existing = get().journal[key];
        const entry: JournalEntry = {
          id: existing?.id ?? nowId(),
          traitId,
          quadrant,
          questionIndex,
          content,
          tags: tags ?? existing?.tags ?? [],
          intensity: intensity ?? existing?.intensity,
          updatedAt: new Date().toISOString(),
        };
        set({ journal: { ...get().journal, [key]: entry } });
      },

      getJournalEntry: (traitId, quadrant, questionIndex) => {
        return get().journal[makeKey(traitId, quadrant, questionIndex)];
      },

      logFeeling: (feeling, category, note) => {
        const log: FeelingLog = {
          id: nowId(),
          feeling,
          category,
          note,
          timestamp: new Date().toISOString(),
        };
        set({ feelings: [log, ...get().feelings] });
      },

      logTrigger: (log) => {
        const entry: TriggerLog = {
          ...log,
          id: nowId(),
          timestamp: new Date().toISOString(),
        };
        set({ triggers: [entry, ...get().triggers] });
      },

      upsertInnerChild: ({ id, adultVoice, childVoice }) => {
        const existing = id ? get().innerChild.find((e) => e.id === id) : undefined;
        if (existing) {
          set({
            innerChild: get().innerChild.map((e) =>
              e.id === id
                ? { ...e, adultVoice, childVoice, updatedAt: new Date().toISOString() }
                : e
            ),
          });
        } else {
          const entry: InnerChildEntry = {
            id: nowId(),
            adultVoice,
            childVoice,
            updatedAt: new Date().toISOString(),
          };
          set({ innerChild: [entry, ...get().innerChild] });
        }
      },

      deleteInnerChild: (id) => {
        set({ innerChild: get().innerChild.filter((e) => e.id !== id) });
      },

      addIdentityEntry: (category, content) => {
        if (!content.trim()) return;
        const now = new Date().toISOString();
        const entry: IdentityEntry = {
          id: nowId(),
          category,
          content,
          createdAt: now,
          updatedAt: now,
        };
        set({ identity: [entry, ...get().identity] });
      },

      updateIdentityEntry: (id, content) => {
        set({
          identity: get().identity.map((e) =>
            e.id === id
              ? { ...e, content, updatedAt: new Date().toISOString() }
              : e
          ),
        });
      },

      deleteIdentityEntry: (id) => {
        set({ identity: get().identity.filter((e) => e.id !== id) });
      },

      logSanctuaryCheckIn: (weekOf, value, note) => {
        // Replace any existing check-in for the same week.
        const others = get().sanctuaryCheckIns.filter((c) => c.weekOf !== weekOf);
        const entry: SanctuaryCheckIn = {
          id: nowId(),
          weekOf,
          value: Math.max(0, Math.min(100, value)),
          note,
          timestamp: new Date().toISOString(),
        };
        const sorted = [entry, ...others].sort((a, b) => b.weekOf.localeCompare(a.weekOf));
        set({ sanctuaryCheckIns: sorted });
      },

      deleteSanctuaryCheckIn: (id) => {
        set({ sanctuaryCheckIns: get().sanctuaryCheckIns.filter((c) => c.id !== id) });
      },

      logSoberListening: (entry) => {
        const log: SoberListeningEntry = {
          ...entry,
          id: nowId(),
          timestamp: new Date().toISOString(),
        };
        set({ soberListening: [log, ...get().soberListening] });
      },

      deleteSoberListening: (id) => {
        set({ soberListening: get().soberListening.filter((e) => e.id !== id) });
      },

      logBondingEntry: (entry) => {
        const log: BondingInventoryEntry = {
          ...entry,
          id: nowId(),
          timestamp: new Date().toISOString(),
        };
        set({ bondingInventory: [log, ...get().bondingInventory] });
      },

      deleteBondingEntry: (id) => {
        set({ bondingInventory: get().bondingInventory.filter((e) => e.id !== id) });
      },

      addSafeCriterion: (text, kind) => {
        const clean = text.trim();
        if (!clean) return;
        // Avoid duplicates of the same text+kind.
        const exists = get().safePersonCriteria.some(
          (c) => c.kind === kind && c.text.toLowerCase() === clean.toLowerCase()
        );
        if (exists) return;
        const entry: SafePersonCriterion = { id: nowId(), text: clean, kind };
        set({ safePersonCriteria: [...get().safePersonCriteria, entry] });
      },

      deleteSafeCriterion: (id) => {
        set({ safePersonCriteria: get().safePersonCriteria.filter((c) => c.id !== id) });
      },

      logSafeCheck: (entry) => {
        const log: SafePersonCheck = {
          ...entry,
          id: nowId(),
          timestamp: new Date().toISOString(),
        };
        set({ safePersonChecks: [log, ...get().safePersonChecks] });
      },

      deleteSafeCheck: (id) => {
        set({ safePersonChecks: get().safePersonChecks.filter((c) => c.id !== id) });
      },

      logSeatCheck: (entry) => {
        const log: SeatCheckEntry = {
          ...entry,
          id: nowId(),
          timestamp: new Date().toISOString(),
        };
        set({ seatChecks: [log, ...get().seatChecks] });
      },

      deleteSeatCheck: (id) => {
        set({ seatChecks: get().seatChecks.filter((c) => c.id !== id) });
      },

      logSoloSit: (entry) => {
        const log: SoloSitEntry = {
          ...entry,
          id: nowId(),
          timestamp: new Date().toISOString(),
        };
        set({ soloSits: [log, ...get().soloSits] });
      },

      deleteSoloSit: (id) => {
        set({ soloSits: get().soloSits.filter((c) => c.id !== id) });
      },

      setAttendance: (date, attended) => {
        const existing = get().attendance[date] ?? { attended: false, notes: "" };
        set({ attendance: { ...get().attendance, [date]: { ...existing, attended } } });
      },

      setAttendanceNotes: (date, notes) => {
        const existing = get().attendance[date] ?? { attended: false, notes: "" };
        set({ attendance: { ...get().attendance, [date]: { ...existing, notes } } });
      },

      toggleFavoriteAffirmation: (text) => {
        const current = get().favoriteAffirmations;
        const next = current.includes(text)
          ? current.filter((t) => t !== text)
          : [...current, text];
        set({ favoriteAffirmations: next });
      },
    }),
    {
      name: "aca-companion-store",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : (undefined as unknown as Storage))),
      version: 1,
    }
  )
);
