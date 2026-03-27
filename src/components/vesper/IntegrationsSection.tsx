import { useScrollFadeIn } from "@/hooks/use-animations";

const integrations = [
  "Slack", "Salesforce", "HubSpot", "Gmail", "Notion", "Linear", "Gong", "ZoomInfo",
];

const IntegrationsSection = () => {
  const { ref, isVisible } = useScrollFadeIn();

  return (
    <section
      id="integrations"
      ref={ref}
      className={`py-24 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <p className="section-label mb-6">04 — Integrations</p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground max-w-3xl mb-16">
          Works where your team already lives.
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {integrations.map((name) => (
            <div
              key={name}
              className="bg-card border border-divider rounded-lg p-5 flex items-center gap-3 hover:border-primary/40 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                <span className="font-mono text-xs text-primary font-medium">
                  {name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="font-body text-sm text-foreground">{name}</span>
            </div>
          ))}
        </div>

        <p className="font-body text-sm text-muted-foreground mt-8 text-center">
          Plus 200+ sources via our open API.
        </p>
      </div>
    </section>
  );
};

export default IntegrationsSection;
