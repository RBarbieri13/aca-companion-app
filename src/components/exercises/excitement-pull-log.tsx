"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Flame, Trash2, CheckCircle2, Wind } from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";
import type { PullStatus, PullChoice } from "@/lib/types";

const STARTERS = [
  "A crisis that isn't mine to solve",
  "Texting someone who runs hot and cold",
  "Doom-scrolling bad news",
  "Picking a fight when things feel too quiet",
  "Saying yes to chaos to feel something",
];

const CHOICES: { id: PullChoice; label: string; caption: string }[] = [
  { id: "engaged", label: "Engaged", caption: "I went in" },
  { id: "declined", label: "Declined", caption: "I felt the pull and passed" },
  { id: "noticing", label: "Noticing", caption: "just naming it today" },
];

function choiceLabel(c: PullChoice) {
  return CHOICES.find((x) => x.id === c)?.label ?? c;
}

function pullLabel(v: number) {
  if (v < 20) return "barely";
  if (v < 45) return "a tug";
  if (v < 70) return "strong";
  return "magnetic";
}

function pullColor(v: number) {
  if (v < 40) return "var(--sage)";
  if (v < 65) return "var(--muted-foreground)";
  return "var(--accent)";
}

export function ExcitementPullLogView() {
  const entries = useAppStore((s) => s.excitementPulls);
  const logExcitementPull = useAppStore((s) => s.logExcitementPull);
  const updateStatus = useAppStore((s) => s.updateExcitementPullStatus);
  const del = useAppStore((s) => s.deleteExcitementPull);

  const [situation, setSituation] = useState("");
  const [pull, setPull] = useState(60);
  const [status, setStatus] = useState<PullStatus | null>(null);
  const [choice, setChoice] = useState<PullChoice | null>(null);
  const [aftermath, setAftermath] = useState("");
  const [saved, setSaved] = useState(false);

  const canSave = situation.trim().length > 0 && status !== null && choice !== null;

  const stillPulls = useMemo(
    () => entries.filter((e) => e.status === "still-pulls"),
    [entries]
  );
  const released = useMemo(
    () => entries.filter((e) => e.status === "released"),
    [entries]
  );

  const stats = useMemo(() => {
    const engaged = entries.filter((e) => e.choice === "engaged").length;
    const declined = entries.filter((e) => e.choice === "declined").length;
    const decided = engaged + declined;
    const declinedShare = decided === 0 ? null : Math.round((declined / decided) * 100);
    return { engaged, declined, declinedShare };
  }, [entries]);

  function reset() {
    setSituation("");
    setPull(60);
    setStatus(null);
    setChoice(null);
    setAftermath("");
  }

  function save() {
    if (!canSave || status === null || choice === null) return;
    logExcitementPull({
      situation: situation.trim(),
      pull,
      status,
      choice,
      aftermath: aftermath.trim(),
    });
    reset();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function renderEntry(e: (typeof entries)[number]) {
    return (
      <Card key={e.id} className="p-5 relative">
        <div className="flex items-start justify-between mb-2 pr-6 gap-2 flex-wrap">
          <div className="font-serif text-base font-semibold leading-snug">{e.situation}</div>
          <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] whitespace-nowrap">
            {new Date(e.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <Badge
            style={{
              background: e.status === "released" ? "var(--sage)" : "var(--accent)",
              color: "white",
            }}
            className="text-[10px]"
          >
            {e.status === "released" ? "Released" : "Still pulls"}
          </Badge>
          <Badge variant="outline" className="text-[10px]">
            {choiceLabel(e.choice)}
          </Badge>
          <span className="text-[11px] text-[var(--muted-foreground)]">
            pull{" "}
            <span className="font-semibold" style={{ color: pullColor(e.pull) }}>
              {e.pull}
            </span>
            {" · "}
            {pullLabel(e.pull)}
          </span>
        </div>
        {e.aftermath && (
          <p className="text-sm text-[var(--foreground)]/85 leading-relaxed font-journal mt-1">
            <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mr-1.5 not-italic">
              afterward
            </span>
            {e.aftermath}
          </p>
        )}
        {e.status === "still-pulls" && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => updateStatus(e.id, "released")}
              className="text-[11px] font-semibold rounded-full border border-[var(--sage)] text-[var(--sage)] px-3 py-1 hover:bg-[var(--sage)]/10 transition-colors"
            >
              Mark released
            </button>
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
  }

  return (
    <div>
      {/* How to practice */}
      <Card className="p-5 md:p-6 mb-6 bg-[var(--muted)]/30">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          Trait 8&apos;s Flip Side asks two honest questions: which intoxicating situations have
          you let go of — and which ones still pull? The pull isn&apos;t a character flaw.
          Chaos was our childhood dose, and the body still recognizes it as home.
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          Log the pulls as they happen. Name the situation, measure the tug, and record what you
          chose — going in, passing, or just noticing counts. When an old pull finally goes
          quiet, mark it released. That growing released list is your recovery record.
        </p>
      </Card>

      {/* Composer */}
      <Card className="p-6 mb-4">
        <div className="grid grid-cols-1 gap-5">
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              What pulls at you?
            </div>
            <Input
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="One situation, named plainly"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {STARTERS.map((s) => (
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

          {/* pull */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              How hard does it pull?
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={pull}
              onChange={(e) => setPull(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-[var(--sage)] via-[var(--muted-foreground)] to-[var(--accent)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
              aria-label="Pull strength slider"
            />
            <div className="mt-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold">
              <span className="text-[var(--sage)]">barely</span>
              <span style={{ color: pullColor(pull) }}>
                {pull} · {pullLabel(pull)}
              </span>
              <span className="text-[var(--accent)]">magnetic</span>
            </div>
          </div>

          {/* status */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              Where does this one stand?
            </div>
            <div className="grid grid-cols-2 gap-2 max-w-md">
              <button
                type="button"
                onClick={() => setStatus("still-pulls")}
                className={cn(
                  "rounded-xl border p-3 text-center transition-all",
                  status === "still-pulls"
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 shadow-sm"
                    : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50"
                )}
              >
                <div className="font-serif text-base font-semibold text-[var(--accent)] mb-0.5">Still pulls me</div>
                <div className="text-[11px] text-[var(--muted-foreground)]">the charge is live</div>
              </button>
              <button
                type="button"
                onClick={() => setStatus("released")}
                className={cn(
                  "rounded-xl border p-3 text-center transition-all",
                  status === "released"
                    ? "border-[var(--sage)] bg-[var(--sage)]/12 shadow-sm"
                    : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--sage)]/50"
                )}
              >
                <div className="font-serif text-base font-semibold text-[var(--sage)] mb-0.5">Released</div>
                <div className="text-[11px] text-[var(--muted-foreground)]">I&apos;ve let this one go</div>
              </button>
            </div>
          </div>

          {/* choice */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              What did you do with it?
            </div>
            <div className="grid grid-cols-3 gap-2 max-w-lg">
              {CHOICES.map((c) => {
                const active = choice === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setChoice(c.id)}
                    className={cn(
                      "rounded-xl border p-3 text-center transition-all",
                      active
                        ? "border-[var(--primary)] bg-[var(--primary)]/[0.06] shadow-sm"
                        : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40"
                    )}
                  >
                    <div className="font-serif text-sm font-semibold text-[var(--primary)] mb-0.5">
                      {c.label}
                    </div>
                    <div className="text-[11px] text-[var(--muted-foreground)]">{c.caption}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              How did it feel afterward? (optional)
            </div>
            <Input
              value={aftermath}
              onChange={(e) => setAftermath(e.target.value)}
              placeholder="Wired then empty · quiet relief · restless but proud"
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          {(situation || status || choice || aftermath) && (
            <Button variant="ghost" onClick={reset}>Clear</Button>
          )}
          <Button disabled={!canSave} onClick={save}>
            {saved ? (<><CheckCircle2 className="h-4 w-4" strokeWidth={2} />Logged</>) : "Log this pull"}
          </Button>
        </div>
      </Card>

      {/* Stats */}
      {entries.length > 0 && (
        <Card className="p-5 md:p-6 mb-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-3">
            The pulls, tallied
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-serif text-2xl font-semibold text-[var(--accent)]">{stillPulls.length}</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                still pulls
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl font-semibold text-[var(--sage)]">{released.length}</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                released
              </div>
            </div>
            <div>
              <div
                className="font-serif text-2xl font-semibold"
                style={{
                  color:
                    stats.declinedShare === null
                      ? "var(--muted-foreground)"
                      : stats.declinedShare >= 50
                      ? "var(--sage)"
                      : "var(--accent)",
                }}
              >
                {stats.declinedShare === null ? "—" : `${stats.declinedShare}%`}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                declined when it was live
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* History */}
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-xl font-semibold">Still pulls</h2>
        <span className="text-xs text-[var(--muted-foreground)]">{stillPulls.length} live</span>
      </div>
      {stillPulls.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          {entries.length === 0
            ? "Nothing logged yet. Name the first pull you notice this week."
            : "Nothing still pulling — everything you’ve named is on the released list."}
        </Card>
      ) : (
        <div className="space-y-3">{stillPulls.map(renderEntry)}</div>
      )}

      <div className="mt-8 mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-xl font-semibold flex items-center gap-2">
          <Wind className="h-4 w-4 text-[var(--sage)]" strokeWidth={1.75} />
          Released
        </h2>
        <span className="text-xs text-[var(--muted-foreground)]">{released.length} let go</span>
      </div>
      <p className="mb-3 text-xs text-[var(--muted-foreground)] italic">
        This list is the recovery record — the intoxication we withdrew from, one situation at a
        time.
      </p>
      {released.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          Nothing released yet. It happens quietly — one day you notice an old pull is just gone.
        </Card>
      ) : (
        <div className="space-y-3">{released.map(renderEntry)}</div>
      )}
    </div>
  );
}
