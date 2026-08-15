"use client";

import { motion } from "framer-motion";

// Trait 9 — Flip Side main graphic.
// "We are able to distinguish love from pity, and do not think 'rescuing' people we
// 'pity' is an act of love."
// Recovery is a dedication to clarity: sometimes the internal light comes on suddenly;
// usually it brightens like a dimmer switch. Under the rising light, the mislabeled
// wires disentangle — love is not pity, rescuing is not loving — and beneath it all,
// the meeting circle: a safe place for all, love without pity.

interface Props { className?: string; }

export function DimmerSwitch({ className }: Props) {
  return (
    <svg viewBox="0 0 720 480" className={className} role="img" aria-label="Trait 9 Flip Side: a dimmer switch slowly brightens a lamp over mislabeled wires becoming disentangled and correctly labeled — love is not pity, rescuing is not loving — above a meeting circle where no one enables and everyone shares.">
      <defs>
        <filter id="ds-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12"/>
        </filter>
        <marker id="ds-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--sage)"/>
        </marker>
        <radialGradient id="ds-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C08A2D" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#C08A2D" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Title */}
      <text x="360" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        THE DIMMER SWITCH
      </text>
      <text x="360" y="46" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
        Dedication to clarity — the light rises on the tangle
      </text>

      {/* THE LAMP */}
      <g>
        <motion.circle
          cx="360" cy="112" r="52" fill="url(#ds-glow)"
          animate={{ scale: [0.7, 1.25, 0.7], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "360px", originY: "112px" }}
        />
        {/* bulb */}
        <circle cx="360" cy="108" r="16" fill="#C08A2D" fillOpacity="0.9" filter="url(#ds-shadow)"/>
        <rect x="353" y="122" width="14" height="8" rx="2" fill="var(--muted-foreground)" fillOpacity="0.7"/>
        {/* rays */}
        <motion.g
          animate={{ opacity: [0.25, 0.9, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          stroke="#C08A2D" strokeWidth="1.5" strokeLinecap="round"
        >
          <path d="M 360 82 V 72"/>
          <path d="M 338 90 L 331 83"/>
          <path d="M 382 90 L 389 83"/>
          <path d="M 330 108 H 320"/>
          <path d="M 390 108 H 400"/>
        </motion.g>
      </g>

      {/* the two ways the light comes on */}
      <g>
        {/* sudden — flash glyph */}
        <path d="M 232 96 L 224 112 L 232 112 L 224 128" fill="none" stroke="#C08A2D" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
        <text x="228" y="146" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" letterSpacing="0.5" fill="#C08A2D">SOMETIMES SUDDEN</text>
        <text x="228" y="158" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">the light simply switches on</text>

        {/* gradual — dimmer dial */}
        <g transform="translate(492, 112)">
          <path d="M -20 8 A 20 20 0 1 1 20 8" fill="none" stroke="var(--muted-foreground)" strokeWidth="2" opacity="0.6"/>
          <motion.g
            animate={{ rotate: [-50, 40, -50] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "0px", originY: "0px" }}
          >
            <line x1="0" y1="0" x2="0" y2="-16" stroke="#C08A2D" strokeWidth="2.5" strokeLinecap="round"/>
          </motion.g>
          <circle cx="0" cy="0" r="4" fill="var(--muted-foreground)"/>
        </g>
        <text x="492" y="146" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" letterSpacing="0.5" fill="#C08A2D">USUALLY GRADUAL</text>
        <text x="492" y="158" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">the dimmer brightens our insights</text>
      </g>

      {/* WIRES — tangled to disentangled */}
      <g>
        {/* left: the tangle, mislabeled */}
        <g>
          <g fill="none" strokeWidth="2" opacity="0.8">
            <path d="M 96 208 C 150 190, 148 246, 200 224 C 232 210, 216 244, 252 232" stroke="var(--accent)"/>
            <path d="M 96 240 C 150 258, 148 200, 200 220 C 232 232, 218 202, 252 210" stroke="var(--sage)"/>
          </g>
          <text x="88" y="212" textAnchor="end" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--accent)">PITY</text>
          <text x="88" y="244" textAnchor="end" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--sage)">LOVE</text>
          <text x="172" y="270" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
            what we were shown, learned as habit
          </text>
        </g>

        {/* the sorting arrow */}
        <line x1="270" y1="222" x2="332" y2="222" stroke="var(--sage)" strokeWidth="2" markerEnd="url(#ds-arrow)"/>
        <text x="301" y="212" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontWeight="700" letterSpacing="0.5" fill="var(--sage)">DISENTANGLE</text>

        {/* right: sorted, correctly labeled */}
        <g>
          <g fill="none" strokeWidth="2">
            <path d="M 352 208 H 560" stroke="var(--sage)"/>
            <path d="M 352 240 H 560" stroke="var(--accent)"/>
          </g>
          <circle cx="560" cy="208" r="4" fill="var(--sage)"/>
          <circle cx="560" cy="240" r="4" fill="var(--accent)"/>
          <text x="572" y="211" fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="700" fill="var(--sage)">LOVE — eye to eye</text>
          <text x="572" y="243" fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="700" fill="var(--accent)">PITY — looking down</text>
          <text x="456" y="270" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
            what we truly believe: love &ne; pity · rescuing &ne; loving
          </text>
        </g>
      </g>

      {/* THE MEETING CIRCLE */}
      <g>
        <rect x="120" y="292" width="480" height="128" rx="14" fill="var(--sage)" fillOpacity="0.14" stroke="var(--sage)" strokeWidth="1.5" filter="url(#ds-shadow)"/>
        <text x="360" y="314" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">
          WHERE THE SORTING HAPPENS — THE MEETING
        </text>

        {/* circle of members */}
        <g>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const x = 226 + Math.cos(rad) * 34;
            const y = 366 + Math.sin(rad) * 30;
            const colors = ["var(--sage)", "var(--primary)", "var(--accent)", "#C08A2D", "var(--sage)", "#8B7BA8", "var(--primary)", "var(--accent)"];
            return <circle key={deg} cx={x} cy={y} r="6" fill={colors[i]} fillOpacity="0.85"/>;
          })}
          <motion.circle
            cx="226" cy="366" r="16" fill="none" stroke="var(--sage)" strokeWidth="1" strokeDasharray="2 3"
            animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "226px", originY: "366px" }}
          />
        </g>

        <g fontFamily="var(--font-inter)" fontSize="9" fill="var(--foreground)" opacity="0.85">
          <text x="440" y="348" textAnchor="middle">no one enables · no one is fixed</text>
          <text x="440" y="364" textAnchor="middle">each person is allowed to share</text>
        </g>
        <text x="440" y="390" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12.5" fontStyle="italic" fontWeight="600" fill="var(--sage)">
          a safe place for all: love without pity
        </text>
      </g>

      {/* bottom caption */}
      <text x="360" y="448" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
        Our families showed care toward those they felt sorry for — and called it love. We sort the wires now.
      </text>
      <text x="360" y="466" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        Discern what was habit from what we truly believe. The dimmer only ever turns one way in recovery: brighter.
      </text>
    </svg>
  );
}
