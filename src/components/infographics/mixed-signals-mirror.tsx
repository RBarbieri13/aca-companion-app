"use client";

import { motion } from "framer-motion";

// Trait 9 — Laundry List main graphic.
// "We confuse love with pity and tend to 'love' people we can 'pity' and 'rescue'."
// A child mirrors a caregiver's emotional landscape; between them the wiring is crossed —
// pity/sympathy soldered to the terminal marked LOVE, compassion/empathy left dangling.
// The adult consequence: heroes magnetized to people who need rescuing, martyrs to lost
// causes — bonds that felt like normal ups and downs but were unrewarding and unfulfilling.

interface Props { className?: string; }

export function MixedSignalsMirror({ className }: Props) {
  return (
    <svg viewBox="0 0 720 480" className={className} role="img" aria-label="Trait 9 Laundry List: a child mirroring a caregiver with crossed wires — pity wired to the love terminal, compassion left dangling — producing adult bonds where heroes are magnetized to people who need rescuing and martyrs to lost causes.">
      <defs>
        <filter id="msm-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12"/>
        </filter>
        <marker id="msm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="360" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        HOW LOVE GOT MISWIRED
      </text>
      <text x="360" y="46" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
        We mirrored a landscape where the labels were already switched
      </text>

      {/* LEFT — the caregiver */}
      <g>
        <circle cx="120" cy="130" r="16" fill="var(--primary)" fillOpacity="0.9"/>
        <rect x="103" y="148" width="34" height="52" rx="11" fill="var(--primary)" fillOpacity="0.85" filter="url(#msm-shadow)"/>
        {/* arm toward the wiring board */}
        <path d="M 137 162 L 168 152" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round"/>
        <text x="120" y="222" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" letterSpacing="0.5" fill="var(--primary)">
          THE CAREGIVER
        </text>
        <g fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          <text x="120" y="236" textAnchor="middle">cared for those they felt</text>
          <text x="120" y="248" textAnchor="middle">sorry for — and called it love</text>
        </g>
      </g>

      {/* RIGHT — the child, mirroring */}
      <g>
        <circle cx="600" cy="136" r="12" fill="var(--accent)" fillOpacity="0.9"/>
        <rect x="587" y="150" width="26" height="42" rx="9" fill="var(--accent)" fillOpacity="0.8" filter="url(#msm-shadow)"/>
        {/* arm toward the wiring board — same gesture, mirrored */}
        <path d="M 587 164 L 556 154" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="600" y="222" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" letterSpacing="0.5" fill="var(--accent)">
          THE CHILD
        </text>
        <g fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          <text x="600" y="236" textAnchor="middle">mirrors the whole landscape —</text>
          <text x="600" y="248" textAnchor="middle">cannot yet choose or distinguish</text>
        </g>
      </g>

      {/* faint mirror line */}
      <line x1="360" y1="76" x2="360" y2="102" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 4"/>
      <text x="360" y="96" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" letterSpacing="1" fontWeight="700" fill="var(--muted-foreground)" opacity="0.8">
        THE MIRROR
      </text>

      {/* CENTER — the wiring board with crossed wires */}
      <g>
        <rect x="220" y="104" width="280" height="128" rx="12" fill="var(--card)" stroke="var(--border)" strokeWidth="1.25" filter="url(#msm-shadow)"/>

        {/* left terminals — what was actually felt */}
        <circle cx="252" cy="138" r="5" fill="var(--accent)"/>
        <text x="252" y="124" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontWeight="700" letterSpacing="0.5" fill="var(--accent)">PITY · SYMPATHY</text>
        <circle cx="252" cy="198" r="5" fill="var(--sage)"/>
        <text x="252" y="220" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontWeight="700" letterSpacing="0.5" fill="var(--sage)">COMPASSION · EMPATHY</text>

        {/* right terminals — what it got called */}
        <circle cx="468" cy="198" r="5" fill="var(--accent)"/>
        <text x="468" y="220" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontWeight="600" fontStyle="italic" fill="var(--foreground)">&ldquo;LOVE&rdquo;</text>
        <circle cx="468" cy="138" r="5" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.25" strokeDasharray="2 2"/>
        <text x="468" y="124" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">never wired up</text>

        {/* the crossed wire: pity → the LOVE terminal */}
        <path d="M 257 138 C 320 138, 400 198, 463 198" fill="none" stroke="var(--accent)" strokeWidth="2"/>
        {/* signal pulses traveling the crossed wire (opacity relay) */}
        {[{ x: 305, y: 148, d: 0 }, { x: 360, y: 168, d: 1.6 }, { x: 415, y: 188, d: 3.2 }].map((p) => (
          <motion.circle
            key={p.d}
            cx={p.x} cy={p.y} r="3.5" fill="var(--accent)"
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: p.d }}
          />
        ))}

        {/* compassion wire — left dangling, frayed */}
        <path d="M 257 198 C 290 198, 310 186, 326 172" fill="none" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round"/>
        <motion.g
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "326px", originY: "172px" }}
        >
          <path d="M 326 172 L 334 164 M 326 172 L 336 170 M 326 172 L 331 178" stroke="var(--sage)" strokeWidth="1.25" strokeLinecap="round" opacity="0.8"/>
        </motion.g>
        <text x="352" y="152" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--sage)" fontStyle="italic">dangling</text>

        <text x="360" y="246" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          no empathetic witness to check the wiring — we doubt even our most fundamental feelings
        </text>
      </g>

      {/* BOTTOM — the adult consequence: misaligned magnetized bonds */}
      <g>
        <rect x="60" y="270" width="600" height="130" rx="14" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.45"/>
        <text x="360" y="292" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--accent)">
          THE ADULT CONSEQUENCE — MISALIGNED DRAWS MISALIGNED
        </text>

        {/* hero pair */}
        <g transform="translate(210, 336)">
          <circle cx="-72" cy="-6" r="11" fill="var(--primary)" fillOpacity="0.9"/>
          <rect x="-83" y="4" width="22" height="26" rx="7" fill="var(--primary)" fillOpacity="0.8"/>
          <text x="-72" y="46" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--primary)" letterSpacing="0.5">THE HERO</text>
          {/* magnet field lines */}
          <motion.g
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            stroke="var(--accent)" strokeWidth="1.25" fill="none"
          >
            <path d="M -52 -10 C -30 -22, 30 -22, 52 -10"/>
            <path d="M -52 8 C -30 20, 30 20, 52 8"/>
            <path d="M -50 -1 H 50"/>
          </motion.g>
          <circle cx="72" cy="-6" r="9" fill="var(--muted-foreground)" fillOpacity="0.55"/>
          <rect x="63" y="3" width="18" height="23" rx="6" fill="var(--muted-foreground)" fillOpacity="0.5"/>
          <text x="72" y="46" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--muted-foreground)" letterSpacing="0.5">NEEDS RESCUING</text>
        </g>

        {/* martyr pair */}
        <g transform="translate(510, 336)">
          <circle cx="-72" cy="-6" r="11" fill="#8B7BA8"/>
          <rect x="-83" y="4" width="22" height="26" rx="7" fill="#8B7BA8" fillOpacity="0.85"/>
          <text x="-72" y="46" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="#8B7BA8" letterSpacing="0.5">THE MARTYR</text>
          <motion.g
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            stroke="var(--accent)" strokeWidth="1.25" fill="none"
          >
            <path d="M -52 -10 C -30 -22, 30 -22, 52 -10"/>
            <path d="M -52 8 C -30 20, 30 20, 52 8"/>
            <path d="M -50 -1 H 50"/>
          </motion.g>
          <circle cx="72" cy="-6" r="9" fill="var(--muted-foreground)" fillOpacity="0.55"/>
          <rect x="63" y="3" width="18" height="23" rx="6" fill="var(--muted-foreground)" fillOpacity="0.5"/>
          <text x="72" y="46" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--muted-foreground)" letterSpacing="0.5">THE LOST CAUSE</text>
        </g>
      </g>

      {/* bottom caption */}
      <text x="360" y="430" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
        We believed these were healthy relationships with a &ldquo;normal&rdquo; share of ups and downs.
      </text>
      <text x="360" y="448" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        They felt unhealthy, unrewarding, unfulfilling — because the wire marked love was carrying pity.
      </text>
    </svg>
  );
}
