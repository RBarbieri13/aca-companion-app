"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/app-store";
import { ShieldCheck, Plus, Trash2, CheckCircle2, Flag } from "lucide-react";
import { SafePersonSpectrum } from "@/components/infographics/safe-person-spectrum";
import { cn } from "@/lib/utils";

const STARTER_GREENS = [
  "Keeps their word",
  "Respects a “no” without punishing me",
  "Owns their part / apologizes",
  "Emotionally available and present",
  "Calm with my feelings",
  "Doesn't need me to fix them",
  "Curious about the real me",
  "Steady and consistent over time",
];

const STARTER_REDS = [
  "Hot then cold (intermittent)",
  "Punishes my boundaries",
  "Always a crisis or chaos",
  "Emotionally unavailable / compulsive",
  "Contempt, ridicule, or rage",
  "Keeps score · leverages guilt",
  "Love-bombs then withdraws",
  "I shrink or perform around them",
];

export function SafePersonView() {
  const criteria = useAppStore((s) => s.safePersonCriteria);
  const addCriterion = useAppStore((s) => s.addSafeCriterion);
  const deleteCriterion = useAppStore((s) => s.deleteSafeCriterion);
  const checks = useAppStore((s) => s.safePersonChecks);
  const logCheck = useAppStore((s) => s.logSafeCheck);
  const deleteCheck = useAppStore((s) => s.deleteSafeCheck);

  const greens = useMemo(() => criteria.filter((c) => c.kind === "green"), [criteria]);
  const reds = useMemo(() => criteria.filter((c) => c.kind === "red"), [criteria]);

  const [greenInput, setGreenInput] = useState("");
  const [redInput, setRedInput] = useState("");

  // Check-a-person state
  const [who, setWho] = useState("");
  const [pickedGreens, setPickedGreens] = useState<Set<string>>(new Set());
  const [pickedReds, setPickedReds] = useState<Set<string>>(new Set());
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const usedGreenTexts = new Set(greens.map((g) => g.text.toLowerCase()));
  const usedRedTexts = new Set(reds.map((r) => r.text.toLowerCase()));
  const remainingGreenStarters = STARTER_GREENS.filter((s) => !usedGreenTexts.has(s.toLowerCase()));
  const remainingRedStarters = STARTER_REDS.filter((s) => !usedRedTexts.has(s.toLowerCase()));

  function toggle(set: Set<string>, id: string, setter: (s: Set<string>) => void) {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setter(next);
  }

  const canCheck = who.trim().length > 0 && (pickedGreens.size > 0 || pickedReds.size > 0);

  function saveCheck() {
    if (!canCheck) return;
    const greenTexts = greens.filter((g) => pickedGreens.has(g.id)).map((g) => g.text);
    const redTexts = reds.filter((r) => pickedReds.has(r.id)).map((r) => r.text);
    logCheck({ who: who.trim(), greens: greenTexts, reds: redTexts, note: note.trim() });
    setWho("");
    setPickedGreens(new Set());
    setPickedReds(new Set());
    setNote("");
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  const hasCriteria = criteria.length > 0;

  return (
    <div>
      {/* How to practice */}
      <Card className="p-5 md:p-6 mb-6 bg-[var(--muted)]/30">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          The Flip Side of Trait 4 asks: <em>&ldquo;Do you study people in order to see if they are
          ‘safe’? List examples of what constitutes a ‘safe’ person.&rdquo;</em> Many of us scanned
          for danger as children — a survival reflex. As adults we can make it conscious: decide,
          on purpose and ahead of time, what safe actually looks like.
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          First build your own definition. Then, when you want, hold a specific person up against
          it — gently, as data, not a verdict.
        </p>
        <div className="mt-5 overflow-x-auto">
          <SafePersonSpectrum className="w-full h-auto min-w-[560px]" />
        </div>
      </Card>

      {/* Part 1: build the definition */}
      <div className="mb-3">
        <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-semibold">
          Part 1
        </div>
        <h3 className="font-serif text-xl font-semibold">My definition of &ldquo;safe&rdquo;</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Green flags */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Flag className="h-4 w-4 text-[var(--sage)]" strokeWidth={2} />
            <h4 className="font-serif text-base font-semibold text-[var(--sage)]">Green flags</h4>
            <span className="ml-auto text-xs text-[var(--muted-foreground)]">{greens.length}</span>
          </div>

          <div className="space-y-2 mb-3">
            {greens.map((g) => (
              <div
                key={g.id}
                className="flex items-center gap-2 rounded-lg border border-[var(--sage)]/30 bg-[var(--sage)]/[0.06] px-3 py-2"
              >
                <span className="flex-1 text-sm text-[var(--foreground)]/90">{g.text}</span>
                <button
                  onClick={() => deleteCriterion(g.id)}
                  className="text-[var(--muted-foreground)]/60 hover:text-[var(--accent)]"
                  aria-label="Remove green flag"
                >
                  <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                </button>
              </div>
            ))}
            {greens.length === 0 && (
              <p className="text-xs text-[var(--muted-foreground)] italic">
                Add what tells you someone is steady and available.
              </p>
            )}
          </div>

          <div className="flex gap-2 mb-3">
            <Input
              value={greenInput}
              onChange={(e) => setGreenInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addCriterion(greenInput, "green");
                  setGreenInput("");
                }
              }}
              placeholder="Add a green flag…"
            />
            <Button
              variant="subtle"
              size="icon"
              onClick={() => {
                addCriterion(greenInput, "green");
                setGreenInput("");
              }}
              aria-label="Add green flag"
            >
              <Plus className="h-4 w-4" strokeWidth={2} />
            </Button>
          </div>

          {remainingGreenStarters.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
                Tap to add
              </div>
              <div className="flex flex-wrap gap-1.5">
                {remainingGreenStarters.map((s) => (
                  <button
                    key={s}
                    onClick={() => addCriterion(s, "green")}
                    className="text-[11px] rounded-full border border-[var(--sage)]/40 bg-[var(--card)] px-2.5 py-1 text-[var(--foreground)]/75 hover:bg-[var(--sage)]/10 transition-colors"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Red flags */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Flag className="h-4 w-4 text-[var(--accent)]" strokeWidth={2} />
            <h4 className="font-serif text-base font-semibold text-[var(--accent)]">Red flags</h4>
            <span className="ml-auto text-xs text-[var(--muted-foreground)]">{reds.length}</span>
          </div>

          <div className="space-y-2 mb-3">
            {reds.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-2 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/[0.06] px-3 py-2"
              >
                <span className="flex-1 text-sm text-[var(--foreground)]/90">{r.text}</span>
                <button
                  onClick={() => deleteCriterion(r.id)}
                  className="text-[var(--muted-foreground)]/60 hover:text-[var(--accent)]"
                  aria-label="Remove red flag"
                >
                  <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                </button>
              </div>
            ))}
            {reds.length === 0 && (
              <p className="text-xs text-[var(--muted-foreground)] italic">
                Add what tells you someone is unavailable or unsafe for you.
              </p>
            )}
          </div>

          <div className="flex gap-2 mb-3">
            <Input
              value={redInput}
              onChange={(e) => setRedInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addCriterion(redInput, "red");
                  setRedInput("");
                }
              }}
              placeholder="Add a red flag…"
            />
            <Button
              variant="subtle"
              size="icon"
              onClick={() => {
                addCriterion(redInput, "red");
                setRedInput("");
              }}
              aria-label="Add red flag"
            >
              <Plus className="h-4 w-4" strokeWidth={2} />
            </Button>
          </div>

          {remainingRedStarters.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
                Tap to add
              </div>
              <div className="flex flex-wrap gap-1.5">
                {remainingRedStarters.map((s) => (
                  <button
                    key={s}
                    onClick={() => addCriterion(s, "red")}
                    className="text-[11px] rounded-full border border-[var(--accent)]/40 bg-[var(--card)] px-2.5 py-1 text-[var(--foreground)]/75 hover:bg-[var(--accent)]/10 transition-colors"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Part 2: check a person */}
      <div className="mb-3">
        <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-semibold">
          Part 2
        </div>
        <h3 className="font-serif text-xl font-semibold">Hold someone up to it</h3>
      </div>

      <Card className="p-6 mb-6">
        {!hasCriteria ? (
          <p className="text-sm text-[var(--muted-foreground)] italic">
            Add a few flags above first — then you can check a specific person against your own
            definition.
          </p>
        ) : (
          <>
            <label className="block mb-4">
              <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
                Who are you thinking about?
              </div>
              <Input
                value={who}
                onChange={(e) => setWho(e.target.value)}
                placeholder="A name, or just “the new friend”"
              />
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--sage)] font-semibold mb-2">
                  Green flags present
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {greens.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => toggle(pickedGreens, g.id, setPickedGreens)}
                      className={cn(
                        "text-xs rounded-full border px-3 py-1.5 transition-colors",
                        pickedGreens.has(g.id)
                          ? "border-[var(--sage)] bg-[var(--sage)]/15 text-[var(--sage)] font-medium"
                          : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/70 hover:border-[var(--sage)]/50"
                      )}
                    >
                      {g.text}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold mb-2">
                  Red flags present
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {reds.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => toggle(pickedReds, r.id, setPickedReds)}
                      className={cn(
                        "text-xs rounded-full border px-3 py-1.5 transition-colors",
                        pickedReds.has(r.id)
                          ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] font-medium"
                          : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/70 hover:border-[var(--accent)]/50"
                      )}
                    >
                      {r.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* live readout */}
            {(pickedGreens.size > 0 || pickedReds.size > 0) && (
              <div className="flex items-center gap-3 mb-4 rounded-lg bg-[var(--muted)]/40 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-xl font-semibold text-[var(--sage)]">
                    {pickedGreens.size}
                  </span>
                  <span className="text-xs text-[var(--muted-foreground)]">green</span>
                </div>
                <span className="text-[var(--border)]">·</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-xl font-semibold text-[var(--accent)]">
                    {pickedReds.size}
                  </span>
                  <span className="text-xs text-[var(--muted-foreground)]">red</span>
                </div>
                <p className="ml-auto text-xs text-[var(--muted-foreground)] italic max-w-[260px] text-right">
                  {pickedReds.size > pickedGreens.size
                    ? "Worth slowing down. Let time show you more."
                    : pickedGreens.size > 0 && pickedReds.size === 0
                    ? "Encouraging — keep watching the pattern hold."
                    : "Mixed. Safety is a pattern over time."}
                </p>
              </div>
            )}

            <label className="block mb-4">
              <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
                A note to yourself (optional)
              </div>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                placeholder="What does your gut say — and is that your wise adult or the old reflex?"
              />
            </label>

            <div className="flex justify-end">
              <Button disabled={!canCheck} onClick={saveCheck}>
                {saved ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                    Saved
                  </>
                ) : (
                  "Save this check"
                )}
              </Button>
            </div>
          </>
        )}
      </Card>

      {/* History */}
      {checks.length > 0 && (
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-serif text-xl font-semibold">Past checks</h2>
            <span className="text-xs text-[var(--muted-foreground)]">{checks.length} saved</span>
          </div>
          <div className="space-y-3">
            {checks.map((c) => (
              <Card key={c.id} className="p-5 relative">
                <div className="flex items-center gap-2 mb-2 pr-6 flex-wrap">
                  <div className="font-serif text-base font-semibold">{c.who}</div>
                  <Badge style={{ background: "var(--sage)", color: "white" }} className="text-[10px]">
                    {c.greens.length} green
                  </Badge>
                  <Badge style={{ background: "var(--accent)", color: "white" }} className="text-[10px]">
                    {c.reds.length} red
                  </Badge>
                  <span className="ml-auto text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    {new Date(c.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
                  </span>
                </div>
                {(c.greens.length > 0 || c.reds.length > 0) && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {c.greens.map((g) => (
                      <span key={g} className="text-[11px] rounded-full bg-[var(--sage)]/12 text-[var(--sage)] px-2 py-0.5">
                        {g}
                      </span>
                    ))}
                    {c.reds.map((r) => (
                      <span key={r} className="text-[11px] rounded-full bg-[var(--accent)]/12 text-[var(--accent)] px-2 py-0.5">
                        {r}
                      </span>
                    ))}
                  </div>
                )}
                {c.note && (
                  <p className="text-sm text-[var(--foreground)]/85 leading-relaxed font-journal">
                    {c.note}
                  </p>
                )}
                <button
                  onClick={() => deleteCheck(c.id)}
                  className="absolute top-3 right-3 p-1.5 rounded text-[var(--muted-foreground)]/60 hover:text-[var(--accent)]"
                  aria-label="Delete check"
                >
                  <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
