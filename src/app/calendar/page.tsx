import { CalendarView } from "@/components/calendar-view";
import { JourneyTimeline } from "@/components/infographics/journey-timeline";
import { Card } from "@/components/ui/card";

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

      {/* Journey timeline */}
      <Card className="p-5 md:p-6 mb-6">
        <div className="mb-3 flex items-baseline justify-between flex-wrap gap-2">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-0.5">
              The seven-month arc
            </div>
            <h2 className="font-serif text-lg font-semibold">Where we are</h2>
          </div>
        </div>
        <JourneyTimeline className="w-full h-auto" />
      </Card>

      <CalendarView />
    </div>
  );
}
