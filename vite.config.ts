import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 750,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (id.includes("react-router-dom") || id.includes("@remix-run")) {
            return "router-vendor";
          }

          if (id.includes("framer-motion") || id.includes("gsap")) {
            return "motion-vendor";
          }

          if (id.includes("@radix-ui") || id.includes("lucide-react") || id.includes("sonner")) {
            return "ui-vendor";
          }

          if (id.includes("@react-three") || id.includes("react-three-fiber")) {
            return "three-react-vendor";
          }

          if (
            id.includes("/three/") ||
            id.includes("three-stdlib") ||
            id.includes("troika-three-text") ||
            id.includes("draco3d")
          ) {
            return "three-core-vendor";
          }

          if (
            id.includes("/node_modules/react/") ||
            id.includes("/node_modules/react-dom/") ||
            id.includes("/node_modules/scheduler/")
          ) {
            return "react-vendor";
          }
        },
      },
    },
  },
}));
