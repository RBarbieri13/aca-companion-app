"use client";

import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import { Segment, EntryRow, EmptyHint, Slider, AddButton, Field, SummaryBar } from "./_shell";
import { Card } from "@/components/ui/card";

export function Step8Exercise() {
  const s = useAppStore();

  const [who, setWho] = useState("");
  const [harm, setHarm] = useState("");

  const avgWillingness =
    s.harms.length > 0
      ? Math.round(s.harms.reduce((a, h) => a + h.willingness, 0) / s.harms.length)
      : 0;

  return (
    <div className="space-y-5">
      <Segment
        index={1}
        title="People I may have harmed"
        description="Step 8 is a list, not a verdict. Add whoever comes to mind — including the harms you already noticed back in Step 4. Willingness can wait."
        color="var(--sage)"
      >
        <div className="space-y-2 mb-3">
          {s.harms.length === 0 && <EmptyHint>No one on the list yet.</EmptyHint>}
          {s.harms.map((h) => (
            <EntryRow key={h.id} onDelete={() => s.deleteHarm(h.id)}>
              <div className="mb-2">
                <span className="font-medium text-[var(--sage)]">{h.who}</span>
                {h.harm && <span className="text-[var(--muted-foreground)]"> — {h.harm}</span>}
                {!h.harm && (
                  <span className="text-[var(--muted-foreground)] italic"> · imported from your Step 4 work</span>
                )}
              </div>
              <Slider
                label="willingness"
                value={h.willingness}
                onChange={(v) => s.updateHarm(h.id, { willingness: v })}
                leftLabel="unwilling"
                rightLabel="willing"
                color="var(--sage)"
              />
            </EntryRow>
          ))}
        </div>
        <Field
          value={who}
          onChange={(e) => setWho(e.target.value)}
          placeholder="Who (a role or initials is fine)"
          className="mb-2"
        />
        <Field
          value={harm}
          onChange={(e) => setHarm(e.target.value)}
          placeholder="The harm, in a sentence"
        />
        <AddButton
          onClick={() => {
            if (!who.trim()) return;
            s.logHarm({ who, harm, willingness: 0 });
            setWho("");
            setHarm("");
          }}
          disabled={!who.trim()}
        >
          Add to list
        </AddButton>
      </Segment>

      <Segment
        index={2}
        title="Becoming willing"
        description="Willingness isn't a switch — it grows. Use each slider above to mark where you honestly are today. You can move it any time."
        color="var(--sage)"
      >
        <p className="text-sm text-[var(--muted-foreground)]">
          {s.harms.length === 0
            ? "Add a name above, and the willingness slider will appear with it."
            : `Across ${s.harms.length} ${s.harms.length === 1 ? "person" : "people"}, your average willingness is ${avgWillingness}%. Wherever it sits, it's honest — and that's the point.`}
        </p>
      </Segment>

      <Card className="p-5 bg-[var(--muted)]/30">
        <h3 className="font-serif text-base font-semibold mb-3">Your willingness board</h3>
        <p className="text-sm text-[var(--muted-foreground)] mb-3">
          {s.harms.length} {s.harms.length === 1 ? "person" : "people"} on the list · average willingness{" "}
          {avgWillingness}%
        </p>
        {s.harms.length > 0 ? (
          <SummaryBar
            segments={s.harms.map((h) => ({
              label: h.who,
              value: h.willingness,
              color: "var(--sage)",
            }))}
          />
        ) : (
          <p className="text-sm italic text-[var(--muted-foreground)]">
            The list grows one honest name at a time.
          </p>
        )}
      </Card>
    </div>
  );
}
