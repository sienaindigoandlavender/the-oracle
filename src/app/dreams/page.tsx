"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper, PageHeader, CosmicDivider } from "@/components/ui";
import { OracleReading } from "@/components/OracleReading";
import { useOracle } from "@/lib/useOracle";

interface DreamEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  symbols: string;
  interpretation?: string;
}

const MOODS = [
  { label: "Peaceful", icon: "☽" },
  { label: "Anxious", icon: "△" },
  { label: "Vivid", icon: "✦" },
  { label: "Dark", icon: "◑" },
  { label: "Strange", icon: "◎" },
  { label: "Joyful", icon: "☀" },
  { label: "Prophetic", icon: "⊛" },
  { label: "Recurring", icon: "⟳" },
];

export default function DreamsPage() {
  const [entries, setEntries] = useState<DreamEntry[]>([]);
  const [view, setView] = useState<"record" | "archive">("record");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [symbols, setSymbols] = useState("");
  const [saved, setSaved] = useState(false);
  const [viewingEntry, setViewingEntry] = useState<DreamEntry | null>(null);
  const oracle = useOracle();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("oracle-dreams");
      if (stored) setEntries(JSON.parse(stored));
    } catch { /* empty */ }
  }, []);

  const saveEntries = (updated: DreamEntry[]) => {
    setEntries(updated);
    try { localStorage.setItem("oracle-dreams", JSON.stringify(updated)); } catch { /* empty */ }
  };

  const saveDream = async () => {
    if (!content.trim()) return;

    const entry: DreamEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
      title: title.trim() || "Untitled Dream",
      content: content.trim(),
      mood,
      symbols: symbols.trim(),
    };

    saveEntries([entry, ...entries]);
    setSaved(true);

    // Request AI interpretation
    const interpretation = await oracle.ask({
      type: "dream",
      content: content.trim(),
      mood,
      symbols: symbols.trim(),
      title: title.trim(),
    });

    if (interpretation) {
      const updated = [{ ...entry, interpretation }, ...entries];
      saveEntries(updated);
    }
  };

  const newDream = () => {
    setTitle("");
    setContent("");
    setMood("");
    setSymbols("");
    setSaved(false);
    oracle.reset();
    setView("record");
  };

  const deleteEntry = (id: string) => {
    saveEntries(entries.filter(e => e.id !== id));
    if (viewingEntry?.id === id) setViewingEntry(null);
  };

  return (
    <PageWrapper>
      <PageHeader icon="☾" title="Dream Journal" subtitle="The unconscious speaks loudest while you sleep" />
      <CosmicDivider />

      {/* View toggle */}
      <div className="flex justify-center gap-2 mb-6">
        <button onClick={() => { setView("record"); setViewingEntry(null); }}
          className="px-4 py-2 rounded-lg text-xs transition-all"
          style={{ background: view === "record" ? "rgba(212,165,74,0.12)" : "transparent", border: `1px solid ${view === "record" ? "rgba(212,165,74,0.3)" : "var(--border-subtle)"}`, color: view === "record" ? "var(--text-accent)" : "var(--text-muted)" }}>
          Record Dream
        </button>
        <button onClick={() => setView("archive")}
          className="px-4 py-2 rounded-lg text-xs transition-all"
          style={{ background: view === "archive" ? "rgba(212,165,74,0.12)" : "transparent", border: `1px solid ${view === "archive" ? "rgba(212,165,74,0.3)" : "var(--border-subtle)"}`, color: view === "archive" ? "var(--text-accent)" : "var(--text-muted)" }}>
          Dream Archive {entries.length > 0 && `(${entries.length})`}
        </button>
      </div>

      {view === "record" && !saved && (
        <div className="max-w-lg mx-auto">
          <div className="glass p-5 mb-4">
            <p className="text-xs leading-relaxed mb-4 italic" style={{ color: "var(--text-secondary)" }}>
              Record your dream as soon as you wake — before the details fade.
              Include everything: images, feelings, people, places, colors, words. Even fragments matter.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label-text">Dream Title <span style={{ opacity: 0.5 }}>(optional)</span></label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                placeholder="Give this dream a name..."
                className="oracle-input" />
            </div>

            <div>
              <label className="label-text">The Dream</label>
              <textarea value={content} onChange={e => setContent(e.target.value)}
                placeholder="I was in a house I'd never seen before, but it felt familiar..."
                className="oracle-textarea" rows={8} style={{ fontStyle: "italic" }} />
              <div className="text-right text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
                {content.split(/\s+/).filter(Boolean).length} words
              </div>
            </div>

            {/* Mood */}
            <div>
              <label className="label-text">Dream Mood</label>
              <div className="flex flex-wrap gap-2">
                {MOODS.map(m => (
                  <button key={m.label} onClick={() => setMood(mood === m.label ? "" : m.label)}
                    className="px-3 py-1.5 rounded-lg text-xs transition-all"
                    style={{
                      background: mood === m.label ? "rgba(212,165,74,0.12)" : "rgba(12,18,37,0.4)",
                      border: `1px solid ${mood === m.label ? "rgba(212,165,74,0.3)" : "var(--border-subtle)"}`,
                      color: mood === m.label ? "var(--text-accent)" : "var(--text-muted)",
                    }}>
                    {m.icon} {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Symbols */}
            <div>
              <label className="label-text">Key Symbols <span style={{ opacity: 0.5 }}>(optional — things that stood out)</span></label>
              <input type="text" value={symbols} onChange={e => setSymbols(e.target.value)}
                placeholder="water, old house, red door, grandmother, flying..."
                className="oracle-input" />
            </div>

            <button onClick={saveDream} disabled={!content.trim()} className="oracle-btn w-full">
              Save & Interpret Dream
            </button>
          </div>
        </div>
      )}

      {/* Saved state with interpretation */}
      {view === "record" && saved && (
        <div className="max-w-lg mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-4">
            <div className="text-2xl mb-2">☾</div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Dream recorded.</p>
          </motion.div>
          <OracleReading content={oracle.result} loading={oracle.loading} error={oracle.error} />
          <div className="text-center mt-4">
            <button onClick={newDream} className="oracle-btn">Record Another Dream</button>
          </div>
        </div>
      )}

      {/* Archive */}
      {view === "archive" && !viewingEntry && (
        <div className="max-w-lg mx-auto">
          {entries.length === 0 ? (
            <div className="glass p-8 text-center">
              <div className="text-3xl mb-3 opacity-30">☾</div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>No dreams recorded yet. The unconscious awaits.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map(entry => (
                <motion.div key={entry.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="glass p-4 cursor-pointer transition-all hover:border-opacity-30"
                  style={{ borderColor: "rgba(212,165,74,0.1)" }}
                  onClick={() => setViewingEntry(entry)}>
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-sm" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-primary)" }}>
                      {entry.title}
                    </div>
                    <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>{entry.date}</div>
                  </div>
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                    {entry.content}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {entry.mood && <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "rgba(212,165,74,0.06)", color: "var(--text-muted)" }}>{entry.mood}</span>}
                    {entry.interpretation && <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "rgba(74,138,122,0.08)", color: "var(--aurora)" }}>✦ interpreted</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Viewing single entry */}
      {view === "archive" && viewingEntry && (
        <div className="max-w-lg mx-auto">
          <button onClick={() => setViewingEntry(null)} className="text-xs tracking-[1px] uppercase mb-4 block"
            style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}>← Back to Archive</button>
          <div className="glass p-5 mb-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-base" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>{viewingEntry.title}</h3>
              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{viewingEntry.date}</span>
            </div>
            {viewingEntry.mood && <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>Mood: {viewingEntry.mood}</div>}
            <p className="text-sm leading-[1.8] italic" style={{ color: "var(--text-secondary)" }}>{viewingEntry.content}</p>
            {viewingEntry.symbols && <div className="text-xs mt-3" style={{ color: "var(--text-muted)" }}>Symbols: {viewingEntry.symbols}</div>}
          </div>
          {viewingEntry.interpretation && (
            <div className="glass p-5 mb-4">
              <div className="text-[10px] tracking-[2px] uppercase mb-3" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>✦ Oracle Interpretation</div>
              <div className="oracle-prose">
                <div dangerouslySetInnerHTML={{ __html: viewingEntry.interpretation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\n/g, '<br/>') }} />
              </div>
            </div>
          )}
          <button onClick={() => deleteEntry(viewingEntry.id)} className="text-xs" style={{ color: "var(--nebula-pink)", opacity: 0.6 }}>Delete this dream</button>
        </div>
      )}
    </PageWrapper>
  );
}
