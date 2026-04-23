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
import { ReversedFlow } from "@/components/infographics/reversed-flow";
import { IdentityPendulum } from "@/components/infographics/identity-pendulum";
import { IdentityCompass } from "@/components/infographics/identity-compass";
import { SanctuaryToBridge } from "@/components/infographics/sanctuary-to-bridge";
import { RelationalPatternsTable } from "@/components/infographics/relational-patterns-table";

const QUADRANT_ORDER: Quadrant[] = ["laundry", "other", "flipSide", "flipSideOther"];

type GraphicEntry = {
  Component: React.ComponentType<{ className?: string }>;
  caption: string;
  /** Optional: a second graphic to include below the primary one. */
  supplements?: Array<{
    Component: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  }>;
};

// Trait-1 graphics serve as the default when a trait doesn't have its own.
const DEFAULT_QUADRANT_GRAPHIC: Record<Quadrant, GraphicEntry> = {
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

const TRAIT_QUADRANT_GRAPHICS: Record<number, Partial<Record<Quadrant, GraphicEntry>>> = {
  2: {
    laundry: {
      Component: ReversedFlow,
      caption:
        "When a parent can't give approval, the current reverses. The child learns to earn it — and the Game of Dissociation begins. True identity is hidden, first from others, then from the self.",
    },
    other: {
      Component: IdentityPendulum,
      caption:
        "Terrified of being swallowed by enmeshment, we swing the other way — rigid self-sufficiency, disdaining approval. Both poles leave the self behind. The True Self lives at the still center.",
      supplements: [
        {
          Component: RelationalPatternsTable,
          title: "Three patterns that abandon the self",
          description:
            "Enmeshment, codependency, and disengagement look different but share a root: our needs don't get named or met. Compare them side by side across boundaries, emotional needs, independence, identity, and what each one looks like in everyday life.",
        },
      ],
    },
    flipSide: {
      Component: IdentityCompass,
      caption:
        "We carry our own compass now. Other people's opinions, labels, and expectations are still heard — but they do not redirect the needle.",
    },
    flipSideOther: {
      Component: SanctuaryToBridge,
      caption:
        "The walls that kept us safe became the walls that kept us alone. We build a bridge out — not into enmeshment, but into a fellowship that accepts us as we are.",
    },
  },
};

function getGraphic(traitId: number, quadrant: Quadrant): GraphicEntry {
  return (
    TRAIT_QUADRANT_GRAPHICS[traitId]?.[quadrant] ?? DEFAULT_QUADRANT_GRAPHIC[quadrant]
  );
}

export function TraitStudyView({
  trait,
  questions,
}: {
  trait: Trait;
  questions: ReflectionQuestion[];
}) {
  return (
    <div>
      {/* Orientation strip - quadrant diagram (NOW STACKED ON MOBILE, LARGER ON DESKTOP) */}
      <Card className="p-5 md:p-8 mb-6 bg-[var(--muted)]/30">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-6 md:gap-8 items-center">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
              Orientation
            </div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3">
              Four quadrants of this trait
            </h2>
            <p className="text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed">
              Use the tabs below to move between the original trait, how we act it out, and the
              two recovery sides. Each tab has its own reflection questions, explainer graphic,
              and related concepts.
            </p>
          </div>
          <div className="flex justify-center">
            <QuadrantDiagram className="w-full max-w-[460px] h-auto" />
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
          const graphic = getGraphic(trait.id, quadrant);
          const Graphic = graphic.Component;
          const caption = graphic.caption;
          const supplements = graphic.supplements ?? [];

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

              {/* Quadrant-specific infographic — LARGER LAYOUT.
                  Graphic is now full-width with the caption beneath it. */}
              <Card className="p-5 md:p-8 mb-8">
                <div className="mb-5">
                  <div
                    className="text-[10px] uppercase tracking-widest font-semibold mb-1"
                    style={{ color: meta.color }}
                  >
                    What&apos;s happening here
                  </div>
                  <p className="font-serif text-base md:text-lg leading-relaxed text-[var(--foreground)]/85 italic max-w-3xl">
                    {caption}
                  </p>
                </div>
                <div className="flex justify-center">
                  <Graphic className="w-full max-w-[720px] h-auto" />
                </div>
              </Card>

              {/* Supplemental graphics (optional, trait/quadrant-specific) */}
              {supplements.map((supp, i) => {
                const SuppComponent = supp.Component;
                return (
                  <Card key={i} className="p-5 md:p-8 mb-8">
                    <div className="mb-5">
                      <div
                        className="text-[10px] uppercase tracking-widest font-semibold mb-1"
                        style={{ color: meta.color }}
                      >
                        Reference
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl font-semibold mb-2">
                        {supp.title}
                      </h3>
                      <p className="text-sm md:text-base text-[var(--foreground)]/80 leading-relaxed max-w-3xl">
                        {supp.description}
                      </p>
                    </div>
                    <SuppComponent className="w-full" />
                  </Card>
                );
              })}

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
