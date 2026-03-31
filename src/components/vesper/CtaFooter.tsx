import { useScrollFadeIn } from "@/hooks/use-animations";
import { useState } from "react";

const CtaFooter = () => {
  const { ref, isVisible } = useScrollFadeIn();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    const nextEmail = email.trim();
    if (!nextEmail) {
      setError("Please enter your email.");
      setStatus("idle");
      return;
    }

    if (!isValidEmail(nextEmail)) {
      setError("Please enter a valid email address.");
      setStatus("idle");
      return;
    }

    setError(null);
    setStatus("loading");

    await new Promise((r) => setTimeout(r, 650));

    setStatus("success");
    setEmail("");
  };

  return (
    <>
      {/* CTA Section */}
      <section
        id="cta"
        ref={ref}
        className={`relative py-32 overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {/* Radial gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/8 rounded-full blur-[150px]" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Start your team's first briefing.
          </h2>
          <p className="font-body text-base text-muted-foreground mb-10 max-w-lg mx-auto">
            Early access is limited. Join the waitlist and get your first brief free.
          </p>

          <form
            onSubmit={onSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
                if (status === "success") setStatus("idle");
              }}
              aria-invalid={!!error}
              aria-describedby={error ? "cta-email-error" : status === "success" ? "cta-email-success" : undefined}
              disabled={status === "loading"}
              className="flex-1 px-4 py-3 bg-card border border-divider rounded-sm font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-primary text-primary-foreground font-body text-sm font-semibold rounded-sm hover:bg-primary/90 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60"
            >
              {status === "loading" ? "Requesting…" : "Request Access"}
            </button>
          </form>

          {error && (
            <p
              id="cta-email-error"
              role="alert"
              className="mt-3 font-body text-sm text-destructive max-w-md mx-auto text-left"
            >
              {error}
            </p>
          )}

          {status === "success" && !error && (
            <p
              id="cta-email-success"
              role="status"
              aria-live="polite"
              className="mt-3 font-body text-sm text-emerald-400 max-w-md mx-auto text-left"
            >
              You're on the list — we'll reach out soon.
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-divider py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8 1.85 0 3.55.63 4.9 1.69A9.981 9.981 0 0 0 12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8c2.32 0 4.41-.99 5.88-2.56A7.94 7.94 0 0 1 12 20z"
                  fill="currentColor"
                />
              </svg>
              <span className="font-display text-sm tracking-[0.25em] text-primary font-semibold">VESPER</span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-6">
              {[
                { label: "Product", href: "#product" },
                { label: "Sample", href: "#sample-brief" },
                { label: "Capabilities", href: "#capabilities" },
                { label: "Integrations", href: "#integrations" },
                { label: "Pricing", href: "#pricing" },
                { label: "Customers", href: "#customers" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="X"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-divider text-center">
            <p className="font-body text-xs text-muted-foreground">
              © 2026 Vesper Intelligence Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CtaFooter;
