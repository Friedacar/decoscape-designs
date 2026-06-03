import { SEO } from "@/components/seo";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";

const services = [
  {
    id: "residential",
    title: "Residential Design",
    tagline: "Your home, reimagined.",
    description: "Transform your Chennai 2BHK, 3BHK, or villa into a luxurious, livable home. We specialise in bespoke layouts, modular furniture, and aesthetics that reflect your personal style — all within budget and on time.",
    includes: [
      "Space Planning & Layout",
      "Modular Furniture Selection",
      "Lighting Design",
      "Material & Finish Selection",
      "Custom Millwork & Joinery",
      "Styling & Accessorising",
    ],
    image: "/images/portfolio-residential.png",
    tag: "Flats, Villas & Bungalows",
    priceRange: "₹8L – ₹50L+",
  },
  {
    id: "modular",
    title: "Modular Kitchen & Wardrobe",
    tagline: "Chennai's favourite upgrade.",
    description: "Premium modular kitchens and wardrobes built with German hardware, marine-grade boards, and finishes that last decades. Designed, manufactured, and installed by our in-house team within 15 days.",
    includes: [
      "Modular Kitchen Design",
      "L-Shape, U-Shape & Island Layouts",
      "Wardrobe & Storage Solutions",
      "Soft-close Hinges & Channels",
      "Quartz / Granite Countertops",
      "Loft & Utility Cabinets",
    ],
    image: "/images/modular-kitchen.png",
    tag: "Most Popular",
    priceRange: "₹1.5L – ₹12L",
  },
  {
    id: "commercial",
    title: "Commercial Interiors",
    tagline: "Spaces that mean business.",
    description: "Elevate your brand with commercial spaces that inspire confidence and drive productivity. We design offices, retail showrooms, clinics, and wellness centres that balance aesthetics with deep functionality.",
    includes: [
      "Brand Identity Integration",
      "Workflow & Ergonomic Planning",
      "Commercial Grade Finishes",
      "Acoustic & Lighting Solutions",
      "Custom Display & Storage",
      "Vastu-Compliant Planning",
    ],
    image: "/images/portfolio-commercial.png",
    tag: "Offices, Retail & Clinics",
    priceRange: "₹15L – ₹2Cr+",
  },
  {
    id: "renovation",
    title: "Renovation & Remodeling",
    tagline: "Start fresh. Look new.",
    description: "Complete structural transformations handled by our expert in-house execution team. From civil work and false ceilings to the final coat of paint — all under one roof, with our strict 45-day guarantee.",
    includes: [
      "False Ceiling & Gypsum Work",
      "Flooring — Tiles, Vitrified & Hardwood",
      "Painting & Textured Wall Finishes",
      "Plumbing & Electrical Upgrades",
      "Kitchen & Bathroom Remodels",
      "End-to-End Project Management",
    ],
    image: "/images/portfolio-hospitality.png",
    tag: "Full Home Makeovers",
    priceRange: "₹5L – ₹35L",
  },
  {
    id: "consultation",
    title: "Design Consultation",
    tagline: "Expert guidance before you begin.",
    description: "Need a clear roadmap? Our in-depth consultations give you colour palettes, vendor recommendations, layout sketches, and an honest budget estimate — before you commit to anything.",
    includes: [
      "2-Hour On-Site Visit",
      "Concept Mood Boards",
      "Colour Palette Development",
      "Verified Vendor Recommendations",
      "Floor Plan & Layout Sketches",
      "Detailed Cost Estimate",
    ],
    image: "/images/portfolio-office.png",
    tag: "Starting at ₹5,000",
    priceRange: "₹5,000 – ₹25,000",
  },
];

const whyUs = [
  { icon: <Clock className="w-5 h-5" />, title: "45-Day Handover", desc: "Guaranteed delivery. Every project, every time. No exceptions." },
  { icon: <Shield className="w-5 h-5" />, title: "In-House Execution", desc: "Our own team — no subcontractors — means accountability at every step." },
  { icon: <Zap className="w-5 h-5" />, title: "3D Visualisation", desc: "See your space before we begin. Photorealistic previews included." },
  { icon: <Check className="w-5 h-5" />, title: "40+ Year Legacy", desc: "Backed by Cauvery Legacy Pvt. Ltd. — trusted in Chennai since 1984." },
];

export default function Services() {
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <Layout>
      <SEO
        title="Our Services"
        description="Explore Decoscape's premium interior design services in Chennai, Tamil Nadu — modular kitchens, residential design, commercial spaces, and renovation with a 45-day handover guarantee."
      />

      {/* Hero */}
      <section className="pt-36 pb-16 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none">
          <span className="text-[14vw] font-serif font-bold text-background/[0.04] whitespace-nowrap leading-none pr-4">Services</span>
        </div>
        <div className="relative container mx-auto px-5 md:px-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Serving Chennai & Tamil Nadu</p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-background leading-[1.04] mb-6">Our Services</h1>
            <p className="text-background/50 text-lg max-w-2xl leading-relaxed">
              Comprehensive design solutions for homes and businesses in Chennai — from modular kitchens to complete home makeovers, with our strict 45-day handover guarantee.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Us bar */}
      <section className="bg-primary/10 border-y border-primary/15 py-8">
        <div className="container mx-auto px-5 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-bold text-sm">{item.title}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service List */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-5 md:px-10 space-y-28">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              {/* Image */}
              <div className="relative group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </div>

                {/* Tag badge */}
                <div className="absolute top-5 left-5 bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                  {service.tag}
                </div>

                {/* Price badge */}
                <div className="absolute bottom-5 right-5 bg-background/95 backdrop-blur-sm text-foreground text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg">
                  {service.priceRange}
                </div>
              </div>

              {/* Content */}
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{service.tagline}</p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-5 leading-tight">{service.title}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">{service.description}</p>

                <div className="mb-8">
                  <p className="font-bold text-sm uppercase tracking-wider text-foreground/60 mb-4">What's Included</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                    {service.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={`/enquiry?service=${service.id}`}>
                  <Button size="lg" className="rounded-full px-8 h-12 font-bold group">
                    Enquire About This Service
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-secondary/40 text-center">
        <div className="container mx-auto px-5 max-w-2xl">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Not Sure Where to Start?</p>
          <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">Talk to a designer — it's free.</h3>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Book a free 30-minute call with our design team. We'll help you determine the best path forward for your space.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/enquiry">
              <Button size="lg" className="rounded-full px-10 h-14 font-bold group shadow-xl">
                Book a Free Consultation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="tel:+916379662806">
              <Button size="lg" variant="outline" className="rounded-full px-10 h-14 font-bold gap-2">
                Call Us Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
