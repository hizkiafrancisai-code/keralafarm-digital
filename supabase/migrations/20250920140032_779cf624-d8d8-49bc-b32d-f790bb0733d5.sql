-- Create farmer profiles table extending auth.users
CREATE TABLE public.farmer_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  name TEXT NOT NULL,
  mobile_number TEXT NOT NULL UNIQUE,
  district TEXT NOT NULL,
  village TEXT NOT NULL,
  land_size_acres DECIMAL(10,2) NOT NULL,
  primary_crop TEXT NOT NULL,
  soil_type TEXT NOT NULL,
  irrigation_method TEXT NOT NULL,
  language_preference TEXT DEFAULT 'en' CHECK (language_preference IN ('en', 'ml')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on farmer_profiles
ALTER TABLE public.farmer_profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for farmer_profiles
CREATE POLICY "Users can view their own profile" ON public.farmer_profiles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.farmer_profiles
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.farmer_profiles
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create crop calendar table
CREATE TABLE public.crop_calendars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_id UUID NOT NULL REFERENCES public.farmer_profiles(user_id) ON DELETE CASCADE,
  crop_name TEXT NOT NULL,
  season TEXT NOT NULL,
  sowing_date DATE,
  harvest_date DATE,
  tasks JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.crop_calendars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own crop calendars" ON public.crop_calendars
FOR ALL USING (auth.uid() = farmer_id);

-- Create climate predictions table
CREATE TABLE public.climate_predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_id UUID NOT NULL REFERENCES public.farmer_profiles(user_id) ON DELETE CASCADE,
  location_data JSONB NOT NULL,
  prediction_data JSONB NOT NULL,
  alert_level TEXT CHECK (alert_level IN ('low', 'medium', 'high', 'critical')),
  valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.climate_predictions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own climate predictions" ON public.climate_predictions
FOR SELECT USING (auth.uid() = farmer_id);

-- Create disease detection logs table
CREATE TABLE public.disease_detections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_id UUID NOT NULL REFERENCES public.farmer_profiles(user_id) ON DELETE CASCADE,
  crop_name TEXT NOT NULL,
  symptoms TEXT,
  image_url TEXT,
  ai_diagnosis JSONB,
  treatment_recommendations JSONB,
  confidence_score DECIMAL(3,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.disease_detections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own disease detections" ON public.disease_detections
FOR ALL USING (auth.uid() = farmer_id);

-- Create voice queries table
CREATE TABLE public.voice_queries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_id UUID NOT NULL REFERENCES public.farmer_profiles(user_id) ON DELETE CASCADE,
  query_text TEXT NOT NULL,
  query_audio_url TEXT,
  ai_response TEXT NOT NULL,
  response_audio_url TEXT,
  language TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.voice_queries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own voice queries" ON public.voice_queries
FOR ALL USING (auth.uid() = farmer_id);

-- Create microplastic detections table
CREATE TABLE public.microplastic_detections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_id UUID NOT NULL REFERENCES public.farmer_profiles(user_id) ON DELETE CASCADE,
  sample_type TEXT NOT NULL CHECK (sample_type IN ('soil', 'water')),
  sample_data JSONB NOT NULL,
  contamination_risk TEXT CHECK (contamination_risk IN ('low', 'medium', 'high', 'critical')),
  ai_analysis JSONB NOT NULL,
  recommendations JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.microplastic_detections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own microplastic detections" ON public.microplastic_detections
FOR ALL USING (auth.uid() = farmer_id);

-- Create emergency SOS table
CREATE TABLE public.emergency_sos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_id UUID NOT NULL REFERENCES public.farmer_profiles(user_id) ON DELETE CASCADE,
  emergency_type TEXT NOT NULL,
  description TEXT NOT NULL,
  location_coordinates POINT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'cancelled')),
  responders_notified JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.emergency_sos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own emergency requests" ON public.emergency_sos
FOR ALL USING (auth.uid() = farmer_id);

-- Create insurance policies table
CREATE TABLE public.insurance_policies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_id UUID NOT NULL REFERENCES public.farmer_profiles(user_id) ON DELETE CASCADE,
  policy_name TEXT NOT NULL,
  provider TEXT NOT NULL,
  coverage_details JSONB NOT NULL,
  premium_amount DECIMAL(10,2),
  coverage_amount DECIMAL(10,2),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'claimed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.insurance_policies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own insurance policies" ON public.insurance_policies
FOR ALL USING (auth.uid() = farmer_id);

-- Create market intelligence table
CREATE TABLE public.market_intelligence (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  crop_name TEXT NOT NULL,
  market_location TEXT NOT NULL,
  price_data JSONB NOT NULL,
  trends_analysis JSONB,
  ai_insights JSONB,
  data_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Create unique constraint to prevent duplicate entries for same crop/location/date
  UNIQUE(crop_name, market_location, data_date)
);

ALTER TABLE public.market_intelligence ENABLE ROW LEVEL SECURITY;

-- Market intelligence is public data
CREATE POLICY "Market intelligence is viewable by all authenticated users" ON public.market_intelligence
FOR SELECT TO authenticated USING (true);

-- Create satellite damage mapping table
CREATE TABLE public.satellite_damage_mapping (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_id UUID NOT NULL REFERENCES public.farmer_profiles(user_id) ON DELETE CASCADE,
  area_coordinates JSONB NOT NULL,
  satellite_data JSONB NOT NULL,
  damage_analysis JSONB,
  damage_severity TEXT CHECK (damage_severity IN ('none', 'low', 'medium', 'high', 'severe')),
  affected_area_hectares DECIMAL(10,4),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.satellite_damage_mapping ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own satellite damage mapping" ON public.satellite_damage_mapping
FOR ALL USING (auth.uid() = farmer_id);

-- Create storage buckets for images and audio files
INSERT INTO storage.buckets (id, name, public) VALUES 
('crop-images', 'crop-images', true),
('voice-recordings', 'voice-recordings', false),
('satellite-images', 'satellite-images', true);

-- Storage policies for crop images
CREATE POLICY "Crop images are publicly viewable" ON storage.objects
FOR SELECT USING (bucket_id = 'crop-images');

CREATE POLICY "Users can upload their own crop images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'crop-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for voice recordings
CREATE POLICY "Users can view their own voice recordings" ON storage.objects
FOR SELECT USING (bucket_id = 'voice-recordings' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own voice recordings" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'voice-recordings' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for satellite images
CREATE POLICY "Satellite images are publicly viewable" ON storage.objects
FOR SELECT USING (bucket_id = 'satellite-images');

-- Create function to automatically update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for timestamp updates
CREATE TRIGGER update_farmer_profiles_updated_at
  BEFORE UPDATE ON public.farmer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_crop_calendars_updated_at
  BEFORE UPDATE ON public.crop_calendars
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- The farmer profile will be created when user fills the registration form
  -- This trigger just ensures proper setup
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();