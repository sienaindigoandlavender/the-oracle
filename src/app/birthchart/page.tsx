"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { PageWrapper, PageHeader, CosmicDivider } from "@/components/ui";
import { OracleReading } from "@/components/OracleReading";
import { useOracle } from "@/lib/useOracle";
import { ZODIAC_SIGNS, PLANETS, HOUSES, type ZodiacSign } from "@/lib/astrology-data";

interface PlanetPlacement { planet: string; sign: ZodiacSign; house: string; degree: number; }
interface ChartData { sun: ZodiacSign; moon: ZodiacSign; rising: ZodiacSign | null; planets: PlanetPlacement[]; }

export default function BirthChartPage() {
  const [birthdate, setBirthdate] = useState("");
  const [birthtime, setBirthtime] = useState("");
  const [birthname, setBirthname] = useState("");
  const [chart, setChart] = useState<ChartData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const oracle = useOracle();

  const generateChart = () => {
    if (!birthdate) return;
    oracle.reset();
    const seed = birthdate.split("-").reduce((a, b) => a + parseInt(b), 0) + (birthtime ? birthtime.split(":").reduce((a, b) => a + parseInt(b), 0) : 42);
    const rng = (i: number) => ((seed * 9301 + 49297 + i * 7919) % 233280) / 233280;
    setChart({
      sun: ZODIAC_SIGNS[Math.floor(rng(0) * 12)],
      moon: ZODIAC_SIGNS[Math.floor(rng(1) * 12)],
      rising: birthtime ? ZODIAC_SIGNS[Math.floor(rng(2) * 12)] : null,
      planets: PLANETS.map((planet, i) => ({
        planet,
        sign: ZODIAC_SIGNS[Math.floor(rng(i + 3) * 12)],
        house: HOUSES[Math.floor(rng(i + 13) * 12)],
        degree: Math.floor(rng(i + 23) * 30),
      })),
    });
  };

  useEffect(() => {
    if (!chart || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = Math.min(320, window.innerWidth - 48);
    const dpr = window.devicePixelRatio || 2;
    canvas.width = size * dpr; canvas.height = size * dpr;
    canvas.style.width = size + "px"; canvas.style.height = size + "px";
    ctx.scale(dpr, dpr);
    const cx = size / 2, cy = size / 2, r = size / 2 - 14;

    // Deep space bg
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, "#111a36");
    grad.addColorStop(1, "#070b14");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Circles
    [r, r * 0.65, r * 0.3].forEach((radius, i) => {
      ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(196,181,154,${0.25 - i * 0.07})`;
      ctx.lineWidth = i === 0 ? 1.5 : 0.8; ctx.stroke();
    });

    const elementColors: Record<string, string> = { Fire: "#7b4a6e", Earth: "#4a8a7a", Air: "#2a4a7a", Water: "#4a3570" };
    ZODIAC_SIGNS.forEach((sign, i) => {
      const startAngle = (i * 30 - 90) * Math.PI / 180;
      const endAngle = ((i + 1) * 30 - 90) * Math.PI / 180;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, startAngle, endAngle); ctx.closePath();
      ctx.fillStyle = (elementColors[sign.element] || "#333") + "20"; ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx + r * 0.65 * Math.cos(startAngle), cy + r * 0.65 * Math.sin(startAngle));
      ctx.lineTo(cx + r * Math.cos(startAngle), cy + r * Math.sin(startAngle));
      ctx.strokeStyle = "rgba(196,181,154,0.15)"; ctx.lineWidth = 0.8; ctx.stroke();
      const midAngle = ((i * 30 + 15) - 90) * Math.PI / 180;
      ctx.font = `${Math.max(13, size * 0.04)}px serif`;
      ctx.fillStyle = "rgba(232,220,200,0.6)";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(sign.symbol, cx + r * 0.82 * Math.cos(midAngle), cy + r * 0.82 * Math.sin(midAngle));
    });

    chart.planets.forEach((p) => {
      const signIdx = ZODIAC_SIGNS.findIndex(s => s.name === p.sign.name);
      const angle = ((signIdx * 30 + p.degree) - 90) * Math.PI / 180;
      const dotR = r * 0.5;
      ctx.beginPath(); ctx.arc(cx + dotR * Math.cos(angle), cy + dotR * Math.sin(angle), 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#d4a54a"; ctx.fill();
      ctx.font = `${Math.max(8, size * 0.024)}px sans-serif`;
      ctx.fillStyle = "rgba(232,220,200,0.55)";
      ctx.fillText(p.planet.slice(0, 3), cx + (dotR + 11) * Math.cos(angle), cy + (dotR + 11) * Math.sin(angle));
    });

    ctx.font = `${Math.max(16, size * 0.05)}px serif`;
    ctx.fillStyle = "rgba(212,165,74,0.4)"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("☽", cx, cy);
  }, [chart]);

  return (
    <PageWrapper>
      <PageHeader icon="☿" title="Birth Chart" subtitle="The cosmos as it was when you arrived" />
      <CosmicDivider />

      <div className="max-w-sm mx-auto mb-8">
        <label className="label-text">Your Name</label>
        <input type="text" value={birthname} onChange={e => setBirthname(e.target.value)} placeholder="Your name" className="oracle-input mb-4" />
        <label className="label-text">Date of Birth</label>
        <input type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} className="oracle-input mb-4" />
        <label className="label-text">Time of Birth <span style={{ opacity: 0.5 }}>(optional)</span></label>
        <input type="time" value={birthtime} onChange={e => setBirthtime(e.target.value)} className="oracle-input mb-5" />
        <button onClick={generateChart} disabled={!birthdate} className="oracle-btn w-full">Cast My Chart</button>
      </div>

      {chart && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex justify-center gap-3 flex-wrap mb-8">
            {[
              { label: "Sun", data: chart.sun },
              { label: "Moon", data: chart.moon },
              ...(chart.rising ? [{ label: "Rising", data: chart.rising }] : []),
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}
                className="glass text-center py-5 px-5 min-w-[120px]">
                <div className="text-[9px] tracking-[2px] uppercase mb-2" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}>{item.label}</div>
                <div className="text-3xl mb-1">{item.data.symbol}</div>
                <div className="text-sm" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>{item.data.name}</div>
                <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>{item.data.element} · {item.data.ruler}</div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mb-8">
            <canvas ref={canvasRef} className="rounded-full" style={{ border: "1px solid var(--border-subtle)" }} />
          </div>

          <CosmicDivider />
          <h3 className="text-xs tracking-[3px] text-center mb-4 uppercase" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>Planetary Placements</h3>
          <div className="overflow-x-auto -mx-5 px-5">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  {["Planet", "Sign", "House", "°"].map(h => (
                    <th key={h} className="py-2 px-3 text-left text-[10px] tracking-[2px] uppercase" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chart.planets.map((p, i) => (
                  <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    style={{ borderBottom: "1px solid rgba(196,181,154,0.05)" }}>
                    <td className="py-2.5 px-3" style={{ color: "var(--text-accent)" }}>{p.planet}</td>
                    <td className="py-2.5 px-3" style={{ color: "var(--text-primary)" }}>{p.sign.symbol} {p.sign.name}</td>
                    <td className="py-2.5 px-3" style={{ color: "var(--text-secondary)" }}>{p.house}</td>
                    <td className="py-2.5 px-3" style={{ color: "var(--text-secondary)" }}>{p.degree}°</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* AI Deep Reading */}
          <CosmicDivider />
          <div className="max-w-xl mx-auto">
            {!oracle.result && !oracle.loading && (
              <div className="text-center">
                <button
                  onClick={() => oracle.ask({
                    type: "birthchart",
                    data: { name: birthname, date: birthdate, time: birthtime },
                  })}
                  className="oracle-btn"
                >
                  Receive Deep Reading
                </button>
              </div>
            )}
            <OracleReading content={oracle.result} loading={oracle.loading} error={oracle.error} />
          </div>
        </motion.div>
      )}
    </PageWrapper>
  );
}
