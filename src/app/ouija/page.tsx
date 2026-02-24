"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper, PageHeader, CosmicDivider } from "@/components/ui";
import { getOuijaResponse, type OuijaAnswer } from "@/lib/ouija-data";

interface SessionEntry { q: string; answer: OuijaAnswer; whisper: string; }

export default function OuijaPage() {
  const [question, setQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState<OuijaAnswer | null>(null);
  const [currentWhisper, setCurrentWhisper] = useState("");
  const [isChanneling, setIsChanneling] = useState(false);
  const [planchTarget, setPlanchTarget] = useState<"center" | "yes" | "no" | "uncertain">("center");
  const [sessionLog, setSessionLog] = useState<SessionEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const channel = async () => {
    if (!question.trim() || isChanneling) return;
    setIsChanneling(true);
    setCurrentAnswer(null);
    setCurrentWhisper("");
    inputRef.current?.blur();

    // Try AI first, fall back to static
    let response: { answer: OuijaAnswer; whisper: string };
    try {
      const res = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "ouija", question }),
      });
      if (res.ok) {
        const data = await res.json();
        const r = typeof data.result === "string" ? JSON.parse(data.result) : data.result;
        if (r && r.answer && r.whisper) {
          response = r;
        } else {
          response = getOuijaResponse();
        }
      } else {
        response = getOuijaResponse();
      }
    } catch {
      response = getOuijaResponse();
    }

    // Dramatic planchette wandering before answer
    const sequence = ["yes", "no", "uncertain", "yes", "no"] as const;
    let step = 0;

    const wander = () => {
      if (step < sequence.length) {
        setPlanchTarget(sequence[step]);
        step++;
        setTimeout(wander, 400 + Math.random() * 300);
      } else {
        // Final answer
        const targetMap: Record<OuijaAnswer, typeof planchTarget> = { YES: "yes", NO: "no", UNCERTAIN: "uncertain" };
        setPlanchTarget(targetMap[response.answer]);
        setTimeout(() => {
          setCurrentAnswer(response.answer);
          setTimeout(() => {
            setCurrentWhisper(response.whisper);
            setIsChanneling(false);
            setSessionLog(prev => [...prev, { q: question, answer: response.answer, whisper: response.whisper }]);
            setQuestion("");
          }, 600);
        }, 800);
      }
    };

    setTimeout(wander, 600);
  };

  const planchPositions = {
    center: { left: "50%", top: "50%" },
    yes: { left: "25%", top: "28%" },
    no: { left: "75%", top: "28%" },
    uncertain: { left: "50%", top: "72%" },
  };

  const answerColors: Record<OuijaAnswer, string> = {
    YES: "var(--aurora)",
    NO: "var(--nebula-pink)",
    UNCERTAIN: "var(--text-accent)",
  };

  return (
    <PageWrapper>
      <PageHeader icon="◎" title="Ouija" subtitle="Ask a yes-or-no question. The board will answer." />
      <CosmicDivider />

      {/* The Board */}
      <div
        className="relative overflow-hidden rounded-2xl mb-6 mx-auto max-w-md"
        style={{
          background: "linear-gradient(145deg, rgba(26,39,72,0.6), rgba(12,18,37,0.8))",
          border: "1px solid var(--border-subtle)",
          padding: "clamp(24px, 6vw, 48px) clamp(20px, 5vw, 40px)",
          backdropFilter: "blur(12px)",
          minHeight: "280px",
        }}
      >
        {/* Corner moons */}
        <div className="absolute top-3 left-4 text-sm opacity-20" style={{ color: "var(--moon)" }}>☽</div>
        <div className="absolute top-3 right-4 text-sm opacity-20" style={{ color: "var(--moon)" }}>☾</div>

        {/* YES / NO */}
        <div className="flex justify-between mb-12 px-2">
          <div className="text-center">
            <div
              className="text-2xl sm:text-3xl tracking-wide"
              style={{
                fontFamily: "'Philosopher', serif",
                color: currentAnswer === "YES" ? "var(--aurora)" : "var(--text-secondary)",
                textShadow: currentAnswer === "YES" ? "0 0 20px rgba(74,138,122,0.5)" : "none",
                transition: "all 0.6s ease",
              }}
            >
              YES
            </div>
          </div>
          <div className="text-center">
            <div
              className="text-2xl sm:text-3xl tracking-wide"
              style={{
                fontFamily: "'Philosopher', serif",
                color: currentAnswer === "NO" ? "var(--nebula-pink)" : "var(--text-secondary)",
                textShadow: currentAnswer === "NO" ? "0 0 20px rgba(123,74,110,0.5)" : "none",
                transition: "all 0.6s ease",
              }}
            >
              NO
            </div>
          </div>
        </div>

        {/* Center symbol */}
        <div className="flex justify-center mb-12">
          <div className="text-3xl opacity-20" style={{ color: "var(--moon)" }}>✦</div>
        </div>

        {/* UNCERTAIN */}
        <div className="text-center">
          <div
            className="text-base tracking-[4px] uppercase"
            style={{
              fontFamily: "'Philosopher', serif",
              color: currentAnswer === "UNCERTAIN" ? "var(--text-accent)" : "var(--text-muted)",
              textShadow: currentAnswer === "UNCERTAIN" ? "0 0 16px rgba(212,165,74,0.4)" : "none",
              transition: "all 0.6s ease",
            }}
          >
            Uncertain
          </div>
        </div>

        {/* Planchette */}
        {(isChanneling || currentAnswer) && (
          <div
            className="absolute pointer-events-none"
            style={{
              ...planchPositions[planchTarget],
              transform: "translate(-50%, -50%)",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "2px solid rgba(212,165,74,0.5)",
              background: "rgba(212,165,74,0.08)",
              boxShadow: "0 0 16px rgba(212,165,74,0.2)",
              transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
              animation: isChanneling ? "planchetteDrift 1.5s ease-in-out infinite" : "none",
            }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "rgba(212,165,74,0.6)" }} />
          </div>
        )}
      </div>

      {/* Answer + Whisper */}
      <AnimatePresence>
        {currentAnswer && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center mb-6">
            <div
              className="text-3xl sm:text-4xl tracking-wide mb-3"
              style={{
                fontFamily: "'Philosopher', serif",
                color: answerColors[currentAnswer],
                textShadow: `0 0 20px ${answerColors[currentAnswer]}40`,
              }}
            >
              {currentAnswer}
            </div>
            {currentWhisper && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm italic max-w-xs mx-auto leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                &ldquo;{currentWhisper}&rdquo;
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question Input */}
      <div className="max-w-md mx-auto mb-8">
        <label className="label-text">Your Question</label>
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
          Frame it as a yes or no question. Be honest with yourself.
        </p>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Should I...? Is it...? Will I...?"
            disabled={isChanneling}
            onKeyDown={e => e.key === "Enter" && channel()}
            className="oracle-input flex-1"
            style={{ fontStyle: "italic" }}
          />
          <button onClick={channel} disabled={isChanneling || !question.trim()} className="oracle-btn !px-5 whitespace-nowrap text-xs">
            {isChanneling ? "..." : "Ask"}
          </button>
        </div>
      </div>

      {/* Session Log */}
      {sessionLog.length > 0 && (
        <>
          <CosmicDivider />
          <h3 className="text-xs tracking-[3px] text-center mb-4 uppercase" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}>
            This Session
          </h3>
          <div className="max-w-md mx-auto space-y-3">
            {sessionLog.map((entry, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass p-4">
                <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>{entry.q}</div>
                <div className="flex items-baseline gap-3">
                  <span className="text-lg tracking-wide" style={{ fontFamily: "'Philosopher', serif", color: answerColors[entry.answer] }}>
                    {entry.answer}
                  </span>
                  <span className="text-xs italic" style={{ color: "var(--text-secondary)" }}>
                    {entry.whisper}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </PageWrapper>
  );
}
