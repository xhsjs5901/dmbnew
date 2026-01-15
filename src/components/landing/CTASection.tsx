import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-coral" />
      
      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/10 blur-2xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      {/* Floating hearts */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white/20"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            rotate: [-5, 5, -5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart className="w-8 h-8" fill="currentColor" />
        </motion.div>
      ))}
      
      <div className="container mx-auto max-w-4xl relative text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Join 15,000+ Medical Professionals</span>
          </motion.span>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Your Story of Love<br />
            Begins Today
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Take the first step towards finding your perfect match. 
            Create your profile in 5 minutes and let our AI find your 
            most compatible matches.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold text-lg shadow-2xl shadow-black/20 transition-all hover:shadow-white/30"
            >
              Create Free Profile
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 font-semibold text-lg transition-all hover:bg-white/30"
            >
              Learn More
            </motion.button>
          </div>
          
          <p className="mt-8 text-sm text-white/70">
            ✓ Free to join • ✓ Verified profiles only • ✓ Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
