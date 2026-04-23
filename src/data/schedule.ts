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

export function getCurrentSession(today: Date = new Date()): Session | null {
  // Find the session happening this week (Sat-Fri) or the next upcoming
  const sorted = [...SCHEDULE].sort((a, b) => a.date.localeCompare(b.date));
  const todayStr = today.toISOString().slice(0, 10);

  // Find the session whose date is <= today but most recent
  const past = sorted.filter((s) => s.date <= todayStr);
  const future = sorted.filter((s) => s.date > todayStr);

  // If today is within 6 days after a session, it's still "this week"
  if (past.length > 0) {
    const mostRecent = past[past.length - 1];
    const daysSince = Math.floor(
      (today.getTime() - new Date(mostRecent.date).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    if (daysSince <= 6) return mostRecent;
  }

  return future[0] ?? sorted[0];
}

export function getNextSession(today: Date = new Date()): Session | null {
  const todayStr = today.toISOString().slice(0, 10);
  const future = SCHEDULE.filter((s) => s.date > todayStr);
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
  const todayStr = today.toISOString().slice(0, 10);
  const sessions = SCHEDULE.filter((s) => s.type === "session" && s.traitId !== null);

  // If we're before the first meeting, start on Trait 1
  const firstSession = sessions[0];
  if (firstSession && todayStr < firstSession.date) {
    return firstSession.traitId as number;
  }

  // Find each trait's last meeting (its Flip Side)
  const byTrait = new Map<number, string>(); // traitId -> last meeting date
  for (const s of sessions) {
    if (s.traitId !== null) {
      const existing = byTrait.get(s.traitId);
      if (!existing || s.date > existing) byTrait.set(s.traitId, s.date);
    }
  }

  // The current trait is the earliest trait whose Flip Side meeting is >= today.
  // (i.e., we haven't finished it yet)
  const traitIds = Array.from(byTrait.keys()).sort((a, b) => a - b);
  for (const traitId of traitIds) {
    const lastMeeting = byTrait.get(traitId)!;
    if (todayStr <= lastMeeting) return traitId;
  }

  // After all traits are done, stay on the last trait (Trait 14)
  return traitIds[traitIds.length - 1] ?? 1;
}
