import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/* ─── data ─────────────────────────────────────────────────────────────── */
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
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [enabled]);

  useEffect(() => {
    if (!started) return;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }
    let startTime = 0;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, end, duration, prefersReducedMotion]);

  return { count, ref };
}

/* ─── stat card ─────────────────────────────────────────────────────────── */
function StatCard({
  stat,
  prefersReducedMotion,
}: {
  stat: typeof stats[number];
  prefersReducedMotion: boolean;
}) {
  const isInfinity = !!stat.displayText;
  const { count, ref } = useCountUp(
    stat.value,
    stat.duration,
    !isInfinity,
    prefersReducedMotion
  );

  const displayValue = isInfinity ? stat.displayText : `${count}${stat.suffix}`;

  return (
    <div
      ref={ref}
      className="group transition-colors duration-300"
      style={{
        borderLeft: "1px solid rgba(180, 140, 60, 0.8)",
        paddingLeft: "20px",
        paddingTop: "12px",
        paddingBottom: "12px",
      }}
    >
      {/* Background Hover Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "rgba(180, 140, 60, 0.05)", zIndex: -1 }}
      />

      <p
        className="font-display"
        style={{
          fontSize: "2.5rem",
          color: "rgba(180, 140, 60, 1)",
          lineHeight: 1,
          marginBottom: "0.5rem",
        }}
      >
        {displayValue}
      </p>
      <p
        style={{
          fontSize: "0.8rem",
          color: "#888",
          lineHeight: 1.5,
          fontFamily: "var(--font-body, sans-serif)",
          maxWidth: "200px",
        }}
      >
        {stat.label}
      </p>

      <style jsx>{`
        div {
          position: relative;
        }
      `}</style>
    </div>
  );
}

/* ─── main section ──────────────────────────────────────────────────────── */
const ProblemSection = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      style={{
        position: "relative",
        background: "#0a0a0a",
        padding: "140px 80px",
        overflow: "hidden",
      }}
    >
      {/* ── Layer 0: Ambient Glow ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(180,140,60,0.08) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* ── Layer 1: Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(400px, 4fr) 3fr 3fr",
          gap: "60px",
          alignItems: "start",
        }}
      >
        {/* COLUMN 1: Headline Block */}
        <div style={{ display: "flex", gap: "24px" }}>
          {/* Vertical Accent Bar */}
          <div
            aria-hidden
            style={{
              width: "2px",
              height: "60px",
              background: "rgba(180, 140, 60, 1)",
              marginTop: "56px",
              flexShrink: 0,
            }}
          />

          <div>
            <p
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(180, 140, 60, 1)",
                fontFamily: "var(--font-body, sans-serif)",
                fontWeight: 600,
                marginBottom: "1.5rem",
              }}
            >
              01 — The Problem
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2.5rem, 4.5vw, 3.8rem)",
                lineHeight: 1.1,
                color: "#ffffff",
                marginBottom: "0.2em",
                fontWeight: 400,
              }}
            >
              Your competitors move fast.
              <span
                style={{
                  display: "block",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(180, 140, 60, 0.9)",
                }}
              >
                Your team is still catching up.
              </span>
            </h2>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#888",
                fontFamily: "var(--font-body, sans-serif)",
                lineHeight: 1.6,
                marginTop: "1.5rem",
              }}
            >
              Vesper surfaces what your team is missing — before it costs you
              the deal.
            </p>
          </div>
        </div>

        {/* COLUMN 2: Decorative Tech Element */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "40px",
          }}
        >
          {/* Circuit Schematic SVG */}
          <svg
            width="100"
            height="180"
            viewBox="0 0 100 180"
            fill="none"
            style={{ opacity: 0.8 }}
          >
            <path
              d="M50 0V180"
              stroke="rgba(180, 140, 60, 0.4)"
              strokeWidth="1"
            />
            {/* Branch 1 */}
            <g className="schematic-branch">
              <path
                d="M50 40H80"
                stroke="rgba(180, 140, 60, 0.4)"
                strokeWidth="1"
              />
              <circle
                cx="84"
                cy="40"
                r="3"
                stroke="rgba(180, 140, 60, 0.5)"
                strokeWidth="1"
                fill="none"
              />
            </g>
            {/* Branch 2 */}
            <g className="schematic-branch">
              <path
                d="M50 90H20"
                stroke="rgba(180, 140, 60, 0.4)"
                strokeWidth="1"
              />
              <circle
                cx="16"
                cy="90"
                r="3"
                stroke="rgba(180, 140, 60, 0.5)"
                strokeWidth="1"
                fill="none"
              />
            </g>
            {/* Branch 3 */}
            <g className="schematic-branch">
              <path
                d="M50 140H80"
                stroke="rgba(180, 140, 60, 0.4)"
                strokeWidth="1"
              />
              <circle
                cx="84"
                cy="140"
                r="3"
                stroke="rgba(180, 140, 60, 0.5)"
                strokeWidth="1"
                fill="none"
              />
            </g>
          </svg>

          {/* Monospace Readout */}
          <div
            style={{
              marginTop: "40px",
              fontFamily: "monospace",
              fontSize: "11px",
              color: "rgba(180, 140, 60, 0.6)",
              width: "200px",
              borderTop: "1px solid rgba(180, 140, 60, 0.15)",
            }}
          >
            {[
              { label: "SIGNAL LATENCY", val: "0.4ms" },
              { label: "SOURCES ACTIVE", val: "847" },
              { label: "LAST SYNC", val: "00:00:03 ago" },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid rgba(180, 140, 60, 0.15)",
                }}
              >
                <span>{item.label}</span>
                <span>→ {item.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMN 3: Stats Block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            paddingTop: "20px",
          }}
        >
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              stat={stat}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes glowPulse {
          0%,
          100% {
            filter: drop-shadow(0 0 2px rgba(180, 140, 60, 0.3));
            opacity: 0.6;
          }
          50% {
            filter: drop-shadow(0 0 6px rgba(180, 140, 60, 0.8));
            opacity: 1;
          }
        }
        .schematic-branch {
          animation: glowPulse 3s ease-in-out infinite;
        }
        .schematic-branch:nth-child(2) {
          animation-delay: 1s;
        }
        .schematic-branch:nth-child(3) {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default ProblemSection;
