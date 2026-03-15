import { useEffect, useRef, useState } from "react";

const DESKTOP_VIDEO_URL =
  "https://cdn.coverr.co/videos/coverr-a-cup-of-coffee-1579/1080p.mp4";
const MOBILE_FALLBACK_IMAGE_URL =
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=70";

type AdaptiveConnection = Navigator & {
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
  };
};

const HeroMedia = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [preferLiteMode, setPreferLiteMode] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 1024px)");
    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluateDevice = () => {
      const connection = (navigator as AdaptiveConnection).connection;
      const saveData = Boolean(connection?.saveData);
      const slowConnection = ["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "");

      setIsDesktop(desktopMedia.matches);
      setPreferLiteMode(saveData || slowConnection || reducedMotionMedia.matches);
    };

    evaluateDevice();

    const mediaListener = () => evaluateDevice();

    if (typeof desktopMedia.addEventListener === "function") {
      desktopMedia.addEventListener("change", mediaListener);
      reducedMotionMedia.addEventListener("change", mediaListener);
    } else {
      desktopMedia.addListener(mediaListener);
      reducedMotionMedia.addListener(mediaListener);
    }

    return () => {
      if (typeof desktopMedia.removeEventListener === "function") {
        desktopMedia.removeEventListener("change", mediaListener);
        reducedMotionMedia.removeEventListener("change", mediaListener);
      } else {
        desktopMedia.removeListener(mediaListener);
        reducedMotionMedia.removeListener(mediaListener);
      }
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const canUseDesktopVideo = isDesktop && !preferLiteMode && !videoError && shouldLoadVideo;

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {canUseDesktopVideo ? (
        <video
          className="hero-media-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={MOBILE_FALLBACK_IMAGE_URL}
          onError={() => setVideoError(true)}
        >
          <source src={DESKTOP_VIDEO_URL} type="video/mp4" />
        </video>
      ) : (
        <img
          src={MOBILE_FALLBACK_IMAGE_URL}
          alt="Cinematic close-up of coffee brewing"
          className="hero-media-image"
          loading="eager"
          fetchPriority="high"
        />
      )}
      <div className="hero-media-overlay" />
    </div>
  );
};

export default HeroMedia;