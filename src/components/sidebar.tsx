"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Sparkles,
  LineChart,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/traits", label: "Traits", icon: BookOpen },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/exercises", label: "Exercises", icon: Sparkles },
  { href: "/insights", label: "Insights", icon: LineChart },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--card)]/60 backdrop-blur-sm">
      <div className="px-6 py-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-serif text-lg font-semibold">
            A
          </div>
          <div>
            <div className="font-serif text-base font-semibold leading-tight text-[var(--foreground)]">
              ACA Companion
            </div>
            <div className="text-xs text-[var(--muted-foreground)]">
              Laundry List Workbook
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3">
        {nav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "text-[var(--foreground)] hover:bg-[var(--muted)]"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  active
                    ? "text-[var(--primary-foreground)]"
                    : "text-[var(--muted-foreground)] group-hover:text-[var(--foreground)]"
                )}
                strokeWidth={1.75}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-6 text-xs text-[var(--muted-foreground)]">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--muted)]/40 p-3">
          <div className="font-medium text-[var(--foreground)] mb-1">
            2026 Study Group
          </div>
          <div>Saturdays · 2 sessions / trait</div>
        </div>
      </div>
    </aside>
  );
}

export function MobileHeader() {
  return (
    <header className="md:hidden sticky top-0 z-30 flex items-center gap-3 border-b border-[var(--border)] bg-[var(--card)] px-4 py-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-serif text-sm font-semibold">
        A
      </div>
      <div className="font-serif text-sm font-semibold">ACA Companion</div>
    </header>
  );
}
