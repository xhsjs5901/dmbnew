import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Check, Star, Stethoscope, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

const profiles = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    age: 28,
    specialty: "Cardiologist",
    location: "Mumbai",
    avatar: "👩‍⚕️",
    verified: true,
    compatibility: 94,
  },
  {
    id: 2,
    name: "Dr. Arjun Patel",
    age: 31,
    specialty: "Neurologist",
    location: "Delhi",
    avatar: "👨‍⚕️",
    verified: true,
    compatibility: 91,
  },
  {
    id: 3,
    name: "Dr. Ananya Reddy",
    age: 29,
    specialty: "Pediatrician",
    location: "Bangalore",
    avatar: "👩‍⚕️",
    verified: true,
    compatibility: 97,
  },
  {
    id: 4,
    name: "Dr. Vikram Singh",
    age: 33,
    specialty: "Orthopedic",
    location: "Chennai",
    avatar: "👨‍⚕️",
    verified: true,
    compatibility: 89,
  },
];

const matchMessages = [
  "Finding your perfect match...",
  "Analyzing compatibility scores...",
  "Checking shared values...",
  "Matching career goals...",
  "It's a match! 💕",
];

const FloatingHearts = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        initial={{ 
          x: Math.random() * 100 + "%", 
          y: "100%",
          opacity: 0.6,
          scale: 0.5 + Math.random() * 0.5
        }}
        animate={{ 
          y: "-20%",
          opacity: [0.6, 0.8, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ 
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          delay: i * 0.8,
          ease: "easeOut"
        }}
      >
        <Heart className="w-4 h-4 text-primary/40 fill-primary/20" />
      </motion.div>
    ))}
  </div>
);

const CompatibilityRing = ({ percentage }: { percentage: number }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="relative w-28 h-28 sm:w-32 sm:h-32">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="6"
        />
        {/* Progress ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          style={{ strokeDasharray: circumference }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(330, 85%, 45%)" />
            <stop offset="100%" stopColor="hsl(15, 90%, 60%)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <motion.span 
          className="text-2xl sm:text-3xl font-bold gradient-text"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {percentage}%
        </motion.span>
        <span className="text-[10px] sm:text-xs text-muted-foreground">Match</span>
      </div>
    </div>
  );
};

const ProfileCard = ({ 
  profile, 
  index, 
  isActive 
}: { 
  profile: typeof profiles[0]; 
  index: number;
  isActive: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 50, scale: 0.8 }}
    animate={{ 
      opacity: isActive ? 1 : 0.6, 
      x: 0, 
      scale: isActive ? 1 : 0.9,
      y: isActive ? 0 : index * 10
    }}
    exit={{ opacity: 0, x: -50, scale: 0.8 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`
      relative p-3 sm:p-4 rounded-2xl border backdrop-blur-lg
      ${isActive 
        ? 'bg-card/95 border-primary/30 shadow-xl shadow-primary/10' 
        : 'bg-card/60 border-border'
      }
    `}
  >
    {/* Verified Badge */}
    {profile.verified && (
      <motion.div 
        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
      >
        <Check className="w-3 h-3 text-accent-foreground" />
      </motion.div>
    )}
    
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl sm:text-3xl">
        {profile.avatar}
      </div>
      
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <h4 className="font-semibold text-sm sm:text-base truncate">{profile.name}</h4>
          <span className="text-muted-foreground text-xs">{profile.age}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Stethoscope className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{profile.specialty}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span>{profile.location}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const HeroMatchShowcase = () => {
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev < matchMessages.length - 1) {
          return prev + 1;
        }
        setShowMatch(true);
        return prev;
      });
    }, 1200);
    
    const matchInterval = setInterval(() => {
      setMessageIndex(0);
      setShowMatch(false);
      setCurrentMatchIndex((prev) => (prev + 1) % profiles.length);
    }, 7000);
    
    return () => {
      clearInterval(messageInterval);
      clearInterval(matchInterval);
    };
  }, []);
  
  const currentProfile = profiles[currentMatchIndex];
  const nextProfile = profiles[(currentMatchIndex + 1) % profiles.length];
  
  return (
    <div className="relative w-full h-full min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]">
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gradient-primary)" }}
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-40 h-40 sm:w-56 sm:h-56 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-accent)" }}
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -15, 0],
          y: [0, 15, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <FloatingHearts />
      
      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 sm:gap-6">
        {/* Status Message */}
        <motion.div 
          className="glass-card px-4 py-2 flex items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            animate={{ rotate: showMatch ? 0 : 360 }}
            transition={{ duration: 1, repeat: showMatch ? 0 : Infinity, ease: "linear" }}
          >
            {showMatch ? (
              <Heart className="w-4 h-4 text-primary fill-primary" />
            ) : (
              <Sparkles className="w-4 h-4 text-primary" />
            )}
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.span
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs sm:text-sm font-medium"
            >
              {matchMessages[messageIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>
        
        {/* Match Display Area */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Left Profile */}
          <AnimatePresence mode="wait">
            <ProfileCard 
              key={currentProfile.id} 
              profile={currentProfile} 
              index={0} 
              isActive={true}
            />
          </AnimatePresence>
          
          {/* Compatibility Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <CompatibilityRing percentage={currentProfile.compatibility} />
          </motion.div>
          
          {/* Right Profile */}
          <AnimatePresence mode="wait">
            <ProfileCard 
              key={nextProfile.id + "-next"} 
              profile={nextProfile} 
              index={1} 
              isActive={showMatch}
            />
          </AnimatePresence>
        </div>
        
        {/* Match Success Animation */}
        <AnimatePresence>
          {showMatch && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <motion.div 
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-coral text-white text-sm font-medium"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <Star className="w-4 h-4 fill-current" />
                High Compatibility Match!
              </motion.div>
              
              {/* Compatibility breakdown */}
              <motion.div 
                className="glass-card p-3 flex gap-4 text-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-center">
                  <div className="font-semibold text-primary">95%</div>
                  <div className="text-muted-foreground">Values</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-accent">92%</div>
                  <div className="text-muted-foreground">Lifestyle</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-primary">98%</div>
                  <div className="text-muted-foreground">Career</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Bottom Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="glass-card p-3 sm:p-4 max-w-xs sm:max-w-sm text-center mt-2"
        >
          <div className="flex justify-center gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-gold fill-gold" />
            ))}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed">
            "Found my soulmate in 3 months! The AI matching is incredibly accurate."
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
              👩‍⚕️
            </div>
            <span className="text-xs font-medium">Dr. Meera K., Cardiologist</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroMatchShowcase;
