import { Suspense } from "react";
import { ExercisesView } from "@/components/exercises-view";

export default function ExercisesPage() {
  return (
    <div>
      <div className="mb-10">
        <div className="text-xs uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-2">
          Practice
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[var(--foreground)] mb-3">
          Exercises
        </h1>
        <p className="text-[var(--muted-foreground)] text-base max-w-2xl">
          Small practices that live alongside the reflection work. Use them in the moment or
          return to them between sessions.
        </p>
      </div>
      <Suspense fallback={<div className="text-sm text-[var(--muted-foreground)]">Loading...</div>}>
        <ExercisesView />
      </Suspense>
    </div>
  );
}
