"use client";

import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/app-store";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Flame, CheckCircle2 } from "lucide-react";
import type { Quadrant } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ReflectionCardProps {
  traitId: number;
  quadrant: Quadrant;
  questionIndex: number;
  questionNumber: number;
  question: string;
}

export function ReflectionCard({
  traitId,
  quadrant,
  questionIndex,
  questionNumber,
  question,
}: ReflectionCardProps) {
  const getJournalEntry = useAppStore((s) => s.getJournalEntry);
  const upsertJournal = useAppStore((s) => s.upsertJournal);
  const existing = getJournalEntry(traitId, quadrant, questionIndex);

  const [content, setContent] = useState<string>(existing?.content ?? "");
  const [tags, setTags] = useState<string[]>(existing?.tags ?? []);
  const [tagDraft, setTagDraft] = useState("");
  const [intensity, setIntensity] = useState<number | undefined>(existing?.intensity);
  const [justSaved, setJustSaved] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from store on client (handles persistence rehydration)
  useEffect(() => {
    const latest = getJournalEntry(traitId, quadrant, questionIndex);
    if (latest) {
      setContent(latest.content);
      setTags(latest.tags);
      setIntensity(latest.intensity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scheduleSave = (patch: {
    content?: string;
    tags?: string[];
    intensity?: number;
  }) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      upsertJournal({
        traitId,
        quadrant,
        questionIndex,
        content: patch.content ?? content,
        tags: patch.tags ?? tags,
        intensity: patch.intensity ?? intensity,
      });
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 1200);
    }, 400);
  };

  const addTag = () => {
    const v = tagDraft.trim();
    if (!v || tags.includes(v)) {
      setTagDraft("");
      return;
    }
    const next = [...tags, v];
    setTags(next);
    setTagDraft("");
    scheduleSave({ tags: next });
  };

  const removeTag = (t: string) => {
    const next = tags.filter((x) => x !== t);
    setTags(next);
    scheduleSave({ tags: next });
  };

  const latest = getJournalEntry(traitId, quadrant, questionIndex);
  const hasContent = (content?.length ?? 0) > 0;

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
          scheduleSave({ content: e.target.value });
        }}
        placeholder="Start writing..."
        rows={5}
        className="journal-input min-h-[120px]"
      />

      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((t) => (
            <Badge key={t} variant="muted" className="gap-1 pr-1">
              {t}
              <button
                onClick={() => removeTag(t)}
                className="rounded-full p-0.5 hover:bg-[var(--background)]"
                aria-label={`Remove ${t}`}
              >
                <X className="h-3 w-3" strokeWidth={2} />
              </button>
            </Badge>
          ))}
          <input
            value={tagDraft}
            onChange={(e) => setTagDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            onBlur={addTag}
            placeholder="+ tag"
            className="text-xs bg-transparent border-none outline-none placeholder:text-[var(--muted-foreground)]/60 w-20"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-[var(--accent)]" strokeWidth={1.75} />
            <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium">
              Intensity
            </span>
            <div className="flex items-center gap-0.5 ml-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    setIntensity(n);
                    scheduleSave({ intensity: n });
                  }}
                  className={cn(
                    "h-5 w-5 rounded-full border text-[10px] font-medium transition-colors",
                    intensity === n
                      ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                      : "border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-[var(--muted-foreground)] min-w-[90px] text-right flex items-center justify-end gap-1">
            {justSaved ? (
              <>
                <CheckCircle2 className="h-3 w-3 text-[var(--sage)]" strokeWidth={2} />
                Saved
              </>
            ) : latest?.updatedAt ? (
              <>
                Edited{" "}
                {new Date(latest.updatedAt).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </>
            ) : hasContent ? (
              "Unsaved"
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
