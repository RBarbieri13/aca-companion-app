"use client";

import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import { Segment, EntryRow, EmptyHint, Slider, AddButton, Field, SummaryBar } from "./_shell";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function Step2Exercise() {
  const s = useAppStore();

  // Segment 1
  const [isThings, setIsThings] = useState("");
  const [isNotThings, setIsNotThings] = useState("");

  // Segment 2
  const [evidence, setEvidence] = useState("");
  const [belief, setBelief] = useState(40);

  const latestBelief = s.beliefPoints[0];

  return (
    <div className="space-y-5">
      <Segment
        index={1}
        title="Higher-Power sketchpad"
        description="No dogma required. Sketch what a Power greater than you could be — and just as helpfully, what it is NOT."
        color="var(--primary)"
      >
        <div className="space-y-2 mb-3">
          {s.higherPowerSketches.length === 0 && (
            <EmptyHint>No sketches yet. A first guess is plenty.</EmptyHint>
          )}
          {s.higherPowerSketches.map((h) => (
            <EntryRow key={h.id} onDelete={() => s.deleteHigherPowerSketch(h.id)}>
              <span className="font-medium text-[var(--sage)]">IS:</span> {h.isThings}
              {h.isNotThings && (
                <span className="text-[var(--muted-foreground)]">
                  {" "}
                  · <span className="font-medium">IS NOT:</span> {h.isNotThings}
                </span>
              )}
            </EntryRow>
          ))}
        </div>
        <Textarea
          value={isThings}
          onChange={(e) => setIsThings(e.target.value)}
          placeholder="What it IS — loving, patient, bigger than me, the group&apos;s wisdom…"
          rows={2}
          className="journal-input mb-2"
        />
        <Textarea
          value={isNotThings}
          onChange={(e) => setIsNotThings(e.target.value)}
          placeholder="What it is NOT — a punisher, my old idea of God, a vending machine…"
          rows={2}
          className="journal-input mb-1"
        />
        <AddButton
          onClick={() => {
            if (!isThings.trim()) return;
            s.logHigherPowerSketch({ isThings, isNotThings });
            setIsThings("");
            setIsNotThings("");
          }}
          disabled={!isThings.trim()}
        >
          Save sketch
        </AddButton>
      </Segment>

      <Segment
        index={2}
        title="Evidence log"
        description="A moment that hinted a Power might be at work — then mark how much you believe, right now. No wrong number."
        color="var(--primary)"
      >
        <div className="space-y-2 mb-3">
          {s.beliefPoints.length === 0 && <EmptyHint>No evidence logged yet.</EmptyHint>}
          {s.beliefPoints.map((b) => (
            <EntryRow key={b.id} onDelete={() => s.deleteBeliefPoint(b.id)}>
              {b.evidence}{" "}
              <span className="font-serif font-semibold text-[var(--primary)]">· {b.belief}%</span>
            </EntryRow>
          ))}
        </div>
        <Field
          value={evidence}
          onChange={(e) => setEvidence(e.target.value)}
          placeholder="A coincidence, a kindness, a moment of unexpected calm…"
          className="mb-3"
        />
        <Slider
          label="belief right now"
          value={belief}
          onChange={setBelief}
          leftLabel="not yet"
          rightLabel="i believe"
          color="var(--primary)"
        />
        <AddButton
          onClick={() => {
            if (!evidence.trim()) return;
            s.logBeliefPoint({ evidence, belief });
            setEvidence("");
          }}
          disabled={!evidence.trim()}
        >
          Log evidence
        </AddButton>
      </Segment>

      <Segment
        index={3}
        title="Coming-to-believe trend"
        description="Belief isn&apos;t a switch — it&apos;s a slope. Watch your readings move over time."
        color="var(--primary)"
      >
        {s.beliefPoints.length === 0 ? (
          <EmptyHint>Log a little evidence above and your trend will appear here.</EmptyHint>
        ) : (
          <SummaryBar
            segments={[...s.beliefPoints]
              .slice(0, 6)
              .reverse()
              .map((b, i) => ({
                label: b.evidence.slice(0, 16) || `reading ${i + 1}`,
                value: b.belief,
                color: "var(--primary)",
              }))}
          />
        )}
      </Segment>

      <Card className="p-5 bg-[var(--muted)]/30">
        <h3 className="font-serif text-base font-semibold mb-3">Your Step 2 picture</h3>
        <p className="text-sm text-[var(--muted-foreground)]">
          {latestBelief
            ? `Latest belief reading ${latestBelief.belief}%`
            : "No belief reading yet"}{" "}
          · {s.higherPowerSketches.length} sketch
          {s.higherPowerSketches.length === 1 ? "" : "es"} · {s.beliefPoints.length} piece
          {s.beliefPoints.length === 1 ? "" : "s"} of evidence. Wherever you are is a fine place to
          start.
        </p>
      </Card>
    </div>
  );
}
