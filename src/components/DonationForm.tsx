import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const foodTypes = [
  "Rice",
  "Bread",
  "Curry",
  "Pasta",
  "Vegetables",
  "Fruits",
  "Desserts",
  "Beverages",
];

export const DonationForm = () => {
  const [foodType, setFoodType] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!foodType || !quantity || !location || !date) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("food_donations").insert({
      food_type: foodType,
      quantity: parseInt(quantity, 10),
      location,
      expiration_time: date.toISOString(),
    });

    setIsSubmitting(false);

    if (error) {
      console.error("Error saving donation:", error);
      toast({
        title: "Submission failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Thank you for your contribution!",
      description: "You've helped reduce food waste today.",
    });

    // Reset form
    setFoodType("");
    setQuantity("");
    setLocation("");
    setDate(undefined);
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude}, ${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Detection Failed",
            description: "Please enter your location manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-earth-dark text-center mb-4">
            Ready to Donate? It's Simple!
          </h2>
          <p className="text-earth/80 text-center mb-8">
            Help us rescue food and feed those in need.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="foodType" className="text-sm font-medium text-earth">
                Food Type
              </label>
              <Select value={foodType} onValueChange={setFoodType} required>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select food type" />
                </SelectTrigger>
                <SelectContent>
                  {foodTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium text-earth">
                Quantity (servings)
              </label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-white"
                placeholder="Enter number of servings"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium text-earth">
                Location
              </label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-white"
                  placeholder="Enter your location"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={detectLocation}
                  className="whitespace-nowrap"
                >
                  Detect Location
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="expiration"
                className="text-sm font-medium text-earth"
              >
                Expiration Time
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button
              type="submit"
              className="w-full bg-honey hover:bg-honey-dark text-white transition-all duration-200"
            >
              Donate Food Now!
            </Button>
          </form>
        </div>
      </div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80')] bg-cover bg-center opacity-5" />
    </section>
  );
};