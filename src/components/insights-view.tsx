"use client";

import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { useAppStore } from "@/store/app-store";
import { Card } from "@/components/ui/card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { AggregateInsights } from "@/components/aggregate-insights";
import { STEPS, PHASE_META } from "@/data/steps";
import {
  stepProgress,
  resentmentsByCategory,
  amendsCounts,
} from "@/lib/selectors";

export function InsightsView() {
  const state = useAppStore();

  const resentmentData = Object.entries(resentmentsByCategory(state)).map(([k, v]) => ({
    name: k,
    count: v,
  }));
  const readinessData = state.readiness.map((r, i) => ({
    name: r.defect.slice(0, 12) || `#${i + 1}`,
    readiness: r.readiness,
  }));
  const ccData = [...state.consciousContact]
    .reverse()
    .map((c, i) => ({ name: `#${i + 1}`, delta: c.calmAfter - c.calmBefore }));
  const amends = amendsCounts(state);

  // 30-day journaling rhythm
  const byDay: Record<string, number> = {};
  Object.values(state.journal).forEach((j) => {
    if (j.content.trim()) {
      const d = new Date(j.updatedAt).toDateString();
      byDay[d] = (byDay[d] ?? 0) + 1;
    }
  });
  const rhythm = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return { name: `${d.getMonth() + 1}/${d.getDate()}`, entries: byDay[d.toDateString()] ?? 0 };
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-2">Insights</h1>
        <p className="text-[var(--muted-foreground)] max-w-2xl">
          A private mirror of your own work — drawn entirely from this device. Empty is normal;
          it fills as you go.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {/* Per-step rings */}
          <Card className="p-6">
            <h2 className="font-serif text-xl font-semibold mb-4">Progress by Step</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {STEPS.map((step) => (
                <Link key={step.id} href={`/steps/${step.id}`} className="flex flex-col items-center">
                  <ProgressRing
                    value={stepProgress(state, step.id)}
                    size={64}
                    strokeWidth={6}
                    label={`${step.id}`}
                    color={PHASE_META[step.phase].color}
                  />
                  <span className="text-[10px] text-[var(--muted-foreground)] mt-1 text-center leading-tight">
                    {step.shortName}
                  </span>
                </Link>
              ))}
            </div>
          </Card>

          {/* Resentments by category */}
          <Card className="p-6">
            <h2 className="font-serif text-xl font-semibold mb-1">Resentments by category</h2>
            <p className="text-xs text-[var(--muted-foreground)] mb-4">
              From your Step 4 inventory — what your resentments threaten.
            </p>
            {resentmentData.length === 0 ? (
              <EmptyChart hint="Log resentments in the Step 4 exercise to see this." />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={resentmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="var(--accent)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Defect readiness */}
            <Card className="p-6">
              <h2 className="font-serif text-lg font-semibold mb-1">Defect readiness</h2>
              <p className="text-xs text-[var(--muted-foreground)] mb-4">Step 6</p>
              {readinessData.length === 0 ? (
                <EmptyChart hint="Rate defects in the Step 6 exercise." small />
              ) : (
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={readinessData} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={80}
                      tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    />
                    <Tooltip />
                    <Bar dataKey="readiness" fill="var(--sage)" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Card>

            {/* Conscious contact trend */}
            <Card className="p-6">
              <h2 className="font-serif text-lg font-semibold mb-1">Conscious-contact trend</h2>
              <p className="text-xs text-[var(--muted-foreground)] mb-4">Step 11 · calm gained</p>
              {ccData.length === 0 ? (
                <EmptyChart hint="Log sessions in the Step 11 exercise." small />
              ) : (
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={ccData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                    <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="delta" stroke="var(--primary)" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </Card>
          </div>

          {/* Amends board */}
          <Card className="p-6">
            <h2 className="font-serif text-xl font-semibold mb-4">Amends board (Step 9)</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                ["Willing", amends.willing, "var(--accent)"],
                ["Planned", amends.planned, "#D4A84B"],
                ["Made", amends.made, "var(--sage)"],
              ].map(([label, val, color]) => (
                <div key={label as string} className="rounded-lg bg-[var(--muted)]/50 p-4 text-center">
                  <div className="font-serif text-3xl font-semibold" style={{ color: color as string }}>
                    {val as number}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    {label as string}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Journaling rhythm */}
          <Card className="p-6">
            <h2 className="font-serif text-xl font-semibold mb-1">30-day journaling rhythm</h2>
            <p className="text-xs text-[var(--muted-foreground)] mb-4">
              Reflection answers saved per day.
            </p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={rhythm}>
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} interval={4} />
                <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                <Tooltip />
                <Bar dataKey="entries" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Aggregate side panel */}
        <div>
          <h2 className="font-serif text-xl font-semibold mb-4">At a glance</h2>
          <AggregateInsights />
        </div>
      </div>
    </div>
  );
}

function EmptyChart({ hint, small }: { hint: string; small?: boolean }) {
  return (
    <div
      className="flex items-center justify-center text-center text-sm text-[var(--muted-foreground)] italic border border-dashed border-[var(--border)] rounded-lg"
      style={{ height: small ? 140 : 200 }}
    >
      <span className="px-6">{hint}</span>
    </div>
  );
}
