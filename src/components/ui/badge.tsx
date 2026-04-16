import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "accent" | "sage" | "muted";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  const variants: Record<Variant, string> = {
    default: "bg-[var(--primary)] text-[var(--primary-foreground)]",
    outline: "border border-[var(--border)] text-[var(--foreground)]",
    accent: "bg-[var(--accent)] text-[var(--accent-foreground)]",
    sage: "bg-[var(--sage)] text-[var(--primary)]",
    muted: "bg-[var(--muted)] text-[var(--foreground)]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
