"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea, Input } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/app-store";
import { Ear, Trash2, CheckCircle2, ArrowRight } from "lucide-react";
import { GuiltSeesaw } from "@/components/infographics/guilt-seesaw";
import { cn } from "@/lib/utils";

const VOICE_CHIPS = [
  "A parent",
  "A caregiver",
  "A sibling",
  "A teacher",
  "A religious figure",
  "An authority figure",
  "The whole family system",
];

const STARTER_MESSAGES = [
  { message: "Who do you think you are?", reply: "Someone whose voice counts." },
  { message: "You're being selfish.", reply: "Having needs isn't selfish — it's human." },
  { message: "Don't make waves.", reply: "The truth is allowed to make a ripple." },
  { message: "After all we've done for you…", reply: "Gratitude doesn't require silence." },
  { message: "You'll upset everyone.", reply: "Their feelings are real — and so is my viewpoint." },
  { message: "Good kids don't talk back.", reply: "I'm not a kid, and this isn't talking back. It's talking." },
];

export function GuiltDecoderView() {
  const messages = useAppStore((s) => s.guiltMessages);
  const logMessage = useAppStore((s) => s.logGuiltMessage);
  const del = useAppStore((s) => s.deleteGuiltMessage);

  const [message, setMessage] = useState("");
  const [voiceSource, setVoiceSource] = useState("");
  const [reply, setReply] = useState("");
  const [saved, setSaved] = useState(false);

  const canSave = message.trim().length > 0 && reply.trim().length > 0;

  const sourceCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const m of messages) {
      const key = m.voiceSource.trim() || "Unattributed";
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [messages]);

  const maxCount = Math.max(1, ...sourceCounts.map(([, n]) => n));

  function reset() {
    setMessage("");
    setVoiceSource("");
    setReply("");
  }

  function save() {
    if (!canSave) return;
    logMessage({ message: message.trim(), voiceSource: voiceSource.trim(), trueSelfReply: reply.trim() });
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
          Laundry List Q1 asks: <em>if someone were inside your head when you felt guilty for
          standing up for yourself, what thoughts would they hear?</em> Those thoughts have
          authors. This decoder catches the guilt message, names whose voice originally said it —
          and writes the True Self reply.
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          A decoded message loses most of its power: it stops being the truth and becomes a
          quotation.
        </p>
        <div className="mt-5 overflow-x-auto">
          <GuiltSeesaw className="w-full h-auto min-w-[660px]" />
        </div>
      </Card>

      {/* Composer */}
      <Card className="p-6 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold mb-1.5">
              The guilt message
            </div>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="The thought that fires when you stand up…"
              className="border-[var(--accent)]/30 focus-visible:border-[var(--accent)]"
            />
          </div>
          <div className="hidden md:flex flex-col items-center justify-center pt-7 text-[var(--muted-foreground)]">
            <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-wider mt-1">decode</span>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--sage)] font-semibold mb-1.5">
              The True Self reply
            </div>
            <Textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={3}
              placeholder="What the capable, worthwhile you says back…"
              className="border-[var(--sage)]/40 focus-visible:border-[var(--sage)]"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
            Whose voice is it, originally? (optional)
          </div>
          <Input
            value={voiceSource}
            onChange={(e) => setVoiceSource(e.target.value)}
            placeholder="Name them, or tap a chip"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {VOICE_CHIPS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setVoiceSource(c)}
                className={cn(
                  "text-[11px] rounded-full border px-3 py-1 transition-colors",
                  voiceSource === c
                    ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] font-medium"
                    : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/80 hover:border-[var(--primary)]/40"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          {(message || reply || voiceSource) && (
            <Button variant="ghost" onClick={reset}>Clear</Button>
          )}
          <Button disabled={!canSave} onClick={save}>
            {saved ? (<><CheckCircle2 className="h-4 w-4" strokeWidth={2} />Decoded</>) : "Decode it"}
          </Button>
        </div>
      </Card>

      {/* Starters */}
      <Card className="p-5 mb-8">
        <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-3">
          Common messages — tap to load one
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {STARTER_MESSAGES.map((s) => (
            <button
              key={s.message}
              onClick={() => { setMessage(s.message); setReply(s.reply); }}
              className="text-left rounded-lg border border-[var(--border)] bg-[var(--card)] p-3 hover:border-[var(--primary)]/40 transition-colors"
            >
              <div className="text-xs italic text-[var(--accent)] leading-snug">“{s.message}”</div>
              <div className="my-1 text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">reply</div>
              <div className="text-xs italic text-[var(--sage)] leading-snug">“{s.reply}”</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Source pattern */}
      {sourceCounts.length > 0 && (
        <Card className="p-5 md:p-6 mb-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-4">
            Whose voices you&apos;ve been hearing · {messages.length} decoded
          </div>
          <div className="space-y-2.5">
            {sourceCounts.map(([source, count]) => (
              <div key={source} className="flex items-center gap-3">
                <div className="w-36 shrink-0 text-xs font-medium text-[var(--foreground)]/85 truncate">{source}</div>
                <div className="flex-1 h-5 rounded-full bg-[var(--muted)]/50 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--accent)] transition-all"
                    style={{ width: `${(count / maxCount) * 100}%`, opacity: 0.8 }}
                  />
                </div>
                <div className="w-6 shrink-0 text-right text-xs font-semibold text-[var(--foreground)]">{count}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 pt-3 border-t border-[var(--border)] text-center text-xs text-[var(--muted-foreground)] italic">
            The guilt was installed. It can be attributed — and returned to sender.
          </p>
        </Card>
      )}

      {/* Library */}
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-xl font-semibold">Decoded messages</h2>
        <span className="text-xs text-[var(--muted-foreground)]">{messages.length} decoded</span>
      </div>
      {messages.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          Nothing decoded yet. Catch the next thought that fires when you stand up.
        </Card>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <Card key={m.id} className="p-5 relative">
              <div className="flex items-start justify-between mb-2 pr-6 gap-2">
                <p className="font-serif italic text-[var(--foreground)]/85 leading-relaxed">
                  &ldquo;{m.message}&rdquo;
                </p>
                <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] whitespace-nowrap">
                  {new Date(m.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
                </span>
              </div>
              {m.voiceSource && (
                <Badge variant="outline" className="text-[10px] mb-2">voice: {m.voiceSource}</Badge>
              )}
              <div className="border-l-2 border-[var(--sage)] pl-3 mt-1">
                <div className="text-[10px] uppercase tracking-wider text-[var(--sage)] font-semibold mb-0.5">True Self reply</div>
                <p className="text-sm text-[var(--foreground)]/90 leading-relaxed font-journal">
                  &ldquo;{m.trueSelfReply}&rdquo;
                </p>
              </div>
              <button
                onClick={() => del(m.id)}
                className="absolute top-3 right-3 p-1.5 rounded text-[var(--muted-foreground)]/60 hover:text-[var(--accent)]"
                aria-label="Delete message"
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
