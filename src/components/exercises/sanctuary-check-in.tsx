"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Home, Lock, Trash2 } from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { startOfWeek, format, parseISO } from "date-fns";

function weekOfISO(d: Date = new Date()) {
  return format(startOfWeek(d, { weekStartsOn: 0 }), "yyyy-MM-dd");
}

export function SanctuaryCheckIn() {
  const checkIns = useAppStore((s) => s.sanctuaryCheckIns);
  const log = useAppStore((s) => s.logSanctuaryCheckIn);
  const del = useAppStore((s) => s.deleteSanctuaryCheckIn);

  const thisWeek = weekOfISO();
  const existing = checkIns.find((c) => c.weekOf === thisWeek);

  const [value, setValue] = useState<number>(existing?.value ?? 50);
  const [note, setNote] = useState<string>(existing?.note ?? "");

  const chartData = useMemo(() => {
    return [...checkIns]
      .sort((a, b) => a.weekOf.localeCompare(b.weekOf))
      .map((c) => ({
        week: format(parseISO(c.weekOf), "MMM d"),
        value: c.value,
      }));
  }, [checkIns]);

  const label = value < 25
    ? "mostly prison"
    : value < 50
    ? "leaning prison"
    : value === 50
    ? "both · neither"
    : value < 75
    ? "leaning sanctuary"
    : "mostly sanctuary";

  const color = value < 40 ? "var(--accent)" : value > 60 ? "var(--sage)" : "var(--muted-foreground)";

  return (
    <div>
      <Card className="p-5 md:p-6 mb-6 bg-[var(--muted)]/30">
        <div className="flex items-center gap-2 mb-2">
          <Home className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          Trait 2&apos;s Flip Side of the Other asks:{" "}
          <em>&ldquo;When you are alone, do you feel more like it is a prison — or a sanctuary?&rdquo;</em>
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          Answer the question once a week. Over time the chart below shows how your relationship to
          being alone is changing. Not as performance metrics — as quiet data.
        </p>
      </Card>

      <Card className="p-5 md:p-6 mb-6">
        <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
          Check-in · Week of {format(parseISO(thisWeek), "MMM d, yyyy")}
        </div>
        <h2 className="font-serif text-xl font-semibold mb-5">
          When you were alone this week, how did it feel?
        </h2>

        <div className="relative mb-2">
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-[var(--accent)] via-[var(--muted-foreground)] to-[var(--sage)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
            aria-label="Prison to sanctuary slider"
          />
        </div>
        <div className="grid grid-cols-3 text-xs font-medium mb-5">
          <div className="text-left">
            <Lock className="inline h-3 w-3 mr-1 -mt-0.5 text-[var(--accent)]" strokeWidth={2} />
            <span className="text-[var(--accent)]">Prison</span>
          </div>
          <div className="text-center text-[var(--muted-foreground)]">both · neither</div>
          <div className="text-right">
            <span className="text-[var(--sage)]">Sanctuary</span>
            <Home className="inline h-3 w-3 ml-1 -mt-0.5 text-[var(--sage)]" strokeWidth={2} />
          </div>
        </div>

        <div className="text-center mb-5">
          <div
            className="inline-flex items-baseline gap-2 rounded-full border px-4 py-1.5"
            style={{ borderColor: color, color }}
          >
            <span className="font-serif text-2xl font-semibold">{value}</span>
            <span className="text-xs font-medium uppercase tracking-wider">· {label}</span>
          </div>
        </div>

        <label className="block mb-4">
          <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
            A word or two about why (optional)
          </div>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="What made it feel more one way than the other?"
            className="journal-input"
          />
        </label>

        <div className="flex justify-end">
          <Button onClick={() => log(thisWeek, value, note)}>
            {existing ? "Update this week's check-in" : "Save check-in"}
          </Button>
        </div>
      </Card>

      {/* Trend */}
      <Card className="p-5 md:p-6">
        <div className="mb-4">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-0.5">
            Your trend
          </div>
          <h2 className="font-serif text-lg font-semibold">Sanctuary over time</h2>
        </div>
        {chartData.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-sm text-[var(--muted-foreground)] italic">
            Your check-ins will chart here.
          </div>
        ) : (
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <XAxis
                  dataKey="week"
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                />
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
                  dataKey="value"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  dot={{ fill: "var(--primary)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>

      {/* History */}
      {checkIns.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            Past check-ins
          </div>
          <div className="space-y-2">
            {checkIns.slice(0, 10).map((c) => (
              <Card key={c.id} className="p-4 flex items-start gap-4">
                <div className="text-xs text-[var(--muted-foreground)] font-medium w-24 shrink-0">
                  {format(parseISO(c.weekOf), "MMM d, yyyy")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      style={{
                        background:
                          c.value < 40
                            ? "var(--accent)"
                            : c.value > 60
                            ? "var(--sage)"
                            : "var(--muted)",
                        color: c.value < 40 ? "white" : "var(--primary)",
                      }}
                    >
                      {c.value}
                    </Badge>
                    <span className="text-xs text-[var(--muted-foreground)]">
                      {c.value < 25
                        ? "mostly prison"
                        : c.value < 50
                        ? "leaning prison"
                        : c.value === 50
                        ? "both · neither"
                        : c.value < 75
                        ? "leaning sanctuary"
                        : "mostly sanctuary"}
                    </span>
                  </div>
                  {c.note && (
                    <p className="text-sm text-[var(--foreground)]/80 font-journal leading-relaxed">
                      {c.note}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => del(c.id)}
                  className="p-1.5 rounded text-[var(--muted-foreground)] hover:text-[var(--accent)]"
                  aria-label="Delete check-in"
                >
                  <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
