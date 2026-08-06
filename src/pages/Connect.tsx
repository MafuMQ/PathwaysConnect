import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '@/contexts/DashboardContext';
import { MENTORS } from '@/data/dashboardData';
import { Eyebrow, Title, Sub, Pill, Btn } from '@/components/dashboard/ui/DashboardUI';

const Connect = () => {
  const { S, swipe, showToast } = useDashboard();
  const navigate = useNavigate();

  return (
    <div className="p-4 pb-24">
      <Eyebrow>Connect · Mentor matching</Eyebrow>
      <Title>Swipe on your future</Title>
      <Sub className="mb-3">Matched by career goal <b>40%</b> · subjects <b>25%</b> · language <b>15%</b> · location <b>10%</b> · rating <b>10%</b></Sub>
      
      <div className="relative h-[430px] mb-4">
        {S.deckIdx < MENTORS.length ? (
          MENTORS.slice(S.deckIdx).reverse().map((m, i, arr) => {
            const isTop = i === arr.length - 1;
            return (
              <div key={m.i} className={`absolute inset-0 bg-white rounded-[22px] border border-[#E4E0D4] shadow-lg overflow-hidden flex flex-col transition-all duration-300 ${isTop ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-[130%] rotate-[14deg]'}`}>
                <div className="h-[200px] flex items-end p-3.5 relative" style={{ background: `linear-gradient(150deg, ${m.c}, #10263D)` }}>
                  <div className="absolute inset-0 flex items-center justify-center font-['Inter'] font-black text-[74px] text-white/35">{m.i}</div>
                  <div className="relative text-white font-['Inter'] font-bold text-xl drop-shadow-md">{m.n} <span className="text-[#1E6B3C] text-xs align-middle">✓ verified</span></div>
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full py-1 px-2.5 text-xs font-bold text-[#1E6B3C]">{m.pct}% match</div>
                </div>
                <div className="p-4 flex-1 overflow-hidden">
                  <b className="font-['Inter'] text-[#1A3A5C] text-[13.5px]">{m.deg}</b>
                  <div className="text-xs text-[#6B7688]">{m.inst} · ★ {m.rating}</div>
                  <p className="text-[13px] mt-2 leading-snug">{m.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <Pill color="green">{m.subj[0]}</Pill>
                    <Pill color="green">{m.subj[1]}</Pill>
                    <Pill color="navy">{m.langs}</Pill>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="absolute inset-0 bg-white border border-[#E4E0D4] rounded-[22px] shadow-lg flex flex-col items-center justify-center text-center p-6">
            <div className="text-4xl mb-2">🌍</div>
            <b className="font-['Inter'] text-[#1A3A5C]">No more mentors nearby</b>
            <p className="text-xs text-[#6B7688] mt-1.5">A Pathways coordinator can manually assign a mentor for rural learners.</p>
            <Btn size="sm" color="ghost" className="mt-3" onClick={() => showToast('Request sent to coordinator 📨')}>Request manual match</Btn>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-6">
        <button onClick={() => swipe(false, () => {})} className="w-16 h-16 rounded-full bg-white shadow-lg text-2xl text-[#C0392B] border-2 border-[#F2C6BF] flex items-center justify-center active:scale-90 transition-transform">✕</button>
        <button onClick={() => swipe(true, () => navigate('/app/vault'))} className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2E8B50] to-[#1E6B3C] shadow-lg text-2xl text-white flex items-center justify-center active:scale-90 transition-transform">♥</button>
      </div>

      <div className="h-px bg-[#E4E0D4] my-4"></div>
      <Eyebrow>My matches</Eyebrow>
      <div className="mt-2">
        {S.matches.length === 0 ? <p className="text-xs text-[#6B7688]">No matches yet — swipe right on a mentor whose journey speaks to you.</p> : 
          S.matches.map(m => (
            <div key={m.i} className="flex items-center gap-3 py-2 border-b border-[#E4E0D4]">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: m.c }}>{m.i}</div>
              <div className="flex-1"><b className="font-['Inter'] text-[13px] text-[#1A3A5C]">{m.n}</b><div className="text-xs text-[#6B7688]">{m.inst}</div></div>
              <Btn size="sm" color="ghost" onClick={() => navigate('/app/vault')}>Vault chat</Btn>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Connect;
