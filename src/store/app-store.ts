"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  JournalEntry,
  FeelingLog,
  TriggerLog,
  InnerChildEntry,
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
