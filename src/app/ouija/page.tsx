"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper, PageHeader, OrnamentalDivider } from "@/components/ui";
import { OUIJA_RESPONSES } from "@/lib/ouija-data";

interface SessionEntry {
  q: string;
  a: string;
}

export default function OuijaPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isChanneling, setIsChanneling] = useState(false);
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [planchPos, setPlanchPos] = useState({ x: 50, y: 50 });
  const [sessionLog, setSessionLog] = useState<SessionEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const channel = () => {
    if (!question.trim() || isChanneling) return;
    setIsChanneling(true);
    setDisplayedAnswer("");
    setAnswer("");

    // Blur input on mobile to dismiss keyboard
    inputRef.current?.blur();

    const response = OUIJA_RESPONSES[Math.floor(Math.random() * OUIJA_RESPONSES.length)];

    let idx = 0;
    const revealChar = () => {
      if (idx < response.length) {
        const char = response[idx];
        setDisplayedAnswer(prev => prev + char);

        if (char !== " ") {
          const letterIdx = alphabet.indexOf(char);
          if (letterIdx >= 0) {
            const col = letterIdx % 9;
            const row = Math.floor(letterIdx / 9);
            setPlanchPos({ x: 12 + col * 9, y: 30 + row * 20 });
          }
        }

        idx++;
        setTimeout(revealChar, 180 + Math.random() * 280);
      } else {
        setAnswer(response);
        setIsChanneling(false);
        setSessionLog(prev => [...prev, { q: question, a: response }]);
        setQuestion("");
        setPlanchPos({ x: 50, y: 50 });
      }
    };

    setTimeout(revealChar, 1000);
  };

  return (
    <PageWrapper>
      <PageHeader icon="◎" title="Spirit Board" subtitle="Commune With the Other Side" />
      <OrnamentalDivider />

      {/* The Board */}
      <div
        className="relative overflow-hidden rounded-lg mb-6 mx-auto max-w-lg"
        style={{
          background: "linear-gradient(145deg, #2a2118, #1a1410)",
          border: "2px solid rgba(201,168,76,0.3)",
          padding: "clamp(20px, 5vw, 40px)",
          boxShadow: "0 0 40px rgba(0,0,0,0.5), inset 0 0 40px rgba(0,0,0,0.3)",
        }}
      >
        {/* Corner ornaments */}
        <div className="absolute top-2 left-3 text-lg opacity-30" style={{ color: "var(--gold)" }}>☽</div>
        <div className="absolute top-2 right-3 text-lg opacity-30" style={{ color: "var(--gold)" }}>☀</div>
        <div className="absolute bottom-2 left-3 text-base opacity-30" style={{ color: "var(--gold)" }}>✦</div>
        <div className="absolute bottom-2 right-3 text-base opacity-30" style={{ color: "var(--gold)" }}>✧</div>

        {/* YES / NO */}
        <div className="flex justify-between mb-5 px-4">
          <span className="text-lg sm:text-xl tracking-[4px]" style={{ fontFamily: "'Cinzel Decorative', serif", color: "var(--gold)" }}>
            YES
          </span>
          <span className="text-lg sm:text-xl tracking-[4px]" style={{ fontFamily: "'Cinzel Decorative', serif", color: "var(--gold)" }}>
            NO
          </span>
        </div>

        {/* Alphabet grid */}
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 max-w-[360px] mx-auto mb-4">
          {alphabet.map(letter => {
            const isActive = isChanneling && displayedAnswer.endsWith(letter);
            return (
              <span
                key={letter}
                className="w-7 text-center transition-all duration-300"
                style={{
                  fontFamily: "'MedievalSharp', serif",
                  fontSize: "clamp(18px, 5vw, 26px)",
                  color: isActive ? "var(--gold-bright)" : "var(--bone)",
                  textShadow: isActive ? "0 0 15px rgba(201,168,76,0.8)" : "none",
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>

        {/* Numbers */}
        <div className="flex justify-center gap-3 mb-4">
          {"1234567890".split("").map(n => (
            <span key={n} className="text-sm sm:text-base" style={{ fontFamily: "'MedievalSharp', serif", color: "var(--bone-dim)" }}>
              {n}
            </span>
          ))}
        </div>

        {/* GOODBYE */}
        <div className="text-center">
          <span className="text-sm sm:text-base tracking-[6px]" style={{ fontFamily: "'Cinzel Decorative', serif", color: "var(--gold-dim)" }}>
            GOODBYE
          </span>
        </div>

        {/* Planchette */}
        {isChanneling && (
          <div
            className="absolute pointer-events-none transition-all duration-[800ms]"
            style={{
              left: `${planchPos.x}%`,
              top: `${planchPos.y}%`,
              transform: "translate(-50%, -50%)",
              width: "36px",
              height: "36px",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              border: "2px solid var(--gold)",
              background: "rgba(201,168,76,0.1)",
              boxShadow: "0 0 20px rgba(201,168,76,0.3)",
              animation: "planchetteDrift 2s ease-in-out infinite",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{ background: "rgba(201,168,76,0.5)" }}
            />
          </div>
        )}
      </div>

      {/* Spirit Message */}
      <AnimatePresence>
        {(isChanneling || answer) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center mb-6"
          >
            <div
              className="text-[10px] tracking-[3px] uppercase mb-2"
              style={{ fontFamily: "'Cinzel', serif", color: "var(--gold-dim)" }}
            >
              {isChanneling ? "The spirits speak..." : "The spirits have spoken"}
            </div>
            <div
              className="text-2xl sm:text-3xl tracking-[4px] min-h-[40px]"
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                color: "var(--gold)",
                animation: isChanneling ? "spiritGlow 2s ease-in-out infinite" : "none",
                textShadow: "0 0 20px rgba(201,168,76,0.4)",
              }}
            >
              {displayedAnswer || answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question Input */}
      <div className="max-w-md mx-auto mb-8">
        <label className="label-text">Ask the Spirits</label>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Speak your question into the void..."
            disabled={isChanneling}
            onKeyDown={e => e.key === "Enter" && channel()}
            className="oracle-input flex-1 italic"
          />
          <button
            onClick={channel}
            disabled={isChanneling || !question.trim()}
            className="oracle-btn !px-5 whitespace-nowrap text-xs"
          >
            {isChanneling ? "..." : "Ask"}
          </button>
        </div>
      </div>

      {/* Session Log */}
      {sessionLog.length > 0 && (
        <>
          <OrnamentalDivider />
          <h3
            className="text-xs tracking-[3px] text-center mb-4 uppercase"
            style={{ fontFamily: "'Cinzel', serif", color: "var(--gold-dim)" }}
          >
            Session Transcript
          </h3>
          <div className="max-w-md mx-auto space-y-3">
            {sessionLog.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-sm"
                style={{ background: "rgba(26,20,16,0.5)", border: "1px solid rgba(201,168,76,0.08)" }}
              >
                <div className="text-xs mb-2" style={{ color: "var(--bone-dim)" }}>
                  <span className="text-[10px] tracking-[1px]" style={{ fontFamily: "'Cinzel', serif", color: "var(--gold-dim)" }}>Q: </span>
                  {entry.q}
                </div>
                <div className="text-lg tracking-[2px]" style={{ fontFamily: "'Cinzel Decorative', serif", color: "var(--gold)" }}>
                  {entry.a}
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </PageWrapper>
  );
}
