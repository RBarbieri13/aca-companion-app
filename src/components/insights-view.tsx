"use client";

import { useMemo } from "react";
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
import { TRAITS } from "@/data/traits";
import { TRAIT_1_QUESTIONS } from "@/data/questions";
import { FEELING_WHEEL } from "@/data/feelings";

export function InsightsView() {
  const journal = useAppStore((s) => s.journal);
  const feelings = useAppStore((s) => s.feelings);

  const trait1Total = TRAIT_1_QUESTIONS.length;
  const trait1Answered = useMemo(() => {
    let n = 0;
    for (const q of TRAIT_1_QUESTIONS) {
      const key = `${q.traitId}::${q.quadrant}::${q.index}`;
      if (journal[key]?.content.trim().length) n++;
    }
    return n;
  }, [journal]);

  // Intensity line data (by day)
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

  // Entries per day last 30 days
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

  // Tag frequency
  const tagFreq = useMemo(() => {
    const counts = new Map<string, number>();
    for (const e of Object.values(journal)) {
      for (const t of e.tags ?? []) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [journal]);

  // Feelings by category
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
  const totalEntries = Object.keys(journal).length;

  return (
    <div className="space-y-6">
      {/* Per-trait progress rings */}
      <Card className="p-6">
        <div className="mb-5">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
            Trait progress
          </div>
          <h2 className="font-serif text-xl font-semibold">Where you are in the workbook</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
          {TRAITS.map((t) => {
            const pct =
              t.id === 1 ? Math.round((trait1Answered / trait1Total) * 100) : 0;
            return (
              <div key={t.id} className="flex flex-col items-center">
                <ProgressRing
                  value={pct}
                  size={72}
                  strokeWidth={6}
                  color={
                    t.active
                      ? "var(--primary)"
                      : "var(--muted-foreground)"
                  }
                  label={`${pct}%`}
                />
                <div className="mt-2 text-[10px] text-center text-[var(--muted-foreground)] font-medium">
                  Trait {t.id}
                </div>
              </div>
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
                  <XAxis
                    dataKey="date"
                    stroke="var(--muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                    domain={[1, 5]}
                  />
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
                <XAxis
                  dataKey="label"
                  stroke="var(--muted-foreground)"
                  fontSize={10}
                  tickLine={false}
                  interval={4}
                />
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
    </div>
  );
}
