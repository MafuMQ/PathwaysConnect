import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft } from "lucide-react";
import { LOGO_SRC } from "@/data/landingData";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [institution, setInstitution] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signup, loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signup({ email, password, name, role: "learner", institution });
    } catch (err: any) {
      setLoading(false);
      console.error("Signup failed", err);
      let msg = "Failed to create account. Please try again.";
      if (err.code === "auth/email-already-in-use") msg = "This email is already registered. Try signing in instead.";
      else if (err.code === "auth/weak-password") msg = "Password should be at least 6 characters.";
      else if (err.code === "auth/invalid-email") msg = "Please enter a valid email address.";
      setError(msg);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      await loginWithGoogle("learner", institution || undefined);
    } catch (err: any) {
      setLoading(false);
      console.error("Google signup failed", err);
      let msg = "Google signup failed. Please try again.";
      if (err.code === "auth/popup-closed-by-user") msg = "Sign-in popup was closed.";
      else if (err.code === "auth/popup-blocked") msg = "Sign-in popup was blocked by your browser.";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#10263D] via-[#1A3A5C] to-[#274E77] flex items-center justify-center px-4 py-12 font-['Inter',sans-serif] text-white">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#8FA5BB] hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="flex items-center gap-2.5 mb-8">
          <img src={LOGO_SRC} alt="Logo" className="w-10 h-10 drop-shadow-md" />
          <span className="font-['Playfair_Display'] font-bold text-xl text-white tracking-wide">
            JER<span className="text-[#C9A84C]">NUA</span>MBO
          </span>
        </div>

        <h1 className="font-['Playfair_Display'] text-3xl font-bold mb-2">Create Learner Account</h1>
        <p className="text-[#8FA5BB] mb-8">
          Start exploring university pathways, bursaries, and matric subject guidance.
        </p>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-sm flex items-start gap-2.5 animate-in fade-in">
            <svg className="w-5 h-5 shrink-0 mt-0.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="leading-tight">{error}</span>
          </div>
        )}

        <button 
          type="button"
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full h-12 mb-6 bg-white text-[#10263D] hover:bg-gray-100 transition-colors font-bold rounded-xl flex items-center justify-center gap-3 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[#10263D] border-t-transparent rounded-full animate-spin"></div>
              Please wait...
            </span>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-sm text-[#8FA5BB]">OR</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-[11px] font-bold tracking-wide text-[#B9CBDD]">Full Name</label>
            <input id="name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/25 text-white placeholder-[#8FA5BB] outline-none focus:border-[#C9A84C]" />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="s-email" className="text-[11px] font-bold tracking-wide text-[#B9CBDD]">Email</label>
            <input id="s-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/25 text-white placeholder-[#8FA5BB] outline-none focus:border-[#C9A84C]" />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="s-password" className="text-[11px] font-bold tracking-wide text-[#B9CBDD]">Password</label>
            <input id="s-password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/25 text-white placeholder-[#8FA5BB] outline-none focus:border-[#C9A84C]" />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="institution" className="text-[11px] font-bold tracking-wide text-[#B9CBDD]">School Name (Optional)</label>
            <input id="institution" placeholder="e.g. Pretoria High School" value={institution} onChange={(e) => setInstitution(e.target.value)} className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/25 text-white placeholder-[#8FA5BB] outline-none focus:border-[#C9A84C]" />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 bg-gradient-to-br from-[#D9BC6B] to-[#C9A84C] text-[#10263D] hover:scale-[0.98] transition-transform font-bold rounded-xl mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && <div className="w-4 h-4 border-2 border-[#10263D] border-t-transparent rounded-full animate-spin"></div>}
            {loading ? "Creating Account..." : "Create Learner Account"}
          </button>
        </form>

        <p className="text-center text-sm text-[#8FA5BB] mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#C9A84C] hover:underline font-bold">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
