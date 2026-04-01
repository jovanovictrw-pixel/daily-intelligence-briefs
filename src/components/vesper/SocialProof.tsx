import { useScrollStaggerIn } from "@/hooks/use-animations";

const metrics = [
  { value: "3.2×", label: "faster competitive response time" },
  { value: "89%", label: "of reps read their brief daily" },
  { value: "41%", label: "increase in competitive win rate" },
];

const SocialProof = () => {
  const { ref, isVisible, itemStyle } = useScrollStaggerIn();

  return (
    <section
      id="customers"
      ref={ref}
      className={`relative py-24 overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="absolute inset-0 bg-card/50" />
      <div className="absolute inset-0 noise-overlay opacity-[0.16]" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Quote */}
          <div>
            <blockquote
              className={`font-display text-2xl sm:text-3xl lg:text-4xl text-foreground italic leading-snug mb-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={itemStyle(0, 140)}
            >
              "Vesper replaced our Monday morning competitive call. Each rep walks in already briefed."
            </blockquote>
            <div
              className={`flex items-center gap-3 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={itemStyle(1, 140)}
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <span className="font-body text-xs text-primary font-medium">SC</span>
              </div>
              <div>
                <p className="font-body text-sm text-foreground font-medium">Sarah Chen</p>
                <p className="font-body text-xs text-muted-foreground">VP Sales, Arcola Technologies</p>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {metrics.map((m, i) => (
              <div
                key={i}
                className={`text-center sm:text-left space-y-2 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
                style={itemStyle(i + 2, 110)}
              >
                <p className="font-display text-4xl text-primary">{m.value}</p>
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
