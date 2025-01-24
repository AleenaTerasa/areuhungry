import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576363414875-6cf398c46ce4?q=80')] bg-cover bg-center"
        style={{ transform: "translateY(0)" }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="container mx-auto px-6 animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Save Bees, Save Earth
          </h1>
          <p className="text-xl md:text-2xl text-cream mb-8 max-w-2xl mx-auto">
            Join our mission to protect pollinators and preserve our planet's
            biodiversity for future generations.
          </p>
          <Button className="bg-honey hover:bg-honey-dark text-white px-8 py-6 text-lg transition-all duration-200 transform hover:scale-105">
            Make an Impact
          </Button>
        </div>
      </div>
    </div>
  );
};