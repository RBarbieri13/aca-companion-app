import { InsightsView } from "@/components/insights-view";
import { Card } from "@/components/ui/card";
import { TraitConstellation } from "@/components/infographics/trait-constellation";

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

      {/* Map overlay */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 items-center">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
              Your map
            </div>
            <h2 className="font-serif text-xl font-semibold mb-3">The landscape of the 14 traits</h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-3">
              As you move through the workbook, your reflections will connect across these
              traits — fear shows up in several places, so does identity, so does attachment.
              Right now Trait 1 is active; the highlighted edges show its closest neighbors.
            </p>
            <div className="text-xs text-[var(--muted-foreground)]/80 italic leading-relaxed">
              Color-coded by theme: fear, identity, attachment, feeling, family disease.
            </div>
          </div>
          <div className="flex justify-center">
            <TraitConstellation className="max-w-full h-auto w-full max-w-md" activeTraitId={1} />
          </div>
        </div>
      </Card>

      <InsightsView />
    </div>
  );
}
