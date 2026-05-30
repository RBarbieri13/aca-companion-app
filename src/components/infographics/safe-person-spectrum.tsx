"use client";

// Trait 4 — supporting graphic for the "Safe Person" exercise (Flip Side Q4).
// Reframes the old hypervigilant habit of "studying people to see if they're safe" into a
// conscious, values-based discernment: red flags on the left, green flags on the right.

interface Props { className?: string; }

export function SafePersonSpectrum({ className }: Props) {
  const reds = ["Hot then cold", "Punishes a “no”", "Always a crisis", "Contempt · rage"];
  const greens = ["Keeps their word", "Respects a “no”", "Owns their part", "Steady over time"];

  return (
    <svg viewBox="0 0 620 320" className={className} role="img" aria-label="The safe-person spectrum from red flags to green flags">
      <defs>
        <linearGradient id="sps-bar" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.85"/>
          <stop offset="50%" stopColor="var(--muted-foreground)" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="var(--sage)" stopOpacity="0.9"/>
        </linearGradient>
      </defs>

      {/* Title */}
      <text x="310" y="24" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        FROM SCANNING TO DISCERNMENT
      </text>
      <text x="310" y="42" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        not &ldquo;are they dangerous?&rdquo; but &ldquo;are they available?&rdquo;
      </text>

      {/* Spectrum bar */}
      <rect x="60" y="150" width="500" height="12" rx="6" fill="url(#sps-bar)"/>
      <circle cx="60" cy="156" r="9" fill="var(--accent)"/>
      <circle cx="560" cy="156" r="9" fill="var(--sage)"/>

      {/* End labels */}
      <text x="60" y="186" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--accent)">
        Unsafe
      </text>
      <text x="60" y="201" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
        unavailable · compulsive
      </text>
      <text x="560" y="186" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--sage)">
        Safe
      </text>
      <text x="560" y="201" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
        available · consistent
      </text>

      {/* Red flags above-left */}
      <text x="180" y="78" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1" fontWeight="700" fill="var(--accent)">
        RED FLAGS
      </text>
      {reds.map((r, i) => {
        const y = 96 + i * 14;
        return (
          <g key={r}>
            <circle cx="78" cy={y - 3} r="2.5" fill="var(--accent)"/>
            <text x="88" y={y} fontFamily="var(--font-inter)" fontSize="9" fill="var(--foreground)" opacity="0.82">{r}</text>
          </g>
        );
      })}
      <line x1="120" y1="150" x2="120" y2="140" stroke="var(--accent)" strokeWidth="1" opacity="0.5"/>

      {/* Green flags above-right */}
      <text x="450" y="78" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1" fontWeight="700" fill="var(--sage)">
        GREEN FLAGS
      </text>
      {greens.map((g, i) => {
        const y = 96 + i * 14;
        return (
          <g key={g}>
            <circle cx="404" cy={y - 3} r="2.5" fill="var(--sage)"/>
            <text x="414" y={y} fontFamily="var(--font-inter)" fontSize="9" fill="var(--foreground)" opacity="0.82">{g}</text>
          </g>
        );
      })}
      <line x1="500" y1="150" x2="500" y2="140" stroke="var(--sage)" strokeWidth="1" opacity="0.5"/>

      {/* The reframe — bottom */}
      <g>
        <rect x="60" y="234" width="500" height="64" rx="10" fill="var(--muted)" fillOpacity="0.4"/>
        <text x="310" y="256" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1.2" fontWeight="700" fill="var(--muted-foreground)">
          THE SHIFT
        </text>
        <text x="310" y="274" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
          The child scanned for danger to survive. The adult chooses by values, on purpose.
        </text>
        <text x="310" y="289" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          Safety is a pattern over time — not a feeling in the first five minutes.
        </text>
      </g>
    </svg>
  );
}
