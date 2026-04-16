"use client";

import { useEffect, useState } from "react";
import { Shield, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const DISMISS_KEY = "aca-privacy-banner-dismissed-v1";

export function PrivacyBanner() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(DISMISS_KEY);
      setDismissed(stored === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  if (!mounted || dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  };

  return (
    <div className="sticky top-0 z-30 border-b border-[var(--sage)]/40 bg-[var(--sage)]/10 backdrop-blur">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="flex items-start gap-3 py-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--sage)]/30 mt-0.5">
            <Shield className="h-3.5 w-3.5 text-[var(--primary)]" strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-[var(--foreground)]">
                Your reflections stay on <em className="not-italic font-semibold">this</em> browser.
              </span>
              <button
                onClick={() => setExpanded((e) => !e)}
                className="text-xs text-[var(--primary)] font-medium inline-flex items-center gap-1 hover:underline"
              >
                How it works
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform",
                    expanded && "rotate-180"
                  )}
                  strokeWidth={2}
                />
              </button>
            </div>

            {expanded && (
              <div className="mt-3 text-xs text-[var(--foreground)]/80 leading-relaxed space-y-3">
                <p>
                  All your answers — reflections, feelings logs, triggers, Inner Child dialogues,
                  favorites, attendance — live in this browser&apos;s local storage. Nothing is sent to a
                  server. Nobody else can see them (not us, not your group).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="rounded-lg bg-[var(--card)]/70 border border-[var(--border)] p-3">
                    <div className="text-[10px] uppercase tracking-wider text-[var(--sage)] font-semibold mb-1.5">
                      ✓ Your answers will be here
                    </div>
                    <ul className="space-y-1 text-xs text-[var(--foreground)]/80">
                      <li>• Tomorrow in the same browser</li>
                      <li>• Next week, next month</li>
                      <li>• After closing the tab or restarting</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-[var(--card)]/70 border border-[var(--border)] p-3">
                    <div className="text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold mb-1.5">
                      ✗ They won&apos;t follow you to
                    </div>
                    <ul className="space-y-1 text-xs text-[var(--foreground)]/80">
                      <li>• A different browser or device</li>
                      <li>• Incognito / Private tabs</li>
                      <li>• After clearing browsing data</li>
                    </ul>
                  </div>
                </div>
                <p className="text-[11px] text-[var(--muted-foreground)]">
                  <strong className="text-[var(--foreground)]">Tip:</strong> pick one browser on one
                  device and always return to it. Account-based sync is coming later.
                </p>
              </div>
            )}
          </div>
          <button
            onClick={dismiss}
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] p-1 rounded shrink-0"
            aria-label="Dismiss privacy notice"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
