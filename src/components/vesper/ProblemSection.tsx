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
    <section className="relative bg-[#0a0a0a] overflow-hidden fluid-padding">
      
      {/* ── Vertical Color Transition Layer ── */}
      <div 
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          background: "linear-gradient(to bottom, #0a0a0a 0%, rgba(180, 140, 60, 0.15) 35%, rgba(180, 140, 60, 0.08) 55%, #0a0a0a 100%)"
        }} 
      />

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(400px,4fr)_3fr_3fr] gap-12 lg:gap-16 items-start">
        
        {/* COL 1: Headline Block - order 1 on mobile */}
        <div className="flex gap-7 order-1">
          <div className="hidden sm:block w-[2px] h-[60px] bg-primary mt-[58px] shrink-0" />
          <div className="w-full">
            <p className="font-mono-data text-[0.72rem] tracking-[0.3em] uppercase text-primary font-semibold mb-6">
              01 — The Problem
            </p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] text-white font-normal m-0 italic sm:not-italic">
              Your competitors move fast.
              <span className="block text-primary">
                Your team is still catching up.
              </span>
            </h2>
            <p className="font-body text-[0.95rem] text-muted-foreground leading-relaxed mt-6 max-w-[480px]">
              Vesper surfaces what your team is missing — before it costs you the deal.
            </p>
          </div>
        </div>

        {/* COL 2: Schematic - hidden on tablet, visible on desktop as middle col, last on mobile */}
        <div className="hidden lg:flex flex-col items-center pt-10 order-3 lg:order-none">
          <div className="relative flex flex-col items-center">
            <svg width="100" height="180" viewBox="0 0 100 180" fill="none" className="opacity-80">
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

            <div className="mt-10 font-mono text-[11px] text-primary/60 w-[220px] border-t border-primary/15">
              {[
                { l: "SIGNAL LATENCY", v: "0.4ms" },
                { l: "SOURCES ACTIVE", v: "847" },
                { l: "LAST SYNC", v: "00:00:03 ago" }
              ].map((d, i) => (
                <div key={i} className="flex justify-between py-2.5 border-b border-primary/15">
                  <span>{d.l}</span>
                  <span>→ {d.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Schematic for mobile view (different order/placement if desired, but user said readout at bottom) */}
        <div className="flex lg:hidden flex-col items-center pt-8 order-3 sm:hidden">
           {/* Same SVG and readout as above for mobile-only display if we want it stacked at bottom */}
           <div className="font-mono text-[10px] text-primary/50 w-full max-w-[280px] border-t border-primary/10">
              {[
                { l: "SIGNAL LATENCY", v: "0.4ms" },
                { l: "SOURCES ACTIVE", v: "847" }
              ].map((d, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-primary/10">
                  <span>{d.l}</span>
                  <span>{d.v}</span>
                </div>
              ))}
            </div>
        </div>

        {/* COL 3: Stats - order 2 on mobile, right col on tablet */}
        <div className="flex flex-col gap-4 pt-6 order-2 sm:order-none sm:pt-24 lg:pt-6">
          {stats.map((s, i) => <StatCard key={i} stat={s} prefersReducedMotion={prefersReducedMotion} />)}
        </div>

      </div>
    </section>
  );
};

export default ProblemSection;
