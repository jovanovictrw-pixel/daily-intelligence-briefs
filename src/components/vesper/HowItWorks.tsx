import { useScrollStaggerIn } from "@/hooks/use-animations";

const steps = [
  {
    num: "01",
    title: "Connect",
    desc: "Vesper integrates with your CRM, Slack, email, and 10,000+ web sources.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="16" r="4" /><circle cx="24" cy="8" r="4" /><circle cx="24" cy="24" r="4" />
        <path d="M12 14.5L20 9.5M12 17.5L20 22.5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Compile",
    desc: "Every night, Vesper runs role-based research for each person on your team.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="6" width="24" height="20" rx="2" />
        <path d="M4 12h24M10 6v6M16 18h6M16 22h4" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Deliver",
    desc: "A personalized brief lands in Slack or email before 7am. Ask follow-up questions via chat.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 8l12 8 12-8" /><rect x="4" y="8" width="24" height="18" rx="2" />
      </svg>
    ),
  },
];

const HowItWorks = () => {
  const { ref, isVisible, itemStyle } = useScrollStaggerIn();

  return (
    <section
      id="product"
      ref={ref}
      className={`relative py-24 overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="absolute inset-0 bg-card/10" />

      <div className="max-w-7xl mx-auto px-6">
        <p
          className={`section-label mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          style={itemStyle(0, 140)}
        >
          02 — How It Works
        </p>
        <h2
          className={`font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground max-w-3xl mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={itemStyle(1, 140)}
        >
          Intelligence that finds your team — not the other way around.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Dashed connector line - hidden on mobile */}
          <div className="hidden md:block absolute top-[56px] left-[16.66%] right-[16.66%] border-t border-dashed border-primary/30" />

          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative bg-card border border-divider rounded-lg p-8 hover:border-primary/40 transition-all duration-700 hover:-translate-y-0.5 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={itemStyle(i + 2, 140)}
            >
              <div className="text-primary mb-5 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-divider bg-background/50 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <p className="font-mono-data text-xs text-primary tracking-wider mb-2 text-center">{step.num}</p>
              <h3 className="font-display text-xl text-foreground mb-3 text-center">{step.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed text-center">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
