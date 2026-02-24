"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper, PageHeader, CosmicDivider } from "@/components/ui";
import { calcLifePath, calcExpression, calcSoulUrge, calcPersonality, numberMeanings } from "@/lib/numerology";

interface Results { lifePath: number; expression: number; soulUrge: number; personality: number; }

function NumberCard({ label, number, delay = 0 }: { label: string; number: number; delay?: number }) {
  const info = numberMeanings[number] || { title: "Mystery", desc: "The cosmos holds secrets yet unrevealed." };
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="glass p-5">
      <div className="text-[10px] tracking-[2px] uppercase mb-2" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}>
        {label}
      </div>
      <div className="text-4xl mb-1" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)", textShadow: "0 0 20px rgba(212,165,74,0.2)" }}>
        {number}
      </div>
      <div className="text-sm tracking-wide mb-2" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-primary)" }}>
        {info.title}
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{info.desc}</p>
    </motion.div>
  );
}

export default function NumerologyPage() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [results, setResults] = useState<Results | null>(null);

  const calculate = () => {
    if (!name || !birthdate) return;
    setResults({
      lifePath: calcLifePath(birthdate),
      expression: calcExpression(name),
      soulUrge: calcSoulUrge(name),
      personality: calcPersonality(name),
    });
  };

  return (
    <PageWrapper>
      <PageHeader icon="◈" title="Numerology" subtitle="Every name carries a vibration. Every number, a truth." />
      <CosmicDivider />

      <div className="max-w-sm mx-auto mb-8">
        <label className="label-text">Full Birth Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="As it appears on your birth certificate" className="oracle-input mb-4" />
        <label className="label-text">Date of Birth</label>
        <input type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} className="oracle-input mb-5" />
        <button onClick={calculate} disabled={!name.trim() || !birthdate} className="oracle-btn w-full">Reveal My Numbers</button>
      </div>

      {results && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <NumberCard label="Life Path" number={results.lifePath} delay={0} />
          <NumberCard label="Expression" number={results.expression} delay={0.1} />
          <NumberCard label="Soul Urge" number={results.soulUrge} delay={0.2} />
          <NumberCard label="Personality" number={results.personality} delay={0.3} />
        </div>
      )}
    </PageWrapper>
  );
}
