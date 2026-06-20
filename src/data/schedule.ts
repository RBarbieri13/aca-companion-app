import type { Session } from "@/lib/types";

export const SCHEDULE: Session[] = [
  { date: "2026-04-11", traitId: 1, quadrant: "mainList", type: "session" },
  { date: "2026-04-18", traitId: 1, quadrant: "flipSide", type: "session" },
  { date: "2026-04-25", traitId: 2, quadrant: "mainList", type: "session" },
  { date: "2026-05-02", traitId: 2, quadrant: "flipSide", type: "session" },
  { date: "2026-05-09", traitId: 3, quadrant: "mainList", type: "session" },
  { date: "2026-05-16", traitId: 3, quadrant: "flipSide", type: "session" },
  { date: "2026-05-23", traitId: null, quadrant: null, type: "break", label: "Memorial Day Weekend" },
  { date: "2026-05-30", traitId: 4, quadrant: "mainList", type: "session" },
  { date: "2026-06-06", traitId: 4, quadrant: "flipSide", type: "session" },
  { date: "2026-06-13", traitId: 5, quadrant: "mainList", type: "session" },
  { date: "2026-06-20", traitId: 5, quadrant: "flipSide", type: "session" },
  { date: "2026-06-27", traitId: 6, quadrant: "mainList", type: "session" },
  { date: "2026-07-04", traitId: null, quadrant: null, type: "break", label: "Independence Day" },
  { date: "2026-07-11", traitId: 6, quadrant: "flipSide", type: "session" },
  { date: "2026-07-18", traitId: 7, quadrant: "mainList", type: "session" },
  { date: "2026-07-25", traitId: 7, quadrant: "flipSide", type: "session" },
  { date: "2026-08-01", traitId: 8, quadrant: "mainList", type: "session" },
  { date: "2026-08-08", traitId: 8, quadrant: "flipSide", type: "session" },
  { date: "2026-08-15", traitId: 9, quadrant: "mainList", type: "session" },
  { date: "2026-08-22", traitId: 9, quadrant: "flipSide", type: "session" },
  { date: "2026-08-29", traitId: 10, quadrant: "mainList", type: "session" },
  { date: "2026-09-05", traitId: null, quadrant: null, type: "break", label: "Labor Day Weekend" },
  { date: "2026-09-12", traitId: 10, quadrant: "flipSide", type: "session" },
  { date: "2026-09-19", traitId: 11, quadrant: "mainList", type: "session" },
  { date: "2026-09-26", traitId: 11, quadrant: "flipSide", type: "session" },
  { date: "2026-10-03", traitId: 12, quadrant: "mainList", type: "session" },
  { date: "2026-10-10", traitId: 12, quadrant: "flipSide", type: "session" },
  { date: "2026-10-17", traitId: 13, quadrant: "mainList", type: "session" },
  { date: "2026-10-24", traitId: 13, quadrant: "flipSide", type: "session" },
  { date: "2026-10-31", traitId: 14, quadrant: "mainList", type: "session" },
  { date: "2026-11-07", traitId: 14, quadrant: "flipSide", type: "session" },
  { date: "2026-11-14", traitId: null, quadrant: null, type: "wrapup", label: "Final Wrapup" },
];

/**
 * Format a Date as a local "YYYY-MM-DD" string, matching the schedule's format.
 * Avoids toISOString() which can shift the day forward in the evening (UTC offset).
 */
function localDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function getCurrentSession(today: Date = new Date()): Session | null {
  const sorted = [...SCHEDULE].sort((a, b) => a.date.localeCompare(b.date));
  const todayStr = localDateString(today);

  const past = sorted.filter((s) => s.date <= todayStr);
  const future = sorted.filter((s) => s.date > todayStr);

  if (past.length > 0) {
    const mostRecent = past[past.length - 1];
    // Parse the schedule date as local midnight so daysSince is a clean day count.
    const [y, m, d] = mostRecent.date.split("-").map(Number);
    const mostRecentDate = new Date(y, m - 1, d);
    const daysSince = Math.floor(
      (today.getTime() - mostRecentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSince <= 6) return mostRecent;
  }

  return future[0] ?? sorted[0];
}

export function getNextSession(today: Date = new Date()): Session | null {
  const todayStr = localDateString(today);
  // "Next" means strictly after today. Also skip breaks so the countdown reflects
  // the actual next meeting the group will hold.
  const future = SCHEDULE.filter((s) => s.date > todayStr && s.type !== "break");
  return future[0] ?? null;
}

/**
 * The trait the group is currently on.
 *
 * Rule: a trait is "current" through its Flip Side meeting date. The day AFTER
 * the Flip Side meeting, the next trait becomes current. Breaks and wrapup
 * carry the previous current trait forward.
 *
 * Before the group has started (before Apr 11, 2026), defaults to Trait 1.
 */
export function getCurrentTraitId(today: Date = new Date()): number {
  const todayStr = localDateString(today);
  const sessions = SCHEDULE.filter((s) => s.type === "session" && s.traitId !== null);

  const firstSession = sessions[0];
  if (firstSession && todayStr < firstSession.date) {
    return firstSession.traitId as number;
  }

  // Last meeting date per trait (the Flip Side).
  const byTrait = new Map<number, string>();
  for (const s of sessions) {
    if (s.traitId !== null) {
      const existing = byTrait.get(s.traitId);
      if (!existing || s.date > existing) byTrait.set(s.traitId, s.date);
    }
  }

  // Current = earliest trait whose Flip Side meeting is >= today.
  const traitIds = Array.from(byTrait.keys()).sort((a, b) => a - b);
  for (const traitId of traitIds) {
    const lastMeeting = byTrait.get(traitId)!;
    if (todayStr <= lastMeeting) return traitId;
  }

  return traitIds[traitIds.length - 1] ?? 1;
}
