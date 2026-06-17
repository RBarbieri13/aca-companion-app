"use client";

import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import { Segment, EntryRow, EmptyHint, AddButton, Field } from "./_shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Step7Exercise() {
  const s = useAppStore();

  const [shortcoming, setShortcoming] = useState("");
  const [rightSizedView, setRightSizedView] = useState("");

  const askedCount = s.shortcomings.filter((x) => x.askedToday).length;

  return (
    <div className="space-y-5">
      <Segment
        index={1}
        title="A shortcoming, right-sized"
        description="Step 7 asks for humility, not humiliation. Name a shortcoming, then write the right-sized truth that sits beside it — neither too big nor too small."
        color="var(--sage)"
      >
        <div className="space-y-2 mb-3">
          {s.shortcomings.length === 0 && <EmptyHint>No shortcomings named yet.</EmptyHint>}
          {s.shortcomings.map((x) => (
            <EntryRow key={x.id} onDelete={() => s.deleteShortcoming(x.id)}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="font-medium text-[var(--sage)]">{x.shortcoming}</span>
                  {x.rightSizedView && (
                    <span className="text-[var(--muted-foreground)]"> → {x.rightSizedView}</span>
                  )}
                </div>
                <Button
                  variant={x.askedToday ? "default" : "subtle"}
                  size="sm"
                  className="shrink-0"
                  onClick={() => s.updateShortcoming(x.id, { askedToday: !x.askedToday })}
                >
                  {x.askedToday ? "Asked today ✓" : "Asked today"}
                </Button>
              </div>
            </EntryRow>
          ))}
        </div>
        <Field
          value={shortcoming}
          onChange={(e) => setShortcoming(e.target.value)}
          placeholder="The shortcoming"
          className="mb-2"
        />
        <Field
          value={rightSizedView}
          onChange={(e) => setRightSizedView(e.target.value)}
          placeholder="The right-sized view (the humility reframe)"
        />
        <AddButton
          onClick={() => {
            if (!shortcoming.trim()) return;
            s.logShortcoming({ shortcoming, rightSizedView, askedToday: false });
            setShortcoming("");
            setRightSizedView("");
          }}
          disabled={!shortcoming.trim()}
        >
          Add shortcoming
        </AddButton>
      </Segment>

      <Segment
        index={2}
        title="Humbly asked, today"
        description="Each day you can quietly ask for one shortcoming to be lifted. Tap a shortcoming above to mark it asked — this isn't a test you pass, just a practice you return to."
        color="var(--sage)"
      >
        <div className="flex items-center gap-3">
          <Badge variant="sage">{askedCount} asked today</Badge>
          <span className="text-sm text-[var(--muted-foreground)]">
            of {s.shortcomings.length} named
          </span>
        </div>
        {s.shortcomings.length > 0 && askedCount === 0 && (
          <p className="text-xs text-[var(--muted-foreground)] mt-2">
            Nothing marked yet today — whenever you&apos;re ready.
          </p>
        )}
      </Segment>

      <Card className="p-5 bg-[var(--muted)]/30">
        <h3 className="font-serif text-base font-semibold mb-3">Your Step 7 practice</h3>
        <p className="text-sm text-[var(--muted-foreground)]">
          {askedCount} of {s.shortcomings.length} shortcoming
          {s.shortcomings.length === 1 ? "" : "s"} humbly asked about today.{" "}
          {s.shortcomings.length === 0
            ? "Start by naming one above."
            : askedCount === s.shortcomings.length
              ? "Every one tended to today — gently done."
              : "Progress, not perfection. Come back tomorrow."}
        </p>
      </Card>
    </div>
  );
}
