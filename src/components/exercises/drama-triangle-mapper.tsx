"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/app-store";
import { Triangle, Trash2, CheckCircle2 } from "lucide-react";
import { DramaTriangleMap } from "@/components/infographics/drama-triangle-map";
import { cn } from "@/lib/utils";
import type { TriangleRole } from "@/lib/types";

const ROLES: { id: TriangleRole; label: string; sub: string; color: string }[] = [
  { id: "persecutor", label: "Persecutor", sub: "blamed · attacked · controlled", color: "#C08A2D" },
  { id: "rescuer", label: "Rescuer", sub: "swooped in · fixed · over-helped", color: "#6B5B95" },
  { id: "victim", label: "Victim", sub: "helpless · done-to · begging rescue", color: "#B85068" },
  { id: "outside", label: "Outside", sub: "compassionate witness", color: "var(--sage)" },
];

function roleMeta(id: TriangleRole) {
  return ROLES.find((r) => r.id === id)!;
}

export function DramaTriangleMapperView() {
  const entries = useAppStore((s) => s.dramaTriangles);
  const logEntry = useAppStore((s) => s.logDramaTriangle);
  const del = useAppStore((s) => s.deleteDramaTriangle);

  const [situation, setSituation] = useState("");
  const [role, setRole] = useState<TriangleRole | null>(null);
  const [rotation, setRotation] = useState("");
  const [exitMove, setExitMove] = useState("");
  const [saved, setSaved] = useState(false);

  const canSave = situation.trim().length > 0 && role !== null;

  const stats = useMemo(() => {
    const total = entries.length;
    const byRole: Record<TriangleRole, number> = {
      persecutor: 0,
      rescuer: 0,
      victim: 0,
      outside: 0,
    };
    for (const e of entries) byRole[e.myRole] += 1;
    const maxRole = Math.max(1, ...Object.values(byRole));
    return { total, byRole, maxRole, outside: byRole.outside };
  }, [entries]);

  function reset() {
    setSituation("");
    setRole(null);
    setRotation("");
    setExitMove("");
  }

  function save() {
    if (!canSave || role === null) return;
    logEntry({
      situation: situation.trim(),
      myRole: role,
      rotation: rotation.trim(),
      exitMove: exitMove.trim(),
    });
    reset();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function cornerButton(id: TriangleRole) {
    const r = roleMeta(id);
    const active = role === id;
    return (
      <button
        type="button"
        onClick={() => setRole(id)}
        className={cn(
          "rounded-xl border p-3 text-center transition-all w-36 sm:w-40",
          active ? "shadow-sm" : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40"
        )}
        style={
          active
            ? {
                borderColor: r.color,
                background: `color-mix(in srgb, ${r.color} 10%, transparent)`,
              }
            : undefined
        }
      >
        <div className="font-serif text-sm font-semibold mb-0.5" style={{ color: r.color }}>
          {r.label}
        </div>
        <div className="text-[11px] text-[var(--muted-foreground)] leading-snug">{r.sub}</div>
      </button>
    );
  }

  return (
    <div>
      {/* How to practice */}
      <Card className="p-5 md:p-6 mb-6 bg-[var(--muted)]/30">
        <div className="flex items-center gap-2 mb-2">
          <Triangle className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          The Flip Side of the Other Laundry List for Trait 9: <em>we have compassion for anyone
          trapped in the &ldquo;drama triangle&rdquo; — persecutor, rescuer, victim — and
          desperately searching for a way out of insanity.</em> The corners rotate: today&apos;s
          rescuer is tomorrow&apos;s victim is next week&apos;s persecutor. The workbook asks you
          to map a time you played one of them.
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          There&apos;s no shame in naming the corner — you can&apos;t step out of a triangle you
          can&apos;t see. The exit isn&apos;t coldness; it&apos;s compassion without joining the
          insanity. We stop rushing into the flames, and stand ready when asked.
        </p>
        <div className="mt-5 overflow-x-auto">
          <DramaTriangleMap className="w-full h-auto min-w-[560px]" />
        </div>
      </Card>

      {/* Composer */}
      <Card className="p-6 mb-4">
        <div className="grid grid-cols-1 gap-5">
          {/* situation */}
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              What was the drama?
            </div>
            <Input
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="A specific one — recent or old. One sentence is plenty."
            />
          </label>

          {/* triangle picker */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-3">
              Which corner did you take?
            </div>
            <div className="flex flex-col items-center gap-3">
              {/* top corner */}
              {cornerButton("persecutor")}
              {/* bottom corners */}
              <div className="flex justify-center gap-6 sm:gap-16 w-full">
                {cornerButton("rescuer")}
                {cornerButton("victim")}
              </div>
              {/* the way out */}
              <button
                type="button"
                onClick={() => setRole("outside")}
                className={cn(
                  "mt-1 rounded-full border-2 border-dashed px-5 py-2.5 text-center transition-all",
                  role === "outside"
                    ? "border-[var(--sage)] bg-[var(--sage)]/12 shadow-sm"
                    : "border-[var(--sage)]/40 bg-[var(--card)] hover:border-[var(--sage)] hover:bg-[var(--sage)]/[0.06]"
                )}
              >
                <span className="font-serif text-sm font-semibold text-[var(--sage)]">
                  Outside — compassionate witness
                </span>
                <span className="block text-[11px] text-[var(--muted-foreground)]">
                  stayed off the triangle · warm, not entangled
                </span>
              </button>
            </div>
          </div>

          {/* rotation */}
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              Who played the other corners? Did the corners rotate? (optional)
            </div>
            <Textarea
              value={rotation}
              onChange={(e) => setRotation(e.target.value)}
              rows={3}
              placeholder="e.g. I rescued, then felt used and turned persecutor; they went victim…"
            />
          </label>

          {/* exit move */}
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--sage)] font-semibold mb-1.5">
              What was — or could be — the step out? (optional)
            </div>
            <Textarea
              value={exitMove}
              onChange={(e) => setExitMove(e.target.value)}
              rows={3}
              placeholder="Compassion without joining the insanity — what would that have looked like here?"
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          {(situation || role || rotation || exitMove) && (
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
              "Map this triangle"
            )}
          </Button>
        </div>
      </Card>

      {/* Stats */}
      {entries.length > 0 && (
        <Card className="p-5 md:p-6 mb-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-4">
            Your corners so far · {stats.total} {stats.total === 1 ? "mapping" : "mappings"}
          </div>

          <div className="space-y-2.5 mb-4">
            {ROLES.map((r) => {
              const count = stats.byRole[r.id];
              const pct = (count / stats.maxRole) * 100;
              return (
                <div key={r.id} className="flex items-center gap-3">
                  <div
                    className={cn("w-28 shrink-0 text-xs font-medium", r.id === "outside" && "font-semibold")}
                    style={{ color: r.color }}
                  >
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

          <div className="pt-4 border-t border-[var(--border)] text-center">
            <span className="text-xs text-[var(--muted-foreground)]">
              Times you stayed outside the triangle —{" "}
            </span>
            <span className="font-serif text-base font-semibold text-[var(--sage)]">
              {stats.outside}
            </span>
            <span className="text-xs text-[var(--muted-foreground)]">
              {" "}
              of {stats.total}. That bar growing is the Flip Side.
            </span>
          </div>
        </Card>
      )}

      {/* History */}
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-xl font-semibold">Mapped triangles</h2>
        <span className="text-xs text-[var(--muted-foreground)]">{entries.length} logged</span>
      </div>
      {entries.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          Nothing mapped yet. Pick one drama — old or fresh — and name the corner you took.
        </Card>
      ) : (
        <div className="space-y-3">
          {entries.map((e) => {
            const rm = roleMeta(e.myRole);
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
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge style={{ background: rm.color, color: "white" }} className="text-[10px]">
                    {rm.label}
                  </Badge>
                </div>
                {e.rotation && (
                  <div className="mb-2">
                    <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold mb-1">
                      How the corners moved
                    </div>
                    <p className="text-sm text-[var(--foreground)]/85 leading-relaxed font-journal">
                      {e.rotation}
                    </p>
                  </div>
                )}
                {e.exitMove && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--sage)] font-semibold mb-1">
                      The step out
                    </div>
                    <p className="text-sm text-[var(--foreground)]/85 leading-relaxed font-journal">
                      {e.exitMove}
                    </p>
                  </div>
                )}
                <button
                  onClick={() => del(e.id)}
                  className="absolute top-3 right-3 p-1.5 rounded text-[var(--muted-foreground)]/60 hover:text-[var(--accent)]"
                  aria-label="Delete mapping"
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
