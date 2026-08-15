"use client";

import { motion } from "framer-motion";

// Trait 8 — Laundry List main graphic.
// "We became addicted to excitement." A thermostat whose baseline was set high in
// childhood, wired to a dose loop: tension → seek negative excitement → a brief hit of
// feeling "natural" → tolerance → seek again — complaining about our circumstances the
// whole way around. Footnote: Tony A. first wrote the trait as "addicted to fear."

interface Props { className?: string; }

export function ExcitementThermostat({ className }: Props) {
  return (
    <svg viewBox="0 0 720 480" className={className} role="img" aria-label="The excitement thermostat: a baseline set high in childhood keeps the needle hovering in the red zone, feeding a dose loop — tension, seeking negative excitement, a brief hit of feeling natural, tolerance, seeking again — while we complain about our circumstances. Tony A. originally wrote the trait as addicted to fear.">
      <defs>
        <radialGradient id="et-pivot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.05"/>
        </radialGradient>
        <filter id="et-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12"/>
        </filter>
        <marker id="et-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="360" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        WE BECAME ADDICTED TO EXCITEMENT
      </text>
      <text x="360" y="46" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
        A thermostat set high, and the loop that keeps it there
      </text>

      {/* ————— LEFT: the baseline gauge ————— */}
      <text x="172" y="116" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1" fontWeight="700" fill="var(--muted-foreground)">
        THE BASELINE — SET HIGH IN CHILDHOOD
      </text>

      {/* gauge arc segments: calm (sage) → charged (gold) → the red zone (accent) */}
      <g fill="none" strokeWidth="13">
        <path d="M 80 248 A 92 92 0 0 1 126 168.3" stroke="var(--sage)" strokeOpacity="0.8"/>
        <path d="M 126 168.3 A 92 92 0 0 1 218 168.3" stroke="#C08A2D" strokeOpacity="0.7"/>
        <path d="M 218 168.3 A 92 92 0 0 1 264 248" stroke="var(--accent)" strokeOpacity="0.9"/>
      </g>
      <path d="M 102 248 A 70 70 0 0 1 242 248" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 4" opacity="0.7"/>

      {/* zone labels */}
      <text x="78" y="270" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="600" fill="var(--sage)">calm</text>
      <text x="78" y="281" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7" fontStyle="italic" fill="var(--muted-foreground)">feels like nothing</text>
      <text x="266" y="270" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="600" fill="var(--accent)">the red zone</text>
      <text x="266" y="281" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7" fontStyle="italic" fill="var(--muted-foreground)">feels like home</text>

      {/* set-point tick in the red zone */}
      <line x1="250.6" y1="193" x2="258.8" y2="187.2" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
      <text x="290" y="176" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontWeight="600" fill="var(--accent)">the set point</text>

      {/* needle, hovering in the red */}
      <motion.g
        style={{ originX: "172px", originY: "248px" }}
        animate={{ rotate: [46, 63, 52, 66, 46] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="172" y1="248" x2="172" y2="172" stroke="var(--accent)" strokeWidth="3.5" strokeLinecap="round" filter="url(#et-shadow)"/>
        <line x1="172" y1="248" x2="172" y2="262" stroke="var(--muted-foreground)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
      </motion.g>
      <circle cx="172" cy="248" r="10" fill="url(#et-pivot)"/>
      <circle cx="172" cy="248" r="5" fill="var(--primary)"/>

      {/* how it got set */}
      <g textAnchor="middle" fontFamily="var(--font-inter)">
        <text x="172" y="300" fontSize="8.5" fill="var(--foreground)" opacity="0.82">First doses came very early —</text>
        <text x="172" y="313" fontSize="8.5" fill="var(--foreground)" opacity="0.82">sometimes before we were born.</text>
        <text x="172" y="330" fontSize="8" fontStyle="italic" fill="var(--muted-foreground)">A childhood of constant negative excitement</text>
        <text x="172" y="342" fontSize="8" fontStyle="italic" fill="var(--muted-foreground)">set the dial — so high still feels like home.</text>
      </g>

      {/* ————— RIGHT: the dose loop ————— */}
      <circle cx="500" cy="232" r="88" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.25" strokeDasharray="3 5" opacity="0.5"/>
      {/* direction arrows on the loop (clockwise) */}
      <g fill="none" stroke="var(--muted-foreground)" strokeWidth="1.25" opacity="0.6">
        <path d="M 546.6 157.4 A 88 88 0 0 1 558.9 166.6" markerEnd="url(#et-arrow)"/>
        <path d="M 507.7 319.7 A 88 88 0 0 1 492.3 319.7" markerEnd="url(#et-arrow)"/>
        <path d="M 443.4 164.6 A 88 88 0 0 1 456 155.8" markerEnd="url(#et-arrow)"/>
      </g>

      {/* traveling dose, circling forever */}
      <motion.g
        style={{ originX: "500px", originY: "232px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="500" cy="144" r="5" fill="var(--accent)" opacity="0.85"/>
      </motion.g>

      {/* loop center */}
      <text x="500" y="226" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1" fontWeight="700" fill="var(--muted-foreground)">THE DOSE LOOP</text>
      <text x="500" y="241" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fontWeight="600" fill="var(--foreground)">emotional intoxication</text>
      <text x="500" y="255" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">we conjure the familiar fear</text>

      {/* NODE 1 — tension (top) */}
      <circle cx="500" cy="144" r="7" fill="var(--primary)" filter="url(#et-shadow)"/>
      <text x="500" y="118" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" letterSpacing="0.6" fill="var(--primary)">TENSION RISES</text>
      <text x="500" y="130" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">quiet feels wrong</text>

      {/* NODE 2 — seek the dose */}
      <circle cx="583.7" cy="204.8" r="7" fill="var(--accent)" filter="url(#et-shadow)"/>
      <g textAnchor="start" fontFamily="var(--font-inter)">
        <text x="598" y="197" fontSize="8" fontWeight="700" letterSpacing="0.6" fill="var(--accent)">SEEK THE DOSE</text>
        <text x="598" y="209" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">danger · untrustworthy people</text>
        <text x="598" y="220" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">precarious living</text>
      </g>

      {/* NODE 3 — the hit */}
      <circle cx="551.7" cy="303.2" r="7" fill="#C08A2D" filter="url(#et-shadow)"/>
      <text x="572" y="325" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" letterSpacing="0.6" fill="#C08A2D">THE HIT</text>
      <text x="572" y="337" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">feels natural — alive (brief)</text>

      {/* NODE 4 — tolerance */}
      <circle cx="448.3" cy="303.2" r="7" fill="#8B7BA8" filter="url(#et-shadow)"/>
      <text x="438" y="325" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" letterSpacing="0.6" fill="#8B7BA8">TOLERANCE</text>
      <text x="438" y="337" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">the hit fades faster</text>

      {/* NODE 5 — seek again */}
      <circle cx="416.3" cy="204.8" r="7" fill="var(--accent)" fillOpacity="0.85" filter="url(#et-shadow)"/>
      <g textAnchor="end" fontFamily="var(--font-inter)">
        <text x="402" y="197" fontSize="8" fontWeight="700" letterSpacing="0.6" fill="var(--accent)">SEEK AGAIN</text>
        <text x="402" y="209" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">a bigger dose</text>
        <text x="402" y="220" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">next time</text>
      </g>

      {/* the side-note hanging off the loop */}
      <rect x="543" y="92" width="166" height="32" rx="16" fill="var(--accent)" fillOpacity="0.07" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5"/>
      <text x="626" y="105" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="var(--accent)">…while complaining about</text>
      <text x="626" y="116" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="var(--accent)">our circumstances the whole time</text>
      <path d="M 610 124 L 588 197" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 3" opacity="0.55"/>

      {/* footnote — Tony A.'s first draft */}
      <rect x="40" y="398" width="640" height="38" rx="10" fill="var(--muted)" fillOpacity="0.45"/>
      <text x="360" y="414" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" letterSpacing="1.2" fontWeight="700" fill="var(--muted-foreground)">FIRST DRAFT, TRUER NAME</text>
      <text x="360" y="428" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fontStyle="italic" fill="var(--foreground)" opacity="0.85">
        Tony A. originally wrote this trait as “addicted to fear” — “excitement” was simply easier to admit.
      </text>

      {/* bottom caption */}
      <text x="360" y="458" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
        The thermostat isn&apos;t broken — it was set. And what was set can be reset.
      </text>
      <text x="360" y="473" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        Recovery starts the moment we catch our own hand reaching for the dial.
      </text>
    </svg>
  );
}
