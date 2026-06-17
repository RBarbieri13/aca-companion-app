"use client";

import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import { Segment, EmptyHint, AddButton, Field, Chip } from "./_shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AmendsType, AmendsStatus } from "@/lib/types";
import { Trash2 } from "lucide-react";

const TYPES: { value: AmendsType; label: string }[] = [
  { value: "direct", label: "direct" },
  { value: "living", label: "living" },
  { value: "indirect", label: "indirect" },
  { value: "none-yet", label: "none yet" },
];

const COLUMNS: { status: AmendsStatus; label: string }[] = [
  { status: "willing", label: "Willing" },
  { status: "planned", label: "Planned" },
  { status: "made", label: "Made" },
];

const NEXT: Record<AmendsStatus, AmendsStatus | null> = {
  willing: "planned",
  planned: "made",
  made: null,
};
const PREV: Record<AmendsStatus, AmendsStatus | null> = {
  willing: null,
  planned: "willing",
  made: "planned",
};

export function Step9Exercise() {
  const s = useAppStore();

  const [who, setWho] = useState("");
  const [harm, setHarm] = useState("");
  const [type, setType] = useState<AmendsType>("direct");
  const [wouldInjure, setWouldInjure] = useState(false);
  const [plan, setPlan] = useState("");

  const counts = {
    willing: s.amends.filter((a) => a.status === "willing").length,
    planned: s.amends.filter((a) => a.status === "planned").length,
    made: s.amends.filter((a) => a.status === "made").length,
  };

  return (
    <div className="space-y-5">
      <Segment
        index={1}
        title="Draft an amend"
        description="Choose a kind of amend, name the plan, and flag anything that could cause more harm. Nothing here is committed until you are."
        color="var(--sage)"
      >
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
          className="mb-3"
        />
        <div className="flex flex-wrap gap-1.5 mb-3">
          {TYPES.map((t) => (
            <Chip key={t.value} active={type === t.value} onClick={() => setType(t.value)}>
              {t.label}
            </Chip>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setWouldInjure((v) => !v)}
          className="flex items-center gap-2 mb-3 text-sm"
        >
          <span
            className="flex h-4 w-4 items-center justify-center rounded border border-[var(--border)]"
            style={{ background: wouldInjure ? "var(--sage)" : "transparent" }}
          >
            {wouldInjure && <span className="text-[10px] text-white">✓</span>}
          </span>
          Would making it directly injure them or others?
        </button>
        <Field
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          placeholder="The plan (what, and how I'll go about it)"
        />
        <AddButton
          onClick={() => {
            if (!who.trim()) return;
            s.logAmends({ who, harm, type, wouldInjure, plan, status: "willing" });
            setWho("");
            setHarm("");
            setType("direct");
            setWouldInjure(false);
            setPlan("");
          }}
          disabled={!who.trim()}
        >
          Add amend
        </AddButton>
      </Segment>

      <Segment
        index={2}
        title="The amends ledger"
        description="Go at the pace of safety — there is no prize for speed. Move each card forward only when you're ready."
        color="var(--sage)"
      >
        <div className="grid gap-3 md:grid-cols-3">
          {COLUMNS.map((col) => {
            const cards = s.amends.filter((a) => a.status === col.status);
            return (
              <div key={col.status} className="rounded-lg border border-[var(--border)] p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-serif font-semibold">{col.label}</span>
                  <Badge variant="muted">{cards.length}</Badge>
                </div>
                <div className="space-y-2">
                  {cards.length === 0 && <EmptyHint>Empty.</EmptyHint>}
                  {cards.map((a) => {
                    const prev = PREV[a.status];
                    const next = NEXT[a.status];
                    return (
                      <div
                        key={a.id}
                        className="rounded-md border border-[var(--border)] bg-[var(--background)] p-2.5 text-sm"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-medium text-[var(--sage)]">{a.who}</span>
                          <button
                            onClick={() => s.deleteAmends(a.id)}
                            className="text-[var(--muted-foreground)] hover:text-[var(--accent)] shrink-0 p-0.5"
                            aria-label="Delete amend"
                          >
                            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </button>
                        </div>
                        {a.harm && <p className="text-[var(--muted-foreground)]">{a.harm}</p>}
                        <p className="text-xs text-[var(--muted-foreground)] mt-1 capitalize">{a.type}</p>
                        {a.wouldInjure && (
                          <Badge variant="accent" className="mt-1.5 text-[10px]">
                            consider a living or indirect amend
                          </Badge>
                        )}
                        {a.status === "made" && a.madeOn && (
                          <p className="text-xs text-[var(--sage)] mt-1.5">
                            made {new Date(a.madeOn).toLocaleDateString()}
                          </p>
                        )}
                        <div className="flex gap-1.5 mt-2">
                          {prev && (
                            <Button variant="subtle" size="sm" onClick={() => s.setAmendsStatus(a.id, prev)}>
                              ← {COLUMNS.find((c) => c.status === prev)?.label}
                            </Button>
                          )}
                          {next && (
                            <Button variant="subtle" size="sm" onClick={() => s.setAmendsStatus(a.id, next)}>
                              {COLUMNS.find((c) => c.status === next)?.label} →
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Segment>

      <Card className="p-5 bg-[var(--muted)]/30">
        <h3 className="font-serif text-base font-semibold mb-3">Your amends progress</h3>
        <div className="grid grid-cols-3 gap-3">
          {COLUMNS.map((col) => (
            <div key={col.status} className="rounded-lg bg-[var(--background)] border border-[var(--border)] p-3 text-center">
              <div className="font-serif text-2xl font-semibold text-[var(--sage)]">
                {counts[col.status]}
              </div>
              <div className="text-xs text-[var(--muted-foreground)] mt-0.5">{col.label}</div>
            </div>
          ))}
        </div>
        <p className="text-sm text-[var(--muted-foreground)] mt-3">
          {s.amends.length === 0
            ? "Draft your first amend above — willingness is the only requirement to begin."
            : "However slowly the cards move, every one of them is courage."}
        </p>
      </Card>
    </div>
  );
}
