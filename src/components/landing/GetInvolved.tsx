import { Reveal } from '../ui/Reveal';

interface GetInvolvedProps {
  setFormType: (type: string) => void;
}

export const GetInvolved = ({ setFormType }: GetInvolvedProps) => {
  return (
    <section id="involve" className="py-20">
      <div className="max-w-[1180px] mx-auto px-6">
        <Reveal className="max-w-[640px] mb-10">
          <span className="font-['Oswald',sans-serif] uppercase tracking-[0.2em] text-xs font-semibold text-[#1E6B3C]">Get Involved</span>
          <h2 className="font-['Oswald',sans-serif] uppercase text-3xl md:text-4xl mt-3 mb-4 text-[#1A3A5C]">Build the Bridge<br /><span className="text-[#1E6B3C]">With Us.</span></h2>
          <p className="text-[#5C6672]">Mentor and volunteer recruitment is open. "Screened" means every mentor completes identity verification, proof of student registration or qualification, a reference check, an interview, a safeguarding induction, and signs our oath and code of conduct before being matched with any learner.</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Reveal className="bg-[linear-gradient(150deg,#12293F,#1A3A5C)] text-white rounded-2xl p-8 flex flex-col gap-3 min-h-[240px]">
            <h3 className="font-['Oswald',sans-serif] uppercase tracking-wider text-lg">Become a Mentor</h3>
            <p className="text-sm opacity-90 flex-1">Share your journey with a learner who needs to see what is possible. One hour a week can change the direction of a life.</p>
            <a href="#contact" onClick={() => setFormType('mentor')} className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#1A3A5C] uppercase font-['Oswald',sans-serif] tracking-wider font-semibold text-xs py-3 px-5 rounded-lg self-start hover:translate-y-[-2px] hover:shadow-lg transition-all">Apply as a Mentor</a>
          </Reveal>
          <Reveal className="bg-[linear-gradient(150deg,#164F2D,#1E6B3C)] text-white rounded-2xl p-8 flex flex-col gap-3 min-h-[240px]">
            <h3 className="font-['Oswald',sans-serif] uppercase tracking-wider text-lg">Volunteer With Us</h3>
            <p className="text-sm opacity-90 flex-1">Help run application drives, open days and community events. Volunteers are the hands and heart of Pathways.</p>
            <a href="#contact" onClick={() => setFormType('mentor')} className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#1A3A5C] uppercase font-['Oswald',sans-serif] tracking-wider font-semibold text-xs py-3 px-5 rounded-lg self-start hover:translate-y-[-2px] hover:shadow-lg transition-all">Apply to Volunteer</a>
          </Reveal>
          <Reveal className="bg-[linear-gradient(150deg,#A8873A,#C9A84C)] text-[#1A3A5C] rounded-2xl p-8 flex flex-col gap-3 min-h-[240px]">
            <h3 className="font-['Oswald',sans-serif] uppercase tracking-wider text-lg">Partner or Sponsor</h3>
            <p className="text-sm opacity-90 flex-1">Institutions, businesses and donors help us open doors at scale — from bursaries to skills programmes and branch funding.</p>
            <a href="#contact" onClick={() => setFormType('partner')} className="inline-flex items-center gap-2 bg-[#1A3A5C] text-white uppercase font-['Oswald',sans-serif] tracking-wider font-semibold text-xs py-3 px-5 rounded-lg self-start hover:translate-y-[-2px] hover:shadow-lg transition-all">Partner With Us</a>
          </Reveal>
        </div>
        <Reveal className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8" aria-label="Mentor onboarding process">
          {[
            { no: '1', t: 'Apply', s: 'Submit the mentor form' },
            { no: '2', t: 'Screening', s: 'Interview & verification' },
            { no: '3', t: 'Oath & Code', s: 'Sign the code of conduct' },
            { no: '4', t: 'Assignment', s: 'Matched with learners' },
            { no: '5', t: 'Reporting', s: 'Progress reports each term' }
          ].map(step => (
            <div key={step.no} className="bg-white border border-[#E3DCCE] rounded-xl p-5 text-center">
              <div className="w-8 h-8 rounded-full bg-[#C9A84C] text-[#1A3A5C] font-['Oswald',sans-serif] font-bold flex items-center justify-center mx-auto mb-2">{step.no}</div>
              <div className="font-bold text-[#1A3A5C] text-sm">{step.t}</div>
              <div className="text-xs text-[#5C6672] mt-1">{step.s}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};
