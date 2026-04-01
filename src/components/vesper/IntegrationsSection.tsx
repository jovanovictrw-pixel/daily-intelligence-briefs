import { useScrollStaggerIn } from "@/hooks/use-animations";

const integrations = [
  { name: "Slack",       logo: "https://cdn.simpleicons.org/slack/E01E5A" },
  { name: "Salesforce",  logo: "https://cdn.simpleicons.org/salesforce/00A1E0" },
  { name: "HubSpot",     logo: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "Gmail",       logo: "https://cdn.simpleicons.org/gmail/EA4335" },
  { name: "Notion",      logo: "https://cdn.simpleicons.org/notion/ffffff" },
  { name: "Linear",      logo: "https://cdn.simpleicons.org/linear/5E6AD2" },
  { name: "Gong",        logo: "https://cdn.simpleicons.org/gong/FF4F00" },
  { name: "ZoomInfo",    logo: "https://cdn.simpleicons.org/zoominfo/00AEEF" },
];


const IntegrationsSection = () => {
  const { ref, isVisible, itemStyle } = useScrollStaggerIn();

  return (
    <section
      id="integrations"
      ref={ref}
      className={`relative py-24 overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="absolute inset-0 bg-card/10" />
      <div className="absolute inset-0 dot-grid-bg opacity-20" />

      <div className="max-w-7xl mx-auto px-6">
        <p
          className={`section-label mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          style={itemStyle(0, 120)}
        >
          04 — Integrations
        </p>
        <h2
          className={`font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground max-w-3xl mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={itemStyle(1, 120)}
        >
          Works where your team already lives.
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {integrations.map((integration, i) => (
            <div
              key={integration.name}
              className={`bg-card border border-divider rounded-lg p-5 flex items-center gap-3 hover:border-primary/40 transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={itemStyle(i + 2, 80)}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-muted">
                <img
                  src={integration.logo}
                  alt={integration.name}
                  className="w-6 h-6 object-contain"
                />
              </div>
              <span className="font-body text-sm text-foreground">{integration.name}</span>
            </div>
          ))}
        </div>

        <p
          className={`font-body text-sm text-muted-foreground mt-8 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          style={itemStyle(integrations.length + 3, 80)}
        >
          Plus 200+ sources via our open API.
        </p>
      </div>
    </section>
  );
};

export default IntegrationsSection;
