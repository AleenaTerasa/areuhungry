import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import { HowItWorks } from "@/components/HowItWorks";
import { Impact } from "@/components/Impact";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      <Hero />
      <Mission />
      <HowItWorks />
      <Impact />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;