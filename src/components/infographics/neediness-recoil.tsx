"use client";

import { motion } from "framer-motion";

// Trait 9 — Other Laundry List main graphic.
// "We hate people who 'play' the victim and beg to be rescued."
// Someone offers a small packet of "need" — and we recoil or strike out. The X-ray shows
// why: the identical packet is buried inside us, in the wasteland of our own childhood.
// The cost: untenable self-sufficiency, and self-hatred aimed at the vulnerable True Self.

interface Props { className?: string; }

export function NeedinessRecoil({ className }: Props) {
  return (
    <svg viewBox="0 0 720 480" className={className} role="img" aria-label="Trait 9 Other Laundry List: a figure recoils from and strikes at an offered packet of need, while an X-ray inset reveals the identical packet buried inside them — the same need buried in childhood — at the cost of untenable self-sufficiency.">
      <defs>
        <filter id="nr-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12"/>
        </filter>
        <marker id="nr-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)"/>
        </marker>
        <radialGradient id="nr-xray" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8B7BA8" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#8B7BA8" stopOpacity="0.04"/>
        </radialGradient>
      </defs>

      {/* Title */}
      <text x="360" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        THE PACKET OF NEED
      </text>
      <text x="360" y="46" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
        What we recoil from is the need we buried in ourselves
      </text>

      {/* LEFT — the person offering their need */}
      <g>
        <circle cx="130" cy="150" r="14" fill="var(--muted-foreground)" fillOpacity="0.55"/>
        <rect x="115" y="166" width="30" height="48" rx="10" fill="var(--muted-foreground)" fillOpacity="0.5" filter="url(#nr-shadow)"/>
        {/* both arms extended, offering */}
        <path d="M 145 178 L 186 168 M 145 192 L 186 178" stroke="var(--muted-foreground)" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
        <text x="130" y="236" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" letterSpacing="0.5" fill="var(--muted-foreground)">
          THE OTHER PERSON
        </text>
        <text x="130" y="250" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          about to hoist a little need our way
        </text>
      </g>

      {/* the offered packet — trembling */}
      <motion.g
        animate={{ rotate: [-4, 4, -4], scale: [1, 1.06, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "218px", originY: "168px" }}
      >
        <g transform="translate(218, 168)" filter="url(#nr-shadow)">
          <rect x="-16" y="-12" width="32" height="24" rx="3" fill="var(--accent)" fillOpacity="0.85"/>
          <path d="M -16 0 H 16 M 0 -12 V 12" stroke="var(--card)" strokeWidth="1.5" opacity="0.8"/>
          <path d="M -5 -12 Q 0 -20 5 -12" fill="none" stroke="var(--accent)" strokeWidth="1.5"/>
        </g>
      </motion.g>
      <text x="218" y="200" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontWeight="700" letterSpacing="0.5" fill="var(--accent)">
        A SMALL PACKET
      </text>
      <text x="218" y="212" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">
        of &ldquo;need&rdquo;
      </text>

      {/* CENTER-RIGHT — the recoiling figure */}
      <g>
        {/* body leaning away */}
        <g transform="translate(430, 160) rotate(10)">
          <circle cx="0" cy="-10" r="15" fill="var(--primary)" fillOpacity="0.9"/>
          <rect x="-16" y="6" width="32" height="52" rx="11" fill="var(--primary)" fillOpacity="0.85" filter="url(#nr-shadow)"/>
          {/* one arm thrown up to block / strike */}
          <path d="M -14 16 L -52 -2" stroke="var(--primary)" strokeWidth="3.5" strokeLinecap="round"/>
          {/* the other arm braced back */}
          <path d="M 15 22 L 44 34" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round"/>
        </g>

        {/* move labels */}
        <path d="M 372 120 L 340 106" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#nr-arrow)"/>
        <text x="384" y="116" fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="700" letterSpacing="0.5" fill="var(--accent)">STRIKE OUT</text>
        <text x="384" y="128" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">
          blame them for being &ldquo;needy&rdquo;
        </text>

        <path d="M 486 132 L 518 118" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#nr-arrow)"/>
        <text x="500" y="150" fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="700" letterSpacing="0.5" fill="var(--accent)">RECOIL</text>
        <text x="500" y="162" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">
          pull away, go numb
        </text>

        <text x="440" y="248" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" letterSpacing="0.5" fill="var(--primary)">
          US — TONE DEAF &amp; NUMB
        </text>
        <text x="440" y="262" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          senses stripped to the basics, long ago
        </text>
      </g>

      {/* X-RAY INSET */}
      <g>
        <circle cx="614" cy="196" r="52" fill="url(#nr-xray)" stroke="#8B7BA8" strokeWidth="1.5" strokeDasharray="5 3"/>
        <text x="614" y="152" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" letterSpacing="1" fontWeight="700" fill="#8B7BA8">
          THE X-RAY
        </text>
        {/* connector to the figure's torso */}
        <path d="M 462 196 C 500 210, 530 210, 562 200" fill="none" stroke="#8B7BA8" strokeWidth="1" strokeDasharray="2 3" opacity="0.7"/>
        {/* the identical buried packet — pulsing in sync with the offered one */}
        <motion.g
          animate={{ rotate: [-4, 4, -4], scale: [1, 1.06, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "614px", originY: "196px" }}
        >
          <g transform="translate(614, 196)">
            <rect x="-16" y="-12" width="32" height="24" rx="3" fill="#8B7BA8" fillOpacity="0.85"/>
            <path d="M -16 0 H 16 M 0 -12 V 12" stroke="var(--card)" strokeWidth="1.5" opacity="0.8"/>
            <path d="M -5 -12 Q 0 -20 5 -12" fill="none" stroke="#8B7BA8" strokeWidth="1.5"/>
          </g>
        </motion.g>
        <g fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">
          <text x="614" y="228" textAnchor="middle">the same need — buried in</text>
          <text x="614" y="239" textAnchor="middle">the wasteland of childhood</text>
        </g>
        <text x="614" y="268" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="#8B7BA8" fontWeight="700">
          two packets, one pulse
        </text>
      </g>

      {/* THE COST panel */}
      <g>
        <rect x="60" y="292" width="600" height="112" rx="14" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5" filter="url(#nr-shadow)"/>
        <text x="360" y="316" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--accent)">
          THE COST OF THE RECOIL
        </text>
        <g fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.88">
          <text x="360" y="340" textAnchor="middle">
            <tspan fontWeight="700">Untenable self-sufficiency</tspan> — no one may need us, and we may need no one.
          </text>
          <text x="360" y="360" textAnchor="middle">
            The contempt we aim at their &ldquo;neediness&rdquo; is the same self-hatred we once aimed
          </text>
          <text x="360" y="374" textAnchor="middle">
            at our own vulnerable True Self.
          </text>
        </g>
        <text x="360" y="394" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          Realizing that basic, ontological loss all at once is too much — so we lash out instead.
        </text>
      </g>

      {/* bottom caption */}
      <text x="360" y="432" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
        Their need to be rescued is exactly the need we buried — that is why it burns to look at.
      </text>
      <text x="360" y="450" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        The recoil is not really about them. It is grief, arriving in the only disguise we would let in.
      </text>
    </svg>
  );
}
