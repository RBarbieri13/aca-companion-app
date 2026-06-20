"use client";

import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import { Segment, EntryRow, EmptyHint, Slider, AddButton, Field, Chip, SummaryBar } from "./_shell";
import { Card } from "@/components/ui/card";

function localDay(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function todayIso() {
  return localDay(new Date().toISOString());
}

/** Consecutive days with an entry, ending today or yesterday. */
function dailyStreak(days: Set<string>): number {
  const cursor = new Date();
  const today = todayIso();
  const yest = localDay(new Date(Date.now() - 86400000).toISOString());
  if (!days.has(today) && !days.has(yest)) return 0;
  if (!days.has(today)) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  for (;;) {
    const key = localDay(cursor.toISOString());
    if (!days.has(key)) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function Step10Exercise() {
  const s = useAppStore();

  const [resentful, setResentful] = useState(false);
  const [selfish, setSelfish] = useState(false);
  const [dishonest, setDishonest] = useState(false);
  const [afraid, setAfraid] = useState(false);
  const [mood, setMood] = useState(60);
  const [oweAmends, setOweAmends] = useState("");
  const [gratitude, setGratitude] = useState("");

  const flags: { label: string; active: boolean; toggle: () => void }[] = [
    { label: "Resentful", active: resentful, toggle: () => setResentful((v) => !v) },
    { label: "Selfish", active: selfish, toggle: () => setSelfish((v) => !v) },
    { label: "Dishonest", active: dishonest, toggle: () => setDishonest((v) => !v) },
    { label: "Afraid", active: afraid, toggle: () => setAfraid((v) => !v) },
  ];

  const days = new Set(s.tenthSteps.map((t) => localDay(t.timestamp)));
  const streak = dailyStreak(days);
  const recentMood = s.tenthSteps.slice(0, 7).reverse();

  return (
    <div className="space-y-5">
      <Segment
        index={1}
        title="Nightly spot-check"
        description="A gentle pass over the day — no shame, just an honest look. Which showed up?"
        color="var(--accent)"
      >
        <div className="flex flex-wrap gap-1.5 mb-4">
          {flags.map((f) => (
            <Chip key={f.label} active={f.active} onClick={f.toggle}>
              {f.label}
            </Chip>
          ))}
        </div>
        <Slider
          label="mood today"
          value={mood}
          onChange={setMood}
          leftLabel="heavy"
          rightLabel="light"
          color="var(--accent)"
        />
      </Segment>

      <Segment
        index={2}
        title="Anything owed?"
        description="If you owe an apology or a correction, name it here so it doesn't carry into tomorrow."
        color="var(--accent)"
      >
        <Field
          value={oweAmends}
          onChange={(e) => setOweAmends(e.target.value)}
          placeholder="An amends I owe (optional)"
        />
      </Segment>

      <Segment
        index={3}
        title="One gratitude"
        description="End the day current with your own life. Name one good thing."
        color="var(--accent)"
      >
        <div className="space-y-2 mb-3">
          {s.tenthSteps.length === 0 && <EmptyHint>No nights logged yet.</EmptyHint>}
          {s.tenthSteps.map((t) => {
            const tags = [
              t.resentful && "resentful",
              t.selfish && "selfish",
              t.dishonest && "dishonest",
              t.afraid && "afraid",
            ].filter(Boolean);
            return (
              <EntryRow key={t.id} onDelete={() => s.deleteTenthStep(t.id)}>
                <span className="font-medium">{localDay(t.timestamp)}</span> · mood {t.mood}
                {tags.length > 0 && (
                  <span className="text-[var(--accent)]"> · {tags.join(", ")}</span>
                )}
                {t.gratitude && (
                  <span className="text-[var(--sage)]"> · grateful: {t.gratitude}</span>
                )}
                {t.oweAmends && (
                  <span className="text-[var(--muted-foreground)]"> · owes: {t.oweAmends}</span>
                )}
              </EntryRow>
            );
          })}
        </div>
        <Field
          value={gratitude}
          onChange={(e) => setGratitude(e.target.value)}
          placeholder="Tonight I'm grateful for…"
        />
        <AddButton
          onClick={() => {
            s.logTenthStep({ resentful, selfish, dishonest, afraid, oweAmends, gratitude, mood });
            setResentful(false);
            setSelfish(false);
            setDishonest(false);
            setAfraid(false);
            setMood(60);
            setOweAmends("");
            setGratitude("");
          }}
        >
          Save tonight
        </AddButton>
      </Segment>

      <Card className="p-5 bg-[var(--muted)]/30">
        <h3 className="font-serif text-base font-semibold mb-3">Your Step 10 rhythm</h3>
        <p className="text-sm text-[var(--muted-foreground)] mb-3">
          {streak > 0
            ? `${streak}-day streak — the house stays clean one night at a time.`
            : "No streak going right now. Tonight is a fine place to start again."}
        </p>
        {recentMood.length > 0 && (
          <SummaryBar
            segments={recentMood.map((t) => ({
              label: localDay(t.timestamp).slice(5),
              value: t.mood,
              color: "var(--accent)",
            }))}
          />
        )}
      </Card>
    </div>
  );
}
