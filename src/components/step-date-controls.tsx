"use client";

import { useAppStore } from "@/store/app-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarCheck, Flag, Star } from "lucide-react";
import { formatDate } from "@/lib/utils";

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function StepDateControls({ stepId }: { stepId: number }) {
  const dates = useAppStore((s) => s.stepDates[stepId]);
  const setStepDate = useAppStore((s) => s.setStepDate);
  const currentStepId = useAppStore((s) => s.currentStepId);
  const setCurrentStep = useAppStore((s) => s.setCurrentStep);
  const isCurrent = currentStepId === stepId;

  return (
    <Card className="p-4 flex flex-wrap items-center gap-3 bg-[var(--muted)]/30">
      <Button
        variant={isCurrent ? "default" : "outline"}
        size="sm"
        onClick={() => setCurrentStep(stepId)}
      >
        <Star className="h-3.5 w-3.5" strokeWidth={1.75} />
        {isCurrent ? "Current Step" : "Make this my current Step"}
      </Button>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => setStepDate(stepId, "started", todayIso())}>
          <Flag className="h-3.5 w-3.5" strokeWidth={1.75} />
          {dates?.started ? `Started ${formatDate(dates.started, "short")}` : "Mark started"}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setStepDate(stepId, "worked", todayIso())}>
          <CalendarCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
          {dates?.worked ? `Worked ${formatDate(dates.worked, "short")}` : "Mark worked"}
        </Button>
      </div>
    </Card>
  );
}
