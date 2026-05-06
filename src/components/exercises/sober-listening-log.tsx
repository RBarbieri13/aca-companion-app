"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea, Input } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/app-store";
import { Ear, Trash2, CheckCircle2, Wind, Anchor } from "lucide-react";
import { SoberListening as SoberListeningGraphic } from "@/components/infographics/sober-listening";
import { cn } from "@/lib/utils";

type Branch = "yes" | "no" | null;

const SUGGESTED_RESPONSES_NO = [
  "“Thank you for sharing. I am sorry you feel that way.”",
  "“I hear you. I don’t see it the same way.”",
  "“I’ll sit with that, but it doesn’t resonate as true.”",
];

const SUGGESTED_RESPONSES_YES = [
  "“Thank you for showing me that.”",
  "“You’re right — I want to make that better.”",
  "“I hadn’t seen it that way. Tell me more.”",
];

export function SoberListeningLogView() {
  const logs = useAppStore((s) => s.soberListening);
  const logSober = useAppStore((s) => s.logSoberListening);
  const del = useAppStore((s) => s.deleteSoberListening);

  const [source, setSource] = useState("");
  const [criticism, setCriticism] = useState("");
  const [branch, setBranch] = useState<Branch>(null);
  const [truthFound, setTruthFound] = useState("");
  const [responseTaken, setResponseTaken] = useState("");
  const [selfWorth, setSelfWorth] = useState(60);
  const [saved, setSaved] = useState(false);

  const canSave = criticism.trim().length > 0 && branch !== null;

  const stats = useMemo(() => {
    const total = logs.length;
    const tookIn = logs.filter((l) => l.hadTruth === true).length;
    const letFly = logs.filter((l) => l.hadTruth === false).length;
    const avgWorth =
      total === 0
        ? 0
        : Math.round(logs.reduce((acc, l) => acc + l.selfWorth, 0) / total);
    return { total, tookIn, letFly, avgWorth };
  }, [logs]);

  function reset() {
    setSource("");
    setCriticism("");
    setBranch(null);
    setTruthFound("");
    setResponseTaken("");
    setSelfWorth(60);
  }

  function save() {
    if (!canSave || branch === null) return;
    logSober({
      source: source.trim(),
      criticism: criticism.trim(),
      hadTruth: branch === "yes",
      truthFound: truthFound.trim(),
      responseTaken: responseTaken.trim(),
      selfWorth,
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
          <Ear className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          When anger or criticism arrives, the workbook offers a sober posture: hear it, ask
          yourself <em>&ldquo;is there truth in this that could benefit me?&rdquo;</em>, sit with the
          answer, and either thank the person for the gift or — if it doesn&apos;t apply — let it
          fly.
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          Use this log either in the moment or right after. The point isn&apos;t to be right —
          it&apos;s to notice you stayed the adult in the room.
        </p>
        <div className="mt-5 overflow-x-auto">
          <SoberListeningGraphic className="w-full h-auto min-w-[560px]" />
        </div>
      </Card>

      {/* Step 1: capture */}
      <Card className="p-6 mb-4">
        <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-semibold mb-1">
          Step 1
        </div>
        <h3 className="font-serif text-lg font-semibold mb-4">What landed?</h3>

        <div className="grid grid-cols-1 gap-4">
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              Who or what (optional)
            </div>
            <Input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="My partner · my boss · the email from Mom"
            />
          </label>
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              What was said?
            </div>
            <Textarea
              value={criticism}
              onChange={(e) => setCriticism(e.target.value)}
              rows={3}
              placeholder="Capture the gist in their words, not yours."
            />
          </label>
        </div>
      </Card>

      {/* Step 2: the question */}
      <Card className="p-6 mb-4">
        <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-semibold mb-1">
          Step 2
        </div>
        <h3 className="font-serif text-lg font-semibold mb-1">Sit with it.</h3>
        <p className="text-sm text-[var(--muted-foreground)] mb-5 max-w-2xl">
          Is there truth in this that could benefit me? Take a breath before you answer.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => setBranch("yes")}
            className={cn(
              "rounded-xl border p-4 text-left transition-all",
              branch === "yes"
                ? "border-[var(--sage)] bg-[var(--sage)]/10 shadow-sm"
                : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--sage)]/50"
            )}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Anchor
                className={cn(
                  "h-4 w-4",
                  branch === "yes" ? "text-[var(--sage)]" : "text-[var(--muted-foreground)]"
                )}
                strokeWidth={2}
              />
              <span className="font-serif text-base font-semibold">Yes — there&apos;s something here</span>
            </div>
            <p className="text-xs text-[var(--muted-foreground)] leading-snug">
              Thank them for showing me · take responsibility · grow
            </p>
          </button>

          <button
            onClick={() => setBranch("no")}
            className={cn(
              "rounded-xl border p-4 text-left transition-all",
              branch === "no"
                ? "border-[var(--primary)] bg-[var(--primary)]/[0.06] shadow-sm"
                : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50"
            )}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Wind
                className={cn(
                  "h-4 w-4",
                  branch === "no" ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"
                )}
                strokeWidth={2}
              />
              <span className="font-serif text-base font-semibold">No — let it fly</span>
            </div>
            <p className="text-xs text-[var(--muted-foreground)] leading-snug">
              &ldquo;Thank you for sharing. I&apos;m sorry you feel that way.&rdquo;
            </p>
          </button>
        </div>
      </Card>

      {/* Step 3: response — only show after a branch is chosen */}
      {branch && (
        <Card className="p-6 mb-4">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-semibold mb-1">
            Step 3
          </div>
          <h3 className="font-serif text-lg font-semibold mb-4">
            {branch === "yes"
              ? "What’s the truth here you can take in?"
              : "Set it down. What did you (or will you) say?"}
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {branch === "yes" && (
              <label>
                <div className="text-xs uppercase tracking-wider text-[var(--sage)] font-semibold mb-1.5">
                  The benefit
                </div>
                <Textarea
                  value={truthFound}
                  onChange={(e) => setTruthFound(e.target.value)}
                  rows={3}
                  placeholder="What aspect of yourself did this show you that you might not have seen?"
                />
              </label>
            )}

            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
                Your response
              </div>
              <Textarea
                value={responseTaken}
                onChange={(e) => setResponseTaken(e.target.value)}
                rows={3}
                placeholder={
                  branch === "yes"
                    ? "What did you say, or what will you do about it?"
                    : "What did you say, or what will you say next time?"
                }
              />
              {/* Suggestion chips */}
              <div className="mt-2 flex flex-wrap gap-2">
                {(branch === "yes" ? SUGGESTED_RESPONSES_YES : SUGGESTED_RESPONSES_NO).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setResponseTaken(s)}
                    className="text-[11px] rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-[var(--foreground)]/80 hover:border-[var(--primary)]/40 hover:bg-[var(--muted)]/50 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
                Sober self-worth in this moment
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={selfWorth}
                onChange={(e) => setSelfWorth(Number(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-[var(--accent)] via-[var(--muted-foreground)] to-[var(--sage)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
                aria-label="Sober self-worth slider"
              />
              <div className="flex justify-between text-[10px] uppercase tracking-wider mt-1.5">
                <span className="text-[var(--accent)] font-semibold">defended false self</span>
                <span className="text-[var(--muted-foreground)] font-medium">{selfWorth}</span>
                <span className="text-[var(--sage)] font-semibold">stayed True Self</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="mb-8 flex justify-end gap-2">
        {(source || criticism || branch) && (
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
            "Log this listening"
          )}
        </Button>
      </div>

      {/* Stats */}
      {logs.length > 0 && (
        <Card className="p-5 md:p-6 mb-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-3">
            Your sober-listening practice so far
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-serif text-2xl font-semibold text-[var(--primary)]">{stats.total}</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                logged
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl font-semibold text-[var(--sage)]">{stats.tookIn}</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                took something in
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl font-semibold text-[var(--primary)]">{stats.letFly}</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
                let it fly
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--border)] text-center">
            <span className="text-xs text-[var(--muted-foreground)]">
              Average sober self-worth across these moments:{" "}
            </span>
            <span className="font-serif text-base font-semibold text-[var(--foreground)]">
              {stats.avgWorth}
            </span>
          </div>
        </Card>
      )}

      {/* History */}
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-xl font-semibold">Past listenings</h2>
        <span className="text-xs text-[var(--muted-foreground)]">{logs.length} logged</span>
      </div>
      {logs.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          No listenings logged yet.
        </Card>
      ) : (
        <div className="space-y-3">
          {logs.map((l) => {
            const isYes = l.hadTruth === true;
            return (
              <Card key={l.id} className="p-5 relative">
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      style={{
                        background: isYes ? "var(--sage)" : "var(--primary)",
                        color: "white",
                      }}
                    >
                      {isYes ? "Took it in" : "Let it fly"}
                    </Badge>
                    {l.source && (
                      <Badge variant="outline" className="text-[10px]">
                        {l.source}
                      </Badge>
                    )}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    {new Date(l.timestamp).toLocaleDateString([], {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <p className="font-serif italic text-[var(--foreground)]/85 leading-relaxed mb-3">
                  &ldquo;{l.criticism}&rdquo;
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {isYes && l.truthFound && (
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[var(--sage)] font-semibold mb-1">
                        Benefit
                      </div>
                      <p className="text-[var(--foreground)]/90 leading-relaxed">{l.truthFound}</p>
                    </div>
                  )}
                  {l.responseTaken && (
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1">
                        Response
                      </div>
                      <p className="text-[var(--foreground)]/90 leading-relaxed">{l.responseTaken}</p>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                  <span className="uppercase tracking-wider font-medium">Self-worth:</span>
                  <span className="font-serif font-semibold text-[var(--foreground)]">{l.selfWorth}</span>
                </div>

                <button
                  onClick={() => del(l.id)}
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
