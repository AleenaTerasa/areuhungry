import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

export const Impact = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [counts, setCounts] = useState({
    hives: 0,
    bees: 0,
    communities: 0,
  });

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      const timer = setInterval(() => {
        setCounts((prev) => ({
          hives: Math.min(prev.hives + Math.ceil(1000 / steps), 1000),
          bees: Math.min(prev.bees + Math.ceil(50000 / steps), 50000),
          communities: Math.min(prev.communities + Math.ceil(100 / steps), 100),
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
            Making a Difference
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { label: "Hives Protected", value: counts.hives.toLocaleString() },
            { label: "Bees Saved", value: counts.bees.toLocaleString() },
            {
              label: "Communities Impacted",
              value: counts.communities.toLocaleString(),
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