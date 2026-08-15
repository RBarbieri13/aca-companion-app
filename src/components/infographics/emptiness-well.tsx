"use client";

import { motion } from "framer-motion";

// Trait 9 — Laundry List supplement.
// The internal emptiness — the buried ontological loss of childhood — is a well that
// helping cannot fill. Buckets of "helping · rescuing the underdog" pour in and drain
// straight through. Only grief fills what helping cannot; then helping becomes a choice,
// not a compulsion.

interface Props { className?: string; }

export function EmptinessWell({ className }: Props) {
  return (
    <svg viewBox="0 0 600 520" className={className} role="img" aria-label="A well labeled the internal emptiness: buckets of helping and rescuing pour in but drain straight through, while the recovery note explains that grief fills what helping cannot.">
      <defs>
        <filter id="ew-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12"/>
        </filter>
        <marker id="ew-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
        <linearGradient id="ew-stone" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--muted-foreground)" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="var(--muted-foreground)" stopOpacity="0.28"/>
        </linearGradient>
      </defs>

      {/* Title */}
      <text x="300" y="22" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        THE WELL THAT HELPING CANNOT FILL
      </text>
      <text x="300" y="40" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        why every rescue leaves us exactly as empty as before
      </text>

      {/* the tipping bucket */}
      <motion.g
        animate={{ rotate: [-24, -30, -24] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "300px", originY: "86px" }}
      >
        <g transform="translate(300, 86)">
          <path d="M -26 -14 L 26 -14 L 18 12 L -18 12 Z" fill="#C08A2D" fillOpacity="0.85" filter="url(#ew-shadow)"/>
          <path d="M -22 -14 A 22 8 0 0 1 22 -14" fill="none" stroke="#C08A2D" strokeWidth="2"/>
        </g>
      </motion.g>
      <text x="392" y="72" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="700" letterSpacing="0.5" fill="#C08A2D">
        THE BUCKET
      </text>
      <g fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
        <text x="392" y="86" textAnchor="middle">helping · rescuing</text>
        <text x="392" y="98" textAnchor="middle">the underdog</text>
      </g>

      {/* falling droplets — pour */}
      {[0, 1.1, 2.2].map((d) => (
        <motion.g
          key={`pour-${d}`}
          animate={{ y: [0, 74], opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: 3.3, repeat: Infinity, ease: "easeIn", delay: d }}
        >
          <path d="M 288 108 q 4 -8 8 0 a 4 4 0 1 1 -8 0" fill="#C08A2D" fillOpacity="0.8"/>
        </motion.g>
      ))}

      {/* the well */}
      <g>
        {/* rim */}
        <ellipse cx="300" cy="190" rx="92" ry="18" fill="none" stroke="var(--muted-foreground)" strokeWidth="2" opacity="0.7"/>
        {/* walls */}
        <path d="M 208 190 L 208 330 M 392 190 L 392 330" stroke="var(--muted-foreground)" strokeWidth="2" opacity="0.7"/>
        <rect x="196" y="186" width="12" height="148" rx="4" fill="url(#ew-stone)"/>
        <rect x="392" y="186" width="12" height="148" rx="4" fill="url(#ew-stone)"/>
        {/* stone courses */}
        <g stroke="var(--muted-foreground)" strokeWidth="0.75" opacity="0.35">
          <line x1="209" y1="222" x2="391" y2="222"/>
          <line x1="209" y1="258" x2="391" y2="258"/>
          <line x1="209" y1="294" x2="391" y2="294"/>
        </g>

        {/* interior label */}
        <text x="300" y="236" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1.2" fontWeight="700" fill="var(--accent)">
          THE INTERNAL EMPTINESS
        </text>
        <g fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          <text x="300" y="252" textAnchor="middle">the ontological loss buried</text>
          <text x="300" y="264" textAnchor="middle">in the wasteland of childhood</text>
        </g>

        {/* droplets falling straight through the interior */}
        {[0.5, 1.6, 2.7].map((d) => (
          <motion.g
            key={`through-${d}`}
            animate={{ y: [0, 118], opacity: [0, 0.55, 0.55, 0] }}
            transition={{ duration: 3.3, repeat: Infinity, ease: "easeIn", delay: d }}
          >
            <circle cx="296" cy="204" r="3" fill="#C08A2D" fillOpacity="0.7"/>
          </motion.g>
        ))}

        {/* open bottom — no floor */}
        <path d="M 208 330 A 92 16 0 0 0 392 330" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.25" strokeDasharray="4 4" opacity="0.6"/>
        <text x="300" y="322" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">
          no bottom to hold it
        </text>

        {/* drain arrows out */}
        <g stroke="var(--muted-foreground)" strokeWidth="1.25" fill="none" opacity="0.6">
          <path d="M 282 344 L 262 372" markerEnd="url(#ew-arrow)"/>
          <path d="M 300 346 L 300 376" markerEnd="url(#ew-arrow)"/>
          <path d="M 318 344 L 338 372" markerEnd="url(#ew-arrow)"/>
        </g>
        <text x="300" y="396" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          it drains straight through — so we go find another bucket
        </text>
      </g>

      {/* recovery note */}
      <g>
        <rect x="48" y="416" width="504" height="72" rx="14" fill="var(--sage)" fillOpacity="0.18" stroke="var(--sage)" strokeWidth="1.5" filter="url(#ew-shadow)"/>
        <text x="68" y="438" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">
          WHAT ACTUALLY FILLS IT
        </text>
        <text x="68" y="458" fontFamily="var(--font-inter)" fontSize="10" fill="var(--foreground)" opacity="0.88">
          <tspan fontWeight="700" fill="var(--sage)">Grief</tspan> fills what helping cannot — mourning the loss instead of outrunning it.
        </text>
        <text x="68" y="475" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
          Once the well is tended, helping becomes a choice — not a compulsion.
        </text>
      </g>

      <text x="300" y="510" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        We were not bad at helping. We were pouring it into a loss it could never reach.
      </text>
    </svg>
  );
}
