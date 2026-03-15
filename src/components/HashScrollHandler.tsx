import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NAVBAR_OFFSET = 104;

const scrollToHashTarget = (hash: string) => {
  const element = document.querySelector(hash);
  if (!element) {
    return;
  }

  const elementTop = element.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top: Math.max(elementTop - NAVBAR_OFFSET, 0),
    behavior: "smooth",
  });
};

const HashScrollHandler = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
      return;
    }

    // Delay ensures lazy/home content is mounted before attempting hash scroll.
    const timer = window.setTimeout(() => {
      scrollToHashTarget(hash);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default HashScrollHandler;
