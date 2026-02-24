"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PentagramBg, OrnamentalDivider } from "@/components/ui";

const ORACLES = [
  { href: "/tarot", icon: "🂡", title: "Tarot", desc: "Draw from the Major Arcana" },
  { href: "/numerology", icon: "Ⅸ", title: "Numerology", desc: "Decode the numbers of your soul" },
  { href: "/birthchart", icon: "☿", title: "Birth Chart", desc: "Map the stars at your birth" },
  { href: "/ouija", icon: "◎", title: "Ouija", desc: "Commune with the spirit realm" },
];

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center text-center px-5 py-20 relative overflow-hidden">
      {/* Background pentagram */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <PentagramBg size={500} opacity={0.04} />
      </div>

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        {/* Icon */}
        <div
          className="text-5xl mb-3"
          style={{ animation: "float 4s ease-in-out infinite", filter: "drop-shadow(0 0 20px rgba(201,168,76,0.4))" }}
        >
          ⛤
        </div>

        {/* Title */}
        <h1
          className="text-3xl sm:text-5xl tracking-[6px] leading-tight mb-2"
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            color: "var(--gold)",
            textShadow: "0 0 40px rgba(201,168,76,0.3)",
          }}
        >
          THE ORACLE
        </h1>
        <p
          className="text-[10px] sm:text-xs tracking-[6px] uppercase mb-6"
          style={{ fontFamily: "'Cinzel', serif", color: "var(--gold-dim)" }}
        >
          Peer Beyond the Veil
        </p>

        <OrnamentalDivider />

        <p
          className="text-base sm:text-lg italic leading-relaxed max-w-md mx-auto mb-10"
          style={{ color: "var(--bone-dim)" }}
        >
          &ldquo;The cosmos speaks in symbols and silence.
          <br />
          Choose your instrument of divination.&rdquo;
        </p>

        {/* Oracle cards grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto">
          {ORACLES.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
            >
              <Link
                href={item.href}
                className="oracle-card block p-6 sm:p-8 text-center active:scale-95 transition-transform"
              >
                <div
                  className="text-3xl sm:text-4xl mb-3"
                  style={{ filter: "drop-shadow(0 0 10px rgba(201,168,76,0.3))" }}
                >
                  {item.icon}
                </div>
                <div
                  className="text-sm sm:text-base tracking-[3px] mb-1"
                  style={{ fontFamily: "'Cinzel Decorative', serif", color: "var(--gold)" }}
                >
                  {item.title}
                </div>
                <div className="text-xs italic" style={{ color: "var(--bone-dim)" }}>
                  {item.desc}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom motto */}
      <div
        className="absolute bottom-24 sm:bottom-6 text-[10px] tracking-[4px] uppercase"
        style={{ fontFamily: "'Cinzel', serif", color: "rgba(201,168,76,0.2)" }}
      >
        ✦ As above, so below ✦
      </div>
    </div>
  );
}
