"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ReflectionCard } from "@/components/reflection-card";
import { ConceptsAccordion } from "@/components/concepts-accordion";
import { QUADRANT_LABELS } from "@/data/traits";
import type { Trait, ReflectionQuestion, Quadrant } from "@/lib/types";
import { Card } from "@/components/ui/card";

const QUADRANT_ORDER: Quadrant[] = ["laundry", "other", "flipSide", "flipSideOther"];

export function TraitStudyView({
  trait,
  questions,
}: {
  trait: Trait;
  questions: ReflectionQuestion[];
}) {
  return (
    <div>
      <Tabs defaultValue="laundry">
        <TabsList className="mb-8 flex-wrap">
          {QUADRANT_ORDER.map((q) => (
            <TabsTrigger key={q} value={q}>
              {QUADRANT_LABELS[q].label}
            </TabsTrigger>
          ))}
        </TabsList>

        {QUADRANT_ORDER.map((quadrant) => {
          const meta = QUADRANT_LABELS[quadrant];
          const statement = trait.statements[quadrant];
          const qs = questions.filter((q) => q.quadrant === quadrant);

          return (
            <TabsContent key={quadrant} value={quadrant}>
              <Card className="p-8 md:p-10 mb-8 text-center relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: meta.color }}
                />
                <div
                  className="text-[10px] uppercase tracking-widest font-semibold mb-3"
                  style={{ color: meta.color }}
                >
                  {meta.subtitle}
                </div>
                <blockquote className="font-serif text-xl md:text-2xl font-normal italic leading-relaxed text-[var(--foreground)] max-w-3xl mx-auto">
                  &ldquo;{statement}&rdquo;
                </blockquote>
              </Card>

              <div className="mb-6 flex items-baseline justify-between">
                <h2 className="font-serif text-2xl font-semibold text-[var(--foreground)]">
                  Reflection questions
                </h2>
                <span className="text-xs text-[var(--muted-foreground)]">
                  {qs.length} {qs.length === 1 ? "prompt" : "prompts"}
                </span>
              </div>

              <div className="space-y-4">
                {qs.map((q, i) => (
                  <ReflectionCard
                    key={`${q.traitId}-${q.quadrant}-${q.index}`}
                    traitId={q.traitId}
                    quadrant={q.quadrant}
                    questionIndex={q.index}
                    questionNumber={i + 1}
                    question={q.question}
                  />
                ))}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>

      <ConceptsAccordion traitId={trait.id} />
    </div>
  );
}
