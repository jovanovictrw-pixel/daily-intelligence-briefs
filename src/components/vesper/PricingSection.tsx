import { useScrollStaggerIn } from "@/hooks/use-animations";

const plans = [
  {
    name: "Starter",
    price: "$299",
    period: "/mo",
    desc: "Up to 10 seats",
    features: ["Daily personalized briefs", "Competitor tracking (3 competitors)", "Slack & email delivery", "Basic CRM integration", "Community support"],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$799",
    period: "/mo",
    desc: "Up to 50 seats",
    features: ["Everything in Starter", "Unlimited competitors", "Ask Vesper (AI follow-up)", "CRM auto-enrichment", "Executive weekly digest", "Priority support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Unlimited seats",
    features: ["Everything in Growth", "Custom source integrations", "SSO & advanced security", "Dedicated success manager", "Custom briefing templates", "SLA guarantee"],
    highlighted: false,
  },
];

const PricingSection = () => {
  const { ref, isVisible, itemStyle } = useScrollStaggerIn();

  return (
    <section
      id="pricing"
      ref={ref}
      className={`relative py-24 overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="absolute inset-0 bg-card/20" />
      <div className="absolute inset-0 noise-overlay opacity-[0.22]" />

      <div className="max-w-7xl mx-auto px-6">
        <p
          className={`section-label mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          style={itemStyle(0, 120)}
        >
          05 — Pricing
        </p>
        <h2
          className={`font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground max-w-3xl mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={itemStyle(1, 120)}
        >
          Priced per team, not per seat chaos.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`bg-card rounded-lg p-8 flex flex-col transition-all duration-700 hover:-translate-y-0.5 ${
                plan.highlighted
                  ? "border-2 border-primary shadow-lg shadow-primary/10"
                  : "border border-divider hover:border-primary/30"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={itemStyle(i + 2, 90)}
            >
              {plan.highlighted && (
                <span className="font-mono text-[10px] tracking-[0.15em] text-primary uppercase mb-4">
                  Recommended
                </span>
              )}
              <h3 className="font-display text-2xl text-foreground">{plan.name}</h3>
              <div className="mt-4 mb-2">
                <span className="font-display text-4xl text-foreground">{plan.price}</span>
                <span className="font-body text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <p className="font-body text-sm text-muted-foreground mb-8">{plan.desc}</p>

              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-body text-sm text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`mt-8 text-center font-body text-sm font-medium py-3 rounded-sm transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-divider text-foreground hover:border-primary/40"
                }`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
