import { motion } from "framer-motion";

const SteamEffect = () => {
  return (
    <div className="relative flex justify-center gap-2">
      {[0, 0.4, 0.8].map((delay, i) => (
        <motion.div
          key={i}
          className="w-1 h-8 rounded-full bg-foreground/20"
          animate={{
            y: [0, -30],
            opacity: [0.4, 0],
            scaleX: [1, 1.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default SteamEffect;
