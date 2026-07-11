"use client";

import { motion } from "framer-motion";

// Trait 7 — Laundry List main graphic (UPGRADED).
// "We get guilt feelings when we stand up for ourselves instead of giving in to others."
// A wiring diagram installed in childhood: the impulse to speak up trips a guilt alarm,
// the alarm forces the give-in, and the give-in pays off in numbness — which recharges
// the alarm. The wire that recovery learns to cut is labeled.

interface Props { className?: string; }

export function GuiltAlarmCircuit({ className }: Props) {
  return (
    <svg viewBox="0 0 660 470" className={className} role="img" aria-label="The guilt alarm circuit: the impulse to stand up trips a childhood-installed alarm that forces the give-in, whose numbing payoff recharges the alarm.">
      <defs>
        <linearGradient id="gac-wire" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.8"/>
        </linearGradient>
        <radialGradient id="gac-bell" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.12"/>
        </radialGradient>
        <filter id="gac-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12"/>
        </filter>
        <marker id="gac-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="330" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        THE GUILT ALARM — WIRED IN CHILDHOOD
      </text>
      <text x="330" y="44" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        standing up trips it · giving in silences it · numbness recharges it
      </text>

      {/* NODE 1 — the impulse */}
      <g filter="url(#gac-shadow)">
        <rect x="36" y="120" width="150" height="86" rx="14" fill="var(--card)" stroke="var(--sage)" strokeWidth="1.75"/>
      </g>
      <text x="111" y="146" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1" fontWeight="700" fill="var(--sage)">THE IMPULSE</text>
      <text x="111" y="168" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12.5" fontStyle="italic" fontWeight="600" fill="var(--foreground)">“I want to say</text>
      <text x="111" y="184" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12.5" fontStyle="italic" fontWeight="600" fill="var(--foreground)">what&apos;s true for me.”</text>
      <text x="111" y="199" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)">the True Self stirs</text>

      {/* wire 1 with traveling pulse */}
      <line x1="192" y1="163" x2="262" y2="163" stroke="url(#gac-wire)" strokeWidth="3" strokeLinecap="round"/>
      <motion.circle
        r="5" cy="163" fill="var(--accent)"
        animate={{ cx: [196, 258], opacity: [1, 0.4] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeIn" }}
      />

      {/* NODE 2 — the alarm bell */}
      <g>
        <circle cx="330" cy="163" r="58" fill="url(#gac-bell)" stroke="var(--accent)" strokeWidth="2"/>
        {/* bell, swinging */}
        <motion.g
          style={{ originX: "330px", originY: "132px" }}
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M 330 132 C 314 132 312 152 310 166 L 350 166 C 348 152 346 132 330 132 Z" fill="var(--accent)" filter="url(#gac-shadow)"/>
          <circle cx="330" cy="171" r="4.5" fill="var(--accent)"/>
        </motion.g>
        {/* ring marks */}
        <motion.g
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 0.9, repeat: Infinity }}
          stroke="var(--accent)" strokeWidth="1.75" fill="none" strokeLinecap="round"
        >
          <path d="M 288 128 Q 282 138 284 148"/>
          <path d="M 372 128 Q 378 138 376 148"/>
        </motion.g>
        <text x="330" y="196" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1" fontWeight="700" fill="var(--accent)">THE GUILT ALARM</text>
        <text x="330" y="209" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">“Who do you think you are?”</text>
      </g>

      {/* wire 2 */}
      <line x1="392" y1="163" x2="462" y2="163" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" opacity="0.8"/>
      <path d="M 452 158 L 462 163 L 452 168" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>

      {/* NODE 3 — the give-in */}
      <g filter="url(#gac-shadow)">
        <rect x="468" y="120" width="156" height="86" rx="14" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.75"/>
      </g>
      <text x="546" y="146" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1" fontWeight="700" fill="var(--accent)">THE GIVE-IN</text>
      <text x="546" y="168" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12.5" fontStyle="italic" fontWeight="600" fill="var(--foreground)">“Never mind.</text>
      <text x="546" y="184" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12.5" fontStyle="italic" fontWeight="600" fill="var(--foreground)">It&apos;s fine. You&apos;re right.”</text>
      <text x="546" y="199" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)">submit · smooth · disappear</text>

      {/* return wire down to the payoff and back to the alarm */}
      <path d="M 546 210 L 546 280 L 330 280 L 330 225" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.75" strokeDasharray="5 4" opacity="0.6" markerEnd="url(#gac-arrow)"/>

      {/* PAYOFF label on the return wire */}
      <g filter="url(#gac-shadow)">
        <rect x="360" y="256" width="150" height="48" rx="10" fill="var(--card)" stroke="var(--muted-foreground)" strokeWidth="1" strokeOpacity="0.5"/>
      </g>
      <text x="435" y="276" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" letterSpacing="1" fontWeight="700" fill="var(--muted-foreground)">THE PAYOFF</text>
      <text x="435" y="292" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontStyle="italic" fill="var(--foreground)" opacity="0.85">we don&apos;t feel our feelings</text>

      {/* recharge caption */}
      <text x="330" y="246" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">…which recharges the alarm</text>

      {/* the childhood installer */}
      <g>
        <rect x="36" y="256" width="270" height="80" rx="12" fill="var(--muted)" fillOpacity="0.45"/>
        <text x="171" y="278" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1.2" fontWeight="700" fill="var(--muted-foreground)">WHO INSTALLED IT</text>
        <text x="171" y="296" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--foreground)" opacity="0.82">The family&apos;s aggressive demand to deny</text>
        <text x="171" y="310" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--foreground)" opacity="0.82">what was actually happening — overwhelming</text>
        <text x="171" y="324" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--foreground)" opacity="0.82">for a defenseless child.</text>
      </g>

      {/* the cut point — recovery */}
      <g>
        <motion.g
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          <line x1="216" y1="146" x2="238" y2="180" stroke="var(--sage)" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="238" y1="146" x2="216" y2="180" stroke="var(--sage)" strokeWidth="2.5" strokeLinecap="round"/>
        </motion.g>
        <text x="227" y="136" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--sage)">RECOVERY</text>
        <text x="227" y="200" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--sage)" fontStyle="italic">cuts the wire here —</text>
        <text x="227" y="211" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--sage)" fontStyle="italic">the impulse gets to finish</text>
      </g>

      {/* bottom strip — the countless small deaths */}
      <g>
        <rect x="36" y="360" width="588" height="72" rx="12" fill="var(--accent)" fillOpacity="0.07" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.45"/>
        <text x="330" y="384" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--accent)">EACH LOOP = ONE SMALL DEATH</text>
        <text x="330" y="402" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
          “We denied our truth by self-betrayal and self-abandonment… we died countless small deaths.”
        </text>
        <text x="330" y="418" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          Repeated regularly — even hourly — until giving in felt like who we were.
        </text>
      </g>

      {/* bottom caption */}
      <text x="330" y="456" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        Robbed of our inner senses, we wander and wonder: “Where am I in all this?”
      </text>
    </svg>
  );
}
