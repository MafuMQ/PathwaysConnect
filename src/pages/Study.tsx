import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboard } from '@/contexts/DashboardContext';
import { OPPS, UNIS, evalOpp, calcAPS, LVL } from '@/data/dashboardData';
import { Card, Eyebrow, Title, Sub, Pill, Btn } from '@/components/dashboard/ui/DashboardUI';
import { X } from 'lucide-react';

const VALID_SUBJECTS = [
  'Mathematics', 'Mathematical Literacy', 'English HL', 'English FAL', 
  'Afrikaans HL', 'Afrikaans FAL', 'Life Sciences', 'Physical Sciences', 
  'Accounting', 'Business Studies', 'Economics', 'Geography', 'History', 
  'Life Orientation', 'Tourism', 'Consumer Studies', 'Information Technology', 
  'Computer Applications Technology'
];

const COURSES = [
  { ic: "🚀", n: "Grade 10 IEB", type: "Progression", req: "Pass Grade 9 with 50% avg", aps: "N/A" },
  { ic: "🌍", n: "Cambridge IGCSE", type: "Curriculum Shift", req: "Strong Math & English (60%+)", aps: "N/A" },
  { ic: "🛠️", n: "TVET NCV Level 2", type: "Vocational", req: "Grade 9 pass", aps: "N/A" }
];

const Study = () => {
  const { user } = useAuth();
  const { S, updateMark, deleteMark, showToast } = useDashboard();
  const navigate = useNavigate();
  const location = useLocation();
  const [studyTab, setStudyTab] = useState(location.state?.tab || 'dash');
  const [newSubject, setNewSubject] = useState("");

  const aps = calcAPS(S.marks);
  const evald = OPPS.map(o => ({ o, e: evalOpp(o, S.marks, S.career, S.docs) })).sort((a, b) => b.e.score - a.e.score);
  const top = evald[0];

  return (
    <div className="p-4 pb-24">
      <Eyebrow>Studyroom X™ · Learning Operating System</Eyebrow>
      <Title>Learn smarter. Unlock your future.</Title>
      
      <div className="flex gap-1.5 my-3 overflow-x-auto pb-1">
        {['dash', 'courses', 'subjects', 'ai', 'twin', 'aps'].map(t => (
          <button key={t} onClick={() => setStudyTab(t)} className={`shrink-0 border rounded-full py-1.5 px-3.5 text-[11.5px] font-bold tracking-wide ${studyTab === t ? 'bg-[#1A3A5C] text-white border-[#1A3A5C]' : 'bg-white border-[#E4E0D4] text-[#6B7688]'}`}>
            {t === 'aps' ? 'APS Calculator' : t.charAt(0).toUpperCase() + t.slice(1)}
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

      {studyTab === 'courses' && (
        <div className="animate-in fade-in">
          <Eyebrow>Current Course Profile</Eyebrow>
          <Card className="mb-4 bg-gradient-to-br from-[#10263D] to-[#1A3A5C] text-white border-[#C9A84C]/45">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🎓</div>
              <div>
                <div className="text-[10px] text-[#B9CBDD] uppercase font-bold tracking-wider mb-1">ENROLLED</div>
                <div className="font-['Playfair_Display'] text-xl font-bold text-[#C9A84C]">
                  {user?.curriculum || 'Curriculum not set'} · {user?.grade || 'Grade not set'}
                </div>
                <div className="text-xs mt-1 text-[#C8D6E5]">You are on track for progression.</div>
              </div>
            </div>
          </Card>

          <Eyebrow>Qualifying Next-Step Pathways</Eyebrow>
          <Sub className="mb-3">Courses and curriculums you qualify for based on your current academic profile.</Sub>
          {COURSES.map((c, i) => (
            <Card key={i} className="mb-2">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{c.ic}</div>
                <div className="flex-1">
                  <b className="font-['Playfair_Display'] text-[15.5px] text-[#1A3A5C]">{c.n}</b>
                  <div className="text-xs text-[#6B7688]">Path: {c.type}</div>
                </div>
                <Pill color={c.type === 'Vocational' ? 'amber' : 'navy'}>{c.type === 'Progression' ? 'Direct' : 'Shift'}</Pill>
              </div>
              <div className="text-[12.5px] leading-relaxed mt-2 pt-2 border-t border-[#E4E0D4]">
                📝 <b>Requirements:</b> {c.req}<br />
                📊 <b>APS Impact:</b> {c.aps}
              </div>
            </Card>
          ))}
        </div>
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

      {studyTab === 'aps' && (
        <Card>
          <Eyebrow>Vault intelligence</Eyebrow>
          <div className="flex justify-between items-start mb-3">
            <div>
              <Title>APS Calculator</Title>
              <Sub>Best 6 subjects count, excluding Life Orientation.</Sub>
            </div>
            <Btn size="sm" color="ghost" onClick={() => showToast('Coming soon: Extract subjects from uploaded report!')}>Analyse / Extract Report</Btn>
          </div>
          
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="text-[10px] text-[#6B7688] uppercase border-b">
                <th className="text-left py-2">Subject</th>
                <th>%</th>
                <th>Level</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(S.marks).map(([s, p]) => (
                <tr key={s} className="border-b">
                  <td className="py-3 font-bold text-[#1A3A5C]">{s}</td>
                  <td className="text-center">
                    <input 
                      type="number" 
                      value={p as number} 
                      onChange={e => updateMark(s, Math.min(100, Math.max(0, +e.target.value || 0)))}
                      className="w-14 p-1 border rounded-md text-center font-bold text-[#1A3A5C]"
                    />
                  </td>
                  <td className="text-center font-bold text-[#6B7688]">LVL {LVL(p as number)}</td>
                  <td className="text-right">
                    <button onClick={() => deleteMark(s)} className="text-[#C0392B] p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Remove subject">
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-2 mb-6 p-3 bg-[#F9F9F8] rounded-xl border border-[#E4E0D4]">
            <div className="relative">
              <input 
                value={newSubject}
                onChange={e => setNewSubject(e.target.value)}
                placeholder="Search and add a subject..."
                className="w-full border border-[#E4E0D4] rounded-lg p-2.5 text-sm font-semibold text-[#1A3A5C] outline-none focus:border-[#C9A84C] bg-[#F9F9F8]"
              />
              {newSubject && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-[#E4E0D4] rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {VALID_SUBJECTS.filter(s => s.toLowerCase().includes(newSubject.toLowerCase()) && S.marks[s] === undefined).length > 0 ? (
                    VALID_SUBJECTS.filter(s => s.toLowerCase().includes(newSubject.toLowerCase()) && S.marks[s] === undefined).map(sub => (
                      <div 
                        key={sub}
                        className="p-2 text-sm text-[#1A3A5C] font-semibold hover:bg-[#F6EFD9] cursor-pointer border-b last:border-0 border-[#E4E0D4]"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          updateMark(sub, 0);
                          setNewSubject("");
                        }}
                      >
                        {sub}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-[#6B7688] italic">No matching subjects found.</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#10263D] to-[#1A3A5C] text-white rounded-2xl p-4 text-center">
            <div className="text-[10.5px] tracking-[2px] font-bold text-[#B9CBDD]">YOUR APS SCORE</div>
            <div className="font-['Playfair_Display'] font-black text-4xl text-[#C9A84C] my-1">{aps}</div>
            <div className="text-[10.5px] tracking-[2px] font-bold text-[#B9CBDD]">{aps >= 32 ? 'STRONG — UNIVERSITY RANGE' : aps >= 26 ? 'SOLID — MULTIPLE PATHWAYS' : 'BUILDING — TVET ROUTES OPEN'}</div>
          </div>

          <div className="mt-6">
            <Eyebrow>Your university options · Career: {S.career}</Eyebrow>
            {UNIS.filter(u => u.cat === 'uni' && aps >= u.min).map(u => (
              <div key={u.n} className="border border-[#E4E0D4] rounded-xl p-3 mb-2 bg-white">
                <b className="font-['Playfair_Display']">{u.n}</b>
                <div className="text-xs text-[#6B7688] mt-1">{u.course} · APS {u.min}–{u.max} · Apply by {u.deadline}</div>
                <Btn size="sm" color="green" className="mt-2" onClick={() => showToast('Application started 📌')}>Apply now</Btn>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Study;
