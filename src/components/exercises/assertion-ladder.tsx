"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/app-store";
import { TrendingUp, Trash2, CheckCircle2, Plus } from "lucide-react";
import { InnerCompassVoyage } from "@/components/infographics/inner-compass-voyage";
import { cn } from "@/lib/utils";

const STARTER_RUNGS = [
  { situation: "Return a wrong order at a restaurant", difficulty: 2 },
  { situation: "Say “let me think about it” instead of yes", difficulty: 3 },
  { situation: "Ask a friend to change plans", difficulty: 4 },
  { situation: "Disagree in a meeting at work", difficulty: 6 },
  { situation: "Say no to a family member's request", difficulty: 8 },
  { situation: "Name a hurt to the person who caused it", difficulty: 9 },
];

function calmColor(v: number | null) {
  if (v === null) return "var(--muted-foreground)";
  if (v < 40) return "var(--accent)";
  if (v < 65) return "var(--muted-foreground)";
  return "var(--sage)";
}

export function AssertionLadderView() {
  const rungs = useAppStore((s) => s.ladderRungs);
  const addRung = useAppStore((s) => s.addLadderRung);
  const markTried = useAppStore((s) => s.markRungTried);
  const del = useAppStore((s) => s.deleteLadderRung);

  const [situation, setSituation] = useState("");
  const [difficulty, setDifficulty] = useState(5);
  const [saved, setSaved] = useState(false);
  const [ratingFor, setRatingFor] = useState<string | null>(null);
  const [calm, setCalm] = useState(60);

  const sorted = useMemo(
    () => [...rungs].sort((a, b) => a.difficulty - b.difficulty || a.timestamp.localeCompare(b.timestamp)),
    [rungs]
  );

  const stats = useMemo(() => {
    const tried = rungs.filter((r) => r.tried);
    const highestTried = tried.length ? Math.max(...tried.map((r) => r.difficulty)) : null;
    return { total: rungs.length, tried: tried.length, highestTried };
  }, [rungs]);

  const canSave = situation.trim().length > 0;

  function save() {
    if (!canSave) return;
    addRung({ situation: situation.trim(), difficulty });
    setSituation("");
    setDifficulty(5);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div>
      {/* How to practice */}
      <Card className="p-5 md:p-6 mb-6 bg-[var(--muted)]/30">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          Flip Side Q3 asks for two lists: <em>Easier Situations and Harder Situations</em> for
          standing up for yourself. This builds them as one ladder. Add real situations from your
          life, place each on the 1–10 difficulty scale, and start climbing from the bottom.
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          When you try a rung, rate how calm it felt. You don&apos;t skip to the top — the easy
          rungs are practice for the hard ones. Incremental, but progressive.
        </p>
        <div className="mt-5 overflow-x-auto">
          <InnerCompassVoyage className="w-full h-auto min-w-[640px]" />
        </div>
      </Card>

      {/* Composer */}
      <Card className="p-6 mb-4">
        <div className="grid grid-cols-1 gap-5">
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              A standing-up situation from your life
            </div>
            <Input
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="Real and specific — a person, a place, an ask"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {STARTER_RUNGS.map((s) => (
                <button
                  key={s.situation}
                  type="button"
                  onClick={() => { setSituation(s.situation); setDifficulty(s.difficulty); }}
                  className="text-[11px] rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-[var(--foreground)]/80 hover:border-[var(--primary)]/40 hover:bg-[var(--muted)]/50 transition-colors"
                >
                  {s.situation}
                </button>
              ))}
            </div>
          </label>

          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
              How hard is it for you? · {difficulty}/10
            </div>
            <input
              type="range" min="1" max="10" step="1" value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-[var(--sage)] via-[#D4A84B] to-[var(--accent)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
              aria-label="Difficulty slider"
            />
            <div className="mt-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold">
              <span className="text-[var(--sage)]">easier</span>
              <span className="text-[var(--accent)]">harder</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <Button disabled={!canSave} onClick={save}>
            {saved ? (<><CheckCircle2 className="h-4 w-4" strokeWidth={2} />Added</>) : (<><Plus className="h-4 w-4" strokeWidth={2} />Add rung</>)}
          </Button>
        </div>
      </Card>

      {/* Progress */}
      {rungs.length > 0 && (
        <Card className="p-5 md:p-6 mb-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-3">
            Your climb
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-serif text-2xl font-semibold text-[var(--primary)]">{stats.total}</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">rungs</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-semibold text-[var(--sage)]">{stats.tried}</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">tried</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-semibold text-[var(--primary)]">
                {stats.highestTried === null ? "—" : `${stats.highestTried}/10`}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">highest rung tried</div>
            </div>
          </div>
        </Card>
      )}

      {/* The ladder */}
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-xl font-semibold">The ladder · easier → harder</h2>
        <span className="text-xs text-[var(--muted-foreground)]">{rungs.length} rungs</span>
      </div>
      {sorted.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          No rungs yet. Add one easy situation and one hard one — the ladder grows from both ends.
        </Card>
      ) : (
        <div className="space-y-2">
          {sorted.map((r) => (
            <Card key={r.id} className={cn("p-4 relative", r.tried && "border-[var(--sage)]/50")}>
              <div className="flex items-center gap-3 pr-8">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-serif text-sm font-bold text-white"
                  style={{
                    background: r.difficulty <= 3 ? "var(--sage)" : r.difficulty <= 6 ? "#C08A2D" : "var(--accent)",
                  }}
                >
                  {r.difficulty}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={cn("text-sm font-medium leading-snug", r.tried && "text-[var(--foreground)]")}>
                    {r.situation}
                  </div>
                  {r.tried && r.calmRating !== null && (
                    <div className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                      tried · calm <span className="font-semibold" style={{ color: calmColor(r.calmRating) }}>{r.calmRating}</span>
                    </div>
                  )}
                </div>
                {r.tried ? (
                  <Badge style={{ background: "var(--sage)", color: "white" }} className="text-[10px] shrink-0">
                    <CheckCircle2 className="h-3 w-3 mr-1" strokeWidth={2.5} />
                    Climbed
                  </Badge>
                ) : ratingFor === r.id ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <input
                      type="range" min="0" max="100" step="1" value={calm}
                      onChange={(e) => setCalm(Number(e.target.value))}
                      className="w-24 h-1.5 bg-gradient-to-r from-[var(--accent)] to-[var(--sage)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
                      aria-label="Calm rating"
                    />
                    <span className="text-[11px] w-6 text-right font-semibold" style={{ color: calmColor(calm) }}>{calm}</span>
                    <Button
                      size="sm"
                      onClick={() => { markTried(r.id, calm); setRatingFor(null); setCalm(60); }}
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" className="shrink-0" onClick={() => setRatingFor(r.id)}>
                    I tried it
                  </Button>
                )}
              </div>
              <button
                onClick={() => del(r.id)}
                className="absolute top-3 right-3 p-1 rounded text-[var(--muted-foreground)]/60 hover:text-[var(--accent)]"
                aria-label="Delete rung"
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
