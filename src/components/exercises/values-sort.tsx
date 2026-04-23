"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scale, RefreshCw, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const PROMPTS = [
  "Being dependable",
  "Being seen as strong",
  "Being easygoing",
  "Being kind",
  "Being admired",
  "Being self-sufficient",
  "Being productive",
  "Being helpful",
  "Being calm under pressure",
  "Being impressive",
  "Being liked",
  "Being right",
  "Being honest",
  "Being peaceful",
  "Being useful",
  "Being interesting",
  "Being respected",
  "Being creative",
  "Being forgiven",
  "Being free",
];

type Bucket = "unsorted" | "mine" | "performed";

interface SortedItem {
  prompt: string;
  bucket: Bucket;
}

const STORAGE_KEY = "aca-values-sort-v1";

function loadState(): SortedItem[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {}
  return null;
}

function initialState(): SortedItem[] {
  return PROMPTS.map((p) => ({ prompt: p, bucket: "unsorted" as Bucket }));
}

export function ValuesSort() {
  const [items, setItems] = useState<SortedItem[]>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadState();
    if (saved && saved.length === PROMPTS.length) {
      setItems(saved);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const move = (prompt: string, bucket: Bucket) => {
    setItems((curr) => curr.map((i) => (i.prompt === prompt ? { ...i, bucket } : i)));
  };

  const reset = () => {
    if (!confirm("Reset all sorting?")) return;
    setItems(initialState());
  };

  const unsorted = items.filter((i) => i.bucket === "unsorted");
  const mine = items.filter((i) => i.bucket === "mine");
  const performed = items.filter((i) => i.bucket === "performed");
  const done = unsorted.length === 0;

  return (
    <div>
      <Card className="p-5 md:p-6 mb-6 bg-[var(--muted)]/30">
        <div className="flex items-center gap-2 mb-2">
          <Scale className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          Here are twenty ways of being. For each one, ask yourself: is this an actual value of
          mine — or a role I perform to be accepted? Sort them into the two buckets. Some will
          feel obvious. Some will surprise you. You can move them later.
        </p>
        <p className="text-xs text-[var(--muted-foreground)] leading-relaxed max-w-3xl">
          There are no wrong answers. Being kind can be a value for one person and a performance
          for another. This is about <em>your</em> relationship to each word.
        </p>
      </Card>

      {/* Progress */}
      <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
        <div className="text-sm text-[var(--foreground)]/80">
          <span className="font-serif font-semibold">
            {PROMPTS.length - unsorted.length} of {PROMPTS.length}
          </span>{" "}
          sorted
          {done && (
            <Badge variant="sage" className="ml-2">
              <Check className="h-3 w-3" strokeWidth={2} />
              All sorted
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={reset} disabled={items.every((i) => i.bucket === "unsorted")}>
          <RefreshCw className="h-3 w-3" strokeWidth={2} />
          Reset
        </Button>
      </div>

      {/* Unsorted */}
      {unsorted.length > 0 && (
        <Card className="p-5 mb-5">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-3">
            To sort ({unsorted.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {unsorted.map((item) => (
              <SortablePill key={item.prompt} prompt={item.prompt} onMove={(b) => move(item.prompt, b)} />
            ))}
          </div>
        </Card>
      )}

      {/* Two buckets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Bucket
          title="My actual value"
          subtitle="Comes from inside. Holds up when no one's watching."
          color="var(--primary)"
          items={mine}
          onReturnToUnsorted={(p) => move(p, "unsorted")}
          onSwap={(p) => move(p, "performed")}
          swapLabel="Performed →"
        />
        <Bucket
          title="Something I perform"
          subtitle="Learned to get approval or keep the peace. Exhausting."
          color="var(--accent)"
          items={performed}
          onReturnToUnsorted={(p) => move(p, "unsorted")}
          onSwap={(p) => move(p, "mine")}
          swapLabel="← Value"
        />
      </div>

      {done && (
        <Card className="mt-6 p-5 bg-[var(--sage)]/10 border-[var(--sage)]/40">
          <p className="text-sm leading-relaxed text-[var(--foreground)]/85">
            <strong className="font-semibold">Sit with your two lists for a minute.</strong>{" "}
            The {performed.length} on the right are things you might have needed to be in order
            to survive, but they don&apos;t have to define you any longer. The {mine.length} on
            the left are closer to the True Self that got buried. Consider writing a line in your
            Identity Inventory about each one you recognized.
          </p>
        </Card>
      )}
    </div>
  );
}

function SortablePill({
  prompt,
  onMove,
}: {
  prompt: string;
  onMove: (b: Bucket) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--card)] pl-3 pr-1 py-1">
      <span className="text-sm font-medium text-[var(--foreground)]">{prompt}</span>
      <button
        onClick={() => onMove("mine")}
        className="rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] font-semibold px-2 py-0.5 hover:bg-[var(--primary)]/90"
        aria-label={`Mark ${prompt} as my actual value`}
      >
        Value
      </button>
      <button
        onClick={() => onMove("performed")}
        className="rounded-full bg-[var(--accent)] text-white text-[10px] font-semibold px-2 py-0.5 hover:bg-[var(--accent)]/90"
        aria-label={`Mark ${prompt} as performed`}
      >
        Performed
      </button>
    </div>
  );
}

function Bucket({
  title,
  subtitle,
  color,
  items,
  onReturnToUnsorted,
  onSwap,
  swapLabel,
}: {
  title: string;
  subtitle: string;
  color: string;
  items: SortedItem[];
  onReturnToUnsorted: (p: string) => void;
  onSwap: (p: string) => void;
  swapLabel: string;
}) {
  return (
    <Card className="p-5 h-full" style={{ borderTopColor: color, borderTopWidth: 3 }}>
      <div className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color }}>
        {title}
      </div>
      <div className="text-xs text-[var(--muted-foreground)] mb-4">{subtitle}</div>
      {items.length === 0 ? (
        <div className="text-sm text-[var(--muted-foreground)] italic py-4">
          Nothing here yet.
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <div
              key={item.prompt}
              className={cn(
                "group inline-flex items-center gap-1 rounded-full pl-3 pr-1 py-1 border"
              )}
              style={{
                background: `color-mix(in srgb, ${color} 10%, var(--card))`,
                borderColor: `color-mix(in srgb, ${color} 30%, var(--border))`,
              }}
            >
              <span className="text-sm font-medium text-[var(--foreground)]">{item.prompt}</span>
              <button
                onClick={() => onSwap(item.prompt)}
                className="rounded-full bg-[var(--muted)] hover:bg-[var(--muted)]/70 text-[9px] font-semibold px-2 py-0.5 text-[var(--muted-foreground)]"
                title="Move to the other bucket"
              >
                {swapLabel}
              </button>
              <button
                onClick={() => onReturnToUnsorted(item.prompt)}
                className="rounded-full bg-transparent hover:bg-[var(--muted)] text-[var(--muted-foreground)] text-[9px] font-medium px-1.5 py-0.5"
                title="Return to unsorted"
              >
                ↺
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
