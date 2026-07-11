"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/app-store";
import { HeartHandshake, Trash2, CheckCircle2 } from "lucide-react";
import { EncouragementRipple } from "@/components/infographics/encouragement-ripple";
import { cn } from "@/lib/utils";
import type { EncouragementDirection, ImpactDomain } from "@/lib/types";

const DOMAINS: { id: ImpactDomain; label: string }[] = [
  { id: "physically", label: "Physically" },
  { id: "mentally", label: "Mentally" },
  { id: "emotionally", label: "Emotionally" },
  { id: "spiritually", label: "Spiritually" },
];

const GAVE_STARTERS = [
  "Told a newcomer their share mattered",
  "Backed a friend's “no” instead of softening it",
  "Asked a quiet person what they thought",
  "Shared my experience when a fellow traveler asked",
];

const RECEIVED_STARTERS = [
  "Someone thanked me for speaking up",
  "A fellow traveler said “say more about that”",
  "My sponsor cheered a boundary I set",
  "The group held silence while I finished",
];

export function EncouragementLedgerView() {
  const entries = useAppStore((s) => s.encouragements);
  const logEncouragement = useAppStore((s) => s.logEncouragement);
  const del = useAppStore((s) => s.deleteEncouragement);

  const [direction, setDirection] = useState<EncouragementDirection>("gave");
  const [who, setWho] = useState("");
  const [what, setWhat] = useState("");
  const [impacts, setImpacts] = useState<Set<ImpactDomain>>(new Set());
  const [saved, setSaved] = useState(false);

  const canSave = what.trim().length > 0;

  const stats = useMemo(() => {
    const gave = entries.filter((e) => e.direction === "gave").length;
    const received = entries.length - gave;
    const domainCounts: Record<ImpactDomain, number> = {
      physically: 0,
      mentally: 0,
      emotionally: 0,
      spiritually: 0,
    };
    for (const e of entries) for (const d of e.impacts) domainCounts[d] += 1;
    const maxDomain = Math.max(1, ...Object.values(domainCounts));
    return { gave, received, domainCounts, maxDomain };
  }, [entries]);

  function toggleDomain(d: ImpactDomain) {
    const next = new Set(impacts);
    if (next.has(d)) next.delete(d);
    else next.add(d);
    setImpacts(next);
  }

  function reset() {
    setWho("");
    setWhat("");
    setImpacts(new Set());
  }

  function save() {
    if (!canSave) return;
    logEncouragement({
      direction,
      who: who.trim(),
      what: what.trim(),
      impacts: [...impacts],
    });
    reset();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  const starters = direction === "gave" ? GAVE_STARTERS : RECEIVED_STARTERS;

  return (
    <div>
      {/* How to practice */}
      <Card className="p-5 md:p-6 mb-6 bg-[var(--muted)]/30">
        <div className="flex items-center gap-2 mb-2">
          <HeartHandshake className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          The Flip Side of the Other Laundry List is generosity with the thing we fought for:
          <em> we support and encourage others in their efforts to be assertive.</em> This ledger
          keeps both directions — moments you cheered someone&apos;s voice, and moments someone
          cheered yours.
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          For each one, mark how it affected you — <em>physically, mentally, emotionally, and
          spiritually</em> — exactly the four domains the workbook asks about.
        </p>
        <div className="mt-5 overflow-x-auto">
          <EncouragementRipple className="w-full h-auto min-w-[560px]" />
        </div>
      </Card>

      {/* Composer */}
      <Card className="p-6 mb-4">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              Which direction?
            </div>
            <div className="grid grid-cols-2 gap-2 max-w-md">
              <button
                type="button"
                onClick={() => setDirection("gave")}
                className={cn(
                  "rounded-xl border p-3 text-center transition-all",
                  direction === "gave"
                    ? "border-[var(--sage)] bg-[var(--sage)]/12 shadow-sm"
                    : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--sage)]/50"
                )}
              >
                <div className="font-serif text-base font-semibold text-[var(--sage)] mb-0.5">I encouraged</div>
                <div className="text-[11px] text-[var(--muted-foreground)]">cheered someone&apos;s voice</div>
              </button>
              <button
                type="button"
                onClick={() => setDirection("received")}
                className={cn(
                  "rounded-xl border p-3 text-center transition-all",
                  direction === "received"
                    ? "border-[var(--primary)] bg-[var(--primary)]/[0.06] shadow-sm"
                    : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50"
                )}
              >
                <div className="font-serif text-base font-semibold text-[var(--primary)] mb-0.5">I was encouraged</div>
                <div className="text-[11px] text-[var(--muted-foreground)]">someone cheered mine</div>
              </button>
            </div>
          </div>

          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              Who was involved? (optional)
            </div>
            <Input
              value={who}
              onChange={(e) => setWho(e.target.value)}
              placeholder="A fellow traveler · a newcomer · my sponsor · a friend"
            />
          </label>

          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              What happened?
            </div>
            <Input
              value={what}
              onChange={(e) => setWhat(e.target.value)}
              placeholder="One sentence is plenty"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {starters.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setWhat(s)}
                  className="text-[11px] rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-[var(--foreground)]/80 hover:border-[var(--primary)]/40 hover:bg-[var(--muted)]/50 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </label>

          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--sage)] font-semibold mb-2">
              How did it affect you?
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DOMAINS.map((d) => {
                const active = impacts.has(d.id);
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => toggleDomain(d.id)}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
                      active
                        ? "border-[var(--sage)] bg-[var(--sage)]/12 text-[var(--sage)]"
                        : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/80 hover:border-[var(--sage)]/50"
                    )}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          {(who || what || impacts.size > 0) && (
            <Button variant="ghost" onClick={reset}>Clear</Button>
          )}
          <Button disabled={!canSave} onClick={save}>
            {saved ? (<><CheckCircle2 className="h-4 w-4" strokeWidth={2} />Logged</>) : "Add to ledger"}
          </Button>
        </div>
      </Card>

      {/* Summary */}
      {entries.length > 0 && (
        <Card className="p-5 md:p-6 mb-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-4">
            Your ledger · {entries.length} {entries.length === 1 ? "moment" : "moments"}
          </div>
          <div className="grid grid-cols-2 gap-3 text-center mb-5">
            <div className="rounded-lg bg-[var(--sage)]/10 py-3">
              <div className="font-serif text-2xl font-semibold text-[var(--sage)]">{stats.gave}</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">encouraged others</div>
            </div>
            <div className="rounded-lg bg-[var(--primary)]/[0.07] py-3">
              <div className="font-serif text-2xl font-semibold text-[var(--primary)]">{stats.received}</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">was encouraged</div>
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-2.5">
            Where it lands in you
          </div>
          <div className="space-y-2">
            {DOMAINS.map((d) => {
              const count = stats.domainCounts[d.id];
              return (
                <div key={d.id} className="flex items-center gap-3">
                  <div className="w-24 shrink-0 text-xs font-medium text-[var(--foreground)]/85">{d.label}</div>
                  <div className="flex-1 h-4 rounded-full bg-[var(--muted)]/50 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[var(--sage)] transition-all"
                      style={{ width: `${(count / stats.maxDomain) * 100}%`, opacity: count ? 0.85 : 0 }}
                    />
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
        <h2 className="font-serif text-xl font-semibold">The ledger</h2>
        <span className="text-xs text-[var(--muted-foreground)]">{entries.length} logged</span>
      </div>
      {entries.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          Nothing yet. Encouragement given counts double — log the next voice you cheer.
        </Card>
      ) : (
        <div className="space-y-3">
          {entries.map((e) => (
            <Card key={e.id} className="p-5 relative">
              <div className="flex items-start justify-between mb-2 pr-6 gap-2 flex-wrap">
                <div className="font-serif text-base font-semibold leading-snug">{e.what}</div>
                <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] whitespace-nowrap">
                  {new Date(e.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  style={{ background: e.direction === "gave" ? "var(--sage)" : "var(--primary)", color: "white" }}
                  className="text-[10px]"
                >
                  {e.direction === "gave" ? "Encouraged" : "Was encouraged"}
                </Badge>
                {e.who && <Badge variant="outline" className="text-[10px]">{e.who}</Badge>}
                {e.impacts.map((d) => (
                  <span key={d} className="text-[11px] rounded-full bg-[var(--sage)]/12 text-[var(--sage)] px-2 py-0.5">
                    {d}
                  </span>
                ))}
              </div>
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
