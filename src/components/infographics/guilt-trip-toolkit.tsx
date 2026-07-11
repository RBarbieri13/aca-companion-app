"use client";

import { motion } from "framer-motion";

// Trait 7 — Other Laundry List main graphic (UPGRADED).
// "We make others feel guilty when they attempt to assert themselves."
// The arsenal of guilt-inducing techniques, aimed at whoever's voice would hold greater sway;
// the real target underneath (our own buried denouncement), the payoff (false mastery), and
// the fork in how people respond — turn away, or get drawn into the control.

interface Props { className?: string; }

export function GuiltTripToolkit({ className }: Props) {
  const tools = [
    { label: "The heavy sigh", sub: "indirect slight" },
    { label: "“After all I've done…”", sub: "the debt ledger" },
    { label: "The silent treatment", sub: "withdrawal as verdict" },
    { label: "Martyr math", sub: "score-keeping" },
    { label: "“You've changed.”", sub: "loyalty test" },
    { label: "Full frontal attack", sub: "open denouncement" },
  ];

  return (
    <svg viewBox="0 0 660 592" className={className} role="img" aria-label="The guilt-trip toolkit: techniques used to stop someone from asserting themselves, the buried hurt underneath, the false payoff, the two ways people respond — and how to disarm a guilt-trip aimed at you.">
      <defs>
        <linearGradient id="gtt-card" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.14"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.05"/>
        </linearGradient>
        <filter id="gtt-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.1"/>
        </filter>
        <marker id="gtt-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="330" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        THE GUILT-TRIP TOOLKIT
      </text>
      <text x="330" y="44" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        aimed at whoever&apos;s voice would hold greater sway than ours
      </text>

      {/* the six technique cards */}
      {tools.map((t, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 42 + col * 196;
        const y = 66 + row * 74;
        return (
          <g key={t.label} filter="url(#gtt-shadow)">
            <rect x={x} y={y} width="180" height="60" rx="12" fill="url(#gtt-card)" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.55"/>
            <text x={x + 90} y={y + 26} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11.5" fontWeight="600" fill="var(--accent)">{t.label}</text>
            <text x={x + 90} y={y + 43} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">{t.sub}</text>
          </g>
        );
      })}

      {/* converging arrows into the silencing */}
      <g stroke="var(--muted-foreground)" strokeWidth="1.25" fill="none" opacity="0.55">
        <path d="M 132 208 Q 180 244 268 258" markerEnd="url(#gtt-arrow)"/>
        <path d="M 330 208 L 330 246" markerEnd="url(#gtt-arrow)"/>
        <path d="M 528 208 Q 480 244 392 258" markerEnd="url(#gtt-arrow)"/>
      </g>

      {/* the silenced asserter */}
      <g>
        <circle cx="330" cy="290" r="36" fill="var(--muted)" fillOpacity="0.6" stroke="var(--muted-foreground)" strokeWidth="1.25"/>
        <circle cx="330" cy="282" r="9" fill="var(--muted-foreground)" fillOpacity="0.7"/>
        <rect x="321" y="292" width="18" height="20" rx="6" fill="var(--muted-foreground)" fillOpacity="0.6"/>
        {/* speech bubble being crossed out */}
        <motion.g animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 3, repeat: Infinity }}>
          <rect x="356" y="258" width="46" height="24" rx="8" fill="var(--card)" stroke="var(--sage)" strokeWidth="1.25"/>
          <line x1="360" y1="280" x2="398" y2="260" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
        </motion.g>
        <text x="330" y="342" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="700" fill="var(--muted-foreground)" letterSpacing="0.5">THEIR TRUE SELF, SILENCED</text>
      </g>

      {/* the buried motive — left panel */}
      <g>
        <rect x="36" y="368" width="272" height="86" rx="12" fill="var(--accent)" fillOpacity="0.07" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="172" y="390" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1.2" fontWeight="700" fill="var(--accent)">THE ULTERIOR MOTIVE</text>
        <text x="172" y="408" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--foreground)" opacity="0.85">To hide our own hurts — from having been</text>
        <text x="172" y="422" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--foreground)" opacity="0.85">similarly denounced as children — and keep our</text>
        <text x="172" y="436" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--foreground)" opacity="0.85">own deprivations locked in the subconscious.</text>
      </g>

      {/* the payoff + fork — right panel */}
      <g>
        <rect x="352" y="368" width="272" height="86" rx="12" fill="var(--muted)" fillOpacity="0.45"/>
        <text x="488" y="390" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1.2" fontWeight="700" fill="var(--muted-foreground)">THE PAYOFF — AND THE FORK</text>
        <text x="488" y="407" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontStyle="italic" fill="var(--foreground)" opacity="0.85">a false sense of mastery, domination, control</text>
        <g fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.8">
          <text x="420" y="428" textAnchor="middle">→ people turn away</text>
          <text x="556" y="428" textAnchor="middle">→ or get drawn into it</text>
        </g>
        <text x="488" y="445" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="600" fill="var(--accent)">either way, we lose the ability to be genuine and human</text>
      </g>

      {/* bottom caption */}
      <text x="330" y="482" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        In this dissociative game, we take away the other person&apos;s ability to share their view — so we can keep our own view locked away.
      </text>

      {/* DISARM PANEL — when a guilt-trip is aimed at you */}
      <g>
        <rect x="36" y="500" width="588" height="76" rx="14" fill="var(--sage)" fillOpacity="0.14" stroke="var(--sage)" strokeWidth="1.5"/>
        <text x="330" y="522" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">
          WHEN ONE IS AIMED AT YOU — THE DISARM
        </text>
        <g fontFamily="var(--font-inter)" fontSize="9" fill="var(--foreground)" opacity="0.85">
          <text x="150" y="544" textAnchor="middle" fontWeight="700" fill="var(--sage)">1 · Name it silently</text>
          <text x="150" y="560" textAnchor="middle" fontStyle="italic">“that&apos;s a guilt-trip, not a fact”</text>
          <text x="330" y="544" textAnchor="middle" fontWeight="700" fill="var(--sage)">2 · Don&apos;t defend</text>
          <text x="330" y="560" textAnchor="middle" fontStyle="italic">defense feeds the game</text>
          <text x="510" y="544" textAnchor="middle" fontWeight="700" fill="var(--sage)">3 · Restate, calmly</text>
          <text x="510" y="560" textAnchor="middle" fontStyle="italic">same sentence, same volume</text>
        </g>
      </g>
    </svg>
  );
}
