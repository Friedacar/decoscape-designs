import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight, Phone, Mail, Clock, MessageCircle, Instagram, Facebook } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/testimonials", label: "Testimonials" },
  ];

  const isHome = location === "/";

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* ── NAV ── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled || !isHome
            ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm py-3"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-5 md:px-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 group">
            <span
              className={cn(
                "text-2xl font-serif font-bold tracking-tight transition-colors duration-300",
                isScrolled || !isHome ? "text-foreground" : "text-background"
              )}
            >
              Deco<span className="text-primary">scape</span><span className="text-primary">.</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  location === link.href
                    ? "text-primary"
                    : isScrolled || !isHome
                      ? "text-foreground/70 hover:text-foreground hover:bg-muted"
                      : "text-background/80 hover:text-background hover:bg-background/10"
                )}
              >
                {link.label}
                {location === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+916379662806"
              className={cn(
                "text-sm font-medium transition-colors",
                isScrolled || !isHome ? "text-muted-foreground hover:text-foreground" : "text-background/70 hover:text-background"
              )}
            >
              +91 6379 662 806
            </a>
            <Link href="/enquiry">
              <Button size="sm" className="rounded-full px-5 font-semibold group shadow-lg">
                Free Consultation
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

          <button
            className={cn(
              "md:hidden p-2 rounded-md transition-colors",
              isScrolled || !isHome ? "text-foreground hover:bg-muted" : "text-background hover:bg-background/10"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-background flex flex-col pt-24 px-6 pb-8"
          >
            <nav className="flex flex-col gap-2 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block text-3xl font-serif font-bold py-3 border-b border-border transition-colors",
                      location === link.href ? "text-primary" : "text-foreground hover:text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="space-y-3 pt-6">
              <Link href="/enquiry" className="block">
                <Button size="lg" className="w-full rounded-full h-14 text-base">
                  Get a Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+916379662806" className="block">
                <Button size="lg" variant="outline" className="w-full rounded-full h-14 text-base gap-2">
                  <Phone className="w-4 h-4" />
                  +91 6379 662 806
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-foreground text-background">
        {/* Top CTA strip */}
        <div className="border-b border-background/10 py-10 px-5 md:px-10">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-background/50 text-sm uppercase tracking-widest mb-1">Ready to begin?</p>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-background">
                Transform your space in <span className="text-primary">45 days.</span>
              </h3>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/enquiry">
                <Button size="lg" className="rounded-full px-7 h-12 font-semibold">
                  Start Your Project
                </Button>
              </Link>
              <a href="https://wa.me/916379662806" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="rounded-full px-7 h-12 border-background/20 text-background hover:bg-background/10">
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-5 md:px-10 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="text-2xl font-serif font-bold text-background inline-block mb-4">
                Deco<span className="text-primary">scape</span><span className="text-primary">.</span>
              </Link>
              <p className="text-background/50 text-sm leading-relaxed mb-5">
                Premium interior design for homes and businesses across Chennai, Tamil Nadu.
              </p>
              <div className="flex gap-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="w-9 h-9 rounded-full border border-background/15 flex items-center justify-center text-background/50 hover:text-primary hover:border-primary transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                  className="w-9 h-9 rounded-full border border-background/15 flex items-center justify-center text-background/50 hover:text-primary hover:border-primary transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://wa.me/916379662806" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                  className="w-9 h-9 rounded-full border border-background/15 flex items-center justify-center text-background/50 hover:text-primary hover:border-primary transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-background/90 mb-5 text-xs uppercase tracking-widest">Navigate</h4>
              <ul className="space-y-3">
                {[...navLinks, { href: "/enquiry", label: "Start a Project" }].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-background/50 hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-background/90 mb-5 text-xs uppercase tracking-widest">Services</h4>
              <ul className="space-y-3 text-sm text-background/50">
                {["Residential Design", "Modular Kitchens", "Commercial Spaces", "Renovation", "Design Consultation"].map(s => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-background/90 mb-5 text-xs uppercase tracking-widest">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <a href="mailto:decoscapeofficial@gmail.com" className="text-sm text-background/50 hover:text-primary transition-colors break-all">
                    decoscapeofficial@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <a href="tel:+916379662806" className="text-sm text-background/50 hover:text-primary transition-colors">
                    +91 6379 662 806
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-background/50">Mon – Sat: 9am – 7pm</span>
                </li>
              </ul>
              <div className="mt-5 border-t border-background/10 pt-4">
                <p className="text-background/80 text-xs font-semibold mb-0.5">Franklin Joshua K</p>
                <p className="text-background/40 text-xs">Cauvery Legacy Pvt. Ltd. · Est. 1984</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-background/30">
            <p>&copy; {new Date().getFullYear()} Decoscape. All rights reserved.</p>
            <p>Designed with purpose · Built to last · Chennai, Tamil Nadu</p>
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FAB ── */}
      <a
        href="https://wa.me/916379662806?text=Hi%20Decoscape!%20I%27d%20like%20to%20enquire%20about%20your%20interior%20design%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative w-14 h-14 pulse-ring">
          <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-200 group-hover:scale-110"
            style={{ backgroundColor: "#25D366" }}>
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
        </div>
        {/* Tooltip */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-foreground text-background text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat on WhatsApp
        </div>
      </a>
    </div>
  );
}
