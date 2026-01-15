import { motion } from "framer-motion";
import { Heart, Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "As a surgeon with demanding hours, I never thought I'd find someone who understands my lifestyle. Serendipity connected me with my now-husband, also a surgeon. Our families were involved from day one, which made everything so much more meaningful.",
    name: "Dr. Priya Sharma",
    specialty: "Cardiothoracic Surgeon",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    quote: "The family verification feature was what sold me. My parents could be part of the process, just like traditional matchmaking, but with modern AI insights. We got married last month!",
    name: "Dr. Rahul Mehta",
    specialty: "Orthopedic Surgeon",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    quote: "The compatibility reports were incredibly accurate. It was like the AI truly understood what makes a relationship work between two doctors. My fiancée and I connected instantly.",
    name: "Dr. Anjali Reddy",
    specialty: "Pediatrician",
    location: "Hyderabad",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-coral/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-royal/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto max-w-7xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium">Success Stories</span>
          </span>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Love Stories That{" "}
            <span className="gradient-text">Inspire</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real connections, real families, real happiness. 
            See how medical professionals found their perfect match.
          </p>
        </motion.div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card h-full p-8 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Quote icon */}
                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-foreground leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.specialty} • {testimonial.location}
                    </p>
                  </div>
                </div>
                
                {/* Hover gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-coral opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="glass-card inline-flex items-center gap-8 md:gap-12 p-6 md:p-8">
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-bold gradient-text">4,500+</div>
              <p className="text-sm text-muted-foreground mt-1">Successful Matches</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-bold gradient-text">92%</div>
              <p className="text-sm text-muted-foreground mt-1">Compatibility Score</p>
            </div>
            <div className="h-12 w-px bg-border hidden md:block" />
            <div className="text-center hidden md:block">
              <div className="font-serif text-3xl md:text-4xl font-bold gradient-text">45 Days</div>
              <p className="text-sm text-muted-foreground mt-1">Avg. Time to Match</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
