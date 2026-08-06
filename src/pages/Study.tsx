import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '@/contexts/DashboardContext';
import { OPPS, CAREERS } from '@/data/dashboardData';
import { evalOpp, calcAPS } from '@/data/dashboardData';
import { Card, Eyebrow, Title, Sub, Pill, Btn } from '@/components/dashboard/ui/DashboardUI';

const Study = () => {
  const { S } = useDashboard();
  const navigate = useNavigate();
  const [studyTab, setStudyTab] = useState('dash');

  const aps = calcAPS(S.marks);
  const evald = OPPS.map(o => ({ o, e: evalOpp(o, S.marks, S.career, S.docs) })).sort((a, b) => b.e.score - a.e.score);
  const top = evald[0];

  return (
    <div className="p-4 pb-24">
      <Eyebrow>Studyroom X™ · Learning Operating System</Eyebrow>
      <Title>Learn smarter. Unlock your future.</Title>
      
      <div className="flex gap-1.5 my-3 overflow-x-auto pb-1">
        {['dash', 'subjects', 'papers', 'ai', 'mistakes', 'twin', 'nbt', 'careers'].map(t => (
          <button key={t} onClick={() => setStudyTab(t)} className={`shrink-0 border rounded-full py-1.5 px-3.5 text-[11.5px] font-bold tracking-wide ${studyTab === t ? 'bg-[#1A3A5C] text-white border-[#1A3A5C]' : 'bg-white border-[#E4E0D4] text-[#6B7688]'}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {studyTab === 'dash' && (
        <>
          <Card className="bg-gradient-to-br from-[#10263D] to-[#1A3A5C] text-white border-[#C9A84C]/45">
            <Eyebrow className="text-[#C9A84C]">🤖 AI Study Concierge™</Eyebrow>
            <p className="font-['Playfair_Display'] text-base font-bold my-2">Good morning, {S.name} 👋<br/><span className="text-[13px] font-semibold text-[#C8D6E5]">Maths P1 is in <b className="text-[#C9A84C]">18 days</b>.</span></p>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-white/10 border border-[#C9A84C]/40 rounded-xl p-2 text-center"><div className="font-bold text-lg">{S.streak}🔥</div><div className="text-[9.5px] text-[#B9CBDD] uppercase font-bold">Streak</div></div>
              <div className="bg-white/10 border border-[#C9A84C]/40 rounded-xl p-2 text-center"><div className="font-bold text-lg">{aps}</div><div className="text-[9.5px] text-[#B9CBDD] uppercase font-bold">APS now</div></div>
              <div className="bg-white/10 border border-[#C9A84C]/40 rounded-xl p-2 text-center"><div className="font-bold text-lg text-[#7BD89B]">{aps + 2}</div><div className="text-[9.5px] text-[#B9CBDD] uppercase font-bold">Predicted</div></div>
              <div className="bg-white/10 border border-[#C9A84C]/40 rounded-xl p-2 text-center"><div className="font-bold text-lg">★★★</div><div className="text-[9.5px] text-[#B9CBDD] uppercase font-bold">Uni chances</div></div>
            </div>
          </Card>
          <Card className="cursor-pointer" onClick={() => navigate('/app/opps')}>
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎯</div>
              <div className="flex-1"><b className="font-['Inter'] text-[13px] text-[#1A3A5C]">Today's opportunity: {top.o.n}</b><div className="text-xs text-[#6B7688]">{top.e.score}/100 match · closes in {top.o.dl} days</div></div>
              <span>›</span>
            </div>
          </Card>
          <Card className="bg-[#F6EFD9] border-[#C9A84C]">
            <Eyebrow>⛓️ Why today matters — live projection</Eyebrow>
            <div className="mt-2 text-[13px] leading-relaxed">
              <div className="flex gap-2"><span className="text-[#C9A84C] font-bold">●</span> Complete today's <b>Mathematics</b> lesson & practice</div>
              <div className="flex gap-2"><span className="text-[#C9A84C] font-bold">●</span> Maths climbs <b>65% → 68%</b></div>
              <div className="flex gap-2"><span className="text-[#C9A84C] font-bold">●</span> APS becomes <b>{aps} → {aps + 1}</b> ▲</div>
              <div className="flex gap-2"><span className="text-[#C9A84C] font-bold">●</span> 🔓 Unlocks: <b>UJ BNurs</b></div>
            </div>
            <Btn size="sm" color="navy" block className="mt-3">Start Maths now →</Btn>
          </Card>
        </>
      )}

      {studyTab === 'subjects' && (
        <>
          <input className="w-full p-3 border border-[#E4E0D4] rounded-xl mb-3 outline-none" placeholder="🔍 Search all CAPS subjects…" />
          <div className="grid grid-cols-2 gap-2">
            {['Mathematics', 'Physical Sciences', 'Life Sciences', 'English HL', 'Accounting', 'Geography'].map(s => (
              <div key={s} className="bg-white border border-[#E4E0D4] rounded-2xl p-3">
                <div className="flex justify-between items-center mb-1"><span className="text-xl">📐</span><Pill color="gold">SILVER</Pill></div>
                <b className="font-['Inter'] text-[12.5px] text-[#1A3A5C] block">{s}</b>
                <span className="text-xs text-[#6B7688]">Avg {S.marks[s] || 60}% → pred 70%</span>
                <div className="h-1 bg-[#EDEAE0] rounded-full mt-2"><div className="h-full w-[60%] bg-gradient-to-r from-[#C9A84C] to-[#1E6B3C] rounded-full"></div></div>
              </div>
            ))}
          </div>
        </>
      )}

      {studyTab === 'papers' && (
        <Card>
          <Eyebrow>Past Paper Centre™</Eyebrow>
          <div className="text-sm space-y-2 mt-2">
            <div className="flex justify-between p-2 border rounded-lg cursor-pointer">📍 Gauteng</div>
            <div className="flex justify-between p-2 border rounded-lg cursor-pointer">📍 KwaZulu-Natal</div>
            <div className="flex justify-between p-2 border rounded-lg cursor-pointer">📍 DBE National</div>
          </div>
        </Card>
      )}

      {studyTab === 'ai' && (
        <Card>
          <Eyebrow>AI Personal Tutor</Eyebrow>
          <Sub className="mb-3">Not a chatbot — a CAPS tutor.</Sub>
          <div className="space-y-2 mb-4">
            <div className="bg-[#1A3A5C] text-white p-3 rounded-2xl rounded-br-sm max-w-[80%] self-end ml-auto">Explain photosynthesis like I'm 15</div>
            <div className="bg-white border p-3 rounded-2xl rounded-bl-sm max-w-[80%]">🌱 Photosynthesis is a plant's solar-powered kitchen. It takes sunlight, water, and CO₂ to make glucose (food). Oxygen is the leftover. Formula: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. Exam tip: examiners love asking WHERE it happens (chloroplast).</div>
          </div>
          <div className="flex gap-2">
            <input className="flex-1 p-3 border rounded-full outline-none" placeholder="Ask your tutor anything…" />
            <Btn size="sm" color="navy">Ask</Btn>
          </div>
        </Card>
      )}

      {studyTab === 'mistakes' && (
        <Card>
          <Eyebrow>AI Mistake Book™</Eyebrow>
          <Sub className="mb-3">Every wrong answer is stored forever.</Sub>
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📗</div>
            <b className="font-['Inter'] text-[#1A3A5C]">No mistakes recorded yet</b>
            <div className="text-xs text-[#6B7688] mt-1">Do a practice session — every slip becomes tomorrow's mastery.</div>
          </div>
        </Card>
      )}

      {studyTab === 'twin' && (
        <Card>
          <Eyebrow>Life Digital Twin™</Eyebrow>
          <Sub className="mb-3">A living academic model of {S.name}.</Sub>
          <div className="bg-gradient-to-br from-[#10263D] to-[#1A3A5C] text-white rounded-xl p-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div><div className="font-bold text-lg">{aps}</div><div className="text-[10px] text-[#B9CBDD] uppercase">APS today</div></div>
              <div><div className="font-bold text-lg text-[#7BD89B]">{aps + 2}</div><div className="text-[10px] text-[#B9CBDD] uppercase">Trajectory</div></div>
              <div><div className="font-bold text-lg">—</div><div className="text-[10px] text-[#B9CBDD] uppercase">Accuracy</div></div>
            </div>
          </div>
        </Card>
      )}

      {studyTab === 'nbt' && (
        <Card>
          <Eyebrow>NBT Academy™</Eyebrow>
          <b className="font-['Playfair_Display'] text-[15px] text-[#1A3A5C]">NBT AQL — Academic & Quantitative Literacy</b>
          <Sub className="mt-1 mb-3">Required by UCT, Wits, UP. Includes Pathways AQL study booklet.</Sub>
          <div className="flex gap-2">
            <Btn size="sm" color="navy" className="flex-1">Timed test</Btn>
            <Btn size="sm" color="ghost" className="flex-1">Study booklet</Btn>
          </div>
        </Card>
      )}

      {studyTab === 'careers' && (
        <>
          <Eyebrow>Career Explorer</Eyebrow>
          <Sub className="mb-3">The full chain: APS → subjects → salary → universities → funding → mentor.</Sub>
          {CAREERS.map(c => (
            <Card key={c.n}>
              <div className="flex items-center gap-3">
                <div className="text-3xl">{c.ic}</div>
                <div className="flex-1">
                  <b className="font-['Playfair_Display'] text-[15.5px] text-[#1A3A5C]">{c.n}</b>
                  <div className="text-xs text-[#6B7688]">{c.demand}</div>
                </div>
                <Pill color={parseInt(c.aps) <= aps ? 'green' : 'amber'}>APS {c.aps}</Pill>
              </div>
              <div className="text-[12.5px] leading-relaxed mt-2">
                📚 <b>Subjects:</b> {c.subj}<br />
                💵 <b>Salary:</b> {c.sal}<br />
                🏛️ <b>Universities:</b> {c.unis}<br />
                💰 <b>Funding:</b> {c.fund}
              </div>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default Study;
