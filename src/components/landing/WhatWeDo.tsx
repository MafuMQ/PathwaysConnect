import { Reveal } from '../ui/Reveal';
import { IMPACT } from '../../data/landingData';

export const WhatWeDo = () => {
  return (
    <>
      <section id="what-we-do" className="py-20">
        <div className="max-w-[1180px] mx-auto px-6">
          <Reveal className="max-w-[640px] mb-10">
            <span className="font-['Oswald',sans-serif] uppercase tracking-[0.2em] text-xs font-semibold text-[#1E6B3C]">What We Do</span>
            <h2 className="font-['Oswald',sans-serif] uppercase text-3xl md:text-4xl mt-3 mb-4 text-[#1A3A5C]">Creating Pathways.<br /><span className="text-[#1E6B3C]">Changing Lives.</span></h2>
            <p className="text-[#5C6672]">We work with learners, students and communities to remove barriers and unlock opportunities through education, mentorship and skills.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: 'M12 5c-2-1.5-5-2-8-1.5v14c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-14C17 3 14 3.5 12 5Z M12 5v14', color: 'bg-[#1E6B3C]', title: 'Support Learners', desc: 'Academic guidance, application support and career advice — free of charge.' },
              { icon: 'M12 7a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Z M6 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z M18 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z M7 19c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5 M2.5 17.5c.3-2.2 1.8-3.4 3.7-3.6 M21.5 17.5c-.3-2.2-1.8-3.4-3.7-3.6', color: 'bg-[#C9A84C]', title: 'Mentor & Empower', desc: 'Connecting youth with screened volunteer mentors and role models for personal growth.' },
              { icon: 'M3 8h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z M9 8V6a3 3 0 0 1 6 0v2 M3 13h18', color: 'bg-[#1A3A5C]', title: 'Skills & Training', desc: 'Equipping young people with skills for today\'s world of work.' },
              { icon: 'M8 13l-4 1.5L7 17l1-4Z M13 8l1.5-4L16 7.5 13 8Z M7 17c5 1 10-4 9.5-9.5C11 7 6 12 7 17Z', color: 'bg-[#C4651A]', title: 'Create Opportunities', desc: 'Partnerships, bursaries and opportunities that open real doors.' }
            ].map((c, i) => (
              <Reveal key={i} className="bg-white border border-[#E3DCCE] rounded-2xl p-7 text-center hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${c.color}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" className="w-7 h-7">
                    <path d={c.icon} />
                  </svg>
                </div>
                <h3 className="font-['Oswald',sans-serif] uppercase tracking-wider text-[#1A3A5C] text-sm mb-2">{c.title}</h3>
                <p className="text-sm text-[#5C6672]">{c.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-[#1A3A5C] text-white py-14">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPACT.items.map((i, idx) => (
              <div key={idx} className="border-l-4 border-[#C9A84C] pl-4">
                <div className="font-['Oswald',sans-serif] font-bold text-3xl">{i.num}</div>
                <div className="text-sm text-[#C7D2DE] mt-1">{i.lbl}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-[#9FB0C2] flex items-center gap-2 flex-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg>
            <span>Figures updated {IMPACT.updated} · verified by {IMPACT.verifiedBy}. We publish only what we can evidence.</span>
          </p>
        </div>
      </div>
    </>
  );
};
