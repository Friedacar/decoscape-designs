import { SEO } from "@/components/seo";
import { Layout } from "@/components/layout";
import { useListTestimonials } from "@workspace/api-client-react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useListTestimonials();

  return (
    <Layout>
      <SEO 
        title="Client Testimonials" 
        description="Read what our Chennai clients have to say about working with Decoscape. 500+ satisfied clients across Tamil Nadu and a 4.9 average rating."
      />

      <section className="pt-32 pb-12 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Client Stories</h1>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Hear from homeowners and business leaders across Chennai who have experienced the Decoscape 45-day transformation.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-8 rounded-2xl border border-border shadow-sm">
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Skeleton key={j} className="w-5 h-5 rounded-full" />
                    ))}
                  </div>
                  <Skeleton className="h-24 w-full mb-8" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div>
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              ))
            ) : testimonials && testimonials.length > 0 ? (
              testimonials.map((testimonial, i) => (
                <motion.div 
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  className="p-8 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow relative"
                >
                  <Quote className="w-10 h-10 text-primary/10 absolute top-6 right-6" />
                  <div className="flex gap-1 mb-6 text-primary">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star 
                        key={j} 
                        className={`w-5 h-5 ${j < testimonial.rating ? "fill-primary" : "fill-muted text-muted"}`} 
                      />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed italic mb-8 min-h-[100px]">
                    "{testimonial.review}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/50">
                    <Avatar className="w-12 h-12 border border-primary/20">
                      <AvatarImage src={testimonial.avatarUrl || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {testimonial.clientName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-foreground">{testimonial.clientName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.projectLocation} • {testimonial.serviceType}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                Testimonials coming soon.
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
