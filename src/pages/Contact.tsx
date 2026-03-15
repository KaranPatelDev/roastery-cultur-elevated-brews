import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

const Contact = () => {
  return (
    <div className="pt-24">
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4 font-medium">Contact</p>
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
                Find <span className="text-gradient-gold">Us</span>
              </h1>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map */}
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden border border-border h-[400px] lg:h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9013!2d72.5003!3d23.0275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzM5LjAiTiA3MsKwMzAnMDEuMSJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Roastery Cultur Location"
                />
              </div>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal delay={0.2}>
              <div className="flex flex-col gap-6">
                <div className="glass-card rounded-xl p-8 hover-glow">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold mb-2 text-foreground">Address</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        41 Spring Field Row House<br />
                        Judges Bunglow Rd, Bodakdev<br />
                        Ahmedabad, Gujarat 380054
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-8 hover-glow">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold mb-2 text-foreground">Opening Hours</h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>Monday – Sunday</p>
                        <p className="text-primary font-semibold">9:00 AM – 11:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-8 hover-glow">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold mb-2 text-foreground">Phone</h3>
                      <a
                        href="tel:+919327143223"
                        className="text-primary hover:underline text-lg font-semibold"
                      >
                        +91 93271 43223
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button asChild size="lg" className="w-full">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=23.0275,72.5003"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Directions
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <a href="tel:+919327143223">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Us
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
