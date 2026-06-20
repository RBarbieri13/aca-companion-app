"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { STEP_EXERCISES } from "@/components/exercises/registry";
import {
  GratitudeList,
  HaltCheckInTool,
  TapeForward,
  PromisesTracker,
  AffirmationCard,
} from "@/components/exercises/shared";
import { STEPS, PHASE_META } from "@/data/steps";

const SHARED = [
  { id: "affirmation", label: "Daily Reflection", Component: AffirmationCard },
  { id: "gratitude", label: "Gratitude List", Component: GratitudeList },
  { id: "halt", label: "HALT Check-in", Component: HaltCheckInTool },
  { id: "tape", label: "Play the Tape Forward", Component: TapeForward },
  { id: "promises", label: "Promises Tracker", Component: PromisesTracker },
];

export function ExercisesView() {
  const params = useSearchParams();
  const initialStep = Number(params.get("step")) || 1;
  const [stepId, setStepId] = useState(Math.min(12, Math.max(1, initialStep)));

  useEffect(() => {
    const p = Number(params.get("step"));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (p >= 1 && p <= 12) setStepId(p);
  }, [params]);

  const exercise = STEP_EXERCISES[stepId];
  const step = STEPS.find((s) => s.id === stepId)!;
  const ExerciseComponent = exercise.Component;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-2">Exercises</h1>
        <p className="text-[var(--muted-foreground)] max-w-2xl">
          A dedicated, multi-segment workflow for every Step, plus a shared daily library you can
          use anytime. Everything saves privately to this device.
        </p>
      </div>

      <Tabs defaultValue="step">
        <TabsList className="mb-8">
          <TabsTrigger value="step">Step exercises</TabsTrigger>
          <TabsTrigger value="daily">Daily library</TabsTrigger>
        </TabsList>

        <TabsContent value="step">
          {/* Step picker */}
          <div className="flex flex-wrap gap-2 mb-6">
            {STEPS.map((s) => (
              <button
                key={s.id}
                onClick={() => setStepId(s.id)}
                className={
                  "flex h-10 w-10 items-center justify-center rounded-lg font-serif text-sm font-semibold transition-colors " +
                  (s.id === stepId
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                    : "bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted)]/70")
                }
                aria-label={`Step ${s.id} exercise`}
              >
                {s.id}
              </button>
            ))}
          </div>

          <Card className="p-5 md:p-6 mb-6 bg-[var(--muted)]/30">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="default">Step {step.id}</Badge>
              <Badge variant="sage">{step.principle}</Badge>
              <Badge variant="muted">{PHASE_META[step.phase].label}</Badge>
            </div>
            <h2 className="font-serif text-2xl font-semibold mb-1">{exercise.title}</h2>
            <p className="text-sm text-[var(--foreground)]/80 max-w-2xl">
              <span className="text-[var(--muted-foreground)]">Why this practice for Step {step.id}: </span>
              {exercise.why}
            </p>
          </Card>

          <ExerciseComponent />
        </TabsContent>

        <TabsContent value="daily">
          <div className="space-y-8">
            {SHARED.map(({ id, label, Component }) => (
              <section key={id}>
                <h2 className="font-serif text-xl font-semibold mb-3">{label}</h2>
                <Component />
              </section>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
