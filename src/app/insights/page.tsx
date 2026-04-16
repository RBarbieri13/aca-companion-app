import { InsightsView } from "@/components/insights-view";

export default function InsightsPage() {
  return (
    <div>
      <div className="mb-10">
        <div className="text-xs uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-2">
          Your patterns
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[var(--foreground)] mb-3">
          Insights
        </h1>
        <p className="text-[var(--muted-foreground)] text-base max-w-2xl">
          A quiet look at what you&apos;re noticing. Nothing to perform here — just your own
          patterns reflected back.
        </p>
      </div>
      <InsightsView />
    </div>
  );
}
