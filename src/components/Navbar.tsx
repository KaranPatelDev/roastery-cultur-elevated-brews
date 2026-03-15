import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Coffee } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { to: "#about", label: "About" },
  { to: "#menu", label: "Menu" },
  { to: "#gallery", label: "Gallery" },
  { to: "#reviews", label: "Reviews" },
  { to: "#location", label: "Location" },
  { to: "#reserve", label: "Reserve" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const smoothScrollWithOffset = (target: string) => {
    const element = document.querySelector(target);
    if (!element) {
      return;
    }

    const navOffset = 104;
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: Math.max(elementTop - navOffset, 0),
      behavior: "smooth",
    });
  };

  const handleAnchorScroll = (target: string) => {
    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: target });
      setIsOpen(false);
      return;
    }

    smoothScrollWithOffset(target);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/72 backdrop-blur-xl border-b border-border/60 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
          : "bg-black/38 backdrop-blur-lg border-b border-white/15"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Coffee className={`h-7 w-7 transition-transform duration-300 group-hover:rotate-12 ${scrolled ? "text-primary" : "text-[#e7c07e] drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"}`} />
          <span className={`font-display text-xl font-bold tracking-wide ${scrolled ? "text-foreground" : "text-[#f8ecde] drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]"}`}>
            Roastery <span className="text-primary">Cultur</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.to}
              onClick={() => handleAnchorScroll(link.to)}
              className={`text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${
                scrolled
                  ? "text-foreground/80 hover:text-primary"
                  : "text-[#f8ecde] drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] hover:text-[#e7c07e]"
              }`}
            >
              {link.label}
            </button>
          ))}
          <ThemeToggle
            className={scrolled ? undefined : "border-white/40 bg-black/35 text-[#f8ecde] hover:border-[#e7c07e] hover:text-[#e7c07e]"}
            iconClassName={scrolled ? undefined : "drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"}
          />
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 ${scrolled ? "text-foreground" : "text-[#f8ecde] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"}`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.to}
                  onClick={() => handleAnchorScroll(link.to)}
                  className="text-left text-lg font-display tracking-wider text-muted-foreground transition-colors duration-300 hover:text-primary"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
