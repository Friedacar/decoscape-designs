import { SEO } from "@/components/seo";
import { Layout } from "@/components/layout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "wouter";

const categories = ["All", "Residential", "Modular", "Commercial", "Hospitality", "Office"];

const projects = [
  { id: 1,  title: "Luxury 3BHK",              location: "Adyar",          category: "Residential",  img: "/images/portfolio-residential.png",   sqft: "1,850 sq ft" },
  { id: 2,  title: "Modular Kitchen",           location: "Anna Nagar",     category: "Modular",      img: "/images/modular-kitchen.png",          sqft: "Full Kitchen" },
  { id: 3,  title: "Corporate Office",          location: "OMR",            category: "Office",       img: "/images/portfolio-office.png",         sqft: "4,200 sq ft" },
  { id: 4,  title: "Boutique Showroom",         location: "T. Nagar",       category: "Commercial",   img: "/images/portfolio-commercial.png",     sqft: "2,100 sq ft" },
  { id: 5,  title: "Rooftop Restaurant",        location: "ECR",            category: "Hospitality",  img: "/images/portfolio-hospitality.png",    sqft: "3,000 sq ft" },
  { id: 6,  title: "Contemporary Villa",        location: "Velachery",      category: "Residential",  img: "/images/portfolio-residential-2.png",  sqft: "4,500 sq ft" },
  { id: 7,  title: "Scandinavian Kitchen",      location: "Porur",          category: "Modular",      img: "/images/modular-kitchen-modern.png",   sqft: "Full Kitchen" },
  { id: 8,  title: "Restaurant & Bar",          location: "Nungambakkam",   category: "Hospitality",  img: "/images/portfolio-hospitality-2.png",  sqft: "1,600 sq ft" },
  { id: 9,  title: "Tech Startup HQ",           location: "Sholinganallur", category: "Office",       img: "/images/portfolio-office-2.png",       sqft: "6,000 sq ft" },
  { id: 10, title: "Luxury Retail Flagship",    location: "Mylapore",       category: "Commercial",   img: "/images/portfolio-commercial-2.png",   sqft: "3,800 sq ft" },
  { id: 11, title: "Master Bedroom Suite",      location: "Besant Nagar",   category: "Residential",  img: "/images/portfolio-bedroom.png",        sqft: "5,200 sq ft" },
  { id: 12, title: "Island Kitchen & Wardrobe", location: "Tambaram",       category: "Modular",      img: "/images/modular-kitchen-modern.png",   sqft: "Full Home" },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <Layout>
      <SEO
        title="Portfolio & Gallery"
        description="Browse our portfolio of completed interior design projects in Chennai, Tamil Nadu. Modular kitchens, luxury homes, commercial spaces — all delivered in 45 days."
      />

      {/* Hero */}
      <section className="pt-36 pb-16 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none">
          <span className="text-[18vw] font-serif font-bold text-background/[0.04] whitespace-nowrap leading-none pr-4">Work</span>
        </div>
        <div className="relative container mx-auto px-5 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">500+ Projects · Chennai & Tamil Nadu</p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-background leading-[1.04] mb-6">
              Our Portfolio
            </h1>
            <p className="text-background/50 text-lg max-w-xl leading-relaxed">
              From modular kitchens in Anna Nagar to luxury villas in Adyar — every project delivered with precision in 45 days.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-5 md:px-10">
          {/* Filter tabs */}
          <div className="flex gap-2 mb-12 overflow-x-auto no-scrollbar pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  filter === cat
                    ? "bg-foreground text-background shadow-md"
                    : "bg-secondary text-foreground/60 hover:bg-secondary/70"
                }`}
              >
                {cat}
                <span className={`ml-2 text-xs font-normal ${filter === cat ? "text-background/60" : "text-muted-foreground"}`}>
                  {cat === "All" ? projects.length : projects.filter(p => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-secondary ${
                    i % 5 === 0 ? "sm:col-span-2 aspect-[21/9] lg:col-span-1 lg:aspect-[4/3]" : "aspect-[4/3]"
                  }`}
                >
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Always visible category chip */}
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full text-foreground">
                    {project.category}
                  </div>

                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                    <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest mb-1.5">
                      <MapPin className="w-3 h-3" />
                      {project.location}, Chennai · {project.sqft}
                    </div>
                    <h3 className="text-white text-xl font-serif font-bold">{project.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 text-muted-foreground"
            >
              <p className="text-lg mb-4">No projects in this category yet.</p>
              <button onClick={() => setFilter("All")} className="text-primary font-semibold hover:underline">
                View all projects →
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-secondary/40 text-center">
        <div className="container mx-auto px-5 max-w-2xl">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Start Your Journey</p>
          <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to add your space to this portfolio?</h3>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Every project here started with a single conversation. Let's have yours.
          </p>
          <Link href="/enquiry">
            <Button size="lg" className="rounded-full px-10 h-14 font-bold group shadow-xl">
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
