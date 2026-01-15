import { motion } from "framer-motion";
import { 
  Brain, 
  Heart, 
  Shield, 
  Users, 
  Sparkles, 
  Video,
  BadgeCheck,
  Crown
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Compatibility Matching",
    description: "Our advanced algorithm analyzes 50+ personality dimensions to find your ideal match with scientific precision.",
    gradient: "from-primary to-coral",
  },
  {
    icon: Users,
    title: "Family Verified Profiles",
    description: "Parents can endorse and verify profiles, adding a layer of trust that traditional platforms can't match.",
    gradient: "from-royal to-teal",
  },
  {
    icon: Shield,
    title: "Multi-Step Verification",
    description: "Three-tier credential verification ensures every member is a genuine medical professional.",
    gradient: "from-teal to-royal",
  },
  {
    icon: Crown,
    title: "Dedicated Matchmakers",
    description: "Platinum members get personal matchmaking concierge service with expert guidance.",
    gradient: "from-gold to-sunset",
  },
  {
    icon: Video,
    title: "Video Introductions",
    description: "Get to know matches through integrated video calls before deciding to meet in person.",
    gradient: "from-coral to-primary",
  },
  {
    icon: BadgeCheck,
    title: "Privacy First",
    description: "Your data stays secure with enterprise-grade encryption and strict privacy controls.",
    gradient: "from-primary to-royal",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto max-w-7xl relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Why Choose Serendipity</span>
          </motion.span>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Everything You Need for{" "}
            <span className="gradient-text">Meaningful Connections</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've reimagined matrimonial matchmaking for the modern medical professional, 
            combining cutting-edge technology with time-honored family values.
          </p>
        </motion.div>
        
        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group relative"
            >
              <div className="glass-card h-full p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover gradient line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
