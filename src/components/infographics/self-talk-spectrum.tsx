"use client";

// Trait 5 — companion graphic for the Self-Talk Rewriter exercise (and a supplement on the
// Flip Side of the Laundry List quadrant). Two columns of typical phrases: victim viewpoint
// vs. whole/complete. Built directly from the Laundry List Q4 ("phrases that might come out
// of a person's mouth") and Flip Side Q3 ("what self-talk do you practice as a daily habit").

interface Props { className?: string; }

export function SelfTalkSpectrum({ className }: Props) {
  const victim = [
    "Why does this always happen to me?",
    "I can't catch a break.",
    "Nothing I do works.",
    "They made me feel this way.",
    "I have no choice.",
    "If only they would change…",
    "It's not fair.",
    "I guess this is just my life.",
  ];

  const whole = [
    "What is mine in this?",
    "I have done hard things before.",
    "I can try one small thing.",
    "I get to decide what I do next.",
    "I have a choice, even now.",
    "I can change what I can change.",
    "I can want this to be different and accept what is.",
    "I am the one inside this life.",
  ];

  return (
    <svg viewBox="0 0 740 480" className={className} role="img" aria-label="Two columns of self-talk: victim viewpoint phrases on one side, whole and complete phrases on the other.">
      <defs>
        <marker id="sts-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="370" y="22" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        THE SELF-TALK SPECTRUM
      </text>
      <text x="370" y="40" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        the same situation, two voices inside
      </text>

      {/* LEFT — Victim viewpoint */}
      <g>
        <rect x="30" y="68" width="290" height="356" rx="14" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.5"/>
        <text x="175" y="92" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--accent)">
          VICTIM VIEWPOINT
        </text>
        <text x="175" y="108" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          “what swirls around in their head”
        </text>
        {victim.map((p, i) => (
          <g key={p}>
            <text x="50" y={138 + i * 32} fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fill="var(--foreground)" opacity="0.85">
              <tspan fontWeight="700" fill="var(--accent)">“</tspan>
              {p}
              <tspan fontWeight="700" fill="var(--accent)">”</tspan>
            </text>
          </g>
        ))}
      </g>

      {/* CENTER — rewrite arrow */}
      <g>
        <text x="370" y="170" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1" fontWeight="700" fill="var(--muted-foreground)">
          REWRITE
        </text>
        <line x1="332" y1="246" x2="408" y2="246" stroke="var(--muted-foreground)" strokeWidth="1.75" markerEnd="url(#sts-arrow)"/>
        <text x="370" y="266" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          the still center
        </text>
        <text x="370" y="280" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">
          neither dramatic nor in denial
        </text>
      </g>

      {/* RIGHT — Whole & Complete */}
      <g>
        <rect x="420" y="68" width="290" height="356" rx="14" fill="var(--sage)" fillOpacity="0.18" stroke="var(--sage)" strokeWidth="1.75"/>
        <text x="565" y="92" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">
          WHOLE &amp; COMPLETE
        </text>
        <text x="565" y="108" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          “daily habit, or in times of stress”
        </text>
        {whole.map((p, i) => (
          <g key={p}>
            <text x="440" y={138 + i * 32} fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fill="var(--foreground)" opacity="0.9">
              <tspan fontWeight="700" fill="var(--sage)">“</tspan>
              {p}
              <tspan fontWeight="700" fill="var(--sage)">”</tspan>
            </text>
          </g>
        ))}
      </g>

      {/* Bottom caption */}
      <text x="370" y="450" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.82">
        The Trait 5 question: <tspan fontStyle="italic">what self-talk do you practice as a daily habit, or in times of stress?</tspan>
      </text>
      <text x="370" y="466" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        Rewriting one phrase a week, over months, changes what the inside of your head sounds like.
      </text>
    </svg>
  );
}
