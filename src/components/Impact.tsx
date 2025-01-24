import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

export const Impact = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [counts, setCounts] = useState({
    meals: 0,
    restaurants: 0,
    kgSaved: 0,
  });

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      const timer = setInterval(() => {
        setCounts((prev) => ({
          meals: Math.min(prev.meals + Math.ceil(50000 / steps), 50000),
          restaurants: Math.min(prev.restaurants + Math.ceil(200 / steps), 200),
          kgSaved: Math.min(prev.kgSaved + Math.ceil(25000 / steps), 25000),
        }));
      }, interval);

      return () => clearInterval(timer);
    }
  }, [inView]);

  return (
    <section
      id="impact"
      ref={ref}
      className="py-20 bg-honey/10"
    >
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 ${inView ? "animate-fade-up" : "opacity-0"}`}>
          <span className="text-honey text-sm uppercase tracking-wider font-semibold">
            Our Impact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-earth-dark mt-4 mb-6">
            Making a Difference Together
          </h2>
          <p className="text-earth text-lg max-w-2xl mx-auto">
            Every donation counts in our fight against food waste and hunger
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { label: "Meals Donated", value: counts.meals.toLocaleString() },
            { label: "Partner Restaurants", value: counts.restaurants.toLocaleString() },
            {
              label: "Kg of Food Saved",
              value: counts.kgSaved.toLocaleString(),
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`text-center ${
                inView ? "animate-counter" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-honey mb-2">
                {stat.value}
              </div>
              <div className="text-earth text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};