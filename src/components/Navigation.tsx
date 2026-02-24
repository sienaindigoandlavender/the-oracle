"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "☾" },
  { href: "/daily", label: "Daily", icon: "⊛" },
  { href: "/tarot", label: "Tarot", icon: "✦" },
  { href: "/runes", label: "Runes", icon: "ᚠ" },
  { href: "/iching", label: "I Ching", icon: "☰" },
  { href: "/ouija", label: "Spirits", icon: "◎" },
  { href: "/numerology", label: "Numbers", icon: "◈" },
  { href: "/birthchart", label: "Stars", icon: "☿" },
  { href: "/journal", label: "Shadow", icon: "◑" },
  { href: "/dreams", label: "Dreams", icon: "☾" },
  { href: "/breathwork", label: "Breath", icon: "◯" },
  { href: "/learn", label: "Learn", icon: "❋" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile: Bottom navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
        style={{
          background: "linear-gradient(0deg, rgba(7,11,20,0.98) 0%, rgba(7,11,20,0.92) 100%)",
          borderTop: "1px solid rgba(196,181,154,0.08)",
          paddingBottom: "env(safe-area-inset-bottom)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="flex items-center px-1 py-1.5 overflow-x-auto no-scrollbar gap-0.5">
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-lg transition-all duration-300 min-w-[44px]"
                style={{
                  color: isActive ? "var(--text-accent)" : "var(--text-muted)",
                  background: isActive ? "rgba(212,165,74,0.08)" : "transparent",
                }}
              >
                <span className="text-base">{item.icon}</span>
                <span
                  className="text-[8px] tracking-[1px] uppercase"
                  style={{ fontFamily: "'Philosopher', serif" }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop: Top navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 hidden sm:block"
        style={{
          background: "linear-gradient(180deg, rgba(7,11,20,0.98) 0%, rgba(7,11,20,0.85) 80%, transparent 100%)",
          padding: "14px 0 24px",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex justify-center gap-1.5 flex-wrap px-4">
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, rgba(212,165,74,0.15), rgba(212,165,74,0.25))"
                    : "rgba(196,181,154,0.04)",
                  border: `1px solid ${isActive ? "rgba(212,165,74,0.3)" : "transparent"}`,
                  color: isActive ? "var(--text-accent)" : "var(--text-muted)",
                  fontFamily: "'Philosopher', serif",
                  fontSize: "12px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase" as const,
                }}
              >
                <span className="text-sm">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
