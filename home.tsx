import { SEO } from "@/components/seo";
import { Layout } from "@/components/layout";
import { useGetFeaturedTestimonials } from "@workspace/api-client-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Star, ChevronRight, Phone, Clock, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { useRef, useEffect, useState } from "react";

function CountUp({ end, suffix = "", duration = 2200 }: { end: number; suffix?: string; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = Date.now();
        const tick = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * end));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
}

const MARQUEE_ITEMS = [
  "Residential Interiors", "Modular Kitchens", "Commercial Spaces",
  "Full Renovation", "Design Consultation", "45-Day Handover",
  "Chennai's #1 Rated", "German Hardware", "Luxury Finishes",
];

export default function Home() {
  const { data: testimonials = [] } = useGetFeaturedTestimonials();
  const [activeRoom, setActiveRoom] = useState("All");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 700], ["0%", "18%"]);

  const rooms = ["All", "Kitchen", "Living Room", "Office", "Hospitality"];

  const portfolioItems = [
    { img: "/images/portfolio-residential.png",  title: "Luxury 3BHK",          location: "Adyar",        type: "Living Room",  sqft: "1,850 sq ft",  span: "lg:col-span-7" },
    { img: "/images/modular-kitchen-modern.png", title: "Scandinavian Kitchen",  location: "Porur",        type: "Kitchen",      sqft: "Full Kitchen", span: "lg:col-span-5" },
    { img: "/images/portfolio-office-2.png",     title: "Tech Startup HQ",       location: "Sholinganallur", type: "Office",     sqft: "6,000 sq ft",  span: "lg:col-span-4" },
    { img: "/images/portfolio-hospitality-2.png",title: "Restaurant & Bar",      location: "Nungambakkam", type: "Hospitality",  sqft: "1,600 sq ft",  span: "lg:col-span-4" },
    { img: "/images/portfolio-residential-2.png",title: "Contemporary Villa",    location: "Velachery",    type: "Living Room",  sqft: "4,500 sq ft",  span: "lg:col-span-4" },
  ];

  const filtered = activeRoom === "All" ? portfolioItems : portfolioItems.filter(p => p.type === activeRoom);

  const steps = [
    { icon: <Phone className="w-6 h-6" />, num: "01", title: "Consultation", desc: "We visit your space, understand your vision, budget, and lifestyle preferences." },
    { icon: <Zap className="w-6 h-6" />, num: "02", title: "3D Design", desc: "Get a photorealistic 3D walkthrough of your space before a single nail is driven." },
    { icon: <CheckCircle className="w-6 h-6" />, num: "03", title: "Execution", desc: "Our in-house team handles procurement, fabrication, and installation end-to-end." },
    { icon: <Shield className="w-6 h-6" />, num: "04", title: "Handover", desc: "Your dream space, delivered on time. Guaranteed. Every time. 45-day promise." },
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Decoscape Interior Design",
    "email": "decoscapeofficial@gmail.com",
    "telephone": "+916379662806",
    "areaServed": ["Chennai", "Tambaram", "OMR", "ECR", "Anna Nagar", "Velachery", "Adyar", "T. Nagar"],
    "address": { "@type": "PostalAddress", "addressLocality": "Chennai", "addressRegion": "Tamil Nadu", "addressCountry": "IN" },
    "founder": { "@type": "Person", "name": "Franklin Joshua K" },
    "parentOrganization": { "@type": "Organization", "name": "Cauvery Legacy Pvt. Ltd.", "foundingDate": "1984" }
  };

  return (
    <Layout>
      <SEO
        title="Premium Interior Design Chennai — 45-Day Handover"
        description="Decoscape transforms homes and offices in Chennai, Tamil Nadu. Modular kitchens, luxury interiors, and complete renovations — delivered in 45 days. Call +91 6379 662 806."
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      {/* ══════════════════════════════════════════ HERO ══ */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] flex items-end overflow-hidden">
        {/* Parallax image */}
        <motion.div className="absolute inset-0 -top-[10%]" style={{ y: heroImageY }}>
          <img
            src="/images/hero.png"
            alt="Premium interior design Chennai"
            className="w-full h-[110%] object-cover object-center"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/60 to-foreground/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-5 md:px-10 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <h1 className="font-serif font-bold text-background leading-[1.04] mb-6"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}>
              Design That<br />
              <em className="text-primary not-italic">Moves You.</em>
            </h1>

            {/* Location tag — below headline, not overlapping nav */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: "#4ade80" }} />
              <p className="text-sm font-semibold tracking-wide" style={{ color: "#86efac" }}>
                Chennai's #1 Rated Interior Studio · Tamil Nadu
              </p>
            </div>

            <p className="text-background/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Premium interiors for homes &amp; businesses across Chennai — one team, one guarantee, zero compromises.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/enquiry">
                <Button size="lg" className="h-14 px-8 rounded-full text-base font-bold group shadow-2xl">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  size="lg"
                  variant="ghost"
                  className="h-14 px-8 rounded-full text-base border border-background/25 text-background hover:bg-background/12 backdrop-blur-sm"
                >
                  View Portfolio
                </Button>
              </Link>
            </div>

            {/* Social proof chips */}
            <div className="flex flex-wrap gap-3 mt-10">
              {["500+ Projects", "Trusted since 1984", "4.9 ★ Rating"].map((chip, i) => (
                <span key={i} className="text-xs font-medium bg-background/10 backdrop-blur border border-background/15 text-background/70 px-3 py-1.5 rounded-full">
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll mouse */}
        <div className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-background/30 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-background/50" />
          </motion.div>
          <span className="text-background/40 text-xs tracking-widest uppercase writing-vertical">Scroll</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════ MARQUEE ══ */}
      <div className="bg-primary overflow-hidden py-3.5">
        <div className="animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 text-primary-foreground font-semibold text-sm tracking-wider uppercase mx-0">
              {item}
              <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/40 shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════ STATS ══ */}
      <section className="bg-foreground py-16">
        <div className="container mx-auto px-5 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { end: 500, suffix: "+", label: "Projects Completed", sub: "Across Chennai & TN" },
              { end: 45, suffix: "", label: "Day Handover", sub: "Guaranteed always" },
              { end: 40, suffix: "+", label: "Years of Legacy", sub: "Cauvery Legacy Pvt. Ltd." },
              { end: 98, suffix: "%", label: "On-time Delivery", sub: "Industry-leading record" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="text-center md:border-r border-background/10 last:border-0 px-4"
              >
                <p className="text-5xl md:text-6xl font-serif font-bold text-primary mb-1">
                  <CountUp end={s.end} suffix={s.suffix} />
                </p>
                <p className="text-background font-bold text-sm mb-1">{s.label}</p>
                <p className="text-background/40 text-xs">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ FEATURED WORK / BENTO ══ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-5 md:px-10">
          {/* Header + room filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Portfolio</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                Spaces we've<br />transformed
              </h2>
            </div>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/60 hover:text-foreground transition-colors group shrink-0">
              View all projects
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Room filter pills */}
          <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
            {rooms.map(room => (
              <button
                key={room}
                onClick={() => setActiveRoom(room)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeRoom === room
                    ? "bg-foreground text-background shadow-md"
                    : "bg-secondary text-foreground/60 hover:bg-secondary/80"
                }`}
              >
                {room}
              </button>
            ))}
          </div>

          {/* Bento grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoom}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4"
            >
              {filtered.slice(0, 5).map((item, i) => (
                <motion.div
                  key={item.title + item.location}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-secondary sm:col-span-1 ${item.span} ${i === 0 ? "h-72 md:h-80 lg:h-[400px]" : "h-64 md:h-72 lg:h-[260px]"}`}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading={i === 0 ? "eager" : "lazy"}
                    style={{ scale: "1" }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Location chip */}
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full text-foreground translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {item.location}, Chennai
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">{item.type} · {item.sqft}</p>
                    <h3 className="text-white text-xl font-serif font-bold">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p>No projects in this category yet. <Link href="/portfolio" className="text-primary underline">View all</Link></p>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════ HOW WE WORK ══ */}
      <section className="py-24 bg-secondary/40 overflow-hidden">
        <div className="container mx-auto px-5 md:px-10">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Process</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">How We Work</h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="relative flex flex-col items-center text-center md:items-center"
              >
                {/* Step circle */}
                <div className="w-[72px] h-[72px] rounded-full bg-background border-2 border-primary/20 flex items-center justify-center mb-6 shadow-lg relative z-10 group-hover:border-primary transition-colors">
                  <span className="text-xl font-serif font-bold text-primary">{step.num}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/enquiry">
              <Button size="lg" className="rounded-full px-10 h-14 text-base font-bold group shadow-xl">
                Book a Free Consultation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ KITCHEN SPOTLIGHT ══ */}
      <section className="py-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Image side */}
          <div className="relative overflow-hidden h-72 lg:h-auto">
            <motion.img
              initial={{ scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              src="/images/modular-kitchen.png"
              alt="Premium modular kitchen Chennai"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
            {/* Price badge */}
            <div className="absolute bottom-6 left-6 bg-background/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-xl">
              <p className="text-xs text-muted-foreground font-medium mb-0.5">Modular Kitchens starting at</p>
              <p className="text-2xl font-serif font-bold text-primary">₹1.5 Lakh</p>
            </div>
          </div>

          {/* Content side */}
          <div className="bg-foreground flex items-center">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-10 md:p-16 max-w-lg"
            >
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Most Popular Service</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-background leading-tight mb-6">
                Modular Kitchens &amp; Wardrobes — Built to Last Decades
              </h2>
              <p className="text-background/60 leading-relaxed mb-8">
                Marine-grade boards, German soft-close hardware, and surfaces that outlast trends. Designed, manufactured, and installed by our in-house team — maximising every square foot.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Handleless & Shaker door profiles",
                  "Quartz, granite & acrylic countertops",
                  "Modular wardrobes — sliding & hinged",
                  "Designed, made & installed in 15 days",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-background/70">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/enquiry?service=modular">
                <Button size="lg" className="rounded-full px-8 h-13 font-bold group">
                  Get a Free Kitchen Quote
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ TESTIMONIALS ══ */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-5 md:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Reviews</p>
                <h2 className="text-4xl md:text-5xl font-serif font-bold">Client Stories</h2>
              </div>
              <Link href="/testimonials" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/60 hover:text-foreground transition-colors group shrink-0">
                Read all reviews <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Horizontal scroll on mobile, grid on desktop */}
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto no-scrollbar pb-4 md:pb-0 snap-x snap-mandatory">
              {testimonials.slice(0, 4).map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="shrink-0 w-[80vw] sm:w-[60vw] md:w-auto bg-card border border-border rounded-2xl p-6 shadow-sm snap-center hover:shadow-md hover:border-primary/20 transition-all duration-300"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`w-4 h-4 ${j < t.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed italic mb-5 line-clamp-4">"{t.review}"</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                      {t.clientName?.charAt(0) ?? "C"}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{t.clientName}</p>
                      <p className="text-xs text-muted-foreground">{t.projectLocation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════ CTA ══ */}
      <section className="relative overflow-hidden py-28 bg-foreground">
        {/* Decorative background text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
          <span className="text-[20vw] font-serif font-bold text-background/[0.03] whitespace-nowrap leading-none">
            Decoscape
          </span>
        </div>

        <div className="relative z-10 container mx-auto px-5 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Ready when you are</p>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-background leading-tight mb-5">
              Your dream space,<br />delivered in <em className="text-primary not-italic">45 days.</em>
            </h2>
            <p className="text-background/50 text-lg mb-3">
              Serving Anna Nagar · Adyar · OMR · ECR · T. Nagar · Velachery · Tambaram & all of Chennai.
            </p>
            <p className="text-background/40 text-sm mb-12">Free consultation · No obligation · 45-day handover guaranteed</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enquiry">
                <Button size="lg" className="h-14 px-10 rounded-full text-base font-bold shadow-2xl group">
                  Get a Free Quote
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="tel:+916379662806">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-10 rounded-full text-base font-bold border-background/20 text-background hover:bg-background/10 gap-2"
                >
                  <Clock className="w-5 h-5" />
                  Call +91 6379 662 806
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
