import { useScrollStaggerIn } from "@/hooks/use-animations";

const integrations = [
  "Slack", "Salesforce", "HubSpot", "Gmail", "Notion", "Linear", "Gong", "ZoomInfo",
];

function IntegrationMark({ name }: { name: string }) {
  const boxBase = "w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0";
  const svgBase = "w-5 h-5";

  if (name === "Slack") {
    return (
      <div className={boxBase} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" className={svgBase}>
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A" />
        </svg>
      </div>
    );
  }

  if (name === "Salesforce") {
    return (
      <div className="w-10 h-10 rounded-lg bg-[#00A1E0]/10 flex items-center justify-center shrink-0" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#00A1E0">
          <path d="M9.615 18.648a4.243 4.243 0 0 1-2.867-1.12 4.243 4.243 0 0 1-1.32-2.797 5.31 5.31 0 0 1-2.823-1.736 5.31 5.31 0 0 1 .482-7.148A5.266 5.266 0 0 1 6.63 4.56a5.33 5.33 0 0 1 3.98-1.81 5.33 5.33 0 0 1 3.979 1.81 5.266 5.266 0 0 1 3.543 1.287 5.31 5.31 0 0 1 .482 7.148 5.31 5.31 0 0 1-2.823 1.736 4.243 4.243 0 0 1-1.32 2.797 4.243 4.243 0 0 1-2.856 1.12z"/>
        </svg>
      </div>
    );
  }

  if (name === "HubSpot") {
    return (
      <div className="w-10 h-10 rounded-lg bg-[#FF7A59]/10 flex items-center justify-center shrink-0" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#FF7A59">
          <path d="M18.164 7.93V5.084a1.56 1.56 0 0 0 .898-1.407V3.62a1.56 1.56 0 0 0-1.56-1.56h-.056a1.56 1.56 0 0 0-1.56 1.56v.056a1.56 1.56 0 0 0 .898 1.408V7.93a4.43 4.43 0 0 0-2.114 1.038L7.395 4.9a1.743 1.743 0 1 0-.802.949l6.91 4.029a4.434 4.434 0 0 0-.597 2.219 4.44 4.44 0 0 0 .668 2.34l-1.83 1.83a1.425 1.425 0 0 0-.42-.064 1.44 1.44 0 1 0 1.44 1.44 1.425 1.425 0 0 0-.064-.42l1.812-1.812a4.44 4.44 0 0 0 2.686.9 4.452 4.452 0 1 0-1.033-8.381z"/>
        </svg>
      </div>
    );
  }

  if (name === "Gmail") {
    return (
      <div className="w-10 h-10 rounded-lg bg-[#EA4335]/10 flex items-center justify-center shrink-0" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.548l8.073-6.055C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
        </svg>
      </div>
    );
  }

  if (name === "Notion") {
    return (
      <div className={boxBase} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" className={`${svgBase} text-foreground`}>
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
        </svg>
      </div>
    );
  }

  if (name === "Linear") {
    return (
      <div className="w-10 h-10 rounded-lg bg-[#5E6AD2]/10 flex items-center justify-center shrink-0" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#5E6AD2">
          <path d="M3.464 15.425 .003 3.536 3.536.003l11.89 3.46-11.962 11.962zm.452 1.39L18.013 2.72l3.268 3.268L7.183 20.084l-3.267-3.268zM8.29 20.999l3.267 3.268 11.444-4.708-6.736-6.737L8.29 20.999zm4.196 2.357-3.016-3.017 7.573-7.572 3.016 3.016-7.573 7.573z"/>
        </svg>
      </div>
    );
  }

  if (name === "Gong") {
    return (
      <div className="w-10 h-10 rounded-lg bg-[#FF4F00]/10 flex items-center justify-center shrink-0" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#FF4F00">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4a8 8 0 1 1 0 16A8 8 0 0 1 12 4zm0 2a6 6 0 1 0 0 12A6 6 0 0 0 12 6zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
        </svg>
      </div>
    );
  }

  // ZoomInfo
  return (
    <div className="w-10 h-10 rounded-lg bg-[#003057]/30 flex items-center justify-center shrink-0" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <rect x="1" y="1" width="22" height="22" rx="4" fill="#003057"/>
        <path d="M6 7.5h12L6 16.5h12" stroke="#00AEEF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

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
          {integrations.map((name, i) => (
            <div
              key={name}
              className={`bg-card border border-divider rounded-lg p-5 flex items-center gap-3 hover:border-primary/40 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={itemStyle(i + 2, 80)}
            >
              <IntegrationMark name={name} />
              <span className="font-body text-sm text-foreground">{name}</span>
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
