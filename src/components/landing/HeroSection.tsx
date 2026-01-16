import { motion } from "framer-motion";
import { Heart, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "./AnimatedCounter";
import HeroMatchShowcase from "./HeroMatchShowcase";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-20 overflow-hidden">
      <div className="container mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-secondary border border-border"
            >
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap">Verified Medical Professionals Only</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-[1.1] sm:leading-tight mb-4 sm:mb-6"
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
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 px-2 sm:px-0"
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
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-gradient text-base sm:text-lg pulse-glow w-full sm:w-auto"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                Start Your Journey
              </motion.button>
              
              <Button variant="outline" size="lg" className="rounded-full px-6 sm:px-8 w-full sm:w-auto">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                For Families
              </Button>
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-md mx-auto lg:mx-0 lg:max-w-none lg:flex lg:flex-wrap"
            >
              <div className="text-center">
                <AnimatedCounter end={15000} suffix="+" delay={0.8} />
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">Verified Doctors</p>
              </div>
              <div className="text-center">
                <AnimatedCounter end={4500} suffix="+" delay={1} />
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">Successful Matches</p>
              </div>
              <div className="text-center">
                <AnimatedCounter end={98} suffix="%" delay={1.2} />
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">Verified Profiles</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Content - Dynamic Match Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative order-1 lg:order-2"
          >
            <HeroMatchShowcase />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
