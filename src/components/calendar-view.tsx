"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  addMonths,
  format,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Coffee, Award, BookOpen } from "lucide-react";
import { SCHEDULE, getNextSession } from "@/data/schedule";
import { TRAITS } from "@/data/traits";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/store/app-store";
import { formatDate, daysBetween, cn } from "@/lib/utils";
import type { Session } from "@/lib/types";

function sessionKey(s: Session) {
  return s.date;
}

export function CalendarView() {
  const START = parseISO("2026-04-01");
  const [cursor, setCursor] = useState<Date>(START);
  const [selected, setSelected] = useState<Session | null>(() => {
    const next = getNextSession(new Date());
    return next ?? SCHEDULE[0];
  });
  const [view, setView] = useState<"month" | "agenda">("month");

  const next = getNextSession(new Date());
  const countdownDays = next ? daysBetween(new Date(), parseISO(next.date)) : null;

  const attendance = useAppStore((s) => s.attendance);
  const setAttendance = useAppStore((s) => s.setAttendance);
  const setAttendanceNotes = useAppStore((s) => s.setAttendanceNotes);

  const monthDays = useMemo(() => {
    const monthStart = startOfMonth(cursor);
    const monthEnd = endOfMonth(cursor);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: gridStart, end: gridEnd });
  }, [cursor]);

  const sessionsByDate = useMemo(() => {
    const map = new Map<string, Session>();
    for (const s of SCHEDULE) map.set(s.date, s);
    return map;
  }, []);

  const trait = selected?.traitId ? TRAITS.find((t) => t.id === selected.traitId) : null;
  const att = selected ? attendance[selected.date] : undefined;

  return (
    <div>
      {next && (
        <Card className="p-5 mb-6 bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)]">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest opacity-80 mb-1">
                Next meeting
              </div>
              <div className="font-serif text-xl md:text-2xl font-semibold">
                {countdownDays !== null && countdownDays >= 0 ? (
                  <>
                    {countdownDays === 0
                      ? "Today"
                      : countdownDays === 1
                      ? "Tomorrow"
                      : `In ${countdownDays} days`}{" "}
                    · {formatDate(next.date, "weekday")}
                  </>
                ) : (
                  formatDate(next.date, "weekday")
                )}
              </div>
              <div className="text-sm opacity-90 mt-1">
                {next.type === "break"
                  ? `Break — ${next.label}`
                  : next.type === "wrapup"
                  ? "Final Wrapup"
                  : `Trait ${next.traitId} · ${next.quadrant === "mainList" ? "Main List" : "Flip Side"}`}
              </div>
            </div>
            {next.traitId && TRAITS.find((t) => t.id === next.traitId)?.active && (
              <Link href={`/traits/${next.traitId}`}>
                <Button variant="accent">
                  <BookOpen className="h-4 w-4" strokeWidth={1.75} />
                  Open trait
                </Button>
              </Link>
            )}
          </div>
        </Card>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCursor(addMonths(cursor, -1))}
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          </Button>
          <h2 className="font-serif text-xl font-semibold w-44 text-center">
            {format(cursor, "MMMM yyyy")}
          </h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCursor(addMonths(cursor, 1))}
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </Button>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--muted)]/50 p-1">
          <button
            onClick={() => setView("month")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-md transition-colors",
              view === "month" ? "bg-[var(--card)] shadow-sm" : "text-[var(--muted-foreground)]"
            )}
          >
            Month
          </button>
          <button
            onClick={() => setView("agenda")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-md transition-colors",
              view === "agenda" ? "bg-[var(--card)] shadow-sm" : "text-[var(--muted-foreground)]"
            )}
          >
            Agenda
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {view === "month" ? (
            <Card className="p-3 md:p-5">
              {/* Bolder weekday headers */}
              <div className="grid grid-cols-7 gap-1.5 mb-3">
                {[
                  { short: "S", full: "Sun" },
                  { short: "M", full: "Mon" },
                  { short: "T", full: "Tue" },
                  { short: "W", full: "Wed" },
                  { short: "T", full: "Thu" },
                  { short: "F", full: "Fri" },
                  { short: "S", full: "Sat" },
                ].map((d, i) => (
                  <div
                    key={i}
                    className="text-center py-2 font-serif text-sm md:text-base font-semibold text-[var(--muted-foreground)]"
                  >
                    <span className="sm:hidden">{d.short}</span>
                    <span className="hidden sm:inline">{d.full}</span>
                  </div>
                ))}
              </div>
              {/* Larger day cells */}
              <div className="grid grid-cols-7 gap-1.5">
                {monthDays.map((day) => {
                  const dateStr = format(day, "yyyy-MM-dd");
                  const session = sessionsByDate.get(dateStr);
                  const inMonth = isSameMonth(day, cursor);
                  const isToday = isSameDay(day, new Date());
                  const isSelected = selected && selected.date === dateStr;
                  const hasAttended = attendance[dateStr]?.attended;
                  return (
                    <div
                      key={dateStr}
                      className={cn(
                        "min-h-[72px] md:min-h-[92px] rounded-lg p-2 text-left transition-all relative border",
                        !inMonth && "opacity-35",
                        session
                          ? "cursor-pointer hover:ring-2 hover:ring-[var(--primary)]/30"
                          : "border-transparent",
                        session ? "border-[var(--border)]" : "border-transparent",
                        isSelected && session && "ring-2 ring-[var(--primary)]",
                        session?.type === "session"
                          ? "bg-[var(--muted)]/60"
                          : session?.type === "break"
                          ? "bg-[var(--accent)]/10"
                          : session?.type === "wrapup"
                          ? "bg-[var(--sage)]/20"
                          : ""
                      )}
                      onClick={() => session && setSelected(session)}
                      role={session ? "button" : undefined}
                      tabIndex={session ? 0 : -1}
                      onKeyDown={(e) => {
                        if (session && (e.key === "Enter" || e.key === " ")) {
                          e.preventDefault();
                          setSelected(session);
                        }
                      }}
                    >
                      {/* Big, bold day number */}
                      <div className="flex items-start justify-between mb-1">
                        <div
                          className={cn(
                            "font-serif font-semibold leading-none",
                            "text-lg md:text-xl",
                            isToday
                              ? "inline-flex items-center justify-center h-8 w-8 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)]"
                              : "text-[var(--foreground)]"
                          )}
                        >
                          {format(day, "d")}
                        </div>
                        {hasAttended && (
                          <CheckCircle2
                            className="h-4 w-4 text-[var(--sage)] shrink-0"
                            strokeWidth={2.5}
                          />
                        )}
                      </div>

                      {/* Trait link chip - directly clickable */}
                      {session?.type === "session" && session.traitId && (
                        <Link
                          href={
                            TRAITS.find((t) => t.id === session.traitId)?.active
                              ? `/traits/${session.traitId}`
                              : "/traits"
                          }
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 rounded-md bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 px-1.5 py-0.5 transition-colors"
                          aria-label={`Open Trait ${session.traitId}`}
                        >
                          <span className="font-serif text-sm md:text-base font-bold text-[var(--primary)]">
                            T{session.traitId}
                          </span>
                          <span className="text-[9px] md:text-[10px] uppercase tracking-wider font-semibold text-[var(--muted-foreground)]">
                            {session.quadrant === "mainList" ? "ML" : "FS"}
                          </span>
                        </Link>
                      )}
                      {session?.type === "break" && (
                        <span className="inline-block rounded-md bg-[var(--accent)]/20 px-1.5 py-0.5 text-[10px] md:text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                          Break
                        </span>
                      )}
                      {session?.type === "wrapup" && (
                        <span className="inline-block rounded-md bg-[var(--sage)]/30 px-1.5 py-0.5 text-[10px] md:text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
                          Wrap-up
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          ) : (
            <Card>
              <div className="divide-y divide-[var(--border)]">
                {SCHEDULE.map((s) => {
                  const isSelected = selected?.date === s.date;
                  const hasAttended = attendance[s.date]?.attended;
                  const t = s.traitId ? TRAITS.find((x) => x.id === s.traitId) : null;
                  return (
                    <button
                      key={sessionKey(s)}
                      onClick={() => setSelected(s)}
                      className={cn(
                        "w-full text-left flex items-center gap-4 px-5 py-3 hover:bg-[var(--muted)]/40 transition-colors",
                        isSelected && "bg-[var(--muted)]/70"
                      )}
                    >
                      <div className="w-24 shrink-0">
                        <div className="text-xs text-[var(--muted-foreground)]">
                          {format(parseISO(s.date), "EEE")}
                        </div>
                        <div className="font-serif text-base font-semibold">
                          {format(parseISO(s.date), "MMM d")}
                        </div>
                      </div>
                      <div className="flex-1">
                        {s.type === "session" ? (
                          <>
                            <div className="text-sm font-medium text-[var(--foreground)]">
                              Trait {s.traitId} · {t?.shortName}
                            </div>
                            <div className="text-xs text-[var(--muted-foreground)]">
                              {s.quadrant === "mainList" ? "Main List" : "Flip Side"}
                            </div>
                          </>
                        ) : s.type === "break" ? (
                          <div className="text-sm font-medium text-[var(--accent)]">
                            Break · {s.label}
                          </div>
                        ) : (
                          <div className="text-sm font-medium text-[var(--primary)]">
                            {s.label}
                          </div>
                        )}
                      </div>
                      {hasAttended ? (
                        <CheckCircle2 className="h-4 w-4 text-[var(--sage)]" strokeWidth={2} />
                      ) : s.type === "session" ? (
                        <Circle className="h-4 w-4 text-[var(--muted-foreground)]/30" strokeWidth={2} />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="p-5 sticky top-6">
            {selected ? (
              <>
                <div className="text-xs uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-2">
                  {format(parseISO(selected.date), "EEEE")}
                </div>
                <div className="font-serif text-2xl font-semibold text-[var(--foreground)] mb-3">
                  {format(parseISO(selected.date), "MMMM d, yyyy")}
                </div>

                {selected.type === "session" && trait && (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant={selected.quadrant === "mainList" ? "default" : "sage"}>
                        {selected.quadrant === "mainList" ? "Main List" : "Flip Side"}
                      </Badge>
                      <Badge variant="outline">Trait {trait.id}</Badge>
                    </div>
                    <h3 className="font-serif text-lg font-semibold mb-1">{trait.shortName}</h3>
                    <p className="text-sm text-[var(--muted-foreground)] italic leading-relaxed mb-5">
                      &ldquo;{trait.statements.laundry}&rdquo;
                    </p>

                    {trait.active && (
                      <Link href={`/traits/${trait.id}`} className="block mb-5">
                        <Button variant="default" className="w-full">
                          <BookOpen className="h-4 w-4" strokeWidth={1.75} />
                          Open trait study
                        </Button>
                      </Link>
                    )}

                    <div className="border-t border-[var(--border)] pt-4">
                      <button
                        onClick={() => setAttendance(selected.date, !att?.attended)}
                        className={cn(
                          "w-full flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors",
                          att?.attended
                            ? "border-[var(--sage)] bg-[var(--sage)]/10"
                            : "border-[var(--border)] hover:bg-[var(--muted)]"
                        )}
                      >
                        {att?.attended ? (
                          <CheckCircle2 className="h-5 w-5 text-[var(--sage)]" strokeWidth={2} />
                        ) : (
                          <Circle className="h-5 w-5 text-[var(--muted-foreground)]" strokeWidth={2} />
                        )}
                        <span className="text-sm font-medium">
                          {att?.attended ? "Attended" : "Mark as attended"}
                        </span>
                      </button>

                      <label className="block mt-4">
                        <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
                          Meeting notes
                        </div>
                        <Textarea
                          value={att?.notes ?? ""}
                          onChange={(e) => setAttendanceNotes(selected.date, e.target.value)}
                          rows={4}
                          placeholder="What came up in the discussion..."
                          className="text-sm"
                        />
                      </label>
                    </div>
                  </>
                )}

                {selected.type === "break" && (
                  <div className="flex items-start gap-3 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-4">
                    <Coffee className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" strokeWidth={1.75} />
                    <div>
                      <div className="font-medium text-sm">No meeting</div>
                      <div className="text-sm text-[var(--muted-foreground)] mt-0.5">
                        {selected.label}
                      </div>
                    </div>
                  </div>
                )}

                {selected.type === "wrapup" && (
                  <div className="flex items-start gap-3 rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/5 p-4">
                    <Award className="h-5 w-5 text-[var(--primary)] shrink-0 mt-0.5" strokeWidth={1.75} />
                    <div>
                      <div className="font-medium text-sm">{selected.label}</div>
                      <div className="text-sm text-[var(--muted-foreground)] mt-0.5">
                        The final gathering. Reflection and celebration.
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-sm text-[var(--muted-foreground)]">
                Select a session from the calendar to see details.
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
