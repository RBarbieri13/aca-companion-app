"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles,
  Eye,
  Volume2,
  Cherry,
  Flower2,
  Hand,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";
import type { SenseDoor } from "@/lib/types";
import type { LucideIcon } from "lucide-react";

const DOORS: { id: SenseDoor; icon: LucideIcon; prompt: string; guidance: string }[] = [
  { id: "sight", icon: Eye, prompt: "Look at some things (actual)", guidance: "name three colors you can actually see" },
  { id: "sound", icon: Volume2, prompt: "Make a noise", guidance: "hum one note out loud" },
  { id: "taste", icon: Cherry, prompt: "Eat a peach", guidance: "one slow bite, all attention" },
  { id: "smell", icon: Flower2, prompt: "Smell some cinnamon", guidance: "find any real scent nearby" },
  { id: "touch", icon: Hand, prompt: "Pat your face", guidance: "pat your face, feel your feet" },
];

function doorMeta(id: SenseDoor) {
  return DOORS.find((d) => d.id === id) ?? DOORS[0];
}

function chargeLabel(v: number) {
  if (v < 20) return "numb";
  if (v < 35) return "flat";
  if (v <= 65) return "here";
  if (v <= 80) return "buzzing";
  return "spiking";
}

function chargeColor(v: number) {
  if (v >= 35 && v <= 65) return "var(--sage)";
  return "var(--accent)";
}

export function SensoryResetView() {
  const resets = useAppStore((s) => s.sensoryResets);
  const logSensoryReset = useAppStore((s) => s.logSensoryReset);
  const del = useAppStore((s) => s.deleteSensoryReset);

  const [before, setBefore] = useState(70);
  const [doors, setDoors] = useState<Set<SenseDoor>>(new Set());
  const [after, setAfter] = useState(55);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const canSave = doors.size > 0;

  const stats = useMemo(() => {
    const total = resets.length;
    const doorCounts = { sight: 0, sound: 0, taste: 0, smell: 0, touch: 0 } as Record<SenseDoor, number>;
    for (const r of resets) for (const d of r.doors) doorCounts[d] += 1;
    const maxDoor = Math.max(1, ...Object.values(doorCounts));
    const avgMove =
      total === 0
        ? 0
        : Math.round(
            resets.reduce(
              (acc, r) => acc + (Math.abs(r.before - 50) - Math.abs(r.after - 50)),
              0
            ) / total
          );
    return { total, doorCounts, maxDoor, avgMove };
  }, [resets]);

  function toggleDoor(id: SenseDoor) {
    const next = new Set(doors);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setDoors(next);
  }

  function reset() {
    setBefore(70);
    setDoors(new Set());
    setAfter(55);
    setNote("");
  }

  function save() {
    if (!canSave) return;
    logSensoryReset({
      doors: [...doors],
      before,
      after,
      note: note.trim(),
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
          <Sparkles className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          When the excitement charge is running — or when we&apos;ve gone flat and numb — the way
          back is through the senses. Trait 8&apos;s orientation practice is almost comically
          simple: look at some things, make a noise, eat a peach, smell some cinnamon, pat your
          face.
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          It works because the senses only operate in the present. Each door you walk through
          tells the body: it is not that time anymore. Mark your charge, walk through a door or
          two, mark it again.
        </p>
      </Card>

      {/* Composer */}
      <Card className="p-6 mb-4">
        <div className="grid grid-cols-1 gap-5">
          {/* before */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              Before — where is the charge right now?
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={before}
              onChange={(e) => setBefore(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-[var(--muted-foreground)] via-[var(--sage)] to-[var(--accent)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
              aria-label="Charge before slider"
            />
            <div className="mt-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold">
              <span className="text-[var(--muted-foreground)]">numb</span>
              <span style={{ color: chargeColor(before) }}>
                {before} · {chargeLabel(before)}
              </span>
              <span className="text-[var(--accent)]">spiking</span>
            </div>
          </div>

          {/* doors */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              Which sense doors did you walk through?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
              {DOORS.map((d) => {
                const active = doors.has(d.id);
                const Icon = d.icon;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => toggleDoor(d.id)}
                    className={cn(
                      "rounded-xl border p-3 text-left lg:text-center transition-all",
                      active
                        ? "border-[var(--sage)] bg-[var(--sage)]/12 shadow-sm"
                        : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--sage)]/50"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 mb-1.5 lg:mx-auto",
                        active ? "text-[var(--sage)]" : "text-[var(--muted-foreground)]"
                      )}
                      strokeWidth={1.75}
                    />
                    <div
                      className={cn(
                        "text-sm font-medium leading-snug mb-0.5",
                        active ? "text-[var(--sage)]" : "text-[var(--foreground)]/85"
                      )}
                    >
                      {d.prompt}
                    </div>
                    <div className="text-[11px] text-[var(--muted-foreground)] leading-snug">
                      {d.guidance}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* after */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              After — where is it now?
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={after}
              onChange={(e) => setAfter(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-[var(--muted-foreground)] via-[var(--sage)] to-[var(--accent)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
              aria-label="Charge after slider"
            />
            <div className="mt-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold">
              <span className="text-[var(--muted-foreground)]">numb</span>
              <span style={{ color: chargeColor(after) }}>
                {after} · {chargeLabel(after)}
              </span>
              <span className="text-[var(--accent)]">spiking</span>
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
              placeholder="What did you actually see, hear, taste, smell, touch?"
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          {(doors.size > 0 || note) && (
            <Button variant="ghost" onClick={reset}>Clear</Button>
          )}
          <Button disabled={!canSave} onClick={save}>
            {saved ? (<><CheckCircle2 className="h-4 w-4" strokeWidth={2} />Logged</>) : "Log this reset"}
          </Button>
        </div>
      </Card>

      {/* Stats */}
      {resets.length > 0 && (
        <Card className="p-5 md:p-6 mb-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-4">
            Coming back to now
          </div>
          <div className="grid grid-cols-2 gap-4 text-center mb-5">
            <div>
              <div className="font-serif text-2xl font-semibold text-[var(--primary)]">{stats.total}</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                resets
              </div>
            </div>
            <div>
              <div
                className="font-serif text-2xl font-semibold"
                style={{ color: stats.avgMove >= 0 ? "var(--sage)" : "var(--accent)" }}
              >
                {stats.avgMove > 0 ? "+" : ""}
                {stats.avgMove}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                avg move toward the middle
              </div>
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-2.5">
            Your favorite doors
          </div>
          <div className="space-y-2">
            {DOORS.map((d) => {
              const count = stats.doorCounts[d.id];
              return (
                <div key={d.id} className="flex items-center gap-3">
                  <div className="w-24 shrink-0 text-xs font-medium text-[var(--foreground)]/85 capitalize">
                    {d.id}
                  </div>
                  <div className="flex-1 h-4 rounded-full bg-[var(--muted)]/50 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[var(--sage)] transition-all"
                      style={{ width: `${(count / stats.maxDoor) * 100}%`, opacity: count ? 0.85 : 0 }}
                    />
                  </div>
                  <div className="w-6 shrink-0 text-right text-xs font-semibold text-[var(--foreground)]">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* History */}
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-xl font-semibold">Past resets</h2>
        <span className="text-xs text-[var(--muted-foreground)]">{resets.length} logged</span>
      </div>
      {resets.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          No resets yet. Look at some things — actual things — and log what shifts.
        </Card>
      ) : (
        <div className="space-y-3">
          {resets.map((r) => (
            <Card key={r.id} className="p-5 relative">
              <div className="flex items-start justify-between mb-2 pr-6 gap-2 flex-wrap">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-semibold" style={{ color: chargeColor(r.before) }}>
                    {r.before}
                  </span>
                  <span className="text-[var(--muted-foreground)]">{chargeLabel(r.before)} →</span>
                  <span className="font-semibold" style={{ color: chargeColor(r.after) }}>
                    {r.after}
                  </span>
                  <span className="text-[var(--muted-foreground)]">{chargeLabel(r.after)}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] whitespace-nowrap">
                  {new Date(r.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                {r.doors.map((d) => {
                  const meta = doorMeta(d);
                  const Icon = meta.icon;
                  return (
                    <span
                      key={d}
                      className="inline-flex items-center gap-1 text-[11px] rounded-full bg-[var(--sage)]/12 text-[var(--sage)] px-2 py-0.5 capitalize"
                    >
                      <Icon className="h-3 w-3" strokeWidth={1.75} />
                      {d}
                    </span>
                  );
                })}
              </div>
              {r.note && (
                <p className="text-sm text-[var(--foreground)]/85 leading-relaxed font-journal">
                  {r.note}
                </p>
              )}
              <button
                onClick={() => del(r.id)}
                className="absolute top-3 right-3 p-1.5 rounded text-[var(--muted-foreground)]/60 hover:text-[var(--accent)]"
                aria-label="Delete reset"
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
