"use client";

import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/app-store";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mic, CheckCircle2, Info } from "lucide-react";
import type { Step } from "@/lib/types";

const ETIQUETTE = [
  "Speak from 'I' — your own experience, not advice for the room.",
  "Watch the time so others get to share too.",
  "What's said here stays here — anonymity protects everyone.",
  "No cross-talk: we don't fix, interrupt, or comment on each other's shares.",
];

export function MeetingShare({ step }: { step: Step }) {
  const getDraft = useAppStore((s) => s.getShareDraft);
  const upsertDraft = useAppStore((s) => s.upsertShareDraft);
  const existing = getDraft(step.id);

  const [content, setContent] = useState(existing?.content ?? "");
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const latest = getDraft(step.id);
    if (latest) setContent(latest.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step.id]);

  const onChange = (v: string) => {
    setContent(v);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      upsertDraft(step.id, v);
      setSaved(true);
      setTimeout(() => setSaved(false), 1200);
    }, 400);
  };

  return (
    <section>
      <div className="flex items-center gap-2 mb-1">
        <Mic className="h-5 w-5 text-[var(--accent)]" strokeWidth={1.75} />
        <h2 className="font-serif text-2xl font-semibold">Bring it to a meeting</h2>
      </div>
      <p className="text-sm text-[var(--muted-foreground)] mb-5 max-w-2xl">
        Ready-to-use share ideas for Step {step.id}, plus a private space to draft what you&apos;ll say.
      </p>

      <div className="grid gap-4 md:grid-cols-2 mb-4">
        {step.shareIdeas.map((idea, i) => (
          <Card key={i} className="p-4 flex gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--accent)]/15 font-serif text-xs font-semibold text-[var(--accent)]">
              {i + 1}
            </div>
            <p className="text-sm text-[var(--foreground)]/90 leading-relaxed">{idea}</p>
          </Card>
        ))}
      </div>

      <Card className="p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Info className="h-4 w-4 text-[var(--muted-foreground)]" strokeWidth={1.75} />
          <h3 className="font-serif text-base font-semibold">Share etiquette</h3>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {ETIQUETTE.map((e) => (
            <li key={e} className="text-sm text-[var(--foreground)]/80 flex gap-2">
              <span className="text-[var(--sage)]">•</span>
              {e}
            </li>
          ))}
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="muted">Tradition 11 · attraction, not promotion</Badge>
          <Badge variant="muted">Tradition 12 · principles before personalities</Badge>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-serif text-base font-semibold">Draft your share</h3>
          {saved && (
            <span className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)]">
              <CheckCircle2 className="h-3 w-3 text-[var(--sage)]" strokeWidth={2} />
              Saved to this device
            </span>
          )}
        </div>
        <Textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="What do you want to say at the next meeting about this Step? Jot it here — it stays private to this device."
          rows={6}
          className="journal-input"
        />
      </Card>
    </section>
  );
}
