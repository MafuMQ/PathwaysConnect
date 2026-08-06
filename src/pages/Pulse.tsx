import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '@/contexts/DashboardContext';
import { SPARK, OPPS } from '@/data/dashboardData';
import { evalOpp, calcAPS } from '@/data/dashboardData';
import { Card, Eyebrow, Title, Sub, Pill, Btn } from '@/components/dashboard/ui/DashboardUI';

const Pulse = () => {
  const { S, sparkI, newSpark, showToast } = useDashboard();
  const navigate = useNavigate();

  const sparkList = SPARK[S.faith as keyof typeof SPARK] || SPARK.None;
  const aps = calcAPS(S.marks);
  const evald = OPPS.map(o => ({ o, e: evalOpp(o, S.marks, S.career, S.docs) })).sort((a, b) => b.e.score - a.e.score);
  const top = evald[0];
  const qual = evald.filter(x => x.e.elig >= 1).length;

  return (
    <div className="p-4 pb-24">
      <Eyebrow>Pulse · Your daily feed</Eyebrow>
      <Title>Hello, {S.name}!</Title>
      <Sub className="mb-3">{new Date().toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' })} · {S.role} account</Sub>
      
      <Card className="bg-gradient-to-br from-[#153252] to-[#1A3A5C] text-white border-[#C9A84C]/50 cursor-pointer" onClick={() => navigate('/app/opps')}>
        <div>
          <Eyebrow className="text-[#C9A84C]">🎯 Opportunity Engine™ · overnight scan</Eyebrow>
          <p className="font-['Playfair_Display'] text-[15.5px] font-bold leading-tight my-1">
            Good morning. We analysed <span className="text-[#C9A84C]">4,283</span> opportunities and found <span className="text-[#C9A84C]">{OPPS.length}</span> for you — fully qualify for <span className="text-[#C9A84C]">{qual}</span>.
          </p>
          <div className="flex justify-between items-center mt-2">
            <Pill color="gold">⭐ Top: {top.o.n}</Pill>
            <span className="text-xs text-[#F3C98B]">closes in {top.o.dl}d →</span>
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-[#10263D] to-[#1A3A5C] text-white border-none relative overflow-hidden">
        <Eyebrow className="text-[#C9A84C]">✨ Spark · Daily Fuel</Eyebrow>
        <p className="font-['Playfair_Display'] italic text-base my-2 relative z-10">{sparkList[sparkI][0]}</p>
        <p className="text-xs text-[#C9A84C] font-bold">— {sparkList[sparkI][1]}</p>
        <div className="flex gap-2 mt-3">
          <Btn size="sm" color="gold" onClick={newSpark}>New message</Btn>
          <Btn size="sm" className="bg-white/15 text-white" onClick={() => showToast('Shared to your societies ✨')}>Share</Btn>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-white border border-[#E4E0D4] rounded-2xl p-3 text-center"><div className="font-bold text-lg text-[#1A3A5C]">{S.streak}🔥</div><div className="text-[10px] text-[#6B7688] font-bold uppercase">Streak</div></div>
        <div className="bg-white border border-[#E4E0D4] rounded-2xl p-3 text-center"><div className="font-bold text-lg text-[#1A3A5C]">{aps}</div><div className="text-[10px] text-[#6B7688] font-bold uppercase">APS score</div></div>
        <div className="bg-white border border-[#E4E0D4] rounded-2xl p-3 text-center"><div className="font-bold text-lg text-[#1A3A5C]">—</div><div className="text-[10px] text-[#6B7688] font-bold uppercase">Exam ready</div></div>
      </div>

      <Card>
        <Eyebrow>What needs you today</Eyebrow>
        <div className="flex gap-3 py-3 border-b border-[#E4E0D4] cursor-pointer" onClick={() => navigate('/app/profile')}>
          <div className="w-9 h-9 rounded-xl bg-[#F6EFD9] flex items-center justify-center text-lg">📂</div>
          <div><div className="font-bold text-[13.5px] text-[#1A3A5C]">2 documents missing in VAULT</div><div className="text-xs text-[#6B7688]">Matric results & proof of residence — needed for NSFAS.</div></div>
        </div>
        <div className="flex gap-3 py-3 border-b border-[#E4E0D4] cursor-pointer" onClick={() => navigate('/app/connect')}>
          <div className="w-9 h-9 rounded-xl bg-[#E7F2EA] flex items-center justify-center text-lg">🤝</div>
          <div><div className="font-bold text-[13.5px] text-[#1A3A5C]">3 mentors matched your profile</div><div className="text-xs text-[#6B7688]">Health Sciences students near you are ready to guide you.</div></div>
        </div>
        <div className="flex gap-3 py-3 cursor-pointer" onClick={() => navigate('/app/more')}>
          <div className="w-9 h-9 rounded-xl bg-[#FBEEDB] flex items-center justify-center text-lg">💛</div>
          <div><div className="font-bold text-[13.5px] text-[#1A3A5C]">Fund a Future: Naledi is 78% funded</div><div className="text-xs text-[#6B7688]">A 2nd-year nursing student needs R4,400 more for residence.</div></div>
        </div>
      </Card>
    </div>
  );
};

export default Pulse;
