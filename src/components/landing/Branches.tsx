import { Reveal } from '../ui/Reveal';
import { BRANCHES } from '../../data/landingData';

interface BranchesProps {
  setFormType: (type: string) => void;
}

export const Branches = ({ setFormType }: BranchesProps) => {
  return (
    <section id="branches" className="bg-[#EFE8DB] py-20">
      <div className="max-w-[1180px] mx-auto px-6">
        <Reveal className="max-w-[640px] mb-10">
          <span className="font-['Oswald',sans-serif] uppercase tracking-[0.2em] text-xs font-semibold text-[#1E6B3C]">Our Branches</span>
          <h2 className="font-['Oswald',sans-serif] uppercase text-3xl md:text-4xl mt-3 mb-4 text-[#1A3A5C]">Branches Are Our<br /><span className="text-[#1E6B3C]">Delivery Engine.</span></h2>
          <p className="text-[#5C6672]">Jernuambo Pathways is built as a national, branch-driven organisation. Branches deliver programmes on the ground and report through provincial and national structures to the Board.</p>
        </Reveal>
        <Reveal className="flex items-center justify-center gap-3 flex-wrap my-8">
          <div className="bg-white border border-[#E3DCCE] border-t-4 border-t-[#C9A84C] rounded-lg p-3 text-center shadow-md">
            <div className="font-['Oswald',sans-serif] uppercase tracking-wider font-semibold text-[#1A3A5C] text-sm">Branches</div>
            <div className="text-xs text-[#5C6672]">Programme delivery</div>
          </div>
          <span className="text-xl text-[#A8873A] font-bold">→</span>
          <div className="bg-white border border-[#E3DCCE] border-t-4 border-t-[#C9A84C] rounded-lg p-3 text-center shadow-md">
            <div className="font-['Oswald',sans-serif] uppercase tracking-wider font-semibold text-[#1A3A5C] text-sm">Provincial Structures</div>
            <div className="text-xs text-[#5C6672]">Coordination &amp; support</div>
          </div>
          <span className="text-xl text-[#A8873A] font-bold">→</span>
          <div className="bg-white border border-[#E3DCCE] border-t-4 border-t-[#C9A84C] rounded-lg p-3 text-center shadow-md">
            <div className="font-['Oswald',sans-serif] uppercase tracking-wider font-semibold text-[#1A3A5C] text-sm">National Executive</div>
            <div className="text-xs text-[#5C6672]">Strategy &amp; operations</div>
          </div>
          <span className="text-xl text-[#A8873A] font-bold">→</span>
          <div className="bg-white border border-[#E3DCCE] border-t-4 border-t-[#C9A84C] rounded-lg p-3 text-center shadow-md">
            <div className="font-['Oswald',sans-serif] uppercase tracking-wider font-semibold text-[#1A3A5C] text-sm">Board of Directors</div>
            <div className="text-xs text-[#5C6672]">Governance &amp; accountability</div>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BRANCHES.map((b, index) => {
            const cls = b.status === 'Active' ? 'bg-[#1E6B3C] text-white' : (b.status === 'Forming' ? 'bg-[#C9A84C] text-[#1A3A5C]' : 'bg-[#E7EBF0] text-[#1A3A5C]');
            return (
              <div key={index} className="bg-white border border-[#E3DCCE] rounded-xl p-4 flex justify-between items-center gap-2">
                <div>
                  <div className="font-bold text-[#1A3A5C]">{b.p}</div>
                  <div className="text-xs text-[#5C6672]">{b.d}</div>
                </div>
                <span className={`text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap ${cls}`}>{b.status}</span>
              </div>
            );
          })}
        </div>
        <Reveal className="mt-7">
          <a href="#contact" onClick={() => setFormType('branch')} className="inline-flex items-center gap-2 bg-[#1A3A5C] text-white uppercase font-['Oswald',sans-serif] tracking-wider font-semibold text-sm py-3.5 px-6 rounded-lg hover:translate-y-[-2px] hover:shadow-lg transition-all">
            Apply to Establish a Branch <span>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
};
