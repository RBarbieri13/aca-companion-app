"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { ConceptGlyph } from "@/components/infographics/concept-glyphs";
import { conceptsForStep } from "@/data/concepts";
import { cn } from "@/lib/utils";

export function ConceptsAccordion({ stepId }: { stepId: number }) {
  const concepts = conceptsForStep(stepId);
  const [open, setOpen] = useState<string | null>(null);

  if (concepts.length === 0) return null;

  return (
    <section>
      <h2 className="font-serif text-2xl font-semibold mb-1">Related concepts</h2>
      <p className="text-sm text-[var(--muted-foreground)] mb-5">
        Ideas that show up in this Step. Tap to expand, or visit the full glossary.
      </p>
      <div className="space-y-3">
        {concepts.map((concept) => {
          const isOpen = open === concept.id;
          return (
            <Card key={concept.id} className="overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : concept.id)}
                className="flex w-full items-center gap-4 p-4 text-left hover:bg-[var(--muted)]/30 transition-colors"
                aria-expanded={isOpen}
              >
                <ConceptGlyph id={concept.id} size={48} />
                <div className="flex-1 min-w-0">
                  <div className="font-serif text-base font-semibold">{concept.name}</div>
                  <p className="text-sm text-[var(--muted-foreground)] line-clamp-1">
                    {concept.shortDefinition}
                  </p>
                </div>
                <ChevronDown
                  className={cn("h-4 w-4 shrink-0 transition-transform", isOpen && "rotate-180")}
                  strokeWidth={2}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-0">
                  <p className="text-sm text-[var(--foreground)]/85 leading-relaxed mb-3">
                    {concept.longDefinition}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {concept.relatedSteps.map((s) => (
                      <Link key={s} href={`/steps/${s}`}>
                        <Badge variant="muted">Step {s}</Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}
