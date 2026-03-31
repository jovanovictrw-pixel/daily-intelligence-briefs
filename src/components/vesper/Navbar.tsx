import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const desktopLinks = ["Product", "Integrations", "Pricing", "Customers"] as const;

  const mobileLinks: Array<{ label: string; href: string }> = [
    { label: "Product", href: "#product" },
    { label: "Sample brief", href: "#sample-brief" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Integrations", href: "#integrations" },
    { label: "Pricing", href: "#pricing" },
    { label: "Customers", href: "#customers" },
  ];

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
          {desktopLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileOpen}
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px]">
                <div className="flex items-center justify-between">
                  <SheetTitle className="font-display tracking-[0.25em] text-primary">VESPER</SheetTitle>
                </div>
                <nav className="mt-8 flex flex-col gap-1">
                  {mobileLinks.map((l) => (
                    <SheetClose asChild key={l.href}>
                      <a
                        href={l.href}
                        className="rounded-md px-3 py-2 font-body text-sm text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        {l.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-8">
                  <SheetClose asChild>
                    <a
                      href="#cta"
                      className="inline-flex w-full items-center justify-center rounded-sm bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      Request Briefing
                    </a>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* CTA */}
          <a
            href="#cta"
            className="relative font-body text-sm font-medium px-5 py-2 border border-primary text-primary rounded-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span className="relative z-10">Request Briefing</span>
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer bg-[length:200%_100%] opacity-0 group-hover:opacity-0"
              style={{ animationDelay: "0.5s" }}
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
