"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper, PageHeader, OrnamentalDivider } from "@/components/ui";
import { calcLifePath, calcExpression, calcSoulUrge, calcPersonality, numberMeanings } from "@/lib/numerology";

interface Results {
  lifePath: number;
  expression: number;
  soulUrge: number;
  personality: number;
}

function NumberCard({ label, number, delay = 0 }: { label: string; number: number; delay?: number }) {
  const info = numberMeanings[number] || { title: "Mystery", desc: "The cosmos holds secrets yet unrevealed." };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="oracle-card p-5 sm:p-6"
    >
      <div
        className="text-[10px] tracking-[3px] uppercase mb-2"
        style={{ fontFamily: "'Cinzel', serif", color: "var(--gold-dim)" }}
      >
        {label}
      </div>
      <div
        className="text-4xl sm:text-5xl mb-2"
        style={{
          fontFamily: "'Cinzel Decorative', serif",
          color: "var(--gold)",
          textShadow: "0 0 30px rgba(201,168,76,0.3)",
        }}
      >
        {number}
      </div>
      <div
        className="text-sm sm:text-base tracking-[2px] mb-2"
        style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)" }}
      >
        {info.title}
      </div>
      <p className="text-sm leading-relaxed italic" style={{ color: "var(--bone-dim)" }}>
        {info.desc}
      </p>
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

  const isReady = name.trim().length > 0 && birthdate.length > 0;

  return (
    <PageWrapper>
      <PageHeader icon="Ⅸ" title="Numerology" subtitle="The Sacred Mathematics of Being" />
      <OrnamentalDivider />

      <div className="max-w-sm mx-auto mb-8">
        <label className="label-text">Full Birth Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="As it appears on your birth certificate"
          className="oracle-input mb-4"
        />

        <label className="label-text">Date of Birth</label>
        <input
          type="date"
          value={birthdate}
          onChange={e => setBirthdate(e.target.value)}
          className="oracle-input mb-5"
        />

        <button
          onClick={calculate}
          disabled={!isReady}
          className="oracle-btn w-full"
        >
          Reveal My Numbers
        </button>
      </div>

      {results && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <NumberCard label="Life Path Number" number={results.lifePath} delay={0} />
          <NumberCard label="Expression Number" number={results.expression} delay={0.1} />
          <NumberCard label="Soul Urge Number" number={results.soulUrge} delay={0.2} />
          <NumberCard label="Personality Number" number={results.personality} delay={0.3} />
        </div>
      )}
    </PageWrapper>
  );
}
