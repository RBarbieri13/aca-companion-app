import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { TRAITS } from "@/data/traits";
import { getQuestionsForTrait } from "@/data/questions";
import { TraitStudyView } from "@/components/trait-study-view";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return TRAITS.filter((t) => t.active).map((t) => ({ id: String(t.id) }));
}

export default async function TraitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const traitId = Number(id);
  const trait = TRAITS.find((t) => t.id === traitId);
  if (!trait || !trait.active) notFound();

  const questions = getQuestionsForTrait(traitId);

  return (
    <div>
      <Link
        href="/traits"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-6 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        All traits
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-[10px]">
            Trait {trait.id}
          </Badge>
          <Badge variant="sage" className="text-[10px]">
            Open for study
          </Badge>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-semibold text-[var(--foreground)] leading-tight mb-4">
          {trait.shortName}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted-foreground)]">
          <div className="inline-flex items-center gap-1.5">
            <CalendarIcon className="h-4 w-4" strokeWidth={1.75} />
            <span>Main List · {formatDate(trait.mainListDate)}</span>
          </div>
          <span className="text-[var(--border)]">·</span>
          <div className="inline-flex items-center gap-1.5">
            <CalendarIcon className="h-4 w-4" strokeWidth={1.75} />
            <span>Flip Side · {formatDate(trait.flipSideDate)}</span>
          </div>
        </div>
      </div>

      <TraitStudyView trait={trait} questions={questions} />
    </div>
  );
}
