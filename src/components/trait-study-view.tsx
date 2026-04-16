"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ReflectionCard } from "@/components/reflection-card";
import { ConceptsAccordion } from "@/components/concepts-accordion";
import { QUADRANT_LABELS } from "@/data/traits";
import type { Trait, ReflectionQuestion, Quadrant } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { QuadrantDiagram } from "@/components/infographics/quadrant-diagram";
import { DissociationCycle } from "@/components/infographics/dissociation-cycle";
import { FalseSelfLayers } from "@/components/infographics/false-self-layers";
import { RecoveryArc } from "@/components/infographics/recovery-arc";
import { AuthenticConnection } from "@/components/infographics/authentic-connection";

const QUADRANT_ORDER: Quadrant[] = ["laundry", "other", "flipSide", "flipSideOther"];

const QUADRANT_GRAPHIC: Record<
  Quadrant,
  { Component: React.ComponentType<{ className?: string }>; caption: string }
> = {
  laundry: {
    Component: DissociationCycle,
    caption:
      "The wound runs as a loop — isolation feeds fear, which deepens separation, which returns to isolation.",
  },
  other: {
    Component: FalseSelfLayers,
    caption:
      "To cover the fear, we armor up. The authority, the controller — these are the outer layers. The True Self stays buried, not erased.",
  },
  flipSide: {
    Component: RecoveryArc,
    caption:
      "Recovery is not a switch. It is a daily arc: admit the effect, work the Steps, practice reparenting, respond instead of react.",
  },
  flipSideOther: {
    Component: AuthenticConnection,
    caption:
      "Engaged, not controlling. We can hold our power and position without shrinking anyone around us.",
  },
};

export function TraitStudyView({
  trait,
  questions,
}: {
  trait: Trait;
  questions: ReflectionQuestion[];
}) {
  return (
    <div>
      {/* Orientation strip - quadrant diagram */}
      <Card className="p-5 md:p-6 mb-6 bg-[var(--muted)]/30">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 items-center">
          <div className="flex justify-center">
            <QuadrantDiagram compact className="max-w-full h-auto" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
              Orientation
            </div>
            <h2 className="font-serif text-lg font-semibold mb-2">
              Four quadrants of this trait
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              Use the tabs below to move between the original trait, how we act it out, and the
              two recovery sides. Each tab has its own reflection questions.
            </p>
          </div>
        </div>
      </Card>

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
          const Graphic = QUADRANT_GRAPHIC[quadrant].Component;
          const caption = QUADRANT_GRAPHIC[quadrant].caption;

          return (
            <TabsContent key={quadrant} value={quadrant}>
              {/* Trait statement */}
              <Card className="p-8 md:p-10 mb-6 text-center relative overflow-hidden">
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

              {/* Quadrant-specific infographic */}
              <Card className="p-5 md:p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-6 items-center">
                  <div className="flex justify-center min-w-0">
                    <Graphic className="max-w-full h-auto w-full" />
                  </div>
                  <div>
                    <div
                      className="text-[10px] uppercase tracking-widest font-semibold mb-2"
                      style={{ color: meta.color }}
                    >
                      What&apos;s happening here
                    </div>
                    <p className="font-serif text-base leading-relaxed text-[var(--foreground)]/85 italic">
                      {caption}
                    </p>
                  </div>
                </div>
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
