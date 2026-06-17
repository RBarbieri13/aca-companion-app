"use client";

import Link from "next/link";
import { useAppStore } from "@/store/app-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import {
  ArrowRight,
  Sparkles,
  HeartHandshake,
  Map as MapIcon,
  CalendarDays,
} from "lucide-react";
import { STEPS, getStep, PHASE_META } from "@/data/steps";
import { AFFIRMATIONS } from "@/data/affirmations";
import { overallProgress, stepProgress } from "@/lib/selectors";
import { daysBetween, parseLocalDate } from "@/lib/utils";

function dayOfYear(d = new Date()) {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86400000);
}

export function DashboardView() {
  const state = useAppStore();
  const current = getStep(state.currentStepId) ?? STEPS[0];
  const overall = overallProgress(state);
  const affirmation = AFFIRMATIONS[dayOfYear() % AFFIRMATIONS.length];
  const sobrietyDays =
    state.sobrietyDate != null
      ? daysBetween(parseLocalDate(state.sobrietyDate), new Date())
      : null;

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm text-[var(--muted-foreground)] mb-1">Welcome back</p>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold">The Twelve Steps Companion</h1>
      </div>

      {/* Top row */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        {/* Current step spotlight */}
        <Card className="p-6 md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold mb-2">
              Your current Step
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary)] text-[var(--primary-foreground)] font-serif text-2xl font-semibold">
                {current.id}
              </div>
              <div>
                <h2 className="font-serif text-2xl font-semibold leading-tight">
                  {current.shortName}
                </h2>
                <p className="text-sm text-[var(--foreground)]/75 italic mt-1 max-w-md">
                  {current.essence.step}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <Badge variant="sage">{current.principle}</Badge>
                  <Badge variant="muted">{PHASE_META[current.phase].label}</Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <Link href={`/steps/${current.id}`}>
              <Button size="sm">
                Open Step {current.id}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </Button>
            </Link>
            <Link href={`/exercises?step=${current.id}`}>
              <Button variant="outline" size="sm">
                Exercise
              </Button>
            </Link>
          </div>
        </Card>

        {/* Overall progress */}
        <Card className="p-6 flex flex-col items-center justify-center text-center">
          <ProgressRing value={overall} label={`${overall}%`} sublabel="overall" size={120} />
          <p className="text-xs text-[var(--muted-foreground)] mt-3">
            Across all twelve Steps
          </p>
          <Link href="/insights" className="mt-2">
            <Button variant="ghost" size="sm">
              See insights
            </Button>
          </Link>
        </Card>
      </div>

      {/* Sobriety + affirmation */}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card className="p-6">
          <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold mb-2">
            Today&apos;s reflection
          </div>
          <p className="font-serif text-xl leading-relaxed text-[var(--foreground)]">
            &ldquo;{affirmation}&rdquo;
          </p>
          <Link href="/exercises" className="inline-block mt-3">
            <Button variant="ghost" size="sm">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
              More in the daily library
            </Button>
          </Link>
        </Card>

        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold mb-2">
              Sobriety
            </div>
            {sobrietyDays != null ? (
              <div>
                <div className="font-serif text-4xl font-semibold text-[var(--primary)]">
                  {sobrietyDays}
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  day{sobrietyDays === 1 ? "" : "s"} — one at a time
                </p>
              </div>
            ) : (
              <p className="text-sm text-[var(--muted-foreground)]">
                Set a sobriety date to start a gentle day counter. There&apos;s no wrong number — today
                counts.
              </p>
            )}
          </div>
          <Link href="/calendar" className="inline-block mt-3">
            <Button variant="outline" size="sm">
              <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.75} />
              {sobrietyDays != null ? "View calendar" : "Set sobriety date"}
            </Button>
          </Link>
        </Card>
      </div>

      {/* Today's small practice */}
      <Card className="p-6 mb-6">
        <h2 className="font-serif text-xl font-semibold mb-1">Today&apos;s small practice</h2>
        <p className="text-sm text-[var(--muted-foreground)] mb-4">
          One light thing. Pick whatever fits the day.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { href: "/exercises?step=10", label: "Nightly 10th-Step", desc: "A 30-second spot-check", icon: HeartHandshake },
            { href: "/exercises", label: "Gratitude / HALT", desc: "From the daily library", icon: Sparkles },
            { href: "/map", label: "Explore the map", desc: "See how it connects", icon: MapIcon },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Card className="p-4 h-full hover:bg-[var(--muted)]/30 transition-colors">
                  <Icon className="h-5 w-5 text-[var(--accent)] mb-2" strokeWidth={1.75} />
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className="text-xs text-[var(--muted-foreground)]">{item.desc}</div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Card>

      {/* Mini step strip */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl font-semibold">Jump to a Step</h2>
          <Link href="/steps">
            <Button variant="ghost" size="sm">
              All Steps & map
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Button>
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {STEPS.map((s) => {
            const p = stepProgress(state, s.id);
            return (
              <Link key={s.id} href={`/steps/${s.id}`}>
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl border-2 font-serif font-semibold text-sm transition-colors hover:bg-[var(--muted)]"
                  style={{
                    borderColor: PHASE_META[s.phase].color,
                    background: p >= 80 ? PHASE_META[s.phase].color : "transparent",
                    color: p >= 80 ? "var(--card)" : "var(--foreground)",
                  }}
                  title={`Step ${s.id}: ${s.shortName} — ${p}%`}
                >
                  {s.id}
                </div>
              </Link>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
