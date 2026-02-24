"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CosmicDivider } from "@/components/ui";

const TOOLS = [
  { href: "/journal", icon: "◑", title: "Shadow Journal", desc: "Meet the parts of you waiting in the dark", color: "rgba(123,74,110,0.2)" },
  { href: "/tarot", icon: "✦", title: "Tarot", desc: "Draw wisdom from the Major Arcana", color: "rgba(212,165,74,0.12)" },
  { href: "/numerology", icon: "◈", title: "Numerology", desc: "The sacred mathematics of your soul", color: "rgba(74,138,122,0.15)" },
  { href: "/birthchart", icon: "☿", title: "Birth Chart", desc: "The stars at the moment of your becoming", color: "rgba(42,74,122,0.2)" },
  { href: "/ouija", icon: "◎", title: "Spirit Board", desc: "Ask anything. The spirits will spell their answer.", color: "rgba(74,53,112,0.2)" },
  { href: "/learn", icon: "❋", title: "Learn", desc: "Esoteric traditions, symbols & practices", color: "rgba(196,181,154,0.08)" },
];

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center text-center px-5 py-20 sm:py-28 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Moon icon */}
        <div
          className="text-5xl mb-4 moon-icon"
          style={{ animation: "float 5s ease-in-out infinite" }}
        >
          ☽
        </div>

        {/* Title */}
        <h1
          className="text-2xl sm:text-4xl tracking-wide leading-tight mb-2"
          style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}
        >
          Inner Oracle
        </h1>
        <p
          className="text-xs tracking-[4px] uppercase mb-2"
          style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}
        >
          Go within. Transform. Become.
        </p>

        <CosmicDivider />

        <p
          className="text-base leading-relaxed max-w-sm mx-auto mb-10"
          style={{ color: "var(--text-secondary)", fontStyle: "italic" }}
        >
          This is your sanctuary — a quiet space to explore the unseen,
          ask the questions that matter, and remember who you truly are.
        </p>

        {/* Tool cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {TOOLS.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <Link
                href={item.href}
                className="oracle-card block p-5 sm:p-6 text-center active:scale-[0.97] transition-transform"
                style={{ background: `linear-gradient(145deg, ${item.color}, rgba(12,18,37,0.6))` }}
              >
                <div className="text-2xl sm:text-3xl mb-2 moon-icon">{item.icon}</div>
                <div
                  className="text-sm tracking-wide mb-1"
                  style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}
                >
                  {item.title}
                </div>
                <div className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {item.desc}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom mantra */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-24 sm:bottom-8 text-[10px] tracking-[3px] uppercase"
        style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)", opacity: 0.5 }}
      >
        ☽ as within, so without ☾
      </motion.div>
    </div>
  );
}
