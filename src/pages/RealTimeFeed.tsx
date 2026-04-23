import { MapPin, Clock, Filter, Search, Inbox, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { Navigation } from "@/components/Navigation";

import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FoodDonation {
  id: string;
  food_type: string;
  quantity: number;
  location: string;
  expiration_time: string;
}

const formatTimeRemaining = (expiration: string): { label: string; isLimited: boolean; expired: boolean } => {
  const diffMs = new Date(expiration).getTime() - Date.now();
  if (diffMs <= 0) return { label: "Expired", isLimited: true, expired: true };

  const totalMinutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let label: string;
  if (hours >= 1) {
    label = minutes > 0 ? `${hours}h ${minutes}m` : `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    label = `${totalMinutes} minute${totalMinutes === 1 ? "" : "s"}`;
  }

  return { label, isLimited: totalMinutes <= 180, expired: false };
};

const RealTimeFeed = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [donations, setDonations] = useState<FoodDonation[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [claimedDonation, setClaimedDonation] = useState<FoodDonation | null>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    const fetchDonations = async () => {
      const { data, error } = await supabase
        .from("food_donations")
        .select("id, food_type, quantity, location, expiration_time")
        .eq("is_claimed", false)
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          title: "Could not load donations",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setDonations(data ?? []);
      }
      setLoading(false);
    };

    fetchDonations();

    const channel = supabase
      .channel("food_donations_feed")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "food_donations" },
        () => fetchDonations()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const filteredDonations = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return donations;
    return donations.filter(
      (d) =>
        d.food_type.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q)
    );
  }, [donations, searchTerm]);

  const handleClaim = async (donation: FoodDonation) => {
    setClaimingId(donation.id);
    const { error } = await supabase
      .from("food_donations")
      .update({ is_claimed: true })
      .eq("id", donation.id);

    if (error) {
      toast({
        title: "Could not claim this meal",
        description: error.message,
        variant: "destructive",
      });
      setClaimingId(null);
      return;
    }

    setDonations((prev) => prev.filter((d) => d.id !== donation.id));
    setClaimingId(null);
    setClaimedDonation(donation);
  };

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

        {loading ? (
          <div className="text-center py-16 text-earth-light animate-fade-up">
            Loading donations...
          </div>
        ) : filteredDonations.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 animate-fade-up">
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
              <Inbox className="w-8 h-8 text-earth-light" />
            </div>
            <h2 className="text-2xl font-semibold text-earth-dark mb-2">
              No food donations available right now
            </h2>
            <p className="text-earth-light max-w-md">
              Check back soon or be the first to donate!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonations.map((donation) => {
              const time = formatTimeRemaining(donation.expiration_time);
              const status = time.isLimited ? "Limited Time Left" : "Fresh";
              return (
                <Card key={donation.id} className="animate-fade-up">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-earth-dark">
                          {donation.food_type}
                        </h3>
                        <p className="text-earth-light">{donation.quantity} servings</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          status === "Fresh"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {status}
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
                        <span>
                          {time.expired ? "Expired" : `Expires in ${time.label}`}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-honey hover:bg-honey-dark text-white"
                      onClick={() => handleClaim(donation)}
                      disabled={claimingId === donation.id || time.expired}
                    >
                      {claimingId === donation.id ? "Claiming..." : "Claim This Food"}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}

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

      <Dialog open={!!claimedDonation} onOpenChange={(open) => !open && setClaimedDonation(null)}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-7 w-7 text-green-600" />
            </div>
            <DialogTitle className="text-center text-2xl text-earth-dark">
              Meal claimed!
            </DialogTitle>
            <DialogDescription className="text-center">
              {claimedDonation
                ? `You've successfully claimed ${claimedDonation.food_type}. Head to the location to pick it up.`
                : ""}
            </DialogDescription>
          </DialogHeader>

          {claimedDonation && (
            <div className="rounded-lg bg-cream p-4 space-y-2">
              <div className="flex items-center gap-2 text-earth">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">{claimedDonation.location}</span>
              </div>
              <div className="flex items-center gap-2 text-earth-light text-sm">
                <Clock className="w-4 h-4" />
                <span>{claimedDonation.quantity} servings</span>
              </div>
            </div>
          )}

          <DialogFooter className="sm:justify-center">
            {claimedDonation && (
              <Button
                asChild
                className="w-full bg-honey hover:bg-honey-dark text-white"
              >
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(claimedDonation.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  See Food Location
                </a>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RealTimeFeed;
