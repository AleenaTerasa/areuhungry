import { MapPin, Clock, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Navigation } from "@/components/Navigation";

interface FoodDonation {
  id: string;
  type: string;
  quantity: string;
  location: string;
  status: "Fresh" | "Limited Time Left";
  expiresIn: string;
}

const mockDonations: FoodDonation[] = [
  {
    id: "1",
    type: "Rice and Curry",
    quantity: "50 servings",
    location: "Gandhi Nagar, Delhi",
    status: "Fresh",
    expiresIn: "4 hours",
  },
  {
    id: "2",
    type: "Bread and Vegetables",
    quantity: "30 servings",
    location: "Koramangala, Bangalore",
    status: "Limited Time Left",
    expiresIn: "2 hours",
  },
  // Add more mock data as needed
];

const RealTimeFeed = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [donations] = useState<FoodDonation[]>(mockDonations);

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-4xl font-bold text-earth-dark mb-4">
            Available Donations Near You
          </h1>
          <p className="text-xl text-earth-light">
            Real-time updates of surplus food ready to be claimed
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8 animate-fade-up">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-light" />
              <Input
                placeholder="Search by location or food type..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <Card key={donation.id} className="animate-fade-up">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-earth-dark">
                      {donation.type}
                    </h3>
                    <p className="text-earth-light">{donation.quantity}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      donation.status === "Fresh"
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {donation.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-earth">
                    <MapPin className="w-4 h-4" />
                    <span>{donation.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-earth">
                    <Clock className="w-4 h-4" />
                    <span>Expires in {donation.expiresIn}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-honey hover:bg-honey-dark text-white"
                >
                  Claim This Food
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-earth-dark mb-2">
                500+ meals
              </h3>
              <p className="text-earth-light">donated daily</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-earth-dark mb-2">
                10 tons
              </h3>
              <p className="text-earth-light">of food saved monthly</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RealTimeFeed;