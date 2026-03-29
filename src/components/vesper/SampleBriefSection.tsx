const SampleBriefSection = () => {
  return (
    <section id="sample-brief" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="section-label mb-6">02A — Sample Brief</p>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-3">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground max-w-3xl">
              A briefing your team actually reads.
            </h2>
            <p className="font-body text-base text-muted-foreground mt-6 max-w-xl leading-relaxed">
              A single page of signal, tailored by role — competitor moves, buyer intent, and account-level activity.
              Delivered before 7am.
            </p>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-card border border-divider rounded-lg overflow-hidden shadow-2xl shadow-primary/5">
              <div className="h-[2px] bg-gradient-to-r from-primary via-primary/60 to-transparent" />
              <div className="p-5 space-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.15em] text-primary uppercase">
                      Vesper Daily Brief
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
                      March 27, 2026 · 6:47 AM
                    </p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="space-y-4">
                  {[
                    {
                      section: "Market Movement",
                      items: [
                        "Competitor X announced new enterprise packaging; pricing page updated within last 24h.",
                        "Hiring spike: +12 open roles across Solutions + RevOps in the last week.",
                      ],
                    },
                    {
                      section: "Buyer Signals",
                      items: [
                        "3 target accounts researching “data room security” and “SOC2 vendor risk” this week.",
                        "Account Y visited your /pricing page twice after reading a competitor comparison.",
                      ],
                    },
                    {
                      section: "Account Activity",
                      items: [
                        "Champion at Account Z changed titles; likely budget owner shift — follow up suggested.",
                        "New procurement thread detected in inbox; recommended next step drafted.",
                      ],
                    },
                  ].map((block) => (
                    <div key={block.section}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        <p className="font-mono text-[10px] tracking-[0.12em] text-primary uppercase font-medium">
                          {block.section}
                        </p>
                      </div>
                      <div className="space-y-1.5 pl-3 border-l border-divider">
                        {block.items.map((item) => (
                          <p key={item} className="font-body text-[11px] text-muted-foreground leading-relaxed">
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SampleBriefSection;

