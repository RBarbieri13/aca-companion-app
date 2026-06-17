"use client";

import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import type { ConsciousContactEntry } from "@/lib/types";
import { Segment, EntryRow, EmptyHint, Slider, AddButton, Field, Chip, SummaryBar } from "./_shell";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type Practice = ConsciousContactEntry["practice"];
const PRACTICES: { id: Practice; label: string }[] = [
  { id: "prayer", label: "prayer" },
  { id: "meditation", label: "meditation" },
  { id: "quiet-sit", label: "quiet-sit" },
  { id: "walk", label: "walk" },
];

function localDay(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function Step11Exercise() {
  const s = useAppStore();

  const [intention, setIntention] = useState("");
  const [practice, setPractice] = useState<Practice>("meditation");
  const [minutes, setMinutes] = useState(10);
  const [calmBefore, setCalmBefore] = useState(50);
  const [calmAfter, setCalmAfter] = useState(50);
  const [nightReview, setNightReview] = useState("");

  const recent = s.consciousContact.slice(0, 7).reverse();
  const deltas = s.consciousContact.map((c) => c.calmAfter - c.calmBefore);
  const avgDelta =
    deltas.length > 0 ? Math.round(deltas.reduce((a, b) => a + b, 0) / deltas.length) : 0;

  return (
    <div className="space-y-5">
      <Segment
        index={1}
        title="Morning intention"
        description="Pray only for knowledge of the next right thing and the strength to do it. What's your intention?"
        color="var(--sage)"
      >
        <Field
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          placeholder="Today I intend to…"
        />
      </Segment>

      <Segment
        index={2}
        title="Practice log"
        description="A few honest minutes of contact. Read your calm before and after."
        color="var(--sage)"
      >
        <div className="flex flex-wrap gap-1.5 mb-3">
          {PRACTICES.map((p) => (
            <Chip key={p.id} active={practice === p.id} onClick={() => setPractice(p.id)}>
              {p.label}
            </Chip>
          ))}
        </div>
        <Field
          type="number"
          min={0}
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          placeholder="Minutes"
          className="mb-3"
        />
        <div className="space-y-3">
          <Slider
            label="calm before"
            value={calmBefore}
            onChange={setCalmBefore}
            leftLabel="restless"
            rightLabel="settled"
            color="var(--sage)"
          />
          <Slider
            label="calm after"
            value={calmAfter}
            onChange={setCalmAfter}
            leftLabel="restless"
            rightLabel="settled"
            color="var(--sage)"
          />
        </div>
      </Segment>

      <Segment
        index={3}
        title="Night review"
        description="Where was I out of step? Where was I shown the way? A quiet look back."
        color="var(--sage)"
      >
        <div className="space-y-2 mb-3">
          {s.consciousContact.length === 0 && <EmptyHint>No sessions logged yet.</EmptyHint>}
          {s.consciousContact.map((c) => (
            <EntryRow key={c.id} onDelete={() => s.deleteConsciousContact(c.id)}>
              <span className="font-medium">{localDay(c.timestamp)}</span> · {c.practice} ·{" "}
              {c.minutes}m ·{" "}
              <span className="text-[var(--sage)]">
                calm {c.calmBefore}→{c.calmAfter}
              </span>
              {c.intention && (
                <span className="text-[var(--muted-foreground)]"> · {c.intention}</span>
              )}
              {c.nightReview && (
                <span className="text-[var(--muted-foreground)]"> · {c.nightReview}</span>
              )}
            </EntryRow>
          ))}
        </div>
        <Textarea
          value={nightReview}
          onChange={(e) => setNightReview(e.target.value)}
          placeholder="Looking back on the day…"
          rows={2}
          className="journal-input mb-1"
        />
        <AddButton
          onClick={() => {
            s.logConsciousContact({
              intention,
              practice,
              minutes,
              calmBefore,
              calmAfter,
              nightReview,
            });
            setIntention("");
            setMinutes(10);
            setCalmBefore(50);
            setCalmAfter(50);
            setNightReview("");
          }}
        >
          Save session
        </AddButton>
      </Segment>

      <Card className="p-5 bg-[var(--muted)]/30">
        <h3 className="font-serif text-base font-semibold mb-3">Capacity over time</h3>
        <p className="text-sm text-[var(--muted-foreground)] mb-3">
          {deltas.length > 0
            ? `Across ${deltas.length} session${deltas.length === 1 ? "" : "s"}, you tend to leave ${
                avgDelta >= 0 ? "+" : ""
              }${avgDelta} calmer than you arrived.`
            : "Log a session to start watching your capacity grow."}
        </p>
        {recent.length > 0 && (
          <SummaryBar
            segments={recent.map((c) => ({
              label: localDay(c.timestamp).slice(5),
              value: Math.max(0, c.calmAfter - c.calmBefore),
              color: "var(--sage)",
            }))}
          />
        )}
      </Card>
    </div>
  );
}
