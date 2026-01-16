import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, CheckCircle2, ArrowRight, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

const CompletionStep = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#E91E63', '#9C27B0', '#FF5722'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#E91E63', '#9C27B0', '#FF5722'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
    
    // Show content after animation
    setTimeout(() => setShowContent(true), 500);
  }, []);

  const features = [
    { icon: Users, text: 'Browse verified medical professionals' },
    { icon: Heart, text: 'See compatibility scores based on your personality' },
    { icon: Shield, text: 'Your credentials will be verified by our team' },
  ];

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-primary shadow-glow mb-8"
      >
        <CheckCircle2 className="w-12 h-12 text-white" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-display font-bold gradient-text mb-4">
          Profile Complete! 🎉
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          You're all set to start your journey to finding your perfect match.
        </p>

        <div className="glass-card p-6 rounded-2xl mb-8 text-left max-w-md mx-auto">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            What's Next?
          </h3>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <motion.li
                key={feature.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">{feature.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <Button
          onClick={() => navigate('/dashboard')}
          className="btn-primary h-12 px-8 text-base font-semibold group"
        >
          Explore Matches
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </div>
  );
};

export default CompletionStep;
