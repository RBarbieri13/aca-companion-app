"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Moon, Trash2, CheckCircle2 } from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { AloneInQuiet } from "@/components/infographics/alone-in-quiet";
import { format } from "date-fns";
import { parseLocalDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const DURATIONS = [2, 5, 10, 15, 20, 30];

function stateLabel(v: number) {
  if (v < 20) return "restless";
  if (v < 40) return "fidgety";
  if (v < 60) return "okay";
  if (v < 80) return "settled";
  return "spacious";
}

function stateColor(v: number) {
  if (v < 40) return "var(--accent)";
  if (v < 60) return "var(--muted-foreground)";
  return "var(--sage)";
}

export function SoloSitView() {
  const sits = useAppStore((s) => s.soloSits);
  const log = useAppStore((s) => s.logSoloSit);
  const del = useAppStore((s) => s.deleteSoloSit);

  const [duration, setDuration] = useState<number>(5);
  const [beforeState, setBeforeState] = useState<number>(40);
  const [afterState, setAfterState] = useState<number>(55);
  const [hadActivity, setHadActivity] = useState<boolean>(false);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  function reset() {
    setDuration(5);
    setBeforeState(40);
    setAfterState(55);
    setHadActivity(false);
    setNote("");
  }

  function save() {
    log({
      durationMinutes: duration,
      beforeState,
      afterState,
      hadActivity,
      note: note.trim(),
    });
    reset();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  const chartData = useMemo(() => {
    return [...sits]
      .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
      .map((s) => ({
        date: format(parseLocalDate(s.timestamp.slice(0, 10)), "MMM d"),
        after: s.afterState,
        before: s.beforeState,
      }));
  }, [sits]);

  const stats = useMemo(() => {
    const total = sits.length;
    if (total === 0) return { total, totalMinutes: 0, quietCount: 0, avgGain: 0, longestStreak: 0 };
    const totalMinutes = sits.reduce((acc, s) => acc + s.durationMinutes, 0);
    const quietCount = sits.filter((s) => !s.hadActivity).length;
    const avgGain = Math.round(
      sits.reduce((acc, s) => acc + (s.afterState - s.beforeState), 0) / total
    );
    return { total, totalMinutes, quietCount, avgGain, longestStreak: 0 };
  }, [sits]);

  return (
    <div>
      {/* How to practice */}
      <Card className="p-5 md:p-6 mb-6 bg-[var(--muted)]/30">
        <div className="flex items-center gap-2 mb-2">
          <Moon className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          The Flip Side of the Other Laundry List for Trait 5 asks: <em>&ldquo;Are you able to be
          alone, in silence, with nothing happening?&rdquo;</em> Most of us cannot do this at
          first — being alone meant something painful as children. The capacity is built, not
          granted. A few minutes a day, on purpose.
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          Pick a duration. Sit. Notice where you were before, and where you are after. Quiet
          counts most, but a walk or hum is fine to start.
        </p>
        <div className="mt-5 overflow-x-auto">
          <AloneInQuiet className="w-full h-auto min-w-[640px]" />
        </div>
      </Card>

      {/* Form */}
      <Card className="p-6 mb-4">
        <div className="grid grid-cols-1 gap-5">
          {/* duration */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              How long, in minutes?
            </div>
            <div className="flex flex-wrap gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-sm font-medium transition-all",
                    duration === d
                      ? "border-[var(--primary)] bg-[var(--primary)]/[0.06] text-[var(--foreground)]"
                      : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/80 hover:border-[var(--primary)]/40"
                  )}
                >
                  {d} min
                </button>
              ))}
            </div>
          </div>

          {/* before */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              Before — where were you?
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={beforeState}
              onChange={(e) => setBeforeState(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-[var(--accent)] via-[var(--muted-foreground)] to-[var(--sage)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
              aria-label="Before state slider"
            />
            <div className="mt-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold">
              <span className="text-[var(--accent)]">restless</span>
              <span style={{ color: stateColor(beforeState) }}>
                {beforeState} · {stateLabel(beforeState)}
              </span>
              <span className="text-[var(--sage)]">spacious</span>
            </div>
          </div>

          {/* after */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              After — where are you now?
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={afterState}
              onChange={(e) => setAfterState(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-[var(--accent)] via-[var(--muted-foreground)] to-[var(--sage)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
              aria-label="After state slider"
            />
            <div className="mt-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold">
              <span className="text-[var(--accent)]">restless</span>
              <span style={{ color: stateColor(afterState) }}>
                {afterState} · {stateLabel(afterState)}
              </span>
              <span className="text-[var(--sage)]">spacious</span>
            </div>
          </div>

          {/* mode */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              The session was…
            </div>
            <div className="grid grid-cols-2 gap-2 max-w-sm">
              <button
                type="button"
                onClick={() => setHadActivity(false)}
                className={cn(
                  "rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
                  !hadActivity
                    ? "border-[var(--sage)] bg-[var(--sage)]/10 text-[var(--sage)]"
                    : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/80 hover:border-[var(--sage)]/50"
                )}
              >
                Pure quiet
              </button>
              <button
                type="button"
                onClick={() => setHadActivity(true)}
                className={cn(
                  "rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
                  hadActivity
                    ? "border-[var(--primary)] bg-[var(--primary)]/[0.06] text-[var(--foreground)]"
                    : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/80 hover:border-[var(--primary)]/50"
                )}
              >
                Quiet activity
              </button>
            </div>
          </div>

          {/* note */}
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              A note (optional)
            </div>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="What came up? What did the quiet feel like?"
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end">
          <Button onClick={save}>
            {saved ? (
              <>
                <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                Logged
              </>
            ) : (
              "Log this sit"
            )}
          </Button>
        </div>
      </Card>

      {/* Stats */}
      {sits.length > 0 && (
        <Card className="p-5 md:p-6 mb-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-3">
            Your solo-sit practice
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="font-serif text-2xl font-semibold text-[var(--primary)]">{stats.total}</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                sessions
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl font-semibold text-[var(--primary)]">{stats.totalMinutes}</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                total minutes
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl font-semibold text-[var(--sage)]">{stats.quietCount}</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                pure quiet
              </div>
            </div>
            <div>
              <div
                className="font-serif text-2xl font-semibold"
                style={{ color: stats.avgGain >= 0 ? "var(--sage)" : "var(--accent)" }}
              >
                {stats.avgGain > 0 ? "+" : ""}
                {stats.avgGain}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                avg shift
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Trend */}
      {sits.length > 1 && (
        <Card className="p-5 md:p-6 mb-6">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-0.5">
              Your trend
            </div>
            <h2 className="font-serif text-lg font-semibold">Capacity for quiet, over time</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  domain={[0, 100]}
                  tickLine={false}
                  ticks={[0, 50, 100]}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <ReferenceLine y={50} stroke="var(--muted-foreground)" strokeDasharray="3 3" opacity={0.5} />
                <Line
                  type="monotone"
                  dataKey="before"
                  stroke="var(--accent)"
                  strokeWidth={1.5}
                  dot={{ fill: "var(--accent)", r: 3 }}
                  strokeDasharray="4 3"
                />
                <Line
                  type="monotone"
                  dataKey="after"
                  stroke="var(--sage)"
                  strokeWidth={2.5}
                  dot={{ fill: "var(--sage)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center justify-center gap-4 text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[var(--accent)]"></span> before
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[var(--sage)]"></span> after
            </span>
          </div>
        </Card>
      )}

      {/* History */}
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-xl font-semibold">Past sits</h2>
        <span className="text-xs text-[var(--muted-foreground)]">{sits.length} logged</span>
      </div>
      {sits.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          No sits logged yet. Start with two minutes today.
        </Card>
      ) : (
        <div className="space-y-3">
          {sits.map((s) => (
            <Card key={s.id} className="p-5 relative">
              <div className="flex items-start justify-between mb-2 pr-6 flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-serif text-base font-semibold">{s.durationMinutes} min</span>
                  <span
                    className="text-[11px] rounded-full px-2 py-0.5"
                    style={{
                      background: s.hadActivity ? "var(--muted)" : "var(--sage)",
                      color: s.hadActivity ? "var(--foreground)" : "white",
                    }}
                  >
                    {s.hadActivity ? "quiet activity" : "pure quiet"}
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                  {new Date(s.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
                </span>
              </div>

              {/* before/after bar */}
              <div className="flex items-center gap-3 mb-2 text-xs">
                <span className="font-medium" style={{ color: stateColor(s.beforeState) }}>
                  {s.beforeState}
                </span>
                <span className="text-[var(--muted-foreground)]">{stateLabel(s.beforeState)} →</span>
                <span className="font-medium" style={{ color: stateColor(s.afterState) }}>
                  {s.afterState}
                </span>
                <span className="text-[var(--muted-foreground)]">{stateLabel(s.afterState)}</span>
                {s.afterState - s.beforeState !== 0 && (
                  <span
                    className="ml-auto font-semibold"
                    style={{
                      color: s.afterState - s.beforeState > 0 ? "var(--sage)" : "var(--accent)",
                    }}
                  >
                    {s.afterState - s.beforeState > 0 ? "+" : ""}
                    {s.afterState - s.beforeState}
                  </span>
                )}
              </div>

              {s.note && (
                <p className="text-sm text-[var(--foreground)]/85 leading-relaxed font-journal">
                  {s.note}
                </p>
              )}
              <button
                onClick={() => del(s.id)}
                className="absolute top-3 right-3 p-1.5 rounded text-[var(--muted-foreground)]/60 hover:text-[var(--accent)]"
                aria-label="Delete sit"
              >
                <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
