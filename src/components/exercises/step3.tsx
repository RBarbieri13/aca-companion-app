"use client";

import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import { Segment, EntryRow, EmptyHint, AddButton, Field } from "./_shell";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function Step3Exercise() {
  const s = useAppStore();

  // Segment 1
  const [gripping, setGripping] = useState("");

  // Segment 2
  const [decision, setDecision] = useState("");

  // Segment 3
  const [checkinNote, setCheckinNote] = useState("");

  const gripItems = s.surrenderItems.filter((i) => i.kind === "gripping");
  const decisionItems = s.surrenderItems.filter((i) => i.kind === "decision");
  const checkinItems = s.surrenderItems.filter((i) => i.kind === "checkin");

  return (
    <div className="space-y-5">
      <Segment
        index={1}
        title="What I&apos;m gripping"
        description="Name what your hands are clenched around — an outcome, a person, a fear. You can&apos;t hand over what you won&apos;t name."
        color="var(--accent)"
      >
        <div className="space-y-2 mb-3">
          {gripItems.length === 0 && <EmptyHint>Nothing named yet.</EmptyHint>}
          {gripItems.map((g) => (
            <EntryRow key={g.id} onDelete={() => s.deleteSurrenderItem(g.id)}>
              {g.content}
            </EntryRow>
          ))}
        </div>
        <Field
          value={gripping}
          onChange={(e) => setGripping(e.target.value)}
          placeholder="Something I&apos;m holding too tightly…"
          className="mb-1"
        />
        <AddButton
          onClick={() => {
            if (!gripping.trim()) return;
            s.logSurrenderItem({ kind: "gripping", content: gripping });
            setGripping("");
          }}
          disabled={!gripping.trim()}
        >
          Add
        </AddButton>
      </Segment>

      <Segment
        index={2}
        title="My decision statement"
        description="Write your own turning-it-over words. There&apos;s no required formula — yours can grow, so save as many versions as you like."
        color="var(--accent)"
      >
        <div className="space-y-2 mb-3">
          {decisionItems.length === 0 && <EmptyHint>No statement written yet.</EmptyHint>}
          {decisionItems.map((d) => (
            <EntryRow key={d.id} onDelete={() => s.deleteSurrenderItem(d.id)}>
              <span className="italic">&ldquo;{d.content}&rdquo;</span>
            </EntryRow>
          ))}
        </div>
        <Textarea
          value={decision}
          onChange={(e) => setDecision(e.target.value)}
          placeholder="Today I choose to let go of the results and do the next right thing…"
          rows={3}
          className="journal-input mb-1"
        />
        <AddButton
          onClick={() => {
            if (!decision.trim()) return;
            s.logSurrenderItem({ kind: "decision", content: decision });
            setDecision("");
          }}
          disabled={!decision.trim()}
        >
          Save version
        </AddButton>
      </Segment>

      <Segment
        index={3}
        title="Turned it over today"
        description="A small daily marker. Add a word about how it felt, or just tap the button — the practice is the point, not the prose."
        color="var(--accent)"
      >
        <div className="space-y-2 mb-3">
          {checkinItems.length === 0 && <EmptyHint>No check-ins yet.</EmptyHint>}
          {checkinItems.map((c) => (
            <EntryRow key={c.id} onDelete={() => s.deleteSurrenderItem(c.id)}>
              <span className="text-[var(--muted-foreground)]">
                {new Date(c.timestamp).toLocaleDateString()} —{" "}
              </span>
              {c.content || "turned it over"}
            </EntryRow>
          ))}
        </div>
        <Field
          value={checkinNote}
          onChange={(e) => setCheckinNote(e.target.value)}
          placeholder="How it felt today (optional)"
          className="mb-1"
        />
        <Button
          variant="subtle"
          size="sm"
          className="mt-2"
          onClick={() => {
            s.logSurrenderItem({ kind: "checkin", content: checkinNote.trim() });
            setCheckinNote("");
          }}
        >
          I turned it over today
        </Button>
      </Segment>

      <Card className="p-5 bg-[var(--muted)]/30">
        <h3 className="font-serif text-base font-semibold mb-3">Your Step 3 picture</h3>
        <p className="text-sm text-[var(--muted-foreground)]">
          {gripItems.length} thing{gripItems.length === 1 ? "" : "s"} named ·{" "}
          {decisionItems.length} statement{decisionItems.length === 1 ? "" : "s"} ·{" "}
          {checkinItems.length} check-in{checkinItems.length === 1 ? "" : "s"} logged. Turning it
          over is a decision you get to make again each morning.
        </p>
      </Card>
    </div>
  );
}
