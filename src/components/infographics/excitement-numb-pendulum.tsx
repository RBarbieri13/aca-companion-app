"use client";

import { motion } from "framer-motion";

// Trait 8 synthesis — "Trait 8 in one frame."
// The Laundry List spikes us into emotional intoxication; The Other Laundry List
// deadens us inside the numb armor. One childhood wound — a home in constant tension —
// powers the whole swing. The exit is the still center: calm and alive, feelings felt,
// not dosed (both Flip Sides).

interface Props { className?: string; }

export function ExcitementNumbPendulum({ className }: Props) {
  return (
    <svg viewBox="0 0 720 480" className={className} role="img" aria-label="Trait 8 in one frame: a pendulum swings between spiking into emotional intoxication and going deadened inside the numb armor, powered by a childhood home in constant tension at the pivot — until it comes to rest at the still center: calm and alive, feelings felt, not dosed.">
      <defs>
        <radialGradient id="enp-wound" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.08"/>
        </radialGradient>
        <filter id="enp-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12"/>
        </filter>
      </defs>

      {/* Title */}
      <text x="360" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        TRAIT 8 IN ONE FRAME
      </text>
      <text x="360" y="46" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
        Two swings, one wound
      </text>

      {/* ————— the pivot: the childhood wound ————— */}
      <circle cx="360" cy="110" r="46" fill="url(#enp-wound)" stroke="var(--accent)" strokeWidth="1.5"/>
      <text x="360" y="80" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7" letterSpacing="1" fontWeight="700" fill="var(--accent)">THE WOUND</text>
      {/* the tense little house */}
      <path d="M 344 98 L 360 84 L 376 98" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="348" y="98" width="24" height="17" fill="none" stroke="var(--accent)" strokeWidth="1.75"/>
      <path d="M 351 107 L 356 102 L 361 108 L 366 102 L 370 107" fill="none" stroke="var(--accent)" strokeWidth="1.25" strokeLinejoin="round"/>
      <text x="360" y="128" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="6.5" fontStyle="italic" fill="var(--muted-foreground)">a home in</text>
      <text x="360" y="137" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="6.5" fontStyle="italic" fill="var(--muted-foreground)">constant tension</text>

      {/* swing arc */}
      <path d="M 251 240 A 170 170 0 0 1 469 240" fill="none" stroke="var(--border)" strokeWidth="1.25" strokeDasharray="3 4" opacity="0.8"/>

      {/* ghost extremes */}
      <circle cx="251" cy="240" r="12" fill="none" stroke="var(--accent)" strokeWidth="1.25" strokeDasharray="3 3" opacity="0.6"/>
      <text x="251" y="220" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" letterSpacing="1" fill="var(--accent)">SPIKING</text>
      <path d="M 228 246 L 234 238 L 238 248 L 244 240" fill="none" stroke="var(--accent)" strokeWidth="1.25" strokeLinecap="round" opacity="0.7"/>
      <circle cx="469" cy="240" r="12" fill="none" stroke="#8B7BA8" strokeWidth="1.25" strokeDasharray="3 3" opacity="0.6"/>
      <text x="469" y="220" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" letterSpacing="1" fill="#8B7BA8">DEADENED</text>
      <g stroke="#8B7BA8" strokeWidth="1.25" strokeLinecap="round" opacity="0.7">
        <line x1="480" y1="238" x2="492" y2="238"/>
        <line x1="482" y1="244" x2="494" y2="244"/>
      </g>

      {/* ————— the pendulum ————— */}
      <motion.g
        style={{ originX: "360px", originY: "110px" }}
        animate={{ rotate: [-38, 38, -38] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="360" y1="110" x2="360" y2="270" stroke="var(--muted-foreground)" strokeWidth="1.5" opacity="0.6"/>
        <circle cx="360" cy="278" r="14" fill="var(--primary)" fillOpacity="0.9" filter="url(#enp-shadow)"/>
        <circle cx="360" cy="278" r="5" fill="var(--card)" fillOpacity="0.9"/>
      </motion.g>
      <circle cx="360" cy="110" r="4.5" fill="var(--primary)"/>

      {/* ————— pole descriptions ————— */}
      <g>
        <text x="125" y="300" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--accent)">Spiking</text>
        <text x="125" y="317" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fontStyle="italic" fill="var(--muted-foreground)">emotional intoxication</text>
        <g fontFamily="var(--font-inter)" fontSize="8" fill="var(--foreground)" opacity="0.78">
          <text x="125" y="336" textAnchor="middle">· danger · drama · rescuing</text>
          <text x="125" y="348" textAnchor="middle">· crisis, served like home cooking</text>
        </g>
        <text x="125" y="366" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">The Laundry List</text>

        <text x="595" y="300" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="#8B7BA8">Deadened</text>
        <text x="595" y="317" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fontStyle="italic" fill="var(--muted-foreground)">the numb armor</text>
        <g fontFamily="var(--font-inter)" fontSize="8" fill="var(--foreground)" opacity="0.78">
          <text x="595" y="336" textAnchor="middle">· substances · busyness</text>
          <text x="595" y="348" textAnchor="middle">· the internal cocktail</text>
        </g>
        <text x="595" y="366" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">The Other Laundry List</text>
      </g>

      {/* ————— the exit: the still center ————— */}
      <g>
        <rect x="288" y="306" width="144" height="86" rx="14" fill="var(--sage)" fillOpacity="0.16" stroke="var(--sage)" strokeWidth="1.5" filter="url(#enp-shadow)"/>
        <text x="360" y="326" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" letterSpacing="1" fontWeight="700" fill="var(--sage)">THE STILL CENTER</text>
        <text x="360" y="345" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontStyle="italic" fontWeight="600" fill="var(--foreground)">calm &amp; alive</text>
        <text x="360" y="361" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--foreground)" opacity="0.85">feelings felt, not dosed</text>
        <text x="360" y="380" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7" fontWeight="700" fill="var(--sage)">both Flip Sides</text>
      </g>

      {/* bottom caption */}
      <text x="360" y="428" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
        One addiction, two doors: we spike to feel something, then armor up to feel nothing — and call the blur normal.
      </text>
      <text x="360" y="446" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        The pendulum isn&apos;t pinned at the center — it comes to rest there, once the wound stops powering the swing.
      </text>
    </svg>
  );
}
