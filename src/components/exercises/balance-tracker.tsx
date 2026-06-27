"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea, Input } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/app-store";
import { Scale, Trash2, CheckCircle2 } from "lucide-react";
import { InferiorityGrandiosityPendulum } from "@/components/infographics/inferiority-grandiosity-pendulum";
import { cn } from "@/lib/utils";
import type { BalancePole } from "@/lib/types";

const POLES: { id: BalancePole; label: string; sub: string; color: string }[] = [
  { id: "inferiority", label: "Inferiority", sub: "“I'm not enough / it's all on me”", color: "var(--accent)" },
  { id: "centered", label: "Centered", sub: "capable AND worthwhile", color: "var(--sage)" },
  { id: "grandiosity", label: "Grandiosity", sub: "“I'm better than / not my fault”", color: "#C08A2D" },
];

function poleMeta(id: BalancePole) {
  return POLES.find((p) => p.id === id)!;
}

export function BalanceTrackerView() {
  const entries = useAppStore((s) => s.balanceEntries);
  const logEntry = useAppStore((s) => s.logBalanceEntry);
  const del = useAppStore((s) => s.deleteBalanceEntry);

  const [situation, setSituation] = useState("");
  const [pole, setPole] = useState<BalancePole | null>(null);
  const [reframe, setReframe] = useState("");
  const [saved, setSaved] = useState(false);

  const canSave = situation.trim().length > 0 && pole !== null;

  const stats = useMemo(() => {
    const total = entries.length;
    const byPole: Record<BalancePole, number> = { inferiority: 0, centered: 0, grandiosity: 0 };
    for (const e of entries) byPole[e.pole] += 1;
    const maxPole = Math.max(1, ...Object.values(byPole));
    return { total, byPole, maxPole };
  }, [entries]);

  function reset() {
    setSituation("");
    setPole(null);
    setReframe("");
  }

  function save() {
    if (!canSave || pole === null) return;
    logEntry({ situation: situation.trim(), pole, rightSizedResponse: reframe.trim() });
    reset();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div>
      {/* How to practice */}
      <Card className="p-5 md:p-6 mb-6 bg-[var(--muted)]/30">
        <div className="flex items-center gap-2 mb-2">
          <Scale className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          Trait 6 swings between two poles of the same false self: <em>inferiority</em> (“I&apos;m
          not enough, so it&apos;s all on me”) and <em>grandiosity</em> (“I&apos;m better than, so
          it&apos;s not my fault”). When a reaction lands, notice which way you swung — then write
          the right-sized response a capable, worthwhile person would give.
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          Over time, the centered bar grows. You&apos;re not aiming for perfect — just for the
          middle the poles were hiding.
        </p>
        <div className="mt-5 overflow-x-auto">
          <InferiorityGrandiosityPendulum className="w-full h-auto min-w-[600px]" />
        </div>
      </Card>

      {/* Composer */}
      <Card className="p-6 mb-4">
        <div className="grid grid-cols-1 gap-5">
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              What happened?
            </div>
            <Input
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="A moment — feedback at work, a mistake, a request for help…"
            />
          </label>

          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              Which way did you swing?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {POLES.map((p) => {
                const active = pole === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPole(p.id)}
                    className={cn(
                      "rounded-xl border p-3 text-left transition-all",
                      active ? "shadow-sm" : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40"
                    )}
                    style={active ? { borderColor: p.color, background: `color-mix(in srgb, ${p.color} 12%, transparent)` } : undefined}
                  >
                    <div className="font-serif text-sm font-semibold mb-0.5" style={{ color: p.color }}>{p.label}</div>
                    <div className="text-[11px] text-[var(--muted-foreground)] leading-snug">{p.sub}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--sage)] font-semibold mb-1.5">
              The right-sized response
            </div>
            <Textarea
              value={reframe}
              onChange={(e) => setReframe(e.target.value)}
              rows={3}
              placeholder="What would a capable AND worthwhile person say or do here?"
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          {(situation || pole || reframe) && (
            <Button variant="ghost" onClick={reset}>Clear</Button>
          )}
          <Button disabled={!canSave} onClick={save}>
            {saved ? (<><CheckCircle2 className="h-4 w-4" strokeWidth={2} />Logged</>) : "Log this swing"}
          </Button>
        </div>
      </Card>

      {/* Balance summary */}
      {entries.length > 0 && (
        <Card className="p-5 md:p-6 mb-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-4">
            Your balance so far · {stats.total} {stats.total === 1 ? "moment" : "moments"}
          </div>
          <div className="space-y-2.5">
            {POLES.map((p) => {
              const count = stats.byPole[p.id];
              const pct = (count / stats.maxPole) * 100;
              return (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="w-24 shrink-0 text-xs font-medium" style={{ color: p.color }}>{p.label}</div>
                  <div className="flex-1 h-5 rounded-full bg-[var(--muted)]/50 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: p.color, opacity: count ? 0.85 : 0 }} />
                  </div>
                  <div className="w-6 shrink-0 text-right text-xs font-semibold text-[var(--foreground)]">{count}</div>
                </div>
              );
            })}
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
          Nothing logged yet. Catch one swing today.
        </Card>
      ) : (
        <div className="space-y-3">
          {entries.map((e) => {
            const pm = poleMeta(e.pole);
            return (
              <Card key={e.id} className="p-5 relative">
                <div className="flex items-start justify-between mb-2 pr-6 gap-2 flex-wrap">
                  <div className="font-serif text-base font-semibold leading-snug">{e.situation}</div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] whitespace-nowrap">
                    {new Date(e.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
                  </span>
                </div>
                <Badge style={{ background: pm.color, color: "white" }} className="text-[10px] mb-2">{pm.label}</Badge>
                {e.rightSizedResponse && (
                  <div className="border-l-2 border-[var(--sage)] pl-3 mt-1">
                    <div className="text-[10px] uppercase tracking-wider text-[var(--sage)] font-semibold mb-0.5">Right-sized</div>
                    <p className="text-sm text-[var(--foreground)]/85 leading-relaxed font-journal">{e.rightSizedResponse}</p>
                  </div>
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
