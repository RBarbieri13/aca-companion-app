"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  BookOpen,
  Calendar as CalendarIcon,
  Sparkles,
  LineChart,
  ArrowRight,
  Feather,
  Map,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { useAppStore } from "@/store/app-store";
import { getCurrentSession, getCurrentTraitId, getNextSession } from "@/data/schedule";
import { ALL_QUESTIONS } from "@/data/questions";
import { TRAITS } from "@/data/traits";
import { daysBetween, formatDate, parseLocalDate, startOfToday } from "@/lib/utils";
import { AFFIRMATIONS } from "@/data/affirmations";
import { JourneyTimeline } from "@/components/infographics/journey-timeline";
import { TraitConstellation } from "@/components/infographics/trait-constellation";

export function DashboardView() {
  const journal = useAppStore((s) => s.journal);
  const feelings = useAppStore((s) => s.feelings);
  const triggers = useAppStore((s) => s.triggers);

  // `today` is memoized so all date-derived values and useMemo below have a stable reference.
  // Using startOfToday() (local midnight) so day-math with schedule dates is accurate.
  const today = useMemo(() => startOfToday(), []);
  const current = useMemo(() => getCurrentSession(today), [today]);
  const next = useMemo(() => getNextSession(today), [today]);
  const daysUntilNext = next ? daysBetween(today, parseLocalDate(next.date)) : null;

  // The trait the group is currently on (rolls forward the day AFTER each Flip Side meeting).
  const focusTraitId = useMemo(() => getCurrentTraitId(today), [today]);

  const focusQuestions = useMemo(
    () => ALL_QUESTIONS.filter((q) => q.traitId === focusTraitId),
    [focusTraitId]
  );
  const total = focusQuestions.length;
  const answered = useMemo(() => {
    let n = 0;
    for (const q of focusQuestions) {
      const key = `${q.traitId}::${q.quadrant}::${q.index}`;
      const entry = journal[key];
      if (entry && entry.content.trim().length > 0) n++;
    }
    return n;
  }, [journal, focusQuestions]);
  const pct = total > 0 ? Math.round((answered / total) * 100) : 0;

  const lastEntry = useMemo(() => {
    const entries = Object.values(journal).filter((e) => e.content.trim().length > 0);
    entries.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    return entries[0];
  }, [journal]);

  const affirmationIndex =
    (new Date().getFullYear() * 1000 + new Date().getMonth() * 31 + new Date().getDate()) %
    AFFIRMATIONS.length;
  const affirmation = AFFIRMATIONS[affirmationIndex];

  // The hero card always reflects the focus trait (survives break weeks).
  const currentTrait = TRAITS.find((t) => t.id === focusTraitId) ?? null;
  const canOpenCurrent = currentTrait?.active;

  return (
    <div>
      <div className="mb-10">
        <div className="text-xs uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-2">
          Welcome back
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[var(--foreground)] mb-3">
          Your study this week
        </h1>
      </div>

      {/* Hero card */}
      <Card className="p-6 md:p-10 mb-6 relative overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[#1f3a30] text-[var(--primary-foreground)]">
        {/* Decorative constellation in background */}
        <div className="absolute right-0 top-0 opacity-[0.08] pointer-events-none hidden md:block">
          <TraitConstellation className="h-[400px] w-[400px]" activeTraitId={currentTrait?.id} />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              {current?.type === "session" ? (
                <>
                  <Badge variant="accent" className="text-[10px]">
                    {current.quadrant === "mainList" ? "Main List Week" : "Flip Side Week"}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] border-[var(--primary-foreground)]/30 text-[var(--primary-foreground)]">
                    Trait {current.traitId}
                  </Badge>
                </>
              ) : current?.type === "break" ? (
                <Badge variant="accent" className="text-[10px]">
                  On break — {current.label}
                </Badge>
              ) : (
                <Badge variant="accent" className="text-[10px]">
                  {current?.label ?? "Upcoming"}
                </Badge>
              )}
            </div>
            <h2 className="font-serif text-2xl md:text-4xl font-semibold mb-3 leading-tight">
              {currentTrait?.shortName ?? current?.label ?? "No active session"}
            </h2>
            {currentTrait && (
              <p className="text-base md:text-lg opacity-90 italic leading-relaxed font-serif max-w-2xl">
                &ldquo;{currentTrait.statements.laundry}&rdquo;
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {canOpenCurrent && currentTrait && (
                <Link href={`/traits/${currentTrait.id}`}>
                  <Button variant="accent">
                    <BookOpen className="h-4 w-4" strokeWidth={1.75} />
                    Open this week&apos;s study
                  </Button>
                </Link>
              )}
              {next && (
                <div className="text-sm opacity-80">
                  <CalendarIcon className="inline h-3.5 w-3.5 mr-1 -mt-0.5" strokeWidth={1.75} />
                  Next meeting:{" "}
                  {daysUntilNext !== null
                    ? daysUntilNext === 0
                      ? "today"
                      : daysUntilNext === 1
                      ? "tomorrow"
                      : `in ${daysUntilNext} days`
                    : ""}{" "}
                  · {formatDate(next.date, "short")}
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:block relative z-10">
            <ProgressRing
              value={pct}
              size={160}
              strokeWidth={12}
              color="#c97b5e"
              label={`${pct}%`}
              sublabel={`Trait ${focusTraitId} complete`}
            />
          </div>
        </div>
      </Card>

      {/* Quick navigation — fast links to the current trait and the rest of the app */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-0.5">
              Quick nav
            </div>
            <h2 className="font-serif text-lg font-semibold">Jump in</h2>
          </div>
          {currentTrait && (
            <div className="text-xs text-[var(--muted-foreground)]">
              Current focus · Trait {currentTrait.id}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr] gap-3 mb-3">
          {/* Current trait - prominent */}
          {currentTrait && (
            <Link href={`/traits/${currentTrait.id}`}>
              <Card className="p-5 h-full hover:border-[var(--primary)]/40 hover:shadow-md transition-all group border-[var(--primary)]/25 bg-[var(--primary)]/[0.03]">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="default" className="text-[10px]">
                    Current · Trait {currentTrait.id}
                  </Badge>
                  <ArrowRight
                    className="h-4 w-4 text-[var(--primary)] group-hover:translate-x-0.5 transition-all"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="font-serif text-lg font-semibold mb-1.5 leading-tight">
                  {currentTrait.shortName}
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] italic leading-relaxed mb-3 line-clamp-2">
                  &ldquo;{currentTrait.statements.laundry}&rdquo;
                </p>
                <div className="flex items-center justify-between text-xs">
                  <div className="text-[var(--muted-foreground)]">
                    {answered} of {total} answered
                  </div>
                  <div className="font-serif font-semibold text-[var(--primary)]">{pct}%</div>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-[var(--muted)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--primary)] transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </Card>
            </Link>
          )}

          {/* All open traits - chip list */}
          <Card className="p-5 h-full">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
                Open traits
              </div>
              <BookOpen className="h-4 w-4 text-[var(--muted-foreground)]" strokeWidth={1.75} />
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {TRAITS.filter((t) => t.active).map((t) => {
                const isCurrent = t.id === focusTraitId;
                return (
                  <Link
                    key={t.id}
                    href={`/traits/${t.id}`}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      isCurrent
                        ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]"
                        : "border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]"
                    }`}
                  >
                    <span className="font-serif font-semibold">T{t.id}</span>
                    <span className="opacity-90">{t.shortName}</span>
                  </Link>
                );
              })}
            </div>
            <Link
              href="/traits"
              className="text-xs text-[var(--primary)] font-medium hover:underline inline-flex items-center gap-1"
            >
              All 14 traits
              <ArrowRight className="h-3 w-3" strokeWidth={2} />
            </Link>
          </Card>

          {/* Next meeting + calendar link */}
          <Card className="p-5 h-full">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
                Next meeting
              </div>
              <CalendarIcon className="h-4 w-4 text-[var(--muted-foreground)]" strokeWidth={1.75} />
            </div>
            {next ? (
              <>
                <div className="font-serif text-lg font-semibold leading-tight mb-1">
                  {daysUntilNext !== null
                    ? daysUntilNext === 0
                      ? "Today"
                      : daysUntilNext === 1
                      ? "Tomorrow"
                      : `In ${daysUntilNext} days`
                    : formatDate(next.date, "short")}
                </div>
                <div className="text-xs text-[var(--muted-foreground)] mb-3">
                  {next.type === "break"
                    ? `Break — ${next.label}`
                    : next.type === "wrapup"
                    ? "Final Wrapup"
                    : `Trait ${next.traitId} · ${
                        next.quadrant === "mainList" ? "Main List" : "Flip Side"
                      }`}
                  {" · "}
                  {formatDate(next.date, "short")}
                </div>
              </>
            ) : (
              <div className="text-sm text-[var(--muted-foreground)] mb-3">
                No upcoming meetings
              </div>
            )}
            <Link
              href="/calendar"
              className="text-xs text-[var(--primary)] font-medium hover:underline inline-flex items-center gap-1"
            >
              Open calendar
              <ArrowRight className="h-3 w-3" strokeWidth={2} />
            </Link>
          </Card>
        </div>

        {/* Secondary destinations */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/exercises">
            <Card className="p-4 hover:border-[var(--primary)]/30 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-2">
                <Sparkles className="h-4 w-4 text-[var(--accent)]" strokeWidth={1.75} />
                <ArrowRight
                  className="h-3.5 w-3.5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all"
                  strokeWidth={2}
                />
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-0.5">
                Exercises
              </div>
              <div className="font-serif text-sm font-semibold">Practice tools</div>
            </Card>
          </Link>

          <Link href="/insights">
            <Card className="p-4 hover:border-[var(--primary)]/30 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-2">
                <LineChart className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
                <ArrowRight
                  className="h-3.5 w-3.5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all"
                  strokeWidth={2}
                />
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-0.5">
                Insights
              </div>
              <div className="font-serif text-sm font-semibold">Your patterns</div>
            </Card>
          </Link>

          <Link href={`/exercises#trait-${focusTraitId}`}>
            <Card className="p-4 hover:border-[var(--primary)]/30 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-2">
                <Feather className="h-4 w-4 text-[var(--sage)]" strokeWidth={1.75} />
                <ArrowRight
                  className="h-3.5 w-3.5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all"
                  strokeWidth={2}
                />
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-0.5">
                For Trait {focusTraitId}
              </div>
              <div className="font-serif text-sm font-semibold">Curated practices</div>
            </Card>
          </Link>

          <Link href="/traits">
            <Card className="p-4 hover:border-[var(--primary)]/30 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
                <ArrowRight
                  className="h-3.5 w-3.5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all"
                  strokeWidth={2}
                />
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-0.5">
                14 Traits
              </div>
              <div className="font-serif text-sm font-semibold">Full library</div>
            </Card>
          </Link>
        </div>
      </div>

      {/* Mobile progress */}
      <Card className="p-5 mb-6 md:hidden flex items-center gap-5">
        <ProgressRing value={pct} size={90} strokeWidth={8} label={`${pct}%`} sublabel={`Trait ${focusTraitId}`} />
        <div>
          <div className="text-xs uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
            Your progress
          </div>
          <div className="font-serif text-lg font-semibold">
            {answered} of {total} questions answered
          </div>
          <div className="text-xs text-[var(--muted-foreground)]">
            Keep going at your own pace.
          </div>
        </div>
      </Card>

      {/* Journey timeline */}
      <Card className="p-5 md:p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-0.5 flex items-center gap-1.5">
              <Map className="h-3 w-3" strokeWidth={2} />
              The seven-month arc
            </div>
            <h2 className="font-serif text-lg font-semibold">Where we are as a group</h2>
          </div>
          <Link href="/calendar">
            <Button variant="ghost" size="sm">
              Full calendar
              <ArrowRight className="h-3 w-3" strokeWidth={2} />
            </Button>
          </Link>
        </div>
        <JourneyTimeline className="w-full h-auto" />
      </Card>

      {/* Secondary row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Affirmation */}
        <Card className="p-6 bg-[var(--muted)]/40 border-[var(--sage)]/30">
          <div className="flex items-center gap-2 mb-3">
            <Feather className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
              Reparenting affirmation · today
            </div>
          </div>
          <p className="font-serif text-xl md:text-2xl leading-snug text-[var(--foreground)] italic">
            &ldquo;{affirmation}&rdquo;
          </p>
        </Card>

        {/* Continue where you left off */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
              Continue where you left off
            </div>
          </div>
          {lastEntry ? (
            <div>
              <p className="font-serif text-base leading-snug text-[var(--foreground)] line-clamp-3 mb-3">
                {lastEntry.content}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-xs text-[var(--muted-foreground)]">
                  Trait {lastEntry.traitId} ·{" "}
                  {new Date(lastEntry.updatedAt).toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <Link href={`/traits/${lastEntry.traitId}`}>
                  <Button variant="ghost" size="sm">
                    Resume
                    <ArrowRight className="h-3 w-3" strokeWidth={2} />
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-[var(--muted-foreground)] mb-3">
                Nothing here yet. Start with the first question when you&apos;re ready.
              </p>
              <Link href={`/traits/${focusTraitId}`}>
                <Button variant="subtle" size="sm">
                  Begin Trait {focusTraitId}
                  <ArrowRight className="h-3 w-3" strokeWidth={2} />
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>

      {/* Activity summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <ActivityTile icon={BookOpen} label="Reflections" value={Object.keys(journal).length} />
        <ActivityTile icon={Sparkles} label="Feelings logged" value={feelings.length} />
        <ActivityTile icon={LineChart} label="Triggers logged" value={triggers.length} />
        <ActivityTile
          icon={CalendarIcon}
          label="Next meeting"
          value={next && daysUntilNext !== null ? `${daysUntilNext}d` : "—"}
        />
      </div>
    </div>
  );
}

function ActivityTile({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string | number;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--muted)]">
          <Icon className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
        </div>
      </div>
      <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-0.5">
        {label}
      </div>
      <div className="font-serif text-lg font-semibold">{value}</div>
    </Card>
  );
}

