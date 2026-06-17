"use client";

import Link from "next/link";
import { useAppStore } from "@/store/app-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/ui/progress-ring";
import { StepMap } from "@/components/step-map";
import { ThreePhasesBanner, PrinciplesRing } from "@/components/infographics/shared";
import { STEPS, PHASE_META } from "@/data/steps";
import { stepProgress } from "@/lib/selectors";

export function StepsHub() {
  const state = useAppStore();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-2">The Twelve Steps</h1>
        <p className="text-[var(--muted-foreground)] max-w-2xl">
          All twelve are fully authored and open from day one — read, study from four angles,
          journal, and work each one at your own pace. Start anywhere.
        </p>
      </div>

      <Card className="p-4 md:p-6 mb-8">
        <ThreePhasesBanner className="w-full h-auto" />
      </Card>

      <section className="mb-10">
        <h2 className="font-serif text-2xl font-semibold mb-1">The Step Map</h2>
        <p className="text-sm text-[var(--muted-foreground)] mb-4 max-w-2xl">
          How the Steps connect — surrender, housecleaning, maintenance — with your own progress
          sizing each node. Tap a Step to drill in.
        </p>
        <StepMap />
      </section>

      <section className="mb-10">
        <h2 className="font-serif text-2xl font-semibold mb-4">Every Step</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step) => {
            const progress = stepProgress(state, step.id);
            const phase = PHASE_META[step.phase];
            return (
              <Link key={step.id} href={`/steps/${step.id}`}>
                <Card className="p-5 h-full hover:shadow-md hover:border-[var(--primary)]/30 transition-all">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-serif text-lg font-semibold">
                      {step.id}
                    </div>
                    <ProgressRing value={progress} size={44} strokeWidth={5} color={phase.color} />
                  </div>
                  <h3 className="font-serif text-lg font-semibold leading-tight mb-1">
                    {step.shortName}
                  </h3>
                  <p className="text-sm text-[var(--foreground)]/75 leading-snug mb-3 line-clamp-2">
                    {step.essence.step}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="sage">{step.principle}</Badge>
                    <Badge variant="muted">{phase.label}</Badge>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold mb-1">The spiritual principles</h2>
        <p className="text-sm text-[var(--muted-foreground)] mb-4 max-w-2xl">
          Each Step is anchored in a virtue — the principle you practice as you work it.
        </p>
        <Card className="p-4 md:p-8 flex justify-center">
          <PrinciplesRing className="w-full max-w-[560px] h-auto" />
        </Card>
      </section>
    </div>
  );
}
