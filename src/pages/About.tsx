import { Coffee, Leaf, Users, Heart } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const values = [
  { icon: Leaf, title: "Locally Sourced", desc: "We partner with Indian coffee estates to bring you the freshest single-origin beans." },
  { icon: Coffee, title: "Artisan Roasting", desc: "Small-batch roasting in-house ensures every bean reaches its peak flavor profile." },
  { icon: Users, title: "Community Space", desc: "A warm, welcoming space for coffee lovers, creatives, and friends to connect." },
  { icon: Heart, title: "Crafted with Love", desc: "Every drink is prepared with precision, passion, and a personal touch." },
];

const About = () => {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4 font-medium">Our Story</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-8">
              The Art of <span className="text-gradient-gold">Coffee Culture</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Born from a deep passion for specialty coffee, Roastery Cultur is Ahmedabad's 
              destination for exceptional brews, artisan desserts, and meaningful connections. 
              We believe great coffee is more than a drink — it's an experience.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story Sections */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <ScrollReveal>
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-card to-muted glass-card flex items-center justify-center">
                <Coffee className="h-24 w-24 text-primary/30" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                From Bean to <span className="text-gradient-gold">Cup</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our journey begins at carefully selected coffee estates across Karnataka, 
                Kerala, and Tamil Nadu. We work directly with farmers who share our 
                commitment to quality and sustainability.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Each batch is roasted in small quantities right here in Ahmedabad, 
                ensuring that every cup you enjoy captures the true essence of 
                specialty coffee.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal className="order-2 md:order-1">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                More Than a <span className="text-gradient-gold">Café</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Step onto our terrace and you'll find a space that feels like home. 
                Whether you're working remotely, catching up with friends, or celebrating 
                a special occasion — there's always room for you.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our menu extends beyond coffee into carefully curated desserts, 
                global comfort food, and seasonal specials that surprise and delight.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="order-1 md:order-2">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-muted to-card glass-card flex items-center justify-center">
                <Users className="h-24 w-24 text-primary/30" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4 font-medium">Our Values</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                What We <span className="text-gradient-gold">Stand For</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="glass-card rounded-xl p-8 text-center hover-glow">
                  <div className="inline-flex p-4 rounded-full bg-primary/10 mb-6">
                    <v.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
