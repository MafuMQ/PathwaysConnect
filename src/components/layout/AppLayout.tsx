import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Compass, LayoutDashboard, Heart, FolderLock, Sun, Bell, Users, ShoppingBag, Video, GraduationCap, LogOut, Menu, X, MessageCircle, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { to: "/app", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/app/connect", icon: Heart, label: "Connect" },
  { to: "/app/vault", icon: FolderLock, label: "Vault" },
  { to: "/app/spark", icon: Sun, label: "Spark" },
  { to: "/app/pulse", icon: Bell, label: "Pulse" },
  { to: "/app/societies", icon: Users, label: "Societies" },
  { to: "/app/bazaar", icon: ShoppingBag, label: "Bazaar" },
  { to: "/app/cubicle", icon: Video, label: "The Cubicle" },
  { to: "/app/graddesk", icon: GraduationCap, label: "Grad Desk" },
  { to: "/app/messages", icon: MessageCircle, label: "Messages" },
  { to: "/app/profile", icon: UserCircle, label: "Profile" },
];

const AppLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const roleLabels: Record<string, string> = {
    learner: "Learner",
    student_mentor: "Student Mentor",
    graduate_tutor: "Graduate Tutor",
    educator_admin: "Educator",
    donor_corporate: "Donor",
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card/50 p-4 shrink-0">
        <div className="flex items-center gap-2.5 mb-8 px-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Compass className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground">
            Pathways<span className="text-primary">Connect</span>
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`
              }
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border pt-4 mt-4">
          <div className="px-3 mb-3">
            <div className="text-sm font-medium text-foreground truncate">{user?.name}</div>
            <div className="text-xs text-muted-foreground">{user?.role ? roleLabels[user.role] : ""}</div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start text-muted-foreground hover:text-foreground">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <Compass className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-sm text-foreground">Pathways<span className="text-primary">Connect</span></span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background pt-14">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-3 text-sm text-muted-foreground hover:text-foreground w-full">
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0 md:p-0 pt-14 md:pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
