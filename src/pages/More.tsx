import React from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { Card, Eyebrow, Title, Sub } from '@/components/dashboard/ui/DashboardUI';

const More = () => {
  const { S, setS, showToast, setModal } = useDashboard();

  return (
    <div className="p-4 pb-24">
      <Eyebrow>The full ecosystem</Eyebrow>
      <Title>More of PathwaysConnect</Title>
      <Sub className="mb-3">Every feature feeds every other feature.</Sub>

      <Card className="bg-[#F6EFD9] border-[#C9A84C]">
        <Eyebrow>🔀 One platform · multiple products</Eyebrow>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {['Learner', 'Student Mentor', 'Graduate Tutor', 'Donor', 'Parent'].map(r => (
            <button 
              key={r} 
              onClick={() => { setS(prev => ({...prev, role: r})); showToast(`Now experiencing ${r}`); }} 
              className={`rounded-full py-1 px-2.5 text-[10.5px] font-bold ${S.role === r ? 'bg-[#1A3A5C] text-white' : 'bg-[#E5EDF6] text-[#1A3A5C]'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-2">
        <div className="flex items-center gap-3 py-2 border-b border-[#E4E0D4] cursor-pointer" onClick={() => showToast('Grad Desk 🎓')}>
          <div className="w-9 h-9 rounded-xl bg-[#E7F2EA] flex items-center justify-center">🎓</div>
          <div className="flex-1">
            <div className="font-bold text-[13px] text-[#1A3A5C]">GRAD DESK</div>
            <div className="text-xs text-[#6B7688]">Graduates earn. Students learn.</div>
          </div>
          <span className="text-[#6B7688]">›</span>
        </div>
        <div className="flex items-center gap-3 py-2 border-b border-[#E4E0D4] cursor-pointer" onClick={() => showToast('Bazaar 🛒')}>
          <div className="w-9 h-9 rounded-xl bg-[#F6EFD9] flex items-center justify-center">🛒</div>
          <div className="flex-1">
            <div className="font-bold text-[13px] text-[#1A3A5C]">BAZAAR</div>
            <div className="text-xs text-[#6B7688]">Student marketplace — 0% commission.</div>
          </div>
          <span className="text-[#6B7688]">›</span>
        </div>
        <div className="flex items-center gap-3 py-2 border-b border-[#E4E0D4] cursor-pointer" onClick={() => showToast('Fund a Future 💛')}>
          <div className="w-9 h-9 rounded-xl bg-[#FBEEDB] flex items-center justify-center">💛</div>
          <div className="flex-1">
            <div className="font-bold text-[13px] text-[#1A3A5C]">FUND A FUTURE</div>
            <div className="text-xs text-[#6B7688]">Donors fund verified students.</div>
          </div>
          <span className="text-[#6B7688]">›</span>
        </div>
        <div className="flex items-center gap-3 py-2 cursor-pointer" onClick={() => showToast('Open Wallet from top right')}>
          <div className="w-9 h-9 rounded-xl bg-[#E5EDF6] flex items-center justify-center">🪙</div>
          <div className="flex-1">
            <div className="font-bold text-[13px] text-[#1A3A5C]">PATHWAYCOIN wallet</div>
            <div className="text-xs text-[#6B7688]">1 PC = R1.00. Earn, spend, withdraw.</div>
          </div>
          <span className="text-[#6B7688]">›</span>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-[#10263D] to-[#1A3A5C] text-white border-none">
        <Eyebrow className="text-[#C9A84C]">🇿🇦 National Impact Dashboard — live</Eyebrow>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="bg-white/10 border border-[#C9A84C]/40 rounded-xl p-2 text-center">
            <b className="font-['Playfair_Display'] text-lg text-[#C9A84C]">1.2M</b>
            <div className="text-[9.5px] text-[#B9CBDD] uppercase">Learners helped</div>
          </div>
          <div className="bg-white/10 border border-[#C9A84C]/40 rounded-xl p-2 text-center">
            <b className="font-['Playfair_Display'] text-lg text-[#C9A84C]">842k</b>
            <div className="text-[9.5px] text-[#B9CBDD] uppercase">Apps submitted</div>
          </div>
          <div className="bg-white/10 border border-[#C9A84C]/40 rounded-xl p-2 text-center">
            <b className="font-['Playfair_Display'] text-lg text-[#C9A84C]">R420M</b>
            <div className="text-[9.5px] text-[#B9CBDD] uppercase">Bursaries secured</div>
          </div>
          <div className="bg-white/10 border border-[#C9A84C]/40 rounded-xl p-2 text-center">
            <b className="font-['Playfair_Display'] text-lg text-[#C9A84C]">9.2M</b>
            <div className="text-[9.5px] text-[#B9CBDD] uppercase">Tutoring hours</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default More;
