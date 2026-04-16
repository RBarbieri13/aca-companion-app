import Link from "next/link";
import { TRAITS } from "@/data/traits";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Lock, ArrowRight, Calendar as CalendarIcon } from "lucide-react";
import { QuadrantDiagram } from "@/components/infographics/quadrant-diagram";
import { TraitConstellation } from "@/components/infographics/trait-constellation";

export default function TraitsPage() {
  return (
    <div>
      <div className="mb-10">
        <div className="text-xs uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-2">
          The Laundry List Workbook
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[var(--foreground)] mb-3">
          The 14 Traits
        </h1>
        <p className="text-[var(--muted-foreground)] text-base max-w-2xl">
          Each trait is studied over two Saturday sessions — one for the Main List, one for the
          Flip Side. We&apos;re building this together, one week at a time.
        </p>
      </div>

      {/* Orientation infographics */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 mb-10">
        <Card className="p-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
            How each trait is studied
          </div>
          <h2 className="font-serif text-xl font-semibold mb-4">The four quadrants</h2>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
            Every trait has four faces: the original wound, how we act it out, and the recovery
            side of each. You&apos;ll work through all four as tabs inside each trait page.
          </p>
          <div className="flex justify-center">
            <QuadrantDiagram className="max-w-full h-auto" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
            How the traits connect
          </div>
          <h2 className="font-serif text-xl font-semibold mb-4">The constellation</h2>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-2">
            The traits aren&apos;t a checklist — they share roots. Fear weaves through 1, 3, and 12.
            Identity runs through 2, 5, 6, 7, and 11. Colors mark thematic families.
          </p>
          <div className="flex justify-center">
            <TraitConstellation className="max-w-full h-auto" activeTraitId={1} />
          </div>
          <p className="text-xs text-[var(--muted-foreground)] text-center mt-2 italic">
            Highlighted: Trait 1 and its relatives
          </p>
        </Card>
      </div>

      {/* Traits grid */}
      <div className="mb-4">
        <h2 className="font-serif text-2xl font-semibold">All traits</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TRAITS.map((trait) => {
          const clickable = trait.active;
          const Wrapper: React.ElementType = clickable ? Link : "div";
          const wrapperProps = clickable ? { href: `/traits/${trait.id}` } : {};
          return (
            <Wrapper key={trait.id} {...wrapperProps} className="block group">
              <Card
                className={
                  clickable
                    ? "h-full p-5 hover:shadow-md hover:border-[var(--primary)]/30 transition-all cursor-pointer"
                    : "h-full p-5 opacity-60"
                }
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--muted)] font-serif text-sm font-semibold text-[var(--primary)]">
                      {trait.id}
                    </div>
                    {clickable ? (
                      <Badge variant="sage" className="text-[10px]">
                        <BookOpen className="h-3 w-3 mr-1" strokeWidth={2} />
                        Open
                      </Badge>
                    ) : (
                      <Badge variant="muted" className="text-[10px]">
                        <Lock className="h-3 w-3 mr-1" strokeWidth={2} />
                        Coming soon
                      </Badge>
                    )}
                  </div>
                  {clickable && (
                    <ArrowRight className="h-4 w-4 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all" strokeWidth={1.75} />
                  )}
                </div>
                <h3 className="font-serif text-lg font-semibold leading-snug text-[var(--foreground)] mb-3">
                  {trait.shortName}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4 line-clamp-3">
                  {trait.statements.laundry}
                </p>
                <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] pt-3 border-t border-[var(--border)]">
                  <CalendarIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  <span>{formatDate(trait.mainListDate, "short")}</span>
                  <span className="mx-1">·</span>
                  <span>{formatDate(trait.flipSideDate, "short")}</span>
                </div>
              </Card>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
