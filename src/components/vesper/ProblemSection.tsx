import { useScrollStaggerIn, useCountUp } from "@/hooks/use-animations";

const stats = [
  { value: 73, suffix: "%", label: "of reps miss competitive intel that existed before the call" },
  { value: 4, suffix: " hrs", label: "The average analyst briefing takes to prepare manually" },
  { value: 0, suffix: "", label: "Critical account signals go unread in dashboards nobody checks", displayText: "∞" },
];

const ProblemSection = () => {
  const { ref, isVisible, itemStyle } = useScrollStaggerIn();

  return (
    <section
      ref={ref}
      className={`relative py-24 overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="absolute inset-0 dot-grid-bg opacity-30" />
      <div className="absolute inset-0 noise-overlay opacity-[0.18]" />

      <div className="max-w-7xl mx-auto px-6">
        <p
          className={`section-label mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          style={itemStyle(0, 140)}
        >
          01 — The Problem
        </p>
        <h2
          className={`font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground max-w-3xl mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={itemStyle(1, 140)}
        >
          Your competitors move fast. Your team is still catching up.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              stat={stat}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={itemStyle(i + 2, 120)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

function StatCard({
  stat,
  className,
  style,
}: {
  stat: typeof stats[number];
  className?: string;
  style?: React.CSSProperties;
}) {
  const { count, ref } = useCountUp(stat.value || 0, 2000, true);

  return (
    <div ref={ref} className={`space-y-4 ${className ?? ""}`} style={style}>
      <p className="font-display text-5xl lg:text-6xl text-primary">
        {stat.displayText ?? `${count}${stat.suffix}`}
      </p>
      <div className="h-px bg-divider" />
      <p className="font-body text-sm text-muted-foreground leading-relaxed">
        {stat.label}
      </p>
    </div>
  );
}

export default ProblemSection;
