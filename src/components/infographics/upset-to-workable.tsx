"use client";

import { motion } from "framer-motion";

// Trait 8 — Flip Side main graphic.
// "We avoid emotional intoxication and choose workable relationships instead of
// constant upset." A fork: the constant-upset loop (crisis → intoxication → crash →
// craving → crisis) spins in place, while the workable band undulates gently forward
// toward life-enriching relationships — with a discernment gate at the fork.

interface Props { className?: string; }

export function UpsetToWorkable({ className }: Props) {
  return (
    <svg viewBox="0 0 720 480" className={className} role="img" aria-label="A fork in the road: the upper path circles forever through the constant-upset loop of crisis, intoxication, crash and craving, while the lower path — the workable relationship — undulates gently inside a livable range toward life-enriching relationships. At the fork stands the discernment gate: positive versus negative excitement, a spiritually conscious decision.">
      <defs>
        <filter id="utw-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12"/>
        </filter>
        <marker id="utw-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
        <marker id="utw-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)"/>
        </marker>
        <marker id="utw-arrow-sage" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--sage)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="360" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        CONSTANT UPSET, OR WORKABLE
      </text>
      <text x="360" y="46" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
        The fork we finally get to see
      </text>

      {/* life arriving */}
      <line x1="50" y1="250" x2="192" y2="250" stroke="var(--muted-foreground)" strokeWidth="1.75" strokeDasharray="4 4" opacity="0.6" markerEnd="url(#utw-arrow)"/>
      <text x="118" y="236" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="var(--muted-foreground)">life arrives — a person, a plan, a pull</text>

      {/* ————— the discernment gate ————— */}
      <g filter="url(#utw-shadow)">
        <rect x="199" y="214" width="40" height="7" rx="3" fill="var(--primary)"/>
        <rect x="205" y="220" width="6" height="60" rx="2" fill="var(--primary)" fillOpacity="0.85"/>
        <rect x="227" y="220" width="6" height="60" rx="2" fill="var(--primary)" fillOpacity="0.85"/>
      </g>
      <text x="219" y="192" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" letterSpacing="0.8" fontWeight="700" fill="var(--primary)">THE DISCERNMENT GATE</text>
      <text x="219" y="204" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">positive vs. negative excitement</text>
      <text x="219" y="296" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontStyle="italic" fill="var(--primary)">a spiritually conscious decision</text>

      {/* ————— upper path: the constant-upset loop ————— */}
      <path d="M 232 240 C 290 205 350 172 410 154" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeDasharray="2 5" opacity="0.8" markerEnd="url(#utw-arrow-accent)"/>

      <circle cx="475" cy="150" r="56" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="2" strokeOpacity="0.85"/>
      {/* the dose circling, fast and tight */}
      <motion.g
        style={{ originX: "475px", originY: "150px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="475" cy="94" r="5.5" fill="var(--accent)" stroke="var(--card)" strokeWidth="1.25"/>
      </motion.g>
      {/* loop stations */}
      <circle cx="475" cy="94" r="4.5" fill="var(--accent)"/>
      <circle cx="531" cy="150" r="4.5" fill="var(--accent)"/>
      <circle cx="475" cy="206" r="4.5" fill="var(--accent)"/>
      <circle cx="419" cy="150" r="4.5" fill="var(--accent)"/>
      <text x="475" y="84" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--accent)">crisis</text>
      <text x="540" y="153" textAnchor="start" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--accent)">intoxication</text>
      <text x="475" y="221" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--accent)">crash</text>
      <text x="410" y="153" textAnchor="end" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--accent)">craving</text>
      {/* loop center */}
      <text x="475" y="143" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" letterSpacing="0.8" fontWeight="700" fill="var(--accent)">THE CONSTANT-</text>
      <text x="475" y="154" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" letterSpacing="0.8" fontWeight="700" fill="var(--accent)">UPSET LOOP</text>
      <text x="475" y="166" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7" fontStyle="italic" fill="var(--muted-foreground)">round and round</text>
      <text x="475" y="236" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">never forward — only around</text>

      {/* stepping off the loop */}
      <path d="M 518 194 C 552 236 572 266 588 296" fill="none" stroke="var(--sage)" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.8" markerEnd="url(#utw-arrow-sage)"/>
      <text x="628" y="240" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontStyle="italic" fill="var(--sage)">when a bond is fraught with</text>
      <text x="628" y="251" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontStyle="italic" fill="var(--sage)">constant upset, we may step off</text>

      {/* ————— lower path: the workable band ————— */}
      <path d="M 232 262 C 262 292 272 316 300 322" fill="none" stroke="var(--sage)" strokeWidth="1.75" opacity="0.85"/>
      {/* the livable range */}
      <path d="M 300 322 Q 350 306 400 322 T 500 322 T 600 322 T 672 310" fill="none" stroke="var(--sage)" strokeWidth="44" strokeOpacity="0.16" strokeLinecap="round"/>
      <path d="M 300 322 Q 350 306 400 322 T 500 322 T 600 322 T 672 310" fill="none" stroke="var(--sage)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.75" markerEnd="url(#utw-arrow-sage)"/>
      {/* the traveler on the workable line */}
      <motion.circle
        r="5.5" fill="var(--sage)" stroke="var(--card)" strokeWidth="1.25"
        animate={{
          cx: [300, 350, 400, 450, 500, 550, 600, 672],
          cy: [322, 314, 322, 330, 322, 315, 322, 310],
          opacity: [0, 1, 1, 1, 1, 1, 1, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />
      <text x="452" y="288" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" letterSpacing="1" fontWeight="700" fill="var(--sage)">WORKABLE — THE LIVABLE RANGE</text>
      <text x="452" y="372" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">normal ups and downs — weather, not warfare</text>

      {/* where the band leads */}
      <text x="590" y="396" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12.5" fontWeight="600" fill="var(--sage)">life-enriching relationships</text>
      <text x="590" y="410" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="var(--muted-foreground)">that further our spiritual development</text>

      {/* bottom caption */}
      <text x="360" y="442" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
        Both futures pass through the same gate — the loop feels like home, the band feels boring. At first.
      </text>
      <text x="360" y="460" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        Workable doesn&apos;t mean flat. It means ups and downs a nervous system can live inside.
      </text>
    </svg>
  );
}
