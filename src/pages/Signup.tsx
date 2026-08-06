import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { ArrowLeft, BookOpen, GraduationCap, Briefcase, Shield, Heart, Check } from "lucide-react";
import { LOGO_SRC } from "@/data/landingData";

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
    <div className="min-h-screen bg-gradient-to-br from-[#10263D] via-[#1A3A5C] to-[#274E77] flex items-center justify-center px-4 py-12 font-['Inter',sans-serif] text-white">
      <div className="w-full max-w-lg">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#8FA5BB] hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="flex items-center gap-2.5 mb-8">
          <img src={LOGO_SRC} alt="Logo" className="w-10 h-10 drop-shadow-md" />
          <span className="font-['Playfair_Display'] font-bold text-xl text-white tracking-wide">
            JER<span className="text-[#C9A84C]">NUA</span>MBO
          </span>
        </div>

        <h1 className="font-['Playfair_Display'] text-3xl font-bold mb-2">Create your account</h1>
        <p className="text-[#8FA5BB] mb-8">
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
                      ? "border-[#C9A84C] bg-[#C9A84C]/10"
                      : "border-white/20 bg-white/5 hover:border-white/40"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${selected ? "bg-[#C9A84C]/20" : "bg-white/10"}`}>
                    <Icon className={`w-5 h-5 ${selected ? "text-[#C9A84C]" : "text-[#B9CBDD]"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-white">{r.label}</div>
                    <div className="text-xs text-[#8FA5BB]">{r.description}</div>
                  </div>
                  {selected && (
                    <div className="w-6 h-6 rounded-full bg-[#C9A84C] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#10263D]" />
                    </div>
                  )}
                </button>
              );
            })}
            <button
              onClick={() => setStep(2)}
              disabled={!selectedRole}
              className="w-full h-12 mt-4 bg-gradient-to-br from-[#D9BC6B] to-[#C9A84C] text-[#10263D] hover:scale-[0.98] transition-transform font-bold rounded-xl disabled:opacity-50 disabled:pointer-events-none"
            >
              Continue
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <button type="button" onClick={() => setStep(1)} className="text-sm text-[#8FA5BB] hover:text-white flex items-center gap-1 mb-2 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Change role
            </button>
            <div className="space-y-2">
              <label htmlFor="name" className="text-[11px] font-bold tracking-wide text-[#B9CBDD]">Full Name</label>
              <input id="name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/25 text-white placeholder-[#8FA5BB] outline-none focus:border-[#C9A84C]" />
            </div>
            <div className="space-y-2">
              <label htmlFor="s-email" className="text-[11px] font-bold tracking-wide text-[#B9CBDD]">Email</label>
              <input id="s-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/25 text-white placeholder-[#8FA5BB] outline-none focus:border-[#C9A84C]" />
            </div>
            <div className="space-y-2">
              <label htmlFor="s-password" className="text-[11px] font-bold tracking-wide text-[#B9CBDD]">Password</label>
              <input id="s-password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/25 text-white placeholder-[#8FA5BB] outline-none focus:border-[#C9A84C]" />
            </div>
            {(selectedRole === "learner" || selectedRole === "student_mentor" || selectedRole === "graduate_tutor" || selectedRole === "educator_admin") && (
              <div className="space-y-2">
                <label htmlFor="institution" className="text-[11px] font-bold tracking-wide text-[#B9CBDD]">{selectedRole === "learner" ? "School Name" : "Institution Name"}</label>
                <input id="institution" placeholder={selectedRole === "learner" ? "e.g. Johannesburg High" : "e.g. University of Cape Town"} value={institution} onChange={(e) => setInstitution(e.target.value)} className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/25 text-white placeholder-[#8FA5BB] outline-none focus:border-[#C9A84C]" />
              </div>
            )}
            <button type="submit" className="w-full h-12 bg-gradient-to-br from-[#D9BC6B] to-[#C9A84C] text-[#10263D] hover:scale-[0.98] transition-transform font-bold rounded-xl mt-4">
              Create Account
            </button>
          </form>
        )}

        <p className="text-center text-sm text-[#8FA5BB] mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#C9A84C] hover:underline font-bold">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
