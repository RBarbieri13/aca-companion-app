"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea, Input } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/app-store";
import { Users, Trash2, CheckCircle2 } from "lucide-react";
import { AbandonmentGame } from "@/components/infographics/abandonment-game";
import { cn } from "@/lib/utils";
import type { BondingRole, BondingEnding } from "@/lib/types";

const ROLES: { id: BondingRole; label: string; sub: string; color: string }[] = [
  { id: "rescuer", label: "Rescuer", sub: "I fixed / took care of them", color: "var(--sage)" },
  { id: "victim", label: "Victim", sub: "I was the abandoned one", color: "var(--accent)" },
  { id: "victimizer", label: "Victimizer", sub: "I dominated / left first", color: "var(--primary)" },
  { id: "avoider", label: "Avoider", sub: "I kept them at arm's length", color: "#8B7BA8" },
];

const ENDINGS: { id: BondingEnding; label: string }[] = [
  { id: "left-first", label: "I left first" },
  { id: "they-left", label: "They left" },
  { id: "faded", label: "Faded out" },
  { id: "ongoing", label: "Still going" },
];

const COMPULSION_CHIPS = [
  "Alcohol / drugs",
  "Workaholism",
  "Rage",
  "Control",
  "Another -aholic",
  "None I can see",
];

function roleMeta(id: BondingRole) {
  return ROLES.find((r) => r.id === id)!;
}
function endingLabel(id: BondingEnding) {
  return ENDINGS.find((e) => e.id === id)?.label ?? id;
}

export function BondingInventoryView() {
  const entries = useAppStore((s) => s.bondingInventory);
  const logEntry = useAppStore((s) => s.logBondingEntry);
  const del = useAppStore((s) => s.deleteBondingEntry);

  const [who, setWho] = useState("");
  const [role, setRole] = useState<BondingRole | null>(null);
  const [compulsion, setCompulsion] = useState("");
  const [ending, setEnding] = useState<BondingEnding | null>(null);
  const [recreated, setRecreated] = useState<boolean | null>(null);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const canSave = who.trim().length > 0 && role !== null && ending !== null && recreated !== null;

  const stats = useMemo(() => {
    const total = entries.length;
    const byRole: Record<BondingRole, number> = {
      rescuer: 0,
      victim: 0,
      victimizer: 0,
      avoider: 0,
    };
    let recreatedCount = 0;
    for (const e of entries) {
      byRole[e.role] += 1;
      if (e.recreatedAbandonment) recreatedCount += 1;
    }
    const maxRole = Math.max(1, ...Object.values(byRole));
    return { total, byRole, maxRole, recreatedCount, trueCount: total - recreatedCount };
  }, [entries]);

  function reset() {
    setWho("");
    setRole(null);
    setCompulsion("");
    setEnding(null);
    setRecreated(null);
    setNote("");
  }

  function save() {
    if (!canSave || role === null || ending === null || recreated === null) return;
    logEntry({
      who: who.trim(),
      role,
      compulsion: compulsion.trim(),
      ending,
      recreatedAbandonment: recreated,
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
          <Users className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          The Flip Side of Trait 4 asks us to take an <em>emotional inventory of our patterns of
          bonding</em> — to see exactly how we recreate or recycle abandonment. Add the
          relationships, jobs, groups, and events that mattered. For each one, name the seat you
          played in the Game of Dissociation, whether a compulsion was present, how it ended, and
          whether it recreated the old wound.
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          You&apos;re not grading yourself. You&apos;re looking for the pattern — once it&apos;s
          visible, it loses its grip.
        </p>
        <div className="mt-5 overflow-x-auto">
          <AbandonmentGame className="w-full h-auto min-w-[600px]" />
        </div>
      </Card>

      {/* Form */}
      <Card className="p-6 mb-4">
        <div className="grid grid-cols-1 gap-5">
          {/* who */}
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              Who or what?
            </div>
            <Input
              value={who}
              onChange={(e) => setWho(e.target.value)}
              placeholder="A partner · a job · a friend group · a family member"
            />
          </label>

          {/* role */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              Which seat did you play?
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ROLES.map((r) => {
                const active = role === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={cn(
                      "rounded-xl border p-3 text-left transition-all",
                      active
                        ? "shadow-sm"
                        : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40"
                    )}
                    style={
                      active
                        ? { borderColor: r.color, background: `color-mix(in srgb, ${r.color} 10%, transparent)` }
                        : undefined
                    }
                  >
                    <div className="font-serif text-sm font-semibold mb-0.5" style={{ color: r.color }}>
                      {r.label}
                    </div>
                    <div className="text-[11px] text-[var(--muted-foreground)] leading-snug">
                      {r.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* compulsion */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              Was a compulsion present? (optional)
            </div>
            <Input
              value={compulsion}
              onChange={(e) => setCompulsion(e.target.value)}
              placeholder="Name it, or tap a chip below"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {COMPULSION_CHIPS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCompulsion(c)}
                  className="text-[11px] rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-[var(--foreground)]/80 hover:border-[var(--primary)]/40 hover:bg-[var(--muted)]/50 transition-colors"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* ending */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              How did it end?
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ENDINGS.map((e) => {
                const active = ending === e.id;
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setEnding(e.id)}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
                      active
                        ? "border-[var(--primary)] bg-[var(--primary)]/[0.06] text-[var(--foreground)]"
                        : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/80 hover:border-[var(--primary)]/40"
                    )}
                  >
                    {e.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* recreated */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              Did it recreate the old abandonment?
            </div>
            <div className="grid grid-cols-2 gap-2 max-w-sm">
              <button
                type="button"
                onClick={() => setRecreated(true)}
                className={cn(
                  "rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
                  recreated === true
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/80 hover:border-[var(--accent)]/50"
                )}
              >
                Yes — recreated it
              </button>
              <button
                type="button"
                onClick={() => setRecreated(false)}
                className={cn(
                  "rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
                  recreated === false
                    ? "border-[var(--sage)] bg-[var(--sage)]/10 text-[var(--sage)]"
                    : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/80 hover:border-[var(--sage)]/50"
                )}
              >
                No — stayed true to myself
              </button>
            </div>
          </div>

          {/* note */}
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              What do you notice? (optional)
            </div>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="How did you feel when you made the decision to leave? What contributed?"
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          {(who || role || compulsion || ending || recreated !== null || note) && (
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
              "Add to inventory"
            )}
          </Button>
        </div>
      </Card>

      {/* Pattern summary */}
      {entries.length > 0 && (
        <Card className="p-5 md:p-6 mb-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-4">
            Your bonding pattern so far · {stats.total} {stats.total === 1 ? "entry" : "entries"}
          </div>

          {/* role distribution bars */}
          <div className="space-y-2.5 mb-5">
            {ROLES.map((r) => {
              const count = stats.byRole[r.id];
              const pct = (count / stats.maxRole) * 100;
              return (
                <div key={r.id} className="flex items-center gap-3">
                  <div className="w-20 shrink-0 text-xs font-medium" style={{ color: r.color }}>
                    {r.label}
                  </div>
                  <div className="flex-1 h-5 rounded-full bg-[var(--muted)]/50 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: r.color, opacity: count ? 0.85 : 0 }}
                    />
                  </div>
                  <div className="w-6 shrink-0 text-right text-xs font-semibold text-[var(--foreground)]">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>

          {/* recreated vs true */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[var(--border)]">
            <div className="text-center rounded-lg bg-[var(--accent)]/8 py-3">
              <div className="font-serif text-2xl font-semibold text-[var(--accent)]">
                {stats.recreatedCount}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                recreated the wound
              </div>
            </div>
            <div className="text-center rounded-lg bg-[var(--sage)]/10 py-3">
              <div className="font-serif text-2xl font-semibold text-[var(--sage)]">
                {stats.trueCount}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                stayed true to myself
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* History */}
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-xl font-semibold">The inventory</h2>
        <span className="text-xs text-[var(--muted-foreground)]">{entries.length} logged</span>
      </div>
      {entries.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          Nothing in your inventory yet. Start with one relationship that comes to mind.
        </Card>
      ) : (
        <div className="space-y-3">
          {entries.map((e) => {
            const rm = roleMeta(e.role);
            return (
              <Card key={e.id} className="p-5 relative">
                <div className="flex items-start justify-between mb-2 flex-wrap gap-2 pr-6">
                  <div className="font-serif text-base font-semibold leading-snug">{e.who}</div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    {new Date(e.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge style={{ background: rm.color, color: "white" }}>{rm.label}</Badge>
                  <Badge variant="outline" className="text-[10px]">
                    {endingLabel(e.ending)}
                  </Badge>
                  {e.compulsion && (
                    <Badge variant="muted" className="text-[10px]">
                      {e.compulsion}
                    </Badge>
                  )}
                  <Badge
                    className="text-[10px]"
                    style={{
                      background: e.recreatedAbandonment ? "var(--accent)" : "var(--sage)",
                      color: "white",
                    }}
                  >
                    {e.recreatedAbandonment ? "Recreated" : "True to self"}
                  </Badge>
                </div>
                {e.note && (
                  <p className="text-sm text-[var(--foreground)]/85 leading-relaxed font-journal">
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
