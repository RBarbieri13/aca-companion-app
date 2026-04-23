"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  Lightbulb,
  Calendar as CalendarIcon,
  Lock,
  ChevronDown,
  Target,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { TRAITS } from "@/data/traits";
import { ALL_QUESTIONS } from "@/data/questions";
import { getCurrentTraitId } from "@/data/schedule";
import { getConceptsForTrait } from "@/data/concepts";
import { formatDate, cn } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import { QuadrantDiagram } from "@/components/infographics/quadrant-diagram";
import { TraitConstellation } from "@/components/infographics/trait-constellation";
import { GLYPHS } from "@/components/infographics/concept-glyphs";

export function TraitsHub() {
  const journal = useAppStore((s) => s.journal);
  const [mounted, setMounted] = useState(false);
  const [focusTrait, setFocusTrait] = useState<number>(1);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFocusTrait(getCurrentTraitId());
  }, []);

  const selected = TRAITS.find((t) => t.id === focusTrait) ?? TRAITS[0];
  const questions = ALL_QUESTIONS.filter((q) => q.traitId === selected.id);
  const answered = questions.filter((q) => {
    const key = `${q.traitId}::${q.quadrant}::${q.index}`;
    return journal[key]?.content.trim().length;
  }).length;
  const pct = questions.length > 0 ? Math.round((answered / questions.length) * 100) : 0;
  const concepts = getConceptsForTrait(selected.id);
  const isCurrent = mounted && focusTrait === getCurrentTraitId();

  return (
    <div>
      {/* Top-of-page Current Focus banner */}
      <Card className="p-5 md:p-6 mb-6 bg-gradient-to-br from-[var(--primary)] to-[#1f3a30] text-[var(--primary-foreground)] relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-[0.08] pointer-events-none hidden md:block">
          <TraitConstellation className="h-[260px] w-[260px]" activeTraitId={mounted ? getCurrentTraitId() : 1} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-3.5 w-3.5 opacity-80" strokeWidth={2} />
              <span className="text-[10px] uppercase tracking-widest font-semibold opacity-90">
                This week&apos;s focus
              </span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold leading-tight mb-1">
              {mounted
                ? `Trait ${getCurrentTraitId()} · ${TRAITS.find((t) => t.id === getCurrentTraitId())?.shortName}`
                : "Loading..."}
            </h2>
            <p className="text-sm opacity-85">
              Tap the spotlight below to explore, or jump straight to the study, exercises, or concepts for this trait.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            {mounted && (
              <>
                <Link href={`/traits/${getCurrentTraitId()}`}>
                  <Button variant="accent" size="sm">
                    <BookOpen className="h-3.5 w-3.5" strokeWidth={2} />
                    Open study
                  </Button>
                </Link>
                <Link href={`/exercises?trait=${getCurrentTraitId()}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[var(--primary-foreground)]/40 text-[var(--primary-foreground)] hover:bg-white/10"
                  >
                    <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                    Exercises
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Trait picker + spotlight panel */}
      <Card className="p-5 md:p-6 mb-6">
        <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-0.5">
              Trait spotlight
            </div>
            <h2 className="font-serif text-xl font-semibold">Pick any trait to explore</h2>
          </div>

          {/* Dropdown picker */}
          <div className="relative">
            <button
              onClick={() => setPickerOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={pickerOpen}
              aria-label={`Trait picker. Currently showing Trait ${selected.id}: ${selected.shortName}`}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-medium hover:border-[var(--primary)]/40 transition-colors min-w-[240px] justify-between"
            >
              <span className="inline-flex items-center gap-2">
                <span className="font-serif font-semibold text-[var(--primary)]">
                  Trait {selected.id}
                </span>
                <span className="text-[var(--foreground)]/80">{selected.shortName}</span>
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-[var(--muted-foreground)] transition-transform",
                  pickerOpen && "rotate-180"
                )}
                strokeWidth={2}
              />
            </button>
            {pickerOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 max-h-[420px] overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-lg z-20 p-2">
                {TRAITS.map((t) => {
                  const isOpen = t.active;
                  const isActive = t.id === focusTrait;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        if (!isOpen) return;
                        setFocusTrait(t.id);
                        setPickerOpen(false);
                      }}
                      disabled={!isOpen}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                        isActive
                          ? "bg-[var(--muted)]"
                          : isOpen
                          ? "hover:bg-[var(--muted)]/60"
                          : "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-md font-serif text-sm font-semibold",
                          isActive
                            ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                            : isOpen
                            ? "bg-[var(--muted)] text-[var(--primary)]"
                            : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                        )}
                      >
                        {t.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[var(--foreground)] truncate">
                          {t.shortName}
                        </div>
                        <div className="text-[11px] text-[var(--muted-foreground)]">
                          {isOpen ? (
                            <>Open · {formatDate(t.mainListDate, "short")}</>
                          ) : (
                            <>Opens {formatDate(t.mainListDate, "short")}</>
                          )}
                        </div>
                      </div>
                      {!isOpen && (
                        <Lock className="h-3.5 w-3.5 text-[var(--muted-foreground)]" strokeWidth={2} />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Spotlight panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="outline" className="text-[10px]">
                Trait {selected.id}
              </Badge>
              {isCurrent && (
                <Badge variant="default" className="text-[10px]">
                  Current focus
                </Badge>
              )}
              {!selected.active && (
                <Badge variant="muted" className="text-[10px]">
                  <Lock className="h-3 w-3 mr-1" strokeWidth={2} />
                  Opens {formatDate(selected.mainListDate, "short")}
                </Badge>
              )}
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold leading-tight mb-3">
              {selected.shortName}
            </h3>
            {selected.active ? (
              <p className="font-serif text-base md:text-lg italic leading-relaxed text-[var(--foreground)]/85 mb-5 max-w-2xl">
                &ldquo;{selected.statements.laundry}&rdquo;
              </p>
            ) : (
              <p className="text-sm text-[var(--muted-foreground)] mb-5 max-w-2xl leading-relaxed">
                This trait unlocks the day after the group finishes the previous one. The main
                list meeting is on {formatDate(selected.mainListDate)}.
              </p>
            )}

            {/* Quick links */}
            {selected.active && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
                <Link href={`/traits/${selected.id}`}>
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-3 hover:border-[var(--primary)]/40 transition-colors group">
                    <div className="flex items-center justify-between mb-1">
                      <BookOpen className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
                      <ArrowRight
                        className="h-3 w-3 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all"
                        strokeWidth={2}
                      />
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-0.5">
                      Study
                    </div>
                    <div className="font-serif text-sm font-semibold">
                      All 4 quadrants · {questions.length} prompts
                    </div>
                  </div>
                </Link>
                <Link href={`/exercises?trait=${selected.id}`}>
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-3 hover:border-[var(--primary)]/40 transition-colors group">
                    <div className="flex items-center justify-between mb-1">
                      <Sparkles className="h-4 w-4 text-[var(--accent)]" strokeWidth={1.75} />
                      <ArrowRight
                        className="h-3 w-3 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all"
                        strokeWidth={2}
                      />
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-0.5">
                      Exercises
                    </div>
                    <div className="font-serif text-sm font-semibold">Curated practices</div>
                  </div>
                </Link>
                <a href="#concepts">
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-3 hover:border-[var(--primary)]/40 transition-colors group h-full">
                    <div className="flex items-center justify-between mb-1">
                      <Lightbulb className="h-4 w-4 text-[var(--sage)]" strokeWidth={1.75} />
                      <ArrowRight
                        className="h-3 w-3 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all"
                        strokeWidth={2}
                      />
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-0.5">
                      Concepts
                    </div>
                    <div className="font-serif text-sm font-semibold">
                      {concepts.length} related
                    </div>
                  </div>
                </a>
              </div>
            )}

            {/* Meeting dates */}
            <div className="flex flex-wrap gap-3 text-xs text-[var(--muted-foreground)]">
              <div className="inline-flex items-center gap-1.5">
                <CalendarIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
                <span>Main List · {formatDate(selected.mainListDate)}</span>
              </div>
              <span className="text-[var(--border)]">·</span>
              <div className="inline-flex items-center gap-1.5">
                <CalendarIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
                <span>Flip Side · {formatDate(selected.flipSideDate)}</span>
              </div>
            </div>
          </div>

          {selected.active && (
            <div className="flex flex-col items-center gap-2 shrink-0">
              <ProgressRing
                value={pct}
                size={120}
                strokeWidth={10}
                label={`${pct}%`}
                sublabel="answered"
              />
              <div className="text-xs text-[var(--muted-foreground)]">
                {answered} of {questions.length}
              </div>
            </div>
          )}
        </div>

        {/* Preview of key concepts for the selected trait */}
        {selected.active && concepts.length > 0 && (
          <div className="mt-6 pt-5 border-t border-[var(--border)]" id="concepts">
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-3">
              Key concepts for Trait {selected.id}
            </div>
            <div className="flex flex-wrap gap-2">
              {concepts.map((c) => {
                const Glyph = GLYPHS[c.id];
                return (
                  <Link
                    key={c.id}
                    href={`/traits/${selected.id}#concepts`}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] pl-1 pr-3 py-1 text-xs font-medium hover:border-[var(--primary)]/40 transition-colors"
                  >
                    {Glyph ? (
                      <Glyph size={24} />
                    ) : (
                      <span className="h-5 w-5 rounded-full bg-[var(--muted)]" />
                    )}
                    <span>{c.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </Card>

      {/* Orientation cards (kept from before) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 mb-10">
        <Card className="p-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
            How each trait is studied
          </div>
          <h2 className="font-serif text-xl font-semibold mb-4">The four quadrants</h2>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
            Every trait has four faces: the original wound, how we act it out, and the recovery
            side of each. You&apos;ll work through all four as tabs inside each trait page.
          </p>
          <div className="flex justify-center">
            <QuadrantDiagram className="max-w-full h-auto" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
            How the traits connect
          </div>
          <h2 className="font-serif text-xl font-semibold mb-4">The constellation</h2>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-2">
            The traits aren&apos;t a checklist — they share roots. Fear weaves through 1, 3, and 12.
            Identity runs through 2, 5, 6, 7, and 11. Colors mark thematic families.
          </p>
          <div className="flex justify-center">
            <TraitConstellation
              className="max-w-full h-auto"
              activeTraitId={mounted ? focusTrait : 1}
            />
          </div>
          <p className="text-xs text-[var(--muted-foreground)] text-center mt-2 italic">
            Highlighted: Trait {selected.id} and its relatives
          </p>
        </Card>
      </div>

      {/* Traits grid (unchanged, at the bottom) */}
      <div className="mb-4">
        <h2 className="font-serif text-2xl font-semibold">All traits</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TRAITS.map((trait) => {
          const clickable = trait.active;
          const Wrapper: React.ElementType = clickable ? Link : "div";
          const wrapperProps = clickable ? { href: `/traits/${trait.id}` } : {};
          return (
            <Wrapper key={trait.id} {...wrapperProps} className="block group">
              <Card
                className={
                  clickable
                    ? "h-full p-5 hover:shadow-md hover:border-[var(--primary)]/30 transition-all cursor-pointer"
                    : "h-full p-5 opacity-60"
                }
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--muted)] font-serif text-sm font-semibold text-[var(--primary)]">
                      {trait.id}
                    </div>
                    {clickable ? (
                      <Badge variant="sage" className="text-[10px]">
                        <BookOpen className="h-3 w-3 mr-1" strokeWidth={2} />
                        Open
                      </Badge>
                    ) : (
                      <Badge variant="muted" className="text-[10px]">
                        <Lock className="h-3 w-3 mr-1" strokeWidth={2} />
                        Coming soon
                      </Badge>
                    )}
                  </div>
                  {clickable && (
                    <ArrowRight
                      className="h-4 w-4 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all"
                      strokeWidth={1.75}
                    />
                  )}
                </div>
                <h3 className="font-serif text-lg font-semibold leading-snug text-[var(--foreground)] mb-3">
                  {trait.shortName}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4 line-clamp-3">
                  {trait.statements.laundry}
                </p>
                <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] pt-3 border-t border-[var(--border)]">
                  <CalendarIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  <span>{formatDate(trait.mainListDate, "short")}</span>
                  <span className="mx-1">·</span>
                  <span>{formatDate(trait.flipSideDate, "short")}</span>
                </div>
              </Card>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
