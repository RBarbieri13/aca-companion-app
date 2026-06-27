"use client";

import { motion } from "framer-motion";

// Trait 6 synthesis (UPGRADED) — the two Laundry Lists are two poles of one false self.
// The Laundry List (over-responsible enabler) leans on INFERIORITY ("I must, because I'm not
// enough"); The Other Laundry List (inflated, self-important) leans on GRANDIOSITY. Recovery
// rests at the still center: capable AND worthwhile — the True Self the inventory reveals.

interface Props { className?: string; }

export function InferiorityGrandiosityPendulum({ className }: Props) {
  return (
    <svg viewBox="0 0 620 440" className={className} role="img" aria-label="Inferiority and grandiosity as two poles of the same false self, with the capable and worthwhile True Self at the still center.">
      <defs>
        <linearGradient id="igp-arc" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.7"/>
          <stop offset="50%" stopColor="var(--sage)" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#D4A84B" stopOpacity="0.8"/>
        </linearGradient>
        <radialGradient id="igp-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--sage)" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="var(--sage)" stopOpacity="0.08"/>
        </radialGradient>
        <filter id="igp-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12"/>
        </filter>
      </defs>

      {/* Title */}
      <text x="310" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        TWO POLES OF ONE FALSE SELF
      </text>
      <text x="310" y="44" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        the same wound, swinging between “less than” and “better than”
      </text>

      {/* the arc */}
      <path d="M 90 250 A 220 220 0 0 1 530 250" fill="none" stroke="url(#igp-arc)" strokeWidth="3" strokeDasharray="2 5" opacity="0.7"/>

      {/* pivot */}
      <circle cx="310" cy="70" r="11" fill="var(--primary)"/>
      <text x="310" y="56" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" letterSpacing="1" fill="var(--muted-foreground)">PIVOT</text>

      {/* swinging pendulum arm + bob */}
      <motion.g
        style={{ originX: "310px", originY: "70px" }}
        animate={{ rotate: [-19, 19, -19] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="310" y1="78" x2="310" y2="232" stroke="var(--muted-foreground)" strokeWidth="1.5" opacity="0.5"/>
        <circle cx="310" cy="250" r="34" fill="url(#igp-center)" stroke="var(--sage)" strokeWidth="2" filter="url(#igp-shadow)"/>
        <text x="310" y="246" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontStyle="italic" fontWeight="600" fill="var(--primary)">True Self</text>
        <text x="310" y="261" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)">the still center</text>
      </motion.g>

      {/* LEFT POLE — Inferiority */}
      <g filter="url(#igp-shadow)">
        <circle cx="90" cy="250" r="42" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="2"/>
        {/* small slumped figure */}
        <circle cx="90" cy="242" r="8" fill="var(--accent)" fillOpacity="0.9"/>
        <path d="M 82 252 Q 90 262 98 252" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"/>
      </g>
      <text x="90" y="312" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--accent)">Inferiority</text>
      <text x="90" y="328" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">“I&apos;m not enough”</text>
      <g fontFamily="var(--font-inter)" fontSize="8" fill="var(--foreground)" opacity="0.78">
        <text x="90" y="348" textAnchor="middle">· over-responsible</text>
        <text x="90" y="360" textAnchor="middle">· enabler · martyr</text>
        <text x="90" y="372" textAnchor="middle">· can&apos;t see own worth</text>
      </g>
      <text x="90" y="392" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">The Laundry List</text>

      {/* RIGHT POLE — Grandiosity */}
      <g filter="url(#igp-shadow)">
        <circle cx="530" cy="250" r="42" fill="#D4A84B" fillOpacity="0.18" stroke="#D4A84B" strokeWidth="2"/>
        {/* puffed figure */}
        <circle cx="530" cy="240" r="9" fill="#C08A2D"/>
        <path d="M 520 256 Q 530 248 540 256" fill="none" stroke="#C08A2D" strokeWidth="3" strokeLinecap="round"/>
      </g>
      <text x="530" y="312" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="#C08A2D">Grandiosity</text>
      <text x="530" y="328" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">“I&apos;m better than”</text>
      <g fontFamily="var(--font-inter)" fontSize="8" fill="var(--foreground)" opacity="0.78">
        <text x="530" y="348" textAnchor="middle">· self-important</text>
        <text x="530" y="360" textAnchor="middle">· irresponsible</text>
        <text x="530" y="372" textAnchor="middle">· can&apos;t see own faults</text>
      </g>
      <text x="530" y="392" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">The Other Laundry List</text>

      {/* center label beneath */}
      <text x="310" y="338" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" letterSpacing="1" fill="var(--sage)">CAPABLE &amp; WORTHWHILE</text>
      <text x="310" y="354" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">freed from the burden of both</text>

      {/* bottom caption */}
      <text x="310" y="416" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.82">
        The in-depth inventory doesn&apos;t pick a pole — it returns us to the center the poles were hiding.
      </text>
    </svg>
  );
}
