"use client";

import { motion } from "framer-motion";

// Trait 6 — Laundry List quadrant (UPGRADED).
// "We have an overdeveloped sense of responsibility and it is easier for us to be concerned
// with others rather than ourselves. This enables us not to look too closely at our own faults."
// A child carrying an adult-sized load, a responsibility gauge pinned past 100%, and the
// mechanism: focusing outward keeps the mirror turned away from our own faults.

interface Props { className?: string; }

export function OverResponsibilityEngine({ className }: Props) {
  const loads = [
    "Everyone's feelings",
    "Keep the peace",
    "Raise the siblings",
    "Manage the moods",
  ];

  return (
    <svg viewBox="0 0 620 470" className={className} role="img" aria-label="A child carrying an adult-sized load of responsibility, with the mechanism that keeps attention turned outward and away from our own faults.">
      <defs>
        <linearGradient id="ore-load" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.95"/>
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.7"/>
        </linearGradient>
        <radialGradient id="ore-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
        </radialGradient>
        <filter id="ore-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12"/>
        </filter>
        <marker id="ore-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="310" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        AN ADULT-SIZED LOAD ON A CHILD
      </text>
      <text x="310" y="44" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        responsibility dialed far past what was ours to carry
      </text>

      {/* LEFT — child + stacked load */}
      <g filter="url(#ore-shadow)">
        {/* ground */}
        <ellipse cx="150" cy="392" rx="70" ry="10" fill="var(--muted-foreground)" opacity="0.12"/>
        {/* child figure */}
        <circle cx="150" cy="330" r="16" fill="var(--accent)"/>
        <rect x="136" y="346" width="28" height="40" rx="9" fill="var(--accent)" fillOpacity="0.9"/>
        {/* bent-knee strain */}
        <path d="M 138 386 L 132 400 M 162 386 L 168 400" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round"/>
      </g>

      {/* the oversized stack, gently bobbing under the weight */}
      <motion.g
        initial={{ y: 0 }}
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {loads.map((l, i) => {
          const w = 150 - i * 14;
          const x = 150 - w / 2;
          const y = 150 + i * 40;
          return (
            <g key={l} filter="url(#ore-shadow)">
              <rect x={x} y={y} width={w} height="34" rx="5" fill="url(#ore-load)"/>
              <text x="150" y={y + 22} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="600" fill="var(--primary-foreground)">
                {l}
              </text>
            </g>
          );
        })}
        {/* strain spark */}
        <motion.path
          d="M 120 150 L 124 142 L 122 150 L 130 148"
          stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeLinecap="round"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.g>

      <text x="150" y="424" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--accent)">
        The over-responsible child
      </text>
      <text x="150" y="442" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        carrying what was never theirs
      </text>

      {/* CENTER-RIGHT — the responsibility gauge */}
      <g transform="translate(410, 150)">
        <text x="0" y="-14" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--muted-foreground)">
          SENSE OF RESPONSIBILITY
        </text>
        {/* gauge arc */}
        <path d="M -70 30 A 70 70 0 0 1 70 30" fill="none" stroke="var(--muted)" strokeWidth="12" strokeLinecap="round"/>
        <path d="M -70 30 A 70 70 0 0 1 60 -36" fill="none" stroke="var(--sage)" strokeWidth="12" strokeLinecap="round" opacity="0.5"/>
        {/* overload zone */}
        <path d="M 60 -36 A 70 70 0 0 1 70 30" fill="none" stroke="var(--accent)" strokeWidth="12" strokeLinecap="round"/>
        {/* needle sweeping into the red */}
        <motion.line
          x1="0" y1="30" x2="0" y2="-44"
          stroke="var(--foreground)" strokeWidth="3" strokeLinecap="round"
          style={{ originX: "0px", originY: "30px" }}
          initial={{ rotate: -90 }}
          animate={{ rotate: 72 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
        <circle cx="0" cy="30" r="6" fill="var(--foreground)"/>
        <text x="-70" y="48" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">others</text>
        <text x="0" y="-52" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" fill="var(--accent)">PAST 100%</text>
        <text x="70" y="48" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">overload</text>
      </g>

      {/* the hidden mechanism */}
      <g transform="translate(410, 300)">
        <rect x="-118" y="-8" width="236" height="118" rx="14" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="0" y="14" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--accent)">
          THE HIDDEN PAYOFF
        </text>
        {/* focus outward → mirror turned away */}
        <circle cx="-78" cy="52" r="13" fill="var(--primary)" fillOpacity="0.85"/>
        <text x="-78" y="78" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">me</text>
        <line x1="-62" y1="52" x2="22" y2="52" stroke="var(--muted-foreground)" strokeWidth="1.5" markerEnd="url(#ore-arrow)"/>
        <text x="-20" y="44" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.8">focus outward</text>
        {/* a hand mirror turned away */}
        <ellipse cx="58" cy="52" rx="14" ry="18" fill="url(#ore-glow)" stroke="var(--accent)" strokeWidth="1.5"/>
        <line x1="58" y1="70" x2="58" y2="86" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="48" y1="40" x2="68" y2="64" stroke="var(--accent)" strokeWidth="1.25" opacity="0.7"/>
        <text x="58" y="100" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">mirror turned away</text>
        <text x="0" y="100" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--accent)" fontWeight="600">we don&apos;t look at our own faults</text>
      </g>

      {/* bottom — the origin */}
      <text x="310" y="462" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        Born of a child&apos;s magical thinking: “if I&apos;m responsible enough, I can control the chaos.”
      </text>
    </svg>
  );
}
