"use client";

import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import { Segment, EntryRow, EmptyHint, Slider, AddButton, Field, Chip, SummaryBar } from "./_shell";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const DEFAULT_ITEMS = ["My resentments", "My fears", "My part", "The hardest one"];

export function Step5Exercise() {
  const s = useAppStore();

  // Segment 1 — checklist
  const [checklist, setChecklist] = useState<string[]>([]);
  const [customItem, setCustomItem] = useState("");
  const [customItems, setCustomItems] = useState<string[]>([]);

  // Segment 2 — weight before
  const [weightBefore, setWeightBefore] = useState(70);

  // Segment 3 — after-debrief
  const [sharedWith, setSharedWith] = useState("");
  const [weightAfter, setWeightAfter] = useState(40);
  const [note, setNote] = useState("");

  const allItems = [...DEFAULT_ITEMS, ...customItems];
  const toggleItem = (item: string) =>
    setChecklist((cur) => (cur.includes(item) ? cur.filter((x) => x !== item) : [...cur, item]));

  return (
    <div className="space-y-5">
      <Segment
        index={1}
        title="What to read or say"
        description="Pick what you&apos;re ready to share aloud. You set the pace and the order — nothing here is mandatory."
        color="var(--primary)"
      >
        <div className="flex flex-wrap gap-1.5 mb-3">
          {allItems.map((item) => (
            <Chip key={item} active={checklist.includes(item)} onClick={() => toggleItem(item)}>
              {item}
            </Chip>
          ))}
        </div>
        <Field
          value={customItem}
          onChange={(e) => setCustomItem(e.target.value)}
          placeholder="Add your own item to share…"
          className="mb-1"
        />
        <AddButton
          onClick={() => {
            const v = customItem.trim();
            if (!v || allItems.includes(v)) return;
            setCustomItems((c) => [...c, v]);
            setChecklist((c) => [...c, v]);
            setCustomItem("");
          }}
          disabled={!customItem.trim()}
        >
          Add item
        </AddButton>
      </Segment>

      <Segment
        index={2}
        title="Weight on my chest — before"
        description="Before you share, how heavy does this feel? Just a reading, not a verdict."
        color="var(--primary)"
      >
        <Slider
          label="weight right now"
          value={weightBefore}
          onChange={setWeightBefore}
          leftLabel="light"
          rightLabel="crushing"
          color="var(--primary)"
        />
      </Segment>

      <Segment
        index={3}
        title="After the share"
        description="Once you&apos;ve shared with someone you trust, come back and notice the difference. Save the session to keep your relief trend."
        color="var(--primary)"
      >
        <div className="space-y-2 mb-3">
          {s.fifthStepSessions.length === 0 && <EmptyHint>No sessions saved yet.</EmptyHint>}
          {s.fifthStepSessions.map((f) => (
            <EntryRow key={f.id} onDelete={() => s.deleteFifthStep(f.id)}>
              <span className="font-medium">{f.sharedWith || "someone trusted"}</span> ·{" "}
              <span className="text-[var(--sage)] font-serif font-semibold">
                relief {Math.max(0, f.weightBefore - f.weightAfter)}
              </span>
              {f.note && <span className="text-[var(--muted-foreground)]"> · {f.note}</span>}
            </EntryRow>
          ))}
        </div>
        <Field
          value={sharedWith}
          onChange={(e) => setSharedWith(e.target.value)}
          placeholder="Who I shared with (a role: sponsor, clergy, friend)"
          className="mb-3"
        />
        <Slider
          label="weight after"
          value={weightAfter}
          onChange={setWeightAfter}
          leftLabel="light"
          rightLabel="crushing"
          color="var(--primary)"
        />
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What it was like to be heard (optional)"
          rows={2}
          className="journal-input mt-3 mb-1"
        />
        <AddButton
          onClick={() => {
            s.logFifthStep({ sharedWith, checklist, weightBefore, weightAfter, note });
            setSharedWith("");
            setNote("");
          }}
        >
          Save session
        </AddButton>
      </Segment>

      <Card className="p-5 bg-[var(--muted)]/30">
        <h3 className="font-serif text-base font-semibold mb-3">Your relief trend</h3>
        {s.fifthStepSessions.length === 0 ? (
          <p className="text-sm text-[var(--muted-foreground)]">
            Save a session above and your relief will show here. Secrets keep their weight only while
            they stay secret.
          </p>
        ) : (
          <SummaryBar
            segments={[...s.fifthStepSessions]
              .slice(0, 6)
              .reverse()
              .map((f, i) => ({
                label: f.sharedWith || `session ${i + 1}`,
                value: Math.max(0, f.weightBefore - f.weightAfter),
                color: "var(--sage)",
              }))}
          />
        )}
      </Card>
    </div>
  );
}
