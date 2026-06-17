"use client";

import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/app-store";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import type { Facet } from "@/lib/types";

interface ReflectionCardProps {
  stepId: number;
  facet: Facet;
  questionIndex: number;
  questionNumber: number;
  question: string;
}

export function ReflectionCard({
  stepId,
  facet,
  questionIndex,
  questionNumber,
  question,
}: ReflectionCardProps) {
  const getJournalEntry = useAppStore((s) => s.getJournalEntry);
  const upsertJournal = useAppStore((s) => s.upsertJournal);
  const existing = getJournalEntry(stepId, facet, questionIndex);

  const [content, setContent] = useState<string>(existing?.content ?? "");
  const [justSaved, setJustSaved] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string | undefined>(existing?.updatedAt);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from store after persistence rehydration.
  useEffect(() => {
    const latest = getJournalEntry(stepId, facet, questionIndex);
    if (latest) {
      setContent(latest.content);
      setUpdatedAt(latest.updatedAt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scheduleSave = (next: string) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      upsertJournal({ stepId, facet, questionIndex, content: next });
      setUpdatedAt(new Date().toISOString());
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 1200);
    }, 400);
  };

  const hasContent = content.trim().length > 0;

  return (
    <Card className="p-5 md:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--muted)] font-serif text-xs font-semibold text-[var(--primary)]">
          {questionNumber}
        </div>
        <p className="font-serif text-base md:text-lg leading-snug text-[var(--foreground)] pt-0.5">
          {question}
        </p>
      </div>

      <Textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          scheduleSave(e.target.value);
        }}
        placeholder="Start writing… (saves to this device automatically)"
        rows={5}
        className="journal-input min-h-[120px]"
      />

      <div className="mt-3 flex items-center justify-end text-[11px] text-[var(--muted-foreground)]">
        {justSaved ? (
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-[var(--sage)]" strokeWidth={2} />
            Saved
          </span>
        ) : updatedAt ? (
          <>
            Edited{" "}
            {new Date(updatedAt).toLocaleDateString([], { month: "short", day: "numeric" })}
          </>
        ) : hasContent ? (
          "Unsaved"
        ) : (
          ""
        )}
      </div>
    </Card>
  );
}
