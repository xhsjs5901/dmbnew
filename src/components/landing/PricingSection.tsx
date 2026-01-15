import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Sparkles, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const tiers = [
  {
    name: "Basic",
    description: "Start exploring the platform",
    monthlyPrice: 0,
    annualPrice: 0,
    icon: Star,
    popular: false,
    features: [
      { name: "Browse 10 profiles per day", included: true },
      { name: "Create your profile", included: true },
      { name: "Personality questionnaire", included: true },
      { name: "Basic compatibility score", included: true },
      { name: "Send messages", included: false },
      { name: "Full compatibility reports", included: false },
      { name: "Priority in search", included: false },
      { name: "See who viewed you", included: false },
      { name: "AI compatibility insights", included: false },
      { name: "Video call integration", included: false },
      { name: "Dedicated matchmaker", included: false },
    ],
    cta: "Get Started Free",
    gradient: "from-muted to-secondary",
  },
  {
    name: "Gold",
    description: "Unlock the full experience",
    monthlyPrice: 29,
    annualPrice: 249,
    icon: Sparkles,
    popular: true,
    features: [
      { name: "Unlimited profile browsing", included: true },
      { name: "Create your profile", included: true },
      { name: "Personality questionnaire", included: true },
      { name: "Basic compatibility score", included: true },
      { name: "Unlimited messaging", included: true },
      { name: "Full compatibility reports", included: true },
      { name: "Priority in search", included: true },
      { name: "See who viewed you", included: true },
      { name: "AI compatibility insights", included: false },
      { name: "Video call integration", included: false },
      { name: "Dedicated matchmaker", included: false },
    ],
    cta: "Start Gold Trial",
    gradient: "from-primary to-coral",
  },
  {
    name: "Platinum",
    description: "The ultimate matchmaking experience",
    monthlyPrice: 79,
    annualPrice: 699,
    icon: Crown,
    popular: false,
    features: [
      { name: "Unlimited profile browsing", included: true },
      { name: "Create your profile", included: true },
      { name: "Personality questionnaire", included: true },
      { name: "Basic compatibility score", included: true },
      { name: "Unlimited messaging", included: true },
      { name: "Full compatibility reports", included: true },
      { name: "Priority in search", included: true },
      { name: "See who viewed you", included: true },
      { name: "AI compatibility insights", included: true },
      { name: "Video call integration", included: true },
      { name: "Dedicated matchmaker", included: true },
    ],
    cta: "Go Platinum",
    gradient: "from-royal to-teal",
  },
];

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border mb-6">
            <Crown className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium">Simple, Transparent Pricing</span>
          </span>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Choose Your{" "}
            <span className="gradient-text">Path to Love</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Invest in your future. All plans include our core matching technology.
          </p>
        </motion.div>
        
        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span className={`text-sm font-medium ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-primary"
          />
          <span className={`text-sm font-medium ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
            Annual
          </span>
          {isAnnual && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="badge-gold text-xs"
            >
              Save up to 28%
            </motion.span>
          )}
        </motion.div>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
            const period = isAnnual ? "/year" : "/month";
            
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative ${tier.popular ? "md:-mt-4 md:mb-4" : ""}`}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="badge-gold">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div 
                  className={`glass-card h-full flex flex-col ${
                    tier.popular 
                      ? "border-2 border-primary shadow-2xl shadow-primary/20" 
                      : ""
                  }`}
                >
                  {/* Header */}
                  <div className="p-8 pb-0">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${tier.gradient} mb-4`}>
                      <tier.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="font-serif text-2xl font-bold mb-1">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                    
                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-6">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={price}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="font-serif text-4xl font-bold"
                        >
                          {price === 0 ? "Free" : `$${price}`}
                        </motion.span>
                      </AnimatePresence>
                      {price !== 0 && (
                        <span className="text-muted-foreground">{period}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="p-8 pt-0 flex-1">
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature.name} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground/40 shrink-0 mt-0.5" />
                          )}
                          <span className={feature.included ? "text-foreground" : "text-muted-foreground/60"}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* CTA */}
                  <div className="p-8 pt-0">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 rounded-full font-semibold transition-all ${
                        tier.popular
                          ? "btn-gradient"
                          : "bg-secondary hover:bg-secondary/80 text-foreground"
                      }`}
                    >
                      {tier.cta}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          All plans include secure payment processing. Cancel anytime. No hidden fees.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
