"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { PageWrapper, PageHeader, OrnamentalDivider } from "@/components/ui";
import { ZODIAC_SIGNS, PLANETS, HOUSES, type ZodiacSign } from "@/lib/astrology-data";

interface PlanetPlacement {
  planet: string;
  sign: ZodiacSign;
  house: string;
  degree: number;
}

interface ChartData {
  sun: ZodiacSign;
  moon: ZodiacSign;
  rising: ZodiacSign | null;
  planets: PlanetPlacement[];
}

export default function BirthChartPage() {
  const [birthdate, setBirthdate] = useState("");
  const [birthtime, setBirthtime] = useState("");
  const [chart, setChart] = useState<ChartData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateChart = () => {
    if (!birthdate) return;
    const seed = birthdate.split("-").reduce((a, b) => a + parseInt(b), 0) +
      (birthtime ? birthtime.split(":").reduce((a, b) => a + parseInt(b), 0) : 42);
    const rng = (i: number) => ((seed * 9301 + 49297 + i * 7919) % 233280) / 233280;

    const sunIndex = Math.floor(rng(0) * 12);
    const moonIndex = Math.floor(rng(1) * 12);
    const risingIndex = birthtime ? Math.floor(rng(2) * 12) : null;

    const planetPlacements = PLANETS.map((planet, i) => ({
      planet,
      sign: ZODIAC_SIGNS[Math.floor(rng(i + 3) * 12)],
      house: HOUSES[Math.floor(rng(i + 13) * 12)],
      degree: Math.floor(rng(i + 23) * 30),
    }));

    setChart({
      sun: ZODIAC_SIGNS[sunIndex],
      moon: ZODIAC_SIGNS[moonIndex],
      rising: risingIndex !== null ? ZODIAC_SIGNS[risingIndex] : null,
      planets: planetPlacements,
    });
  };

  useEffect(() => {
    if (!chart || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = Math.min(340, window.innerWidth - 48);
    const dpr = window.devicePixelRatio || 2;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
    ctx.scale(dpr, dpr);

    const cx = size / 2, cy = size / 2, r = size / 2 - 16;

    // Background
    ctx.fillStyle = "#0d0a08";
    ctx.fillRect(0, 0, size, size);

    // Circles
    [r, r * 0.65, r * 0.3].forEach((radius, i) => {
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(201,168,76,${0.4 - i * 0.12})`;
      ctx.lineWidth = i === 0 ? 1.5 : 1;
      ctx.stroke();
    });

    // Zodiac segments
    const elementColors: Record<string, string> = { Fire: "#8b2500", Earth: "#4a6741", Air: "#3d5a8a", Water: "#3d2b5a" };
    ZODIAC_SIGNS.forEach((sign, i) => {
      const startAngle = (i * 30 - 90) * Math.PI / 180;
      const endAngle = ((i + 1) * 30 - 90) * Math.PI / 180;

      // Segment fill
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = (elementColors[sign.element] || "#333") + "18";
      ctx.fill();

      // Segment line
      ctx.beginPath();
      ctx.moveTo(cx + r * 0.65 * Math.cos(startAngle), cy + r * 0.65 * Math.sin(startAngle));
      ctx.lineTo(cx + r * Math.cos(startAngle), cy + r * Math.sin(startAngle));
      ctx.strokeStyle = "rgba(201,168,76,0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Symbol
      const midAngle = ((i * 30 + 15) - 90) * Math.PI / 180;
      const symbolR = r * 0.82;
      ctx.font = `${Math.max(14, size * 0.045)}px serif`;
      ctx.fillStyle = "rgba(201,168,76,0.7)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(sign.symbol, cx + symbolR * Math.cos(midAngle), cy + symbolR * Math.sin(midAngle));
    });

    // Planet dots
    chart.planets.forEach((p) => {
      const signIdx = ZODIAC_SIGNS.findIndex(s => s.name === p.sign.name);
      const angle = ((signIdx * 30 + p.degree) - 90) * Math.PI / 180;
      const dotR = r * 0.5;

      ctx.beginPath();
      ctx.arc(cx + dotR * Math.cos(angle), cy + dotR * Math.sin(angle), 3, 0, Math.PI * 2);
      ctx.fillStyle = "#c9a84c";
      ctx.fill();

      ctx.font = `${Math.max(8, size * 0.025)}px 'Cinzel'`;
      ctx.fillStyle = "rgba(212,197,169,0.7)";
      ctx.fillText(
        p.planet.slice(0, 3),
        cx + (dotR + 12) * Math.cos(angle),
        cy + (dotR + 12) * Math.sin(angle)
      );
    });

    // Center symbol
    ctx.font = `${Math.max(18, size * 0.06)}px serif`;
    ctx.fillStyle = "rgba(201,168,76,0.5)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("⛤", cx, cy);
  }, [chart]);

  return (
    <PageWrapper>
      <PageHeader icon="☿" title="Birth Chart" subtitle="The Celestial Map of Your Becoming" />
      <OrnamentalDivider />

      <div className="max-w-sm mx-auto mb-8">
        <label className="label-text">Date of Birth</label>
        <input
          type="date"
          value={birthdate}
          onChange={e => setBirthdate(e.target.value)}
          className="oracle-input mb-4"
        />

        <label className="label-text">
          Time of Birth <span style={{ opacity: 0.5 }}>(optional, for Rising sign)</span>
        </label>
        <input
          type="time"
          value={birthtime}
          onChange={e => setBirthtime(e.target.value)}
          className="oracle-input mb-5"
        />

        <button
          onClick={generateChart}
          disabled={!birthdate}
          className="oracle-btn w-full"
        >
          Cast My Chart
        </button>
      </div>

      {chart && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Big Three */}
          <div className="flex justify-center gap-3 flex-wrap mb-8">
            {[
              { label: "Sun Sign", data: chart.sun },
              { label: "Moon Sign", data: chart.moon },
              ...(chart.rising ? [{ label: "Rising Sign", data: chart.rising }] : []),
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="text-center py-5 px-6 min-w-[130px]"
                style={{ background: "rgba(26,20,16,0.8)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "2px" }}
              >
                <div className="text-[9px] tracking-[2px] uppercase mb-2" style={{ fontFamily: "'Cinzel', serif", color: "var(--gold-dim)" }}>
                  {item.label}
                </div>
                <div className="text-3xl mb-1">{item.data.symbol}</div>
                <div className="text-base" style={{ fontFamily: "'Cinzel Decorative', serif", color: "var(--gold)" }}>
                  {item.data.name}
                </div>
                <div className="text-xs italic mt-1" style={{ color: "var(--bone-dim)" }}>
                  {item.data.element} · {item.data.ruler}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart Wheel */}
          <div className="flex justify-center mb-8">
            <canvas
              ref={canvasRef}
              style={{ borderRadius: "50%", border: "1px solid rgba(201,168,76,0.1)" }}
            />
          </div>

          {/* Planet Table */}
          <OrnamentalDivider />
          <h3
            className="text-xs sm:text-sm tracking-[3px] text-center mb-4 uppercase"
            style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)" }}
          >
            Planetary Placements
          </h3>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
                  {["Planet", "Sign", "House", "°"].map(h => (
                    <th
                      key={h}
                      className="py-2 px-3 text-left text-[10px] tracking-[2px] uppercase"
                      style={{ fontFamily: "'Cinzel', serif", color: "var(--gold-dim)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chart.planets.map((p, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    style={{ borderBottom: "1px solid rgba(201,168,76,0.06)" }}
                  >
                    <td className="py-2.5 px-3" style={{ color: "var(--gold)" }}>{p.planet}</td>
                    <td className="py-2.5 px-3">{p.sign.symbol} {p.sign.name}</td>
                    <td className="py-2.5 px-3" style={{ color: "var(--bone-dim)" }}>{p.house}</td>
                    <td className="py-2.5 px-3" style={{ color: "var(--bone-dim)" }}>{p.degree}°</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </PageWrapper>
  );
}
