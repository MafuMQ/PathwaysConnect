import React, { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { OPPS, FEEDX, PREDICTED, evalOpp, calcAPS } from '@/data/dashboardData';
import { Card, Eyebrow, Title, Sub, Pill, Btn } from '@/components/dashboard/ui/DashboardUI';
import { Sparkles, Target, Clock, Check, X, TrendingUp, MapPin, GraduationCap, Banknote, Briefcase } from 'lucide-react';

interface JobOpportunity {
  n: string;
  type: string;
  dl: number;
  loc: string;
  req: string;
  stipend: string;
}

const JOBS: JobOpportunity[] = [];

const Opps = () => {
  const { S, applyOpp, showToast } = useDashboard();
  const [oppsTab, setOppsTab] = useState<'opps' | 'jobs'>('opps');

  const aps = calcAPS(S.marks);
  const evald = OPPS.map(o => ({ o, e: evalOpp(o, S.marks, S.career, S.docs) })).sort((a, b) => b.e.score - a.e.score);

  return (
    <div className="p-4 pb-24">
      <Eyebrow>Opportunity Engine™</Eyebrow>
      <Title>Your Next Step Starts Here</Title>
      <Sub className="mb-4">
        Discover bursaries, tertiary applications, and curated early-talent roles matching your academic profile.
      </Sub>
      
      <div className="flex gap-1.5 my-3 overflow-x-auto no-scrollbar pb-1">
        <button onClick={() => setOppsTab('opps')} className={`shrink-0 border rounded-full py-1.5 px-3.5 text-[11.5px] font-bold tracking-wide transition-colors ${oppsTab === 'opps' ? 'bg-[#1A3A5C] text-white border-[#1A3A5C]' : 'bg-white border-[#E4E0D4] text-[#6B7688]'}`}>
          Bursaries & Admissions
        </button>
        <button onClick={() => setOppsTab('jobs')} className={`shrink-0 border rounded-full py-1.5 px-3.5 text-[11.5px] font-bold tracking-wide transition-colors ${oppsTab === 'jobs' ? 'bg-[#1A3A5C] text-white border-[#1A3A5C]' : 'bg-white border-[#E4E0D4] text-[#6B7688]'}`}>
          Jobs & Internships
        </button>
      </div>

      {oppsTab === 'opps' && (
        <div className="animate-in fade-in space-y-4">
          {FEEDX.length > 0 && (
            <div>
              <Eyebrow className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" /> Discovery AI · found overnight
              </Eyebrow>
              <div className="flex gap-1.5 my-2 overflow-x-auto no-scrollbar pb-1">
                {FEEDX.map((f, i) => (
                  <div key={i} className="shrink-0 border border-[#E4E0D4] rounded-full py-1.5 px-3.5 text-[11.5px] font-bold flex items-center gap-1.5 cursor-pointer bg-white" onClick={() => showToast('Saved to feed')}>
                    <b>{f.n}</b>
                  </div>
                ))}
              </div>
            </div>
          )}

          {evald.length > 0 ? (
            evald.map(({ o, e }) => {
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
                        {c.ok ? <Check className="w-3.5 h-3.5 text-[#1E6B3C]" /> : <X className="w-3.5 h-3.5 text-[#C0392B]" />}
                        <span className={c.ok ? 'text-[#1E6B3C] font-semibold' : 'text-[#6B7688]'}>{c.lab}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <Pill color={e.success >= 70 ? 'green' : e.success >= 45 ? 'gold' : 'amber'}>
                      <Target className="w-3 h-3 inline mr-1" />
                      Success {e.success}%
                    </Pill>
                    <span className="text-xs text-[#6B7688] ml-auto flex items-center gap-1 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      {o.dl}d left
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E4E0D4]">
                    <div className="flex-1 text-xs text-[#6B7688]">Comp: {o.comp} · Chance: {e.chance}</div>
                    {S.applied[o.id] ? (
                      <Pill color="green">
                        <Check className="w-3 h-3 inline mr-1" /> Submitted
                      </Pill>
                    ) : e.elig >= 1 ? (
                      <Btn size="sm" color="green" onClick={() => applyOpp(o.id)}>Start application</Btn> 
                    ) : (
                      <Btn size="sm" color="orange" onClick={() => showToast('Gap plan loaded')}>Close the gap</Btn>
                    )}
                  </div>
                </Card>
              );
            })
          ) : (
            <Card className="text-center py-12">
              <Target className="w-12 h-12 text-[#8FA5BB] mx-auto mb-2" />
              <b className="font-['Playfair_Display'] text-base text-[#1A3A5C] block">No opportunities currently listed</b>
              <p className="text-xs text-[#6B7688] max-w-md mx-auto mt-1.5">
                Verified bursaries, scholarships, and academic intake applications will be shown here once published.
              </p>
            </Card>
          )}

          {PREDICTED.length > 0 && (
            <Card className="bg-gradient-to-br from-[#153252] to-[#1A3A5C] text-white border-[#C9A84C]/45">
              <Eyebrow className="text-[#C9A84C] flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> Prediction Engine™ — upcoming intake cycles
              </Eyebrow>
              {PREDICTED.map(p => (
                <div key={p.n} className="py-2 border-b border-white/10 last:border-0">
                  <div className="flex justify-between items-center"><b className="flex-1 text-[13px]">{p.n}</b><Pill color="gold">{p.conf}% conf</Pill></div>
                  <div className="text-xs text-[#B9CBDD] mt-1">Expected: <b className="text-[#C9A84C]">{p.open}</b> · {p.hist}</div>
                </div>
              ))}
              <Btn size="sm" color="gold" block className="mt-3" onClick={() => showToast('Alerts enabled')}>Alert me the moment they open</Btn>
            </Card>
          )}
        </div>
      )}

      {oppsTab === 'jobs' && (
        <div className="animate-in fade-in space-y-4">
          <Eyebrow>Jobs & Internships</Eyebrow>
          <Sub className="mb-3">Launch your career with curated early-talent roles.</Sub>
          {JOBS.length > 0 ? (
            JOBS.map((j, i) => (
              <Card key={i}>
                <div className="flex justify-between items-start mb-2">
                  <Pill color={j.type === 'Internship' ? 'navy' : 'green'}>{j.type}</Pill>
                  <span className="text-xs text-[#6B7688] font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {j.dl}d left
                  </span>
                </div>
                <b className="font-['Playfair_Display'] text-[15.5px] text-[#1A3A5C] block mb-1">{j.n}</b>
                <div className="text-[12.5px] leading-relaxed mt-2 text-[#6B7688] space-y-1">
                  <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#8FA5BB]" /> <b>Location:</b> {j.loc}</div>
                  <div className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-[#8FA5BB]" /> <b>Reqs:</b> {j.req}</div>
                  <div className="flex items-center gap-1.5"><Banknote className="w-3.5 h-3.5 text-[#8FA5BB]" /> <b>Stipend:</b> {j.stipend}</div>
                </div>
                <Btn size="sm" color="navy" block className="mt-3" onClick={() => showToast('Application started')}>Apply for {j.type}</Btn>
              </Card>
            ))
          ) : (
            <Card className="text-center py-12">
              <Briefcase className="w-12 h-12 text-[#8FA5BB] mx-auto mb-2" />
              <b className="font-['Playfair_Display'] text-base text-[#1A3A5C] block">No jobs or internships listed yet</b>
              <p className="text-xs text-[#6B7688] max-w-md mx-auto mt-1.5">
                Graduate programmes, internships, and learnerships will appear here as corporate partners post openings.
              </p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Opps;
