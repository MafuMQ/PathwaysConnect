import React from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { OPPS, FEEDX, PREDICTED, evalOpp, calcAPS } from '@/data/dashboardData';
import { Card, Eyebrow, Title, Sub, Pill, Btn } from '@/components/dashboard/ui/DashboardUI';

const Opps = () => {
  const { S, applyOpp, showToast } = useDashboard();

  const evald = OPPS.map(o => ({ o, e: evalOpp(o, S.marks, S.career, S.docs) })).sort((a, b) => b.e.score - a.e.score);

  return (
    <div className="p-4 pb-24">
      <Eyebrow>Opportunity Intelligence Platform™</Eyebrow>
      <Title>Opportunities find you</Title>
      <Sub className="mb-3">Scored, predicted and ranked live against your real profile — APS {calcAPS(S.marks)}, {S.career}, VAULT documents.</Sub>

      <Eyebrow>🛰️ Discovery AI · found overnight</Eyebrow>
      <div className="flex gap-1.5 my-2 overflow-x-auto pb-1">
        {FEEDX.map((f, i) => (
          <div key={i} className="shrink-0 border border-[#E4E0D4] rounded-full py-1.5 px-3.5 text-[11.5px] font-bold flex items-center gap-1.5 cursor-pointer" onClick={() => showToast('Saved to feed 🧬')}>
            {f.ic} <b>{f.n}</b>
          </div>
        ))}
      </div>

      {evald.map(({ o, e }) => {
        const col = e.score >= 80 ? '#1E6B3C' : e.score >= 55 ? '#A8862F' : '#6B7688';
        return (
          <Card key={o.id} className={o.dl <= 14 && e.elig >= 1 ? 'border-[#C4651A] shadow-[0_0_0_1px_#C4651A]' : ''}>
            <div className="flex justify-end">
              <div className="text-center">
                <b className="font-['Playfair_Display'] text-xl block" style={{ color: col }}>{e.score}</b>
                <span className="text-[8.5px] font-bold tracking-wide text-[#6B7688]">SCORE</span>
              </div>
            </div>
            <Pill color={o.type === 'Bursary' || o.type === 'Scholarship' ? 'gold' : o.type === 'University' ? 'navy' : o.type === 'Competition' ? 'orange' : 'green'}>{o.type}</Pill>
            <div className="font-['Playfair_Display'] font-bold text-[15.5px] text-[#1A3A5C] mt-2 mb-1 pr-12">{o.n}</div>
            <div className="text-xs text-[#6B7688]">{o.value}</div>
            
            <div className="my-2">
              {e.checks.map((c: any, i: number) => (
                <div key={i} className="flex items-center gap-2 text-xs py-0.5">
                  <span className={c.ok ? 'text-[#1E6B3C] font-bold' : 'text-[#C0392B] font-bold'}>{c.ok ? '✓' : '✗'}</span> {c.lab}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Pill color={e.success >= 70 ? 'green' : e.success >= 45 ? 'gold' : 'amber'}>🎯 Success {e.success}%</Pill>
              <span className="text-xs text-[#6B7688] ml-auto">⏳ {o.dl}d</span>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex-1 text-xs text-[#6B7688]">Comp: {o.comp} · Chance: {e.chance}</div>
              {S.applied[o.id] ? <Pill color="green">✓ Submitted</Pill> :
                e.elig >= 1 ? <Btn size="sm" color="green" onClick={() => applyOpp(o.id)}>Start application</Btn> 
                            : <Btn size="sm" color="orange" onClick={() => showToast('Gap plan loaded 📚')}>Close the gap</Btn>}
            </div>
          </Card>
        );
      })}

      <Card className="bg-gradient-to-br from-[#153252] to-[#1A3A5C] text-white border-[#C9A84C]/45">
        <Eyebrow className="text-[#C9A84C]">🔮 Prediction Engine™ — not open yet, prepare anyway</Eyebrow>
        {PREDICTED.map(p => (
          <div key={p.n} className="py-2 border-b border-white/10 last:border-0">
            <div className="flex justify-between items-center"><b className="flex-1 text-[13px]">{p.n}</b><Pill color="gold">{p.conf}% conf</Pill></div>
            <div className="text-xs text-[#B9CBDD] mt-1">Expected: <b className="text-[#C9A84C]">{p.open}</b> · {p.hist}</div>
          </div>
        ))}
        <Btn size="sm" color="gold" block className="mt-3" onClick={() => showToast('Alerts on ⏰')}>Alert me the moment they open</Btn>
      </Card>
    </div>
  );
};

export default Opps;
