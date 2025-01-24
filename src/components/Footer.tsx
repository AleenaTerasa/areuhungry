import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-earth-dark py-12 text-cream/80">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Bee The Change
            </h3>
            <p className="mb-4">
              Protecting our pollinators for a sustainable future.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#mission"
                  className="hover:text-honey transition-colors duration-200"
                >
                  Our Mission
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-honey transition-colors duration-200"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#impact"
                  className="hover:text-honey transition-colors duration-200"
                >
                  Our Impact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>Email: hello@beethechange.com</li>
              <li>Phone: (555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                className="text-cream hover:text-honey p-2"
              >
                Twitter
              </Button>
              <Button
                variant="ghost"
                className="text-cream hover:text-honey p-2"
              >
                Instagram
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p>&copy; 2024 Bee The Change. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};