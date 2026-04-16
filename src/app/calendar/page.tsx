import { CalendarView } from "@/components/calendar-view";

export default function CalendarPage() {
  return (
    <div>
      <div className="mb-10">
        <div className="text-xs uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-2">
          Group Schedule
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[var(--foreground)] mb-3">
          Calendar
        </h1>
        <p className="text-[var(--muted-foreground)] text-base max-w-2xl">
          Saturdays, April 11 through November 14, 2026. Two sessions per trait. Click any
          session to mark attendance and add notes.
        </p>
      </div>
      <CalendarView />
    </div>
  );
}
