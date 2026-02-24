"use client";

export function OrnamentalDivider() {
  return (
    <div className="text-center my-6 tracking-[8px] opacity-50 text-sm" style={{ color: "var(--gold-dim)" }}>
      ─── ✦ ───
    </div>
  );
}

export function PentagramBg({ size = 300, opacity = 0.04 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="absolute"
      style={{ opacity, animation: "pentagramSpin 120s linear infinite" }}
    >
      <polygon
        points="50,5 61,40 97,40 68,62 79,97 50,75 21,97 32,62 3,40 39,40"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="0.5"
      />
      <circle cx="50" cy="50" r="48" fill="none" stroke="var(--gold)" strokeWidth="0.3" />
    </svg>
  );
}

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] px-4 pb-10 pt-20 sm:pt-24 max-w-3xl mx-auto">
      {children}
    </div>
  );
}

export function PageHeader({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="text-center mb-6">
      <h1 className="text-2xl sm:text-4xl tracking-[4px] mb-2" style={{ fontFamily: "'Cinzel Decorative', serif", color: "var(--gold)", textShadow: "0 0 40px rgba(201,168,76,0.3)" }}>
        {icon} {title}
      </h1>
      <p className="italic text-base" style={{ color: "var(--bone-dim)" }}>{subtitle}</p>
    </div>
  );
}
