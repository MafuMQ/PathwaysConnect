import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Built for South African students</span>
          </div>
        </motion.div>

        <motion.h1
          className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Your pathway to{" "}
          <span className="text-gradient-gold">academic</span>
          <br />
          <span className="text-gradient-gold">success</span> starts here
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Connect with mentors, access tutoring, store documents securely, and join campus communities — all in one platform.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold text-base px-8 py-6 font-display font-semibold" asChild>
            <Link to="/signup">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary text-base px-8 py-6 font-display font-semibold" asChild>
            <a href="#features">Explore Features</a>
          </Button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {[
            { value: "8", label: "Feature Modules" },
            { value: "5", label: "User Types" },
            { value: "∞", label: "Possibilities" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-display font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
