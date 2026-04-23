import { useInView } from "react-intersection-observer";
import { UserPlus, UtensilsCrossed, HandHeart, Globe } from "lucide-react";

export const HowItWorks = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      title: "No Login Required",
      description: "Instantly donate or claim food without creating an account.",
      icon: UserPlus,
    },
    {
      title: "Donate Food",
      description: "Submit surplus food details like type, quantity, and location through our simple donation form.",
      icon: UtensilsCrossed,
    },
    {
      title: "Claim Donations",
      description: "NGOs and volunteers can browse and claim available donations to distribute to those in need.",
      icon: HandHeart,
    },
    {
      title: "Make an Impact",
      description: "Track your contributions, earn rewards, and help reduce food waste!",
      icon: Globe,
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-20 bg-gradient-to-b from-white to-honey/5"
    >
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 ${inView ? "animate-fade-up" : "opacity-0"}`}>
          <span className="text-honey text-sm uppercase tracking-wider font-semibold">
            Get Started
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-earth-dark mt-4 mb-6">
            How It Works
          </h2>
          <p className="text-earth text-lg max-w-2xl mx-auto">
            Join our mission to reduce food waste and help those in need
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative text-center ${inView ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative">
                <div className="w-16 h-16 bg-honey rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  <step.icon className="w-8 h-8" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-0 h-[2px] bg-honey/20">
                    <div 
                      className={`h-full bg-honey transition-all duration-1000 ${
                        inView ? "w-full" : "w-0"
                      }`}
                      style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                    />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-earth-dark mb-4">
                {step.title}
              </h3>
              <p className="text-earth">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};