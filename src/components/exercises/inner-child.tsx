"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/app-store";
import { Heart, Trash2, Plus } from "lucide-react";
import { InnerChildDialog } from "@/components/infographics/inner-child-dialog";

export function InnerChildExercise() {
  const entries = useAppStore((s) => s.innerChild);
  const upsert = useAppStore((s) => s.upsertInnerChild);
  const del = useAppStore((s) => s.deleteInnerChild);

  const [adult, setAdult] = useState("");
  const [child, setChild] = useState("");
  const canSave = adult.trim().length > 0 || child.trim().length > 0;

  return (
    <div>
      <Card className="p-5 md:p-8 mb-6 bg-[var(--muted)]/30">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-4 w-4 text-[var(--accent)]" strokeWidth={1.75} />
              <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
                How to practice
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-2xl">
              Let the adult you speak first. Say what you know from here — calm, steady, in the present.
              Then let the child speak back, in whatever voice comes (young, frustrated, tender, silly).
              Some groups use non-dominant handwriting on paper for the child&apos;s voice. Either works.
            </p>
          </div>
          <div className="flex justify-center">
            <InnerChildDialog className="max-w-full h-auto w-[320px]" />
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--primary)] font-semibold mb-2">
              Loving Parent voice
            </div>
            <Textarea
              value={adult}
              onChange={(e) => setAdult(e.target.value)}
              placeholder="I'm here. Tell me what's happening..."
              rows={8}
              className="journal-input min-h-[180px]"
            />
          </label>
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--accent)] font-semibold mb-2">
              Inner Child voice
            </div>
            <Textarea
              value={child}
              onChange={(e) => setChild(e.target.value)}
              placeholder="I feel..."
              rows={8}
              className="journal-input min-h-[180px]"
            />
          </label>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            disabled={!canSave}
            onClick={() => {
              upsert({ adultVoice: adult, childVoice: child });
              setAdult("");
              setChild("");
            }}
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Save dialogue
          </Button>
        </div>
      </Card>

      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="font-serif text-xl font-semibold">Past dialogues</h2>
        <span className="text-xs text-[var(--muted-foreground)]">
          {entries.length} saved
        </span>
      </div>
      {entries.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          Nothing saved yet. Try one above when you&apos;re ready.
        </Card>
      ) : (
        <div className="space-y-3">
          {entries.map((e) => (
            <Card key={e.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="muted" className="text-[10px]">
                  {new Date(e.updatedAt).toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </Badge>
                <button
                  onClick={() => del(e.id)}
                  className="text-[var(--muted-foreground)] hover:text-[var(--accent)] p-1 rounded"
                  aria-label="Delete dialogue"
                >
                  <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-journal leading-relaxed">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--primary)] font-semibold mb-1">
                    Loving Parent
                  </div>
                  <p className="whitespace-pre-wrap text-[var(--foreground)]/90">
                    {e.adultVoice || <em className="text-[var(--muted-foreground)]">(blank)</em>}
                  </p>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold mb-1">
                    Inner Child
                  </div>
                  <p className="whitespace-pre-wrap text-[var(--foreground)]/90">
                    {e.childVoice || <em className="text-[var(--muted-foreground)]">(blank)</em>}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
