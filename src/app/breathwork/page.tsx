"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper, PageHeader, CosmicDivider } from "@/components/ui";

interface BreathPattern {
  name: string;
  description: string;
  phases: { label: string; seconds: number }[];
  cycles: number;
}

const PATTERNS: BreathPattern[] = [
  {
    name: "Box Breathing",
    description: "Equal inhale, hold, exhale, hold. Used by Navy SEALs to calm the nervous system under pressure.",
    phases: [
      { label: "Inhale", seconds: 4 },
      { label: "Hold", seconds: 4 },
      { label: "Exhale", seconds: 4 },
      { label: "Hold", seconds: 4 },
    ],
    cycles: 6,
  },
  {
    name: "4-7-8 Breathing",
    description: "The relaxing breath. Activates the parasympathetic nervous system. Good before sleep or during anxiety.",
    phases: [
      { label: "Inhale", seconds: 4 },
      { label: "Hold", seconds: 7 },
      { label: "Exhale", seconds: 8 },
    ],
    cycles: 4,
  },
  {
    name: "Coherent Breathing",
    description: "5 seconds in, 5 seconds out. Brings heart rate variability into coherence. Deeply calming over time.",
    phases: [
      { label: "Inhale", seconds: 5 },
      { label: "Exhale", seconds: 5 },
    ],
    cycles: 10,
  },
  {
    name: "Energizing Breath",
    description: "Quick inhale, quick exhale. Wakes up the system. Good for morning or before creative work.",
    phases: [
      { label: "Inhale", seconds: 2 },
      { label: "Exhale", seconds: 2 },
    ],
    cycles: 15,
  },
];

export default function BreathworkPage() {
  const [selectedPattern, setSelectedPattern] = useState<BreathPattern | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalPhaseTime = selectedPattern ? selectedPattern.phases.reduce((a, p) => a + p.seconds, 0) : 0;
  const totalTime = selectedPattern ? totalPhaseTime * selectedPattern.cycles : 0;

  useEffect(() => {
    if (!isActive || !selectedPattern) return;

    const phase = selectedPattern.phases[currentPhase];
    setCountdown(phase.seconds);

    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // Move to next phase
          const nextPhase = currentPhase + 1;
          if (nextPhase >= selectedPattern.phases.length) {
            // Next cycle
            const nextCycle = currentCycle + 1;
            if (nextCycle >= selectedPattern.cycles) {
              // Done
              setIsActive(false);
              setCompleted(true);
              if (timerRef.current) clearInterval(timerRef.current);
              return 0;
            }
            setCurrentCycle(nextCycle);
            setCurrentPhase(0);
          } else {
            setCurrentPhase(nextPhase);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive, currentPhase, currentCycle, selectedPattern]);

  const start = () => {
    setIsActive(true);
    setCurrentPhase(0);
    setCurrentCycle(0);
    setCompleted(false);
  };

  const stop = () => {
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const reset = () => {
    stop();
    setSelectedPattern(null);
    setCompleted(false);
    setCurrentPhase(0);
    setCurrentCycle(0);
  };

  const phase = selectedPattern?.phases[currentPhase];
  const isInhale = phase?.label === "Inhale";
  const isExhale = phase?.label === "Exhale";
  const isHold = phase?.label === "Hold";

  // Circle scale based on breathing phase
  const circleScale = isInhale ? 1.4 : isExhale ? 0.7 : isHold ? (currentPhase === 1 ? 1.4 : 0.7) : 1;

  return (
    <PageWrapper>
      <PageHeader icon="◯" title="Breathwork" subtitle="Come back to the body. It knows things the mind forgot." />
      <CosmicDivider />

      {!selectedPattern && (
        <div className="max-w-md mx-auto space-y-3">
          <p className="text-xs text-center leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Choose a breathing pattern. Find a comfortable position. Close your eyes if it helps.
          </p>
          {PATTERNS.map((p, i) => (
            <motion.button key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              onClick={() => setSelectedPattern(p)}
              className="glass p-5 w-full text-left transition-all hover:border-opacity-30"
              style={{ borderColor: "rgba(212,165,74,0.08)" }}>
              <div className="text-sm tracking-wide mb-1" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>{p.name}</div>
              <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--text-secondary)" }}>{p.description}</p>
              <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                {p.phases.map(ph => `${ph.label} ${ph.seconds}s`).join(" · ")} × {p.cycles} cycles
                &nbsp;({Math.round(p.phases.reduce((a, ph) => a + ph.seconds, 0) * p.cycles / 60)}min)
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {selectedPattern && !isActive && !completed && (
        <div className="max-w-md mx-auto text-center">
          <div className="glass p-6 mb-6">
            <div className="text-lg mb-2" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>{selectedPattern.name}</div>
            <p className="text-xs mb-4" style={{ color: "var(--text-secondary)" }}>{selectedPattern.description}</p>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>
              {selectedPattern.phases.map(ph => `${ph.label} ${ph.seconds}s`).join(" · ")} × {selectedPattern.cycles} cycles
              &nbsp;≈ {Math.round(totalTime / 60)} minutes
            </div>
          </div>
          <div className="flex justify-center gap-3">
            <button onClick={start} className="oracle-btn">Begin</button>
            <button onClick={reset} className="text-xs" style={{ color: "var(--text-muted)" }}>← Choose another</button>
          </div>
        </div>
      )}

      {/* Active breathing */}
      {selectedPattern && isActive && phase && (
        <div className="max-w-md mx-auto text-center">
          {/* Breathing circle */}
          <div className="flex justify-center items-center mb-8" style={{ height: "220px" }}>
            <motion.div
              animate={{ scale: circleScale }}
              transition={{ duration: phase.seconds, ease: "easeInOut" }}
              className="w-40 h-40 rounded-full flex items-center justify-center"
              style={{
                background: `radial-gradient(circle, ${isInhale ? "rgba(74,138,122,0.15)" : isExhale ? "rgba(123,74,110,0.15)" : "rgba(212,165,74,0.1)"}, transparent)`,
                border: `2px solid ${isInhale ? "rgba(74,138,122,0.4)" : isExhale ? "rgba(123,74,110,0.4)" : "rgba(212,165,74,0.3)"}`,
                boxShadow: `0 0 40px ${isInhale ? "rgba(74,138,122,0.15)" : isExhale ? "rgba(123,74,110,0.15)" : "rgba(212,165,74,0.1)"}`,
              }}>
              <div>
                <div className="text-3xl mb-1" style={{ fontFamily: "'Philosopher', serif", color: isInhale ? "var(--aurora)" : isExhale ? "var(--nebula-pink)" : "var(--text-accent)" }}>
                  {countdown}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Phase label */}
          <motion.div key={currentPhase + "-" + currentCycle}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="mb-4">
            <div className="text-xl tracking-wide mb-1" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-primary)" }}>
              {phase.label}
            </div>
          </motion.div>

          {/* Progress */}
          <div className="text-[10px] tracking-[2px] uppercase mb-6" style={{ color: "var(--text-muted)" }}>
            Cycle {currentCycle + 1} of {selectedPattern.cycles}
          </div>

          <button onClick={stop} className="text-xs" style={{ color: "var(--text-muted)" }}>Stop</button>
        </div>
      )}

      {/* Completed */}
      {completed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto text-center">
          <div className="glass p-8">
            <div className="text-3xl mb-3">◯</div>
            <div className="text-lg mb-2" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>Complete</div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
              {Math.round(totalTime / 60)} minutes of presence. Notice how your body feels now compared to before.
              The breath changes everything.
            </p>
          </div>
          <button onClick={reset} className="oracle-btn mt-4">Practice Again</button>
        </motion.div>
      )}
    </PageWrapper>
  );
}
