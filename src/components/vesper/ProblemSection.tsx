import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/* ─── stat data ─────────────────────────────────────────────────────────── */
const stats = [
  {
    value: 73,
    suffix: "%",
    duration: 1800,
    label: "of reps miss competitive intel that existed before the call",
    displayText: undefined as string | undefined,
  },
  {
    value: 4,
    suffix: " hrs",
    duration: 1500,
    label: "The average analyst briefing takes to prepare manually",
    displayText: undefined as string | undefined,
  },
  {
    value: 0,
    suffix: "",
    duration: 0,
    label: "Critical account signals go unread in dashboards nobody checks",
    displayText: "∞",
  },
];

/* ─── animation styles (injected once into head) ────────────────────────── */
const STYLE_ID = "v-problem-section-animations-v6";
function injectStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes circuitGlow {
      0%, 100% { filter: drop-shadow(0 0 2px rgba(180, 140, 60, 0.3)); opacity: 0.5; }
      50% { filter: drop-shadow(0 0 6px rgba(180, 140, 60, 0.9)); opacity: 1; }
    }
    @keyframes infPulse {
      0%, 100% { opacity: 0.45; }
      50% { opacity: 1; }
    }
    .circuit-branch {
      animation: circuitGlow 3s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
}

/* ─── count-up hook ─────────────────────────────────────────────────────── */
function useCountUp(
  end: number,
  duration: number,
  enabled: boolean,
  prefersReducedMotion: boolean
) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([ent]) => {
      if (ent.isIntersecting) { setStarted(true); obs.unobserve(el); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [enabled]);

  useEffect(() => {
    if (!started) return;
    if (prefersReducedMotion) { setCount(end); return; }
    let start = 0;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, end, duration, prefersReducedMotion]);

  return { count, ref };
}

/* ─── single stat card ──────────────────────────────────────────────────── */
function StatCard({ stat, prefersReducedMotion }: { stat: typeof stats[0], prefersReducedMotion: boolean }) {
  const isInf = !!stat.displayText;
  const { count, ref } = useCountUp(stat.value, stat.duration, !isInf, prefersReducedMotion);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        borderLeft: "1px solid rgba(180, 140, 60, 0.8)",
        padding: "12px 0 12px 20px",
        background: isHovered ? "rgba(180, 140, 60, 0.05)" : "transparent",
        transition: "background 0.3s ease",
      }}
    >
      <p className="font-display" style={{ fontSize: "2.8rem", color: "rgba(180, 140, 60, 1)", lineHeight: 1, margin: 0, animation: isInf ? "infPulse 3s ease-in-out infinite" : undefined }}>
        {isInf ? stat.displayText : `${count}${stat.suffix}`}
      </p>
      <p style={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.5, marginTop: "0.5rem", fontFamily: "var(--font-body, sans-serif)" }}>
        {stat.label}
      </p>
    </div>
  );
}

/* ─── main section ──────────────────────────────────────────────────────── */
const ProblemSection = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  useEffect(() => { injectStyles(); }, []);

  return (
    <section style={{ position: "relative", background: "#0a0a0a", padding: "140px 80px", overflow: "hidden" }}>
      
      {/* ── Vertical Color Transition Layer ── */}
      <div 
        aria-hidden
        style={{ 
          position: "absolute", 
          inset: 0, 
          zIndex: 0, 
          pointerEvents: "none", 
          background: "linear-gradient(to bottom, #0a0a0a 0%, rgba(180, 140, 60, 0.15) 35%, rgba(180, 140, 60, 0.08) 55%, #0a0a0a 100%)"
        }} 
      />

      {/* Content Wrapper */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(400px, 4fr) 3fr 3fr", gap: "64px", alignItems: "start" }}>
        
        {/* COL 1: Headline Block */}
        <div style={{ display: "flex", gap: "28px" }}>
          <div style={{ width: "2px", height: "60px", background: "rgba(180, 140, 60, 1)", marginTop: "58px", flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(180, 140, 60, 1)", fontWeight: 600, marginBottom: "1.5rem", fontFamily: "var(--font-body, sans-serif)" }}>
              01 — The Problem
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1, color: "#fff", fontWeight: 400, margin: 0 }}>
              Your competitors move fast.
              <span style={{ display: "block", color: "rgba(180, 140, 60, 1)" }}>
                Your team is still catching up.
              </span>
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#888", lineHeight: 1.6, marginTop: "1.5rem", fontFamily: "var(--font-body, sans-serif)", maxWidth: "480px" }}>
              Vesper surfaces what your team is missing — before it costs you the deal.
            </p>
          </div>
        </div>

        {/* COL 2: Schematic */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "40px" }}>
          <svg width="100" height="180" viewBox="0 0 100 180" fill="none" style={{ opacity: 0.8 }}>
            <path d="M50 0V180" stroke="rgba(180, 140, 60, 0.35)" strokeWidth="1" />
            <g className="circuit-branch" style={{ animationDelay: "0s" }}>
              <path d="M50 40H80" stroke="rgba(180, 140, 60, 0.35)" strokeWidth="1" />
              <circle cx="84" cy="40" r="3.5" stroke="rgba(180, 140, 60, 0.5)" strokeWidth="1" fill="none" />
            </g>
            <g className="circuit-branch" style={{ animationDelay: "1s" }}>
              <path d="M50 90H20" stroke="rgba(180, 140, 60, 0.35)" strokeWidth="1" />
              <circle cx="16" cy="90" r="3.5" stroke="rgba(180, 140, 60, 0.5)" strokeWidth="1" fill="none" />
            </g>
            <g className="circuit-branch" style={{ animationDelay: "2s" }}>
              <path d="M50 140H80" stroke="rgba(180, 140, 60, 0.35)" strokeWidth="1" />
              <circle cx="84" cy="140" r="3.5" stroke="rgba(180, 140, 60, 0.5)" strokeWidth="1" fill="none" />
            </g>
          </svg>

          <div style={{ marginTop: "40px", fontFamily: "monospace", fontSize: "11px", color: "rgba(180, 140, 60, 0.65)", width: "220px", borderTop: "1px solid rgba(180, 140, 60, 0.15)" }}>
            {[
              { l: "SIGNAL LATENCY", v: "0.4ms" },
              { l: "SOURCES ACTIVE", v: "847" },
              { l: "LAST SYNC", v: "00:00:03 ago" }
            ].map((d, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid rgba(180, 140, 60, 0.15)" }}>
                <span>{d.l}</span>
                <span>→ {d.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COL 3: Stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingTop: "24px" }}>
          {stats.map((s, i) => <StatCard key={i} stat={s} prefersReducedMotion={prefersReducedMotion} />)}
        </div>

      </div>
    </section>
  );
};

export default ProblemSection;
