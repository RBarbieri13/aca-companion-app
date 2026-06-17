"use client";

import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import { Segment, EntryRow, EmptyHint, AddButton, Field } from "./_shell";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

function localDay(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function todayIso() {
  return localDay(new Date().toISOString());
}

/** Consecutive days with a service entry, ending today or yesterday. */
function serviceStreak(days: Set<string>): number {
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

export function Step12Exercise() {
  const s = useAppStore();

  const [action, setAction] = useState("");
  const [principlePracticed, setPrinciplePracticed] = useState("");
  const [reflection, setReflection] = useState("");

  const days = new Set(s.serviceLog.map((e) => localDay(e.timestamp)));
  const streak = serviceStreak(days);

  return (
    <div className="space-y-5">
      <Segment
        index={1}
        title="Service-action log"
        description="It all counts — answered a call, made coffee, set up chairs, sponsored. What did you do?"
        color="var(--primary)"
      >
        <Field
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder="A service action today"
        />
      </Segment>

      <Segment
        index={2}
        title="Principles in all my affairs"
        description="Where did one of these principles show up off the page — at work, at home, in traffic?"
        color="var(--primary)"
      >
        <Field
          value={principlePracticed}
          onChange={(e) => setPrinciplePracticed(e.target.value)}
          placeholder="A principle I practiced and where"
        />
      </Segment>

      <Segment
        index={3}
        title="Give it away to keep it"
        description="A short reflection — what came back to you by being of use to someone else?"
        color="var(--primary)"
      >
        <div className="space-y-2 mb-3">
          {s.serviceLog.length === 0 && <EmptyHint>No service logged yet.</EmptyHint>}
          {s.serviceLog.map((e) => (
            <EntryRow key={e.id} onDelete={() => s.deleteService(e.id)}>
              <span className="font-medium">{e.action}</span>
              {e.principlePracticed && (
                <span className="text-[var(--accent)]"> · {e.principlePracticed}</span>
              )}
              {e.reflection && (
                <span className="text-[var(--muted-foreground)]"> · {e.reflection}</span>
              )}
            </EntryRow>
          ))}
        </div>
        <Textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="What came back to me…"
          rows={2}
          className="journal-input mb-1"
        />
        <AddButton
          onClick={() => {
            if (!action.trim()) return;
            s.logService({ action, principlePracticed, reflection });
            setAction("");
            setPrinciplePracticed("");
            setReflection("");
          }}
          disabled={!action.trim()}
        >
          Log service
        </AddButton>
      </Segment>

      <Card className="p-5 bg-[var(--muted)]/30">
        <h3 className="font-serif text-base font-semibold mb-3">The spiral of service</h3>
        <p className="text-sm text-[var(--muted-foreground)]">
          {s.serviceLog.length} act{s.serviceLog.length === 1 ? "" : "s"} of service logged
          {streak > 0 ? ` · ${streak}-day streak` : ""}. You keep what you&apos;ve found by giving
          it away — each turn of the spiral pulls you a little further out of self and back into the
          fellowship.
        </p>
      </Card>
    </div>
  );
}
