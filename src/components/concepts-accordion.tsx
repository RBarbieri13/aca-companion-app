"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getConceptsForTrait } from "@/data/concepts";

export function ConceptsAccordion({ traitId }: { traitId: number }) {
  const concepts = getConceptsForTrait(traitId);
  const [open, setOpen] = useState<string | null>(null);

  if (concepts.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="mb-4">
        <div className="text-xs uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
          Reference
        </div>
        <h2 className="font-serif text-2xl font-semibold text-[var(--foreground)]">
          Key concepts for this trait
        </h2>
      </div>
      <div className="divide-y divide-[var(--border)] rounded-xl border border-[var(--border)] bg-[var(--card)]">
        {concepts.map((c) => {
          const isOpen = open === c.id;
          return (
            <div key={c.id}>
              <button
                onClick={() => setOpen(isOpen ? null : c.id)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[var(--muted)]/40 transition-colors"
              >
                <div>
                  <div className="font-serif text-base font-semibold text-[var(--foreground)]">
                    {c.name}
                  </div>
                  <div className="text-sm text-[var(--muted-foreground)] mt-0.5 leading-snug">
                    {c.shortDefinition}
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-[var(--muted-foreground)] transition-transform",
                    isOpen && "rotate-180"
                  )}
                  strokeWidth={2}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 -mt-1">
                  <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-prose">
                    {c.longDefinition}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
