"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** A numbered segment block within a multi-segment exercise. */
export function Segment({
  index,
  title,
  description,
  children,
  color = "var(--primary)",
}: {
  index: number;
  title: string;
  description?: string;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <Card className="p-5 md:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-serif text-xs font-semibold text-white"
          style={{ background: color }}
        >
          {index}
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold leading-tight">{title}</h3>
          {description && (
            <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {children}
    </Card>
  );
}

export function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-[var(--muted-foreground)] italic py-3 text-center">{children}</p>
  );
}

export function EntryRow({
  children,
  onDelete,
}: {
  children: React.ReactNode;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--background)] p-3">
      <div className="flex-1 min-w-0 text-sm">{children}</div>
      <button
        onClick={onDelete}
        className="text-[var(--muted-foreground)] hover:text-[var(--accent)] shrink-0 p-1"
        aria-label="Delete entry"
      >
        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
      </button>
    </div>
  );
}

/** A labeled 0–100 slider with a value readout. */
export function Slider({
  label,
  value,
  onChange,
  leftLabel,
  rightLabel,
  color = "var(--primary)",
}: {
  label?: string;
  value: number;
  onChange: (v: number) => void;
  leftLabel?: string;
  rightLabel?: string;
  color?: string;
}) {
  return (
    <div>
      {label && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm font-serif font-semibold" style={{ color }}>
            {value}
          </span>
        </div>
      )}
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--primary)]"
        style={{ accentColor: color }}
      />
      {(leftLabel || rightLabel) && (
        <div className="flex justify-between text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      )}
    </div>
  );
}

export function AddButton({
  onClick,
  children,
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <Button variant="subtle" size="sm" onClick={onClick} disabled={disabled} className="mt-2">
      {children}
    </Button>
  );
}

/** Compact text input matching the journal aesthetic. */
export function Field({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/70 focus-visible:border-[var(--ring)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]/20 transition-colors",
        className
      )}
      {...props}
    />
  );
}

export function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]"
          : "border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
      )}
    >
      {children}
    </button>
  );
}

export function SummaryBar({
  segments,
}: {
  segments: { label: string; value: number; color: string }[];
}) {
  const max = Math.max(1, ...segments.map((s) => s.value));
  return (
    <div className="space-y-2">
      {segments.map((s) => (
        <div key={s.label} className="flex items-center gap-3">
          <span className="text-xs w-28 shrink-0 text-[var(--muted-foreground)] capitalize">
            {s.label}
          </span>
          <div className="flex-1 h-3 rounded-full bg-[var(--muted)] overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${(s.value / max) * 100}%`, background: s.color }}
            />
          </div>
          <span className="text-xs w-6 text-right font-medium">{s.value}</span>
        </div>
      ))}
    </div>
  );
}
