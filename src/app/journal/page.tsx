"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper, PageHeader, CosmicDivider, InfoCard } from "@/components/ui";
import { OracleReading } from "@/components/OracleReading";
import { useOracle } from "@/lib/useOracle";
import { getRandomPrompt, THEMES, type JournalPrompt } from "@/lib/journal-prompts";

interface JournalEntry {
  id: string;
  prompt: string;
  theme: string;
  text: string;
  date: string;
  insight?: string;
}

export default function JournalPage() {
  const [currentPrompt, setCurrentPrompt] = useState<JournalPrompt | null>(null);
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>();
  const [showArchive, setShowArchive] = useState(false);
  const [saved, setSaved] = useState(false);
  const oracle = useOracle();

  // Load entries from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("oracle-journal");
      if (stored) setEntries(JSON.parse(stored));
    } catch { /* empty */ }
  }, []);

  const saveEntries = (updated: JournalEntry[]) => {
    setEntries(updated);
    try { localStorage.setItem("oracle-journal", JSON.stringify(updated)); } catch { /* empty */ }
  };

  const drawPrompt = () => {
    setCurrentPrompt(getRandomPrompt(selectedTheme));
    setEntry("");
    setSaved(false);
    oracle.reset();
  };

  const saveEntry = async () => {
    if (!currentPrompt || !entry.trim()) return;

    // Save immediately
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      prompt: currentPrompt.text,
      theme: currentPrompt.theme,
      text: entry.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    saveEntries([newEntry, ...entries]);
    setSaved(true);

    // Request AI insight
    const insight = await oracle.ask({
      type: "journal",
      entry: entry.trim(),
      prompt: currentPrompt.text,
    });

    // Update the saved entry with the insight
    if (insight) {
      const updated = [{ ...newEntry, insight }, ...entries.slice(0)];
      saveEntries(updated);
    }
  };

  const deleteEntry = (id: string) => {
    saveEntries(entries.filter(e => e.id !== id));
  };

  const themeIcons: Record<string, string> = {
    Identity: "◐", Shadow: "◑", Healing: "☽", Fear: "△",
    Power: "✦", Desire: "♡", Mirrors: "◈", Transformation: "⟳",
  };

  return (
    <PageWrapper>
      <PageHeader icon="◑" title="Shadow Journal" subtitle="The parts of you waiting in the dark" />
      <CosmicDivider />

      <InfoCard>
        Shadow work is the practice of meeting the parts of yourself you&apos;ve hidden, denied, or forgotten.
        These prompts are designed to bypass your defenses and reach the truth underneath.
        Write without editing. Let it be raw. No one will read this but you.
      </InfoCard>

      {/* Theme selector */}
      <div className="mb-6">
        <label className="label-text mb-3">Choose a theme, or let fate decide</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTheme(undefined)}
            className="px-3 py-1.5 rounded-lg text-xs transition-all duration-300"
            style={{
              background: !selectedTheme ? "rgba(212,165,74,0.12)" : "transparent",
              border: `1px solid ${!selectedTheme ? "rgba(212,165,74,0.3)" : "var(--border-subtle)"}`,
              color: !selectedTheme ? "var(--text-accent)" : "var(--text-muted)",
              fontFamily: "'Philosopher', serif",
            }}
          >
            ✦ All
          </button>
          {THEMES.map(theme => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              className="px-3 py-1.5 rounded-lg text-xs transition-all duration-300"
              style={{
                background: selectedTheme === theme ? "rgba(212,165,74,0.12)" : "transparent",
                border: `1px solid ${selectedTheme === theme ? "rgba(212,165,74,0.3)" : "var(--border-subtle)"}`,
                color: selectedTheme === theme ? "var(--text-accent)" : "var(--text-muted)",
                fontFamily: "'Philosopher', serif",
              }}
            >
              {themeIcons[theme] || "·"} {theme}
            </button>
          ))}
        </div>
      </div>

      {/* Draw prompt button */}
      <div className="text-center mb-6">
        <button onClick={drawPrompt} className="oracle-btn">
          {currentPrompt ? "Draw Another Prompt" : "Draw a Prompt"}
        </button>
      </div>

      {/* Current prompt + writing area */}
      <AnimatePresence mode="wait">
        {currentPrompt && (
          <motion.div
            key={currentPrompt.text}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-8"
          >
            {/* The prompt */}
            <div className="glass p-6 mb-4 text-center">
              <div className="text-[10px] tracking-[2px] uppercase mb-3" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}>
                {themeIcons[currentPrompt.theme]} {currentPrompt.theme}
              </div>
              <p
                className="text-lg sm:text-xl leading-relaxed mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--text-primary)", fontWeight: 500 }}
              >
                {currentPrompt.text}
              </p>
              {currentPrompt.followUp && (
                <p className="text-xs italic mt-3" style={{ color: "var(--text-muted)" }}>
                  {currentPrompt.followUp}
                </p>
              )}
            </div>

            {/* Writing area */}
            {!saved ? (
              <div>
                <textarea
                  value={entry}
                  onChange={e => setEntry(e.target.value)}
                  placeholder="Write freely. No one is watching..."
                  className="oracle-textarea mb-3"
                  rows={6}
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {entry.length > 0 ? `${entry.split(/\s+/).filter(Boolean).length} words` : ""}
                  </span>
                  <button
                    onClick={saveEntry}
                    disabled={!entry.trim()}
                    className="oracle-btn !py-3 !px-6 text-xs"
                  >
                    Save Entry
                  </button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-4"
              >
                <div className="text-center mb-4">
                  <div className="text-2xl mb-2">☽</div>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Saved. You showed up for yourself today.
                  </p>
                </div>
                {/* AI Insight */}
                <OracleReading content={oracle.result} loading={oracle.loading} error={oracle.error} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Archive toggle */}
      {entries.length > 0 && (
        <>
          <CosmicDivider />
          <button
            onClick={() => setShowArchive(!showArchive)}
            className="w-full text-center text-xs tracking-[2px] uppercase py-3 transition-colors"
            style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}
          >
            {showArchive ? "Hide" : "Show"} Past Entries ({entries.length})
          </button>

          <AnimatePresence>
            {showArchive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 mt-4 overflow-hidden"
              >
                {entries.map((e) => (
                  <div key={e.id} className="glass p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-[10px] tracking-[1px] uppercase mr-2" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}>
                          {themeIcons[e.theme]} {e.theme}
                        </span>
                        <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{e.date}</span>
                      </div>
                      <button
                        onClick={() => deleteEntry(e.id)}
                        className="text-xs px-2 py-0.5 rounded opacity-40 hover:opacity-80 transition-opacity"
                        style={{ color: "var(--text-muted)" }}
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-xs italic mb-2" style={{ color: "var(--text-accent)" }}>
                      &ldquo;{e.prompt}&rdquo;
                    </p>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text-secondary)" }}>
                      {e.text}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </PageWrapper>
  );
}
