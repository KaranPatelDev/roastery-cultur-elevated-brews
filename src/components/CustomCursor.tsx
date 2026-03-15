import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const interactiveSelector = "a, button, input, textarea, select, [data-cursor='hover']";

const CustomCursor = () => {
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const coarseQuery = window.matchMedia("(pointer: coarse)");
    const setPointerState = () => setIsCoarsePointer(coarseQuery.matches);

    setPointerState();

    if (typeof coarseQuery.addEventListener === "function") {
      coarseQuery.addEventListener("change", setPointerState);
      return () => coarseQuery.removeEventListener("change", setPointerState);
    }

    coarseQuery.addListener(setPointerState);
    return () => coarseQuery.removeListener(setPointerState);
  }, []);

  useEffect(() => {
    if (isCoarsePointer) {
      document.body.classList.remove("has-custom-cursor");
      return;
    }

    document.body.classList.add("has-custom-cursor");

    const handleMove = (event: MouseEvent) => {
      setVisible(true);
      setCursor({ x: event.clientX, y: event.clientY });
    };

    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);

    const handleInteractiveEnter = () => setActive(true);
    const handleInteractiveLeave = () => setActive(false);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);

    const interactiveNodes = document.querySelectorAll(interactiveSelector);
    interactiveNodes.forEach((node) => {
      node.addEventListener("mouseenter", handleInteractiveEnter);
      node.addEventListener("mouseleave", handleInteractiveLeave);
    });

    return () => {
      document.body.classList.remove("has-custom-cursor");
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      interactiveNodes.forEach((node) => {
        node.removeEventListener("mouseenter", handleInteractiveEnter);
        node.removeEventListener("mouseleave", handleInteractiveLeave);
      });
    };
  }, [isCoarsePointer]);

  if (isCoarsePointer) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border-2 border-gold/95 bg-gold/25 shadow-[0_0_0_2px_rgba(18,18,18,0.25),0_0_24px_rgba(198,169,105,0.65)] mix-blend-normal pointer-events-none"
      animate={{
        x: cursor.x - 16,
        y: cursor.y - 16,
        scale: active ? 1.7 : 1,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 460, damping: 34, mass: 0.45 }}
    />
  );
};

export default CustomCursor;