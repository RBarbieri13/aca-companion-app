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
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/traits", label: "Traits", icon: BookOpen },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/exercises", label: "Practice", icon: Sparkles },
  { href: "/insights", label: "Insights", icon: LineChart },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border)] bg-[var(--card)]/95 backdrop-blur">
      <div className="grid grid-cols-5">
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
                "flex flex-col items-center gap-1 py-3 text-[10px] font-medium",
                active
                  ? "text-[var(--primary)]"
                  : "text-[var(--muted-foreground)]"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
