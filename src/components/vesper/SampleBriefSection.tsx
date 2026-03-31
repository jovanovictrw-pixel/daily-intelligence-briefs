import { useScrollFadeIn } from "@/hooks/use-animations";

const SampleBriefSection = () => {
  const { ref, isVisible } = useScrollFadeIn(0.15);

  return (
    <section
      id="sample-brief"
      ref={ref}
      className={`relative py-24 overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* Subtle band + noise to differentiate from hero */}
      <div className="absolute inset-0 bg-card/30" />
      <div className="absolute inset-0 noise-overlay opacity-[0.35]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <p className="section-label mb-6">Sample Brief</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
              A briefing your team actually reads.
            </h2>
            <p className="font-body text-base text-muted-foreground mt-6 max-w-xl leading-relaxed">
              A single page of signal, tailored by role — competitor moves, buyer intent, and account-level activity.
              Delivered before 7am.
            </p>

            <div className="mt-10 space-y-6">
              <div className="rounded-lg border border-divider bg-background/40 p-6">
                <p className="font-mono-data text-[11px] tracking-[0.15em] text-primary uppercase mb-3">TL;DR</p>
                <ul className="space-y-2">
                  {[
                    "A top competitor quietly changed enterprise packaging overnight.",
                    "Three target accounts are researching SOC2 vendor risk this week.",
                    "A key champion changed roles — likely a budget owner shift.",
                  ].map((t) => (
                    <li key={t} className="font-body text-sm text-muted-foreground leading-relaxed flex gap-2">
                      <span className="mt-2 inline-block w-1 h-1 rounded-full bg-primary shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-divider bg-background/40 p-6">
                <p className="font-mono-data text-[11px] tracking-[0.15em] text-primary uppercase mb-3">
                  Top 3 recommended actions
                </p>
                <ol className="space-y-2">
                  {[
                    "Message AEs with a 2‑line competitor packaging summary + objection handle.",
                    "Trigger an outreach sequence for the 3 in-market accounts (pricing page revisits).",
                    "Draft a champion follow-up email and attach a “new procurement thread” recap.",
                  ].map((t, i) => (
                    <li key={t} className="font-body text-sm text-muted-foreground leading-relaxed flex gap-3">
                      <span className="font-mono-data text-xs text-primary mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-card border border-divider rounded-lg overflow-hidden shadow-2xl shadow-primary/5">
              <div className="h-[2px] bg-gradient-to-r from-primary via-primary/60 to-transparent" />
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <p className="font-mono-data text-[10px] tracking-[0.15em] text-primary uppercase">
                      Sample daily brief
                    </p>
                    <p className="font-body text-sm text-muted-foreground mt-1">
                      Editorial spacing + clearer actionability (not a duplicate of the hero card).
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full border border-divider bg-background/50 px-2.5 py-1 font-mono-data text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                      RevOps
                    </span>
                    <span className="inline-flex items-center rounded-full border border-divider bg-background/50 px-2.5 py-1 font-mono-data text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                      Americas
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Market movement",
                      detail:
                        "Competitor X announced new enterprise packaging; pricing page changed within 24h. Hiring spike across Solutions + RevOps suggests an expansion motion.",
                      tag: "Pricing + Hiring",
                    },
                    {
                      title: "Buyer signals",
                      detail:
                        "Three target accounts searched “data room security” and “SOC2 vendor risk” this week. One account revisited /pricing after reading a competitor comparison.",
                      tag: "Intent + Web",
                    },
                    {
                      title: "Account activity",
                      detail:
                        "Champion at Account Z changed titles; likely budget owner shift. New procurement thread detected in inbox; suggested next step drafted.",
                      tag: "CRM + Email",
                    },
                    {
                      title: "Why it matters",
                      detail:
                        "This is the moment to reframe value: security posture + risk reduction. Use the packaging change as a wedge and get ahead of procurement with proof points.",
                      tag: "Narrative",
                    },
                  ].map((block) => (
                    <div key={block.title} className="rounded-lg border border-divider bg-background/40 p-5">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <p className="font-mono-data text-[10px] tracking-[0.15em] text-primary uppercase">
                          {block.title}
                        </p>
                        <span className="font-mono-data text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                          {block.tag}
                        </span>
                      </div>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        {block.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-divider">
                  <p className="font-mono-data text-[10px] tracking-[0.15em] text-muted-foreground uppercase mb-3">
                    Sample sources
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Pricing pages", "Job boards", "G2 reviews", "Email threads", "CRM changes", "News + press"].map(
                      (s) => (
                        <span
                          key={s}
                          className="inline-flex items-center rounded-full border border-divider bg-background/50 px-3 py-1 font-body text-xs text-muted-foreground"
                        >
                          {s}
                        </span>
                      )
                    )}
                  </div>
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

