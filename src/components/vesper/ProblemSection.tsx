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
const STYLE_ID = "problem-section-styles-v3";
function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
    @keyframes probScan {
      0%   { top: -2px; }
      100% { top: 100%; }
    }
    @keyframes probFadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes probInfPulse {
      0%, 100% { opacity: 0.45; }
      50%       { opacity: 1; }
    }
    @keyframes probLineReveal {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .prob-line-1 { opacity: 0; }
    .prob-line-1.prob-vis {
      animation: probLineReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s forwards;
    }
    .prob-line-2 { opacity: 0; }
    .prob-line-2.prob-vis {
      animation: probLineReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.42s forwards;
    }
    .prob-stat { opacity: 0; }
    .prob-stat.prob-vis {
      animation: probFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
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

  const displayValue = isInfinity ? stat.displayText : `${count}${stat.suffix}`;
  const visClass = isVisible && !prefersReducedMotion ? " prob-vis" : "";
  const delay = `${0.55 + index * 0.18}s`;

  return (
    <div
      ref={ref}
      className={`prob-stat${visClass}`}
      style={
        isVisible && !prefersReducedMotion
          ? { animationDelay: delay }
          : isVisible
          ? { opacity: 1 }
          : undefined
      }
    >
      {/* diamond + number */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem" }}>
        <span
          style={{
            color: "rgba(180,140,60,1)",
            fontSize: "0.5rem",
            lineHeight: 1,
            flexShrink: 0,
            position: "relative",
            top: "-1px",
          }}
        >
          ◆
        </span>
        <p
          className="font-display"
          style={{
            fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
            lineHeight: 1,
            color: "rgba(180,140,60,1)",
            letterSpacing: "-0.02em",
            margin: 0,
            animation: isInfinity
              ? "probInfPulse 3s ease-in-out infinite"
              : undefined,
          }}
        >
          {displayValue}
        </p>
      </div>

      {/* description */}
      <p
        style={{
          marginTop: "0.45rem",
          paddingLeft: "1.1rem",
          fontSize: "0.75rem",
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.42)",
          fontFamily: "var(--font-body, sans-serif)",
          margin: "0.45rem 0 0 1.1rem",
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

  const visClass = isVisible && !prefersReducedMotion ? " prob-vis" : "";

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0a0a0a",
      }}
    >
      {/* ── layer 0: diagonal right-side tint ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "#12100a",
          clipPath: "polygon(62% 0%, 100% 0%, 100% 100%, 48% 100%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* ── layer 0: dot grid ── */}
      <div
        aria-hidden
        className="dot-grid-bg"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* ── layer 1: scanline (above bg, below content) ── */}
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
            animation: "probScan 6s linear infinite",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      )}

      {/* ── layer 2: all content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "stretch",
          padding: "7.5rem 5rem 7.5rem 0",
        }}
      >
        {/* LEFT SPINE — rotated label */}
        <div
          aria-hidden
          style={{
            width: "3.5rem",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              transform: "rotate(-90deg)",
              whiteSpace: "nowrap",
              fontSize: "0.58rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(180,140,60,0.65)",
              fontFamily: "var(--font-body, sans-serif)",
              fontWeight: 500,
              userSelect: "none",
            }}
          >
            01 — The Problem
          </p>
        </div>

        {/* CENTER — headline */}
        <div
          style={{
            flex: "0 0 52%",
            minWidth: 0,
            paddingRight: "3rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* line 1 — filled white */}
          <h2
            className={`font-display prob-line-1${visClass}`}
            style={{
              fontSize: "clamp(1.9rem, 4vw, 3.4rem)",
              fontWeight: 400,
              lineHeight: 1.18,
              color: "#ffffff",
              margin: "0 0 0.1em 0",
            }}
          >
            Your competitors move fast.
          </h2>

          {/* line 2 — gold outline only */}
          <h2
            className={`font-display prob-line-2${visClass}`}
            style={{
              fontSize: "clamp(1.9rem, 4vw, 3.4rem)",
              fontWeight: 400,
              lineHeight: 1.18,
              color: "transparent",
              WebkitTextStroke: "1px rgba(180,140,60,0.85)",
              margin: 0,
            }}
          >
            Your team is still catching up.
          </h2>
        </div>

        {/* RIGHT — vertical timeline */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            gap: 0,
          }}
        >
          {/* vertical gold rule */}
          <div
            aria-hidden
            style={{
              width: "1px",
              background: "rgba(180,140,60,0.38)",
              flexShrink: 0,
              marginRight: "1.75rem",
            }}
          />

          {/* stat rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.25rem", flex: 1 }}>
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
    </section>
  );
};

export default ProblemSection;
