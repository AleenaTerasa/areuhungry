CREATE TABLE public.food_donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  food_type TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  location TEXT NOT NULL,
  expiration_time TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.food_donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view food donations"
ON public.food_donations
FOR SELECT
USING (true);

CREATE POLICY "Anyone can submit food donations"
ON public.food_donations
FOR INSERT
WITH CHECK (true);