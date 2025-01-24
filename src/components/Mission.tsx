import { useInView } from "react-intersection-observer";
import { Button } from "./ui/button";

export const Mission = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="mission"
      ref={ref}
      className="py-24 bg-gradient-to-b from-cream to-honey-light"
    >
      <div className="container mx-auto px-6">
        <div 
          className={`max-w-4xl mx-auto text-center ${
            inView ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <span className="text-honey text-sm uppercase tracking-wider font-semibold mb-4 block">
            Our Mission
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-earth-dark mb-6">
            Where Flavor Meets Purpose
          </h2>
          <p className="text-earth text-lg md:text-xl leading-relaxed mb-8">
            At Bee The Change, we're on a mission to rescue delightful dishes from ending up in the trash! 
            We've simplified your path to making a difference, allowing you to snag Surprise Treat Bags 
            filled with top-notch food at irresistible prices.
          </p>
          <div className="h-px w-24 bg-honey mx-auto mb-8" />
          <p className="text-2xl md:text-3xl font-semibold text-earth-dark mb-4">
            Save money daily,
          </p>
          <p className="text-xl md:text-2xl text-earth mb-8">
            Good for you, good for the planet.
          </p>
          <Button 
            className="bg-honey hover:bg-honey-dark text-white transition-all duration-200 text-lg px-8 py-6"
          >
            Join Our Mission
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              title: "Save Food",
              description:
                "Rescue delicious meals and treats from going to waste while enjoying great discounts.",
              icon: "🍱"
            },
            {
              title: "Save Money",
              description:
                "Get amazing deals on high-quality food from your favorite local spots.",
              icon: "💰"
            },
            {
              title: "Save Planet",
              description:
                "Help reduce food waste and make a positive impact on the environment.",
              icon: "🌍"
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-sm transform hover:-translate-y-1 transition-all duration-300 ${
                inView ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-earth-dark mb-4">
                {item.title}
              </h3>
              <p className="text-earth">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};