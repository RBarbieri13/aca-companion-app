interface Props {
  className?: string;
}

// Shared infographics for The Twelve Steps Companion.
// House colors: primary (program), accent (problem/warning), sage (growth/promise),
// #8B7BA8 (violet), #D4A84B (gold) as extra categoricals.

const PRINCIPLES = [
  "Honesty",
  "Hope",
  "Faith",
  "Courage",
  "Integrity",
  "Willingness",
  "Humility",
  "Brotherly Love",
  "Justice",
  "Perseverance",
  "Spiritual Awareness",
  "Service",
];

export function PrinciplesRing({ className }: Props) {
  // The twelve spiritual principles in order, clockwise around a circle, each with its step.
  const cx = 280;
  const cy = 215;
  const r = 150;
  const rad = (a: number) => (a * Math.PI) / 180;
  return (
    <svg viewBox="0 0 560 440" className={className} role="img" aria-label="A ring of the twelve spiritual principles in order, clockwise, each labeled with its step number">
      <text x="280" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">THE TWELVE PRINCIPLES</text>

      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7" />

      {/* center */}
      <circle cx={cx} cy={cy} r="56" fill="var(--primary)" fillOpacity="0.12" stroke="var(--primary)" strokeWidth="2" />
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="700" fill="var(--primary)">One per</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="700" fill="var(--primary)">step</text>

      {PRINCIPLES.map((p, i) => {
        // start at top (12 o'clock), go clockwise
        const angle = -90 + (i * 360) / 12;
        const x = cx + Math.cos(rad(angle)) * r;
        const y = cy + Math.sin(rad(angle)) * r;
        const right = Math.cos(rad(angle)) >= -0.01;
        const labX = cx + Math.cos(rad(angle)) * (r + 16);
        const labY = cy + Math.sin(rad(angle)) * (r + 16);
        return (
          <g key={p}>
            <circle cx={x} cy={y} r="15" fill="var(--sage)" fillOpacity="0.18" stroke="var(--sage)" strokeWidth="1.8" />
            <text x={x} y={y + 4} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontWeight="700" fill="var(--primary)">{i + 1}</text>
            <text
              x={labX}
              y={labY + 3}
              textAnchor={right ? "start" : "end"}
              fontFamily="var(--font-inter)"
              fontSize="9"
              fontWeight="600"
              fill="var(--muted-foreground)"
            >
              {p}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function ThreePhasesBanner({ className }: Props) {
  // Three connected phases with step numbers: Give Up (1-3) accent, Clean House (4-9)
  // primary, Keep It (10-12) sage.
  const segs = [
    { label: "Give Up", steps: "1–3", sub: "surrender", color: "var(--accent)", x: 40, w: 150 },
    { label: "Clean House", steps: "4–9", sub: "do the work", color: "var(--primary)", x: 205, w: 150 },
    { label: "Keep It", steps: "10–12", sub: "stay free", color: "var(--sage)", x: 370, w: 150 },
  ];
  return (
    <svg viewBox="0 0 560 220" className={className} role="img" aria-label="A banner of the three phases of the steps: Give Up steps 1 to 3, Clean House 4 to 9, Keep It 10 to 12">
      <defs>
        <marker id="shared-phase-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)" />
        </marker>
      </defs>
      <text x="280" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">THREE MOVES, IN ORDER</text>

      {segs.map((s, i) => (
        <g key={s.label}>
          <rect x={s.x} y={70} width={s.w} height={86} rx="16" fill={s.color} fillOpacity="0.16" stroke={s.color} strokeWidth="2" />
          <text x={s.x + s.w / 2} y={100} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="16" fontWeight="700" fill={s.color}>{s.label}</text>
          <text x={s.x + s.w / 2} y={122} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)">{s.sub}</text>
          <text x={s.x + s.w / 2} y={144} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--foreground)">Steps {s.steps}</text>
          {i < segs.length - 1 && (
            <line x1={s.x + s.w + 3} y1={113} x2={s.x + s.w + 12} y2={113} stroke="var(--muted-foreground)" strokeWidth="2" markerEnd="url(#shared-phase-arrow)" />
          )}
        </g>
      ))}
    </svg>
  );
}

const tableWrap =
  "overflow-x-auto rounded-lg border border-[var(--border)]";
const tableBase = "w-full border-collapse text-sm text-[var(--foreground)]";
const thBase =
  "px-3 py-2 text-left font-serif font-semibold text-[var(--primary)] bg-[var(--muted)]/50 border-b border-[var(--border)]";
const tdBase = "px-3 py-2 align-top border-b border-[var(--border)]";

export function StepPrinciplePromiseTable({ className }: { className?: string }) {
  const rows: Array<[number, string, string]> = [
    [1, "Honesty", "solid ground"],
    [2, "Hope", "hope returns"],
    [3, "Faith", "a lighter life"],
    [4, "Courage", "self-knowledge you can use"],
    [5, "Integrity", "belonging"],
    [6, "Willingness", "willingness"],
    [7, "Humility", "human scale"],
    [8, "Brotherly Love", "a clear list"],
    [9, "Justice", "freedom & peace begin"],
    [10, "Perseverance", "daily freedom"],
    [11, "Spiritual Awareness", "steadiness"],
    [12, "Service", "purpose"],
  ];
  return (
    <div className={[tableWrap, className].filter(Boolean).join(" ")}>
      <table className={tableBase}>
        <caption className="sr-only">Each step, its spiritual principle, and what it gives back</caption>
        <thead>
          <tr>
            <th scope="col" className={thBase}>Step</th>
            <th scope="col" className={thBase}>Principle</th>
            <th scope="col" className={thBase}>What it gives back</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([step, principle, gift]) => (
            <tr key={step} className="last:[&_td]:border-b-0">
              <td className={`${tdBase} font-semibold text-[var(--primary)]`}>{step}</td>
              <td className={`${tdBase} font-serif`}>{principle}</td>
              <td className={`${tdBase} text-[var(--muted-foreground)]`}>{gift}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function KindsOfAmendsTable({ className }: { className?: string }) {
  const rows: Array<[string, string, string]> = [
    [
      "Direct",
      "Going to the person and setting it right, face to face.",
      "When you can reach them and it won’t cause harm.",
    ],
    [
      "Living",
      "Changing the behavior for good, not just saying sorry.",
      "When the real repair is who you become next.",
    ],
    [
      "Indirect",
      "Putting good back into the world when the person is out of reach.",
      "When they’ve passed, vanished, or can’t be found.",
    ],
    [
      "Not-yet",
      "Holding off, because the contact would injure them or another.",
      "When “would it injure?” is honestly yes — wait, don’t hide.",
    ],
  ];
  return (
    <div className={[tableWrap, className].filter(Boolean).join(" ")}>
      <table className={tableBase}>
        <caption className="sr-only">Kinds of amends, what each is, and when to use it</caption>
        <thead>
          <tr>
            <th scope="col" className={thBase}>Kind</th>
            <th scope="col" className={thBase}>What it is</th>
            <th scope="col" className={thBase}>When to use it</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([kind, what, when]) => (
            <tr key={kind} className="last:[&_td]:border-b-0">
              <td className={`${tdBase} font-serif font-semibold text-[var(--primary)]`}>{kind}</td>
              <td className={tdBase}>{what}</td>
              <td className={`${tdBase} text-[var(--muted-foreground)]`}>{when}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ThreePhasesTable({ className }: { className?: string }) {
  const rows: Array<[string, string, string]> = [
    ["Give Up", "1–3", "Stop fighting it alone and ask for help."],
    ["Clean House", "4–9", "Face the wreckage and set it right."],
    ["Keep It", "10–12", "Stay current, stay connected, pass it on."],
  ];
  return (
    <div className={[tableWrap, className].filter(Boolean).join(" ")}>
      <table className={tableBase}>
        <caption className="sr-only">The three phases of the steps, their step ranges, and the move each one asks</caption>
        <thead>
          <tr>
            <th scope="col" className={thBase}>Phase</th>
            <th scope="col" className={thBase}>Steps</th>
            <th scope="col" className={thBase}>The move</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([phase, steps, move]) => (
            <tr key={phase} className="last:[&_td]:border-b-0">
              <td className={`${tdBase} font-serif font-semibold text-[var(--primary)]`}>{phase}</td>
              <td className={`${tdBase} text-[var(--muted-foreground)]`}>{steps}</td>
              <td className={tdBase}>{move}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
