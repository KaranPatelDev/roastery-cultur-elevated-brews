import { useState } from "react";
import { Coffee, Cake, Armchair, TreePalm, Image } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const categories = [
  { id: "all", label: "All", icon: Image },
  { id: "brewing", label: "Brewing", icon: Coffee },
  { id: "desserts", label: "Desserts", icon: Cake },
  { id: "interior", label: "Interior", icon: Armchair },
  { id: "terrace", label: "Terrace", icon: TreePalm },
];

const galleryItems = [
  { id: 1, category: "brewing", label: "Latte Art", aspect: "aspect-square" },
  { id: 2, category: "interior", label: "Cozy Corner", aspect: "aspect-[3/4]" },
  { id: 3, category: "desserts", label: "Cranberry Cheesecake", aspect: "aspect-square" },
  { id: 4, category: "terrace", label: "Evening Vibes", aspect: "aspect-[4/3]" },
  { id: 5, category: "brewing", label: "Pour Over", aspect: "aspect-[3/4]" },
  { id: 6, category: "desserts", label: "Tiramisu", aspect: "aspect-square" },
  { id: 7, category: "interior", label: "Bar Counter", aspect: "aspect-[4/3]" },
  { id: 8, category: "terrace", label: "Terrace Seating", aspect: "aspect-square" },
  { id: 9, category: "brewing", label: "Espresso Shot", aspect: "aspect-[4/3]" },
  { id: 10, category: "desserts", label: "Waffle Bomb", aspect: "aspect-[3/4]" },
  { id: 11, category: "interior", label: "Ambient Lighting", aspect: "aspect-square" },
  { id: 12, category: "terrace", label: "Sunset View", aspect: "aspect-[3/4]" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="pt-24">
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4 font-medium">Gallery</p>
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
                A Glimpse <span className="text-gradient-gold">Inside</span>
              </h1>
            </div>
          </ScrollReveal>

          {/* Category Filters */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "glass-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <cat.icon className="h-4 w-4" />
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.05}>
                <div className="break-inside-avoid group cursor-pointer overflow-hidden rounded-xl glass-card hover-glow">
                  <div className={`${item.aspect} bg-gradient-to-br from-card to-muted relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Coffee className="h-12 w-12 text-primary/20" />
                    </div>
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all duration-500 flex items-end p-4">
                      <span className="font-display text-foreground text-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        {item.label}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
