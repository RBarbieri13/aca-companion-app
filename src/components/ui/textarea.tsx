import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/70 focus-visible:border-[var(--ring)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-y",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/70 focus-visible:border-[var(--ring)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
