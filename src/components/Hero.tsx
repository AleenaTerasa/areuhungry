import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  const handleDonateClick = () => {
    const el = document.getElementById("donation-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80')] bg-cover bg-center"
        style={{ transform: "translateY(0)" }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="container mx-auto px-6 animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Rescue Food, Save Lives
          </h1>
          <p className="text-xl md:text-2xl text-cream mb-8 max-w-2xl mx-auto">
            Join our mission to reduce food waste and feed communities in need.
            Every meal saved is a step towards a better future.
          </p>
          <Button 
            onClick={handleDonateClick}
            className="bg-honey hover:bg-honey-dark text-white px-8 py-6 text-lg transition-all duration-200 transform hover:scale-105"
          >
            Donate Food Now
          </Button>
        </div>
      </div>
    </div>
  );
};