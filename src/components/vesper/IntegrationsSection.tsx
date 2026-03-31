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
      <div className={boxBase} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="#00A1E0" className={svgBase}>
          <path d="M10.003 4.56c.937-1 2.25-1.56 3.5-1.56 1.69 0 3.19.875 4.063 2.25.687-.312 1.437-.5 2.25-.5 3 0 5.187 2.5 5.187 5.5 0 3.063-2.375 5.5-5.375 5.5H6.625C3.563 15.75 1 13.25 1 10.125 1 7.25 3.063 4.875 5.813 4.5c.562-1.875 2.312-3.5 4.19-3.5z" />
        </svg>
      </div>
    );
  }

  if (name === "HubSpot") {
    return (
      <div className={boxBase} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="#FF7A59" className={svgBase}>
          <path d="M22.006 9.386a3.948 3.948 0 0 0-3.198-3.864v-1.7A2.064 2.064 0 0 0 20.044 2a2.072 2.072 0 0 0-2.072-2 2.072 2.072 0 0 0-2.072 2c0 .822.49 1.534 1.198 1.858v1.68a3.947 3.947 0 0 0-2.396 1.264L7.428 2.308a2.945 2.945 0 0 0 .08-.666 2.964 2.964 0 0 0-2.962-2.964A2.964 2.964 0 0 0 1.584 1.64 2.964 2.964 0 0 0 4.546 4.6c.546 0 1.056-.15 1.496-.41l7.202 4.412a3.94 3.94 0 0 0-.466 1.84 3.95 3.95 0 0 0 .612 2.126L10.9 15.06a2.5 2.5 0 0 0-.748-.118 2.52 2.52 0 0 0-2.516 2.518 2.52 2.52 0 0 0 2.516 2.518 2.52 2.52 0 0 0 2.516-2.518c0-.298-.056-.582-.15-.848l2.468-2.97a3.946 3.946 0 0 0 4.82-5.256z" />
        </svg>
      </div>
    );
  }

  if (name === "Gmail") {
    return (
      <div className={boxBase} aria-hidden="true">
        <svg viewBox="0 0 24 24" className={svgBase}>
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335" />
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
      <div className={boxBase} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="#5E6AD2" className={svgBase}>
          <path d="M.464 13.838L10.16 23.535a12.018 12.018 0 0 1-9.696-9.697zM0 11.08L12.92 24a12.022 12.022 0 0 1-1.6.107A12.025 12.025 0 0 1 0 12.508V11.08zM1.35 6.54l16.11 16.11A12.054 12.054 0 0 1 13.92 24L0 10.08V7.893c.426-.463.888-.9 1.35-1.353zM4.71 3.18l16.11 16.11a12.075 12.075 0 0 1-3.538 1.35L3.18 4.53c.482-.478.985-.924 1.53-1.35zM7.893 1.35l14.758 14.758a12.044 12.044 0 0 1-1.354 3.537L6.54 4.882c.43-.56.888-1.082 1.353-1.532zm4.188-1.35a12.025 12.025 0 0 1 9.92 9.92L12.08 0zm2.828.464L24 9.919v1.6A12.022 12.022 0 0 1 23.893 13L13.508 0z" />
        </svg>
      </div>
    );
  }

  if (name === "Gong") {
    return (
      <div className={boxBase} aria-hidden="true">
        <svg viewBox="0 0 24 24" stroke="#FF4F00" fill="none" strokeWidth="2" strokeLinecap="round" className={svgBase}>
          <path d="M2 12c0-2.5 1.5-4 3.5-4s3.5 1.5 3.5 4-1.5 4-3.5 4S2 14.5 2 12z" />
          <path d="M15 8v8M19 6v12M23 10v4" />
        </svg>
      </div>
    );
  }

  // ZoomInfo
  return (
    <div className={boxBase} aria-hidden="true">
      <svg viewBox="0 0 24 24" className={svgBase}>
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#003057" />
        <path d="M7 8h10L7 16h10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
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
      className={`py-24 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
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
