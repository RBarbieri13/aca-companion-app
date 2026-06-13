"use client";

// Trait 5 — publisher-style graphic for the Flip Side of the Laundry List quadrant.
// "Going to meetings, sharing honestly, chatting after the meeting either in person or over
// the phone — all of these give us an opportunity to exercise greater power in incremental
// but progressive ways."
// A ladder of rungs showing the small, ordinary moves that reclaim power, in approximate
// order of difficulty.

interface Props { className?: string; }

export function PowerLadder({ className }: Props) {
  // Rungs ordered bottom (start) to top (advanced). Bottom = small, accessible. Top = harder.
  const rungs = [
    { label: "Show up to a meeting",      detail: "Just be in the room."                          },
    { label: "Read a passage aloud",      detail: "One paragraph, one breath."                    },
    { label: "Share one sentence",        detail: "“I'm here today and that's enough.”"          },
    { label: "Stay after, briefly",       detail: "Two minutes of chatting."                      },
    { label: "Pick up the phone",         detail: "Call one fellow traveler this week."           },
    { label: "Say no — once",             detail: "To one small ask that isn't yours to carry."   },
    { label: "Speak a different view",    detail: "Even just one preference, said plainly."       },
    { label: "Ask for what you need",     detail: "Specific. Present-tense. No apology trail."    },
    { label: "Disagree, and stay",        detail: "Without leaving, dominating, or collapsing."   },
    { label: "Let someone walk away",     detail: "Without resisting. Comfort the Inner Child."  },
  ];

  const baseY = 410;
  const topY = 80;
  const stepY = (baseY - topY) / (rungs.length - 1);

  return (
    <svg viewBox="0 0 720 480" className={className} role="img" aria-label="A ladder of small, ordinary moves that reclaim power in incremental but progressive ways.">
      <defs>
        <linearGradient id="pl-rail" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="var(--sage)" stopOpacity="0.85"/>
        </linearGradient>
      </defs>

      {/* Title */}
      <text x="360" y="22" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        INCREMENTAL BUT PROGRESSIVE
      </text>
      <text x="360" y="40" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        ordinary acts that reclaim power
      </text>

      {/* Rails */}
      <line x1="120" y1={baseY + 10} x2="120" y2={topY - 10} stroke="url(#pl-rail)" strokeWidth="6" strokeLinecap="round"/>
      <line x1="230" y1={baseY + 10} x2="230" y2={topY - 10} stroke="url(#pl-rail)" strokeWidth="6" strokeLinecap="round"/>

      {/* Rungs (drawn bottom to top so we can index naturally) */}
      {rungs.map((r, i) => {
        const y = baseY - i * stepY;
        // bottom rungs are accent-tinted, top rungs sage-tinted
        const t = i / (rungs.length - 1);
        const fill = t < 0.4
          ? "var(--accent)"
          : t < 0.7
            ? "var(--muted-foreground)"
            : "var(--sage)";
        return (
          <g key={r.label}>
            {/* rung */}
            <line x1="118" y1={y} x2="232" y2={y} stroke={fill} strokeWidth="6" strokeLinecap="round" opacity="0.85"/>
            {/* index dot */}
            <circle cx="175" cy={y} r="9" fill="var(--card)" stroke={fill} strokeWidth="1.75"/>
            <text x="175" y={y + 3} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" fill={fill}>
              {i + 1}
            </text>
            {/* label */}
            <text x="252" y={y - 2} fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--foreground)">
              {r.label}
            </text>
            {/* detail */}
            <text x="252" y={y + 12} fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
              {r.detail}
            </text>
          </g>
        );
      })}

      {/* Side labels — start and finish */}
      <text x="62" y={baseY + 6} textAnchor="end" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="0.8" fontWeight="700" fill="var(--accent)">
        START HERE
      </text>
      <text x="62" y={baseY + 18} textAnchor="end" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
        any rung today
      </text>

      <text x="62" y={topY} textAnchor="end" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="0.8" fontWeight="700" fill="var(--sage)">
        FURTHER ON
      </text>
      <text x="62" y={topY + 12} textAnchor="end" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
        same skill, more weight
      </text>

      {/* bottom caption */}
      <text x="360" y="452" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.82">
        Each rung is small. The ladder is the point.
      </text>
      <text x="360" y="468" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        You don&apos;t climb it once. You climb it the way you brush your teeth.
      </text>
    </svg>
  );
}
