import React from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { DashboardProvider, useDashboard } from "@/contexts/DashboardContext";
import { useAuth } from "@/contexts/AuthContext";
import { Home, Users, GraduationCap, Target, User, LogOut } from "lucide-react";
import { LOGO_SRC } from "@/data/landingData";

const NavBtnMobile = ({ active, icon: Icon, label, onClick }: { 
  active: boolean; 
  icon: React.ComponentType<{ className?: string }>; 
  label: string; 
  onClick: () => void;
}) => (
  <button onClick={onClick} className={`flex-1 flex flex-col items-center gap-1 py-1.5 text-[9px] font-bold tracking-wide transition-colors ${active ? 'text-[#1A3A5C]' : 'text-[#94A0B2]'}`}>
    <Icon className={`w-5 h-5 transition-transform ${active ? '-translate-y-0.5 text-[#1A3A5C]' : 'opacity-65'}`} />
    {label}
  </button>
);

const sidebarNavItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'connect', icon: Users, label: 'Connect' },
  { id: 'study', icon: GraduationCap, label: 'Study' },
  { id: 'opps', icon: Target, label: 'Opps' },
];

const mobileNavItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'connect', icon: Users, label: 'Connect' },
  { id: 'study', icon: GraduationCap, label: 'Study' },
  { id: 'opps', icon: Target, label: 'Opps' },
  { id: 'profile', icon: User, label: 'Profile' },
];

const DashboardShell = () => {
  const { S, modal, setModal, toast } = useDashboard();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const currentScreen = location.pathname.split('/').pop() || 'home';
  const isHome = location.pathname === '/app' || location.pathname === '/app/' || location.pathname === '/app/home' || currentScreen === 'app' || currentScreen === 'home';

  return (
    <div className="h-[100dvh] w-full bg-[#F5F0E8] text-[#10263D] flex flex-col md:flex-row font-['Inter',sans-serif] overflow-hidden">
      
      {/* Desktop Sidebar (hidden on mobile) */}
      {currentScreen !== 'onboard' && (
        <aside className="hidden md:flex flex-col w-64 bg-gradient-to-br from-[#10263D] to-[#1A3A5C] text-white shrink-0 h-full shadow-xl z-20">
          <div className="p-5 flex items-center gap-3 border-b border-white/10 shrink-0">
            <img src={LOGO_SRC} alt="Logo" className="w-10 h-auto drop-shadow-md" />
            <div className="flex-1">
              <b className="font-['Playfair_Display'] font-bold text-lg tracking-wide text-white">JER<span className="text-[#C9A84C]">NUA</span>MBO</b>
              <small className="block text-[8px] tracking-[3px] text-[#C9A84C] font-bold">— PATHWAYS —</small>
            </div>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {sidebarNavItems.map(({ id, icon: Icon, label }) => {
              const active = (currentScreen === id && !isHome) || (isHome && id === 'home');
              return (
                <button 
                  key={id} 
                  onClick={() => navigate(id === 'home' ? '/app' : `/app/${id}`)} 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold tracking-wide transition-colors ${active ? 'bg-gradient-to-br from-[#D9BC6B] to-[#C9A84C] text-[#10263D] shadow-md' : 'text-[#B9CBDD] hover:bg-white/10 hover:text-white'}`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>
          
          {/* Bottom-left user profile button */}
          <div className="p-3 border-t border-white/10 shrink-0 bg-black/15 flex items-center justify-between gap-2">
            <button 
              onClick={() => navigate('/app/profile')} 
              className={`flex-1 flex items-center gap-3 p-2 rounded-xl text-left transition-all group ${
                currentScreen === 'profile'
                  ? 'bg-gradient-to-br from-[#D9BC6B] to-[#C9A84C] text-[#10263D] shadow-md'
                  : 'hover:bg-white/10 text-white'
              }`}
              title="My Profile"
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-transform group-hover:scale-105 ${
                currentScreen === 'profile'
                  ? 'bg-[#10263D] text-[#C9A84C]'
                  : 'bg-white/15 text-[#C9A84C] border border-white/20'
              }`}>
                {user?.name ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : <User className="w-4 h-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className={`font-bold text-sm truncate ${currentScreen === 'profile' ? 'text-[#10263D]' : 'text-white'}`}>
                  {S.name || user?.name || 'Learner'}
                </div>
                <div className={`text-[11px] truncate font-semibold ${currentScreen === 'profile' ? 'text-[#10263D]/80' : 'text-[#8FA5BB]'}`}>
                  Learner · Profile
                </div>
              </div>
            </button>
            <button 
              onClick={handleLogout} 
              className="text-[#8FA5BB] hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 shrink-0" 
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </aside>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-full w-full relative overflow-hidden">
        
        {/* Mobile Top Bar */}
        {currentScreen !== 'onboard' && (
          <div className="md:hidden bg-gradient-to-br from-[#10263D] to-[#1A3A5C] text-white p-3 flex items-center justify-between shrink-0 z-30 shadow-md">
            <div className="flex items-center gap-2 min-w-0">
              <img src={LOGO_SRC} alt="Logo" className="w-8 h-auto" />
              <div className="min-w-0">
                <b className="font-['Playfair_Display'] font-bold text-base tracking-wide text-white truncate block">JER<span className="text-[#C9A84C]">NUA</span>MBO</b>
                <small className="block text-[8px] tracking-[3px] text-[#C9A84C] font-bold">— PATHWAYS —</small>
              </div>
            </div>
            <button 
              onClick={handleLogout} 
              className="text-[#8FA5BB] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Content Area (Scrollable) */}
        <main className="flex-1 w-full max-w-4xl mx-auto overflow-y-auto no-scrollbar relative md:p-6">
          <Outlet />
        </main>

        {/* Mobile Bottom Nav */}
        {currentScreen !== 'onboard' && (
          <div className="md:hidden bg-white border-t border-[#E4E0D4] flex p-1.5 pb-safe z-40 shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
            {mobileNavItems.map(({ id, icon: Icon, label }) => {
              const active = (currentScreen === id && !isHome) || (isHome && id === 'home');
              return (
                <NavBtnMobile 
                  key={id} 
                  active={active} 
                  icon={Icon} 
                  label={label} 
                  onClick={() => navigate(id === 'home' ? '/app' : `/app/${id}`)} 
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 md:top-6 left-1/2 -translate-x-1/2 bg-[#10263D] text-white text-sm font-bold py-3 px-6 rounded-full shadow-2xl z-50 whitespace-nowrap overflow-hidden text-ellipsis max-w-[90%] md:max-w-md border border-[#C9A84C]/30 animate-in fade-in slide-in-from-top-4">
          {toast}
        </div>
      )}

      {/* Modals & Overlays */}
      {modal && (
        <div className="fixed inset-0 bg-[#0B1B2C]/60 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-0 md:p-4 animate-in fade-in duration-200" onClick={() => setModal(null)}>
          <div className="bg-[#F5F0E8] w-full md:max-w-md md:rounded-3xl rounded-t-3xl p-6 pb-10 md:pb-6 max-h-[86vh] md:max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-8 md:slide-in-from-bottom-0 md:zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="md:hidden w-12 h-1.5 bg-[#CFC8B2] rounded-full mx-auto mb-6"></div>
            {modal.content}
          </div>
        </div>
      )}
    </div>
  );
};

const AppLayout = () => {
  return (
    <DashboardProvider>
      <DashboardShell />
    </DashboardProvider>
  );
};

export default AppLayout;
