"use client";

// Horizontal timeline of the 6-month group arc. Shows which trait is current,
// where the breaks fall, and how much ground remains.

import { SCHEDULE, getCurrentSession } from "@/data/schedule";
import { parseISO, format } from "date-fns";

interface Props { className?: string; }

export function JourneyTimeline({ className }: Props) {
  const startStr = SCHEDULE[0].date;
  const endStr = SCHEDULE[SCHEDULE.length - 1].date;
  const start = parseISO(startStr);
  const end = parseISO(endStr);
  const span = end.getTime() - start.getTime();
  const today = new Date();
  const currentSession = getCurrentSession(today);
  const todayPct = Math.max(
    0,
    Math.min(100, ((today.getTime() - start.getTime()) / span) * 100)
  );

  const sessionPct = (dateStr: string) => {
    const d = parseISO(dateStr);
    return Math.max(0, Math.min(100, ((d.getTime() - start.getTime()) / span) * 100));
  };

  return (
    <svg viewBox="0 0 800 180" className={className} role="img" aria-label="Group journey timeline">
      {/* Track */}
      <line x1="30" y1="100" x2="770" y2="100" stroke="var(--border)" strokeWidth="3" strokeLinecap="round"/>
      {/* Progress */}
      <line
        x1="30"
        y1="100"
        x2={30 + (todayPct / 100) * 740}
        y2="100"
        stroke="var(--primary)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Start label */}
      <g>
        <circle cx="30" cy="100" r="6" fill="var(--primary)"/>
        <text x="30" y="130" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" fill="var(--primary)">
          Start
        </text>
        <text x="30" y="142" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">
          Apr 11
        </text>
      </g>

      {/* End label */}
      <g>
        <circle cx="770" cy="100" r="6" fill="var(--sage)" stroke="var(--primary)" strokeWidth="1.5"/>
        <text x="770" y="130" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" fill="var(--primary)">
          Wrapup
        </text>
        <text x="770" y="142" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">
          Nov 14
        </text>
      </g>

      {/* Trait ticks */}
      {SCHEDULE.filter((s) => s.type === "session" && s.quadrant === "mainList").map((s) => {
        const x = 30 + (sessionPct(s.date) / 100) * 740;
        return (
          <g key={s.date}>
            <line x1={x} y1="92" x2={x} y2="108" stroke="var(--muted-foreground)" strokeWidth="1" opacity="0.6"/>
            <text
              x={x}
              y="82"
              textAnchor="middle"
              fontFamily="var(--font-inter)"
              fontSize="8"
              fontWeight="600"
              fill="var(--muted-foreground)"
            >
              T{s.traitId}
            </text>
          </g>
        );
      })}

      {/* Break markers */}
      {SCHEDULE.filter((s) => s.type === "break").map((s) => {
        const x = 30 + (sessionPct(s.date) / 100) * 740;
        return (
          <g key={s.date}>
            <circle cx={x} cy="100" r="4" fill="var(--accent)" stroke="var(--card)" strokeWidth="2"/>
            <text x={x} y="62" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7" fontWeight="600" fill="var(--accent)" letterSpacing="0.3">
              BREAK
            </text>
          </g>
        );
      })}

      {/* Today marker */}
      {currentSession && (
        <g>
          <line
            x1={30 + (todayPct / 100) * 740}
            y1="35"
            x2={30 + (todayPct / 100) * 740}
            y2="100"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
          <g transform={`translate(${30 + (todayPct / 100) * 740 - 28}, 10)`}>
            <rect width="56" height="22" rx="11" fill="var(--accent)"/>
            <text x="28" y="15" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" fill="white">
              YOU
            </text>
            <text x="28" y="25" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="white" opacity="0.9">
              {format(today, "MMM d")}
            </text>
          </g>
        </g>
      )}

      {/* Legend */}
      <g fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">
        <g transform="translate(30, 160)">
          <circle cx="4" cy="0" r="3" fill="var(--accent)"/>
          <text x="12" y="3">Break</text>
        </g>
        <g transform="translate(100, 160)">
          <rect x="0" y="-3" width="14" height="2" fill="var(--primary)"/>
          <text x="20" y="3">Progress so far</text>
        </g>
        <g transform="translate(210, 160)">
          <text x="0" y="3" fontWeight="600" fill="var(--muted-foreground)">T1–T14</text>
          <text x="40" y="3">= Trait start week</text>
        </g>
      </g>
    </svg>
  );
}
