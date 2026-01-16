import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Heart, Search, User, Bell, LogOut, Settings, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  specialty: string | null;
  city: string | null;
  state: string | null;
  avatar_url: string | null;
  verification_status: string;
  family_verified: boolean;
  subscription_tier: string;
}

const Dashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch current user's profile
        const { data: myProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (myProfile) {
          setCurrentProfile(myProfile);
          
          // Check if profile is complete
          if (!myProfile.is_profile_complete || !myProfile.questionnaire_completed) {
            navigate('/onboarding');
            return;
          }
        }

        // Fetch other profiles (excluding own)
        const { data: otherProfiles } = await supabase
          .from('profiles')
          .select('*')
          .neq('user_id', user.id)
          .eq('is_profile_complete', true)
          .limit(20);

        setProfiles(otherProfiles || []);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    toast({
      title: 'Signed out',
      description: 'You have been signed out successfully.',
    });
  };

  const formatSpecialty = (specialty: string | null) => {
    if (!specialty) return 'Medical Professional';
    return specialty
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (authLoading || loading) {
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-nav border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl gradient-text">Serendipity</span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold">
            Welcome back, <span className="gradient-text">{currentProfile?.first_name || 'Doctor'}</span>! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover your perfect match from our community of verified medical professionals.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by specialty, location, or name..."
            className="pl-12 h-12 text-base"
          />
        </div>

        {/* Profiles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {profiles.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No matches yet</h3>
              <p className="text-muted-foreground">
                Be one of the first to complete your profile and start matching!
              </p>
            </div>
          ) : (
            profiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-2xl overflow-hidden group cursor-pointer hover:shadow-glow transition-all"
              >
                {/* Avatar */}
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={`${profile.first_name} ${profile.last_name}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-16 h-16 text-muted-foreground" />
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {profile.verification_status === 'verified' && (
                      <span className="badge-verified">✓ Verified</span>
                    )}
                    {profile.family_verified && (
                      <span className="badge-family animate-shimmer">👨‍👩‍👧 Family Verified</span>
                    )}
                    {profile.subscription_tier === 'platinum' && (
                      <span className="badge-premium animate-pulse-glow">
                        <Sparkles className="w-3 h-3" />
                        Platinum
                      </span>
                    )}
                  </div>

                  {/* Compatibility score (placeholder) */}
                  <div className="absolute bottom-3 right-3">
                    <div className="w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center border-2 border-primary">
                      <span className="text-sm font-bold text-primary">
                        {Math.floor(Math.random() * 30 + 70)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg">
                    {profile.first_name} {profile.last_name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formatSpecialty(profile.specialty)}
                  </p>
                  {(profile.city || profile.state) && (
                    <p className="text-xs text-muted-foreground mt-1">
                      📍 {[profile.city, profile.state].filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
