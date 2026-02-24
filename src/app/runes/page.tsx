"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper, PageHeader, CosmicDivider } from "@/components/ui";
import { OracleReading } from "@/components/OracleReading";
import { useOracle } from "@/lib/useOracle";
import { ELDER_FUTHARK, RUNE_SPREADS } from "@/lib/rune-data";

interface DrawnRune { name: string; symbol: string; meaning: string; reversed: string; isReversed: boolean; keywords: string[]; }

export default function RunesPage() {
  const [drawn, setDrawn] = useState<DrawnRune[]>([]);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [spread, setSpread] = useState("single");
  const [question, setQuestion] = useState("");
  const [isCasting, setIsCasting] = useState(false);
  const oracle = useOracle();

  const spreadCounts: Record<string, number> = { single: 1, three: 3, five: 5 };

  const castRunes = () => {
    setIsCasting(true);
    setRevealed([]);
    oracle.reset();
    const count = spreadCounts[spread] || 1;
    const shuffled = [...ELDER_FUTHARK].sort(() => Math.random() - 0.5);
    const runes = shuffled.slice(0, count).map(r => ({
      ...r,
      isReversed: Math.random() > 0.65,
    }));
    setTimeout(() => { setDrawn(runes); setIsCasting(false); }, 1000);
  };

  const revealRune = (i: number) => {
    if (!revealed.includes(i)) setRevealed(prev => [...prev, i]);
  };

  const allRevealed = drawn.length > 0 && revealed.length === drawn.length;

  useEffect(() => {
    if (allRevealed && !oracle.result && !oracle.loading) {
      const labels = RUNE_SPREADS[spread] || [];
      oracle.ask({
        type: "runes",
        question,
        spreadType: spread,
        runes: drawn.map((r, i) => ({
          name: r.name,
          symbol: r.symbol,
          isReversed: r.isReversed,
          position: labels[i] || `Rune ${i + 1}`,
        })),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRevealed]);

  return (
    <PageWrapper>
      <PageHeader icon="ᚠ" title="Runes" subtitle="The old stones speak to those who listen" />
      <CosmicDivider />

      {/* Question */}
      <div className="max-w-md mx-auto mb-6">
        <label className="label-text">Your Question <span style={{ opacity: 0.5 }}>(optional)</span></label>
        <input type="text" value={question} onChange={e => setQuestion(e.target.value)} placeholder="What do the ancient stones whisper about...?" className="oracle-input" style={{ fontStyle: "italic" }} />
      </div>

      {/* Spread selector */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {([["single", "Single Rune"], ["three", "Three Runes"], ["five", "Five Runes"]] as const).map(([val, label]) => (
          <button key={val} onClick={() => { setSpread(val); setDrawn([]); setRevealed([]); oracle.reset(); }}
            className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition-all duration-300"
            style={{ background: spread === val ? "rgba(212,165,74,0.12)" : "transparent", border: `1px solid ${spread === val ? "rgba(212,165,74,0.3)" : "var(--border-subtle)"}`, color: spread === val ? "var(--text-accent)" : "var(--text-muted)" }}>
            {label}
          </button>
        ))}
      </div>

      <div className="text-center mb-8">
        <button onClick={castRunes} disabled={isCasting} className="oracle-btn">
          {isCasting ? "Casting..." : drawn.length ? "Cast Again" : "Cast the Runes"}
        </button>
      </div>

      {/* Rune stones */}
      <AnimatePresence mode="wait">
        {drawn.length > 0 && (
          <motion.div key={drawn.map(r => r.name).join(",")} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex justify-center gap-4 sm:gap-6 flex-wrap mb-8">
            {drawn.map((rune, i) => {
              const isRevealed = revealed.includes(i);
              const labels = RUNE_SPREADS[spread] || [];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
                  onClick={() => revealRune(i)} className="text-center cursor-pointer">
                  <div className="text-[9px] tracking-[2px] uppercase mb-2" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}>
                    {labels[i]}
                  </div>
                  <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl flex items-center justify-center transition-all duration-500"
                    style={{
                      background: isRevealed ? "linear-gradient(145deg, rgba(26,39,72,0.9), rgba(12,18,37,0.95))" : "linear-gradient(145deg, var(--midnight), var(--deep))",
                      border: `1px solid ${isRevealed ? "rgba(212,165,74,0.3)" : "rgba(212,165,74,0.1)"}`,
                      boxShadow: isRevealed ? "0 0 24px rgba(212,165,74,0.12)" : "none",
                    }}>
                    {isRevealed ? (
                      <div className="text-center">
                        <div className="text-3xl sm:text-4xl mb-1" style={{ color: "var(--text-accent)", transform: rune.isReversed ? "rotate(180deg)" : "none" }}>
                          {rune.symbol}
                        </div>
                        <div className="text-[8px] tracking-[1px]" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-secondary)" }}>
                          {rune.name}
                        </div>
                        {rune.isReversed && (
                          <div className="text-[7px] tracking-[1px] mt-0.5" style={{ color: "var(--nebula-pink)" }}>REVERSED</div>
                        )}
                      </div>
                    ) : (
                      <div className="text-xl" style={{ color: "var(--text-accent)", opacity: 0.3, animation: "glowPulse 3s ease-in-out infinite" }}>ᛟ</div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rune readings */}
      {drawn.length > 0 && revealed.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <CosmicDivider />
          <div className="max-w-xl mx-auto space-y-4">
            {drawn.filter((_, i) => revealed.includes(i)).map((rune, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl" style={{ transform: rune.isReversed ? "rotate(180deg)" : "none" }}>{rune.symbol}</span>
                  <div>
                    <div className="text-base" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>
                      {rune.name} {rune.isReversed ? "(Reversed)" : ""}
                    </div>
                    <div className="flex gap-1.5 mt-1">
                      {rune.keywords.map(k => (
                        <span key={k} className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "rgba(212,165,74,0.06)", color: "var(--text-muted)" }}>{k}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {rune.isReversed ? rune.reversed : rune.meaning}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* AI reading */}
      {allRevealed && (
        <div className="max-w-xl mx-auto mt-6">
          <OracleReading content={oracle.result} loading={oracle.loading} error={oracle.error} />
        </div>
      )}

      {drawn.length > 0 && revealed.length < drawn.length && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="text-center text-xs italic mt-4" style={{ color: "var(--text-muted)" }}>
          Tap a stone to reveal its rune
        </motion.p>
      )}
    </PageWrapper>
  );
}
