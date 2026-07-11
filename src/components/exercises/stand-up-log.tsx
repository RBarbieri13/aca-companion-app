"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea, Input } from "@/components/ui/textarea";
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
import { Megaphone, Trash2, CheckCircle2 } from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { GuiltAlarmCircuit } from "@/components/infographics/guilt-alarm-circuit";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { StandUpAction } from "@/lib/types";

function guiltLabel(v: number) {
  if (v < 20) return "calm";
  if (v < 45) return "a twinge";
  if (v < 70) return "heavy";
  return "crushing";
}

function guiltColor(v: number) {
  if (v < 40) return "var(--sage)";
  if (v < 65) return "var(--muted-foreground)";
  return "var(--accent)";
}

export function StandUpLogView() {
  const entries = useAppStore((s) => s.standUpEntries);
  const logStandUp = useAppStore((s) => s.logStandUp);
  const del = useAppStore((s) => s.deleteStandUp);

  const [situation, setSituation] = useState("");
  const [action, setAction] = useState<StandUpAction | null>(null);
  const [guiltBefore, setGuiltBefore] = useState(60);
  const [guiltAfter, setGuiltAfter] = useState(40);
  const [saidOrWished, setSaidOrWished] = useState("");
  const [saved, setSaved] = useState(false);

  const canSave = situation.trim().length > 0 && action !== null;

  const stats = useMemo(() => {
    const total = entries.length;
    const spokeUp = entries.filter((e) => e.action === "spoke-up").length;
    const spoke = entries.filter((e) => e.action === "spoke-up");
    const avgGuiltWhenSpoke =
      spoke.length === 0
        ? null
        : Math.round(spoke.reduce((a, e) => a + e.guiltAfter, 0) / spoke.length);
    return { total, spokeUp, gaveIn: total - spokeUp, avgGuiltWhenSpoke };
  }, [entries]);

  const chartData = useMemo(() => {
    return [...entries]
      .filter((e) => e.action === "spoke-up")
      .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
      .map((e) => ({
        date: format(new Date(e.timestamp), "MMM d"),
        guilt: e.guiltAfter,
      }));
  }, [entries]);

  function reset() {
    setSituation("");
    setAction(null);
    setGuiltBefore(60);
    setGuiltAfter(40);
    setSaidOrWished("");
  }

  function save() {
    if (!canSave || action === null) return;
    logStandUp({
      situation: situation.trim(),
      action,
      guiltBefore,
      guiltAfter,
      saidOrWished: saidOrWished.trim(),
    });
    reset();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div>
      {/* How to practice */}
      <Card className="p-5 md:p-6 mb-6 bg-[var(--muted)]/30">
        <div className="flex items-center gap-2 mb-2">
          <Megaphone className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          Trait 7 wired a guilt alarm to the impulse to stand up for ourselves. This log watches
          the alarm in real time: capture a moment where assertion was on the table, whether you
          spoke up or gave in, and what the guilt did — at the moment of choice and an hour later.
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          The Flip Side is measurable: over months, guilt-after-speaking-up trends down. That
          falling line is the alarm being rewired.
        </p>
        <div className="mt-5 overflow-x-auto">
          <GuiltAlarmCircuit className="w-full h-auto min-w-[620px]" />
        </div>
      </Card>

      {/* Composer */}
      <Card className="p-6 mb-4">
        <div className="grid grid-cols-1 gap-5">
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              What was the moment?
            </div>
            <Input
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="Asked to work the weekend · someone spoke over me · a wrong order at dinner"
            />
          </label>

          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              What did you do?
            </div>
            <div className="grid grid-cols-2 gap-2 max-w-md">
              <button
                type="button"
                onClick={() => setAction("spoke-up")}
                className={cn(
                  "rounded-xl border p-3 text-center transition-all",
                  action === "spoke-up"
                    ? "border-[var(--sage)] bg-[var(--sage)]/12 shadow-sm"
                    : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--sage)]/50"
                )}
              >
                <div className="font-serif text-base font-semibold text-[var(--sage)] mb-0.5">Spoke up</div>
                <div className="text-[11px] text-[var(--muted-foreground)]">said what was true for me</div>
              </button>
              <button
                type="button"
                onClick={() => setAction("gave-in")}
                className={cn(
                  "rounded-xl border p-3 text-center transition-all",
                  action === "gave-in"
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 shadow-sm"
                    : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50"
                )}
              >
                <div className="font-serif text-base font-semibold text-[var(--accent)] mb-0.5">Gave in</div>
                <div className="text-[11px] text-[var(--muted-foreground)]">smoothed it over · went quiet</div>
              </button>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              Guilt at the moment of choice
            </div>
            <input
              type="range" min="0" max="100" step="1" value={guiltBefore}
              onChange={(e) => setGuiltBefore(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-[var(--sage)] via-[var(--muted-foreground)] to-[var(--accent)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
              aria-label="Guilt before slider"
            />
            <div className="mt-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold">
              <span className="text-[var(--sage)]">calm</span>
              <span style={{ color: guiltColor(guiltBefore) }}>{guiltBefore} · {guiltLabel(guiltBefore)}</span>
              <span className="text-[var(--accent)]">crushing</span>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              Guilt about an hour later
            </div>
            <input
              type="range" min="0" max="100" step="1" value={guiltAfter}
              onChange={(e) => setGuiltAfter(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-[var(--sage)] via-[var(--muted-foreground)] to-[var(--accent)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
              aria-label="Guilt after slider"
            />
            <div className="mt-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold">
              <span className="text-[var(--sage)]">calm</span>
              <span style={{ color: guiltColor(guiltAfter) }}>{guiltAfter} · {guiltLabel(guiltAfter)}</span>
              <span className="text-[var(--accent)]">crushing</span>
            </div>
          </div>

          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--primary)] font-semibold mb-1.5">
              {action === "gave-in" ? "What do you wish you'd said?" : "What did you say?"}
            </div>
            <Textarea
              value={saidOrWished}
              onChange={(e) => setSaidOrWished(e.target.value)}
              rows={2}
              placeholder="One calm sentence — “I see it differently.”"
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          {(situation || action || saidOrWished) && (
            <Button variant="ghost" onClick={reset}>Clear</Button>
          )}
          <Button disabled={!canSave} onClick={save}>
            {saved ? (<><CheckCircle2 className="h-4 w-4" strokeWidth={2} />Logged</>) : "Log this moment"}
          </Button>
        </div>
      </Card>

      {/* Stats */}
      {entries.length > 0 && (
        <Card className="p-5 md:p-6 mb-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-3">
            Your voice so far
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-serif text-2xl font-semibold text-[var(--sage)]">{stats.spokeUp}</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">spoke up</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-semibold text-[var(--accent)]">{stats.gaveIn}</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">gave in</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-semibold" style={{ color: stats.avgGuiltWhenSpoke === null ? "var(--muted-foreground)" : guiltColor(stats.avgGuiltWhenSpoke) }}>
                {stats.avgGuiltWhenSpoke === null ? "—" : stats.avgGuiltWhenSpoke}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">avg guilt after speaking up</div>
            </div>
          </div>
        </Card>
      )}

      {/* Trend */}
      {chartData.length > 1 && (
        <Card className="p-5 md:p-6 mb-6">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-0.5">
              The alarm, rewiring
            </div>
            <h2 className="font-serif text-lg font-semibold">Guilt after speaking up, over time</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} domain={[0, 100]} tickLine={false} ticks={[0, 50, 100]} />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                />
                <ReferenceLine y={50} stroke="var(--muted-foreground)" strokeDasharray="3 3" opacity={0.5} />
                <Line type="monotone" dataKey="guilt" stroke="var(--primary)" strokeWidth={2.5} dot={{ fill: "var(--primary)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-center text-xs text-[var(--muted-foreground)] italic">
            A falling line means standing up is starting to feel like a right, not a crime.
          </p>
        </Card>
      )}

      {/* History */}
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-xl font-semibold">Past moments</h2>
        <span className="text-xs text-[var(--muted-foreground)]">{entries.length} logged</span>
      </div>
      {entries.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          Nothing logged yet. Catch one moment today — spoken or swallowed, both count.
        </Card>
      ) : (
        <div className="space-y-3">
          {entries.map((e) => (
            <Card key={e.id} className="p-5 relative">
              <div className="flex items-start justify-between mb-2 pr-6 gap-2 flex-wrap">
                <div className="font-serif text-base font-semibold leading-snug">{e.situation}</div>
                <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] whitespace-nowrap">
                  {new Date(e.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge
                  style={{ background: e.action === "spoke-up" ? "var(--sage)" : "var(--accent)", color: "white" }}
                  className="text-[10px]"
                >
                  {e.action === "spoke-up" ? "Spoke up" : "Gave in"}
                </Badge>
                <span className="text-[11px] text-[var(--muted-foreground)]">
                  guilt <span className="font-semibold" style={{ color: guiltColor(e.guiltBefore) }}>{e.guiltBefore}</span>
                  {" → "}
                  <span className="font-semibold" style={{ color: guiltColor(e.guiltAfter) }}>{e.guiltAfter}</span>
                  {" an hour later"}
                </span>
              </div>
              {e.saidOrWished && (
                <p className="text-sm text-[var(--foreground)]/85 leading-relaxed font-journal border-l-2 border-[var(--primary)]/40 pl-3">
                  &ldquo;{e.saidOrWished}&rdquo;
                </p>
              )}
              <button
                onClick={() => del(e.id)}
                className="absolute top-3 right-3 p-1.5 rounded text-[var(--muted-foreground)]/60 hover:text-[var(--accent)]"
                aria-label="Delete entry"
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
