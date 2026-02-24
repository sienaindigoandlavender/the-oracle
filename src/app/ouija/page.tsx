"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper, PageHeader, CosmicDivider } from "@/components/ui";
import { getOuijaResponse } from "@/lib/ouija-data";
import ReactMarkdown from "react-markdown";

interface SessionEntry { q: string; message: string; }

const BOARD_ROWS = [
  "ABCDEFGHIJKLM".split(""),
  "NOPQRSTUVWXYZ".split(""),
];
const NUMBERS = "1234567890".split("");

export default function OuijaPage() {
  const [question, setQuestion] = useState("");
  const [spiritMessage, setSpiritMessage] = useState("");
  const [revealedChars, setRevealedChars] = useState(0);
  const [isChanneling, setIsChanneling] = useState(false);
  const [activeChar, setActiveChar] = useState<string | null>(null);
  const [sessionLog, setSessionLog] = useState<SessionEntry[]>([]);
  const [fullReading, setFullReading] = useState<string | null>(null);
  const [readingLoading, setReadingLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Letter-by-letter reveal animation
  useEffect(() => {
    if (!spiritMessage || revealedChars >= spiritMessage.length || !isChanneling) return;

    const char = spiritMessage[revealedChars].toUpperCase();
    setActiveChar(char === " " ? null : char);

    const delay = char === " " ? 300 : 120 + Math.random() * 180;
    const timer = setTimeout(() => {
      setRevealedChars(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [spiritMessage, revealedChars, isChanneling]);

  // When reveal completes
  useEffect(() => {
    if (spiritMessage && revealedChars >= spiritMessage.length && isChanneling) {
      setTimeout(() => {
        setActiveChar(null);
        setIsChanneling(false);
        setSessionLog(prev => [...prev, { q: question, message: spiritMessage }]);
        setQuestion("");
      }, 600);
    }
  }, [revealedChars, spiritMessage, isChanneling, question]);

  const channel = async () => {
    if (!question.trim() || isChanneling) return;
    setIsChanneling(true);
    setSpiritMessage("");
    setRevealedChars(0);
    setActiveChar(null);
    setFullReading(null);
    inputRef.current?.blur();

    // Try AI, fall back to static short response
    let message = "";
    try {
      const res = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "ouija", question }),
      });
      if (res.ok) {
        const data = await res.json();
        const r = typeof data.result === "string" ? (() => { try { return JSON.parse(data.result); } catch { return null; } })() : data.result;
        if (r && r.message) {
          message = r.message;
          if (r.reading) setFullReading(r.reading);
        } else if (r && r.whisper) {
          message = r.whisper;
        }
      }
    } catch { /* fall through */ }

    if (!message) {
      const fallback = getOuijaResponse();
      message = fallback.whisper;
    }

    // Start the reveal
    setSpiritMessage(message);
  };

  const revealedText = spiritMessage.slice(0, revealedChars);

  return (
    <PageWrapper>
      <PageHeader icon="◎" title="Spirit Board" subtitle="Ask anything. The spirits will answer." />
      <CosmicDivider />

      {/* The Board */}
      <div
        className="relative overflow-hidden rounded-2xl mb-6 mx-auto max-w-lg"
        style={{
          background: "linear-gradient(145deg, rgba(26,39,72,0.6), rgba(12,18,37,0.8))",
          border: "1px solid var(--border-subtle)",
          padding: "clamp(20px, 5vw, 40px) clamp(16px, 4vw, 32px)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Corner decorations */}
        <div className="absolute top-3 left-4 text-sm opacity-20" style={{ color: "var(--moon)" }}>☽</div>
        <div className="absolute top-3 right-4 text-sm opacity-20" style={{ color: "var(--moon)" }}>☾</div>

        {/* YES / NO */}
        <div className="flex justify-between mb-6 px-4">
          <span className="text-lg sm:text-xl tracking-wide" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-secondary)", opacity: 0.5 }}>YES</span>
          <span className="text-lg sm:text-xl tracking-wide" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-secondary)", opacity: 0.5 }}>NO</span>
        </div>

        {/* Alphabet rows */}
        <div className="space-y-2 mb-4">
          {BOARD_ROWS.map((row, ri) => (
            <div key={ri} className="flex justify-center gap-1.5 sm:gap-2.5 flex-wrap">
              {row.map(letter => {
                const isActive = activeChar === letter;
                return (
                  <span
                    key={letter}
                    className="text-lg sm:text-2xl transition-all duration-200"
                    style={{
                      fontFamily: "'Philosopher', serif",
                      color: isActive ? "var(--text-accent)" : "var(--text-secondary)",
                      textShadow: isActive ? "0 0 16px rgba(212,165,74,0.6), 0 0 32px rgba(212,165,74,0.3)" : "none",
                      transform: isActive ? "scale(1.3)" : "scale(1)",
                      opacity: isActive ? 1 : 0.4,
                    }}
                  >
                    {letter}
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        {/* Numbers */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-4">
          {NUMBERS.map(n => {
            const isActive = activeChar === n;
            return (
              <span
                key={n}
                className="text-sm sm:text-lg transition-all duration-200"
                style={{
                  fontFamily: "'Philosopher', serif",
                  color: isActive ? "var(--text-accent)" : "var(--text-muted)",
                  textShadow: isActive ? "0 0 12px rgba(212,165,74,0.5)" : "none",
                  opacity: isActive ? 1 : 0.3,
                }}
              >
                {n}
              </span>
            );
          })}
        </div>

        {/* GOODBYE */}
        <div className="text-center">
          <span className="text-sm tracking-[4px] uppercase" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)", opacity: 0.3 }}>
            GOODBYE
          </span>
        </div>
      </div>

      {/* Spirit message reveal */}
      <AnimatePresence>
        {spiritMessage && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center mb-6 max-w-md mx-auto"
          >
            <div
              className="glass p-6"
              style={{ minHeight: "80px" }}
            >
              <div className="text-[10px] tracking-[2px] uppercase mb-3" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}>
                The spirits speak
              </div>
              <p
                className="text-lg sm:text-xl leading-relaxed italic"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "var(--text-primary)",
                  fontWeight: 500,
                  textShadow: isChanneling ? "0 0 8px rgba(212,165,74,0.2)" : "none",
                }}
              >
                &ldquo;{revealedText}
                {isChanneling && <span className="animate-pulse" style={{ color: "var(--text-accent)" }}>▌</span>}
                {!isChanneling && "&rdquo;"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full AI reading (if available) */}
      <AnimatePresence>
        {fullReading && !isChanneling && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto mb-6"
          >
            <div className="glass p-6">
              <div className="oracle-prose">
                <ReactMarkdown>{fullReading}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading state while waiting for AI */}
      {isChanneling && !spiritMessage && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-6">
          <div className="text-2xl mb-2" style={{ animation: "float 2s ease-in-out infinite" }}>◎</div>
          <p className="text-xs tracking-[3px] uppercase" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}>
            The veil thins...
          </p>
        </motion.div>
      )}

      {/* Question Input */}
      <div className="max-w-md mx-auto mb-8">
        <label className="label-text">Ask the Spirits</label>
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
          Ask anything. The board will spell its answer.
        </p>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="What do the spirits want me to know about...?"
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
                <p className="text-sm italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--text-secondary)" }}>
                  &ldquo;{entry.message}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </PageWrapper>
  );
}
