"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper, PageHeader, CosmicDivider } from "@/components/ui";
import { MAJOR_ARCANA, SPREAD_LABELS } from "@/lib/tarot-data";

interface DrawnCard {
  name: string;
  numeral: string;
  symbol: string;
  meaning: string;
  reversed: string;
  isReversed: boolean;
}

export default function TarotPage() {
  const [drawn, setDrawn] = useState<DrawnCard[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [spread, setSpread] = useState("single");
  const [isDrawing, setIsDrawing] = useState(false);

  const drawCards = () => {
    setIsDrawing(true);
    setFlipped([]);
    const count = spread === "single" ? 1 : spread === "three" ? 3 : 5;
    const shuffled = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5);
    const cards = shuffled.slice(0, count).map(c => ({
      ...c,
      isReversed: Math.random() > 0.7,
    }));
    setTimeout(() => { setDrawn(cards); setIsDrawing(false); }, 800);
  };

  const flipCard = (i: number) => {
    if (!flipped.includes(i)) setFlipped(prev => [...prev, i]);
  };

  return (
    <PageWrapper>
      <PageHeader icon="✦" title="Tarot" subtitle="What does the universe want you to see right now?" />
      <CosmicDivider />

      {/* Spread selector */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {([["single", "Single Card"], ["three", "Past · Present · Future"], ["five", "Five Cards"]] as const).map(([val, label]) => (
          <button
            key={val}
            onClick={() => { setSpread(val); setDrawn([]); setFlipped([]); }}
            className="px-4 py-2 rounded-lg text-sm transition-all duration-300"
            style={{
              background: spread === val ? "rgba(212,165,74,0.12)" : "transparent",
              border: `1px solid ${spread === val ? "rgba(212,165,74,0.3)" : "var(--border-subtle)"}`,
              color: spread === val ? "var(--text-accent)" : "var(--text-muted)",
              fontFamily: "'Raleway', sans-serif",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="text-center mb-8">
        <button onClick={drawCards} disabled={isDrawing} className="oracle-btn">
          {isDrawing ? "Shuffling..." : drawn.length ? "Draw Again" : "Draw Cards"}
        </button>
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        {drawn.length > 0 && (
          <motion.div
            key={drawn.map(c => c.name).join(",")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center gap-3 sm:gap-4 flex-wrap mb-8"
            style={{ perspective: "1000px" }}
          >
            {drawn.map((card, i) => {
              const isFlipped = flipped.includes(i);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 }}
                  onClick={() => flipCard(i)}
                  className="text-center cursor-pointer"
                  style={{ width: "clamp(100px, 22vw, 150px)" }}
                >
                  <div className="text-[10px] tracking-[2px] uppercase mb-2" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}>
                    {SPREAD_LABELS[spread]?.[i]}
                  </div>

                  <div
                    className="w-full rounded-lg transition-transform duration-700 relative"
                    style={{ aspectRatio: "2/3", transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(0deg)" : "rotateY(180deg)" }}
                  >
                    {/* Front */}
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center p-3 rounded-lg"
                      style={{
                        backfaceVisibility: "hidden",
                        background: "linear-gradient(145deg, rgba(26,39,72,0.9), rgba(12,18,37,0.95))",
                        border: "1px solid rgba(212,165,74,0.2)",
                        boxShadow: isFlipped ? "0 0 24px rgba(212,165,74,0.15)" : "none",
                      }}
                    >
                      <div className="text-2xl sm:text-3xl mb-2" style={{ transform: card.isReversed ? "rotate(180deg)" : "none" }}>
                        {card.symbol}
                      </div>
                      <div className="text-xs sm:text-sm text-center leading-tight" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>
                        {card.name}
                      </div>
                      <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{card.numeral}</div>
                      {card.isReversed && (
                        <div className="text-[9px] mt-2 tracking-[1.5px]" style={{ fontFamily: "'Philosopher', serif", color: "var(--nebula-pink)" }}>
                          REVERSED
                        </div>
                      )}
                    </div>

                    {/* Back */}
                    <div
                      className="absolute inset-0 flex items-center justify-center rounded-lg"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: "linear-gradient(145deg, var(--midnight), var(--deep))",
                        border: "1px solid rgba(212,165,74,0.15)",
                        animation: "glowPulse 3s ease-in-out infinite",
                      }}
                    >
                      <div className="text-2xl" style={{ color: "var(--text-accent)", opacity: 0.6 }}>☽</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Readings */}
      {drawn.length > 0 && flipped.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <CosmicDivider />
          <div className="max-w-xl mx-auto space-y-4">
            {drawn.filter((_, i) => flipped.includes(i)).map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-5"
              >
                <div className="text-base mb-2" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>
                  {card.numeral} · {card.name} {card.isReversed ? "(Reversed)" : ""}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {card.isReversed ? card.reversed : card.meaning}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {drawn.length > 0 && flipped.length < drawn.length && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="text-center text-xs italic mt-4" style={{ color: "var(--text-muted)" }}>
          Tap a card to reveal its message
        </motion.p>
      )}
    </PageWrapper>
  );
}
