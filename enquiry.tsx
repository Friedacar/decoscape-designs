import { SEO } from "@/components/seo";
import { Layout } from "@/components/layout";
import { useSubmitEnquiry } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  serviceType: z.enum(["residential", "commercial", "renovation", "consultation"]),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Please provide more details about your project"),
  preferredContact: z.enum(["email", "phone", "whatsapp"]).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Enquiry() {
  const searchParams = new URLSearchParams(window.location.search);
  const initialService = searchParams.get('service') as any || "residential";

  const [isSuccess, setIsSuccess] = useState(false);
  const submitMutation = useSubmitEnquiry();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: initialService,
      projectType: "",
      budget: "",
      message: "",
      preferredContact: "whatsapp",
    },
  });

  function onSubmit(data: FormValues) {
    submitMutation.mutate(
      { data },
      {
        onSuccess: () => {
          setIsSuccess(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
      }
    );
  }

  return (
    <Layout>
      <SEO
        title="Start Your Project"
        description="Enquire about your interior design project in Chennai, Tamil Nadu. Contact Decoscape for a consultation and start your 45-day transformation."
      />

      <section className="pt-32 pb-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Let's Create Something Beautiful</h1>
            <p className="text-muted-foreground text-lg">
              Fill out the form below and our design team will get back to you within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 max-w-6xl mx-auto">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-secondary/50 rounded-2xl p-8">
                <h3 className="text-2xl font-serif font-bold mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-primary mt-1 mr-4 shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Phone / WhatsApp</h4>
                      <a href="tel:+916379662806" className="text-muted-foreground hover:text-primary transition-colors">
                        +91 6379 662 806
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-primary mt-1 mr-4 shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Email</h4>
                      <a href="mailto:decoscapeofficial@gmail.com" className="text-muted-foreground hover:text-primary transition-colors break-all">
                        decoscapeofficial@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-primary mt-1 mr-4 shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Working Hours</h4>
                      <p className="text-muted-foreground">Mon – Sat: 9:00 AM – 7:00 PM<br />Sun: By Appointment</p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Studio Lead</p>
                    <p className="font-bold text-foreground">Franklin Joshua K</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Decoscape by<br />
                      <span className="font-medium text-foreground">Cauvery Legacy Pvt. Ltd.</span>
                      <span className="text-primary text-xs ml-1">(Est. 1984)</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/8 border border-primary/20 rounded-2xl p-6">
                <p className="text-sm font-semibold text-primary mb-2">45-Day Handover Guarantee</p>
                <p className="text-sm text-muted-foreground">We commit to completing every project within 45 days — or we continue at no extra cost.</p>
              </div>
            </div>

            {/* Form Area */}
            <div className="lg:col-span-2">
              {isSuccess ? (
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold mb-4">Request Received!</h2>
                  <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                    Thank you for reaching out. Our lead designer will review your details and contact you shortly to schedule an initial consultation.
                  </p>
                  <Button onClick={() => { setIsSuccess(false); form.reset(); }} variant="outline" className="rounded-full">
                    Submit Another Enquiry
                  </Button>
                </div>
              ) : (
                <div className="bg-card border border-border shadow-lg rounded-2xl p-8 md:p-10">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Rahul Sharma" {...field} className="bg-background" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="rahul@example.com" {...field} className="bg-background" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone / WhatsApp *</FormLabel>
                              <FormControl>
                                <Input placeholder="+91 98765 43210" {...field} className="bg-background" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="preferredContact"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Preferred Contact Method</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-background">
                                    <SelectValue placeholder="Select contact method" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                  <SelectItem value="phone">Phone Call</SelectItem>
                                  <SelectItem value="email">Email</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="serviceType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service Required *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-background">
                                    <SelectValue placeholder="Select a service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="residential">Residential Design</SelectItem>
                                  <SelectItem value="commercial">Commercial Design</SelectItem>
                                  <SelectItem value="renovation">Renovation / Modular</SelectItem>
                                  <SelectItem value="consultation">Consultation</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estimated Budget</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-background">
                                    <SelectValue placeholder="Select budget range" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="under-5l">Under ₹5 Lakh</SelectItem>
                                  <SelectItem value="5l-10l">₹5 Lakh – ₹10 Lakh</SelectItem>
                                  <SelectItem value="10l-25l">₹10 Lakh – ₹25 Lakh</SelectItem>
                                  <SelectItem value="25l-50l">₹25 Lakh – ₹50 Lakh</SelectItem>
                                  <SelectItem value="above-50l">Above ₹50 Lakh</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="projectType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-background">
                                  <SelectValue placeholder="Select property type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1bhk">1 BHK Apartment</SelectItem>
                                <SelectItem value="2bhk">2 BHK Apartment</SelectItem>
                                <SelectItem value="3bhk">3 BHK Apartment</SelectItem>
                                <SelectItem value="villa">Independent Villa / Bungalow</SelectItem>
                                <SelectItem value="office">Office Space</SelectItem>
                                <SelectItem value="retail">Retail / Showroom</SelectItem>
                                <SelectItem value="restaurant">Restaurant / Cafe</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Details *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your space, location, timeline, and vision..."
                                className="min-h-[140px] bg-background"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full rounded-full h-14 text-lg"
                        disabled={submitMutation.isPending}
                      >
                        {submitMutation.isPending ? "Submitting..." : "Submit Enquiry"}
                      </Button>
                    </form>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
