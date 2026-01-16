-- Create enum for medical specialties
CREATE TYPE public.medical_specialty AS ENUM (
  'general_medicine',
  'cardiology',
  'neurology',
  'orthopedics',
  'pediatrics',
  'psychiatry',
  'dermatology',
  'oncology',
  'surgery',
  'anesthesiology',
  'radiology',
  'pathology',
  'emergency_medicine',
  'family_medicine',
  'internal_medicine',
  'obstetrics_gynecology',
  'ophthalmology',
  'ent',
  'urology',
  'nephrology',
  'gastroenterology',
  'pulmonology',
  'endocrinology',
  'rheumatology',
  'infectious_disease',
  'dentistry',
  'other'
);

-- Create enum for gender
CREATE TYPE public.gender AS ENUM ('male', 'female');

-- Create enum for marital status
CREATE TYPE public.marital_status AS ENUM ('never_married', 'divorced', 'widowed');

-- Create enum for verification status
CREATE TYPE public.verification_status AS ENUM ('pending', 'in_review', 'verified', 'rejected');

-- Create enum for subscription tier
CREATE TYPE public.subscription_tier AS ENUM ('basic', 'gold', 'platinum');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  
  -- Basic Info
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  gender gender,
  height_cm INTEGER,
  
  -- Location
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  
  -- Professional Info
  specialty medical_specialty,
  hospital_name TEXT,
  years_of_experience INTEGER,
  medical_registration_number TEXT,
  
  -- Personal
  marital_status marital_status DEFAULT 'never_married',
  about_me TEXT,
  looking_for TEXT,
  
  -- Photos
  avatar_url TEXT,
  photos TEXT[] DEFAULT '{}',
  
  -- Status
  verification_status verification_status DEFAULT 'pending',
  subscription_tier subscription_tier DEFAULT 'basic',
  is_profile_complete BOOLEAN DEFAULT false,
  questionnaire_completed BOOLEAN DEFAULT false,
  family_verified BOOLEAN DEFAULT false,
  
  -- Preferences
  preferred_age_min INTEGER DEFAULT 25,
  preferred_age_max INTEGER DEFAULT 40,
  preferred_location TEXT[],
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create questionnaire_responses table
CREATE TABLE public.questionnaire_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  
  -- Values & Faith (Questions 1-4)
  religious_practice TEXT, -- 'very_religious', 'moderately_religious', 'spiritual', 'not_religious'
  family_importance TEXT, -- 'extremely_important', 'very_important', 'somewhat_important', 'not_important'
  traditional_values TEXT, -- 'very_traditional', 'blend', 'modern', 'very_modern'
  life_priorities TEXT[], -- ['career', 'family', 'travel', 'spirituality', 'wealth', 'health']
  
  -- Lifestyle & Habits (Questions 5-8)
  work_life_balance TEXT, -- 'work_focused', 'balanced', 'life_focused'
  social_nature TEXT, -- 'very_social', 'moderately_social', 'homebody', 'selective'
  health_fitness TEXT, -- 'very_active', 'moderately_active', 'occasionally_active', 'not_active'
  dietary_preferences TEXT, -- 'vegetarian', 'non_vegetarian', 'vegan', 'no_preference'
  
  -- Career & Ambitions (Questions 9-11)
  career_ambition TEXT, -- 'highly_ambitious', 'moderately_ambitious', 'content', 'flexible'
  relocation_willingness TEXT, -- 'very_willing', 'somewhat_willing', 'prefer_not', 'not_willing'
  financial_goals TEXT, -- 'aggressive_saving', 'balanced', 'enjoy_now', 'flexible'
  
  -- Personality Traits (Questions 12-15)
  communication_style TEXT, -- 'direct', 'diplomatic', 'listener', 'expressive'
  conflict_resolution TEXT, -- 'discuss_immediately', 'take_time', 'avoid', 'compromise'
  adventure_level TEXT, -- 'very_adventurous', 'moderately_adventurous', 'prefer_routine', 'homebody'
  decision_making TEXT, -- 'logical', 'emotional', 'intuitive', 'collaborative'
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create compatibility_scores table for caching match scores
CREATE TABLE public.compatibility_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id_1 UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_id_2 UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  overall_score INTEGER NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  values_score INTEGER CHECK (values_score >= 0 AND values_score <= 100),
  lifestyle_score INTEGER CHECK (lifestyle_score >= 0 AND lifestyle_score <= 100),
  career_score INTEGER CHECK (career_score >= 0 AND career_score <= 100),
  personality_score INTEGER CHECK (personality_score >= 0 AND personality_score <= 100),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
  UNIQUE(user_id_1, user_id_2)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questionnaire_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compatibility_scores ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can view other verified profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (
  is_profile_complete = true 
  AND verification_status = 'verified'
);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Questionnaire policies
CREATE POLICY "Users can view their own questionnaire"
ON public.questionnaire_responses FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own questionnaire"
ON public.questionnaire_responses FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own questionnaire"
ON public.questionnaire_responses FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Compatibility scores policies
CREATE POLICY "Users can view their own compatibility scores"
ON public.compatibility_scores FOR SELECT
TO authenticated
USING (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_questionnaire_updated_at
BEFORE UPDATE ON public.questionnaire_responses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for auto profile creation
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();