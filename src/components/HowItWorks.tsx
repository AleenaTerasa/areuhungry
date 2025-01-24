import { useInView } from "react-intersection-observer";

export const HowItWorks = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      title: "Choose Your Impact",
      description: "Select how you want to contribute to bee conservation.",
    },
    {
      title: "Join the Community",
      description: "Connect with fellow bee enthusiasts and experts.",
    },
    {
      title: "Make a Difference",
      description: "Start your journey in protecting our precious pollinators.",
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 ${inView ? "animate-fade-up" : "opacity-0"}`}>
          <span className="text-honey text-sm uppercase tracking-wider font-semibold">
            Get Started
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-earth-dark mt-4 mb-6">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-center ${inView ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="w-16 h-16 bg-honey rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                {index + 1}
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