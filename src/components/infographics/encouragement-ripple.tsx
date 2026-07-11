"use client";

import { motion } from "framer-motion";

// Trait 7 — Flip Side of The Other Laundry List supplement (polish pass).
// FSO Q3 asks how supporting a fellow traveler affected you "physically, mentally,
// emotionally, and spiritually." One encouraged voice ripples outward — me → the fellow
// traveler → the group → the fellowship — and the encouragement flows back through all
// four domains of the encourager.

interface Props { className?: string; }

export function EncouragementRipple({ className }: Props) {
  const cx = 300, cy = 218;

  const rings = [
    { r: 46, label: "one voice, encouraged", color: "var(--sage)" },
    { r: 96, label: "a fellow traveler speaks next week", color: "var(--sage)" },
    { r: 146, label: "the group grows braver", color: "var(--primary)" },
    { r: 196, label: "the fellowship — a ship of goodwill", color: "var(--primary)" },
  ];

  const domains = [
    { label: "Physically", detail: "shoulders drop · breath returns", angle: -135 },
    { label: "Mentally", detail: "quiet mind · clear view", angle: -45 },
    { label: "Emotionally", detail: "warmth instead of watching", angle: 45 },
    { label: "Spiritually", detail: "part of something larger", angle: 135 },
  ];

  return (
    <svg viewBox="0 0 600 500" className={className} role="img" aria-label="One encouraged voice ripples outward through the fellow traveler, the group, and the fellowship — and flows back through the encourager physically, mentally, emotionally, and spiritually.">
      <defs>
        <radialGradient id="er-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--sage)" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="var(--sage)" stopOpacity="0.08"/>
        </radialGradient>
        <filter id="er-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.1"/>
        </filter>
      </defs>

      {/* Title */}
      <text x="300" y="24" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        THE ENCOURAGEMENT RIPPLE
      </text>
      <text x="300" y="42" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        support one voice, and watch how far the water moves
      </text>

      {/* animated ripple rings */}
      {rings.map((ring, i) => (
        <motion.circle
          key={ring.r}
          cx={cx} cy={cy} r={ring.r}
          fill="none" stroke={ring.color} strokeWidth={2 - i * 0.3}
          animate={{ opacity: [0.75, 0.2, 0.75], scale: [1, 1.035, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: i * 0.55, ease: "easeInOut" }}
          style={{ originX: `${cx}px`, originY: `${cy}px` }}
        />
      ))}

      {/* ring labels, staggered along the right side */}
      {rings.map((ring, i) => (
        <text
          key={`l-${ring.r}`}
          x={cx + 12}
          y={cy - ring.r + 14}
          fontFamily="var(--font-inter)"
          fontSize="8.5"
          fontWeight={i === 0 ? 700 : 600}
          fill={ring.color}
          opacity="0.9"
        >
          {ring.label}
        </text>
      ))}

      {/* the encouraged voice at center */}
      <circle cx={cx} cy={cy} r="30" fill="url(#er-core)" stroke="var(--sage)" strokeWidth="1.75" filter="url(#er-shadow)"/>
      <circle cx={cx} cy={cy - 6} r="8" fill="var(--sage)"/>
      <rect x={cx - 8} y={cy + 3} width="16" height="18" rx="5" fill="var(--sage)" fillOpacity="0.85"/>
      {/* small speech line */}
      <path d={`M ${cx + 12} ${cy - 8} H ${cx + 24}`} stroke="var(--primary)" strokeWidth="1.75" strokeLinecap="round"/>

      {/* the four impact domains as compass points around the outermost ring */}
      {domains.map((d) => {
        const rad = (d.angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * 232;
        const y = cy + Math.sin(rad) * 205;
        return (
          <g key={d.label} filter="url(#er-shadow)">
            <rect x={x - 62} y={y - 20} width="124" height="40" rx="10" fill="var(--card)" stroke="var(--sage)" strokeWidth="1"/>
            <text x={x} y={y - 4} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" fill="var(--sage)">{d.label}</text>
            <text x={x} y={y + 10} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">{d.detail}</text>
          </g>
        );
      })}

      {/* bottom caption */}
      <text x="300" y="462" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
        The workbook asks exactly this: when you encouraged a fellow traveler, how did it affect you —
      </text>
      <text x="300" y="478" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fontWeight="600" fill="var(--sage)">
        physically, mentally, emotionally, and spiritually?
      </text>
    </svg>
  );
}
