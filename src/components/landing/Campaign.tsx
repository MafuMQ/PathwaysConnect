import { Reveal } from '../ui/Reveal';
import { CAMPAIGN } from '../../data/landingData';
import { Check } from 'lucide-react';

interface CampaignProps {
  setFormType: (type: string) => void;
}

export const Campaign = ({ setFormType }: CampaignProps) => {
  const taken = Math.min(CAMPAIGN.spacesTaken, CAMPAIGN.total);
  const pct = Math.round((taken / CAMPAIGN.total) * 100);

  return (
    <section id="campaign" className="bg-[linear-gradient(100deg,#164F2D_0%,#1E6B3C_60%,#A8873A_60.2%,#C9A84C_100%)] text-white py-20">
      <div className="max-w-[1180px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <Reveal>
          <span className="text-[#DFC98A] tracking-widest uppercase font-bold text-sm">Current Campaign · 2026</span>
          <h2 className="font-['Oswald',sans-serif] uppercase text-3xl md:text-4xl mt-2 mb-4">100 Learners Free<br />Application Campaign</h2>
          <p className="max-w-[52ch] text-[#EDF3EC]">We are supporting 100 learners through the full application journey for the 2027 academic year — completely free. Support includes:</p>
          <ul className="my-5 space-y-2">
            {['University, TVET and college application guidance', 'NSFAS bursary application support', 'Subject-choice and career guidance', 'Document checklists and deadline reminders', 'A trained volunteer mentor, subject to availability and successful matching'].map(li => (
              <li key={li} className="flex items-center gap-2"><Check className="w-4 h-4 text-[#DFC98A] shrink-0" /> {li}</li>
            ))}
          </ul>
          <p className="text-sm text-[#EDF3EC] max-w-[56ch] mb-5">Jernuambo Pathways does not charge learners for support. Institution application fees, where applicable, remain the responsibility of the applicant unless a waiver or sponsored arrangement is confirmed.</p>
          <a href="#contact" onClick={() => setFormType('learner')} className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#1A3A5C] uppercase font-['Oswald',sans-serif] tracking-wider font-semibold text-sm py-3.5 px-6 rounded-lg hover:translate-y-[-2px] hover:shadow-lg transition-all">
            Apply for a Space <span>→</span>
          </a>
        </Reveal>
        <Reveal className="bg-white text-[#2D2D2D] rounded-2xl shadow-2xl p-8">
          <h3 className="font-['Oswald',sans-serif] uppercase tracking-wider text-[#1A3A5C] text-lg mb-2">Campaign Progress</h3>
          <p className="text-sm text-[#5C6672]" dangerouslySetInnerHTML={{ __html: `<strong>Who may apply:</strong> ${CAMPAIGN.eligibility}.<br><strong>Applications:</strong> ${CAMPAIGN.opens} · <strong>Close:</strong> ${CAMPAIGN.closes}.<br>${CAMPAIGN.selection}` }}></p>
          <div className="my-4">
            <div className="h-3.5 bg-[#F5F0E8] rounded-full overflow-hidden border border-[#E3DCCE]" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={pct}>
              <div className="h-full bg-[linear-gradient(90deg,#1E6B3C,#C9A84C)] rounded-full transition-all duration-700" style={{ width: `${Math.max(pct, 2)}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-[#5C6672] mt-1.5">
              <span>{taken} space{taken === 1 ? '' : 's'} allocated</span>
              <span>{CAMPAIGN.total - taken} remaining</span>
            </div>
          </div>
          <p className="text-xs text-[#5C6672]">Updated {CAMPAIGN.updated}.</p>
          <div className="bg-[#FBEEDF] border border-[#EED9BD] border-l-4 border-l-[#C4651A] rounded-lg p-4 text-sm mt-4 text-[#6B4212]">
            <strong className="text-[#C4651A]">Important — protect your documents:</strong> Do not email or WhatsApp your ID, results or financial documents. First contact needs only your name, surname and contact number. We will request documents through a secure, authorised process only when required.
          </div>
        </Reveal>
      </div>
    </section>
  );
};
