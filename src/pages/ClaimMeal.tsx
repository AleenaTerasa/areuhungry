import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Clock, User, Phone, Mail, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface LocationState {
  donation?: {
    id: string;
    type: string;
    quantity: string;
    location: string;
    expiresIn: string;
    status: string;
  };
}

const ClaimMeal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 1 hour in seconds
  const [isBooked, setIsBooked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    servings: "",
  });

  const locationState = location.state as LocationState;
  const donation = locationState?.donation;

  useEffect(() => {
    if (!donation) {
      navigate("/find-meal");
      return;
    }
  }, [donation, navigate]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBooked && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBooked, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(formData.servings) > parseInt(donation?.quantity || "0")) {
      toast({
        title: "Invalid quantity",
        description: "Requested servings cannot exceed available servings",
        variant: "destructive",
      });
      return;
    }
    setIsBooked(true);
    toast({
      title: "Meal Reserved!",
      description: "We have reserved this meal for 1 hour.",
    });
  };

  const handleCancel = () => {
    setIsBooked(false);
    setTimeLeft(3600);
    toast({
      title: "Booking Cancelled",
      description: "Your reservation has been cancelled.",
    });
  };

  if (!donation) return null;

  return (
    <div className="min-h-screen bg-cream py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-earth-dark text-center mb-2">
          Claim Your Meal
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Food Details Card */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-earth-dark">
                Food Details
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-earth">
                <div className="font-medium">Food Type:</div>
                <div>{donation.type}</div>
              </div>
              <div className="flex items-center gap-2 text-earth">
                <div className="font-medium">Available Servings:</div>
                <div>{donation.quantity}</div>
              </div>
              <div className="flex items-center gap-2 text-earth">
                <Clock className="w-4 h-4" />
                <div>{donation.expiresIn} left</div>
              </div>
              <div className="flex items-center gap-2 text-earth">
                <MapPin className="w-4 h-4" />
                <div>{donation.location}</div>
              </div>
              
              {/* Map placeholder - replace with actual map implementation */}
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                Map will be implemented here
              </div>
            </CardContent>
          </Card>

          {/* Reservation Form */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-earth-dark">
                Reservation Details
              </h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-earth-light" />
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name or NGO name"
                      className="pl-10"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={isBooked}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-earth-light" />
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+91 9876543210"
                      className="pl-10"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={isBooked}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-earth-light" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@gmail.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isBooked}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="servings">Number of Servings</Label>
                  <Input
                    id="servings"
                    name="servings"
                    type="number"
                    min="1"
                    max={donation.quantity}
                    placeholder="Enter number of servings"
                    value={formData.servings}
                    onChange={handleInputChange}
                    disabled={isBooked}
                    required
                  />
                </div>

                {isBooked ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-orange-600">
                      <AlertCircle className="w-4 h-4" />
                      <p className="text-sm">
                        Time Remaining: {formatTime(timeLeft)}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handleCancel}
                    >
                      Cancel Booking
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="submit"
                    className="w-full bg-honey hover:bg-honey-dark text-white"
                  >
                    Book Now
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClaimMeal;