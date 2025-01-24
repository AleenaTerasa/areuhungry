import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you for subscribing!",
      description: "We'll keep you updated on our mission.",
    });
    setEmail("");
  };

  return (
    <section className="py-20 bg-earth-dark relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-cream/80 mb-8">
            Subscribe to our newsletter and stay updated on how you can help save
            the bees.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              required
            />
            <Button
              type="submit"
              className="bg-honey hover:bg-honey-dark text-white transition-all duration-200"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587248720327-8eb72564be1e?q=80')] bg-cover bg-center opacity-10" />
    </section>
  );
};