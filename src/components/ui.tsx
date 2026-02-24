"use client";

import { useEffect, useRef } from "react";

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate stars
    const stars: { x: number; y: number; r: number; brightness: number; speed: number }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        brightness: Math.random(),
        speed: 0.002 + Math.random() * 0.008,
      });
    }

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() * 0.001;

      stars.forEach(s => {
        const flicker = 0.5 + 0.5 * Math.sin(t * s.speed * 100 + s.x);
        const alpha = 0.2 + 0.6 * s.brightness * flicker;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,220,200,${alpha})`;
        ctx.fill();
      });

      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

export function CosmicDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-8" style={{ color: "var(--text-muted)" }}>
      <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(to right, transparent, var(--border-subtle))" }} />
      <span className="text-sm tracking-widest">☽ ✦ ☾</span>
      <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(to left, transparent, var(--border-subtle))" }} />
    </div>
  );
}

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 min-h-[100dvh] px-5 pb-28 pt-6 sm:pt-24 sm:pb-10 max-w-2xl mx-auto">
      {children}
    </div>
  );
}

export function PageHeader({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="text-center mb-4">
      <div className="text-3xl mb-2 moon-icon">{icon}</div>
      <h1
        className="text-xl sm:text-3xl tracking-wide mb-1"
        style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}
      >
        {title}
      </h1>
      <p className="text-sm" style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>
        {subtitle}
      </p>
    </div>
  );
}

export function InfoCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="glass p-5 mb-4">
      {title && (
        <h3 className="text-sm tracking-wider uppercase mb-3" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>
          {title}
        </h3>
      )}
      <div className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {children}
      </div>
    </div>
  );
}
