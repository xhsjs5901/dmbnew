import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary" />
      
      {/* Animated mesh gradient blobs */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-primary/20 blur-3xl"
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute -top-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-coral/20 blur-3xl"
        animate={{
          x: [0, -50, -100, 0],
          y: [0, 100, 50, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-royal/15 blur-3xl"
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -50, -80, 0],
          scale: [1, 1.05, 0.98, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute -bottom-1/4 right-1/4 h-[450px] w-[450px] rounded-full bg-teal/15 blur-3xl"
        animate={{
          x: [0, -60, 60, 0],
          y: [0, -100, -50, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
