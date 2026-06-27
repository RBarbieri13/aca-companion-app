"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/textarea";
import { useAppStore } from "@/store/app-store";
import { Scale, Trash2, CheckCircle2 } from "lucide-react";
import { OverResponsibilityEngine } from "@/components/infographics/over-responsibility-engine";
import { cn } from "@/lib/utils";
import type { ResponsibilityOwner } from "@/lib/types";

const OWNERS: { id: ResponsibilityOwner; label: string; sub: string; color: string }[] = [
  { id: "mine", label: "Mine", sub: "genuinely my job", color: "var(--sage)" },
  { id: "shared", label: "Shared", sub: "ours together", color: "#C08A2D" },
  { id: "theirs", label: "Theirs", sub: "not mine to carry", color: "var(--accent)" },
];

const STARTERS = [
  "My partner's mood today",
  "A coworker's deadline",
  "My adult child's choices",
  "Keeping everyone happy at dinner",
  "A friend's feelings about my “no”",
  "My parent's regrets",
];

function ownerMeta(id: ResponsibilityOwner) {
  return OWNERS.find((o) => o.id === id)!;
}

export function ResponsibilitySorterView() {
  const items = useAppStore((s) => s.responsibilityItems);
  const logItem = useAppStore((s) => s.logResponsibilityItem);
  const updateOwner = useAppStore((s) => s.updateResponsibilityOwner);
  const del = useAppStore((s) => s.deleteResponsibilityItem);

  const [item, setItem] = useState("");
  const [owner, setOwner] = useState<ResponsibilityOwner | null>(null);
  const [energy, setEnergy] = useState(50);
  const [saved, setSaved] = useState(false);

  const canSave = item.trim().length > 0 && owner !== null;

  const stats = useMemo(() => {
    const total = items.length;
    const byOwner: Record<ResponsibilityOwner, number> = { mine: 0, shared: 0, theirs: 0 };
    let theirsEnergy = 0;
    for (const e of items) {
      byOwner[e.owner] += 1;
      if (e.owner === "theirs") theirsEnergy += e.energyCost;
    }
    return { total, byOwner, theirsEnergy };
  }, [items]);

  function reset() {
    setItem("");
    setOwner(null);
    setEnergy(50);
  }

  function save() {
    if (!canSave || owner === null) return;
    logItem({ item: item.trim(), owner, energyCost: energy, note: "" });
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
          Trait 6 is an overdeveloped sense of responsibility — we carry what was never ours,
          and it drains us. This sorter makes the load visible. Name a thing you&apos;re
          carrying, then answer one honest question: <em>whose job is this, really?</em>
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          You can re-sort any item later. The goal isn&apos;t to stop caring — it&apos;s to stop
          carrying what belongs to someone else, and get your energy back.
        </p>
        <div className="mt-5 overflow-x-auto">
          <OverResponsibilityEngine className="w-full h-auto min-w-[600px]" />
        </div>
      </Card>

      {/* Composer */}
      <Card className="p-6 mb-4">
        <div className="grid grid-cols-1 gap-5">
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              What are you carrying?
            </div>
            <Input
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="A worry, a task, a person's feelings…"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setItem(s)}
                  className="text-[11px] rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-[var(--foreground)]/80 hover:border-[var(--primary)]/40 hover:bg-[var(--muted)]/50 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </label>

          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              Whose job is it, really?
            </div>
            <div className="grid grid-cols-3 gap-2">
              {OWNERS.map((o) => {
                const active = owner === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setOwner(o.id)}
                    className={cn(
                      "rounded-xl border p-3 text-center transition-all",
                      active ? "shadow-sm" : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40"
                    )}
                    style={active ? { borderColor: o.color, background: `color-mix(in srgb, ${o.color} 12%, transparent)` } : undefined}
                  >
                    <div className="font-serif text-base font-semibold mb-0.5" style={{ color: o.color }}>{o.label}</div>
                    <div className="text-[11px] text-[var(--muted-foreground)] leading-snug">{o.sub}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              How much energy does it cost you?
            </div>
            <input
              type="range" min="0" max="100" step="1" value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-[var(--sage)] via-[var(--muted-foreground)] to-[var(--accent)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
              aria-label="Energy cost slider"
            />
            <div className="mt-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold">
              <span className="text-[var(--sage)]">light</span>
              <span className="text-[var(--muted-foreground)]">{energy}</span>
              <span className="text-[var(--accent)]">draining</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          {(item || owner) && (
            <Button variant="ghost" onClick={reset}>Clear</Button>
          )}
          <Button disabled={!canSave} onClick={save}>
            {saved ? (<><CheckCircle2 className="h-4 w-4" strokeWidth={2} />Sorted</>) : "Sort it"}
          </Button>
        </div>
      </Card>

      {/* Summary */}
      {items.length > 0 && (
        <Card className="p-5 md:p-6 mb-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-4">
            What you&apos;re carrying · {stats.total} {stats.total === 1 ? "item" : "items"}
          </div>
          <div className="grid grid-cols-3 gap-3 text-center mb-4">
            {OWNERS.map((o) => (
              <div key={o.id} className="rounded-lg py-3" style={{ background: `color-mix(in srgb, ${o.color} 10%, transparent)` }}>
                <div className="font-serif text-2xl font-semibold" style={{ color: o.color }}>{stats.byOwner[o.id]}</div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">{o.label}</div>
              </div>
            ))}
          </div>
          {stats.byOwner.theirs > 0 && (
            <div className="text-center text-sm text-[var(--muted-foreground)] pt-3 border-t border-[var(--border)]">
              You&apos;re carrying <span className="font-serif font-semibold text-[var(--accent)]">{stats.byOwner.theirs}</span>{" "}
              thing{stats.byOwner.theirs === 1 ? "" : "s"} that {stats.byOwner.theirs === 1 ? "isn't" : "aren't"} yours —
              and the energy you&apos;d get back is real.
            </div>
          )}
        </Card>
      )}

      {/* List */}
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-xl font-semibold">The load</h2>
        <span className="text-xs text-[var(--muted-foreground)]">{items.length} sorted</span>
      </div>
      {items.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          Nothing sorted yet. Name one thing you&apos;re carrying today.
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((e) => {
            const om = ownerMeta(e.owner);
            return (
              <Card key={e.id} className="p-5 relative">
                <div className="flex items-start justify-between mb-3 pr-6 gap-2">
                  <div className="font-serif text-base font-semibold leading-snug">{e.item}</div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] whitespace-nowrap">
                    {new Date(e.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
                  </span>
                </div>
                {/* re-sort chips */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {OWNERS.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => updateOwner(e.id, o.id)}
                      className={cn(
                        "text-[11px] rounded-full px-3 py-1 border transition-colors",
                        e.owner === o.id ? "text-white font-medium" : "text-[var(--foreground)]/70 border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40"
                      )}
                      style={e.owner === o.id ? { background: o.color, borderColor: o.color } : undefined}
                    >
                      {o.label}
                    </button>
                  ))}
                  <span className="ml-auto text-[11px] text-[var(--muted-foreground)]">
                    energy <span className="font-semibold" style={{ color: om.color }}>{e.energyCost}</span>
                  </span>
                </div>
                <button
                  onClick={() => del(e.id)}
                  className="absolute top-3 right-3 p-1.5 rounded text-[var(--muted-foreground)]/60 hover:text-[var(--accent)]"
                  aria-label="Delete item"
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
