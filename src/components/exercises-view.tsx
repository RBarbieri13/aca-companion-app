"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TRAITS } from "@/data/traits";
import { getCurrentTraitId } from "@/data/schedule";
import { formatDate, cn } from "@/lib/utils";
import { Lock, Heart, Zap, Feather, Compass, Scale, Home } from "lucide-react";

import { InnerChildExercise } from "@/components/exercises/inner-child";
import { FeelingsWheel } from "@/components/exercises/feelings-wheel";
import { TriggerLogView } from "@/components/exercises/trigger-log";
import { AffirmationsView } from "@/components/exercises/affirmations";
import { IdentityInventory } from "@/components/exercises/identity-inventory";
import { ValuesSort } from "@/components/exercises/values-sort";
import { SanctuaryCheckIn } from "@/components/exercises/sanctuary-check-in";

type ExerciseId =
  | "inner-child"
  | "feelings"
  | "trigger"
  | "affirmations"
  | "identity-inventory"
  | "values-sort"
  | "sanctuary-check-in";

interface ExerciseMeta {
  id: ExerciseId;
  label: string;
  short: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  Component: React.ComponentType;
}

const EXERCISES: Record<ExerciseId, ExerciseMeta> = {
  "inner-child": {
    id: "inner-child",
    label: "Inner Child Dialogue",
    short: "Talk to the younger you",
    icon: Heart,
    Component: InnerChildExercise,
  },
  feelings: {
    id: "feelings",
    label: "Feelings Wheel",
    short: "Name what's actually here",
    icon: Compass,
    Component: FeelingsWheel,
  },
  trigger: {
    id: "trigger",
    label: "Trigger Log",
    short: "Capture event → response → desired response",
    icon: Zap,
    Component: TriggerLogView,
  },
  affirmations: {
    id: "affirmations",
    label: "Reparenting Affirmations",
    short: "Words the younger you needed",
    icon: Feather,
    Component: AffirmationsView,
  },
  "identity-inventory": {
    id: "identity-inventory",
    label: "Identity Inventory",
    short: "A self-authored record of who you are",
    icon: Compass,
    Component: IdentityInventory,
  },
  "values-sort": {
    id: "values-sort",
    label: "Values vs. Performance Sort",
    short: "Sort what's actually yours from what you were taught",
    icon: Scale,
    Component: ValuesSort,
  },
  "sanctuary-check-in": {
    id: "sanctuary-check-in",
    label: "Sanctuary ↔ Prison Check-in",
    short: "A weekly read on how aloneness is feeling",
    icon: Home,
    Component: SanctuaryCheckIn,
  },
};

interface TraitExerciseBundle {
  blurb: string;
  exercises: ExerciseId[];
}

const TRAIT_EXERCISES: Record<number, TraitExerciseBundle> = {
  1: {
    blurb:
      "Trait 1 is about isolation and the fear of people and authority. These practices meet the wounded child who learned that other people were not safe — and the adult who is learning, slowly, that not everyone is your first family.",
    exercises: ["inner-child", "feelings", "trigger", "affirmations"],
  },
  2: {
    blurb:
      "Trait 2 is about approval seeking and lost identity — and the rigid self-sufficiency we swing to in order to protect ourselves. These practices are about reclaiming an identity that is yours, not borrowed, and testing whether aloneness is sanctuary or prison this week.",
    exercises: ["identity-inventory", "values-sort", "sanctuary-check-in", "affirmations"],
  },
};

const EXERCISE_CONTEXT: Partial<Record<ExerciseId, Partial<Record<number, string>>>> = {
  "inner-child": {
    1: "When isolation or fear of authority has you activated, the child voice is often the one that's scared. Let the adult you meet them.",
  },
  feelings: {
    1: "Isolation dampens feelings into a blur. Naming the specific word pulls you out of the loop.",
  },
  trigger: {
    1: "Every trigger around authority is practice. Capture the moment so the response next time can be yours, not your childhood's.",
  },
  affirmations: {
    1: "The younger part of you is still listening. These are sentences they needed, said now.",
    2: "When identity feels borrowed, return to these. They can't replace the work, but they steady the ground.",
  },
  "identity-inventory": {
    2: "A slow, self-authored record of who you are — built over weeks, not minutes. This directly answers Flip Side Q1: 'Describe ways you do not depend on others to define who you are.'",
  },
  "values-sort": {
    2: "Which of these are actually yours, and which did you learn to be to stay safe? Surprising yourself here is the whole point.",
  },
  "sanctuary-check-in": {
    2: "Flip Side of the Other asks: 'When you are alone, do you feel more like it is a prison — or a sanctuary?' Answer once a week. The chart below shows your relationship to aloneness changing over time.",
  },
};

const ALL_EXERCISE_IDS: ExerciseId[] = [
  "inner-child",
  "feelings",
  "trigger",
  "affirmations",
  "identity-inventory",
  "values-sort",
  "sanctuary-check-in",
];

export function ExercisesView() {
  const searchParams = useSearchParams();
  const [selectedTrait, setSelectedTrait] = useState<number>(1);
  const [mounted, setMounted] = useState(false);
  const [activeExercise, setActiveExercise] = useState<ExerciseId | null>(null);

  useEffect(() => {
    setMounted(true);
    const urlTrait = searchParams.get("trait");
    const focus = urlTrait ? Number(urlTrait) : getCurrentTraitId();
    // Fall back to the nearest open trait
    const trait = TRAITS.find((t) => t.id === focus && t.active) ?? TRAITS.find((t) => t.active) ?? TRAITS[0];
    setSelectedTrait(trait.id);
    const bundle = TRAIT_EXERCISES[trait.id];
    setActiveExercise(bundle?.exercises[0] ?? null);
  }, [searchParams]);

  const trait = TRAITS.find((t) => t.id === selectedTrait) ?? TRAITS[0];
  const bundle = TRAIT_EXERCISES[selectedTrait];
  const isLocked = !trait.active;

  const activeMeta = activeExercise ? EXERCISES[activeExercise] : null;
  const contextCopy =
    activeExercise ? EXERCISE_CONTEXT[activeExercise]?.[selectedTrait] : null;

  const ActiveComponent = activeMeta?.Component;

  const unpickedExercises = useMemo(() => {
    const picked = new Set(bundle?.exercises ?? []);
    return ALL_EXERCISE_IDS.filter((id) => !picked.has(id));
  }, [bundle]);

  return (
    <div>
      {/* Trait menu (1-14) */}
      <Card className="p-3 md:p-4 mb-5">
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            Choose a trait to see its practices
          </div>
          {mounted && (
            <Badge variant="sage" className="text-[10px] ml-auto">
              Current · Trait {getCurrentTraitId()}
            </Badge>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist">
          {TRAITS.map((t) => {
            const isActive = t.id === selectedTrait;
            const isCurrent = mounted && t.id === getCurrentTraitId();
            const isOpen = t.active;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setSelectedTrait(t.id);
                  const b = TRAIT_EXERCISES[t.id];
                  setActiveExercise(b?.exercises[0] ?? null);
                }}
                className={cn(
                  "group shrink-0 flex flex-col items-center gap-1 rounded-xl border px-3 py-2.5 transition-all min-w-[68px]",
                  isActive
                    ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]"
                    : isOpen
                    ? "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40 text-[var(--foreground)]"
                    : "border-[var(--border)] bg-[var(--muted)]/30 text-[var(--muted-foreground)] opacity-60 cursor-pointer"
                )}
              >
                <div className="font-serif text-base font-bold leading-none">T{t.id}</div>
                <div className="text-[9px] uppercase tracking-wider font-semibold leading-none">
                  {isCurrent && !isActive ? "CURRENT" : isOpen ? "OPEN" : "LOCKED"}
                </div>
                {!isOpen && <Lock className="h-2.5 w-2.5" strokeWidth={2.5} />}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Selected trait context */}
      <Card className="p-5 md:p-6 mb-6">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge variant="outline" className="text-[10px]">Trait {trait.id}</Badge>
          {mounted && trait.id === getCurrentTraitId() && (
            <Badge variant="default" className="text-[10px]">Current focus</Badge>
          )}
          {isLocked && (
            <Badge variant="muted" className="text-[10px]">
              <Lock className="h-3 w-3 mr-1" strokeWidth={2} />
              Opens {formatDate(trait.mainListDate, "short")}
            </Badge>
          )}
        </div>
        <h2 className="font-serif text-xl md:text-2xl font-semibold mb-2 leading-tight">
          {trait.shortName}
        </h2>
        {isLocked ? (
          <p className="text-sm text-[var(--muted-foreground)] max-w-3xl leading-relaxed">
            The exercises for Trait {trait.id} unlock the week of{" "}
            <strong className="text-[var(--foreground)]">
              {formatDate(trait.mainListDate)}
            </strong>
            . For now, you can still use any practice below as a cross-trait tool.
          </p>
        ) : (
          <p className="text-sm text-[var(--foreground)]/80 max-w-3xl leading-relaxed">
            {bundle?.blurb}
          </p>
        )}
      </Card>

      {!isLocked && bundle && (
        <>
          {/* Exercise picker for this trait */}
          <div className="mb-6">
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-3">
              Practices for Trait {trait.id}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {bundle.exercises.map((id) => {
                const meta = EXERCISES[id];
                const isActive = id === activeExercise;
                const Icon = meta.icon;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveExercise(id)}
                    className={cn(
                      "text-left rounded-xl border p-4 transition-all",
                      isActive
                        ? "border-[var(--primary)] bg-[var(--primary)]/[0.05] shadow-sm"
                        : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-lg",
                          isActive ? "bg-[var(--primary)]" : "bg-[var(--muted)]"
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-4 w-4",
                            isActive
                              ? "text-[var(--primary-foreground)]"
                              : "text-[var(--primary)]"
                          )}
                          strokeWidth={1.75}
                        />
                      </div>
                    </div>
                    <div className="font-serif text-sm font-semibold leading-tight mb-1">
                      {meta.label}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)] leading-snug">
                      {meta.short}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active exercise + per-trait context blurb */}
          {activeMeta && ActiveComponent && (
            <div>
              {contextCopy && (
                <Card className="p-4 md:p-5 mb-6 border-[var(--primary)]/25 bg-[var(--primary)]/[0.04]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/15 mt-0.5">
                      <activeMeta.icon className="h-3.5 w-3.5 text-[var(--primary)]" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[var(--primary)] font-semibold mb-1">
                        Why this practice for Trait {trait.id}
                      </div>
                      <p className="text-sm text-[var(--foreground)]/85 leading-relaxed">
                        {contextCopy}
                      </p>
                    </div>
                  </div>
                </Card>
              )}
              <div className="mb-3">
                <h3 className="font-serif text-2xl font-semibold">{activeMeta.label}</h3>
              </div>
              <ActiveComponent />
            </div>
          )}

          {/* Cross-trait practices */}
          {unpickedExercises.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[var(--border)]">
              <div className="mb-4">
                <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
                  Also available
                </div>
                <h2 className="font-serif text-xl font-semibold">Cross-trait practices</h2>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-2xl mt-1">
                  These aren&apos;t on the curated list for Trait {trait.id}, but they&apos;re
                  always here when you need them.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {unpickedExercises.map((id) => {
                  const meta = EXERCISES[id];
                  const Icon = meta.icon;
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveExercise(id)}
                      className="text-left rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 hover:border-[var(--primary)]/40 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--muted)] shrink-0">
                          <Icon className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
                        </div>
                        <div>
                          <div className="font-serif text-sm font-semibold leading-tight mb-0.5">
                            {meta.label}
                          </div>
                          <div className="text-xs text-[var(--muted-foreground)]">
                            {meta.short}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {isLocked && (
        <Card className="p-8 text-center">
          <Lock className="h-8 w-8 text-[var(--muted-foreground)] mx-auto mb-3" strokeWidth={1.5} />
          <h3 className="font-serif text-lg font-semibold mb-2">Not yet</h3>
          <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto mb-4">
            Trait {trait.id} opens on {formatDate(trait.mainListDate)}. Until then, the earlier
            traits&apos; exercises are available to any ACA working the traits in their own
            order.
          </p>
          <Link
            href={`/exercises?trait=${mounted ? getCurrentTraitId() : 1}`}
            className="text-sm font-medium text-[var(--primary)] hover:underline"
            onClick={(e) => {
              e.preventDefault();
              const t = mounted ? getCurrentTraitId() : 1;
              setSelectedTrait(t);
              const b = TRAIT_EXERCISES[t];
              setActiveExercise(b?.exercises[0] ?? null);
            }}
          >
            Jump to Trait {mounted ? getCurrentTraitId() : 1}&apos;s exercises →
          </Link>
        </Card>
      )}
    </div>
  );
}
