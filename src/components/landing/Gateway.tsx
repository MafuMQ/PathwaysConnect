import { Reveal } from '../ui/Reveal';

interface GatewayProps {
  setFormType: (type: string) => void;
}

export const Gateway = ({ setFormType }: GatewayProps) => {
  return (
    <section id="gateway" className="bg-[#F5F0E8] py-20">
      <div className="max-w-[1180px] mx-auto px-6">
        <Reveal className="max-w-[640px] mb-10">
          <span className="font-['Oswald',sans-serif] uppercase tracking-[0.2em] text-xs font-semibold text-[#1E6B3C]">Start Here</span>
          <h2 className="font-['Oswald',sans-serif] uppercase text-3xl md:text-4xl mt-3 mb-4 text-[#1A3A5C]">How Can We Help<br /><span className="text-[#1E6B3C]">You Today?</span></h2>
          <p className="text-[#5C6672]">Jernuambo Pathways serves learners, families, mentors, institutions and funders. Choose the path that fits you.</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: 'I Am a Learner', desc: 'Grade 10–12 or gap-year: get free help with subject choices, applications, NSFAS and bursaries.', link: 'Get Support →', type: 'learner' },
            { title: 'I Am a Parent or Guardian', desc: 'Understand the application process, document requirements, deadlines and how we support your child.', link: 'Ask a Question →', type: 'parent' },
            { title: 'I Am a Student Mentor', desc: 'University and TVET students: guide learners from your community through the journey you have walked.', link: 'Join as a Mentor →', type: 'mentor' },
            { title: 'I Am a Graduate', desc: 'Tutor, coach and open doors. Your qualification and experience can change a learner\'s direction.', link: 'Volunteer Your Skills →', type: 'mentor' },
            { title: 'I Represent an Institution', desc: 'Universities, TVET colleges and schools: partner with us on open days, resources and opportunities.', link: 'Partner With Us →', type: 'partner' },
            { title: 'I Want to Fund the Cause', desc: 'Donors and corporates: sponsor learners, fund a branch, and see verified, date-stamped impact.', link: 'Support a Learner →', type: 'partner' }
          ].map((g, i) => (
            <Reveal key={i}>
              <a href="#contact" onClick={() => setFormType(g.type)} className="block bg-white border border-[#E3DCCE] border-l-4 border-l-[#C9A84C] rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all">
                <h3 className="font-['Oswald',sans-serif] uppercase tracking-wider text-[#1A3A5C] text-base mb-2">{g.title}</h3>
                <p className="text-sm text-[#5C6672]">{g.desc}</p>
                <span className="inline-block mt-3 font-['Oswald',sans-serif] uppercase tracking-wider text-xs font-semibold text-[#1E6B3C]">{g.link}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
