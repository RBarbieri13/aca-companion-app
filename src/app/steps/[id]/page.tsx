import { notFound } from "next/navigation";
import { StepStudyView } from "@/components/step-study-view";
import { STEPS, getStep } from "@/data/steps";

export function generateStaticParams() {
  return STEPS.map((s) => ({ id: String(s.id) }));
}

export default async function StepPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const step = getStep(Number(id));
  if (!step) notFound();
  return <StepStudyView step={step} />;
}
