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
            <Card className="p-3 md:p-4">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div
                    key={d}
                    className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium text-center py-1"
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {monthDays.map((day) => {
                  const dateStr = format(day, "yyyy-MM-dd");
                  const session = sessionsByDate.get(dateStr);
                  const inMonth = isSameMonth(day, cursor);
                  const isToday = isSameDay(day, new Date());
                  const isSelected = selected && selected.date === dateStr;
                  const hasAttended = attendance[dateStr]?.attended;
                  return (
                    <button
                      key={dateStr}
                      onClick={() => session && setSelected(session)}
                      disabled={!session}
                      className={cn(
                        "aspect-square rounded-lg p-1.5 text-left transition-all relative",
                        !inMonth && "opacity-30",
                        session
                          ? "hover:ring-2 hover:ring-[var(--primary)]/30 cursor-pointer"
                          : "cursor-default",
                        isSelected && session && "ring-2 ring-[var(--primary)]",
                        session?.type === "session"
                          ? "bg-[var(--muted)]/70"
                          : session?.type === "break"
                          ? "bg-[var(--accent)]/10"
                          : session?.type === "wrapup"
                          ? "bg-[var(--sage)]/20"
                          : ""
                      )}
                    >
                      <div
                        className={cn(
                          "text-xs font-medium",
                          isToday && "inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)]"
                        )}
                      >
                        {format(day, "d")}
                      </div>
                      {session && (
                        <div className="mt-1 text-[9px] leading-tight">
                          {session.type === "session" && (
                            <span className="font-semibold text-[var(--primary)]">
                              T{session.traitId}
                              <span className="text-[var(--muted-foreground)] ml-0.5 font-normal">
                                {session.quadrant === "mainList" ? "·M" : "·F"}
                              </span>
                            </span>
                          )}
                          {session.type === "break" && (
                            <span className="text-[var(--accent)] font-medium">Break</span>
                          )}
                          {session.type === "wrapup" && (
                            <span className="text-[var(--primary)] font-medium">Wrap</span>
                          )}
                        </div>
                      )}
                      {hasAttended && (
                        <CheckCircle2
                          className="absolute bottom-1 right-1 h-3 w-3 text-[var(--sage)]"
                          strokeWidth={2.5}
                        />
                      )}
                    </button>
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
