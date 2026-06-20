"use client";

import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import { Segment, EntryRow, EmptyHint, AddButton, Field, Chip, SummaryBar } from "./_shell";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { ResentmentAffects } from "@/lib/types";

const AFFECTS: ResentmentAffects[] = [
  "self-esteem",
  "security",
  "ambition",
  "relationships",
  "pride",
  "pocketbook",
];

export function Step4Exercise() {
  const s = useAppStore();

  // Segment 1 — resentments
  const [rWho, setRWho] = useState("");
  const [rCause, setRCause] = useState("");
  const [rAffects, setRAffects] = useState<ResentmentAffects[]>([]);
  const [rPart, setRPart] = useState("");

  // Segment 2 — fears
  const [fFear, setFFear] = useState("");
  const [fWhy, setFWhy] = useState("");
  const [fCost, setFCost] = useState("");
  const [fAction, setFAction] = useState("");

  // Segment 3 — conduct (optional)
  const [cWho, setCWho] = useState("");
  const [cWhat, setCWhat] = useState("");
  const [cPart, setCPart] = useState("");

  // Segment 4 — harms
  const [hWho, setHWho] = useState("");
  const [hHarm, setHHarm] = useState("");

  const toggleAffect = (a: ResentmentAffects) =>
    setRAffects((cur) => (cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a]));

  return (
    <div className="space-y-5">
      <Segment
        index={1}
        title="Resentment grid"
        description="Who or what you resent, the cause, what it threatens in you, and — gently — your part. This is for clarity, not self-attack."
        color="var(--accent)"
      >
        <div className="space-y-2 mb-3">
          {s.resentments.length === 0 && <EmptyHint>No resentments logged yet.</EmptyHint>}
          {s.resentments.map((r) => (
            <EntryRow key={r.id} onDelete={() => s.deleteResentment(r.id)}>
              <span className="font-medium text-[var(--accent)]">{r.who}</span> — {r.cause}
              {r.affects.length > 0 && (
                <span className="text-[var(--muted-foreground)]"> · {r.affects.join(", ")}</span>
              )}
              {r.myPart && <span className="text-[var(--sage)]"> · my part: {r.myPart}</span>}
            </EntryRow>
          ))}
        </div>
        <Field value={rWho} onChange={(e) => setRWho(e.target.value)} placeholder="Who / what I resent" className="mb-2" />
        <Field value={rCause} onChange={(e) => setRCause(e.target.value)} placeholder="The cause" className="mb-2" />
        <div className="flex flex-wrap gap-1.5 mb-2">
          {AFFECTS.map((a) => (
            <Chip key={a} active={rAffects.includes(a)} onClick={() => toggleAffect(a)}>
              {a}
            </Chip>
          ))}
        </div>
        <Field value={rPart} onChange={(e) => setRPart(e.target.value)} placeholder="My part (optional, when you&apos;re ready)" className="mb-1" />
        <AddButton
          onClick={() => {
            if (!rWho.trim()) return;
            s.logResentment({ who: rWho, cause: rCause, affects: rAffects, myPart: rPart });
            setRWho("");
            setRCause("");
            setRAffects([]);
            setRPart("");
          }}
          disabled={!rWho.trim()}
        >
          Add resentment
        </AddButton>
      </Segment>

      <Segment
        index={2}
        title="Fear inventory"
        description="Name a fear, why it&apos;s there, what it costs you, and one faith-or-action step. Fears shrink when we look straight at them."
        color="var(--accent)"
      >
        <div className="space-y-2 mb-3">
          {s.fears.length === 0 && <EmptyHint>No fears logged yet.</EmptyHint>}
          {s.fears.map((f) => (
            <EntryRow key={f.id} onDelete={() => s.deleteFear(f.id)}>
              <span className="font-medium">{f.fear}</span>
              {f.why && <span className="text-[var(--muted-foreground)]"> · why: {f.why}</span>}
              {f.cost && <span className="text-[var(--muted-foreground)]"> · costs: {f.cost}</span>}
              {f.faithAction && <span className="text-[var(--sage)]"> · step: {f.faithAction}</span>}
            </EntryRow>
          ))}
        </div>
        <Field value={fFear} onChange={(e) => setFFear(e.target.value)} placeholder="The fear" className="mb-2" />
        <Field value={fWhy} onChange={(e) => setFWhy(e.target.value)} placeholder="Why it&apos;s there" className="mb-2" />
        <Field value={fCost} onChange={(e) => setFCost(e.target.value)} placeholder="What it costs me" className="mb-2" />
        <Field value={fAction} onChange={(e) => setFAction(e.target.value)} placeholder="A faith or action step" className="mb-1" />
        <AddButton
          onClick={() => {
            if (!fFear.trim()) return;
            s.logFear({ fear: fFear, why: fWhy, cost: fCost, faithAction: fAction });
            setFFear("");
            setFWhy("");
            setFCost("");
            setFAction("");
          }}
          disabled={!fFear.trim()}
        >
          Add fear
        </AddButton>
      </Segment>

      <Segment
        index={3}
        title="Conduct & relationships"
        description="Optional — go at the pace of safety. Where your own conduct hurt a relationship: who, what happened, and your part. Skip anything that isn&apos;t yet safe to touch."
        color="var(--accent)"
      >
        <div className="space-y-2 mb-3">
          {s.conduct.length === 0 && <EmptyHint>Nothing here yet — that&apos;s okay.</EmptyHint>}
          {s.conduct.map((c) => (
            <EntryRow key={c.id} onDelete={() => s.deleteConduct(c.id)}>
              <span className="font-medium">{c.who}</span> — {c.whatHappened}
              {c.myPart && <span className="text-[var(--sage)]"> · my part: {c.myPart}</span>}
            </EntryRow>
          ))}
        </div>
        <Field value={cWho} onChange={(e) => setCWho(e.target.value)} placeholder="Who" className="mb-2" />
        <Textarea
          value={cWhat}
          onChange={(e) => setCWhat(e.target.value)}
          placeholder="What happened"
          rows={2}
          className="journal-input mb-2"
        />
        <Field value={cPart} onChange={(e) => setCPart(e.target.value)} placeholder="My part" className="mb-1" />
        <AddButton
          onClick={() => {
            if (!cWho.trim()) return;
            s.logConduct({ who: cWho, whatHappened: cWhat, myPart: cPart });
            setCWho("");
            setCWhat("");
            setCPart("");
          }}
          disabled={!cWho.trim()}
        >
          Add note
        </AddButton>
      </Segment>

      <Segment
        index={4}
        title="Harms I&apos;ve noticed"
        description="Just notice and name them — no fixing required today. These carry over to your Step 8 list when you&apos;re ready."
        color="var(--accent)"
      >
        <div className="space-y-2 mb-3">
          {s.harms.length === 0 && <EmptyHint>No harms noted yet.</EmptyHint>}
          {s.harms.map((h) => (
            <EntryRow key={h.id} onDelete={() => s.deleteHarm(h.id)}>
              <span className="font-medium">{h.who}</span> — {h.harm}
            </EntryRow>
          ))}
        </div>
        <Field value={hWho} onChange={(e) => setHWho(e.target.value)} placeholder="Who I harmed" className="mb-2" />
        <Field value={hHarm} onChange={(e) => setHHarm(e.target.value)} placeholder="The harm" className="mb-1" />
        <AddButton
          onClick={() => {
            if (!hWho.trim()) return;
            s.logHarm({ who: hWho, harm: hHarm, willingness: 0 });
            setHWho("");
            setHHarm("");
          }}
          disabled={!hWho.trim()}
        >
          Note harm
        </AddButton>
      </Segment>

      <Card className="p-5 bg-[var(--muted)]/30">
        <h3 className="font-serif text-base font-semibold mb-2">Your inventory at a glance</h3>
        <p className="text-sm text-[var(--muted-foreground)] mb-3">
          A printable, honest view — no scores, no grades. {s.resentments.length} resentment
          {s.resentments.length === 1 ? "" : "s"} · {s.fears.length} fear
          {s.fears.length === 1 ? "" : "s"} · {s.harms.length} harm
          {s.harms.length === 1 ? "" : "s"} noted.
        </p>
        {s.resentments.length > 0 && (
          <SummaryBar
            segments={AFFECTS.map((a) => ({
              label: a,
              value: s.resentments.filter((r) => r.affects.includes(a)).length,
              color: "var(--accent)",
            }))}
          />
        )}
      </Card>
    </div>
  );
}
