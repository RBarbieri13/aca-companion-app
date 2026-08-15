"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea, Input } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Activity, Trash2, CheckCircle2 } from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { BodyStaticMap } from "@/components/infographics/body-static-map";
import { cn } from "@/lib/utils";
import type { BodySign, BodyScanState } from "@/lib/types";

const SIGNS: { id: BodySign; label: string }[] = [
  { id: "shallow-breath", label: "Quick, shallow chest breathing" },
  { id: "raised-shoulders", label: "Shoulders up and staying up" },
  { id: "clamped-jaw-day", label: "Jaw clamped (daytime)" },
  { id: "clamped-jaw-night", label: "Jaw clamped at night" },
  { id: "teeth-grinding", label: "Grinding teeth" },
  { id: "bouncing-knee", label: "Bouncing knee" },
  { id: "tapping-foot", label: "Tapping foot or toes" },
  { id: "nail-digging", label: "Digging at fingernails" },
  { id: "skin-chewing", label: "Chewing lip / cheek" },
];

const STATES: { id: BodyScanState; label: string; caption: string }[] = [
  { id: "numb", label: "Numb", caption: "deadened · not much of anything" },
  { id: "calm", label: "Calm", caption: "settled · here" },
  { id: "buzzing", label: "Buzzing", caption: "low hum of static" },
  { id: "spiking", label: "Spiking", caption: "wired · braced" },
];

function signLabel(id: BodySign) {
  return SIGNS.find((s) => s.id === id)?.label ?? id;
}

function stateColor(state: BodyScanState) {
  switch (state) {
    case "numb":
      return "var(--muted-foreground)";
    case "calm":
      return "var(--sage)";
    case "buzzing":
      return "var(--primary)";
    case "spiking":
      return "var(--accent)";
  }
}

function tensionLabel(v: number) {
  if (v < 20) return "at rest";
  if (v < 45) return "a little held";
  if (v < 70) return "braced";
  return "braced for impact";
}

function tensionColor(v: number) {
  if (v < 40) return "var(--sage)";
  if (v < 65) return "var(--muted-foreground)";
  return "var(--accent)";
}

export function BodyStaticScannerView() {
  const scans = useAppStore((s) => s.bodyScans);
  const logBodyScan = useAppStore((s) => s.logBodyScan);
  const del = useAppStore((s) => s.deleteBodyScan);

  const [signs, setSigns] = useState<Set<BodySign>>(new Set());
  const [tension, setTension] = useState(50);
  const [state, setState] = useState<BodyScanState | null>(null);
  const [childhoodEcho, setChildhoodEcho] = useState("");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const canSave = state !== null;

  const stats = useMemo(() => {
    const signCounts = {} as Record<BodySign, number>;
    for (const s of SIGNS) signCounts[s.id] = 0;
    for (const scan of scans) for (const sign of scan.signs) signCounts[sign] += 1;
    const maxSign = Math.max(1, ...Object.values(signCounts));
    const stateCounts = { numb: 0, calm: 0, buzzing: 0, spiking: 0 } as Record<BodyScanState, number>;
    for (const scan of scans) stateCounts[scan.state] += 1;
    const avgTension =
      scans.length === 0
        ? 0
        : Math.round(scans.reduce((a, s) => a + s.tension, 0) / scans.length);
    return { signCounts, maxSign, stateCounts, avgTension };
  }, [scans]);

  function toggleSign(id: BodySign) {
    const next = new Set(signs);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSigns(next);
  }

  function reset() {
    setSigns(new Set());
    setTension(50);
    setState(null);
    setChildhoodEcho("");
    setNote("");
  }

  function save() {
    if (!canSave || state === null) return;
    logBodyScan({
      signs: [...signs],
      tension,
      state,
      childhoodEcho: childhoodEcho.trim(),
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
          <Activity className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          Trait 8&apos;s excitement addiction lives in the body before it lives anywhere else. The
          workbook asks us to check ourselves for the small ways we&apos;re still bracing for
          impact — shallow chest breathing, shoulders that never come down, a clamped jaw, a
          bouncing knee — and to compare it with what our bodies did back then.
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          Scan yourself right now. Not to fix anything — just to notice which signals are on, how
          braced you are, and what state the static leaves you in. Repeat whenever you think of
          it. The noticing itself starts turning the volume down.
        </p>
        <div className="mt-5 overflow-x-auto">
          <BodyStaticMap className="w-full h-auto min-w-[560px]" />
        </div>
      </Card>

      {/* Composer */}
      <Card className="p-6 mb-4">
        <div className="grid grid-cols-1 gap-5">
          {/* signs */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              Which signals are on right now?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {SIGNS.map((s) => {
                const active = signs.has(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleSign(s.id)}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-sm font-medium text-left transition-all",
                      active
                        ? "border-[var(--primary)] bg-[var(--primary)]/[0.08] text-[var(--foreground)]"
                        : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/80 hover:border-[var(--primary)]/40"
                    )}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* tension */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              How braced is the body right now?
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={tension}
              onChange={(e) => setTension(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-[var(--sage)] via-[var(--muted-foreground)] to-[var(--accent)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
              aria-label="Tension slider"
            />
            <div className="mt-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold">
              <span className="text-[var(--sage)]">at rest</span>
              <span style={{ color: tensionColor(tension) }}>
                {tension} · {tensionLabel(tension)}
              </span>
              <span className="text-[var(--accent)]">braced for impact</span>
            </div>
          </div>

          {/* state */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              Which state is closest?
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {STATES.map((st) => {
                const active = state === st.id;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setState(st.id)}
                    className={cn(
                      "rounded-xl border p-3 text-center transition-all",
                      active
                        ? "shadow-sm"
                        : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40"
                    )}
                    style={
                      active
                        ? {
                            borderColor: stateColor(st.id),
                            background: "color-mix(in srgb, " + stateColor(st.id) + " 10%, transparent)",
                          }
                        : undefined
                    }
                  >
                    <div
                      className="font-serif text-base font-semibold mb-0.5"
                      style={{ color: stateColor(st.id) }}
                    >
                      {st.label}
                    </div>
                    <div className="text-[11px] text-[var(--muted-foreground)]">{st.caption}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* childhood echo */}
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              Childhood echo (optional)
            </div>
            <Input
              value={childhoodEcho}
              onChange={(e) => setChildhoodEcho(e.target.value)}
              placeholder="What did your body do back then?"
            />
          </label>

          {/* note */}
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              A note (optional)
            </div>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="What was happening when you noticed?"
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          {(signs.size > 0 || state || childhoodEcho || note) && (
            <Button variant="ghost" onClick={reset}>Clear</Button>
          )}
          <Button disabled={!canSave} onClick={save}>
            {saved ? (<><CheckCircle2 className="h-4 w-4" strokeWidth={2} />Logged</>) : "Log this scan"}
          </Button>
        </div>
      </Card>

      {/* Stats */}
      {scans.length > 0 && (
        <Card className="p-5 md:p-6 mb-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-4">
            Your static so far · {scans.length} {scans.length === 1 ? "scan" : "scans"}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center mb-5">
            {STATES.map((st) => (
              <div key={st.id} className="rounded-lg bg-[var(--muted)]/40 py-3">
                <div
                  className="font-serif text-2xl font-semibold"
                  style={{ color: stateColor(st.id) }}
                >
                  {stats.stateCounts[st.id]}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                  {st.label}
                </div>
              </div>
            ))}
            <div className="rounded-lg bg-[var(--muted)]/40 py-3">
              <div
                className="font-serif text-2xl font-semibold"
                style={{ color: tensionColor(stats.avgTension) }}
              >
                {stats.avgTension}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                avg tension
              </div>
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-2.5">
            Your most frequent signals
          </div>
          <div className="space-y-2">
            {SIGNS.map((s) => {
              const count = stats.signCounts[s.id];
              return (
                <div key={s.id} className="flex items-center gap-3">
                  <div className="w-40 sm:w-52 shrink-0 text-xs font-medium text-[var(--foreground)]/85 truncate">
                    {s.label}
                  </div>
                  <div className="flex-1 h-4 rounded-full bg-[var(--muted)]/50 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[var(--primary)] transition-all"
                      style={{ width: `${(count / stats.maxSign) * 100}%`, opacity: count ? 0.8 : 0 }}
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
        <h2 className="font-serif text-xl font-semibold">Past scans</h2>
        <span className="text-xs text-[var(--muted-foreground)]">{scans.length} logged</span>
      </div>
      {scans.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          No scans yet. Take thirty seconds right now — jaw, shoulders, breath, knee.
        </Card>
      ) : (
        <div className="space-y-3">
          {scans.map((e) => (
            <Card key={e.id} className="p-5 relative">
              <div className="flex items-start justify-between mb-2 pr-6 gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    style={{ background: stateColor(e.state), color: "white" }}
                    className="text-[10px] capitalize"
                  >
                    {e.state}
                  </Badge>
                  <span className="text-[11px] text-[var(--muted-foreground)]">
                    tension{" "}
                    <span className="font-semibold" style={{ color: tensionColor(e.tension) }}>
                      {e.tension}
                    </span>
                    {" · "}
                    {tensionLabel(e.tension)}
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] whitespace-nowrap">
                  {new Date(e.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
                </span>
              </div>
              {e.signs.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  {e.signs.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] rounded-full bg-[var(--primary)]/[0.08] text-[var(--primary)] px-2 py-0.5"
                    >
                      {signLabel(s)}
                    </span>
                  ))}
                </div>
              )}
              {e.childhoodEcho && (
                <p className="text-sm text-[var(--foreground)]/85 leading-relaxed mb-1">
                  <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mr-1.5">
                    back then
                  </span>
                  {e.childhoodEcho}
                </p>
              )}
              {e.note && (
                <p className="text-sm text-[var(--foreground)]/85 leading-relaxed font-journal">
                  {e.note}
                </p>
              )}
              <button
                onClick={() => del(e.id)}
                className="absolute top-3 right-3 p-1.5 rounded text-[var(--muted-foreground)]/60 hover:text-[var(--accent)]"
                aria-label="Delete scan"
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
