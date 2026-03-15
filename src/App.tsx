import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import HashScrollHandler from "@/components/HashScrollHandler";
import Index from "./pages/Index";

const About = lazy(() => import("./pages/About"));
const Menu = lazy(() => import("./pages/Menu"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Reserve = lazy(() => import("./pages/Reserve"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <CustomCursor />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <HashScrollHandler />
          <Navbar />
          <Suspense
            fallback={
              <div className="flex min-h-[50vh] items-center justify-center px-6 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Brewing Experience...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reserve" element={<Reserve />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
