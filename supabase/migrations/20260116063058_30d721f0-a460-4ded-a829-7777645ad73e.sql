-- Create a public view that excludes sensitive PII columns (email, phone, medical_registration_number)
-- This view is used when authenticated users view OTHER users' profiles
CREATE VIEW public.profiles_public
WITH (security_invoker=on) AS
  SELECT 
    id,
    user_id,
    first_name,
    last_name,
    date_of_birth,
    gender,
    height_cm,
    specialty,
    years_of_experience,
    marital_status,
    verification_status,
    subscription_tier,
    is_profile_complete,
    questionnaire_completed,
    family_verified,
    preferred_age_min,
    preferred_age_max,
    city,
    state,
    country,
    hospital_name,
    about_me,
    looking_for,
    avatar_url,
    photos,
    preferred_location,
    created_at,
    updated_at,
    last_active_at
    -- EXCLUDED: email, phone, medical_registration_number (PII)
  FROM public.profiles;