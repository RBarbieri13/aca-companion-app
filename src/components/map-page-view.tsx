"use client";

import { StepMap } from "@/components/step-map";
import { AggregateInsights } from "@/components/aggregate-insights";

export function MapPageView() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-2">The Step Map</h1>
        <p className="text-[var(--muted-foreground)] max-w-2xl">
          The whole journey at a glance — surrender, housecleaning, maintenance — and how each Step
          feeds the next. Node size and ring show your own progress. The panel updates live from your
          work.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <StepMap />
        </div>
        <div>
          <h2 className="font-serif text-xl font-semibold mb-4">Aggregate insights</h2>
          <AggregateInsights />
        </div>
      </div>
    </div>
  );
}
