import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ClaimFormProps {
  onSubmit: (formData: {
    name: string;
    phone: string;
    email: string;
  }) => void;
  isBooked: boolean;
}

export const ClaimForm = ({ onSubmit, isBooked }: ClaimFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter your name or NGO name"
          value={formData.name}
          onChange={handleInputChange}
          disabled={isBooked}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Contact Number</Label>
        <Input
          id="phone"
          name="phone"
          placeholder="+91 9876543210"
          value={formData.phone}
          onChange={handleInputChange}
          disabled={isBooked}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={handleInputChange}
          disabled={isBooked}
          required
        />
      </div>

      {!isBooked && (
        <Button
          type="submit"
          className="w-full bg-honey hover:bg-honey-dark text-white"
        >
          Book Now
        </Button>
      )}
    </form>
  );
};