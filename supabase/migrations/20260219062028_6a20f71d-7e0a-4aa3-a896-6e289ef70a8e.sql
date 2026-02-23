
-- Create saved_addresses table
CREATE TABLE public.saved_addresses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  label TEXT NOT NULL DEFAULT 'Home',
  address TEXT NOT NULL,
  area TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Nagpur',
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.saved_addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own addresses" ON public.saved_addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own addresses" ON public.saved_addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own addresses" ON public.saved_addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own addresses" ON public.saved_addresses FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_saved_addresses_updated_at
BEFORE UPDATE ON public.saved_addresses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
