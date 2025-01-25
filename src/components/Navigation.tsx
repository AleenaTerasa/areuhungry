import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="text-2xl font-bold text-earth-dark cursor-pointer"
            onClick={() => navigate("/")}
          >
            Bee The Change
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#mission"
              className="text-earth hover:text-honey transition-colors duration-200"
            >
              Mission
            </a>
            <a
              href="#how-it-works"
              className="text-earth hover:text-honey transition-colors duration-200"
            >
              How It Works
            </a>
            <a
              href="#impact"
              className="text-earth hover:text-honey transition-colors duration-200"
            >
              Impact
            </a>
            <Button
              className="bg-honey hover:bg-honey-dark text-white transition-all duration-200"
              onClick={() => navigate("/find-meal")}
            >
              Find a Meal
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};