"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/app-store";
import { Hand, Trash2, CheckCircle2 } from "lucide-react";

const REQUEST_STARTERS = [
  "Asked someone to listen for ten minutes",
  "Asked for help carrying something",
  "Asked a question instead of figuring it out alone",
  "Asked a fellow traveler how they handled it",
];

function discomfortLabel(v: number) {
  if (v < 20) return "easy";
  if (v < 45) return "a twinge";
  if (v < 70) return "squirmy";
  return "excruciating";
}

function discomfortColor(v: number) {
  if (v < 40) return "var(--sage)";
  if (v < 65) return "var(--muted-foreground)";
  return "var(--accent)";
}

export function AskForHelpView() {
  const entries = useAppStore((s) => s.askHelpEntries);
  const logEntry = useAppStore((s) => s.logAskHelp);
  const del = useAppStore((s) => s.deleteAskHelp);

  const [request, setRequest] = useState("");
  const [who, setWho] = useState("");
  const [discomfortBefore, setDiscomfortBefore] = useState(70);
  const [outcome, setOutcome] = useState("");
  const [discomfortAfter, setDiscomfortAfter] = useState(40);
  const [saved, setSaved] = useState(false);

  const canSave = request.trim().length > 0;

  const stats = useMemo(() => {
    const total = entries.length;
    if (total === 0) return { total, avgBefore: 0, avgAfter: 0, avgDrop: 0 };
    const avgBefore = Math.round(entries.reduce((a, e) => a + e.discomfortBefore, 0) / total);
    const avgAfter = Math.round(entries.reduce((a, e) => a + e.discomfortAfter, 0) / total);
    return { total, avgBefore, avgAfter, avgDrop: avgBefore - avgAfter };
  }, [entries]);

  const pairedBars = useMemo(() => {
    return [...entries]
      .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
      .slice(-8);
  }, [entries]);

  function reset() {
    setRequest("");
    setWho("");
    setDiscomfortBefore(70);
    setOutcome("");
    setDiscomfortAfter(40);
  }

  function save() {
    if (!canSave) return;
    logEntry({
      request: request.trim(),
      who: who.trim(),
      discomfortBefore,
      discomfortAfter,
      outcome: outcome.trim(),
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
          <Hand className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          The Other Laundry List for Trait 9 says: <em>we hate people who &ldquo;play&rdquo; the
          victim and beg to be rescued.</em> We recoil at neediness because it mirrors our own
          buried need — so the trait made asking feel impossible, while we quietly resented
          everyone who could ask with ease. The strong-child mask rescued everybody and requested
          nothing.
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          The antidote is deliberate practice: small, real asks, logged with the discomfort
          measured before and after. Every logged ask is the trait unwinding.
        </p>
      </Card>

      {/* Composer */}
      <Card className="p-6 mb-4">
        <div className="grid grid-cols-1 gap-5">
          {/* request */}
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              What did you ask for?
            </div>
            <Input
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder="Small counts. Small especially counts."
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {REQUEST_STARTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRequest(s)}
                  className="text-[11px] rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-[var(--foreground)]/80 hover:border-[var(--primary)]/40 hover:bg-[var(--muted)]/50 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </label>

          {/* who */}
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              Who did you ask? (optional)
            </div>
            <Input
              value={who}
              onChange={(e) => setWho(e.target.value)}
              placeholder="A fellow traveler · a friend · my sponsor · a coworker"
            />
          </label>

          {/* discomfort before */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              Discomfort at the moment of asking
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={discomfortBefore}
              onChange={(e) => setDiscomfortBefore(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-[var(--sage)] via-[var(--muted-foreground)] to-[var(--accent)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
              aria-label="Discomfort before slider"
            />
            <div className="mt-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold">
              <span className="text-[var(--sage)]">easy</span>
              <span style={{ color: discomfortColor(discomfortBefore) }}>
                {discomfortBefore} · {discomfortLabel(discomfortBefore)}
              </span>
              <span className="text-[var(--accent)]">excruciating</span>
            </div>
          </div>

          {/* outcome */}
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              What actually happened?
            </div>
            <Input
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              placeholder="They said yes · they said no and the world kept turning · they were glad I asked"
            />
          </label>

          {/* discomfort after */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              Discomfort an hour later
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={discomfortAfter}
              onChange={(e) => setDiscomfortAfter(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-[var(--sage)] via-[var(--muted-foreground)] to-[var(--accent)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
              aria-label="Discomfort after slider"
            />
            <div className="mt-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold">
              <span className="text-[var(--sage)]">easy</span>
              <span style={{ color: discomfortColor(discomfortAfter) }}>
                {discomfortAfter} · {discomfortLabel(discomfortAfter)}
              </span>
              <span className="text-[var(--accent)]">excruciating</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          {(request || who || outcome) && (
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
              "Log this ask"
            )}
          </Button>
        </div>
      </Card>

      {/* Stats */}
      {entries.length > 0 && (
        <Card className="p-5 md:p-6 mb-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-3">
            Your asking practice
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-5">
            <div>
              <div className="font-serif text-2xl font-semibold text-[var(--primary)]">
                {stats.total}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                asks logged
              </div>
            </div>
            <div>
              <div
                className="font-serif text-2xl font-semibold"
                style={{ color: discomfortColor(stats.avgBefore) }}
              >
                {stats.avgBefore}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                avg before
              </div>
            </div>
            <div>
              <div
                className="font-serif text-2xl font-semibold"
                style={{ color: discomfortColor(stats.avgAfter) }}
              >
                {stats.avgAfter}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                avg an hour later
              </div>
            </div>
            <div>
              <div
                className="font-serif text-2xl font-semibold"
                style={{ color: stats.avgDrop >= 0 ? "var(--sage)" : "var(--accent)" }}
              >
                {stats.avgDrop > 0 ? "−" : stats.avgDrop < 0 ? "+" : ""}
                {Math.abs(stats.avgDrop)}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                avg drop
              </div>
            </div>
          </div>

          {/* paired before/after bars */}
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-2.5">
            Each ask, before and after
          </div>
          <div className="space-y-3">
            {pairedBars.map((e) => (
              <div key={e.id}>
                <div className="text-[11px] text-[var(--foreground)]/75 truncate mb-1">
                  {e.request}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-10 shrink-0 text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">
                      before
                    </span>
                    <div className="flex-1 h-2.5 rounded-full bg-[var(--muted)]/50 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--accent)] transition-all"
                        style={{ width: `${e.discomfortBefore}%`, opacity: 0.75 }}
                      />
                    </div>
                    <span className="w-7 shrink-0 text-right text-[10px] font-semibold text-[var(--foreground)]/80">
                      {e.discomfortBefore}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-10 shrink-0 text-[10px] uppercase tracking-wider text-[var(--sage)] font-semibold">
                      after
                    </span>
                    <div className="flex-1 h-2.5 rounded-full bg-[var(--muted)]/50 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--sage)] transition-all"
                        style={{ width: `${e.discomfortAfter}%`, opacity: 0.85 }}
                      />
                    </div>
                    <span className="w-7 shrink-0 text-right text-[10px] font-semibold text-[var(--foreground)]/80">
                      {e.discomfortAfter}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-[var(--muted-foreground)] italic">
            Watch the curve bend. Asking is a skill the strong-child mask never let us practice —
            and skills respond to reps.
          </p>
        </Card>
      )}

      {/* History */}
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-xl font-semibold">Past asks</h2>
        <span className="text-xs text-[var(--muted-foreground)]">{entries.length} logged</span>
      </div>
      {entries.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          Nothing logged yet. One small, real ask this week — that&apos;s the whole assignment.
        </Card>
      ) : (
        <div className="space-y-3">
          {entries.map((e) => (
            <Card key={e.id} className="p-5 relative">
              <div className="flex items-start justify-between mb-2 pr-6 gap-2 flex-wrap">
                <div className="font-serif text-base font-semibold leading-snug">{e.request}</div>
                <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] whitespace-nowrap">
                  {new Date(e.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                {e.who && (
                  <Badge variant="outline" className="text-[10px]">
                    {e.who}
                  </Badge>
                )}
                <span className="text-[11px] text-[var(--muted-foreground)]">
                  discomfort{" "}
                  <span
                    className="font-semibold"
                    style={{ color: discomfortColor(e.discomfortBefore) }}
                  >
                    {e.discomfortBefore}
                  </span>
                  {" → "}
                  <span
                    className="font-semibold"
                    style={{ color: discomfortColor(e.discomfortAfter) }}
                  >
                    {e.discomfortAfter}
                  </span>
                  {" an hour later"}
                </span>
                {e.discomfortBefore - e.discomfortAfter !== 0 && (
                  <span
                    className="text-[11px] font-semibold"
                    style={{
                      color:
                        e.discomfortBefore - e.discomfortAfter > 0
                          ? "var(--sage)"
                          : "var(--accent)",
                    }}
                  >
                    {e.discomfortBefore - e.discomfortAfter > 0 ? "−" : "+"}
                    {Math.abs(e.discomfortBefore - e.discomfortAfter)}
                  </span>
                )}
              </div>
              {e.outcome && (
                <p className="text-sm text-[var(--foreground)]/85 leading-relaxed font-journal">
                  {e.outcome}
                </p>
              )}
              <button
                onClick={() => del(e.id)}
                className="absolute top-3 right-3 p-1.5 rounded text-[var(--muted-foreground)]/60 hover:text-[var(--accent)]"
                aria-label="Delete ask"
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
