import { MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface DonationDetailsProps {
  donation: {
    type: string;
    quantity: string;
    location: string;
    expiresIn: string;
  };
}

export const DonationDetails = ({ donation }: DonationDetailsProps) => {
  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <h2 className="text-2xl font-semibold text-earth-dark">Food Details</h2>
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
      </CardContent>
    </Card>
  );
};