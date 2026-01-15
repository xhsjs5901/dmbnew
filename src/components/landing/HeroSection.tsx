import { motion } from "framer-motion";
import { Heart, Shield, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "./AnimatedCounter";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-secondary border border-border"
            >
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Verified Medical Professionals Only</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            >
              Where{" "}
              <span className="gradient-text">Exceptional Minds</span>
              {" "}Meet{" "}
              <span className="gradient-text-accent">Extraordinary Hearts</span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
            >
              The exclusive matrimonial platform for medical professionals. 
              AI-powered compatibility, family endorsements, and dedicated matchmakers 
              for those who dedicate their lives to healing others.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-gradient text-lg pulse-glow"
              >
                <Heart className="w-5 h-5 inline mr-2" />
                Start Your Journey
              </motion.button>
              
              <Button variant="outline" size="lg" className="rounded-full px-8">
                <Users className="w-5 h-5 mr-2" />
                For Families
              </Button>
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start"
            >
              <div className="text-center">
                <AnimatedCounter end={15000} suffix="+" delay={0.8} />
                <p className="text-sm text-muted-foreground mt-1">Verified Doctors</p>
              </div>
              <div className="text-center">
                <AnimatedCounter end={4500} suffix="+" delay={1} />
                <p className="text-sm text-muted-foreground mt-1">Successful Matches</p>
              </div>
              <div className="text-center">
                <AnimatedCounter end={98} suffix="%" delay={1.2} />
                <p className="text-sm text-muted-foreground mt-1">Verified Profiles</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Content - Glassmorphism Registration Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-10 -right-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-coral opacity-20 blur-xl"
              animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-br from-royal to-teal opacity-20 blur-xl"
              animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Main Card */}
            <motion.div
              className="glass-card p-8 lg:p-10 relative overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Premium badge */}
              <div className="absolute -top-1 -right-1">
                <div className="badge-gold">
                  <Sparkles className="w-3 h-3" />
                  Premium Platform
                </div>
              </div>
              
              <div className="pt-4">
                <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-2">
                  Find Your Perfect Match
                </h2>
                <p className="text-muted-foreground mb-8">
                  Join thousands of medical professionals who found love
                </p>
                
                {/* Quick signup form preview */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-secondary/50 border border-border text-center hover:bg-secondary transition-colors cursor-pointer">
                      <span className="text-2xl block mb-1">👨‍⚕️</span>
                      <span className="text-sm font-medium">I'm a Doctor</span>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50 border border-border text-center hover:bg-secondary transition-colors cursor-pointer">
                      <span className="text-2xl block mb-1">👨‍👩‍👧</span>
                      <span className="text-sm font-medium">I'm a Parent</span>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-gradient text-lg"
                  >
                    Create Free Account
                  </motion.button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
