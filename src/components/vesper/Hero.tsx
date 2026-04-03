import { useTypewriter } from "@/hooks/use-typewriter";
import { useScrollFadeIn } from "@/hooks/use-animations";

const Hero = () => {
  const { displayedLines, isTyping } = useTypewriter(25, 2500);
  const { ref, isVisible } = useScrollFadeIn(0.1);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid-bg opacity-40" />

      {/* Radial gold glow */}
      <div className="absolute top-1/2 right-[30%] -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Left column - Headline & CTA */}
        <div className="lg:col-span-3 space-y-8 text-center sm:text-left">
          <h1 className="font-display text-[clamp(2.5rem,8vw,4rem)] sm:text-5xl lg:text-7xl font-semibold leading-[1.1] text-foreground">
            Your team's intelligence briefing.{" "}
            <span className="text-primary italic">Automated.</span>
          </h1>

          <p className="font-body text-base sm:text-lg text-muted-foreground sm:max-w-xl mx-auto sm:mx-0 leading-relaxed">
            Every morning, every person on your revenue team wakes up to a
            personalized brief — competitor moves, buyer signals, account
            activity — compiled overnight from 10,000+ sources. No dashboards.
            No digging. Just the signal that matters to them.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
            <a
              href="#cta"
              className="font-body text-sm font-semibold px-7 py-3 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Request Early Access
            </a>
            <a
              href="#sample-brief"
              className="font-body text-sm text-primary hover:text-foreground transition-colors group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              See a sample brief{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* Right column - animated briefing card */}
        <div className="lg:col-span-2 mt-8 sm:mt-0 max-w-md mx-auto lg:max-w-none">
          <div className="relative mt-8 sm:mt-0">
            <div className="bg-card border border-divider rounded-lg overflow-hidden shadow-2xl shadow-primary/5">
              {/* Gold top border */}
              <div className="h-[2px] bg-gradient-to-r from-primary via-primary/60 to-transparent" />

              <div className="p-5 space-y-1">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.15em] text-primary uppercase">
                      Vesper Daily Brief
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
                      March 27, 2026 · 6:47 AM
                    </p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* Briefing sections */}
                <div className="space-y-4">
                  {displayedLines.map((section, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        <p className="font-mono text-[10px] tracking-[0.12em] text-primary uppercase font-medium">
                          {section.section}
                        </p>
                      </div>
                      <div className="space-y-1.5 pl-3 border-l border-divider">
                        {section.items.map((item, j) => (
                          <p
                            key={j}
                            className="font-body text-[11px] text-muted-foreground leading-relaxed"
                          >
                            {item}
                            {isTyping &&
                              i === displayedLines.length - 1 &&
                              j === section.items.length - 1 && (
                                <span className="inline-block w-[5px] h-[12px] bg-primary ml-0.5 align-middle" style={{ animation: "typewriter-blink 0.8s step-end infinite" }} />
                              )}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}

                  {displayedLines.length === 0 && (
                    <div className="h-20 flex items-center justify-center">
                      <span className="inline-block w-[6px] h-[14px] bg-primary" style={{ animation: "typewriter-blink 0.8s step-end infinite" }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
