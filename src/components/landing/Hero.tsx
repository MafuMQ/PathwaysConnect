import { LOGO_SRC } from '../../data/landingData';

export const Hero = () => {
  return (
    <section id="home" className="relative bg-[linear-gradient(135deg,#12293F_0%,#1A3A5C_55%,#24486E_100%)] text-white overflow-hidden">
      <div className="absolute right-[-160px] top-[-90px] w-[660px] h-[660px] pointer-events-none transform rotate-2" style={{
        background: `linear-gradient(115deg, transparent 44%, rgba(201,168,76,.55) 44% 52%, transparent 52%), linear-gradient(115deg, transparent 58%, rgba(30,107,60,.55) 58% 66%, transparent 66%)`
      }}></div>
      <div className="max-w-[1180px] mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 items-center py-16 md:py-20">
        <div>
          <span className="inline-block bg-[#1E6B3C] border border-white/20 text-white py-1.5 px-4 rounded text-xs uppercase tracking-[0.2em] mb-5 font-['Oswald',sans-serif]">Empowering Youth. Building Futures.</span>
          <h1 className="font-['Oswald',sans-serif] uppercase text-4xl md:text-5xl lg:text-6xl leading-tight">
            Every learner deserves a clear <span className="text-[#C9A84C]">pathway forward.</span>
          </h1>
          <p className="mt-5 text-[#DAE2EC] max-w-[56ch] text-lg">
            From subject choices and applications to funding, mentorship and employment pathways, Jernuambo Pathways guides young people from potential to opportunity. Core learner application support is currently provided free through our volunteer-led campaign.
          </p>
          <div className="flex gap-3 flex-wrap mt-7">
            <a href="#contact" className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#1A3A5C] uppercase font-['Oswald',sans-serif] tracking-wider font-semibold text-sm py-3.5 px-6 rounded-lg hover:translate-y-[-2px] hover:shadow-lg transition-all">
              Get Learner Support <span>→</span>
            </a>
            <a href="#involve" className="inline-flex items-center gap-2 bg-[#1E6B3C] text-white uppercase font-['Oswald',sans-serif] tracking-wider font-semibold text-sm py-3.5 px-6 rounded-lg hover:translate-y-[-2px] hover:shadow-lg transition-all">
              Become a Mentor
            </a>
            <a href="#opportunities" className="inline-flex items-center gap-2 border-2 border-white text-white uppercase font-['Oswald',sans-serif] tracking-wider font-semibold text-sm py-3.5 px-6 rounded-lg hover:translate-y-[-2px] hover:shadow-lg transition-all">
              Explore Opportunities
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5">
          <img src={LOGO_SRC} alt="" role="presentation" className="w-[70%] max-w-[330px] drop-shadow-2xl" />
          <div className="bg-white text-[#2D2D2D] rounded-xl shadow-2xl p-5 max-w-[320px] text-sm border-l-4 border-[#C9A84C]">
            Our mission is simple: to bridge <strong className="text-[#1E6B3C]">potential</strong> to <strong className="text-[#A8873A]">opportunity</strong> for all.
            <span className="block mt-2 text-xs tracking-wider uppercase font-bold text-[#1A3A5C]">Never veer from your cause</span>
          </div>
        </div>
      </div>
      <div className="flex h-1.5 w-full">
        <span className="flex-1 bg-[#C9A84C]"></span>
        <span className="flex-1 bg-[#1E6B3C]"></span>
        <span className="flex-1 bg-[#1A3A5C]"></span>
      </div>
    </section>
  );
};
