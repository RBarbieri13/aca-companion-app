"use client";

import Link from "next/link";
import { useAppStore } from "@/store/app-store";
import { Card } from "@/components/ui/card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Activity } from "lucide-react";
import { answeredCount, exerciseCount, stepProgress } from "@/lib/selectors";
import { questionsForStep } from "@/data/questions";
import { formatDate } from "@/lib/utils";
import type { Step } from "@/lib/types";

function useExerciseSummary(stepId: number): string {
  const s = useAppStore();
  switch (stepId) {
    case 1:
      return `${s.powerlessness.length} powerlessness moment${s.powerlessness.length === 1 ? "" : "s"}, ${s.unmanageability.length} unmanageability map${s.unmanageability.length === 1 ? "" : "s"} logged`;
    case 2:
      return `${s.higherPowerSketches.length} Higher-Power sketch${s.higherPowerSketches.length === 1 ? "" : "es"}, ${s.beliefPoints.length} evidence note${s.beliefPoints.length === 1 ? "" : "s"}`;
    case 3:
      return `${s.surrenderItems.length} surrender entr${s.surrenderItems.length === 1 ? "y" : "ies"} logged`;
    case 4: {
      const counts: Record<string, number> = {};
      for (const r of s.resentments) for (const a of r.affects) counts[a] = (counts[a] ?? 0) + 1;
      const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
      return `${s.resentments.length} resentment${s.resentments.length === 1 ? "" : "s"}${top ? `, top category: ${top[0]}` : ""}; ${s.fears.length} fear${s.fears.length === 1 ? "" : "s"}`;
    }
    case 5:
      return `${s.fifthStepSessions.length} sharing session${s.fifthStepSessions.length === 1 ? "" : "s"} recorded`;
    case 6:
      return `${s.readiness.length} defect${s.readiness.length === 1 ? "" : "s"} on the readiness strip`;
    case 7:
      return `${s.shortcomings.length} shortcoming${s.shortcomings.length === 1 ? "" : "s"} named`;
    case 8: {
      const willing = s.harms.filter((h) => h.willingness >= 60).length;
      return `${s.harms.length} on the list, ${willing} you're willing to make right`;
    }
    case 9: {
      const made = s.amends.filter((a) => a.status === "made").length;
      return `${made} made · ${s.amends.filter((a) => a.status === "planned").length} planned · ${s.amends.filter((a) => a.status === "willing").length} willing`;
    }
    case 10:
      return `${s.tenthSteps.length} nightly inventor${s.tenthSteps.length === 1 ? "y" : "ies"} logged`;
    case 11:
      return `${s.consciousContact.length} conscious-contact session${s.consciousContact.length === 1 ? "" : "s"}`;
    case 12:
      return `${s.serviceLog.length} act${s.serviceLog.length === 1 ? "" : "s"} of service logged`;
    default:
      return "";
  }
}

const RELATED_NUDGE: Record<number, { to: number; text: (n: number) => string; count: (s: ReturnType<typeof useAppStore.getState>) => number }> = {
  1: { to: 2, text: () => "Admitting powerlessness opens the door to Step 2 — coming to believe.", count: () => 0 },
  4: { to: 8, text: (n) => `Step 4 feeds Step 8 — you've noted ${n} harm${n === 1 ? "" : "s"} that seed your amends list.`, count: (s) => s.harms.length },
  8: { to: 9, text: (n) => `Your list has ${n} name${n === 1 ? "" : "s"} — Step 9 is where they become amends.`, count: (s) => s.harms.length },
  10: { to: 4, text: () => "Your daily inventory is Step 4, continued — the housecleaning never fully ends.", count: () => 0 },
};

export function StepInsights({ step }: { step: Step }) {
  const state = useAppStore();
  const progress = stepProgress(state, step.id);
  const answered = answeredCount(state, step.id);
  const total = questionsForStep(step.id).length;
  const exCount = exerciseCount(state, step.id);
  const summary = useExerciseSummary(step.id);
  const started = state.stepDates[step.id]?.started;
  const nudge = RELATED_NUDGE[step.id];

  const hasData = answered > 0 || exCount > 0;

  return (
    <section>
      <div className="flex items-center gap-2 mb-1">
        <Activity className="h-5 w-5 text-[var(--primary)]" strokeWidth={1.75} />
        <h2 className="font-serif text-2xl font-semibold">Insights for this Step</h2>
      </div>
      <p className="text-sm text-[var(--muted-foreground)] mb-5 max-w-2xl">
        A private snapshot drawn from your own work on Step {step.id}.
      </p>

      <Card className="p-6">
        {!hasData ? (
          <div className="text-center py-6">
            <Sparkles className="h-8 w-8 mx-auto text-[var(--sage)] mb-3" strokeWidth={1.5} />
            <p className="text-[var(--muted-foreground)] max-w-md mx-auto">
              Nothing here yet — and that&apos;s fine. Answer a reflection question above or open the{" "}
              <Link href="/exercises" className="text-[var(--primary)] underline">
                Step {step.id} exercise
              </Link>{" "}
              to start building your private insights.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-[auto_1fr] items-center">
            <div className="flex justify-center">
              <ProgressRing value={progress} label={`${progress}%`} sublabel="worked" size={120} />
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">
                  Reflection
                </div>
                <p className="text-sm">
                  {answered} of {total} questions answered
                </p>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">
                  Exercise
                </div>
                <p className="text-sm">{summary}</p>
              </div>
              {started && (
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">
                    Started
                  </div>
                  <p className="text-sm">{formatDate(started, "long")}</p>
                </div>
              )}
              {nudge && (
                <div className="rounded-lg bg-[var(--sage)]/10 border border-[var(--sage)]/30 p-3">
                  <p className="text-sm text-[var(--foreground)]/85 mb-2">
                    {nudge.text(nudge.count(state))}
                  </p>
                  <Link href={`/steps/${nudge.to}`}>
                    <Button variant="subtle" size="sm">
                      Go to Step {nudge.to}
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </section>
  );
}
