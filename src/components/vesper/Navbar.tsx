import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/80 border-b border-divider"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8 1.85 0 3.55.63 4.9 1.69A9.981 9.981 0 0 0 12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8c2.32 0 4.41-.99 5.88-2.56A7.94 7.94 0 0 1 12 20z"
              fill="currentColor"
            />
          </svg>
          <span className="font-display text-lg tracking-[0.25em] text-primary font-semibold">
            VESPER
          </span>
        </div>

        {/* Nav Links - hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          {["Product", "Integrations", "Pricing", "Customers"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#cta"
          className="relative font-body text-sm font-medium px-5 py-2 border border-primary text-primary rounded-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 overflow-hidden group"
        >
          <span className="relative z-10">Request Briefing</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer bg-[length:200%_100%] opacity-0 group-hover:opacity-0" style={{ animationDelay: "0.5s" }} />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
