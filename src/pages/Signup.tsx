import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Compass, ArrowLeft, BookOpen, GraduationCap, Briefcase, Shield, Heart, Check } from "lucide-react";

const roles: { value: UserRole; label: string; description: string; icon: React.ElementType }[] = [
  { value: "learner", label: "Learner", description: "Grade 11 or 12 secondary school learner", icon: BookOpen },
  { value: "student_mentor", label: "Student Mentor", description: "Currently enrolled tertiary student", icon: GraduationCap },
  { value: "graduate_tutor", label: "Graduate Tutor", description: "Unemployed or underemployed graduate", icon: Briefcase },
  { value: "educator_admin", label: "Educator / Admin", description: "Teacher, university staff or coordinator", icon: Shield },
  { value: "donor_corporate", label: "Donor / Corporate", description: "Company or individual sponsor", icon: Heart },
];

const Signup = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [institution, setInstitution] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    await signup({ email, password, name, role: selectedRole, institution });
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Compass className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            Pathways<span className="text-primary">Connect</span>
          </span>
        </div>

        <h1 className="font-display text-3xl font-bold mb-2">Create your account</h1>
        <p className="text-muted-foreground mb-8">
          {step === 1 ? "Choose your role to get started" : "Fill in your details"}
        </p>

        {step === 1 ? (
          <div className="space-y-3">
            {roles.map((r) => {
              const Icon = r.icon;
              const selected = selectedRole === r.value;
              return (
                <button
                  key={r.value}
                  onClick={() => setSelectedRole(r.value)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                    selected
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-muted-foreground/30"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${selected ? "bg-primary/20" : "bg-secondary"}`}>
                    <Icon className={`w-5 h-5 ${selected ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-sm text-foreground">{r.label}</div>
                    <div className="text-xs text-muted-foreground">{r.description}</div>
                  </div>
                  {selected && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                  )}
                </button>
              );
            })}
            <Button
              onClick={() => setStep(2)}
              disabled={!selectedRole}
              className="w-full h-12 mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold shadow-gold"
            >
              Continue
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <button type="button" onClick={() => setStep(1)} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Change role
            </button>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-card border-border h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-email">Email</Label>
              <Input id="s-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-card border-border h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-password">Password</Label>
              <Input id="s-password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-card border-border h-12" />
            </div>
            {(selectedRole === "learner" || selectedRole === "student_mentor" || selectedRole === "graduate_tutor" || selectedRole === "educator_admin") && (
              <div className="space-y-2">
                <Label htmlFor="institution">{selectedRole === "learner" ? "School Name" : "Institution Name"}</Label>
                <Input id="institution" placeholder={selectedRole === "learner" ? "e.g. Johannesburg High" : "e.g. University of Cape Town"} value={institution} onChange={(e) => setInstitution(e.target.value)} className="bg-card border-border h-12" />
              </div>
            )}
            <Button type="submit" className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold shadow-gold">
              Create Account
            </Button>
          </form>
        )}

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
