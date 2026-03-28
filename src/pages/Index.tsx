import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import UserTypes from "@/components/landing/UserTypes";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <div id="features">
        <Features />
      </div>
      <div id="users">
        <UserTypes />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
