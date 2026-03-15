import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Coffee, Cake, UtensilsCrossed, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import FloatingBeans from "@/components/FloatingBeans";
import SteamEffect from "@/components/SteamEffect";
import ScrollReveal from "@/components/ScrollReveal";

const featuredItems = [
  { icon: Coffee, name: "Lotus Biscoff Latte", desc: "Our signature blend with caramelized biscoff", price: "₹320" },
  { icon: Coffee, name: "Cold Brew", desc: "24-hour steeped, smooth & bold", price: "₹280" },
  { icon: Cake, name: "Cranberry Cheesecake", desc: "Tangy cranberry on creamy cheesecake", price: "₹350" },
  { icon: UtensilsCrossed, name: "Loaded Nachos", desc: "Crispy tortilla chips with melted cheese", price: "₹290" },
  { icon: Coffee, name: "Cappuccino", desc: "Classic espresso with velvety microfoam", price: "₹240" },
  { icon: Cake, name: "Waffle Bomb", desc: "Belgian waffle loaded with toppings", price: "₹380" },
];

const reviews = [
  { name: "Priya S.", text: "Best place for group parties, quality food and genuine service. The ambiance is unmatched!", rating: 5 },
  { name: "Arjun M.", text: "The cold brew is the best I've ever had. Such a cozy terrace to spend evenings.", rating: 5 },
  { name: "Kavya R.", text: "Absolutely love the Lotus Biscoff coffee! Perfect café for work and hangouts.", rating: 5 },
];

const Index = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <FloatingBeans />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background pointer-events-none" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <SteamEffect />
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mt-8 mb-6 leading-tight">
              Experience Coffee{" "}
              <span className="text-gradient-gold">Like Never Before</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
              Freshly Roasted Beans. Crafted Drinks. A Place to Belong.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base px-8">
                <Link to="/menu">View Menu</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/reserve">Reserve a Table</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4 font-medium">Our Story</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                  Crafted with <span className="text-gradient-gold">Passion</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  At Roastery Cultur, every cup tells a story. We source the finest beans 
                  from across India, roast them in-house to perfection, and brew each drink 
                  with meticulous care.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  More than a café — we're a community space where coffee lovers, 
                  remote workers, and friends gather to share moments over exceptional brews.
                </p>
                <Button asChild variant="ghost" className="text-primary hover:text-primary p-0 group">
                  <Link to="/about" className="flex items-center gap-2">
                    Read Our Story <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-card to-muted flex items-center justify-center glass-card">
                  <Coffee className="h-32 w-32 text-primary/40" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-primary/10 border border-primary/20" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-24 px-6 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4 font-medium">Featured</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                Curated <span className="text-gradient-gold">Favorites</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item, i) => (
              <ScrollReveal key={item.name} delay={i * 0.1}>
                <div className="glass-card rounded-xl p-6 hover-glow group cursor-pointer transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-primary font-semibold">{item.price}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/menu">View Full Menu</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4 font-medium">Testimonials</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                What Our <span className="text-gradient-gold">Guests</span> Say
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <ScrollReveal key={review.name} delay={i * 0.15}>
                <div className="glass-card rounded-xl p-8 hover-glow">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 italic leading-relaxed">"{review.text}"</p>
                  <p className="text-primary font-semibold text-sm">{review.name}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6">
        <ScrollReveal>
          <div className="container mx-auto max-w-4xl">
            <div className="glass-card rounded-2xl p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                  Reserve Your <span className="text-gradient-gold">Table</span>
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Whether it's a cozy date, a group celebration, or a solo coffee moment — we've got the perfect spot for you.
                </p>
                <Button asChild size="lg" className="text-base px-10">
                  <Link to="/reserve">Book Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Index;
