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

const HEADLINE = "Your competitors move fast. Your team is still catching up.";
const WORDS = HEADLINE.split(" ");

/* ─── word-reveal keyframes injected once ───────────────────────────────── */
const STYLE_ID = "problem-word-reveal-styles";
function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
    @keyframes wordReveal {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes infinityPulse {
      0%, 100% { opacity: 0.4; }
      50%       { opacity: 1;   }
    }
    .problem-word {
      display: inline-block;
      opacity: 0;
    }
    .problem-word.revealed {
      animation: wordReveal 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
  `;
  document.head.appendChild(el);
}

/* ─── single stat row ───────────────────────────────────────────────────── */
function StatRow({
  stat,
  isFirst,
}: {
  stat: typeof stats[number];
  isFirst: boolean;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  /* trigger count-up once the row enters the viewport */
  useEffect(() => {
    if (stat.displayText) return; // ∞ — no counting
    const el = rowRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.displayText]);

  /* rAF count-up */
  useEffect(() => {
    if (!started || stat.displayText) return;
    if (prefersReducedMotion) { setCount(stat.value); return; }

    let startTime = 0;
    const duration = stat.duration;
    const end = stat.value;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, stat.value, stat.duration, stat.displayText, prefersReducedMotion]);

  const displayValue = stat.displayText
    ? undefined
    : `${count}${stat.suffix}`;

  return (
    <div ref={rowRef}>
      {/* gold top rule (skip on first row) */}
      {!isFirst && (
        <div
          style={{
            borderTop: "1px solid rgba(180, 140, 60, 0.30)",
            marginBottom: "1.5rem",
          }}
        />
      )}

      <div className="space-y-3 pb-6">
        {/* stat number */}
        <p
          className="font-display text-5xl lg:text-6xl text-primary"
          style={
            stat.displayText
              ? {
                  animation: "infinityPulse 3s ease-in-out infinite",
                }
              : undefined
          }
        >
          {stat.displayText ?? displayValue}
        </p>

        {/* label */}
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          {stat.label}
        </p>
      </div>
    </div>
  );
}

/* ─── main section ──────────────────────────────────────────────────────── */
const ProblemSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  /* inject keyframes once */
  useEffect(() => { injectStyles(); }, []);

  /* section visibility */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* ── background layers ── */}
      <div className="absolute inset-0 dot-grid-bg opacity-30" />
      <div className="absolute inset-0 noise-overlay opacity-[0.18]" />

      {/* radial gold glow behind headline (left-biased) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 25% 50%, rgba(180,140,60,0.07) 0%, transparent 70%)",
        }}
      />

      {/* noise grain pseudo-layer via SVG filter */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="problem-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          filter: "url(#problem-grain)",
          opacity: 0.04,
          mixBlendMode: "overlay",
        }}
      />

      {/* ── content ── */}
      <div className="max-w-7xl mx-auto px-6">
        {/* two-column flex row */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">

          {/* LEFT — label + headline (60%) */}
          <div className="lg:w-[60%]">
            {/* section label */}
            <p
              className="section-label mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              01 — The Problem
            </p>

            {/* staggered word headline */}
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground max-w-3xl"
              aria-label={HEADLINE}
            >
              {WORDS.map((word, i) => (
                <span
                  key={i}
                  className={`problem-word${isVisible && !prefersReducedMotion ? " revealed" : ""}`}
                  style={
                    isVisible && !prefersReducedMotion
                      ? { animationDelay: `${i * 0.08}s` }
                      : isVisible
                      ? { opacity: 1, transform: "none" }
                      : undefined
                  }
                >
                  {word}
                  {i < WORDS.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </h2>
          </div>

          {/* RIGHT — stats stacked (40%) */}
          <div className="lg:w-[40%]">
            {stats.map((stat, i) => (
              <StatRow key={i} stat={stat} isFirst={i === 0} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
