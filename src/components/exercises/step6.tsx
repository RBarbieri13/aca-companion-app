"use client";

import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import { Segment, EntryRow, EmptyHint, Slider, AddButton, Field, SummaryBar } from "./_shell";
import { Card } from "@/components/ui/card";

export function Step6Exercise() {
  const s = useAppStore();

  // Segment 1 — the combined readiness add-flow
  const [defect, setDefect] = useState("");
  const [readiness, setReadiness] = useState(0);
  const [fearItProtects, setFearItProtects] = useState("");
  const [practiceInstead, setPracticeInstead] = useState("");

  const reset = () => {
    setDefect("");
    setReadiness(0);
    setFearItProtects("");
    setPracticeInstead("");
  };

  return (
    <div className="space-y-5">
      <Segment
        index={1}
        title="Naming a defect, gently"
        description="Step 6 isn't about self-attack. Name one old pattern, then notice how ready you feel to let it go — no pressure to be anywhere in particular."
        color="var(--sage)"
      >
        {s.resentments.length > 0 && (
          <p className="text-xs text-[var(--muted-foreground)] mb-3">
            From your Step 4 work you logged {s.resentments.length} resentment
            {s.resentments.length === 1 ? "" : "s"} — those patterns can point you toward a defect to name here.
          </p>
        )}
        <div className="space-y-2 mb-3">
          {s.readiness.length === 0 && <EmptyHint>No defects named yet.</EmptyHint>}
          {s.readiness.map((r) => (
            <EntryRow key={r.id} onDelete={() => s.deleteReadiness(r.id)}>
              <span className="font-medium text-[var(--sage)]">{r.defect}</span> ·{" "}
              <span className="font-serif font-semibold">{r.readiness}%</span> ready
              {r.fearItProtects && (
                <span className="text-[var(--muted-foreground)]"> · protects: {r.fearItProtects}</span>
              )}
              {r.practiceInstead && (
                <span className="text-[var(--sage)]"> · instead: {r.practiceInstead}</span>
              )}
            </EntryRow>
          ))}
        </div>
        <Field
          value={defect}
          onChange={(e) => setDefect(e.target.value)}
          placeholder="The defect / old pattern"
          className="mb-3"
        />
        <div className="mb-3">
          <Slider
            label="how ready am I?"
            value={readiness}
            onChange={setReadiness}
            leftLabel="not yet"
            rightLabel="entirely ready"
            color="var(--sage)"
          />
        </div>
        <Field
          value={fearItProtects}
          onChange={(e) => setFearItProtects(e.target.value)}
          placeholder="The fear it protects (what would I lose without it?)"
          className="mb-3"
        />
        <Field
          value={practiceInstead}
          onChange={(e) => setPracticeInstead(e.target.value)}
          placeholder="What I get to practice instead"
        />
        <AddButton
          onClick={() => {
            if (!defect.trim()) return;
            s.logReadiness({ defect, readiness, fearItProtects, practiceInstead });
            reset();
          }}
          disabled={!defect.trim()}
        >
          Add defect
        </AddButton>
      </Segment>

      <Segment
        index={2}
        title="What I get to practice instead"
        description="Letting go leaves a space. These are the small new things you're choosing to grow there."
        color="var(--sage)"
      >
        <div className="space-y-2">
          {s.readiness.filter((r) => r.practiceInstead).length === 0 && (
            <EmptyHint>Add a defect above with something to practice instead.</EmptyHint>
          )}
          {s.readiness
            .filter((r) => r.practiceInstead)
            .map((r) => (
              <EntryRow key={r.id} onDelete={() => s.deleteReadiness(r.id)}>
                Instead of <span className="font-medium">{r.defect}</span>, I practice{" "}
                <span className="text-[var(--sage)] font-medium">{r.practiceInstead}</span>
              </EntryRow>
            ))}
        </div>
      </Segment>

      <Card className="p-5 bg-[var(--muted)]/30">
        <h3 className="font-serif text-base font-semibold mb-3">Your readiness heat-strip</h3>
        <p className="text-sm text-[var(--muted-foreground)] mb-3">
          {s.readiness.length} defect{s.readiness.length === 1 ? "" : "s"} named. Readiness moves at its own
          pace — every honest reading counts.
        </p>
        {s.readiness.length > 0 ? (
          <SummaryBar
            segments={s.readiness.map((r) => ({
              label: r.defect,
              value: r.readiness,
              color: "var(--sage)",
            }))}
          />
        ) : (
          <p className="text-sm italic text-[var(--muted-foreground)]">Nothing named yet — and that&apos;s okay.</p>
        )}
      </Card>
    </div>
  );
}
