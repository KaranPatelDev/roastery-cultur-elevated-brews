import { Link } from "react-router-dom";
import { Coffee, Instagram, Facebook, MapPin, Phone, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Coffee className="h-6 w-6 text-primary" />
              <span className="font-display text-xl font-bold text-foreground">
                Roastery <span className="text-primary">Cultur</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Freshly roasted beans, crafted drinks, and a place to belong. 
              Experience specialty coffee culture in Ahmedabad.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noreferrer noopener" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer noopener" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">Explore</h4>
            <div className="flex flex-col gap-3">
              {[
                { to: "/#menu", label: "Our Menu" },
                { to: "/#about", label: "Our Story" },
                { to: "/#gallery", label: "Gallery" },
                { to: "/#reserve", label: "Reserve a Table" },
                { to: "/#location", label: "Location" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Hours & Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">Visit Us</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <div>
                  <p>Mon – Sun: 9:00 AM – 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <p>41 Spring Field Row House, Judges Bunglow Rd, Bodakdev, Ahmedabad 380054</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href="tel:+919327143223" className="hover:text-primary transition-colors">
                  +91 93271 43223
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Roastery Cultur – The Coffee Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
