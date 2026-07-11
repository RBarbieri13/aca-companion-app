"use client";

import { motion } from "framer-motion";

// Trait 7 — Laundry List supplement (UPGRADED).
// "We can read another's body posture, tone of voice, or facial expressions. Even before our
// own perception can be formulated we act out our passive/submissive role... We preempt any
// thought of our own beliefs or needs by our constant scanning of those we interact with for
// their needs... Thus robbed of our inner senses, we wander and wonder, 'Where am I in all
// this?'"
// A live radar: the sweep reads everyone else's signals while the self at the center never
// finishes rendering.

interface Props { className?: string; }

export function PreemptiveScan({ className }: Props) {
  const cx = 300, cy = 240, r = 150;

  const blips = [
    { angle: -60, dist: 0.85, label: "her tone of voice" },
    { angle: -10, dist: 0.62, label: "his posture" },
    { angle: 55, dist: 0.9, label: "that facial expression" },
    { angle: 130, dist: 0.7, label: "the mood in the room" },
    { angle: 195, dist: 0.85, label: "what they need next" },
  ];

  return (
    <svg viewBox="0 0 600 520" className={className} role="img" aria-label="A radar constantly scanning other people's signals while the self at the center never finishes forming — with the three-step pause protocol that lets the self render.">
      <defs>
        <radialGradient id="ps-scope" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.10"/>
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.02"/>
        </radialGradient>
        <linearGradient id="ps-beam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.45"/>
        </linearGradient>
      </defs>

      {/* Title */}
      <text x="300" y="24" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        THE PREEMPTIVE SCAN
      </text>
      <text x="300" y="42" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        reading everyone — before our own perception can even form
      </text>

      {/* scope rings */}
      <circle cx={cx} cy={cy} r={r} fill="url(#ps-scope)" stroke="var(--primary)" strokeWidth="1.25" strokeOpacity="0.5"/>
      <circle cx={cx} cy={cy} r={r * 0.66} fill="none" stroke="var(--primary)" strokeWidth="0.9" strokeDasharray="3 4" opacity="0.4"/>
      <circle cx={cx} cy={cy} r={r * 0.33} fill="none" stroke="var(--primary)" strokeWidth="0.9" strokeDasharray="3 4" opacity="0.4"/>
      {/* crosshairs */}
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="var(--primary)" strokeWidth="0.75" opacity="0.3"/>
      <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="var(--primary)" strokeWidth="0.75" opacity="0.3"/>

      {/* rotating sweep beam */}
      <motion.g
        style={{ originX: `${cx}px`, originY: `${cy}px` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      >
        <path d={`M ${cx} ${cy} L ${cx + r} ${cy} A ${r} ${r} 0 0 0 ${cx + r * 0.87} ${cy - r * 0.5} Z`} fill="url(#ps-beam)"/>
        <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="var(--accent)" strokeWidth="1.5" opacity="0.8"/>
      </motion.g>

      {/* blips — other people's signals, pulsing */}
      {blips.map((b, i) => {
        const rad = (b.angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * r * b.dist;
        const y = cy + Math.sin(rad) * r * b.dist;
        const lx = cx + Math.cos(rad) * (r + 34);
        const ly = cy + Math.sin(rad) * (r * 0.82 + 34) * (Math.sin(rad) >= 0 ? 1 : 0.95);
        return (
          <g key={b.label}>
            <motion.circle
              cx={x} cy={y} r="5" fill="var(--accent)"
              animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.15, 0.9] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
            />
            <line x1={x} y1={y} x2={lx} y2={ly} stroke="var(--muted-foreground)" strokeWidth="0.75" opacity="0.4"/>
            <text x={lx} y={ly + (Math.sin(rad) >= 0 ? 12 : -6)} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" fill="var(--accent)">
              {b.label}
            </text>
          </g>
        );
      })}

      {/* the unrendered self at center */}
      <motion.g
        animate={{ opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        <circle cx={cx} cy={cy - 8} r="10" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="3 3"/>
        <rect x={cx - 9} y={cy + 3} width="18" height="24" rx="6" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="3 3"/>
      </motion.g>
      <text x={cx} y={cy + 46} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11.5" fontStyle="italic" fontWeight="600" fill="var(--foreground)" opacity="0.85">
        “Where am I in all this?”
      </text>
      <text x={cx} y={cy + 60} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)">
        the self never finishes rendering
      </text>

      {/* bottom strip — the three-step pause protocol */}
      <g>
        <rect x="40" y="416" width="520" height="92" rx="14" fill="var(--sage)" fillOpacity="0.16" stroke="var(--sage)" strokeWidth="1.25"/>
        <text x="300" y="438" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">
          THE PAUSE PROTOCOL — LET THE SELF RENDER
        </text>
        <g fontFamily="var(--font-inter)">
          <circle cx="120" cy="462" r="9" fill="var(--sage)"/>
          <text x="120" y="465.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--card)">1</text>
          <text x="120" y="484" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="var(--foreground)">Notice the sweep</text>
          <text x="120" y="497" textAnchor="middle" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">“I&apos;m scanning again.”</text>

          <circle cx="300" cy="462" r="9" fill="var(--sage)"/>
          <text x="300" y="465.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--card)">2</text>
          <text x="300" y="484" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="var(--foreground)">One full breath</text>
          <text x="300" y="497" textAnchor="middle" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">the radar can idle for four seconds</text>

          <circle cx="480" cy="462" r="9" fill="var(--sage)"/>
          <text x="480" y="465.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--card)">3</text>
          <text x="480" y="484" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="var(--foreground)">Ask inward first</text>
          <text x="480" y="497" textAnchor="middle" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">“What do I think? What do I need?”</text>
        </g>
        <line x1="140" y1="462" x2="280" y2="462" stroke="var(--sage)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6"/>
        <line x1="320" y1="462" x2="460" y2="462" stroke="var(--sage)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6"/>
      </g>
    </svg>
  );
}
