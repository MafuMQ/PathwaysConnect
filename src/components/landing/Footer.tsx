import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-20 border-t border-border">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
          Ready to <span className="text-gradient-gold">connect</span>?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Join thousands of South African students building their future together.
        </p>
        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold font-display font-semibold px-8 py-6" asChild>
          <Link to="/signup">
            Join PathwaysConnect
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
        <div className="mt-16 text-xs text-muted-foreground">
          © {new Date().getFullYear()} PathwaysConnect. Built for South Africa's future.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
