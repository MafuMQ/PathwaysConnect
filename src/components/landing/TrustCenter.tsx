import { Reveal } from '../ui/Reveal';

export const TrustCenter = () => {
  return (
    <section id="trust" className="bg-[#1A3A5C] text-white py-20">
      <div className="max-w-[1180px] mx-auto px-6">
        <Reveal className="max-w-[640px] mb-10">
          <span className="font-['Oswald',sans-serif] uppercase tracking-[0.2em] text-xs font-semibold text-[#C9A84C]">Trust Centre</span>
          <h2 className="font-['Oswald',sans-serif] uppercase text-3xl md:text-4xl mt-3 mb-4 text-white">Governance You<br />Can Verify.</h2>
          <p className="text-[#C7D2DE]">Jernuambo Pathways NPC is a registered non-profit company. Our governance, data-protection and safeguarding commitments are public.</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <Reveal className="bg-white/5 border border-white/10 rounded-2xl p-7">
            <h3 className="font-['Oswald',sans-serif] uppercase tracking-wider text-base text-[#C9A84C] mb-4">Registration &amp; Audit</h3>
            <ul className="space-y-0">
              {[
                { lbl: 'CIPC Registration', st: 'Verified', cls: 'bg-[#1E6B3C] text-white' },
                { lbl: 'NPO Registration', st: 'In Progress', cls: 'bg-[#C9A84C] text-[#1A3A5C]' },
                { lbl: 'PBO Registration (SARS)', st: 'In Progress', cls: 'bg-[#C9A84C] text-[#1A3A5C]' },
                { lbl: 'B-BBEE Status', st: 'Level 1', cls: 'bg-[#1E6B3C] text-white' }
              ].map((li, i) => (
                <li key={i} className="flex justify-between items-center gap-3 py-2.5 border-b border-white/10 text-sm last:border-0">
                  {li.lbl} <span className={`text-[0.68rem] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${li.cls}`}>{li.st}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="bg-white/5 border border-white/10 rounded-2xl p-7">
            <h3 className="font-['Oswald',sans-serif] uppercase tracking-wider text-base text-[#C9A84C] mb-4">Policies &amp; Safeguarding</h3>
            <ul className="space-y-0">
              {[
                { lbl: 'POPIA & Privacy Policy', st: 'Active', cls: 'bg-[#1E6B3C] text-white' },
                { lbl: 'Mentor Code of Conduct', st: 'Active', cls: 'bg-[#1E6B3C] text-white' },
                { lbl: 'Learner Safeguarding Policy', st: 'Active', cls: 'bg-[#1E6B3C] text-white' },
                { lbl: 'Independent Reporting Line', st: 'In Setup', cls: 'bg-[#C9A84C] text-[#1A3A5C]' }
              ].map((li, i) => (
                <li key={i} className="flex justify-between items-center gap-3 py-2.5 border-b border-white/10 text-sm last:border-0">
                  {li.lbl} <span className={`text-[0.68rem] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${li.cls}`}>{li.st}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="md:col-span-2 bg-[#C4651A] text-white rounded-2xl p-7 flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <h3 className="font-['Oswald',sans-serif] uppercase tracking-wider text-lg mb-2 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                The Data Vault Rule
              </h3>
              <p className="text-[0.95rem] m-0 max-w-[90ch]">We only request ID documents or results when an application requires it. Our team will never ask you to send documents in open WhatsApp groups. All sensitive documents are processed and destroyed in line with the POPI Act.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
