import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-6xl">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Compass className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground">
            Pathways<span className="text-primary">Connect</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#users" className="hover:text-foreground transition-colors">For Who</a>
          <a href="#" className="hover:text-foreground transition-colors">About</a>
        </div>

        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold" asChild>
          <Link to="/signup">Sign Up</Link>
        </Button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
