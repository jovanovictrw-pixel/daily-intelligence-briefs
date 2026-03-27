import { useScrollFadeIn, useCountUp } from "@/hooks/use-animations";

const stats = [
  { value: 73, suffix: "%", label: "of reps miss competitive intel that existed before the call" },
  { value: 4, suffix: " hrs", label: "The average analyst briefing takes to prepare manually" },
  { value: 0, suffix: "", label: "Critical account signals go unread in dashboards nobody checks", displayText: "∞" },
];

const ProblemSection = () => {
  const { ref, isVisible } = useScrollFadeIn();

  return (
    <section
      ref={ref}
      className={`py-24 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <p className="section-label mb-6">01 — The Problem</p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground max-w-3xl mb-16">
          Your competitors move fast. Your team is still catching up.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

function StatCard({ stat }: { stat: typeof stats[number] }) {
  const { count, ref } = useCountUp(stat.value, 2000, true);

  return (
    <div ref={ref} className="space-y-4">
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
