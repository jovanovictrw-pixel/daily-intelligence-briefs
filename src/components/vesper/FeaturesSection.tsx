import { useScrollFadeIn } from "@/hooks/use-animations";

const features = [
  {
    title: "Role-Personalized Briefs",
    desc: "AEs see account intel. PMs see product signals. Execs see market movement. Every brief is unique.",
    span: "lg:col-span-2",
  },
  {
    title: "Competitor Tracking",
    desc: "Pricing changes, hiring surges, press releases, G2 reviews. All surfaced automatically.",
    span: "lg:col-span-1",
  },
  {
    title: "Buyer Signal Detection",
    desc: "Know when target accounts are searching topics you own. Intent data, decoded.",
    span: "lg:col-span-1",
  },
  {
    title: "Ask Vesper",
    desc: "Conversational follow-up on any brief item. Dig deeper on any signal. Powered by Claude.",
    span: "lg:col-span-2",
  },
  {
    title: "CRM Auto-Enrichment",
    desc: "Briefing insights pushed directly into Salesforce or HubSpot contact and account records.",
    span: "lg:col-span-1",
  },
  {
    title: "Executive Digest",
    desc: "Weekly roll-up for leadership. Board-ready summaries auto-generated from team intelligence.",
    span: "lg:col-span-2",
  },
];

const FeaturesSection = () => {
  const { ref, isVisible } = useScrollFadeIn();

  return (
    <section
      ref={ref}
      className={`py-24 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <p className="section-label mb-6">03 — Capabilities</p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground max-w-3xl mb-16">
          Built for teams who can't afford to be surprised.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className={`${f.span} bg-card border border-divider rounded-lg p-8 hover:border-primary/50 transition-all duration-300 hover:-translate-y-0.5 group`}
            >
              <h3 className="font-display text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                {f.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
