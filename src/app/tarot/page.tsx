"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper, PageHeader, OrnamentalDivider } from "@/components/ui";
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
    setTimeout(() => {
      setDrawn(cards);
      setIsDrawing(false);
    }, 800);
  };

  const flipCard = (i: number) => {
    if (!flipped.includes(i)) setFlipped(prev => [...prev, i]);
  };

  return (
    <PageWrapper>
      <PageHeader icon="🂡" title="The Tarot" subtitle="Major Arcana · 22 Cards" />
      <OrnamentalDivider />

      {/* Spread selector */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {([
          ["single", "Single"],
          ["three", "Three Cards"],
          ["five", "Five Cards"],
        ] as const).map(([val, label]) => (
          <button
            key={val}
            onClick={() => { setSpread(val); setDrawn([]); setFlipped([]); }}
            className="px-4 py-2 rounded-sm text-sm transition-all duration-300"
            style={{
              background: spread === val ? "rgba(201,168,76,0.15)" : "transparent",
              border: `1px solid ${spread === val ? "var(--gold)" : "rgba(201,168,76,0.2)"}`,
              color: spread === val ? "var(--gold)" : "var(--bone-dim)",
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: "1px",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Draw button */}
      <div className="text-center mb-8">
        <button onClick={drawCards} disabled={isDrawing} className="oracle-btn">
          {isDrawing ? "Shuffling..." : drawn.length ? "Draw Again" : "Draw Cards"}
        </button>
      </div>

      {/* Cards display */}
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 }}
                  onClick={() => flipCard(i)}
                  className="text-center cursor-pointer"
                  style={{ width: "clamp(110px, 22vw, 160px)" }}
                >
                  {/* Spread label */}
                  <div
                    className="text-[10px] tracking-[2px] uppercase mb-2"
                    style={{ fontFamily: "'Cinzel', serif", color: "var(--gold-dim)" }}
                  >
                    {SPREAD_LABELS[spread]?.[i]}
                  </div>

                  {/* Card */}
                  <div
                    className="w-full rounded transition-transform duration-700"
                    style={{
                      aspectRatio: "2/3",
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(0deg)" : "rotateY(180deg)",
                    }}
                  >
                    {/* Front face */}
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center p-3 rounded"
                      style={{
                        backfaceVisibility: "hidden",
                        background: "linear-gradient(145deg, #1e1814, #2a2118)",
                        border: "2px solid var(--gold-dim)",
                        boxShadow: isFlipped ? "0 0 25px rgba(201,168,76,0.2)" : "none",
                      }}
                    >
                      <div
                        className="text-2xl sm:text-3xl mb-2"
                        style={{ transform: card.isReversed ? "rotate(180deg)" : "none" }}
                      >
                        {card.symbol}
                      </div>
                      <div
                        className="text-xs sm:text-sm text-center leading-tight"
                        style={{ fontFamily: "'Cinzel Decorative', serif", color: "var(--gold)" }}
                      >
                        {card.name}
                      </div>
                      <div className="text-xs mt-1" style={{ fontFamily: "'Cinzel', serif", color: "var(--gold-dim)" }}>
                        {card.numeral}
                      </div>
                      {card.isReversed && (
                        <div className="text-[9px] mt-2 tracking-[2px]" style={{ fontFamily: "'Cinzel', serif", color: "var(--crimson-light)" }}>
                          REVERSED
                        </div>
                      )}
                    </div>

                    {/* Back face */}
                    <div
                      className="absolute inset-0 flex items-center justify-center rounded"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: `
                          repeating-conic-gradient(var(--gold-dim) 0% 25%, transparent 0% 50%) 50% / 20px 20px,
                          linear-gradient(145deg, #1a1410, #0d0a08)
                        `,
                        border: "2px solid var(--gold-dim)",
                        animation: "glowPulse 3s ease-in-out infinite",
                      }}
                    >
                      <div
                        className="w-[70%] h-[70%] flex items-center justify-center text-2xl rounded-sm"
                        style={{ border: "1px solid var(--gold-dim)", color: "var(--gold)" }}
                      >
                        ⛤
                      </div>
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
          <OrnamentalDivider />
          <div className="max-w-xl mx-auto space-y-4">
            {drawn.filter((_, i) => flipped.includes(i)).map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-sm"
                style={{
                  background: "rgba(26,20,16,0.6)",
                  border: "1px solid rgba(201,168,76,0.1)",
                }}
              >
                <div
                  className="text-base sm:text-lg mb-2"
                  style={{ fontFamily: "'Cinzel Decorative', serif", color: "var(--gold)" }}
                >
                  {card.numeral} · {card.name} {card.isReversed ? "(Reversed)" : ""}
                </div>
                <p className="text-sm sm:text-base leading-relaxed italic" style={{ color: "var(--bone)" }}>
                  {card.isReversed ? card.reversed : card.meaning}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tap hint */}
      {drawn.length > 0 && flipped.length < drawn.length && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-xs italic mt-4"
          style={{ color: "var(--gold-dim)" }}
        >
          Tap a card to reveal its message
        </motion.p>
      )}
    </PageWrapper>
  );
}
