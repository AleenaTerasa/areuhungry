import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import { HowItWorks } from "@/components/HowItWorks";
import { Impact } from "@/components/Impact";
import { DonationForm } from "@/components/DonationForm";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      <Hero />
      <Mission />
      <HowItWorks />
      <Impact />
      <DonationForm />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
