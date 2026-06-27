"use client";

import { motion } from "framer-motion";

// Trait 6 — Flip Side of The Other Laundry List (UPGRADED).
// "Through our in-depth inventory we discover our true identity as capable, worthwhile people.
// By asking to have our shortcomings removed we are freed from the burden of inferiority and
// grandiosity."
// A path through the painstaking inventory that dissolves two heavy burdens and reveals the
// True Self — capable, worthwhile — glowing underneath.

interface Props { className?: string; }

export function InventoryToTrueSelf({ className }: Props) {
  const trueWords = ["capable", "worthwhile", "honest", "kind", "creative", "enough"];

  return (
    <svg viewBox="0 0 660 430" className={className} role="img" aria-label="The in-depth inventory dissolves the burdens of inferiority and grandiosity and reveals the capable, worthwhile True Self.">
      <defs>
        <radialGradient id="its-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--sage)" stopOpacity="0.55"/>
          <stop offset="70%" stopColor="var(--sage)" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="var(--sage)" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="its-path" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="var(--sage)" stopOpacity="0.9"/>
        </linearGradient>
        <filter id="its-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.12"/>
        </filter>
      </defs>

      {/* Title */}
      <text x="330" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        WHAT THE INVENTORY REVEALS
      </text>
      <text x="330" y="44" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        painstaking, yes — but its reward is the True Self
      </text>

      {/* the path */}
      <path d="M 70 250 H 590" stroke="url(#its-path)" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>

      {/* START — the in-depth inventory */}
      <g filter="url(#its-shadow)">
        <rect x="40" y="206" width="120" height="88" rx="14" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.75"/>
      </g>
      <text x="100" y="232" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1" fontWeight="700" fill="var(--muted-foreground)">THE WORK</text>
      <text x="100" y="252" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontStyle="italic" fontWeight="600" fill="var(--primary)">In-depth</text>
      <text x="100" y="268" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontStyle="italic" fontWeight="600" fill="var(--primary)">inventory</text>
      <text x="100" y="284" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)">Steps &amp; Traditions</text>

      {/* MIDDLE — two burdens dissolving */}
      <g>
        <text x="300" y="120" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1" fontWeight="700" fill="var(--accent)">ASK TO HAVE THEM REMOVED</text>

        {/* burden 1 — inferiority, fading */}
        <motion.g
          animate={{ opacity: [0.85, 0.25, 0.85], y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="250" cy="168" r="26" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3"/>
          <text x="250" y="166" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="700" fill="var(--accent)">inferiority</text>
          <text x="250" y="178" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7" fill="var(--muted-foreground)">“less than”</text>
        </motion.g>

        {/* burden 2 — grandiosity, fading */}
        <motion.g
          animate={{ opacity: [0.85, 0.25, 0.85], y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <circle cx="350" cy="168" r="26" fill="#D4A84B" fillOpacity="0.2" stroke="#C08A2D" strokeWidth="1.5" strokeDasharray="3 3"/>
          <text x="350" y="166" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="700" fill="#C08A2D">grandiosity</text>
          <text x="350" y="178" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7" fill="var(--muted-foreground)">“better than”</text>
        </motion.g>

        <text x="300" y="214" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">freed from the burden of both</text>
      </g>

      {/* END — the True Self revealed, glowing */}
      <motion.g
        initial={{ scale: 0.92 }}
        animate={{ scale: [0.95, 1.04, 0.95] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "520px", originY: "250px" }}
      >
        <circle cx="520" cy="250" r="64" fill="url(#its-core)"/>
      </motion.g>
      <g filter="url(#its-shadow)">
        <circle cx="520" cy="236" r="16" fill="var(--sage)"/>
        <rect x="504" y="252" width="32" height="40" rx="10" fill="var(--sage)" fillOpacity="0.9"/>
      </g>
      <text x="520" y="324" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fontWeight="700" fill="var(--primary)">True Self</text>

      {/* true-self words orbiting */}
      {trueWords.map((w, i) => {
        const ang = (i / trueWords.length) * Math.PI * 2 - Math.PI / 2;
        const x = 520 + Math.cos(ang) * 92;
        const y = 250 + Math.sin(ang) * 70;
        return (
          <text key={w} x={x} y={y} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" fill="var(--sage)" opacity="0.9">
            {w}
          </text>
        );
      })}

      {/* arrows along the path */}
      <text x="190" y="244" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="14" fill="var(--muted-foreground)">→</text>
      <text x="420" y="244" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="14" fill="var(--muted-foreground)">→</text>

      {/* bottom caption */}
      <text x="330" y="404" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.82">
        Our True Self shines through, and we can admit, accept, and be the capable, worthwhile people we were meant to be.
      </text>
    </svg>
  );
}
