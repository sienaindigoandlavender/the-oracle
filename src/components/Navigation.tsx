"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Sanctum", icon: "⛤" },
  { href: "/tarot", label: "Tarot", icon: "🂡" },
  { href: "/numerology", label: "Numbers", icon: "Ⅸ" },
  { href: "/birthchart", label: "Stars", icon: "☿" },
  { href: "/ouija", label: "Ouija", icon: "◎" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile: Bottom navigation bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
        style={{
          background: "linear-gradient(0deg, rgba(13,10,8,0.98) 0%, rgba(13,10,8,0.95) 80%, rgba(13,10,8,0.85) 100%)",
          borderTop: "1px solid rgba(201,168,76,0.15)",
          paddingBottom: "env(safe-area-inset-bottom)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex justify-around items-center px-1 py-2">
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-md transition-all duration-300"
                style={{
                  color: isActive ? "var(--gold)" : "var(--bone-dim)",
                  background: isActive ? "rgba(201,168,76,0.08)" : "transparent",
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <span
                  className="text-[9px] tracking-[1.5px] uppercase"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop: Top navigation bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 hidden sm:block"
        style={{
          background: "linear-gradient(180deg, rgba(13,10,8,0.98) 0%, rgba(13,10,8,0.85) 80%, transparent 100%)",
          padding: "12px 0 24px",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="flex justify-center gap-2 flex-wrap px-4">
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-5 py-2.5 rounded-sm transition-all duration-300"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, var(--gold-dim), var(--gold))"
                    : "rgba(201,168,76,0.08)",
                  border: `1px solid ${isActive ? "var(--gold)" : "rgba(201,168,76,0.2)"}`,
                  color: isActive ? "var(--ink)" : "var(--bone-dim)",
                  fontFamily: "'Cinzel', serif",
                  fontSize: "11px",
                  letterSpacing: "2px",
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
