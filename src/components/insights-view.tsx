"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/ui/progress-ring";
import { useAppStore } from "@/store/app-store";
import { TRAITS, TRAIT_THEMES, THEME_META } from "@/data/traits";
import { ALL_QUESTIONS } from "@/data/questions";
import { FEELING_WHEEL } from "@/data/feelings";
import { ThemeRing } from "@/components/infographics/theme-ring";
import { TraitMatrix } from "@/components/infographics/trait-matrix";
import { RecoveryTopography } from "@/components/infographics/recovery-topography";
import { QuadrantRadar } from "@/components/infographics/quadrant-radar";
import type { Quadrant } from "@/lib/types";

export function InsightsView() {
  const journal = useAppStore((s) => s.journal);
  const feelings = useAppStore((s) => s.feelings);
  const triggers = useAppStore((s) => s.triggers);
  const sanctuaryCheckIns = useAppStore((s) => s.sanctuaryCheckIns);

  // --- Per-trait progress (used in multiple places) -----------------
  const traitProgress = useMemo(() => {
    const result: Record<number, { total: number; answered: number; pct: number }> = {};
    for (const trait of TRAITS) {
      const qs = ALL_QUESTIONS.filter((q) => q.traitId === trait.id);
      if (qs.length === 0) {
        result[trait.id] = { total: 0, answered: 0, pct: 0 };
        continue;
      }
      let answered = 0;
      for (const q of qs) {
        const key = `${q.traitId}::${q.quadrant}::${q.index}`;
        if (journal[key]?.content.trim().length) answered++;
      }
      result[trait.id] = {
        total: qs.length,
        answered,
        pct: Math.round((answered / qs.length) * 100),
      };
    }
    return result;
  }, [journal]);

  // --- Theme Ring: count reflections per theme ----------------------
  const themeData = useMemo(() => {
    const counts: Record<string, number> = { fear: 0, identity: 0, attachment: 0, feeling: 0, family: 0 };
    for (const e of Object.values(journal)) {
      if (!e.content.trim().length) continue;
      const theme = TRAIT_THEMES[e.traitId];
      if (theme) counts[theme]++;
    }
    // Triggers tagged with a trait also count
    for (const t of triggers) {
      if (t.traitId) {
        const theme = TRAIT_THEMES[t.traitId];
        if (theme) counts[theme]++;
      }
    }
    return (Object.keys(THEME_META) as (keyof typeof THEME_META)[]).map((key) => ({
      id: key,
      name: THEME_META[key].name,
      color: THEME_META[key].color,
      count: counts[key] ?? 0,
    }));
  }, [journal, triggers]);

  // --- Trait Interaction Matrix -------------------------------------
  // For each pair of traits (i, j), count how many tags appear in BOTH traits' journals.
  const matrix = useMemo(() => {
    const tagsByTrait: Record<number, Set<string>> = {};
    for (const e of Object.values(journal)) {
      if (!e.tags?.length) continue;
      if (!tagsByTrait[e.traitId]) tagsByTrait[e.traitId] = new Set();
      for (const t of e.tags) tagsByTrait[e.traitId].add(t.toLowerCase());
    }
    const m: number[][] = Array.from({ length: 14 }, () => Array(14).fill(0));
    for (let i = 0; i < 14; i++) {
      const ti = i + 1;
      for (let j = 0; j < 14; j++) {
        if (i === j) continue;
        const tj = j + 1;
        const a = tagsByTrait[ti];
        const b = tagsByTrait[tj];
        if (!a || !b) continue;
        let shared = 0;
        for (const t of a) if (b.has(t)) shared++;
        m[i][j] = shared;
      }
    }
    return m;
  }, [journal]);

  const hasTagCrossover = matrix.flat().some((v) => v > 0);

  // --- Recovery Topography ------------------------------------------
  // Engagement per trait = reflection % (0-100). Later we can layer in exercise density.
  const engagement = useMemo(
    () => Array.from({ length: 14 }, (_, i) => traitProgress[i + 1]?.pct ?? 0),
    [traitProgress]
  );
  const anyEngagement = engagement.some((e) => e > 0);

  // --- Quadrant Balance Radar (per currently-selected trait) --------
  const [radarTraitId, setRadarTraitId] = useState<number>(() => {
    // Default to the first trait that has any journal content, else Trait 1
    const activeTraits = TRAITS.filter((t) => t.active);
    for (const t of activeTraits) {
      const qs = ALL_QUESTIONS.filter((q) => q.traitId === t.id);
      if (qs.some((q) => journal[`${q.traitId}::${q.quadrant}::${q.index}`]?.content.trim().length)) {
        return t.id;
      }
    }
    return activeTraits[0]?.id ?? 1;
  });

  const radarValues = useMemo<[number, number, number, number]>(() => {
    const qs: Quadrant[] = ["laundry", "other", "flipSide", "flipSideOther"];
    return qs.map((q) => {
      const pool = ALL_QUESTIONS.filter((x) => x.traitId === radarTraitId && x.quadrant === q);
      if (pool.length === 0) return 0;
      let answered = 0;
      for (const x of pool) {
        if (journal[`${x.traitId}::${x.quadrant}::${x.index}`]?.content.trim().length) answered++;
      }
      return Math.round((answered / pool.length) * 100);
    }) as [number, number, number, number];
  }, [radarTraitId, journal]);

  // --- Legacy detail data (kept below the big picture) --------------
  const intensityData = useMemo(() => {
    const byDay = new Map<string, { date: string; avg: number; count: number; sum: number }>();
    for (const e of Object.values(journal)) {
      if (!e.intensity) continue;
      const day = e.updatedAt.slice(0, 10);
      const existing = byDay.get(day) ?? { date: day, avg: 0, count: 0, sum: 0 };
      existing.count += 1;
      existing.sum += e.intensity;
      existing.avg = existing.sum / existing.count;
      byDay.set(day, existing);
    }
    return Array.from(byDay.values())
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((d) => ({
        date: new Date(d.date).toLocaleDateString([], { month: "short", day: "numeric" }),
        intensity: Number(d.avg.toFixed(2)),
      }));
  }, [journal]);

  const entriesPerDay = useMemo(() => {
    const today = new Date();
    const days: { date: string; label: string; count: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({
        date: key,
        label: d.toLocaleDateString([], { month: "short", day: "numeric" }),
        count: 0,
      });
    }
    const map = new Map(days.map((d) => [d.date, d]));
    for (const e of Object.values(journal)) {
      const day = e.updatedAt.slice(0, 10);
      const bucket = map.get(day);
      if (bucket) bucket.count += 1;
    }
    return days;
  }, [journal]);

  const tagFreq = useMemo(() => {
    const counts = new Map<string, number>();
    for (const e of Object.values(journal)) {
      for (const t of e.tags ?? []) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [journal]);

  const feelingsByCategory = useMemo(() => {
    const counts = new Map<string, number>();
    for (const f of feelings) counts.set(f.category, (counts.get(f.category) ?? 0) + 1);
    return FEELING_WHEEL.map((c) => ({
      category: c.name,
      count: counts.get(c.name) ?? 0,
      color: c.color,
    }));
  }, [feelings]);

  const maxTag = tagFreq[0]?.count ?? 1;
  const totalEntries = Object.values(journal).filter((e) => e.content.trim().length).length;

  const activeTraits = TRAITS.filter((t) => t.active);

  return (
    <div className="space-y-6">
      {/* ---------- BIG PICTURE ---------- */}

      {/* Row 1: Theme Families Ring + Recovery Topography */}
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-6">
        {/* Theme Families Ring */}
        <Card className="p-6">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-0.5">
              Big picture · Theme families
            </div>
            <h2 className="font-serif text-lg font-semibold">Where your energy lives</h2>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mt-1">
              The 14 traits cluster into five thematic families. The ring shows which ones
              you&apos;ve engaged with most so far.
            </p>
          </div>
          <div className="flex justify-center">
            <ThemeRing themes={themeData} className="max-w-full h-auto w-[260px]" />
          </div>
          <div className="mt-5 space-y-2">
            {themeData.map((theme) => {
              const total = themeData.reduce((s, t) => s + t.count, 0) || 1;
              const pct = Math.round((theme.count / total) * 100);
              return (
                <div key={theme.id} className="flex items-center gap-3">
                  <span
                    className="inline-block h-3 w-3 rounded-full shrink-0"
                    style={{ background: theme.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2 mb-0.5">
                      <span className="text-sm font-semibold" style={{ color: theme.color }}>
                        {theme.name}
                      </span>
                      <span className="text-xs text-[var(--muted-foreground)]">
                        {theme.count} · {pct}%
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-[var(--muted)] overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: theme.color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recovery Topography */}
        <Card className="p-6">
          <div className="mb-4 flex items-start justify-between flex-wrap gap-2">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-0.5">
                Big picture · Recovery topography
              </div>
              <h2 className="font-serif text-lg font-semibold">Your landscape of engagement</h2>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mt-1 max-w-lg">
                Each trait is a peak. The altitude is how much of that trait&apos;s reflection work
                you&apos;ve done. Some peaks stay tall; some stay low. Both mean something.
              </p>
            </div>
          </div>
          {anyEngagement ? (
            <RecoveryTopography engagement={engagement} className="w-full h-auto" />
          ) : (
            <div className="h-48 flex items-center justify-center text-sm text-[var(--muted-foreground)] italic border border-dashed border-[var(--border)] rounded-lg">
              Your landscape will shape itself as you reflect.
            </div>
          )}
        </Card>
      </div>

      {/* Row 2: Trait Interaction Matrix + Quadrant Balance Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6">
        {/* Trait Matrix */}
        <Card className="p-6">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-0.5">
              Big picture · Trait crossover
            </div>
            <h2 className="font-serif text-lg font-semibold">How your traits talk to each other</h2>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mt-1">
              When you tag reflections (e.g., &ldquo;mom,&rdquo; &ldquo;work,&rdquo; &ldquo;shame&rdquo;),
              the same tag often shows up across multiple traits — that&apos;s where this matrix
              lights up. Darker cells = more shared tags between those two traits.
            </p>
          </div>
          {hasTagCrossover ? (
            <div className="overflow-x-auto -mx-2 px-2">
              <TraitMatrix matrix={matrix} className="w-full max-w-md mx-auto h-auto" />
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-sm text-[var(--muted-foreground)] italic text-center border border-dashed border-[var(--border)] rounded-lg p-4">
              Add tags to your reflections (e.g. &ldquo;mom,&rdquo; &ldquo;work&rdquo;). When the
              same tag shows up under different traits, it&apos;ll appear here.
            </div>
          )}
        </Card>

        {/* Quadrant Radar */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-0.5">
                Big picture · Quadrant balance
              </div>
              <h2 className="font-serif text-lg font-semibold">Wound work vs. recovery work</h2>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mt-1">
                Where your reflections cluster across each trait&apos;s four quadrants.
              </p>
            </div>
            {activeTraits.length > 1 && (
              <select
                value={radarTraitId}
                onChange={(e) => setRadarTraitId(Number(e.target.value))}
                className="h-8 rounded-md border border-[var(--border)] bg-[var(--card)] px-2 text-xs font-medium"
              >
                {activeTraits.map((t) => (
                  <option key={t.id} value={t.id}>
                    Trait {t.id} · {t.shortName}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex justify-center">
            <QuadrantRadar
              values={radarValues}
              label={`Trait ${radarTraitId}: ${TRAITS.find((t) => t.id === radarTraitId)?.shortName}`}
              className="max-w-full h-auto w-[220px]"
            />
          </div>
        </Card>
      </div>

      {/* ---------- DETAIL ---------- */}
      <div className="pt-6 mt-6 border-t border-[var(--border)]">
        <div className="mb-4">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-0.5">
            Detail
          </div>
          <h2 className="font-serif text-xl font-semibold">Trait-by-trait</h2>
        </div>
      </div>

      {/* Per-trait progress rings */}
      <Card className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
              Progress
            </div>
            <h2 className="font-serif text-lg font-semibold">Where you are in the workbook</h2>
          </div>
          <Link href="/traits" className="text-xs text-[var(--primary)] font-medium hover:underline">
            All traits →
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
          {TRAITS.map((t) => {
            const pct = traitProgress[t.id]?.pct ?? 0;
            const Wrapper: React.ElementType = t.active ? Link : "div";
            const wrapperProps = t.active ? { href: `/traits/${t.id}` } : {};
            return (
              <Wrapper
                key={t.id}
                {...wrapperProps}
                className={t.active ? "flex flex-col items-center group" : "flex flex-col items-center"}
              >
                <ProgressRing
                  value={pct}
                  size={72}
                  strokeWidth={6}
                  color={t.active ? "var(--primary)" : "var(--muted-foreground)"}
                  label={`${pct}%`}
                />
                <div className="mt-2 text-[10px] text-center text-[var(--muted-foreground)] font-medium">
                  Trait {t.id}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Intensity line */}
        <Card className="p-6">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
              Emotional intensity
            </div>
            <h2 className="font-serif text-lg font-semibold">Average per day</h2>
          </div>
          {intensityData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-sm text-[var(--muted-foreground)]">
              Mark intensity on your reflection answers to see a trend here.
            </div>
          ) : (
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={intensityData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} domain={[1, 5]} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="intensity"
                    stroke="var(--accent)"
                    strokeWidth={2}
                    dot={{ fill: "var(--accent)", r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        {/* Entries per day */}
        <Card className="p-6">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
              Journaling rhythm
            </div>
            <h2 className="font-serif text-lg font-semibold">Last 30 days</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={entriesPerDay} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                <XAxis dataKey="label" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} interval={4} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-[var(--muted-foreground)] mt-2">
            {totalEntries} total reflection entries
          </div>
        </Card>

        {/* Feelings by category */}
        <Card className="p-6">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
              Feelings logged
            </div>
            <h2 className="font-serif text-lg font-semibold">By family</h2>
          </div>
          {feelings.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-sm text-[var(--muted-foreground)]">
              Log feelings from the wheel to see this chart.
            </div>
          ) : (
            <div className="space-y-3">
              {feelingsByCategory.map((f) => {
                const max = Math.max(...feelingsByCategory.map((x) => x.count), 1);
                const pct = (f.count / max) * 100;
                return (
                  <div key={f.category}>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-sm font-medium" style={{ color: f.color }}>
                        {f.category}
                      </span>
                      <span className="text-xs text-[var(--muted-foreground)]">{f.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--muted)] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: f.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Tag cloud */}
        <Card className="p-6">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
              Themes you&apos;ve named
            </div>
            <h2 className="font-serif text-lg font-semibold">Tag frequency</h2>
          </div>
          {tagFreq.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-sm text-[var(--muted-foreground)]">
              Add tags to your reflections to see themes here.
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {tagFreq.map(({ tag, count }) => {
                const scale = 0.9 + (count / maxTag) * 1.3;
                return (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--muted)]/50 px-3 py-1 font-serif"
                    style={{ fontSize: `${scale * 0.9}rem` }}
                  >
                    {tag}
                    <Badge variant="muted" className="text-[10px]">
                      {count}
                    </Badge>
                  </span>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      {/* Sanctuary check-in stats (if any) */}
      {sanctuaryCheckIns.length > 0 && (
        <Card className="p-6">
          <div className="mb-3">
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
              Trait 2 · Sanctuary check-ins
            </div>
            <h2 className="font-serif text-lg font-semibold">
              {sanctuaryCheckIns.length} weekly check-in
              {sanctuaryCheckIns.length === 1 ? "" : "s"} logged
            </h2>
          </div>
          <p className="text-sm text-[var(--muted-foreground)]">
            Latest:{" "}
            <strong className="text-[var(--foreground)]">
              {sanctuaryCheckIns[0].value}
            </strong>{" "}
            — leaning {sanctuaryCheckIns[0].value >= 50 ? "sanctuary" : "prison"}
          </p>
        </Card>
      )}
    </div>
  );
}
