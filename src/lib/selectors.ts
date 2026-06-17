import { QUESTIONS } from "@/data/questions";
import { STEPS } from "@/data/steps";
import type { AppStateSnapshot } from "@/lib/store-types";

// How many reflection questions each Step has.
const QUESTION_COUNTS: Record<number, number> = STEPS.reduce((acc, s) => {
  acc[s.id] = QUESTIONS.filter((q) => q.stepId === s.id).length;
  return acc;
}, {} as Record<number, number>);

/** Count of answered (non-empty) reflection questions for a Step. */
export function answeredCount(state: AppStateSnapshot, stepId: number): number {
  return Object.values(state.journal).filter(
    (j) => j.stepId === stepId && j.content.trim().length > 0
  ).length;
}

/** Count of exercise entries logged that belong to a given Step. */
export function exerciseCount(state: AppStateSnapshot, stepId: number): number {
  switch (stepId) {
    case 1:
      return state.powerlessness.length + state.unmanageability.length;
    case 2:
      return state.higherPowerSketches.length + state.beliefPoints.length;
    case 3:
      return state.surrenderItems.length;
    case 4:
      return (
        state.resentments.length +
        state.fears.length +
        state.conduct.length +
        state.harms.length
      );
    case 5:
      return state.fifthStepSessions.length;
    case 6:
      return state.readiness.length;
    case 7:
      return state.shortcomings.length;
    case 8:
      return state.harms.filter((h) => h.willingness > 0).length;
    case 9:
      return state.amends.length;
    case 10:
      return state.tenthSteps.length;
    case 11:
      return state.consciousContact.length;
    case 12:
      return state.serviceLog.length;
    default:
      return 0;
  }
}

/**
 * Step progress 0–100. Weighted: 70% from reflection questions answered,
 * 30% from "has the user started the exercise" (capped so a little activity counts).
 */
export function stepProgress(state: AppStateSnapshot, stepId: number): number {
  const total = QUESTION_COUNTS[stepId] ?? 1;
  const answered = answeredCount(state, stepId);
  const questionPart = Math.min(1, answered / total) * 70;
  const ex = exerciseCount(state, stepId);
  const exercisePart = Math.min(1, ex / 3) * 30; // 3+ entries = full exercise credit
  return Math.round(questionPart + exercisePart);
}

export function overallProgress(state: AppStateSnapshot): number {
  const sum = STEPS.reduce((acc, s) => acc + stepProgress(state, s.id), 0);
  return Math.round(sum / STEPS.length);
}

export function stepStatus(
  state: AppStateSnapshot,
  stepId: number
): "untouched" | "in-progress" | "deep" {
  const p = stepProgress(state, stepId);
  if (p <= 0) return "untouched";
  if (p >= 80) return "deep";
  return "in-progress";
}

export function mostJournaledStep(state: AppStateSnapshot): number | null {
  let best: number | null = null;
  let bestCount = 0;
  for (const s of STEPS) {
    const c = answeredCount(state, s.id);
    if (c > bestCount) {
      bestCount = c;
      best = s.id;
    }
  }
  return best;
}

/** Tenth-step streak: consecutive days ending today (or yesterday) with a 10th-step entry. */
export function tenthStepStreak(state: AppStateSnapshot): number {
  if (state.tenthSteps.length === 0) return 0;
  const days = new Set(
    state.tenthSteps.map((e) => new Date(e.timestamp).toDateString())
  );
  let streak = 0;
  const cursor = new Date();
  // Allow the streak to "start" today or yesterday.
  if (!days.has(cursor.toDateString())) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(cursor.toDateString())) return 0;
  }
  while (days.has(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function amendsCounts(state: AppStateSnapshot) {
  const made = state.amends.filter((a) => a.status === "made").length;
  const planned = state.amends.filter((a) => a.status === "planned").length;
  const willing = state.amends.filter((a) => a.status === "willing").length;
  return { made, planned, willing, total: state.amends.length };
}

export function resentmentsByCategory(state: AppStateSnapshot): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const r of state.resentments) {
    for (const a of r.affects) counts[a] = (counts[a] ?? 0) + 1;
  }
  return counts;
}

export function promisesNoticed(state: AppStateSnapshot): number {
  return state.promiseProgress.length;
}

/** Average calm delta from conscious-contact sessions, 0 if none. */
export function consciousContactTrend(state: AppStateSnapshot): number {
  if (state.consciousContact.length === 0) return 0;
  const deltas = state.consciousContact.map((c) => c.calmAfter - c.calmBefore);
  return Math.round(deltas.reduce((a, b) => a + b, 0) / deltas.length);
}
