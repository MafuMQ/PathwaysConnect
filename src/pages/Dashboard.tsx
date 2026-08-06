import { useAuth } from "@/contexts/AuthContext";
import { Heart, FolderLock, Sun, Bell, Users, ShoppingBag, Video, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const modules = [
  { to: "/app/connect", icon: Heart, name: "CONNECT", desc: "Find your mentor match", color: "hsl(340 80% 60%)" },
  { to: "/app/profile", icon: FolderLock, name: "PROFILE", desc: "Manage your details & documents", color: "hsl(210 80% 60%)" },
  { to: "/app/spark", icon: Sun, name: "SPARK", desc: "Daily motivation", color: "hsl(38 92% 55%)" },
  { to: "/app/pulse", icon: Bell, name: "PULSE", desc: "News & updates", color: "hsl(50 85% 55%)" },
  { to: "/app/societies", icon: Users, name: "SOCIETIES", desc: "Campus communities", color: "hsl(270 70% 65%)" },
  { to: "/app/bazaar", icon: ShoppingBag, name: "BAZAAR", desc: "Student marketplace", color: "hsl(180 60% 50%)" },
  { to: "/app/cubicle", icon: Video, name: "THE CUBICLE", desc: "Video tutoring", color: "hsl(160 70% 50%)" },
  { to: "/app/graddesk", icon: GraduationCap, name: "GRAD DESK", desc: "Graduate tutors", color: "hsl(12 85% 60%)" },
];

const Dashboard = () => {
  const { user } = useAuth();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold mb-1">
          {greeting()}, <span className="text-gradient-gold">{user?.name?.split(" ")[0]}</span>
        </h1>
        <p className="text-muted-foreground">Here's your PathwaysConnect overview</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Mentor Sessions", value: "0" },
          { label: "Documents", value: "0" },
          { label: "Connections", value: "0" },
          { label: "Streak", value: "1 day" },
        ].map((s) => (
          <div key={s.label} className="bg-gradient-card rounded-xl border border-border p-4 shadow-card">
            <div className="text-2xl font-display font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Module quick links */}
      <h2 className="font-display text-lg font-semibold mb-4">Your Modules</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {modules.map((m) => (
          <Link
            key={m.name}
            to={m.to}
            className="group flex items-center gap-4 bg-gradient-card rounded-xl border border-border p-5 shadow-card hover:border-primary/30 transition-colors"
          >
            <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${m.color}15` }}>
              <m.icon className="w-5 h-5" style={{ color: m.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display font-semibold text-sm tracking-wider text-foreground">{m.name}</div>
              <div className="text-xs text-muted-foreground">{m.desc}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
