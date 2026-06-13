"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea, Input } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/app-store";
import { Trash2, CheckCircle2, Crown } from "lucide-react";
import { FourRoleGame } from "@/components/infographics/four-role-game";
import { cn } from "@/lib/utils";
import type { GameSeat } from "@/lib/types";

const SEATS: { id: GameSeat; label: string; sub: string; color: string }[] = [
  { id: "victim", label: "Victim", sub: "“this is happening to me”", color: "#B85068" },
  { id: "victimizer", label: "Victimizer", sub: "took charge · manipulated", color: "#C08A2D" },
  { id: "rescuer-1", label: "Rescuer I", sub: "fixed the situation", color: "#2D4A3E" },
  { id: "rescuer-2", label: "Rescuer II", sub: "helped for the surge", color: "#6B5B95" },
  { id: "humble", label: "Humble participant", sub: "showed up as an equal", color: "var(--sage)" },
];

const FEAR_CHIPS = [
  "Being alone / abandoned",
  "Not mattering",
  "Looking weak",
  "Losing control",
  "Being seen as bad",
  "Being “done to”",
];

function seatMeta(id: GameSeat) {
  return SEATS.find((s) => s.id === id)!;
}

export function SeatCheckView() {
  const entries = useAppStore((s) => s.seatChecks);
  const logEntry = useAppStore((s) => s.logSeatCheck);
  const del = useAppStore((s) => s.deleteSeatCheck);

  const [situation, setSituation] = useState("");
  const [seat, setSeat] = useState<GameSeat | null>(null);
  const [fear, setFear] = useState("");
  const [desired, setDesired] = useState("");
  const [saved, setSaved] = useState(false);

  const canSave = situation.trim().length > 0 && seat !== null;

  const stats = useMemo(() => {
    const total = entries.length;
    const bySeat: Record<GameSeat, number> = {
      victim: 0,
      victimizer: 0,
      "rescuer-1": 0,
      "rescuer-2": 0,
      humble: 0,
    };
    for (const e of entries) bySeat[e.seat] += 1;
    const maxSeat = Math.max(1, ...Object.values(bySeat));
    return { total, bySeat, maxSeat, humble: bySeat.humble };
  }, [entries]);

  function reset() {
    setSituation("");
    setSeat(null);
    setFear("");
    setDesired("");
  }

  function save() {
    if (!canSave || seat === null) return;
    logEntry({
      situation: situation.trim(),
      seat,
      fearUnderneath: fear.trim(),
      desiredResponse: desired.trim(),
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
          <Crown className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          Trait 5 says <em>there is no admission fee to the Game of Dissociation</em> — every
          member of a dysfunctional family is given one of four roles. When something happens —
          a hard conversation, a moment of conflict, a chance to help — pause and notice which
          seat you took: victim, victimizer, rescuer I, rescuer II, or humble participant.
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          You&apos;re not grading yourself. You&apos;re building the noticing muscle. Over
          time, the &ldquo;humble participant&rdquo; bar grows.
        </p>
        <div className="mt-5 overflow-x-auto">
          <FourRoleGame className="w-full h-auto min-w-[640px]" />
        </div>
      </Card>

      {/* Form */}
      <Card className="p-6 mb-4">
        <div className="grid grid-cols-1 gap-5">
          {/* situation */}
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              What happened?
            </div>
            <Input
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="A specific moment — “the disagreement at dinner,” “helping the newcomer”"
            />
          </label>

          {/* seat */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              Which seat did you take?
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {SEATS.map((s) => {
                const active = seat === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSeat(s.id)}
                    className={cn(
                      "rounded-xl border p-3 text-left transition-all",
                      active
                        ? "shadow-sm"
                        : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40"
                    )}
                    style={
                      active
                        ? {
                            borderColor: s.color,
                            background: `color-mix(in srgb, ${s.color} 10%, transparent)`,
                          }
                        : undefined
                    }
                  >
                    <div className="font-serif text-sm font-semibold mb-0.5" style={{ color: s.color }}>
                      {s.label}
                    </div>
                    <div className="text-[11px] text-[var(--muted-foreground)] leading-snug">
                      {s.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* fear */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              What was the fear underneath? (optional)
            </div>
            <Input
              value={fear}
              onChange={(e) => setFear(e.target.value)}
              placeholder="Name it, or tap a chip below"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {FEAR_CHIPS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFear(c)}
                  className="text-[11px] rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-[var(--foreground)]/80 hover:border-[var(--primary)]/40 hover:bg-[var(--muted)]/50 transition-colors"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* desired */}
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--primary)] font-semibold mb-1.5">
              What would humble participation have looked like? (optional)
            </div>
            <Textarea
              value={desired}
              onChange={(e) => setDesired(e.target.value)}
              rows={3}
              placeholder="Change the question: How could I humbly participate next time?"
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          {(situation || seat || fear || desired) && (
            <Button variant="ghost" onClick={reset}>
              Clear
            </Button>
          )}
          <Button disabled={!canSave} onClick={save}>
            {saved ? (
              <>
                <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                Added
              </>
            ) : (
              "Log this moment"
            )}
          </Button>
        </div>
      </Card>

      {/* Pattern summary */}
      {entries.length > 0 && (
        <Card className="p-5 md:p-6 mb-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-4">
            Your seat pattern so far · {stats.total} {stats.total === 1 ? "moment" : "moments"}
          </div>

          <div className="space-y-2.5 mb-4">
            {SEATS.map((s) => {
              const count = stats.bySeat[s.id];
              const pct = (count / stats.maxSeat) * 100;
              return (
                <div key={s.id} className="flex items-center gap-3">
                  <div className="w-32 shrink-0 text-xs font-medium" style={{ color: s.color }}>
                    {s.label}
                  </div>
                  <div className="flex-1 h-5 rounded-full bg-[var(--muted)]/50 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: s.color, opacity: count ? 0.85 : 0 }}
                    />
                  </div>
                  <div className="w-6 shrink-0 text-right text-xs font-semibold text-[var(--foreground)]">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[var(--border)] text-center">
            <span className="text-xs text-[var(--muted-foreground)]">
              Humble participation —{" "}
            </span>
            <span className="font-serif text-base font-semibold text-[var(--sage)]">
              {stats.humble}
            </span>
            <span className="text-xs text-[var(--muted-foreground)]"> of {stats.total} moments</span>
          </div>
        </Card>
      )}

      {/* History */}
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-xl font-semibold">Your moments</h2>
        <span className="text-xs text-[var(--muted-foreground)]">{entries.length} logged</span>
      </div>
      {entries.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          Nothing logged yet. Start with one moment from today.
        </Card>
      ) : (
        <div className="space-y-3">
          {entries.map((e) => {
            const sm = seatMeta(e.seat);
            return (
              <Card key={e.id} className="p-5 relative">
                <div className="flex items-start justify-between mb-2 flex-wrap gap-2 pr-6">
                  <div className="font-serif text-base font-semibold leading-snug">
                    {e.situation}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    {new Date(e.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge style={{ background: sm.color, color: "white" }}>{sm.label}</Badge>
                  {e.fearUnderneath && (
                    <Badge variant="outline" className="text-[10px]">
                      fear: {e.fearUnderneath}
                    </Badge>
                  )}
                </div>
                {e.desiredResponse && (
                  <div className="mt-2">
                    <div className="text-[10px] uppercase tracking-wider text-[var(--primary)] font-semibold mb-1">
                      Humbly participate next time
                    </div>
                    <p className="text-sm text-[var(--foreground)]/85 leading-relaxed font-journal">
                      {e.desiredResponse}
                    </p>
                  </div>
                )}
                <button
                  onClick={() => del(e.id)}
                  className="absolute top-3 right-3 p-1.5 rounded text-[var(--muted-foreground)]/60 hover:text-[var(--accent)]"
                  aria-label="Delete moment"
                >
                  <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                </button>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
