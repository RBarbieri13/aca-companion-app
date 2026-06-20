"use client";

import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import { Segment, EntryRow, EmptyHint, Slider, AddButton, Field, Chip, SummaryBar } from "./_shell";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const LIFE_AREAS = ["money", "relationships", "health", "legal", "mood", "time"];

export function Step1Exercise() {
  const s = useAppStore();

  // Segment 1
  const [incident, setIncident] = useState("");
  const [area, setArea] = useState("relationships");
  const [promise, setPromise] = useState("");

  // Segment 2
  const [domains, setDomains] = useState<Record<string, number>>(
    Object.fromEntries(LIFE_AREAS.map((a) => [a, 30]))
  );

  // Segment 3 (tape forward — shared store)
  const [urge, setUrge] = useState("");
  const [firstDrink, setFirstDrink] = useState("");
  const [thenWhat, setThenWhat] = useState("");
  const [insteadIWill, setInsteadIWill] = useState("");

  const latestMap = s.unmanageability[0];

  return (
    <div className="space-y-5">
      <Segment
        index={1}
        title="Powerlessness incidents"
        description="Times the drink did what you swore it wouldn't. Tag the life-area it touched."
        color="var(--accent)"
      >
        <div className="space-y-2 mb-3">
          {s.powerlessness.length === 0 && <EmptyHint>No incidents logged yet.</EmptyHint>}
          {s.powerlessness.map((p) => (
            <EntryRow key={p.id} onDelete={() => s.deletePowerlessness(p.id)}>
              <span className="font-medium capitalize text-[var(--accent)]">{p.lifeArea}</span> — {p.incident}
              {p.promiseBroken && (
                <span className="text-[var(--muted-foreground)]"> · broke: {p.promiseBroken}</span>
              )}
            </EntryRow>
          ))}
        </div>
        <Textarea
          value={incident}
          onChange={(e) => setIncident(e.target.value)}
          placeholder="What happened?"
          rows={2}
          className="journal-input mb-2"
        />
        <div className="flex flex-wrap gap-1.5 mb-2">
          {LIFE_AREAS.map((a) => (
            <Chip key={a} active={area === a} onClick={() => setArea(a)}>
              {a}
            </Chip>
          ))}
        </div>
        <Field
          value={promise}
          onChange={(e) => setPromise(e.target.value)}
          placeholder="A promise to yourself it broke (optional)"
          className="mb-1"
        />
        <AddButton
          onClick={() => {
            if (!incident.trim()) return;
            s.logPowerlessness({ incident, lifeArea: area, promiseBroken: promise });
            setIncident("");
            setPromise("");
          }}
          disabled={!incident.trim()}
        >
          Add incident
        </AddButton>
      </Segment>

      <Segment
        index={2}
        title="Unmanageability map"
        description="How unmanageable has each area become? Drag, then save a snapshot."
        color="var(--accent)"
      >
        <div className="space-y-3 mb-3">
          {LIFE_AREAS.map((a) => (
            <Slider
              key={a}
              label={a}
              value={domains[a]}
              onChange={(v) => setDomains((d) => ({ ...d, [a]: v }))}
              leftLabel="manageable"
              rightLabel="unmanageable"
              color="var(--accent)"
            />
          ))}
        </div>
        <Button
          variant="subtle"
          size="sm"
          onClick={() => s.logUnmanageability({ domains: { ...domains }, note: "" })}
        >
          Save snapshot
        </Button>
        {s.unmanageability.length > 0 && (
          <p className="text-xs text-[var(--muted-foreground)] mt-2">
            {s.unmanageability.length} snapshot{s.unmanageability.length === 1 ? "" : "s"} saved.{" "}
            <button
              className="underline"
              onClick={() => s.deleteUnmanageability(s.unmanageability[0].id)}
            >
              Delete latest
            </button>
          </p>
        )}
      </Segment>

      <Segment
        index={3}
        title="Play the tape forward"
        description="Take one denial — 'I can handle it this time' — and follow it past the first drink."
        color="var(--accent)"
      >
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
      </Segment>

      <Card className="p-5 bg-[var(--muted)]/30">
        <h3 className="font-serif text-base font-semibold mb-3">Your Step 1 picture</h3>
        <p className="text-sm text-[var(--muted-foreground)] mb-3">
          {s.powerlessness.length} incident{s.powerlessness.length === 1 ? "" : "s"} ·{" "}
          {latestMap
            ? `latest unmanageability avg ${Math.round(
                Object.values(latestMap.domains).reduce((a, b) => a + b, 0) /
                  Object.values(latestMap.domains).length
              )}%`
            : "no map yet"}
        </p>
        {latestMap && (
          <SummaryBar
            segments={LIFE_AREAS.map((a) => ({
              label: a,
              value: latestMap.domains[a] ?? 0,
              color: "var(--accent)",
            }))}
          />
        )}
      </Card>
    </div>
  );
}
