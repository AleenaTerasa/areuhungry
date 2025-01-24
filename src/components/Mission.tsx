import { useInView } from "react-intersection-observer";

export const Mission = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="mission"
      ref={ref}
      className="py-20 bg-cream"
    >
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 ${inView ? "animate-fade-up" : "opacity-0"}`}>
          <span className="text-honey text-sm uppercase tracking-wider font-semibold">
            Our Mission
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-earth-dark mt-4 mb-6">
            Protecting Our Pollinators
          </h2>
          <p className="text-earth text-lg max-w-2xl mx-auto">
            We're dedicated to preserving bee populations through sustainable
            beekeeping practices and community education.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Sustainable Practices",
              description:
                "Implementing eco-friendly beekeeping methods that protect both bees and their environment.",
            },
            {
              title: "Education First",
              description:
                "Empowering communities with knowledge about the importance of pollinators in our ecosystem.",
            },
            {
              title: "Global Impact",
              description:
                "Creating a network of conscious beekeepers and supporters worldwide.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-lg shadow-sm transform hover:-translate-y-1 transition-all duration-300 ${
                inView ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
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