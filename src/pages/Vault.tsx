import React, { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { UNIS, calcAPS, LVL } from '@/data/dashboardData';
import { Card, Eyebrow, Title, Sub, Btn } from '@/components/dashboard/ui/DashboardUI';

const Vault = () => {
  const { S, setS, uploadDoc, showToast } = useDashboard();
  const [vaultTab, setVaultTab] = useState('home');

  const aps = calcAPS(S.marks);

  return (
    <div className="p-4 pb-24">
      <Eyebrow>Vault · Secure academic safe</Eyebrow>
      <Title>My documents</Title>
      <Sub className="mb-3">Encrypted at rest & in transit · POPIA compliant.</Sub>

      {vaultTab === 'home' && (
        <Card className="bg-[#F6EFD9] border-[#C9A84C]">
          <Eyebrow>⚡ Academic Insights</Eyebrow>
          <p className="font-['Inter'] font-bold text-sm text-[#1A3A5C] my-2">Your Grade 11 report is uploaded. The intelligence layer is ready.</p>
          <Btn color="navy" block onClick={() => setVaultTab('aps')}>Calculate my APS & view university options</Btn>
        </Card>
      )}

      {vaultTab === 'aps' && (
        <Card>
          <button className="text-[#1A3A5C] font-bold text-sm mb-3" onClick={() => setVaultTab('home')}>‹ Back to Vault</button>
          <Eyebrow>Vault intelligence</Eyebrow>
          <Title>APS Calculator</Title>
          <Sub className="mb-3">Best 6 subjects count, excluding Life Orientation.</Sub>
          
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="text-[10px] text-[#6B7688] uppercase border-b">
                <th className="text-left py-2">Subject</th>
                <th>%</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(S.marks).map(([s, p]) => (
                <tr key={s} className="border-b">
                  <td className="py-2 font-semibold">{s}</td>
                  <td className="text-center">
                    <input 
                      type="number" 
                      value={p} 
                      disabled={s === 'Life Orientation'} 
                      onChange={e => setS(prev => ({ ...prev, marks: { ...prev.marks, [s]: Math.min(100, Math.max(0, +e.target.value || 0)) } }))}
                      className="w-14 p-1 border rounded-md text-center font-bold text-[#1A3A5C] disabled:opacity-50"
                    />
                  </td>
                  <td className="text-center font-bold text-[#1A3A5C]">{s === 'Life Orientation' ? '—' : LVL(p)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bg-gradient-to-br from-[#10263D] to-[#1A3A5C] text-white rounded-2xl text-center py-5 my-3">
            <div className="text-[10.5px] tracking-[2px] font-bold text-[#B9CBDD]">YOUR APS SCORE</div>
            <div className="font-['Playfair_Display'] font-black text-4xl text-[#C9A84C] my-1">{aps}</div>
            <div className="text-[10.5px] tracking-[2px] font-bold text-[#B9CBDD]">{aps >= 32 ? 'STRONG — UNIVERSITY RANGE' : aps >= 26 ? 'SOLID — MULTIPLE PATHWAYS' : 'BUILDING — TVET ROUTES OPEN'}</div>
          </div>

          <div className="mt-4">
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

      {vaultTab === 'home' && (
        <>
          <Card>
            <div className="flex justify-between items-center mb-2">
              <Eyebrow>Document checklist</Eyebrow>
              <Btn size="sm" color="ghost" onClick={() => showToast('All files exported as ZIP 📦')}>Export all</Btn>
            </div>
            {S.docs.map((d, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-[#E4E0D4] last:border-0">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${d.ok ? 'bg-[#E7F2EA] text-[#1E6B3C]' : 'bg-[#F1EFE7] text-[#B9B29C] border border-dashed border-[#CFC8B2]'}`}>{d.ok ? '✓' : '•'}</div>
                <div className="flex-1"><b className="text-[13px] text-[#1A3A5C]">{d.n}</b><div className="text-xs text-[#6B7688]">{d.d}</div></div>
                {!d.ok && <Btn size="sm" color="ghost" onClick={() => uploadDoc(i)}>Upload</Btn>}
              </div>
            ))}
          </Card>

          <Card>
            <Eyebrow>Vault chat · Thandi M. (your mentor)</Eyebrow>
            <div className="space-y-2 py-2">
              <div className="bg-white border p-2.5 rounded-2xl rounded-bl-sm max-w-[80%] text-[13.5px]">Sawubona! I saw your Grade 11 report upload — well done on the 72% for English 👏</div>
              <div className="bg-white border p-2.5 rounded-2xl rounded-bl-sm max-w-[80%] text-[13.5px]">Run the APS tool and tag me on the report. Then we build your three-tier application plan together.</div>
            </div>
            <div className="flex gap-2 mt-3">
              <input className="flex-1 p-3 border rounded-full text-sm outline-none" placeholder="Message Thandi…" />
              <Btn size="sm" color="navy" onClick={() => showToast('Message sent')}>Send</Btn>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default Vault;
