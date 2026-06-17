"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/store/app-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/exercises/_shell";
import { Trash2, CalendarCheck, Mic } from "lucide-react";
import { STEPS } from "@/data/steps";
import { daysBetween, parseLocalDate, formatDate } from "@/lib/utils";

const MILESTONES: { days: number; label: string }[] = [
  { days: 1, label: "24 hours" },
  { days: 30, label: "30 days" },
  { days: 60, label: "60 days" },
  { days: 90, label: "90 days" },
  { days: 180, label: "6 months" },
  { days: 270, label: "9 months" },
  { days: 365, label: "1 year" },
  { days: 730, label: "2 years" },
];

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function CalendarView() {
  const s = useAppStore();
  const [dateInput, setDateInput] = useState(s.sobrietyDate ?? "");
  const [mName, setMName] = useState("");
  const [mFormat, setMFormat] = useState<"in-person" | "online" | "phone">("in-person");
  const [mNote, setMNote] = useState("");

  const days = s.sobrietyDate != null ? daysBetween(parseLocalDate(s.sobrietyDate), new Date()) : null;
  const nextMilestone = days != null ? MILESTONES.find((m) => m.days > days) : null;

  const drafts = STEPS.map((step) => ({ step, draft: s.shareDrafts[step.id] })).filter(
    (x) => x.draft && x.draft.content.trim().length > 0
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-2">Calendar</h1>
        <p className="text-[var(--muted-foreground)] max-w-2xl">
          A flexible tracker — no fixed schedule. Set a sobriety date, log meetings and sponsor
          check-ins, and gather the shares you&apos;ve drafted.
        </p>
      </div>

      {/* Sobriety tracker */}
      <Card className="p-6 mb-6">
        <h2 className="font-serif text-xl font-semibold mb-3">Sobriety date</h2>
        <div className="flex flex-wrap items-end gap-3 mb-5">
          <div>
            <label className="text-xs text-[var(--muted-foreground)] block mb-1">Your date</label>
            <Field
              type="date"
              value={dateInput}
              max={todayIso()}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-44"
            />
          </div>
          <Button size="sm" onClick={() => s.setSobrietyDate(dateInput || null)}>
            Save
          </Button>
          {s.sobrietyDate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                s.setSobrietyDate(null);
                setDateInput("");
              }}
            >
              Clear
            </Button>
          )}
        </div>

        {days != null ? (
          <div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-serif text-5xl font-semibold text-[var(--primary)]">{days}</span>
              <span className="text-[var(--muted-foreground)]">
                day{days === 1 ? "" : "s"}, one at a time
                {nextMilestone && ` · ${nextMilestone.days - days} to ${nextMilestone.label}`}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {MILESTONES.map((m) => {
                const reached = days >= m.days;
                return (
                  <span
                    key={m.days}
                    className={
                      "rounded-full px-3 py-1 text-xs font-medium border " +
                      (reached
                        ? "bg-[var(--sage)]/20 border-[var(--sage)] text-[var(--primary)]"
                        : "border-[var(--border)] text-[var(--muted-foreground)]")
                    }
                  >
                    {reached ? "✓ " : ""}
                    {m.label}
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-sm text-[var(--muted-foreground)]">
            No date set yet. Whatever your number, today counts — and detoxing from alcohol can be
            medically risky for some, so please reach out to a doctor if your body has come to depend
            on it.
          </p>
        )}
      </Card>

      {/* Meeting log */}
      <Card className="p-6 mb-6">
        <h2 className="font-serif text-xl font-semibold mb-3 flex items-center gap-2">
          <CalendarCheck className="h-5 w-5 text-[var(--primary)]" strokeWidth={1.75} />
          Meetings & check-ins
        </h2>
        <div className="grid gap-2 sm:grid-cols-[1fr_auto] mb-2">
          <Field value={mName} onChange={(e) => setMName(e.target.value)} placeholder="Meeting or sponsor check-in name" />
          <div className="flex gap-1.5">
            {(["in-person", "online", "phone"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setMFormat(f)}
                className={
                  "rounded-lg border px-3 text-xs font-medium " +
                  (mFormat === f
                    ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]"
                    : "border-[var(--border)] text-[var(--muted-foreground)]")
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <Field value={mNote} onChange={(e) => setMNote(e.target.value)} placeholder="Notes (optional)" className="mb-2" />
        <Button
          variant="subtle"
          size="sm"
          disabled={!mName.trim()}
          onClick={() => {
            if (!mName.trim()) return;
            s.logMeeting({ date: todayIso(), name: mName, format: mFormat, shared: false, note: mNote });
            setMName("");
            setMNote("");
          }}
        >
          Log meeting
        </Button>

        <div className="mt-4 space-y-2">
          {s.meetings.length === 0 && (
            <p className="text-sm text-[var(--muted-foreground)] italic">No meetings logged yet.</p>
          )}
          {s.meetings.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-3 rounded-lg border border-[var(--border)] p-3"
            >
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{m.name}</div>
                <div className="text-xs text-[var(--muted-foreground)]">
                  {formatDate(m.date, "short")} · {m.format}
                  {m.note ? ` · ${m.note}` : ""}
                </div>
              </div>
              <button
                onClick={() => s.deleteMeeting(m.id)}
                className="text-[var(--muted-foreground)] hover:text-[var(--accent)] p-1"
                aria-label="Delete meeting"
              >
                <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Meeting prep */}
      <Card className="p-6">
        <h2 className="font-serif text-xl font-semibold mb-3 flex items-center gap-2">
          <Mic className="h-5 w-5 text-[var(--accent)]" strokeWidth={1.75} />
          Meeting prep — your drafted shares
        </h2>
        {drafts.length === 0 ? (
          <p className="text-sm text-[var(--muted-foreground)]">
            Drafts you write in each Step&apos;s &ldquo;Bring it to a meeting&rdquo; box will gather here, ready to
            bring along. <Link href="/steps" className="text-[var(--primary)] underline">Start with a Step</Link>.
          </p>
        ) : (
          <div className="space-y-3">
            {drafts.map(({ step, draft }) => (
              <Link key={step.id} href={`/steps/${step.id}`}>
                <Card className="p-4 hover:bg-[var(--muted)]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="default">Step {step.id}</Badge>
                    <span className="font-serif text-sm font-semibold">{step.shortName}</span>
                  </div>
                  <p className="text-sm text-[var(--foreground)]/80 line-clamp-2 font-journal">
                    {draft!.content}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
