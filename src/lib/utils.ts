import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, format: "short" | "long" | "weekday" = "long") {
  const d = typeof date === "string" ? new Date(date) : date;
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

export function daysBetween(from: Date, to: Date) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((to.getTime() - from.getTime()) / msPerDay);
}
