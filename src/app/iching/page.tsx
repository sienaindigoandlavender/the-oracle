"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper, PageHeader, CosmicDivider } from "@/components/ui";
import { OracleReading } from "@/components/OracleReading";
import { useOracle } from "@/lib/useOracle";
import { HEXAGRAMS } from "@/lib/iching-data";

interface Line { value: number; type: "yin" | "yang" | "old-yin" | "old-yang"; }

function buildLines(): Line[] {
  const lines: Line[] = [];
  for (let i = 0; i < 6; i++) {
    // 3 coin tosses: heads=3, tails=2
    const toss = Array.from({ length: 3 }, () => Math.random() > 0.5 ? 3 : 2);
    const sum = toss.reduce((a, b) => a + b, 0);
    // 6=old yin(changing), 7=young yang, 8=young yin, 9=old yang(changing)
    const type = sum === 6 ? "old-yin" : sum === 7 ? "yang" : sum === 8 ? "yin" : "old-yang";
    lines.push({ value: sum, type });
  }
  return lines;
}

function linesToHexagramIndex(lines: Line[]): number {
  // Convert lines to binary: yang/old-yang=1, yin/old-yin=0
  // Lower trigram = lines 0-2, Upper trigram = lines 3-5
  const binary: number[] = lines.map(l => (l.type === "yang" || l.type === "old-yang") ? 1 : 0);
  const num = binary.reduce((acc, bit, i) => acc + bit * Math.pow(2, i), 0);
  return num % 64;
}

function LineDisplay({ line, index, revealed }: { line: Line; index: number; revealed: boolean }) {
  const isYang = line.type === "yang" || line.type === "old-yang";
  const isChanging = line.type === "old-yin" || line.type === "old-yang";

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: revealed ? 1 : 0, scaleX: revealed ? 1 : 0 }}
      transition={{ delay: index * 0.2, duration: 0.4 }}
      className="flex justify-center items-center gap-1 my-1.5"
    >
      {isYang ? (
        <div className="h-3 rounded-full" style={{
          width: "120px",
          background: isChanging
            ? "linear-gradient(90deg, var(--text-accent), var(--aurora))"
            : "var(--text-secondary)",
          boxShadow: isChanging ? "0 0 12px rgba(212,165,74,0.3)" : "none",
        }} />
      ) : (
        <div className="flex gap-3 justify-center" style={{ width: "120px" }}>
          <div className="h-3 rounded-full flex-1" style={{
            background: isChanging
              ? "linear-gradient(90deg, var(--nebula-pink), var(--text-accent))"
              : "var(--text-secondary)",
            boxShadow: isChanging ? "0 0 12px rgba(123,74,110,0.3)" : "none",
          }} />
          <div className="h-3 rounded-full flex-1" style={{
            background: isChanging
              ? "linear-gradient(90deg, var(--text-accent), var(--nebula-pink))"
              : "var(--text-secondary)",
            boxShadow: isChanging ? "0 0 12px rgba(123,74,110,0.3)" : "none",
          }} />
        </div>
      )}
      {isChanging && (
        <span className="text-[8px] ml-2" style={{ color: "var(--text-accent)" }}>○</span>
      )}
    </motion.div>
  );
}

export default function IChingPage() {
  const [question, setQuestion] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [isCasting, setIsCasting] = useState(false);
  const oracle = useOracle();

  const hexagram = lines.length === 6 ? HEXAGRAMS[linesToHexagramIndex(lines)] : null;
  const hasChanging = lines.some(l => l.type === "old-yin" || l.type === "old-yang");

  const castCoins = () => {
    setIsCasting(true);
    setRevealed(false);
    oracle.reset();
    setLines([]);

    setTimeout(() => {
      const newLines = buildLines();
      setLines(newLines);
      setTimeout(() => {
        setRevealed(true);
        setIsCasting(false);

        // Auto-request AI
        const hex = HEXAGRAMS[linesToHexagramIndex(newLines)];
        if (hex) {
          const changingLines = newLines
            .map((l, i) => l.type === "old-yin" || l.type === "old-yang" ? `Line ${i + 1}: ${l.type}` : null)
            .filter(Boolean);

          oracle.ask({
            type: "iching",
            question,
            hexagram: { number: hex.number, name: hex.name, chinese: hex.chinese, trigrams: hex.trigrams, judgment: hex.judgment },
            changingLines,
          });
        }
      }, 200);
    }, 1200);
  };

  return (
    <PageWrapper>
      <PageHeader icon="☰" title="I Ching" subtitle="The Book of Changes — 3,000 years of wisdom in six lines" />
      <CosmicDivider />

      {/* Question */}
      <div className="max-w-md mx-auto mb-6">
        <label className="label-text">Your Question <span style={{ opacity: 0.5 }}>(optional)</span></label>
        <input type="text" value={question} onChange={e => setQuestion(e.target.value)}
          placeholder="What is the nature of my situation regarding...?"
          className="oracle-input" style={{ fontStyle: "italic" }} />
        <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
          The I Ching responds best to open questions about the nature of a situation, not yes/no questions.
        </p>
      </div>

      <div className="text-center mb-8">
        <button onClick={castCoins} disabled={isCasting} className="oracle-btn">
          {isCasting ? "Tossing coins..." : lines.length ? "Cast Again" : "Toss the Coins"}
        </button>
      </div>

      {/* Coin toss animation */}
      {isCasting && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-8">
          <div className="flex justify-center gap-4">
            {[0, 1, 2].map(i => (
              <motion.div key={i}
                animate={{ rotateX: [0, 360, 720, 1080], y: [0, -30, 0, -20, 0] }}
                transition={{ duration: 1, delay: i * 0.15, ease: "easeInOut" }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm"
                style={{ background: "linear-gradient(145deg, rgba(212,165,74,0.2), rgba(212,165,74,0.05))", border: "1px solid rgba(212,165,74,0.3)", color: "var(--text-accent)" }}>
                ☯
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Hexagram display */}
      <AnimatePresence>
        {lines.length === 6 && revealed && hexagram && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
            {/* Hexagram visual */}
            <div className="glass p-6 text-center mb-4">
              <div className="text-5xl mb-2" style={{ fontFamily: "serif", color: "var(--text-accent)" }}>{hexagram.chinese}</div>
              <h2 className="text-xl mb-1" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-primary)" }}>
                {hexagram.number}. {hexagram.name}
              </h2>
              <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
                {hexagram.trigrams[0]} below · {hexagram.trigrams[1]} above
              </p>

              {/* Lines — bottom to top */}
              <div className="flex flex-col-reverse items-center my-4">
                {lines.map((line, i) => (
                  <LineDisplay key={i} line={line} index={i} revealed={revealed} />
                ))}
              </div>

              {hasChanging && (
                <p className="text-[10px] tracking-[1px] mt-2" style={{ color: "var(--text-accent)" }}>
                  ○ = changing line
                </p>
              )}
            </div>

            {/* Judgment */}
            <div className="glass p-5 mb-4">
              <div className="text-[10px] tracking-[2px] uppercase mb-2" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>
                The Judgment
              </div>
              <p className="text-sm leading-[1.8]" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--text-secondary)", fontSize: "15px" }}>
                {hexagram.judgment}
              </p>
            </div>

            {/* AI Reading */}
            <OracleReading content={oracle.result} loading={oracle.loading} error={oracle.error} />
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
