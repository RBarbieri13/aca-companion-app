import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import type { BigBookRef } from "@/lib/types";

export function BigBookRefs({ refs }: { refs: BigBookRef[] }) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-1">
        <BookOpen className="h-5 w-5 text-[var(--primary)]" strokeWidth={1.75} />
        <h2 className="font-serif text-2xl font-semibold">Big Book references</h2>
      </div>
      <p className="text-sm text-[var(--muted-foreground)] mb-5 max-w-2xl">
        Citations and summaries only — page locators with our own gloss, never the source text.
        Open your copy of the book to read the passages in full.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {refs.map((ref, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-serif text-base font-semibold leading-snug">{ref.locator}</h3>
            </div>
            <Badge variant="outline" className="mb-3">
              {ref.work}
            </Badge>
            <p className="text-sm text-[var(--foreground)]/85 leading-relaxed mb-3">
              {ref.summary}
            </p>
            <div className="rounded-lg bg-[var(--muted)]/50 p-3">
              <div className="text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold mb-1">
                Why it matters here
              </div>
              <p className="text-sm text-[var(--foreground)]/80 leading-relaxed">
                {ref.whyItMatters}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
