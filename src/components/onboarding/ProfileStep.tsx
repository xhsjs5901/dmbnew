import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Stethoscope, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProfileData } from '@/pages/Onboarding';

interface ProfileStepProps {
  data: ProfileData;
  setData: (data: ProfileData) => void;
  onSubmit: () => void;
  loading: boolean;
}

const SPECIALTIES = [
  { value: 'general_medicine', label: 'General Medicine' },
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'neurology', label: 'Neurology' },
  { value: 'orthopedics', label: 'Orthopedics' },
  { value: 'pediatrics', label: 'Pediatrics' },
  { value: 'psychiatry', label: 'Psychiatry' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'oncology', label: 'Oncology' },
  { value: 'surgery', label: 'Surgery' },
  { value: 'anesthesiology', label: 'Anesthesiology' },
  { value: 'radiology', label: 'Radiology' },
  { value: 'pathology', label: 'Pathology' },
  { value: 'emergency_medicine', label: 'Emergency Medicine' },
  { value: 'family_medicine', label: 'Family Medicine' },
  { value: 'internal_medicine', label: 'Internal Medicine' },
  { value: 'obstetrics_gynecology', label: 'Obstetrics & Gynecology' },
  { value: 'ophthalmology', label: 'Ophthalmology' },
  { value: 'ent', label: 'ENT' },
  { value: 'urology', label: 'Urology' },
  { value: 'nephrology', label: 'Nephrology' },
  { value: 'gastroenterology', label: 'Gastroenterology' },
  { value: 'pulmonology', label: 'Pulmonology' },
  { value: 'endocrinology', label: 'Endocrinology' },
  { value: 'rheumatology', label: 'Rheumatology' },
  { value: 'infectious_disease', label: 'Infectious Disease' },
  { value: 'dentistry', label: 'Dentistry' },
  { value: 'other', label: 'Other' },
];

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Chandigarh', 'Puducherry',
];

const ProfileStep: React.FC<ProfileStepProps> = ({ data, setData, onSubmit, loading }) => {
  const updateField = (field: keyof ProfileData, value: any) => {
    setData({ ...data, [field]: value });
  };

  const isValid = data.firstName && data.lastName && data.gender && data.specialty;

  return (
    <div className="glass-card p-8 rounded-3xl">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold gradient-text">Complete Your Profile</h2>
        <p className="text-muted-foreground mt-2">Tell us about yourself to help find your perfect match</p>
      </div>

      <div className="space-y-8">
        {/* Personal Information */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Personal Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={data.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                placeholder="John"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={data.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                placeholder="Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={data.dateOfBirth}
                onChange={(e) => updateField('dateOfBirth', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Gender *</Label>
              <Select value={data.gender} onValueChange={(value) => updateField('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="heightCm">Height (cm)</Label>
              <Input
                id="heightCm"
                type="number"
                value={data.heightCm}
                onChange={(e) => updateField('heightCm', parseInt(e.target.value) || 0)}
                min={100}
                max={250}
              />
            </div>
          </div>
        </section>

        {/* Location */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Location</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={data.city}
                onChange={(e) => updateField('city', e.target.value)}
                placeholder="Mumbai"
              />
            </div>
            <div className="space-y-2">
              <Label>State</Label>
              <Select value={data.state} onValueChange={(value) => updateField('state', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {INDIAN_STATES.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Professional Information */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Stethoscope className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Professional Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Medical Specialty *</Label>
              <Select value={data.specialty} onValueChange={(value) => updateField('specialty', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIALTIES.map((specialty) => (
                    <SelectItem key={specialty.value} value={specialty.value}>
                      {specialty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hospitalName">Hospital/Clinic Name</Label>
              <Input
                id="hospitalName"
                value={data.hospitalName}
                onChange={(e) => updateField('hospitalName', e.target.value)}
                placeholder="Apollo Hospital"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearsOfExperience">Years of Experience</Label>
              <Input
                id="yearsOfExperience"
                type="number"
                value={data.yearsOfExperience}
                onChange={(e) => updateField('yearsOfExperience', parseInt(e.target.value) || 0)}
                min={0}
                max={50}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medicalRegistrationNumber">Medical Registration Number</Label>
              <Input
                id="medicalRegistrationNumber"
                value={data.medicalRegistrationNumber}
                onChange={(e) => updateField('medicalRegistrationNumber', e.target.value)}
                placeholder="MCI-XXXXX"
              />
            </div>
          </div>
        </section>

        {/* About Me */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">About You</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aboutMe">Tell us about yourself</Label>
              <Textarea
                id="aboutMe"
                value={data.aboutMe}
                onChange={(e) => updateField('aboutMe', e.target.value)}
                placeholder="Share your interests, hobbies, and what makes you unique..."
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lookingFor">What are you looking for in a partner?</Label>
              <Textarea
                id="lookingFor"
                value={data.lookingFor}
                onChange={(e) => updateField('lookingFor', e.target.value)}
                placeholder="Describe your ideal partner and relationship goals..."
                className="min-h-[100px]"
              />
            </div>
          </div>
        </section>

        <Button
          onClick={onSubmit}
          disabled={!isValid || loading}
          className="w-full btn-primary h-12 text-base font-semibold group"
        >
          {loading ? (
            <motion.div
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          ) : (
            <>
              Continue to Questionnaire
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProfileStep;
