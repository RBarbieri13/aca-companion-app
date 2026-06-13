"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea, Input } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/app-store";
import { Pencil, Trash2, CheckCircle2, Star, ArrowRight } from "lucide-react";
import { SelfTalkSpectrum } from "@/components/infographics/self-talk-spectrum";
import { cn } from "@/lib/utils";

const STARTER_PROMPTS: { victim: string; suggestion: string }[] = [
  { victim: "Why does this always happen to me?", suggestion: "What is mine in this?" },
  { victim: "I can't catch a break.",              suggestion: "I have done hard things before." },
  { victim: "Nothing I do works.",                  suggestion: "I can try one small thing." },
  { victim: "They made me feel this way.",          suggestion: "I get to decide what I do next." },
  { victim: "I have no choice.",                    suggestion: "I have a choice, even now." },
  { victim: "If only they would change…",           suggestion: "I can change what I can change." },
  { victim: "It's not fair.",                       suggestion: "I can want this to be different and accept what is." },
  { victim: "I guess this is just my life.",        suggestion: "I am the one inside this life." },
];

const CONTEXT_CHIPS = [
  "When something goes wrong",
  "In conflict",
  "When I'm alone",
  "At work",
  "With family",
  "When I'm tired",
];

export function SelfTalkRewriterView() {
  const rewrites = useAppStore((s) => s.selfTalkRewrites);
  const logRewrite = useAppStore((s) => s.logSelfTalkRewrite);
  const updateRewrite = useAppStore((s) => s.updateSelfTalkRewrite);
  const toggleFav = useAppStore((s) => s.toggleSelfTalkFavorite);
  const del = useAppStore((s) => s.deleteSelfTalkRewrite);

  const [victim, setVictim] = useState("");
  const [empowered, setEmpowered] = useState("");
  const [context, setContext] = useState("");
  const [saved, setSaved] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editEmpowered, setEditEmpowered] = useState("");

  const canSave = victim.trim().length > 0 && empowered.trim().length > 0;

  const favorites = useMemo(
    () => rewrites.filter((r) => r.isFavorite),
    [rewrites]
  );

  function reset() {
    setVictim("");
    setEmpowered("");
    setContext("");
  }

  function save() {
    if (!canSave) return;
    logRewrite({
      victimPhrase: victim.trim(),
      empoweredRewrite: empowered.trim(),
      context: context.trim(),
    });
    reset();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function applyStarter(starter: { victim: string; suggestion: string }) {
    setVictim(starter.victim);
    setEmpowered(starter.suggestion);
  }

  function startEdit(id: string, current: string) {
    setEditingId(id);
    setEditEmpowered(current);
  }
  function saveEdit() {
    if (!editingId) return;
    updateRewrite(editingId, { empoweredRewrite: editEmpowered.trim() });
    setEditingId(null);
    setEditEmpowered("");
  }

  return (
    <div>
      {/* How to practice */}
      <Card className="p-5 md:p-6 mb-6 bg-[var(--muted)]/30">
        <div className="flex items-center gap-2 mb-2">
          <Pencil className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          Trait 5 Laundry List Q4 asks: <em>&ldquo;List some phrases that might come out of a
          person&apos;s mouth who is living life from the viewpoint of a victim. What are some of
          the thoughts that might swirl around in their head?&rdquo;</em> Flip Side Q3 asks the
          twin: <em>&ldquo;What self-talk do you practice as a daily habit, or in times of
          stress?&rdquo;</em>
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          Catch one victim-thought. Write the whole-and-complete version next to it. Over time
          you build a personal library of self-talk you actually use.
        </p>
        <div className="mt-5 overflow-x-auto">
          <SelfTalkSpectrum className="w-full h-auto min-w-[640px]" />
        </div>
      </Card>

      {/* Composer */}
      <Card className="p-6 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold mb-1.5">
              Victim viewpoint phrase
            </div>
            <Textarea
              value={victim}
              onChange={(e) => setVictim(e.target.value)}
              rows={3}
              placeholder="The thought that swirled around in your head…"
              className="border-[var(--accent)]/30 focus-visible:border-[var(--accent)]"
            />
          </div>

          {/* Arrow (desktop only) */}
          <div className="hidden md:flex flex-col items-center justify-center pt-7 text-[var(--muted-foreground)]">
            <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-wider mt-1">rewrite</span>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--sage)] font-semibold mb-1.5">
              Whole &amp; complete rewrite
            </div>
            <Textarea
              value={empowered}
              onChange={(e) => setEmpowered(e.target.value)}
              rows={3}
              placeholder="The sentence the whole, complete you would say…"
              className="border-[var(--sage)]/40 focus-visible:border-[var(--sage)]"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
            Where this shows up (optional)
          </div>
          <Input
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="A situation, person, or time of day"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {CONTEXT_CHIPS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setContext(c)}
                className="text-[11px] rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-[var(--foreground)]/80 hover:border-[var(--primary)]/40 hover:bg-[var(--muted)]/50 transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          {(victim || empowered || context) && (
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
              "Add to my library"
            )}
          </Button>
        </div>
      </Card>

      {/* Starter prompts */}
      <Card className="p-5 mb-8">
        <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-3">
          Stuck? Tap one to load it
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {STARTER_PROMPTS.map((s) => (
            <button
              key={s.victim}
              onClick={() => applyStarter(s)}
              className="text-left rounded-lg border border-[var(--border)] bg-[var(--card)] p-3 hover:border-[var(--primary)]/40 transition-colors"
            >
              <div className="text-xs italic text-[var(--accent)] leading-snug">
                “{s.victim}”
              </div>
              <div className="my-1 text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                rewrite
              </div>
              <div className="text-xs italic text-[var(--sage)] leading-snug">
                “{s.suggestion}”
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Favorites */}
      {favorites.length > 0 && (
        <Card className="p-5 md:p-6 mb-6 bg-[var(--sage)]/[0.06] border-[var(--sage)]/30">
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-4 w-4 text-[var(--sage)] fill-[var(--sage)]" strokeWidth={2} />
            <div className="text-[10px] uppercase tracking-widest text-[var(--sage)] font-semibold">
              Favorites · the ones you return to
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {favorites.map((f) => (
              <div key={f.id} className="rounded-lg border border-[var(--sage)]/30 bg-[var(--card)] p-4">
                <p className="font-serif italic text-[var(--foreground)]/90 leading-relaxed">
                  &ldquo;{f.empoweredRewrite}&rdquo;
                </p>
                {f.context && (
                  <div className="mt-2 text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    {f.context}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Full library */}
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-xl font-semibold">My self-talk library</h2>
        <span className="text-xs text-[var(--muted-foreground)]">{rewrites.length} rewrites</span>
      </div>
      {rewrites.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          Nothing in your library yet. Catch one swirling thought today.
        </Card>
      ) : (
        <div className="space-y-3">
          {rewrites.map((r) => (
            <Card key={r.id} className="p-5 relative">
              <div className="flex items-start justify-between mb-3 pr-16 gap-2">
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold mb-1">
                    Victim viewpoint
                  </div>
                  <p className="font-serif italic text-[var(--foreground)]/85 leading-relaxed">
                    &ldquo;{r.victimPhrase}&rdquo;
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] whitespace-nowrap">
                  {new Date(r.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
                </span>
              </div>

              <div className="border-l-2 border-[var(--sage)] pl-4 ml-1 mb-2">
                <div className="text-[10px] uppercase tracking-wider text-[var(--sage)] font-semibold mb-1">
                  Whole &amp; complete
                </div>
                {editingId === r.id ? (
                  <div>
                    <Textarea
                      value={editEmpowered}
                      onChange={(e) => setEditEmpowered(e.target.value)}
                      rows={2}
                      className="mb-2"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={saveEdit}>
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="font-serif italic text-[var(--foreground)]/90 leading-relaxed">
                    &ldquo;{r.empoweredRewrite}&rdquo;
                  </p>
                )}
              </div>

              {r.context && (
                <Badge variant="outline" className="text-[10px] mt-1">
                  {r.context}
                </Badge>
              )}

              <div className="absolute top-3 right-3 flex items-center gap-1">
                <button
                  onClick={() => toggleFav(r.id)}
                  className={cn(
                    "p-1.5 rounded transition-colors",
                    r.isFavorite
                      ? "text-[var(--sage)]"
                      : "text-[var(--muted-foreground)]/60 hover:text-[var(--sage)]"
                  )}
                  aria-label={r.isFavorite ? "Unfavorite" : "Favorite"}
                >
                  <Star
                    className="h-4 w-4"
                    strokeWidth={1.75}
                    fill={r.isFavorite ? "var(--sage)" : "none"}
                  />
                </button>
                {editingId !== r.id && (
                  <button
                    onClick={() => startEdit(r.id, r.empoweredRewrite)}
                    className="p-1.5 rounded text-[var(--muted-foreground)]/60 hover:text-[var(--primary)]"
                    aria-label="Edit rewrite"
                  >
                    <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </button>
                )}
                <button
                  onClick={() => del(r.id)}
                  className="p-1.5 rounded text-[var(--muted-foreground)]/60 hover:text-[var(--accent)]"
                  aria-label="Delete rewrite"
                >
                  <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
