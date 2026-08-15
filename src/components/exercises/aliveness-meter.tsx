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
  ReferenceArea,
} from "recharts";
import { Gauge, Trash2 } from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { startOfWeek, format } from "date-fns";
import { parseLocalDate } from "@/lib/utils";

function weekOfISO(d: Date = new Date()) {
  return format(startOfWeek(d, { weekStartsOn: 0 }), "yyyy-MM-dd");
}

function zoneLabel(v: number) {
  if (v < 20) return "deadened · numb";
  if (v < 35) return "leaning numb";
  if (v <= 65) return "calm & alive";
  if (v <= 80) return "leaning intoxicated";
  return "emotionally intoxicated";
}

function zoneColor(v: number) {
  if (v >= 35 && v <= 65) return "var(--sage)";
  return "var(--accent)";
}

export function AlivenessMeterView() {
  const checkIns = useAppStore((s) => s.alivenessCheckIns);
  const log = useAppStore((s) => s.logAlivenessCheckIn);
  const del = useAppStore((s) => s.deleteAlivenessCheckIn);

  const thisWeek = weekOfISO();
  const existing = checkIns.find((c) => c.weekOf === thisWeek);

  const [value, setValue] = useState<number>(existing?.value ?? 50);
  const [note, setNote] = useState<string>(existing?.note ?? "");

  const chartData = useMemo(() => {
    return [...checkIns]
      .sort((a, b) => a.weekOf.localeCompare(b.weekOf))
      .map((c) => ({
        week: format(parseLocalDate(c.weekOf), "MMM d"),
        value: c.value,
      }));
  }, [checkIns]);

  return (
    <div>
      {/* How to practice */}
      <Card className="p-5 md:p-6 mb-6 bg-[var(--muted)]/30">
        <div className="flex items-center gap-2 mb-2">
          <Gauge className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          Trait 8 is a scale with two bad ends. The Laundry List end is emotional intoxication —
          we became addicted to excitement. The Other Laundry List end is the counter-move —
          <em> we inhibit our fear by staying deadened and numb.</em> Both ends are the trait.
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          Recovery isn&apos;t at either end — it&apos;s the middle, where feelings are felt
          instead of dosed. Once a week, mark where you actually lived. Over time, the chart
          shows whether you&apos;re converging on calm and alive.
        </p>
      </Card>

      {/* Check-in */}
      <Card className="p-5 md:p-6 mb-6">
        <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
          Check-in · Week of {format(parseLocalDate(thisWeek), "MMM d, yyyy")}
        </div>
        <h2 className="font-serif text-xl font-semibold mb-5">
          This week, where did you mostly live?
        </h2>

        <div className="relative mb-2">
          {/* healthy middle band */}
          <div
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-4 rounded bg-[var(--sage)]/20 border-x border-[var(--sage)]/40"
            style={{ left: "35%", width: "30%" }}
            aria-hidden
          />
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="relative w-full h-2 bg-gradient-to-r from-[var(--muted-foreground)] via-[var(--sage)] to-[var(--accent)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
            aria-label="Numb to intoxicated slider"
          />
        </div>
        <div className="grid grid-cols-3 text-xs font-medium mb-5">
          <div className="text-left text-[var(--muted-foreground)]">deadened &amp; numb</div>
          <div className="text-center text-[var(--sage)] font-semibold">calm &amp; alive</div>
          <div className="text-right text-[var(--accent)]">emotionally intoxicated</div>
        </div>

        <div className="text-center mb-5">
          <div
            className="inline-flex items-baseline gap-2 rounded-full border px-4 py-1.5"
            style={{ borderColor: zoneColor(value), color: zoneColor(value) }}
          >
            <span className="font-serif text-2xl font-semibold">{value}</span>
            <span className="text-xs font-medium uppercase tracking-wider">· {zoneLabel(value)}</span>
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
            placeholder="What dosed you up — or flattened you out?"
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
          <h2 className="font-serif text-lg font-semibold">Converging on the middle</h2>
        </div>
        {chartData.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-sm text-[var(--muted-foreground)] italic">
            Your check-ins will chart here — the sage band is home.
          </div>
        ) : (
          <>
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
                  <ReferenceArea
                    y1={35}
                    y2={65}
                    fill="var(--sage)"
                    fillOpacity={0.14}
                    stroke="none"
                  />
                  <ReferenceLine y={50} stroke="var(--sage)" strokeDasharray="3 3" opacity={0.6} />
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
            <p className="mt-2 text-center text-xs text-[var(--muted-foreground)] italic">
              The goal isn&apos;t a high score or a low one — it&apos;s points settling into the
              sage band.
            </p>
          </>
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
                  {format(parseLocalDate(c.weekOf), "MMM d, yyyy")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      style={{
                        background:
                          c.value >= 35 && c.value <= 65 ? "var(--sage)" : "var(--accent)",
                        color: "white",
                      }}
                    >
                      {c.value}
                    </Badge>
                    <span className="text-xs text-[var(--muted-foreground)]">{zoneLabel(c.value)}</span>
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
