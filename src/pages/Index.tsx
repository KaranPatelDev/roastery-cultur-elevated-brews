import { FormEvent, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";
import {
  ArrowUpRight,
  CalendarCheck,
  Coffee,
  MapPin,
  Phone,
  Star,
  Timer,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import HeroMedia from "@/components/HeroMedia";

gsap.registerPlugin(ScrollTrigger);

const menuData = {
  coffee: ["Cappuccino", "Latte", "Macchiato", "Cold Brew", "Lotus Biscoff Coffee"],
  desserts: ["Cranberry Cheesecake", "Tiramisu", "Nutella Brownie Shake", "Waffle Bomb"],
  meals: ["Quesadillas", "Nachos", "Grilled Mushrooms", "Cottage Cheese Marinara"],
};

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1400&q=80",
    alt: "Barista serving latte art",
    title: "Coffee Brewing Moment",
    subtitle: "Warm pours, glossy crema and slow cafe mornings.",
    className: "gallery-card-tall",
  },
  {
    src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1400&q=80",
    alt: "Dessert and tea spread",
    title: "Dessert Platter",
    subtitle: "A softer side of the roastery with indulgent pairings.",
    className: "gallery-card-wide",
  },
  {
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=80",
    alt: "Coffee cup over roasted beans",
    title: "Signature Bean Ritual",
    subtitle: "Roasted depth, silky milk texture and premium finish.",
    className: "gallery-card-tall",
  },
  {
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80",
    alt: "Cafe seating and terrace ambience",
    title: "Terrace Seating",
    subtitle: "Relaxed evenings, conversations and sunlit brunches.",
    className: "gallery-card-wide",
  },
  {
    src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=80",
    alt: "Cozy premium cafe interior",
    title: "Cozy Cafe Interior",
    subtitle: "Muted lighting, premium textures and intimate tables.",
    className: "gallery-card-regular",
  },
  {
    src: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1400&q=80",
    alt: "Coffee and greenery composition",
    title: "Slow Living Corners",
    subtitle: "Coffee rituals framed with calm, plants and texture.",
    className: "gallery-card-regular",
  },
];

const reviews = [
  {
    quote: "Best place for group parties, quality food and genuine service.",
    name: "Anjali P.",
  },
  {
    quote: "Ahmedabad's most premium coffee experience with incredible terrace vibe.",
    name: "Rohan M.",
  },
  {
    quote: "From Lotus Biscoff coffee to desserts, everything tastes world-class.",
    name: "Khushi R.",
  },
];

const sectionScroll = (id: string) => {
  const target = document.querySelector(id);
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Index = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panels = gsap.utils.toArray<HTMLElement>(".story-panel");

    panels.forEach((panel) => {
      gsap.fromTo(
        panel,
        { y: 42, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 80%",
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (!parallaxRef.current) {
        return;
      }

      const x = (event.clientX / window.innerWidth - 0.5) * 20;
      const y = (event.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(parallaxRef.current, { x, y, duration: 0.45, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const onReservationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Reservation request sent. We will call you shortly.");
    event.currentTarget.reset();
  };

  return (
    <main className="relative overflow-hidden">
      <div ref={parallaxRef} className="coffee-parallax-beans pointer-events-none" />

      <section className="relative flex min-h-screen items-center justify-center px-6 pb-20 pt-32" id="hero">
        <HeroMedia />
        <div className="hero-vignette absolute inset-0" />
        <div className="container relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="hero-eyebrow mb-4 text-xs uppercase tracking-[0.44em]">Roastery Cultur - The Coffee Company</p>
            <h1 className="hero-title font-display text-5xl font-semibold leading-tight md:text-7xl">
              Experience Coffee Like Never Before
            </h1>
            <p className="hero-subtitle mt-6 max-w-2xl text-lg md:text-xl">
              Freshly Roasted Beans. Crafted Drinks. A Place to Belong.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="hero-cta-primary h-12 px-8 text-sm uppercase tracking-[0.24em]" onClick={() => sectionScroll("#menu")}>
                View Menu
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hero-cta-secondary h-12 border-gold bg-transparent px-8 text-sm uppercase tracking-[0.24em] text-gold"
                onClick={() => sectionScroll("#reserve")}
              >
                Reserve Table
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="story-panel px-6 py-24 md:py-32">
        <div className="container mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.38em] text-gold">About Roastery</p>
            <h2 className="font-display text-4xl text-cream md:text-6xl">Local Origins, Global Craft</h2>
            <p className="mt-7 leading-relaxed text-cream/75">
              We source coffee with intention, roast with precision, and serve with warmth. Roastery Cultur blends
              specialty coffee culture with signature desserts, global comfort meals, and a cozy terrace that feels
              alive from morning pours to midnight conversations.
            </p>
            <div className="about-metrics mt-8 grid gap-4 sm:grid-cols-3">
              <div className="about-metric-card">
                <p className="about-metric-value">Single Origin</p>
                <p className="about-metric-label">Curated beans and rare micro lots</p>
              </div>
              <div className="about-metric-card">
                <p className="about-metric-value">Small Batch</p>
                <p className="about-metric-label">Roasted with precision every week</p>
              </div>
              <div className="about-metric-card">
                <p className="about-metric-value">Terrace Vibe</p>
                <p className="about-metric-label">Cozy evenings, brunches and gatherings</p>
              </div>
            </div>
            <div className="mt-10 space-y-4 text-sm uppercase tracking-[0.25em] text-cream/65">
              <p>Locally sourced beans from curated estates</p>
              <p>Artisan roasting in small batches</p>
              <p>Community-first cafe culture in Bodakdev</p>
            </div>
          </div>
          <div className="about-visual-shell relative h-[440px] overflow-hidden rounded-[2rem] border border-gold/20">
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1400&q=80"
              alt="Premium roasted coffee beans and brewing ritual"
              className="about-hero-image"
            />
            <div className="about-visual-overlay" />
            <div className="about-visual-badge about-visual-badge-top">
              <p className="about-badge-title">Roasted In-House</p>
              <p className="about-badge-copy">Balanced profiles, deep crema, clean finish</p>
            </div>
            <div className="about-visual-badge about-visual-badge-bottom">
              <p className="about-badge-title">Ahmedabad Coffee Culture</p>
              <p className="about-badge-copy">Specialty coffee, desserts, global plates</p>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="story-panel px-6 py-24 md:py-32">
        <div className="container mx-auto max-w-6xl">
          <p className="mb-4 text-xs uppercase tracking-[0.38em] text-gold">Signature Menu</p>
          <h2 className="font-display text-4xl text-cream md:text-6xl">Crafted for Every Craving</h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {Object.entries(menuData).map(([category, items], index) => (
              <motion.article
                key={category}
                data-cursor="hover"
                className="menu-card rounded-2xl border border-border bg-card/55 p-7"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                whileHover={{ y: -8 }}
              >
                <h3 className="mb-6 font-display text-3xl capitalize text-cream">{category}</h3>
                <ul className="space-y-3 text-cream/78">
                  {items.map((item) => (
                    <li key={item} className="flex items-center justify-between gap-4 border-b border-border/50 pb-3 text-sm">
                      <span>{item}</span>
                      <ArrowUpRight className="h-4 w-4 text-gold" />
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="story-panel px-6 py-24 md:py-32">
        <div className="container mx-auto max-w-6xl">
          <p className="mb-4 text-xs uppercase tracking-[0.38em] text-gold">Photo Gallery</p>
          <h2 className="font-display text-4xl text-cream md:text-6xl">Terrace Stories and Coffee Rituals</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/70 md:text-lg">
            A curated glimpse into the mood of Roastery Cultur: tactile desserts, polished brews, terrace evenings,
            and interiors designed for lingering longer.
          </p>

          <div className="gallery-grid mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {galleryImages.map((image, index) => (
              <motion.figure
                key={image.src}
                className={`gallery-item relative overflow-hidden rounded-[1.75rem] ${image.className}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <img src={image.src} alt={image.alt} loading="lazy" className="gallery-image h-full w-full object-cover" />
                <div className="gallery-image-overlay" />
                <figcaption className="gallery-caption absolute inset-x-5 bottom-5 rounded-2xl px-4 py-4 text-cream">
                  <p className="gallery-caption-title">{image.title}</p>
                  <p className="gallery-caption-copy">{image.subtitle}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="story-panel px-6 py-24 md:py-32">
        <div className="container mx-auto max-w-6xl">
          <p className="mb-4 text-xs uppercase tracking-[0.38em] text-gold">Reviews</p>
          <h2 className="font-display text-4xl text-cream md:text-6xl">Loved Across Ahmedabad</h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((review, index) => (
              <motion.article
                key={review.name}
                className="glass-card rounded-2xl p-8"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="mb-5 flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold" />
                  ))}
                </div>
                <p className="leading-relaxed text-cream/80">{review.quote}</p>
                <p className="mt-6 text-sm uppercase tracking-[0.2em] text-gold">{review.name}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="story-panel px-6 py-24 md:py-32">
        <div className="container mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.38em] text-gold">Location</p>
            <h2 className="font-display text-4xl text-cream md:text-6xl">Visit Our Bodakdev Terrace</h2>
            <address className="mt-6 not-italic leading-relaxed text-cream/80">
              41 Spring Field Row House<br />
              Judges Bunglow Rd<br />
              Bodakdev<br />
              Ahmedabad, Gujarat 380054
            </address>

            <div className="mt-8 space-y-4 text-cream/80">
              <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-gold" /> Landmark: Near Judges Bunglow</p>
              <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-gold" /> +91 93271 43223</p>
              <p className="flex items-center gap-3"><Timer className="h-4 w-4 text-gold" /> 9:00 AM to 11:00 PM</p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=41+Spring+Field+Row+House+Judges+Bunglow+Rd+Bodakdev+Ahmedabad+380054"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Directions
                </a>
              </Button>
              <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold hover:text-background">
                <a href="tel:+919327143223">Call Now</a>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card/40">
            <iframe
              title="Roastery Cultur Location"
              src="https://maps.google.com/maps?q=41%20Spring%20Field%20Row%20House%20Judges%20Bunglow%20Rd%20Bodakdev%20Ahmedabad%20Gujarat%20380054&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="h-[420px] w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section id="reserve" className="story-panel px-6 pb-28 pt-24 md:pb-36 md:pt-32">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card rounded-2xl border-gold/25 p-8 md:p-12">
            <p className="mb-4 text-xs uppercase tracking-[0.38em] text-gold">Reservation</p>
            <h2 className="font-display text-4xl text-cream md:text-5xl">Reserve Your Table</h2>
            <p className="mt-4 max-w-2xl text-cream/75">
              Plan your brunch, evening catch-up, or celebration. Fill in your details and our team will confirm your
              booking quickly.
            </p>

            <form className="mt-10 grid gap-5 md:grid-cols-2" onSubmit={onReservationSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" required placeholder="Your full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" required placeholder="+91" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests">Guests</Label>
                <div className="relative">
                  <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
                  <Input id="guests" type="number" min={1} max={20} required placeholder="Number of guests" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <div className="relative">
                  <CalendarCheck className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
                  <Input id="date" type="date" required className="pl-9" />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea id="notes" placeholder="Special requests or occasion" rows={4} />
              </div>

              <div className="md:col-span-2">
                <Button type="submit" size="lg" className="h-12 w-full text-sm uppercase tracking-[0.24em]">
                  Submit Reservation
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="pointer-events-none fixed bottom-5 right-5 z-40 hidden rounded-full border border-gold/50 bg-background/75 p-3 text-gold backdrop-blur-md lg:block">
        <Coffee className="h-5 w-5 animate-pulse" />
      </section>
    </main>
  );
};

export default Index;
