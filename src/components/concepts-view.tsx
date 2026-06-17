"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { ConceptGlyph } from "@/components/infographics/concept-glyphs";
import {
  StepPrinciplePromiseTable,
  KindsOfAmendsTable,
  ThreePhasesTable,
} from "@/components/infographics/shared";
import { CONCEPTS } from "@/data/concepts";
import { TRADITIONS } from "@/data/traditions";
import { PROMISES } from "@/data/promises";
import { STEPS } from "@/data/steps";
import { cn } from "@/lib/utils";

const SECTIONS = [
  ["glossary", "Glossary"],
  ["promises", "The Promises"],
  ["traditions", "Twelve Traditions"],
  ["tables", "Reference tables"],
  ["bigbook", "Big Book index"],
] as const;

export function ConceptsView() {
  const [open, setOpen] = useState<string | null>(null);

  // Big Book index — dedupe by work + locator.
  const refIndex = (() => {
    const seen = new Set<string>();
    const out: { work: string; locator: string; summary: string; steps: number[] }[] = [];
    for (const step of STEPS) {
      for (const ref of step.bigBookRefs) {
        const key = `${ref.work}::${ref.locator}`;
        const existing = out.find((o) => `${o.work}::${o.locator}` === key);
        if (existing) {
          existing.steps.push(step.id);
        } else {
          seen.add(key);
          out.push({ work: ref.work, locator: ref.locator, summary: ref.summary, steps: [step.id] });
        }
      }
    }
    return out;
  })();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-2">Concepts & Reference</h1>
        <p className="text-[var(--muted-foreground)] max-w-2xl">
          The working vocabulary of the Steps, the Promises in plain words, the Twelve Traditions,
          master tables, and a citation index — all in one place.
        </p>
      </div>

      {/* Section nav */}
      <div className="flex flex-wrap gap-2 mb-8 sticky top-0 z-10 bg-[var(--background)]/80 backdrop-blur py-2">
        {SECTIONS.map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            <Badge variant="outline" className="cursor-pointer hover:bg-[var(--muted)]">
              {label}
            </Badge>
          </a>
        ))}
      </div>

      {/* Glossary */}
      <section id="glossary" className="mb-12 scroll-mt-20">
        <h2 className="font-serif text-2xl font-semibold mb-4">Glossary</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {CONCEPTS.map((c) => {
            const isOpen = open === c.id;
            return (
              <Card key={c.id} className="overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : c.id)}
                  className="flex w-full items-center gap-3 p-4 text-left hover:bg-[var(--muted)]/30 transition-colors"
                  aria-expanded={isOpen}
                >
                  <ConceptGlyph id={c.id} size={48} />
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-base font-semibold leading-tight">{c.name}</div>
                    <p className="text-xs text-[var(--muted-foreground)] line-clamp-2">
                      {c.shortDefinition}
                    </p>
                  </div>
                  <ChevronDown
                    className={cn("h-4 w-4 shrink-0 transition-transform", isOpen && "rotate-180")}
                    strokeWidth={2}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-[var(--foreground)]/85 leading-relaxed mb-3">
                      {c.longDefinition}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {c.relatedSteps.map((s) => (
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

      {/* Promises */}
      <section id="promises" className="mb-12 scroll-mt-20">
        <h2 className="font-serif text-2xl font-semibold mb-1">The Promises</h2>
        <p className="text-sm text-[var(--muted-foreground)] mb-4 max-w-2xl">
          Paraphrased in our own words — the freedom and serenity that arrive as a natural result of
          the work, especially the amends of Step 9.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {PROMISES.map((p) => (
            <Card key={p.id} className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--sage)]/30 font-serif text-xs font-semibold text-[var(--primary)]">
                  {p.id}
                </div>
                <h3 className="font-serif text-sm font-semibold leading-tight">{p.title}</h3>
              </div>
              <p className="text-sm text-[var(--foreground)]/80 leading-relaxed">{p.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Traditions */}
      <section id="traditions" className="mb-12 scroll-mt-20">
        <h2 className="font-serif text-2xl font-semibold mb-1">The Twelve Traditions</h2>
        <p className="text-sm text-[var(--muted-foreground)] mb-4 max-w-2xl">
          The principles that keep groups healthy — reproduced verbatim.
        </p>
        <div className="space-y-2">
          {TRADITIONS.map((t) => (
            <Card key={t.id} className="p-4 flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--muted)] font-serif text-xs font-semibold text-[var(--primary)]">
                {t.id}
              </div>
              <p className="text-sm text-[var(--foreground)]/85 leading-relaxed pt-0.5">{t.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Tables */}
      <section id="tables" className="mb-12 scroll-mt-20">
        <h2 className="font-serif text-2xl font-semibold mb-4">Reference tables</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-lg font-semibold mb-2">Step → Principle → Promise</h3>
            <StepPrinciplePromiseTable className="w-full" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold mb-2">Kinds of amends</h3>
            <KindsOfAmendsTable className="w-full" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold mb-2">The three phases</h3>
            <ThreePhasesTable className="w-full" />
          </div>
        </div>
      </section>

      {/* Big Book index */}
      <section id="bigbook" className="scroll-mt-20">
        <h2 className="font-serif text-2xl font-semibold mb-1">Big Book reference index</h2>
        <p className="text-sm text-[var(--muted-foreground)] mb-4 max-w-2xl">
          Citations only — chapter/essay locators with our own summaries. Open your copy of the book
          to read the passages in full.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {refIndex.map((ref, i) => (
            <Card key={i} className="p-4">
              <h3 className="font-serif text-sm font-semibold leading-snug mb-1">{ref.locator}</h3>
              <Badge variant="outline" className="mb-2">
                {ref.work}
              </Badge>
              <p className="text-sm text-[var(--foreground)]/80 leading-relaxed mb-2">{ref.summary}</p>
              <div className="flex flex-wrap gap-1.5">
                {ref.steps.map((s) => (
                  <Link key={s} href={`/steps/${s}`}>
                    <Badge variant="muted">Step {s}</Badge>
                  </Link>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
