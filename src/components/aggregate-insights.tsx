"use client";

import Link from "next/link";
import { useAppStore } from "@/store/app-store";
import { Card } from "@/components/ui/card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { getStep } from "@/data/steps";
import {
  overallProgress,
  stepStatus,
  mostJournaledStep,
  tenthStepStreak,
  amendsCounts,
  promisesNoticed,
  consciousContactTrend,
} from "@/lib/selectors";
import { STEPS } from "@/data/steps";
import {
  TrendingUp,
  Flame,
  Heart,
  HandHeart,
  Sparkles,
  Footprints,
} from "lucide-react";

export function AggregateInsights() {
  const state = useAppStore();
  const overall = overallProgress(state);
  const inProgress = STEPS.filter((s) => stepStatus(state, s.id) === "in-progress").length;
  const deep = STEPS.filter((s) => stepStatus(state, s.id) === "deep").length;
  const untouched = STEPS.filter((s) => stepStatus(state, s.id) === "untouched").length;
  const mostJournaled = mostJournaledStep(state);
  const streak = tenthStepStreak(state);
  const amends = amendsCounts(state);
  const promises = promisesNoticed(state);
  const ccTrend = consciousContactTrend(state);
  const current = getStep(state.currentStepId);

  return (
    <div className="space-y-4">
      <Card className="p-6 text-center">
        <div className="flex justify-center mb-3">
          <ProgressRing value={overall} label={`${overall}%`} sublabel="overall" size={130} />
        </div>
        <p className="text-sm text-[var(--muted-foreground)]">
          Across all twelve Steps — {deep} deep, {inProgress} in progress, {untouched} untouched.
        </p>
      </Card>

      {current && (
        <Link href={`/steps/${current.id}`}>
          <Card className="p-4 hover:bg-[var(--muted)]/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-serif font-semibold">
                {current.id}
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">
                  Current Step
                </div>
                <div className="font-serif text-base font-semibold truncate">
                  {current.shortName}
                </div>
              </div>
            </div>
          </Card>
        </Link>
      )}

      <div className="grid grid-cols-2 gap-3">
        <InsightStat
          icon={<Footprints className="h-4 w-4" strokeWidth={1.75} />}
          value={mostJournaled ? `Step ${mostJournaled}` : "—"}
          label="Most journaled"
          href={mostJournaled ? `/steps/${mostJournaled}` : "/steps"}
        />
        <InsightStat
          icon={<Heart className="h-4 w-4" strokeWidth={1.75} />}
          value={`${state.resentments.length}`}
          label="Resentments logged"
          href="/exercises?step=4"
        />
        <InsightStat
          icon={<HandHeart className="h-4 w-4" strokeWidth={1.75} />}
          value={`${amends.made}/${amends.total || 0}`}
          label="Amends made"
          href="/exercises?step=9"
        />
        <InsightStat
          icon={<Flame className="h-4 w-4" strokeWidth={1.75} />}
          value={`${streak}d`}
          label="10th-step streak"
          href="/exercises?step=10"
        />
        <InsightStat
          icon={<TrendingUp className="h-4 w-4" strokeWidth={1.75} />}
          value={ccTrend > 0 ? `+${ccTrend}` : `${ccTrend}`}
          label="Calm gain (Step 11)"
          href="/exercises?step=11"
        />
        <InsightStat
          icon={<Sparkles className="h-4 w-4" strokeWidth={1.75} />}
          value={`${promises}/9`}
          label="Promises noticed"
          href="/concepts#promises"
        />
      </div>
    </div>
  );
}

function InsightStat({
  icon,
  value,
  label,
  href,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="p-3 h-full hover:bg-[var(--muted)]/30 transition-colors">
        <div className="flex items-center gap-1.5 text-[var(--accent)] mb-1">{icon}</div>
        <div className="font-serif text-xl font-semibold leading-none">{value}</div>
        <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-1">
          {label}
        </div>
      </Card>
    </Link>
  );
}
