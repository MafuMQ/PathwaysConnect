import React from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { DashboardProvider, useDashboard } from "@/contexts/DashboardContext";
import { LOGO_SRC } from "@/data/landingData";
import { Btn, Eyebrow } from "@/components/dashboard/ui/DashboardUI";

const WalletModal = () => {
  const { S, updateCoins, setModal, showToast } = useDashboard();
  return (
    <div>
      <Eyebrow>PathwayCoin wallet</Eyebrow>
      <div className="bg-gradient-to-br from-[#10263D] to-[#1A3A5C] text-white rounded-2xl text-center py-4 my-2">
        <div className="text-[10.5px] tracking-[2px] font-bold text-[#B9CBDD]">BALANCE — PEGGED 1 PC = R1.00</div>
        <div className="font-['Playfair_Display'] font-black text-4xl text-[#C9A84C] my-1">{S.coins} PC</div>
        <div className="text-[10.5px] tracking-[2px] font-bold text-[#B9CBDD]">WITHDRAW TO ANY SA BANK · NO FEES</div>
      </div>
      <div className="flex gap-2 mb-4">
        <Btn color="green" className="flex-1" onClick={() => { updateCoins(100, 'Wallet top-up'); }}>+ Add R100</Btn>
        <Btn color="ghost" className="flex-1" onClick={() => { updateCoins(-S.coins, 'Withdrawn to bank'); setModal(null); showToast(`R${S.coins} on its way 🏦`); }}>Withdraw</Btn>
      </div>
      <Eyebrow>Transactions</Eyebrow>
      <div className="bg-white border rounded-2xl p-4 mt-2 max-h-[40vh] overflow-y-auto">
        {S.tx.slice(0, 8).map((t, i) => (
          <div key={i} className="flex justify-between py-2 border-b last:border-0 text-[13px]">
            <span>{t.t}</span>
            <b className={t.v >= 0 ? 'text-[#1E6B3C]' : 'text-[#C0392B]'}>{t.v > 0 ? '+' : ''}{t.v} PC</b>
          </div>
        ))}
      </div>
    </div>
  );
};

const NavBtnMobile = ({ active, icon, label, onClick }: { active: boolean, icon: string, label: string, onClick: () => void }) => (
  <button onClick={onClick} className={`flex-1 flex flex-col items-center gap-1 py-1.5 text-[9px] font-bold tracking-wide ${active ? 'text-[#1A3A5C]' : 'text-[#94A0B2]'}`}>
    <span className={`text-xl transition-transform ${active ? '-translate-y-0.5' : 'opacity-55'}`}>{icon}</span>
    {label}
  </button>
);

const DashboardShell = () => {
  const { S, modal, setModal, toast } = useDashboard();
  const navigate = useNavigate();
  const location = useLocation();

  const currentScreen = location.pathname.split('/').pop() || 'pulse';
  const isPulse = location.pathname === '/app' || location.pathname === '/app/';

  const navItems = {
    Learner: [['pulse', '🏠', 'Pulse'], ['connect', '🤝', 'Connect'], ['study', '📚', 'Study'], ['vault', '📂', 'Vault'], ['opps', '🎯', 'Opps'], ['more', '✦', 'More']],
    'Student Mentor': [['pulse', '🏠', 'Home'], ['connect', '🤝', 'Matches'], ['study', '📚', 'Study'], ['vault', '📂', 'Vault'], ['more', '✦', 'More']],
    'Graduate Tutor': [['pulse', '🏠', 'Home'], ['vault', '📂', 'Vault'], ['more', '🛒', 'Bazaar']],
    Donor: [['pulse', '🏠', 'Home'], ['opps', '💛', 'Fund'], ['more', '✦', 'More']],
    Parent: [['pulse', '🏠', 'Child'], ['study', '📚', 'Study'], ['vault', '📂', 'Vault'], ['more', '✦', 'More']],
  };

  const currentNav = navItems[S.role as keyof typeof navItems] || navItems.Learner;

  return (
    <div className="h-[100dvh] w-full bg-[#F5F0E8] flex flex-col md:flex-row font-['Inter',sans-serif] overflow-hidden">
      
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
          
          <div className="p-4 border-b border-white/10 shrink-0">
            <button onClick={() => setModal({ title: 'Wallet', content: <WalletModal /> })} className="w-full bg-white/10 border border-[#C9A84C]/55 rounded-xl py-2.5 px-3 text-sm font-bold text-[#F3E4B8] flex items-center justify-center gap-2 hover:bg-white/20 transition-colors shadow-sm">
              <span className="w-3 h-3 rounded-full bg-gradient-to-br from-[#F0DCA0] to-[#A8862F]"></span>
              {S.coins} PC Wallet
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {currentNav.map(([s, ic, lb]) => {
              const active = currentScreen === s || (isPulse && s === 'pulse');
              return (
                <button 
                  key={s} 
                  onClick={() => navigate(s === 'pulse' ? '/app' : `/app/${s}`)} 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold tracking-wide transition-colors ${active ? 'bg-gradient-to-br from-[#D9BC6B] to-[#C9A84C] text-[#10263D] shadow-md' : 'text-[#B9CBDD] hover:bg-white/10 hover:text-white'}`}
                >
                  <span className="text-xl w-6 text-center">{ic}</span>
                  {lb}
                </button>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-white/10 shrink-0 bg-black/10">
            <div className="font-bold text-sm truncate">{S.name}</div>
            <div className="text-xs text-[#8FA5BB] mt-0.5">{S.role}</div>
          </div>
        </aside>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-full w-full relative overflow-hidden">
        
        {/* Mobile Top Bar */}
        {currentScreen !== 'onboard' && (
          <div className="md:hidden bg-gradient-to-br from-[#10263D] to-[#1A3A5C] text-white p-3 flex items-center gap-2 shrink-0 z-30 shadow-md">
            <img src={LOGO_SRC} alt="Logo" className="w-8 h-auto" />
            <div className="flex-1">
              <b className="font-['Playfair_Display'] font-bold text-base tracking-wide text-white">JER<span className="text-[#C9A84C]">NUA</span>MBO</b>
              <small className="block text-[8px] tracking-[3px] text-[#C9A84C] font-bold">— PATHWAYS —</small>
            </div>
            <button onClick={() => setModal({ title: 'Wallet', content: <WalletModal /> })} className="bg-white/10 border border-[#C9A84C]/55 rounded-full py-1.5 px-3 text-xs font-bold text-[#F3E4B8] flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-gradient-to-br from-[#F0DCA0] to-[#A8862F]"></span>
              {S.coins} PC
            </button>
          </div>
        )}

        {/* Content Area (Scrollable) */}
        <main className="flex-1 w-full max-w-4xl mx-auto overflow-y-auto relative md:p-6">
          <Outlet />
        </main>

        {/* Mobile Bottom Nav */}
        {currentScreen !== 'onboard' && (
          <div className="md:hidden bg-white border-t border-[#E4E0D4] flex p-1.5 pb-safe z-40 shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
            {currentNav.map(([s, ic, lb]) => (
              <NavBtnMobile 
                key={s} 
                active={currentScreen === s || (isPulse && s === 'pulse')} 
                icon={ic} 
                label={lb} 
                onClick={() => navigate(s === 'pulse' ? '/app' : `/app/${s}`)} 
              />
            ))}
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
