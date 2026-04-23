ALTER TABLE public.food_donations ADD COLUMN is_claimed BOOLEAN NOT NULL DEFAULT false;

CREATE POLICY "Anyone can claim food donations"
ON public.food_donations
FOR UPDATE
USING (true)
WITH CHECK (true);