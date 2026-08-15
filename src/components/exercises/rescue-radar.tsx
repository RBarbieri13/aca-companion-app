"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/app-store";
import { Radar, Trash2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RescueAction } from "@/lib/types";

const SITUATION_STARTERS = [
  "A newcomer looked lost",
  "Friend venting about their ex again",
  "Coworker drowning in their own deadline",
  "Family member's recurring crisis",
];

const FEELING_CHIPS = ["emptiness", "being needed", "importance", "old habit", "guilt"];

const ACTIONS: { id: RescueAction; label: string; sub: string; recovery: boolean }[] = [
  { id: "rescued", label: "Rescued", sub: "I swooped in", recovery: false },
  { id: "paused", label: "Paused", sub: "I felt the urge and waited", recovery: true },
  { id: "asked-first", label: "Asked first", sub: "I asked if help was wanted", recovery: true },
  { id: "compassion", label: "Compassion", sub: "I stayed warm without taking over", recovery: true },
];

function actionMeta(id: RescueAction) {
  return ACTIONS.find((a) => a.id === id)!;
}

function urgeLabel(v: number) {
  if (v < 20) return "a flicker";
  if (v < 45) return "a tug";
  if (v < 70) return "a strong pull";
  return "irresistible";
}

function urgeColor(v: number) {
  if (v < 40) return "var(--sage)";
  if (v < 65) return "var(--muted-foreground)";
  return "var(--accent)";
}

export function RescueRadarView() {
  const entries = useAppStore((s) => s.rescueImpulses);
  const logEntry = useAppStore((s) => s.logRescueImpulse);
  const del = useAppStore((s) => s.deleteRescueImpulse);

  const [situation, setSituation] = useState("");
  const [urge, setUrge] = useState(60);
  const [feeling, setFeeling] = useState("");
  const [action, setAction] = useState<RescueAction | null>(null);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const canSave = situation.trim().length > 0 && action !== null;

  const stats = useMemo(() => {
    const total = entries.length;
    const byAction: Record<RescueAction, number> = {
      rescued: 0,
      paused: 0,
      "asked-first": 0,
      compassion: 0,
    };
    for (const e of entries) byAction[e.action] += 1;
    const maxAction = Math.max(1, ...Object.values(byAction));
    const recoveryCount = byAction.paused + byAction["asked-first"] + byAction.compassion;
    const recoveryShare = total === 0 ? 0 : Math.round((recoveryCount / total) * 100);
    const avgUrge =
      total === 0 ? 0 : Math.round(entries.reduce((a, e) => a + e.urge, 0) / total);
    return { total, byAction, maxAction, recoveryCount, recoveryShare, avgUrge };
  }, [entries]);

  function reset() {
    setSituation("");
    setUrge(60);
    setFeeling("");
    setAction(null);
    setNote("");
  }

  function save() {
    if (!canSave || action === null) return;
    logEntry({
      situation: situation.trim(),
      urge,
      feelingUnderneath: feeling.trim(),
      action,
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
          <Radar className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          Trait 9 says we confuse love with pity and tend to &ldquo;love&rdquo; people we can
          &ldquo;pity&rdquo; and &ldquo;rescue.&rdquo; Heroes draw people who need rescuing;
          martyrs find lost causes. The rescue carries a hidden payoff — it fills an internal
          emptiness for a while. This radar catches the impulse in real time: the moment, the
          strength of the pull, and the feeling underneath it.
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          The urge isn&apos;t shameful — it&apos;s data about the emptiness. You&apos;re not
          logging failures; you&apos;re learning your own weather. Love asks first.
        </p>
      </Card>

      {/* Composer */}
      <Card className="p-6 mb-4">
        <div className="grid grid-cols-1 gap-5">
          {/* situation */}
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              What was the moment?
            </div>
            <Input
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="Someone struggling — and the pull to fix it"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {SITUATION_STARTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSituation(s)}
                  className="text-[11px] rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-[var(--foreground)]/80 hover:border-[var(--primary)]/40 hover:bg-[var(--muted)]/50 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </label>

          {/* urge */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              How strong was the pull to swoop in?
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={urge}
              onChange={(e) => setUrge(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-[var(--sage)] via-[var(--muted-foreground)] to-[var(--accent)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
              aria-label="Rescue urge slider"
            />
            <div className="mt-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold">
              <span className="text-[var(--sage)]">a flicker</span>
              <span style={{ color: urgeColor(urge) }}>
                {urge} · {urgeLabel(urge)}
              </span>
              <span className="text-[var(--accent)]">irresistible</span>
            </div>
          </div>

          {/* feeling underneath */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              What was underneath the urge? (optional)
            </div>
            <Input
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
              placeholder="Name it, or tap a chip below"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {FEELING_CHIPS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFeeling(c)}
                  className="text-[11px] rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-[var(--foreground)]/80 hover:border-[var(--primary)]/40 hover:bg-[var(--muted)]/50 transition-colors"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* action */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              What did you do?
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {ACTIONS.map((a) => {
                const active = action === a.id;
                const tone = a.recovery ? "var(--sage)" : "var(--accent)";
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAction(a.id)}
                    className={cn(
                      "rounded-xl border p-3 text-left transition-all",
                      active
                        ? "shadow-sm"
                        : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40"
                    )}
                    style={
                      active
                        ? {
                            borderColor: tone,
                            background: `color-mix(in srgb, ${tone} 10%, transparent)`,
                          }
                        : undefined
                    }
                  >
                    <div
                      className="font-serif text-sm font-semibold mb-0.5"
                      style={{ color: tone }}
                    >
                      {a.label}
                    </div>
                    <div className="text-[11px] text-[var(--muted-foreground)] leading-snug">
                      {a.sub}
                    </div>
                  </button>
                );
              })}
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
              placeholder="What would the emptiness need, if the rescue didn't feed it?"
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          {(situation || feeling || action || note) && (
            <Button variant="ghost" onClick={reset}>
              Clear
            </Button>
          )}
          <Button disabled={!canSave} onClick={save}>
            {saved ? (
              <>
                <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                Logged
              </>
            ) : (
              "Log this impulse"
            )}
          </Button>
        </div>
      </Card>

      {/* Stats */}
      {entries.length > 0 && (
        <Card className="p-5 md:p-6 mb-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-4">
            Your radar so far · {stats.total} {stats.total === 1 ? "impulse" : "impulses"}
          </div>

          <div className="space-y-2.5 mb-4">
            {ACTIONS.map((a) => {
              const count = stats.byAction[a.id];
              const pct = (count / stats.maxAction) * 100;
              const tone = a.recovery ? "var(--sage)" : "var(--accent)";
              return (
                <div key={a.id} className="flex items-center gap-3">
                  <div className="w-28 shrink-0 text-xs font-medium" style={{ color: tone }}>
                    {a.label}
                  </div>
                  <div className="flex-1 h-5 rounded-full bg-[var(--muted)]/50 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: tone, opacity: count ? 0.85 : 0 }}
                    />
                  </div>
                  <div className="w-6 shrink-0 text-right text-xs font-semibold text-[var(--foreground)]">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[var(--border)] grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="font-serif text-2xl font-semibold text-[var(--sage)]">
                {stats.recoveryShare}%
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                recovery share · paused, asked, or stayed warm
              </div>
            </div>
            <div>
              <div
                className="font-serif text-2xl font-semibold"
                style={{ color: urgeColor(stats.avgUrge) }}
              >
                {stats.avgUrge}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                average urge
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* History */}
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-xl font-semibold">Caught impulses</h2>
        <span className="text-xs text-[var(--muted-foreground)]">{entries.length} logged</span>
      </div>
      {entries.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          Nothing on the radar yet. The next time someone&apos;s struggle pulls at you, log the
          pull — whatever you did with it.
        </Card>
      ) : (
        <div className="space-y-3">
          {entries.map((e) => {
            const am = actionMeta(e.action);
            const tone = am.recovery ? "var(--sage)" : "var(--accent)";
            return (
              <Card key={e.id} className="p-5 relative">
                <div className="flex items-start justify-between mb-2 pr-6 gap-2 flex-wrap">
                  <div className="font-serif text-base font-semibold leading-snug">
                    {e.situation}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] whitespace-nowrap">
                    {new Date(e.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Badge style={{ background: tone, color: "white" }} className="text-[10px]">
                    {am.label}
                  </Badge>
                  <span className="text-[11px] text-[var(--muted-foreground)]">
                    urge{" "}
                    <span className="font-semibold" style={{ color: urgeColor(e.urge) }}>
                      {e.urge}
                    </span>{" "}
                    · {urgeLabel(e.urge)}
                  </span>
                  {e.feelingUnderneath && (
                    <span className="text-[11px] rounded-full bg-[var(--primary)]/[0.08] text-[var(--primary)] px-2 py-0.5">
                      underneath: {e.feelingUnderneath}
                    </span>
                  )}
                </div>
                {e.note && (
                  <p className="mt-1.5 text-sm text-[var(--foreground)]/85 leading-relaxed font-journal">
                    {e.note}
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
            );
          })}
        </div>
      )}
    </div>
  );
}
