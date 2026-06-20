"use client";

// Constellation showing how the 14 traits connect thematically.
// Nodes are positioned in a gentle spiral; edges show conceptual relationships.

interface Props { className?: string; activeTraitId?: number; }

const TRAIT_NODES = [
  { id: 1, label: "Isolation\n& fear", x: 200, y: 200, theme: "fear" },
  { id: 2, label: "Approval\nseeking", x: 310, y: 140, theme: "identity" },
  { id: 3, label: "Anger &\ncriticism", x: 370, y: 240, theme: "fear" },
  { id: 4, label: "Compulsive\npartners", x: 340, y: 350, theme: "attachment" },
  { id: 5, label: "Victim\nviewpoint", x: 230, y: 400, theme: "identity" },
  { id: 6, label: "Over-\nresponsibility", x: 120, y: 370, theme: "identity" },
  { id: 7, label: "Guilt &\nself-assertion", x: 60, y: 280, theme: "identity" },
  { id: 8, label: "Addicted\nto excitement", x: 80, y: 170, theme: "feeling" },
  { id: 9, label: "Love &\npity", x: 160, y: 90, theme: "attachment" },
  { id: 10, label: "Stuffed\nfeelings", x: 280, y: 60, theme: "feeling" },
  { id: 11, label: "Harsh\nself-judgment", x: 430, y: 110, theme: "identity" },
  { id: 12, label: "Fear of\nabandonment", x: 470, y: 320, theme: "attachment" },
  { id: 13, label: "Para-\nalcoholic", x: 410, y: 420, theme: "family" },
  { id: 14, label: "Reactors,\nnot actors", x: 260, y: 470, theme: "family" },
];

const EDGES: [number, number][] = [
  [1, 3], [1, 9], [1, 10], [1, 11], [1, 12], [1, 14],
  [2, 11], [2, 7], [2, 9],
  [3, 11], [3, 14],
  [4, 9], [4, 12],
  [5, 6], [5, 12], [5, 14],
  [6, 7], [6, 9],
  [7, 11], [7, 6],
  [8, 14], [8, 10],
  [10, 14], [10, 11],
  [13, 14], [13, 4],
];

const THEME_COLORS: Record<string, string> = {
  fear: "var(--accent)",
  identity: "var(--primary)",
  attachment: "#8B7BA8",
  feeling: "#D4A84B",
  family: "var(--sage)",
};

export function TraitConstellation({ className, activeTraitId }: Props) {
  const nodeById = (id: number) => TRAIT_NODES.find((n) => n.id === id)!;
  const isActive = (id: number) => activeTraitId === id;
  const isConnected = (id: number) =>
    activeTraitId !== undefined &&
    EDGES.some(([a, b]) => (a === activeTraitId && b === id) || (b === activeTraitId && a === id));

  return (
    <svg viewBox="0 0 520 520" className={className} role="img" aria-label="The 14 traits and how they connect">
      {/* Edges */}
      {EDGES.map(([a, b], i) => {
        const na = nodeById(a);
        const nb = nodeById(b);
        const highlight =
          activeTraitId !== undefined && (a === activeTraitId || b === activeTraitId);
        return (
          <line
            key={i}
            x1={na.x}
            y1={na.y}
            x2={nb.x}
            y2={nb.y}
            stroke={highlight ? "var(--primary)" : "var(--border)"}
            strokeWidth={highlight ? 1.5 : 1}
            opacity={highlight ? 0.7 : activeTraitId !== undefined ? 0.15 : 0.4}
          />
        );
      })}

      {/* Nodes */}
      {TRAIT_NODES.map((n) => {
        const color = THEME_COLORS[n.theme];
        const active = isActive(n.id);
        const connected = isConnected(n.id);
        const dim = activeTraitId !== undefined && !active && !connected;
        const r = active ? 30 : 24;
        return (
          <g key={n.id} opacity={dim ? 0.3 : 1}>
            <circle
              cx={n.x}
              cy={n.y}
              r={r}
              fill={active ? color : "var(--card)"}
              stroke={color}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <text
              x={n.x}
              y={n.y - 2}
              textAnchor="middle"
              fontFamily="var(--font-fraunces)"
              fontSize="11"
              fontWeight="700"
              fill={active ? "white" : color}
            >
              {n.id}
            </text>
            {n.label.split("\n").map((line, li) => (
              <text
                key={li}
                x={n.x}
                y={n.y + 14 + li * 8}
                textAnchor="middle"
                fontFamily="var(--font-inter)"
                fontSize="6.5"
                fill={active ? "white" : "var(--muted-foreground)"}
                fontWeight="500"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {/* Legend */}
      <g fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)">
        <g transform="translate(20, 20)">
          <text x="0" y="0" fontSize="9" fontWeight="600" letterSpacing="1" fill="var(--muted-foreground)">THEMES</text>
          {[
            { label: "Fear", color: "var(--accent)" },
            { label: "Identity", color: "var(--primary)" },
            { label: "Attachment", color: "#8B7BA8" },
            { label: "Feeling", color: "#D4A84B" },
            { label: "Family disease", color: "var(--sage)" },
          ].map((t, i) => (
            <g key={t.label} transform={`translate(0, ${14 + i * 13})`}>
              <circle cx="5" cy="0" r="4" fill={t.color}/>
              <text x="14" y="3">{t.label}</text>
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
