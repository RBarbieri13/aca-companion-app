import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parses a "YYYY-MM-DD" schedule date as a LOCAL calendar date at midnight.
 *
 * This avoids the classic bug where `new Date("2026-04-25")` (and date-fns's
 * parseISO for the same string) returns UTC midnight — which, in a West Coast
 * timezone, renders as April 24. All group-meeting dates in this app are
 * intentionally timezone-less calendar dates (Saturdays in the user's local
 * region), so we must construct them as local.
 */
export function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

/**
 * Today as a LOCAL calendar date at midnight (hour/minute/second zeroed).
 * Used for day-based comparisons with schedule dates.
 */
export function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function formatDate(
  date: Date | string,
  format: "short" | "long" | "weekday" = "long"
) {
  // Strings use local parsing so "2026-04-25" is always April 25 regardless of TZ.
  const d = typeof date === "string" ? parseLocalDate(date) : date;
  if (format === "short") {
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  if (format === "weekday") {
    return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  }
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Calendar-day distance between two dates. Ignores time-of-day — `today at 5pm`
 * to `tomorrow at 9am` returns 1, not 0.
 */
export function daysBetween(from: Date, to: Date) {
  const a = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const b = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((b.getTime() - a.getTime()) / msPerDay);
}
