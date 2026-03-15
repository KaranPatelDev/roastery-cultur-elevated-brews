import { useState } from "react";
import { Coffee, Cake, UtensilsCrossed } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScrollReveal from "@/components/ScrollReveal";

const menuData = {
  coffee: [
    { name: "Cappuccino", desc: "Classic espresso with velvety steamed milk foam", price: "₹240", icon: Coffee },
    { name: "Latte", desc: "Smooth espresso balanced with creamy steamed milk", price: "₹260", icon: Coffee },
    { name: "Macchiato", desc: "Bold espresso stained with a dollop of foam", price: "₹220", icon: Coffee },
    { name: "Cold Brew", desc: "24-hour steeped, smooth and naturally sweet", price: "₹280", icon: Coffee },
    { name: "Lotus Biscoff Coffee", desc: "Our signature — espresso blended with caramelized biscoff", price: "₹320", icon: Coffee },
    { name: "Espresso", desc: "Pure, intense, single-origin shot", price: "₹180", icon: Coffee },
    { name: "Mocha", desc: "Rich chocolate meets bold espresso", price: "₹290", icon: Coffee },
    { name: "Affogato", desc: "Vanilla gelato drowned in hot espresso", price: "₹300", icon: Coffee },
  ],
  desserts: [
    { name: "Cranberry Cheesecake", desc: "Tangy cranberry compote on New York-style cheesecake", price: "₹350", icon: Cake },
    { name: "Tiramisu", desc: "Classic Italian, layered with mascarpone and espresso", price: "₹380", icon: Cake },
    { name: "Nutella Brownie Shake", desc: "Decadent chocolate brownie blended with Nutella", price: "₹320", icon: Cake },
    { name: "Waffle Bomb", desc: "Belgian waffle loaded with fruits, cream & drizzle", price: "₹380", icon: Cake },
    { name: "Crème Brûlée", desc: "Caramelized custard with vanilla bean", price: "₹340", icon: Cake },
    { name: "Churros", desc: "Crispy cinnamon sticks with chocolate dipping sauce", price: "₹280", icon: Cake },
  ],
  meals: [
    { name: "Quesadillas", desc: "Grilled flour tortilla with cheese, peppers & salsa", price: "₹340", icon: UtensilsCrossed },
    { name: "Nachos Supreme", desc: "Loaded with jalapeños, cheese, sour cream & guac", price: "₹290", icon: UtensilsCrossed },
    { name: "Grilled Mushrooms", desc: "Herb-marinated mushrooms on toasted sourdough", price: "₹310", icon: UtensilsCrossed },
    { name: "Cottage Cheese Marinara", desc: "Pan-seared paneer in rich tomato basil sauce", price: "₹360", icon: UtensilsCrossed },
    { name: "Caesar Salad", desc: "Crisp romaine, parmesan, croutons & house dressing", price: "₹280", icon: UtensilsCrossed },
    { name: "Bruschetta", desc: "Toasted baguette with tomato, basil & olive oil", price: "₹260", icon: UtensilsCrossed },
  ],
};

const Menu = () => {
  return (
    <div className="pt-24">
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4 font-medium">Our Menu</p>
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
                Crafted to <span className="text-gradient-gold">Delight</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                From specialty coffee to global comfort food — every item is made with care.
              </p>
            </div>
          </ScrollReveal>

          <Tabs defaultValue="coffee" className="w-full">
            <ScrollReveal>
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 bg-card border border-border h-12">
                <TabsTrigger value="coffee" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
                  <Coffee className="h-4 w-4" /> Coffee
                </TabsTrigger>
                <TabsTrigger value="desserts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
                  <Cake className="h-4 w-4" /> Desserts
                </TabsTrigger>
                <TabsTrigger value="meals" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
                  <UtensilsCrossed className="h-4 w-4" /> Meals
                </TabsTrigger>
              </TabsList>
            </ScrollReveal>

            {Object.entries(menuData).map(([category, items]) => (
              <TabsContent key={category} value={category} className="mt-10">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item, i) => (
                    <ScrollReveal key={item.name} delay={i * 0.05}>
                      <div className="glass-card rounded-xl p-6 hover-glow group cursor-pointer transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <item.icon className="h-6 w-6 text-primary" />
                          </div>
                          <span className="text-primary font-bold text-lg">{item.price}</span>
                        </div>
                        <h3 className="font-display text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Menu;
