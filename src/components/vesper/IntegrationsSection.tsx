import { useScrollStaggerIn } from "@/hooks/use-animations";

const integrations = [
  { name: "Slack",      logo: "https://logo.clearbit.com/slack.com",      domain: "slack.com" },
  { name: "Salesforce", logo: "https://logo.clearbit.com/salesforce.com", domain: "salesforce.com" },
  { name: "HubSpot",    logo: "https://logo.clearbit.com/hubspot.com",    domain: "hubspot.com" },
  { name: "Gmail",      logo: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico", domain: "gmail.com" },
  { name: "Notion",     logo: "https://logo.clearbit.com/notion.so",      domain: "notion.so" },
  { name: "Linear",     logo: "https://logo.clearbit.com/linear.app",     domain: "linear.app" },
  { name: "Gong",       logo: "https://logo.clearbit.com/gong.io",        domain: "gong.io" },
  { name: "ZoomInfo",   logo: "https://logo.clearbit.com/zoominfo.com",   domain: "zoominfo.com" },
];

const IntegrationsSection = () => {
  const { ref, isVisible, itemStyle } = useScrollStaggerIn();

  return (
    <section
      id="integrations"
      ref={ref}
      className={`relative fluid-py transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="absolute inset-0 bg-card/10" />
      <div className="absolute inset-0 dot-grid-bg opacity-20" />

      <div className="max-w-7xl mx-auto fluid-px">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
                  alt={`${integration.name} logo`}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes("google.com/s2/favicons")) {
                      target.src = `https://www.google.com/s2/favicons?domain=${integration.domain}&sz=64`;
                    }
                  }}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    objectFit: "contain",
                  }}
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