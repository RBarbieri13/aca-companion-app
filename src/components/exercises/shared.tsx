"use client";

import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import { EntryRow, EmptyHint, AddButton, Field, Chip } from "./_shell";
import { PROMISES } from "@/data/promises";
import { AFFIRMATIONS } from "@/data/affirmations";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

function localDay(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function todayIso() {
  return localDay(new Date().toISOString());
}

function ToolCard({ title, caption, children }: { title: string; caption?: string; children: React.ReactNode }) {
  return (
    <Card className="p-5">
      <h3 className="font-serif text-lg font-semibold leading-tight mb-1">{title}</h3>
      {caption && <p className="text-sm text-[var(--muted-foreground)] mb-4">{caption}</p>}
      {!caption && <div className="mb-4" />}
      {children}
    </Card>
  );
}

export function GratitudeList() {
  const s = useAppStore();
  const [draft, setDraft] = useState("");
  const [items, setItems] = useState<string[]>([]);

  return (
    <ToolCard title="Gratitude list" caption="Gratitude is a muscle — name a few things and save the list.">
      <div className="space-y-2 mb-3">
        {items.length === 0 && <EmptyHint>Add a few things you&apos;re grateful for.</EmptyHint>}
        {items.map((it, i) => (
          <EntryRow key={i} onDelete={() => setItems((xs) => xs.filter((_, j) => j !== i))}>
            {it}
          </EntryRow>
        ))}
      </div>
      <div className="flex gap-2 mb-1">
        <Field
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && draft.trim()) {
              setItems((xs) => [...xs, draft.trim()]);
              setDraft("");
            }
          }}
          placeholder="I'm grateful for…"
        />
        <Button
          variant="subtle"
          size="sm"
          onClick={() => {
            if (!draft.trim()) return;
            setItems((xs) => [...xs, draft.trim()]);
            setDraft("");
          }}
        >
          Add
        </Button>
      </div>
      <AddButton
        onClick={() => {
          if (items.length === 0) return;
          s.logGratitude(items);
          setItems([]);
        }}
        disabled={items.length === 0}
      >
        Save list
      </AddButton>

      <div className="space-y-2 mt-4">
        {s.gratitude.map((g) => (
          <EntryRow key={g.id} onDelete={() => s.deleteGratitude(g.id)}>
            <span className="font-medium">{localDay(g.timestamp)}</span> · {g.items.join(", ")}
          </EntryRow>
        ))}
      </div>
    </ToolCard>
  );
}

export function HaltCheckInTool() {
  const s = useAppStore();
  const [hungry, setHungry] = useState(false);
  const [angry, setAngry] = useState(false);
  const [lonely, setLonely] = useState(false);
  const [tired, setTired] = useState(false);
  const [note, setNote] = useState("");

  const flags: { label: string; active: boolean; toggle: () => void }[] = [
    { label: "Hungry", active: hungry, toggle: () => setHungry((v) => !v) },
    { label: "Angry", active: angry, toggle: () => setAngry((v) => !v) },
    { label: "Lonely", active: lonely, toggle: () => setLonely((v) => !v) },
    { label: "Tired", active: tired, toggle: () => setTired((v) => !v) },
  ];

  return (
    <ToolCard title="HALT check-in" caption="Most emergencies have a simpler name.">
      <div className="flex flex-wrap gap-1.5 mb-3">
        {flags.map((f) => (
          <Chip key={f.label} active={f.active} onClick={f.toggle}>
            {f.label}
          </Chip>
        ))}
      </div>
      <Field value={note} onChange={(e) => setNote(e.target.value)} placeholder="A note (optional)" />
      <AddButton
        onClick={() => {
          s.logHalt({ hungry, angry, lonely, tired, note });
          setHungry(false);
          setAngry(false);
          setLonely(false);
          setTired(false);
          setNote("");
        }}
      >
        Log check-in
      </AddButton>

      <div className="space-y-2 mt-4">
        {s.haltCheckIns.length === 0 && <EmptyHint>No check-ins yet.</EmptyHint>}
        {s.haltCheckIns.map((h) => {
          const tags = [
            h.hungry && "hungry",
            h.angry && "angry",
            h.lonely && "lonely",
            h.tired && "tired",
          ].filter(Boolean);
          return (
            <EntryRow key={h.id} onDelete={() => s.deleteHalt(h.id)}>
              <span className="font-medium">{localDay(h.timestamp)}</span> ·{" "}
              {tags.length > 0 ? tags.join(", ") : "all clear"}
              {h.note && <span className="text-[var(--muted-foreground)]"> · {h.note}</span>}
            </EntryRow>
          );
        })}
      </div>
    </ToolCard>
  );
}

export function TapeForward() {
  const s = useAppStore();
  const [urge, setUrge] = useState("");
  const [firstDrink, setFirstDrink] = useState("");
  const [thenWhat, setThenWhat] = useState("");
  const [insteadIWill, setInsteadIWill] = useState("");

  return (
    <ToolCard title="Play the tape forward" caption="Follow the urge past the first drink to where it really ends.">
      <div className="space-y-2 mb-3">
        {s.tapeEntries.length === 0 && <EmptyHint>No tapes played yet.</EmptyHint>}
        {s.tapeEntries.map((t) => (
          <EntryRow key={t.id} onDelete={() => s.deleteTape(t.id)}>
            <span className="font-medium">{t.urge}</span> → {t.firstDrink} → {t.thenWhat} ·{" "}
            <span className="text-[var(--sage)]">instead: {t.insteadIWill}</span>
          </EntryRow>
        ))}
      </div>
      <div className="grid gap-2">
        <Field value={urge} onChange={(e) => setUrge(e.target.value)} placeholder="The denial / urge" />
        <Field value={firstDrink} onChange={(e) => setFirstDrink(e.target.value)} placeholder="What the first drink promises" />
        <Field value={thenWhat} onChange={(e) => setThenWhat(e.target.value)} placeholder="…and then what actually happens" />
        <Field value={insteadIWill} onChange={(e) => setInsteadIWill(e.target.value)} placeholder="Instead, I will…" />
      </div>
      <AddButton
        onClick={() => {
          if (!urge.trim()) return;
          s.logTape({ urge, firstDrink, thenWhat, insteadIWill });
          setUrge("");
          setFirstDrink("");
          setThenWhat("");
          setInsteadIWill("");
        }}
        disabled={!urge.trim()}
      >
        Save tape
      </AddButton>
    </ToolCard>
  );
}

export function PromisesTracker() {
  const s = useAppStore();
  const noticed = s.promiseProgress.length;

  return (
    <ToolCard title="The Promises" caption={`${noticed} of 9 noticed — these come true as a natural result, not a reward.`}>
      <div className="space-y-2">
        {PROMISES.map((p) => {
          const prog = s.promiseProgress.find((x) => x.id === p.id);
          return (
            <div
              key={p.id}
              className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{p.title}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{p.text}</p>
                </div>
                {prog ? (
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge variant="sage">noticed {prog.firstNoticed}</Badge>
                    <button
                      className="text-xs underline text-[var(--muted-foreground)]"
                      onClick={() => s.clearPromiseProgress(p.id)}
                    >
                      clear
                    </button>
                  </div>
                ) : (
                  <Button
                    variant="subtle"
                    size="sm"
                    className="shrink-0"
                    onClick={() => s.setPromiseProgress(p.id, todayIso(), "")}
                  >
                    Mark first noticed
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </ToolCard>
  );
}

export function AffirmationCard() {
  const s = useAppStore();
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  const [offset, setOffset] = useState(0);
  const index = (dayOfYear + offset) % AFFIRMATIONS.length;
  const text = AFFIRMATIONS[index];
  const isFav = s.favoriteAffirmations.includes(text);

  return (
    <ToolCard title="Today's affirmation">
      <p className="font-serif text-base leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
      <div className="flex items-center gap-2">
        <Button variant="subtle" size="sm" onClick={() => setOffset((o) => o + 1)}>
          Another
        </Button>
        <Button
          variant="subtle"
          size="sm"
          onClick={() => s.toggleFavoriteAffirmation(text)}
          aria-label="Favorite affirmation"
        >
          <Heart
            className="h-4 w-4"
            strokeWidth={1.75}
            fill={isFav ? "currentColor" : "none"}
          />
        </Button>
      </div>

      {s.favoriteAffirmations.length > 0 && (
        <div className="space-y-2 mt-4">
          <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">Favorites</p>
          {s.favoriteAffirmations.map((f) => (
            <EntryRow key={f} onDelete={() => s.toggleFavoriteAffirmation(f)}>
              {f}
            </EntryRow>
          ))}
        </div>
      )}
    </ToolCard>
  );
}
