"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper, PageHeader, CosmicDivider } from "@/components/ui";
import { OracleReading } from "@/components/OracleReading";
import { useOracle } from "@/lib/useOracle";
import { MAJOR_ARCANA, SPREAD_LABELS } from "@/lib/tarot-data";

interface DrawnCard {
  name: string;
  numeral: string;
  symbol: string;
  meaning: string;
  reversed: string;
  isReversed: boolean;
}

// ─── Reusable single card component ────────────────────────
function TarotCard({
  card,
  index,
  label,
  isFlipped,
  onFlip,
  delay = 0,
  size = "normal",
  crossed = false,
}: {
  card: DrawnCard;
  index: number;
  label: string;
  isFlipped: boolean;
  onFlip: (i: number) => void;
  delay?: number;
  size?: "small" | "normal";
  crossed?: boolean;
}) {
  const w = size === "small" ? "w-[72px] sm:w-[90px]" : "w-[90px] sm:w-[120px]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={() => onFlip(index)}
      className={`text-center cursor-pointer ${w}`}
      style={crossed ? { transform: "rotate(90deg)", transformOrigin: "center center" } : undefined}
    >
      {!crossed && (
        <div
          className="text-[8px] sm:text-[10px] tracking-[1.5px] uppercase mb-1 truncate"
          style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}
        >
          {label}
        </div>
      )}

      <div
        className="w-full rounded-lg transition-transform duration-700 relative"
        style={{
          aspectRatio: "2/3",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(0deg)" : "rotateY(180deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-2 rounded-lg"
          style={{
            backfaceVisibility: "hidden",
            background: "linear-gradient(145deg, rgba(26,39,72,0.9), rgba(12,18,37,0.95))",
            border: "1px solid rgba(212,165,74,0.2)",
            boxShadow: isFlipped ? "0 0 20px rgba(212,165,74,0.12)" : "none",
          }}
        >
          <div
            className="text-xl sm:text-2xl mb-1"
            style={{ transform: card.isReversed ? "rotate(180deg)" : "none" }}
          >
            {card.symbol}
          </div>
          <div
            className="text-[9px] sm:text-[11px] text-center leading-tight"
            style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}
          >
            {card.name}
          </div>
          <div className="text-[8px] sm:text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
            {card.numeral}
          </div>
          {card.isReversed && (
            <div
              className="text-[7px] sm:text-[8px] mt-1 tracking-[1px]"
              style={{ fontFamily: "'Philosopher', serif", color: "var(--nebula-pink)" }}
            >
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
          <div className="text-xl" style={{ color: "var(--text-accent)", opacity: 0.5 }}>☽</div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Celtic Cross positional layout ────────────────────────
function CelticCrossLayout({
  cards,
  flipped,
  onFlip,
}: {
  cards: DrawnCard[];
  flipped: number[];
  onFlip: (i: number) => void;
}) {
  const labels = SPREAD_LABELS.celtic;

  // Card positions in the Celtic Cross layout:
  // Left cross area (6 cards) + right staff (4 cards)
  //
  //              [4 Higher Purpose]
  //  [3 Past]   [0 Present + 1 Challenge crossed]   [5 Near Future]
  //              [2 Foundation]
  //
  //  Staff (right column, bottom to top): [6] [7] [8] [9]

  return (
    <div className="flex justify-center gap-4 sm:gap-6 flex-wrap mb-8">
      {/* Cross section */}
      <div className="relative" style={{ width: "260px", height: "320px" }}>
        {/* Card 4 — Higher Purpose (top center) */}
        <div className="absolute" style={{ left: "50%", top: "0", transform: "translateX(-50%)" }}>
          <TarotCard card={cards[4]} index={4} label={labels[4]} isFlipped={flipped.includes(4)} onFlip={onFlip} delay={0.5} size="small" />
        </div>

        {/* Card 3 — Recent Past (left) */}
        <div className="absolute" style={{ left: "0", top: "50%", transform: "translateY(-50%)" }}>
          <TarotCard card={cards[3]} index={3} label={labels[3]} isFlipped={flipped.includes(3)} onFlip={onFlip} delay={0.4} size="small" />
        </div>

        {/* Card 0 — Present (center) */}
        <div className="absolute z-10" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
          <TarotCard card={cards[0]} index={0} label={labels[0]} isFlipped={flipped.includes(0)} onFlip={onFlip} delay={0.1} size="small" />
        </div>

        {/* Card 1 — Challenge (center, crossed / rotated) */}
        <div className="absolute z-20" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%) rotate(90deg)" }}>
          <div className="relative" style={{ width: "72px" }}>
            <div className="text-[8px] tracking-[1.5px] uppercase mb-1 text-center opacity-0" style={{ fontFamily: "'Philosopher', serif" }}>
              .
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => onFlip(1)}
              className="w-full cursor-pointer"
            >
              <div
                className="w-full rounded-lg transition-transform duration-700 relative"
                style={{
                  aspectRatio: "2/3",
                  transformStyle: "preserve-3d",
                  transform: flipped.includes(1) ? "rotateY(0deg)" : "rotateY(180deg)",
                }}
              >
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center p-2 rounded-lg"
                  style={{
                    backfaceVisibility: "hidden",
                    background: "linear-gradient(145deg, rgba(26,39,72,0.92), rgba(12,18,37,0.97))",
                    border: "1px solid rgba(212,165,74,0.25)",
                    boxShadow: flipped.includes(1) ? "0 0 20px rgba(212,165,74,0.12)" : "none",
                  }}
                >
                  <div className="text-xl mb-1" style={{ transform: `rotate(-90deg) ${cards[1].isReversed ? "rotate(180deg)" : ""}` }}>
                    {cards[1].symbol}
                  </div>
                  <div className="text-[9px] text-center leading-tight" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)", transform: "rotate(-90deg)" }}>
                    {cards[1].name}
                  </div>
                </div>
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
                  <div className="text-xl" style={{ color: "var(--text-accent)", opacity: 0.5, transform: "rotate(-90deg)" }}>☽</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Card 5 — Near Future (right) */}
        <div className="absolute" style={{ right: "0", top: "50%", transform: "translateY(-50%)" }}>
          <TarotCard card={cards[5]} index={5} label={labels[5]} isFlipped={flipped.includes(5)} onFlip={onFlip} delay={0.6} size="small" />
        </div>

        {/* Card 2 — Foundation (bottom center) */}
        <div className="absolute" style={{ left: "50%", bottom: "0", transform: "translateX(-50%)" }}>
          <TarotCard card={cards[2]} index={2} label={labels[2]} isFlipped={flipped.includes(2)} onFlip={onFlip} delay={0.3} size="small" />
        </div>
      </div>

      {/* Staff — right column */}
      <div className="flex flex-col-reverse gap-2 items-center">
        {[6, 7, 8, 9].map((idx, i) => (
          <TarotCard
            key={idx}
            card={cards[idx]}
            index={idx}
            label={labels[idx]}
            isFlipped={flipped.includes(idx)}
            onFlip={onFlip}
            delay={0.7 + i * 0.1}
            size="small"
          />
        ))}
      </div>
    </div>
  );
}

// ─── Linear layout for simple spreads ──────────────────────
function LinearLayout({
  cards,
  spread,
  flipped,
  onFlip,
}: {
  cards: DrawnCard[];
  spread: string;
  flipped: number[];
  onFlip: (i: number) => void;
}) {
  return (
    <div className="flex justify-center gap-3 sm:gap-4 flex-wrap mb-8" style={{ perspective: "1000px" }}>
      {cards.map((card, i) => (
        <TarotCard
          key={i}
          card={card}
          index={i}
          label={SPREAD_LABELS[spread]?.[i] || ""}
          isFlipped={flipped.includes(i)}
          onFlip={onFlip}
          delay={i * 0.12}
        />
      ))}
    </div>
  );
}

// ─── Celtic Cross info block ───────────────────────────────
const CELTIC_DESCRIPTIONS: Record<number, string> = {
  0: "The heart of the matter. This card represents your current situation — the central energy surrounding your question right now.",
  1: "What crosses you. This is the immediate challenge, obstacle, or opposing force. It may be internal or external, but it demands your attention.",
  2: "The foundation beneath you. This is the root cause, the deeper origin of the situation. It may be something from your past that set this in motion.",
  3: "The recent past. Energy that is fading but still influencing you. What you are leaving behind or what has just occurred.",
  4: "What crowns you — your higher purpose or best possible outcome. The energy you are being called to embody, even if it feels unreachable.",
  5: "The near future. What is approaching. This is not fixed destiny — it is the most likely next development based on current energy.",
  6: "Your attitude. How you see yourself in this situation. Your inner posture — conscious or unconscious — shapes everything that follows.",
  7: "Your environment. External influences — other people, circumstances, and energies affecting the situation that may be outside your control.",
  8: "Your hopes and fears. Often the same thing. What you most desire and most dread about this situation. This card reveals your emotional stake.",
  9: "The outcome. Where this trajectory leads if things continue as they are. Not a fixed fate — a probable destination that you can still influence.",
};

// ─── Main page ─────────────────────────────────────────────
export default function TarotPage() {
  const [drawn, setDrawn] = useState<DrawnCard[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [spread, setSpread] = useState("single");
  const [isDrawing, setIsDrawing] = useState(false);
  const [question, setQuestion] = useState("");
  const oracle = useOracle();

  const spreadCounts: Record<string, number> = { single: 1, three: 3, five: 5, celtic: 10 };

  const drawCards = () => {
    setIsDrawing(true);
    setFlipped([]);
    oracle.reset();
    const count = spreadCounts[spread] || 1;
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

  // Auto-request AI reading when all cards are flipped
  const allFlipped = drawn.length > 0 && flipped.length === drawn.length;

  useEffect(() => {
    if (allFlipped && !oracle.result && !oracle.loading) {
      const labels = SPREAD_LABELS[spread] || [];
      oracle.ask({
        type: "tarot",
        question,
        spreadType: spread,
        cards: drawn.map((c, i) => ({
          name: c.name,
          numeral: c.numeral,
          isReversed: c.isReversed,
          position: labels[i] || `Card ${i + 1}`,
        })),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFlipped]);

  return (
    <PageWrapper>
      <PageHeader icon="✦" title="Tarot" subtitle="What does the universe want you to see right now?" />
      <CosmicDivider />

      {/* Question input */}
      <div className="max-w-md mx-auto mb-6">
        <label className="label-text">Your Question <span style={{ opacity: 0.5 }}>(optional)</span></label>
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="What do I need to see about...?"
          className="oracle-input"
          style={{ fontStyle: "italic" }}
        />
      </div>

      {/* Spread selector */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {([
          ["single", "Single"],
          ["three", "Three Cards"],
          ["five", "Five Cards"],
          ["celtic", "Celtic Cross"],
        ] as const).map(([val, label]) => (
          <button
            key={val}
            onClick={() => { setSpread(val); setDrawn([]); setFlipped([]); }}
            className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition-all duration-300"
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

      {/* Celtic Cross intro */}
      {spread === "celtic" && drawn.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-4 mb-6 max-w-md mx-auto">
          <p className="text-xs leading-relaxed text-center" style={{ color: "var(--text-secondary)" }}>
            The Celtic Cross is the most complete spread in tarot — 10 cards that map your situation, challenges,
            subconscious influences, and probable outcome. Focus on a specific question or situation before drawing.
          </p>
        </motion.div>
      )}

      <div className="text-center mb-8">
        <button onClick={drawCards} disabled={isDrawing} className="oracle-btn">
          {isDrawing ? "Shuffling..." : drawn.length ? "Draw Again" : "Draw Cards"}
        </button>
      </div>

      {/* Card layout */}
      <AnimatePresence mode="wait">
        {drawn.length > 0 && (
          <motion.div
            key={drawn.map(c => c.name).join(",") + spread}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {spread === "celtic" ? (
              <CelticCrossLayout cards={drawn} flipped={flipped} onFlip={flipCard} />
            ) : (
              <LinearLayout cards={drawn} spread={spread} flipped={flipped} onFlip={flipCard} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Challenge label for crossed card */}
      {spread === "celtic" && drawn.length > 0 && flipped.includes(1) && (
        <div className="text-center -mt-4 mb-4">
          <span className="text-[9px] tracking-[1.5px] uppercase px-2 py-1 rounded" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)", background: "rgba(12,18,37,0.6)" }}>
            ↑ Challenge (crossing)
          </span>
        </div>
      )}

      {/* Readings */}
      {drawn.length > 0 && flipped.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <CosmicDivider />
          <div className="max-w-xl mx-auto space-y-4">
            {drawn.map((card, i) => {
              if (!flipped.includes(i)) return null;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * flipped.indexOf(i) }}
                  className="glass p-5"
                >
                  {/* Position label */}
                  <div className="text-[10px] tracking-[2px] uppercase mb-2" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}>
                    {spread === "celtic" ? `Position ${i + 1}: ` : ""}{SPREAD_LABELS[spread]?.[i]}
                  </div>

                  {/* Card name */}
                  <div className="text-base mb-2" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>
                    {card.numeral} · {card.name} {card.isReversed ? "(Reversed)" : ""}
                  </div>

                  {/* Card meaning */}
                  <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--text-secondary)" }}>
                    {card.isReversed ? card.reversed : card.meaning}
                  </p>

                  {/* Celtic Cross positional meaning */}
                  {spread === "celtic" && CELTIC_DESCRIPTIONS[i] && (
                    <p className="text-xs leading-relaxed italic pt-2" style={{ color: "var(--text-muted)", borderTop: "1px solid var(--border-subtle)" }}>
                      {CELTIC_DESCRIPTIONS[i]}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* AI Oracle interpretation */}
      {allFlipped && (
        <div className="max-w-xl mx-auto mt-6">
          <OracleReading content={oracle.result} loading={oracle.loading} error={oracle.error} />
        </div>
      )}

      {drawn.length > 0 && flipped.length < drawn.length && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-xs italic mt-4"
          style={{ color: "var(--text-muted)" }}
        >
          Tap each card to reveal its message
        </motion.p>
      )}
    </PageWrapper>
  );
}
