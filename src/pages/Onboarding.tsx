import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ProfileStep from '@/components/onboarding/ProfileStep';
import QuestionnaireStep from '@/components/onboarding/QuestionnaireStep';
import CompletionStep from '@/components/onboarding/CompletionStep';
import OnboardingProgress from '@/components/onboarding/OnboardingProgress';

export interface ProfileData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  heightCm: number;
  city: string;
  state: string;
  specialty: string;
  hospitalName: string;
  yearsOfExperience: number;
  medicalRegistrationNumber: string;
  aboutMe: string;
  lookingFor: string;
}

export interface QuestionnaireData {
  religiousPractice: string;
  familyImportance: string;
  traditionalValues: string;
  lifePriorities: string[];
  workLifeBalance: string;
  socialNature: string;
  healthFitness: string;
  dietaryPreferences: string;
  careerAmbition: string;
  relocationWillingness: string;
  financialGoals: string;
  communicationStyle: string;
  conflictResolution: string;
  adventureLevel: string;
  decisionMaking: string;
}

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    heightCm: 170,
    city: '',
    state: '',
    specialty: '',
    hospitalName: '',
    yearsOfExperience: 0,
    medicalRegistrationNumber: '',
    aboutMe: '',
    lookingFor: '',
  });
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData>({
    religiousPractice: '',
    familyImportance: '',
    traditionalValues: '',
    lifePriorities: [],
    workLifeBalance: '',
    socialNature: '',
    healthFitness: '',
    dietaryPreferences: '',
    careerAmbition: '',
    relocationWillingness: '',
    financialGoals: '',
    communicationStyle: '',
    conflictResolution: '',
    adventureLevel: '',
    decisionMaking: '',
  });
  const [loading, setLoading] = useState(false);

  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        if (profile.is_profile_complete && profile.questionnaire_completed) {
          navigate('/dashboard');
          return;
        }
        
        setProfileData({
          firstName: profile.first_name || '',
          lastName: profile.last_name || '',
          dateOfBirth: profile.date_of_birth || '',
          gender: profile.gender || '',
          heightCm: profile.height_cm || 170,
          city: profile.city || '',
          state: profile.state || '',
          specialty: profile.specialty || '',
          hospitalName: profile.hospital_name || '',
          yearsOfExperience: profile.years_of_experience || 0,
          medicalRegistrationNumber: profile.medical_registration_number || '',
          aboutMe: profile.about_me || '',
          lookingFor: profile.looking_for || '',
        });
      }
    };

    loadProfile();
  }, [user, navigate]);

  const steps = [
    { title: 'Your Profile', description: 'Tell us about yourself' },
    { title: 'Personality', description: 'Help us find your match' },
    { title: 'Complete', description: 'Ready to find love' },
  ];

  const handleProfileSubmit = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          date_of_birth: profileData.dateOfBirth || null,
          gender: profileData.gender as any || null,
          height_cm: profileData.heightCm,
          city: profileData.city,
          state: profileData.state,
          specialty: profileData.specialty as any || null,
          hospital_name: profileData.hospitalName,
          years_of_experience: profileData.yearsOfExperience,
          medical_registration_number: profileData.medicalRegistrationNumber,
          about_me: profileData.aboutMe,
          looking_for: profileData.lookingFor,
          is_profile_complete: true,
        })
        .eq('user_id', user.id);

      if (error) throw error;
      setCurrentStep(1);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save profile',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionnaireSubmit = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // Upsert questionnaire responses
      const { error: questionnaireError } = await supabase
        .from('questionnaire_responses')
        .upsert({
          user_id: user.id,
          religious_practice: questionnaireData.religiousPractice,
          family_importance: questionnaireData.familyImportance,
          traditional_values: questionnaireData.traditionalValues,
          life_priorities: questionnaireData.lifePriorities,
          work_life_balance: questionnaireData.workLifeBalance,
          social_nature: questionnaireData.socialNature,
          health_fitness: questionnaireData.healthFitness,
          dietary_preferences: questionnaireData.dietaryPreferences,
          career_ambition: questionnaireData.careerAmbition,
          relocation_willingness: questionnaireData.relocationWillingness,
          financial_goals: questionnaireData.financialGoals,
          communication_style: questionnaireData.communicationStyle,
          conflict_resolution: questionnaireData.conflictResolution,
          adventure_level: questionnaireData.adventureLevel,
          decision_making: questionnaireData.decisionMaking,
        });

      if (questionnaireError) throw questionnaireError;

      // Update profile to mark questionnaire as completed
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ questionnaire_completed: true })
        .eq('user_id', user.id);

      if (profileError) throw profileError;

      setCurrentStep(2);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save questionnaire',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <OnboardingProgress steps={steps} currentStep={currentStep} />

        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ProfileStep
                data={profileData}
                setData={setProfileData}
                onSubmit={handleProfileSubmit}
                loading={loading}
              />
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="questionnaire"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <QuestionnaireStep
                data={questionnaireData}
                setData={setQuestionnaireData}
                onSubmit={handleQuestionnaireSubmit}
                onBack={() => setCurrentStep(0)}
                loading={loading}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="completion"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <CompletionStep />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
