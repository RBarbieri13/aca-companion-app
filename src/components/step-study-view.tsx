"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReflectionCard } from "@/components/reflection-card";
import { ConceptsAccordion } from "@/components/concepts-accordion";
import { StepInsights } from "@/components/step-insights";
import { MeetingShare } from "@/components/meeting-share";
import { BigBookRefs } from "@/components/big-book-refs";
import { StepDateControls } from "@/components/step-date-controls";
import { STEP_GRAPHICS } from "@/components/infographics/registry";
import { FACET_LABELS, PHASE_META } from "@/data/steps";
import { questionsForStep } from "@/data/questions";
import type { Step, Facet } from "@/lib/types";

const FACET_ORDER: Facet[] = ["step", "principle", "working", "promise"];

export function StepStudyView({ step }: { step: Step }) {
  const questions = questionsForStep(step.id);
  const phase = PHASE_META[step.phase];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="default">Step {step.id}</Badge>
          <Badge variant="sage">{step.principle}</Badge>
          <Badge variant="muted">{phase.label}</Badge>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold leading-tight mb-3">
          {step.shortName}
        </h1>
        <blockquote className="font-serif text-lg md:text-xl italic leading-relaxed text-[var(--foreground)]/85 border-l-2 border-[var(--primary)] pl-4 max-w-3xl">
          &ldquo;{step.verbatim}&rdquo;
        </blockquote>
      </div>

      <StepDateControls stepId={step.id} />

      {/* Facet tabs */}
      <Tabs defaultValue="step" className="mt-8">
        <TabsList className="mb-8 flex-wrap">
          {FACET_ORDER.map((f) => (
            <TabsTrigger key={f} value={f}>
              {FACET_LABELS[f].label}
            </TabsTrigger>
          ))}
        </TabsList>

        {FACET_ORDER.map((facet) => {
          const meta = FACET_LABELS[facet];
          const graphic = STEP_GRAPHICS[step.id][facet];
          const Graphic = graphic.Component;
          const qs = questions.filter((q) => q.facet === facet);

          return (
            <TabsContent key={facet} value={facet}>
              {/* Essence */}
              <Card className="p-6 md:p-8 mb-6 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: meta.color }}
                />
                <div
                  className="text-[10px] uppercase tracking-widest font-semibold mb-2"
                  style={{ color: meta.color }}
                >
                  {meta.subtitle}
                </div>
                <p className="font-serif text-xl md:text-2xl leading-relaxed text-[var(--foreground)]">
                  {step.essence[facet]}
                </p>
              </Card>

              {/* Teaching prose */}
              <div className="mb-8 max-w-3xl">
                <p className="font-journal text-base md:text-lg leading-relaxed text-[var(--foreground)]/90 whitespace-pre-line">
                  {step.statements[facet]}
                </p>
              </div>

              {/* Infographic */}
              <Card className="p-5 md:p-8 mb-8">
                <div className="mb-5">
                  <div
                    className="text-[10px] uppercase tracking-widest font-semibold mb-1"
                    style={{ color: meta.color }}
                  >
                    Seeing it
                  </div>
                  <p className="font-serif text-base md:text-lg leading-relaxed text-[var(--foreground)]/85 italic max-w-3xl">
                    {graphic.caption}
                  </p>
                </div>
                <div className="flex justify-center">
                  <Graphic className="w-full max-w-[720px] h-auto" />
                </div>
              </Card>

              {/* Reflection questions */}
              {qs.length > 0 && (
                <>
                  <div className="mb-6 flex items-baseline justify-between">
                    <h2 className="font-serif text-2xl font-semibold">Reflection questions</h2>
                    <span className="text-xs text-[var(--muted-foreground)]">
                      {qs.length} {qs.length === 1 ? "prompt" : "prompts"}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {qs.map((q, i) => (
                      <ReflectionCard
                        key={`${q.stepId}-${q.facet}-${q.index}`}
                        stepId={q.stepId}
                        facet={q.facet}
                        questionIndex={q.index}
                        questionNumber={i + 1}
                        question={q.question}
                      />
                    ))}
                  </div>
                </>
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Big Book references */}
      <div className="mt-12">
        <BigBookRefs refs={step.bigBookRefs} />
      </div>

      {/* Per-step insights */}
      <div className="mt-12">
        <StepInsights step={step} />
      </div>

      {/* Meeting share */}
      <div className="mt-12">
        <MeetingShare step={step} />
      </div>

      {/* Related concepts */}
      <div className="mt-12">
        <ConceptsAccordion stepId={step.id} />
      </div>
    </div>
  );
}
