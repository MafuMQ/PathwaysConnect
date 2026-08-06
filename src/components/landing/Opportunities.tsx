import { Reveal } from '../ui/Reveal';
import { SHOW_UNVERIFIED, OPPORTUNITIES } from '../../data/landingData';

export const Opportunities = () => {
  const visibleOpps = SHOW_UNVERIFIED ? OPPORTUNITIES : OPPORTUNITIES.filter(o => o.verified && !o.demo);

  return (
    <section id="opportunities" className="bg-[#F5F0E8] py-20">
      <div className="max-w-[1180px] mx-auto px-6">
        <Reveal className="max-w-[640px] mb-10">
          <span className="font-['Oswald',sans-serif] uppercase tracking-[0.2em] text-xs font-semibold text-[#1E6B3C]">Opportunities Centre</span>
          <h2 className="font-['Oswald',sans-serif] uppercase text-3xl md:text-4xl mt-3 mb-4 text-[#1A3A5C]">Applications, Bursaries<br /><span className="text-[#1E6B3C]">&amp; Open Doors.</span></h2>
          <p className="text-[#5C6672]">Verified opportunities for learners and graduates. Every listing shows its closing date and when we last checked it.</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleOpps.length === 0 ? (
            <div className="lg:col-span-3 text-center p-12 bg-white border border-dashed border-[#CFC5AF] rounded-2xl text-[#5C6672]">
              <strong className="text-[#1A3A5C]">Verified opportunities are being prepared.</strong><br />
              Our team checks every listing before publishing it — institution, closing date and official link.
              Subscribe to the newsletter below, or <a href="#contact" className="text-[#1E6B3C] font-bold">ask us directly</a> about applications, bursaries and intakes.
            </div>
          ) : (
            visibleOpps.map((o, index) => {
              let closingText = o.closesText || '';
              if (o.closes) {
                const days = Math.ceil((new Date(o.closes).getTime() - new Date().getTime()) / 86400000);
                closingText = days > 0 ? `Closes ${o.closes} · ${days} day${days===1?'':'s'} left` : 'Closed — check for the next intake';
              }
              return (
                <Reveal key={index} className="bg-white border border-[#E3DCCE] rounded-2xl p-5 flex flex-col gap-2.5 hover:-translate-y-1 hover:shadow-lg transition-all">
                  <div className="flex justify-between gap-2 items-center">
                    <span className="text-xs uppercase tracking-wider font-bold text-[#C4651A]">{o.type}</span>
                    {o.demo ? (
                      <span className="text-xs uppercase font-bold tracking-wider bg-[#FBEEDF] text-[#C4651A] px-2.5 py-1 rounded-full">Verify before launch</span>
                    ) : o.verified ? (
                      <span className="text-xs uppercase font-bold tracking-wider bg-[#E7F0EA] text-[#1E6B3C] px-2.5 py-1 rounded-full">✓ Verified</span>
                    ) : null}
                  </div>
                  <h3 className="font-bold text-[#1A3A5C] text-lg leading-tight">{o.title}</h3>
                  <div className="text-sm text-[#5C6672]">{o.org} · {o.where}</div>
                  <div className="text-sm font-bold text-[#1A3A5C]" dangerouslySetInnerHTML={{ __html: closingText.replace(/(\d+ day(s)? left)/, '<span class="text-[#C4651A]">$1</span>') }}></div>
                  <div className="text-sm text-[#5C6672]"><strong>You will need:</strong> {o.docs}</div>
                  <div className="flex justify-between items-center mt-auto pt-3 border-t border-[#E3DCCE]">
                    <a href={o.link} target="_blank" rel="noopener noreferrer" className="font-['Oswald',sans-serif] uppercase tracking-wider text-xs font-semibold text-[#1E6B3C] hover:underline">Official site →</a>
                    <span className="text-xs text-[#5C6672]">Last checked {o.lastChecked}</span>
                  </div>
                </Reveal>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
