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

/* ─── inject keyframes once ─────────────────────────────────────────────── */
const STYLE_ID = "problem-section-styles-v2";
function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
    /* scanline drift */
    @keyframes problemScan {
      0%   { top: -2px; }
      100% { top: 100%; }
    }

    /* count-up fade */
    @keyframes problemFadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* infinity pulse */
    @keyframes problemInfinityPulse {
      0%, 100% { opacity: 0.4; }
      50%       { opacity: 1; }
    }

    /* headline line reveals */
    @keyframes problemLineReveal {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .prob-line-1 {
      opacity: 0;
    }
    .prob-line-1.prob-visible {
      animation: problemLineReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s forwards;
    }
    .prob-line-2 {
      opacity: 0;
    }
    .prob-line-2.prob-visible {
      animation: problemLineReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s forwards;
    }

    .prob-stat-row {
      opacity: 0;
    }
    .prob-stat-row.prob-visible {
      animation: problemFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
    }
  `;
  document.head.appendChild(el);
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
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setStarted(true); obs.unobserve(el); }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [enabled]);

  useEffect(() => {
    if (!started) return;
    if (prefersReducedMotion) { setCount(end); return; }
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

/* ─── single timeline stat ──────────────────────────────────────────────── */
function TimelineStat({
  stat,
  index,
  isVisible,
  prefersReducedMotion,
}: {
  stat: typeof stats[number];
  index: number;
  isVisible: boolean;
  prefersReducedMotion: boolean;
}) {
  const isInfinity = !!stat.displayText;
  const { count, ref } = useCountUp(
    stat.value,
    stat.duration,
    !isInfinity,
    prefersReducedMotion
  );

  const displayValue = isInfinity
    ? stat.displayText
    : `${count}${stat.suffix}`;

  const visibleClass = isVisible && !prefersReducedMotion ? " prob-visible" : "";
  const delay = `${0.5 + index * 0.18}s`;

  return (
    <div
      ref={ref}
      className={`prob-stat-row${visibleClass}`}
      style={
        isVisible && !prefersReducedMotion ? { animationDelay: delay } : undefined
      }
    >
      {/* diamond + number row */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
        {/* diamond bullet on the line */}
        <span
          style={{
            color: "rgba(180,140,60,1)",
            fontSize: "0.55rem",
            lineHeight: 1,
            flexShrink: 0,
            position: "relative",
            top: "-1px",
          }}
        >
          ◆
        </span>

        {/* number */}
        <p
          className="font-display"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            lineHeight: 1,
            color: "rgba(180,140,60,1)",
            letterSpacing: "-0.02em",
            animation: isInfinity
              ? "problemInfinityPulse 3s ease-in-out infinite"
              : undefined,
          }}
        >
          {displayValue}
        </p>
      </div>

      {/* label */}
      <p
        style={{
          marginTop: "0.5rem",
          paddingLeft: "1.25rem",
          fontSize: "0.78rem",
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.45)",
          fontFamily: "var(--font-body, sans-serif)",
        }}
      >
        {stat.label}
      </p>
    </div>
  );
}

/* ─── main section ──────────────────────────────────────────────────────── */
const ProblemSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); obs.unobserve(el); }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const visibleClass = isVisible && !prefersReducedMotion ? " prob-visible" : "";

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "7rem",
        paddingBottom: "7rem",
        background: "#0a0a0a",
      }}
    >
      {/* ── diagonal right-side gold tint via clip-path ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "#1a1500",
          clipPath: "polygon(62% 0%, 100% 0%, 100% 100%, 48% 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── animated scanline ── */}
      {!prefersReducedMotion && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "1px",
            background: "rgba(180,140,60,1)",
            opacity: 0.06,
            animation: "problemScan 6s linear infinite",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      )}

      {/* ── dot grid faint overlay ── */}
      <div
        aria-hidden
        className="absolute inset-0 dot-grid-bg"
        style={{ opacity: 0.12, pointerEvents: "none" }}
      />

      {/* ── vertical spine label ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <p
          style={{
            transform: "rotate(-90deg)",
            whiteSpace: "nowrap",
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(180,140,60,0.7)",
            fontFamily: "var(--font-body, sans-serif)",
            fontWeight: 500,
            userSelect: "none",
          }}
        >
          01 — The Problem
        </p>
      </div>

      {/* ── main content, offset to clear the spine ── */}
      <div
        style={{
          maxWidth: "88rem",
          margin: "0 auto",
          paddingLeft: "clamp(4rem, 6vw, 6rem)",
          paddingRight: "clamp(1.5rem, 4vw, 3rem)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "clamp(2rem, 6vw, 6rem)",
            flexWrap: "wrap",
          }}
        >
          {/* LEFT — headline block (55%) */}
          <div style={{ flex: "0 0 55%", minWidth: "min(100%, 420px)" }}>
            {/* line 1 — filled white */}
            <h2
              className={`font-display prob-line-1${visibleClass}`}
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
                fontWeight: 400,
                lineHeight: 1.15,
                color: "#ffffff",
                marginBottom: "0.15em",
              }}
            >
              Your competitors move fast.
            </h2>

            {/* line 2 — gold outline only */}
            <h2
              className={`font-display prob-line-2${visibleClass}`}
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
                fontWeight: 400,
                lineHeight: 1.15,
                color: "transparent",
                WebkitTextStroke: "1px rgba(180,140,60,0.9)",
                marginBottom: 0,
              }}
            >
              Your team is still catching up.
            </h2>
          </div>

          {/* RIGHT — vertical timeline (45%) */}
          <div
            style={{
              flex: "1 1 260px",
              display: "flex",
              gap: 0,
            }}
          >
            {/* the vertical gold line */}
            <div
              aria-hidden
              style={{
                width: "1px",
                background: "rgba(180,140,60,0.4)",
                flexShrink: 0,
                marginRight: "1.5rem",
                alignSelf: "stretch",
                minHeight: "100%",
              }}
            />

            {/* stats column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem", flex: 1 }}>
              {stats.map((stat, i) => (
                <TimelineStat
                  key={i}
                  stat={stat}
                  index={i}
                  isVisible={isVisible}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
