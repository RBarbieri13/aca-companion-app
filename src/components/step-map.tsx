"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/app-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, X } from "lucide-react";
import { STEPS, PHASE_META, getStep } from "@/data/steps";
import { CONNECTIONS } from "@/data/connections";
import { stepProgress, exerciseCount } from "@/lib/selectors";
import type { Phase } from "@/lib/types";
import { cn } from "@/lib/utils";

// Fixed node coordinates in a 1040 x 600 viewBox, banded by phase.
const POS: Record<number, { x: number; y: number }> = {
  1: { x: 180, y: 95 },
  2: { x: 520, y: 95 },
  3: { x: 860, y: 95 },
  4: { x: 110, y: 300 },
  5: { x: 290, y: 300 },
  6: { x: 470, y: 300 },
  7: { x: 650, y: 300 },
  8: { x: 830, y: 300 },
  9: { x: 970, y: 300 },
  10: { x: 300, y: 505 },
  11: { x: 540, y: 505 },
  12: { x: 780, y: 505 },
};

const KIND_COLOR: Record<string, string> = {
  surrender: "var(--accent)",
  house: "var(--primary)",
  maintenance: "var(--sage)",
  feedback: "#8B7BA8",
};

function phaseOf(stepId: number): Phase {
  return STEPS.find((s) => s.id === stepId)!.phase;
}

export function StepMap() {
  const state = useAppStore();
  const [filter, setFilter] = useState<Phase | "all">("all");
  const [selected, setSelected] = useState<number | null>(null);
  const [hoverEdge, setHoverEdge] = useState<string | null>(null);

  const dim = (stepId: number) => filter !== "all" && phaseOf(stepId) !== filter;

  return (
    <div>
      {/* Phase filter */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs text-[var(--muted-foreground)] mr-1">Filter:</span>
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All Steps
        </Button>
        {(Object.keys(PHASE_META) as Phase[]).map((p) => (
          <Button
            key={p}
            variant={filter === p ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(p)}
          >
            {PHASE_META[p].label}
          </Button>
        ))}
      </div>

      <Card className="p-3 md:p-5 overflow-hidden">
        <svg
          viewBox="0 0 1040 600"
          className="w-full h-auto"
          role="img"
          aria-label="Interactive map of the Twelve Steps and how they connect"
        >
          {/* Phase bands */}
          {([
            { y: 10, h: 170, p: "surrender" as Phase },
            { y: 200, h: 200, p: "house" as Phase },
            { y: 420, h: 170, p: "maintenance" as Phase },
          ]).map((band) => (
            <g key={band.p}>
              <rect
                x="10"
                y={band.y}
                width="1020"
                height={band.h}
                rx="16"
                fill={PHASE_META[band.p].color}
                fillOpacity={filter === band.p || filter === "all" ? 0.06 : 0.02}
                stroke={PHASE_META[band.p].color}
                strokeOpacity="0.18"
                strokeDasharray="4 4"
              />
              <text
                x="26"
                y={band.y + 22}
                fontFamily="var(--font-inter)"
                fontSize="11"
                fontWeight="700"
                letterSpacing="1.5"
                fill={PHASE_META[band.p].color}
              >
                {PHASE_META[band.p].tagline.toUpperCase()}
              </text>
            </g>
          ))}

          {/* Edges */}
          {CONNECTIONS.map((c) => {
            const a = POS[c.from];
            const b = POS[c.to];
            const id = `${c.from}-${c.to}`;
            const isFeedback = c.kind === "feedback";
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            // Curve feedback edges outward so they read as "loops back".
            const ctrlY = isFeedback ? midY + (c.from > c.to ? -120 : 120) : midY;
            const d = `M ${a.x} ${a.y} Q ${midX} ${ctrlY} ${b.x} ${b.y}`;
            const faded = dim(c.from) || dim(c.to);
            return (
              <g key={id} onMouseEnter={() => setHoverEdge(id)} onMouseLeave={() => setHoverEdge(null)}>
                <path
                  d={d}
                  fill="none"
                  stroke={KIND_COLOR[c.kind]}
                  strokeWidth={hoverEdge === id ? 3 : 1.75}
                  strokeOpacity={faded ? 0.1 : isFeedback ? 0.4 : 0.55}
                  strokeDasharray={isFeedback ? "6 5" : undefined}
                  strokeLinecap="round"
                />
                {/* Invisible wide hit area for hover */}
                <path d={d} fill="none" stroke="transparent" strokeWidth="16" />
                {hoverEdge === id && (
                  <g>
                    <rect
                      x={midX - 150}
                      y={ctrlY - 28}
                      width="300"
                      height="22"
                      rx="6"
                      fill="var(--card)"
                      stroke="var(--border)"
                    />
                    <text
                      x={midX}
                      y={ctrlY - 13}
                      textAnchor="middle"
                      fontFamily="var(--font-inter)"
                      fontSize="11"
                      fill="var(--foreground)"
                    >
                      {c.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {STEPS.map((step) => {
            const { x, y } = POS[step.id];
            const progress = stepProgress(state, step.id);
            const r = 24 + (progress / 100) * 14;
            const phaseColor = PHASE_META[step.phase].color;
            const faded = dim(step.id);
            const circ = 2 * Math.PI * (r + 6);
            return (
              <motion.g
                key={step.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: faded ? 0.25 : 1, scale: 1 }}
                transition={{ duration: 0.3, delay: step.id * 0.02 }}
                style={{ cursor: "pointer" }}
                tabIndex={0}
                role="button"
                aria-label={`Step ${step.id}, ${step.shortName}, ${progress}% worked`}
                onClick={() => setSelected(step.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(step.id);
                  }
                }}
              >
                {/* progress ring */}
                <circle cx={x} cy={y} r={r + 6} fill="none" stroke="var(--muted)" strokeWidth="4" />
                <circle
                  cx={x}
                  cy={y}
                  r={r + 6}
                  fill="none"
                  stroke={phaseColor}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={circ - (progress / 100) * circ}
                  transform={`rotate(-90 ${x} ${y})`}
                />
                {/* node body */}
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill={phaseColor}
                  fillOpacity={selected === step.id ? 0.95 : 0.16}
                  stroke={phaseColor}
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y={y - 2}
                  textAnchor="middle"
                  fontFamily="var(--font-fraunces)"
                  fontSize="20"
                  fontWeight="700"
                  fill={selected === step.id ? "var(--card)" : phaseColor}
                >
                  {step.id}
                </text>
                <text
                  x={x}
                  y={y + 12}
                  textAnchor="middle"
                  fontFamily="var(--font-inter)"
                  fontSize="7.5"
                  fill={selected === step.id ? "var(--card)" : "var(--muted-foreground)"}
                >
                  {step.principle}
                </text>
                <text
                  x={x}
                  y={y + r + 18}
                  textAnchor="middle"
                  fontFamily="var(--font-inter)"
                  fontSize="10"
                  fontWeight="600"
                  fill="var(--foreground)"
                  opacity={faded ? 0.3 : 0.9}
                >
                  {step.shortName}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </Card>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-[var(--muted-foreground)]">
        {[
          ["Surrender (1–3)", KIND_COLOR.surrender],
          ["Housecleaning (4–9)", KIND_COLOR.house],
          ["Maintenance (10–12)", KIND_COLOR.maintenance],
          ["Feedback loop", KIND_COLOR.feedback],
        ].map(([label, color]) => (
          <span key={label} className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: color }} />
            {label}
          </span>
        ))}
        <span className="italic">Node size & ring = your progress. Tap a Step to drill in; hover an edge for the relationship.</span>
      </div>

      {/* Drill-down detail card */}
      {selected && (() => {
        const step = getStep(selected)!;
        const progress = stepProgress(state, selected);
        const ex = exerciseCount(state, selected);
        return (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <Card className="p-5 relative">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                aria-label="Close"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="default">Step {step.id}</Badge>
                <Badge variant="sage">{step.principle}</Badge>
                <Badge variant="muted">{PHASE_META[step.phase].label}</Badge>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-1">{step.shortName}</h3>
              <p className="text-sm text-[var(--foreground)]/80 italic mb-4 max-w-2xl">
                {step.essence.step}
              </p>
              <div className="grid grid-cols-3 gap-3 mb-4 max-w-md">
                <Stat label="Progress" value={`${progress}%`} />
                <Stat label="Exercise entries" value={`${ex}`} />
                <Stat
                  label="Big Book refs"
                  value={`${step.bigBookRefs.length}`}
                  icon={<BookOpen className="h-3 w-3" strokeWidth={2} />}
                />
              </div>
              <Link href={`/steps/${step.id}`}>
                <Button size="sm">
                  Open Step {step.id}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                </Button>
              </Link>
            </Card>
          </motion.div>
        );
      })()}
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className={cn("rounded-lg bg-[var(--muted)]/50 p-3 text-center")}>
      <div className="font-serif text-xl font-semibold flex items-center justify-center gap-1">
        {icon}
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
        {label}
      </div>
    </div>
  );
}
