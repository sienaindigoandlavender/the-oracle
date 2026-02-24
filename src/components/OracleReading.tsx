"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export function OracleReading({ content, loading, error }: { content: string | null; loading: boolean; error: string | null }) {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass p-8 text-center"
      >
        <div className="text-2xl mb-3" style={{ animation: "float 2s ease-in-out infinite" }}>☽</div>
        <p className="text-xs tracking-[3px] uppercase" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)", animation: "glowPulse 2s ease-in-out infinite" }}>
          The oracle is reading...
        </p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <div className="glass p-5">
        <p className="text-sm" style={{ color: "var(--nebula-pink)" }}>
          {error.includes("ANTHROPIC_API_KEY") 
            ? "To enable AI-powered readings, add your Anthropic API key to .env.local — see the README for setup instructions."
            : `The oracle is momentarily veiled: ${error}`}
        </p>
      </div>
    );
  }

  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 sm:p-8"
    >
      <div className="text-[10px] tracking-[2px] uppercase mb-4 flex items-center gap-2" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>
        <span>✦</span> The Oracle Speaks
      </div>
      <div className="oracle-prose">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </motion.div>
  );
}

export function OracleButton({ onClick, loading, label, loadingLabel }: { onClick: () => void; loading: boolean; label: string; loadingLabel?: string }) {
  return (
    <button onClick={onClick} disabled={loading} className="oracle-btn">
      {loading ? (loadingLabel || "Channeling...") : label}
    </button>
  );
}
