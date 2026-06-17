import { Suspense } from "react";
import { ExercisesView } from "@/components/exercises-view";

export default function ExercisesPage() {
  return (
    <Suspense fallback={null}>
      <ExercisesView />
    </Suspense>
  );
}
