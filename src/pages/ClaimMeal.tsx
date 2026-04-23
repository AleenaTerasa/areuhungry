import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ClaimForm } from "@/components/claim/ClaimForm";
import { CountdownTimer } from "@/components/claim/CountdownTimer";
import { DonationDetails } from "@/components/claim/DonationDetails";

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

  const locationState = location.state as LocationState;
  const donation = locationState?.donation;

  useEffect(() => {
    if (!donation) {
      navigate("/find-meal");
      return;
    }
  }, [donation, navigate]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isBooked && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBooked, timeLeft]);

  const handleSubmit = (formData: { name: string; phone: string; email: string }) => {
    console.log("Form submitted:", formData);
    setIsBooked(true);
    toast({
      title: "Meal Reserved!",
      description: "We have reserved this meal for 1 hour.",
    });
  };

  const handleTimeUp = () => {
    setIsBooked(false);
    setTimeLeft(3600);
    toast({
      title: "Time's up!",
      description: "The food is now available for the next customer.",
      variant: "destructive",
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
          <DonationDetails donation={donation} />

          <Card className="bg-white shadow-md">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-earth-dark">
                Reservation Details
              </h2>
            </CardHeader>
            <CardContent>
              <ClaimForm onSubmit={handleSubmit} isBooked={isBooked} />
              
              {isBooked && (
                <p className="mt-4 text-sm text-orange-600">
                  You have 60 minutes to pick up the order. After this time, the food
                  will be passed on to the next customer.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {isBooked && timeLeft > 0 && (
        <CountdownTimer timeLeft={timeLeft} onTimeUp={handleTimeUp} />
      )}
    </div>
  );
};

export default ClaimMeal;