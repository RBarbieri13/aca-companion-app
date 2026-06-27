"use client";

import { motion } from "framer-motion";

// Trait 6 — Flip Side of The Laundry List (UPGRADED).
// "We do not use enabling as a way to avoid looking at our own shortcomings."
// Left: the enabling loop drains our personal energy (a battery emptying as we manage others).
// Right: when we let others bear their own decisions, the energy returns and turns inward.

interface Props { className?: string; }

export function EnablingEnergyLoop({ className }: Props) {
  return (
    <svg viewBox="0 0 640 430" className={className} role="img" aria-label="Enabling drains personal energy while keeping attention outward; releasing it returns energy and lets us look at ourselves.">
      <defs>
        <linearGradient id="eel-drain" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.85"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.4"/>
        </linearGradient>
        <linearGradient id="eel-charge" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="var(--sage)" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="var(--sage)" stopOpacity="0.5"/>
        </linearGradient>
        <marker id="eel-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="320" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        WHERE THE ENERGY GOES
      </text>
      <text x="320" y="44" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        enabling is expensive — releasing it gives the power back
      </text>

      {/* LEFT — the draining loop */}
      <g>
        <rect x="28" y="64" width="270" height="316" rx="16" fill="var(--accent)" fillOpacity="0.07" stroke="var(--accent)" strokeWidth="1.25" strokeOpacity="0.5"/>
        <text x="163" y="90" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--accent)">THE ENABLING LOOP</text>

        {/* battery draining */}
        <g transform="translate(163, 150)">
          <rect x="-34" y="-26" width="68" height="46" rx="7" fill="none" stroke="var(--accent)" strokeWidth="2"/>
          <rect x="34" y="-10" width="6" height="14" rx="2" fill="var(--accent)"/>
          <motion.rect
            x="-30" width="24" rx="3" fill="url(#eel-drain)"
            initial={{ y: -22, height: 38 }}
            animate={{ y: [-22, -2, -22], height: [38, 8, 38] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <text x="0" y="40" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">my personal energy</text>
        </g>

        {/* the loop nodes */}
        <g fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="600" fill="var(--foreground)">
          <text x="163" y="232" textAnchor="middle">take over for them</text>
          <text x="163" y="268" textAnchor="middle" fill="var(--accent)" fontWeight="700">manage · fix · smooth</text>
          <text x="163" y="304" textAnchor="middle">attention stays outward</text>
          <text x="163" y="340" textAnchor="middle" fontStyle="italic" fill="var(--muted-foreground)">never look at myself</text>
        </g>
        <g fill="none" stroke="var(--muted-foreground)" strokeWidth="1.1" opacity="0.5">
          <line x1="163" y1="238" x2="163" y2="256" markerEnd="url(#eel-arrow)"/>
          <line x1="163" y1="274" x2="163" y2="292" markerEnd="url(#eel-arrow)"/>
          <line x1="163" y1="310" x2="163" y2="328" markerEnd="url(#eel-arrow)"/>
        </g>
      </g>

      {/* center arrow */}
      <g>
        <line x1="306" y1="220" x2="338" y2="220" stroke="var(--primary)" strokeWidth="2" markerEnd="url(#eel-arrow)"/>
        <text x="322" y="210" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--sage)">release</text>
        <text x="322" y="236" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">let them carry</text>
        <text x="322" y="246" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">their own decisions</text>
      </g>

      {/* RIGHT — energy reclaimed */}
      <g>
        <rect x="346" y="64" width="266" height="316" rx="16" fill="var(--sage)" fillOpacity="0.14" stroke="var(--sage)" strokeWidth="1.5"/>
        <text x="479" y="90" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">ENERGY RECLAIMED</text>

        {/* battery charging full */}
        <g transform="translate(479, 150)">
          <rect x="-34" y="-26" width="68" height="46" rx="7" fill="none" stroke="var(--sage)" strokeWidth="2"/>
          <rect x="34" y="-10" width="6" height="14" rx="2" fill="var(--sage)"/>
          <motion.rect
            x="-30" rx="3" fill="url(#eel-charge)"
            initial={{ y: -22, height: 38 }}
            animate={{ y: [-2, -22, -2], height: [8, 38, 8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* charge bolt */}
          <path d="M 2 -18 L -6 0 L 0 0 L -4 16 L 8 -4 L 2 -4 Z" fill="#fff" opacity="0.8"/>
          <text x="0" y="40" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">power for my own life</text>
        </g>

        {/* the figure turning inward */}
        <circle cx="479" cy="250" r="14" fill="var(--sage)" fillOpacity="0.9"/>
        <rect x="465" y="266" width="28" height="34" rx="9" fill="var(--sage)" fillOpacity="0.8"/>
        <g fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.82">
          <text x="479" y="326" textAnchor="middle" fontWeight="700">self-focused · self-caring</text>
          <text x="479" y="342" textAnchor="middle">free to see my own shortcomings —</text>
          <text x="479" y="354" textAnchor="middle">without grandiosity or judgment</text>
        </g>
      </g>
    </svg>
  );
}
