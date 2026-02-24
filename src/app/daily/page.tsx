"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageWrapper, PageHeader, CosmicDivider } from "@/components/ui";
import { MAJOR_ARCANA } from "@/lib/tarot-data";
import { getRandomPrompt } from "@/lib/journal-prompts";

function getMoonPhase(): { name: string; symbol: string; guidance: string } {
  // Approximate moon phase calculation
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const c = Math.floor(365.25 * year);
  const e = Math.floor(30.6 * month);
  const jd = c + e + day - 694039.09;
  const phase = jd / 29.5305882;
  const age = (phase - Math.floor(phase)) * 29.5305882;

  if (age < 1.85) return { name: "New Moon", symbol: "🌑", guidance: "Set intentions. Plant seeds in the dark. What do you want to call in?" };
  if (age < 5.55) return { name: "Waxing Crescent", symbol: "🌒", guidance: "The seed cracks open. Take the first small action toward your intention." };
  if (age < 9.25) return { name: "First Quarter", symbol: "🌓", guidance: "Resistance appears. Push through. This is where commitment is tested." };
  if (age < 12.95) return { name: "Waxing Gibbous", symbol: "🌔", guidance: "Refine. Adjust. The vision is becoming clearer. Trust what's emerging." };
  if (age < 16.65) return { name: "Full Moon", symbol: "🌕", guidance: "Illumination. Everything is visible. Release what no longer serves you." };
  if (age < 20.35) return { name: "Waning Gibbous", symbol: "🌖", guidance: "Gratitude and sharing. Distribute what you've harvested. Teach what you've learned." };
  if (age < 24.05) return { name: "Last Quarter", symbol: "🌗", guidance: "Let go. Forgive. Clear space for what comes next." };
  if (age < 27.75) return { name: "Waning Crescent", symbol: "🌘", guidance: "Rest. Surrender. Be still. The next cycle is preparing itself in the dark." };
  return { name: "New Moon", symbol: "🌑", guidance: "Set intentions. Plant seeds in the dark. What do you want to call in?" };
}

function getDailyCard(date: string) {
  // Deterministic "random" based on date — same card each day
  const seed = date.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const index = seed % MAJOR_ARCANA.length;
  const isReversed = (seed * 13) % 10 > 6;
  return { ...MAJOR_ARCANA[index], isReversed };
}

function getDailyPrompt(date: string) {
  const seed = date.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  // Use seed to pick a deterministic prompt
  const allPrompts = Array.from({ length: 20 }, (_, i) => getRandomPrompt(undefined));
  return allPrompts[seed % allPrompts.length];
}

export default function DailyOraclePage() {
  const [date] = useState(new Date().toISOString().slice(0, 10));
  const [cardFlipped, setCardFlipped] = useState(false);
  const [journalText, setJournalText] = useState("");
  const [journalSaved, setJournalSaved] = useState(false);

  const moon = getMoonPhase();
  const card = getDailyCard(date);
  const prompt = getDailyPrompt(date);

  // Check if already journaled today
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`oracle-daily-${date}`);
      if (saved) { setJournalText(saved); setJournalSaved(true); }
    } catch { /* empty */ }
  }, [date]);

  const saveJournal = () => {
    if (!journalText.trim()) return;
    try { localStorage.setItem(`oracle-daily-${date}`, journalText); } catch { /* empty */ }
    setJournalSaved(true);
  };

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <PageWrapper>
      <PageHeader icon="⊛" title="Daily Oracle" subtitle={today} />
      <CosmicDivider />

      <div className="max-w-md mx-auto space-y-6">
        {/* Moon Phase */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass p-5 text-center">
          <div className="text-4xl mb-2">{moon.symbol}</div>
          <div className="text-sm tracking-wide mb-2" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>
            {moon.name}
          </div>
          <p className="text-xs leading-relaxed italic" style={{ color: "var(--text-secondary)" }}>
            {moon.guidance}
          </p>
        </motion.div>

        {/* Daily Card */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="text-[10px] tracking-[2px] uppercase text-center mb-3" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}>
            Your Card Today
          </div>

          <div className="flex justify-center mb-4">
            <div onClick={() => setCardFlipped(true)} className="cursor-pointer" style={{ width: "120px" }}>
              <div className="w-full rounded-xl transition-transform duration-700 relative"
                style={{ aspectRatio: "2/3", transformStyle: "preserve-3d", transform: cardFlipped ? "rotateY(0deg)" : "rotateY(180deg)" }}>
                {/* Front */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-3 rounded-xl"
                  style={{ backfaceVisibility: "hidden", background: "linear-gradient(145deg, rgba(26,39,72,0.9), rgba(12,18,37,0.95))", border: "1px solid rgba(212,165,74,0.2)", boxShadow: cardFlipped ? "0 0 24px rgba(212,165,74,0.15)" : "none" }}>
                  <div className="text-3xl mb-2" style={{ transform: card.isReversed ? "rotate(180deg)" : "none" }}>{card.symbol}</div>
                  <div className="text-xs text-center leading-tight" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>{card.name}</div>
                  <div className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>{card.numeral}</div>
                  {card.isReversed && <div className="text-[8px] mt-1 tracking-[1px]" style={{ color: "var(--nebula-pink)" }}>REVERSED</div>}
                </div>
                {/* Back */}
                <div className="absolute inset-0 flex items-center justify-center rounded-xl"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(145deg, var(--midnight), var(--deep))", border: "1px solid rgba(212,165,74,0.15)", animation: "glowPulse 3s ease-in-out infinite" }}>
                  <div className="text-2xl" style={{ color: "var(--text-accent)", opacity: 0.5 }}>☽</div>
                </div>
              </div>
            </div>
          </div>

          {!cardFlipped && (
            <p className="text-xs text-center italic" style={{ color: "var(--text-muted)" }}>Tap to reveal</p>
          )}

          {cardFlipped && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-4 text-center">
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {card.isReversed ? card.reversed : card.meaning}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Daily Prompt */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="text-[10px] tracking-[2px] uppercase text-center mb-3" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}>
            Today&apos;s Reflection
          </div>
          <div className="glass p-5">
            <p className="text-sm leading-relaxed italic text-center mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--text-primary)", fontSize: "16px" }}>
              &ldquo;{prompt.text}&rdquo;
            </p>

            {!journalSaved ? (
              <>
                <textarea value={journalText} onChange={e => setJournalText(e.target.value)}
                  placeholder="Write here..."
                  className="oracle-textarea" rows={4} />
                <button onClick={saveJournal} disabled={!journalText.trim()} className="oracle-btn w-full mt-3 text-xs">
                  Save Today&apos;s Reflection
                </button>
              </>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-2">
                <div className="text-lg mb-1">☽</div>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Today&apos;s reflection saved. Come back tomorrow.</p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Daily mantra */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-center py-4">
          <p className="text-xs tracking-[3px] uppercase" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)", opacity: 0.6 }}>
            as within, so without
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
