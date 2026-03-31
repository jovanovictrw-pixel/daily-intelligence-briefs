import { useScrollFadeIn } from "@/hooks/use-animations";

const logos = ["Arcola", "Meridian Labs", "Stratum", "Delphi", "Crestline", "Vantis"];

const LogosBar = () => {
  const { ref, isVisible } = useScrollFadeIn();

  return (
    <section
      ref={ref}
      className={`py-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-divider pt-10">
          <p className="font-mono text-[11px] tracking-[0.15em] text-muted-foreground uppercase text-center mb-10">
            Trusted by intelligence-driven teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {logos.map((name) => (
              <span
                key={name}
                className="inline-flex items-center rounded-full border border-divider bg-card/40 px-4 py-2 font-mono-data text-xs tracking-[0.14em] uppercase text-muted-foreground select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogosBar;
