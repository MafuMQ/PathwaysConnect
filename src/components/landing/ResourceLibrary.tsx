import { useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { RESOURCES, LIB_FILTERS, coverStyles } from '../../data/landingData';

export const ResourceLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredResources = RESOURCES.filter(r =>
    (activeFilter === 'All' || r.cat === activeFilter) &&
    (!searchQuery || (r.title + ' ' + r.summary + ' ' + r.cat).toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="resources" className="py-20">
      <div className="max-w-[1180px] mx-auto px-6">
        <Reveal className="max-w-[640px] mb-10">
          <span className="font-['Oswald',sans-serif] uppercase tracking-[0.2em] text-xs font-semibold text-[#1E6B3C]">Resource Library</span>
          <h2 className="font-['Oswald',sans-serif] uppercase text-3xl md:text-4xl mt-3 mb-4 text-[#1A3A5C]">Knowledge. Tools.<br /><span className="text-[#1E6B3C]">Success.</span></h2>
          <p className="text-[#5C6672]">Free, curriculum-aware guides and booklets for your educational journey. Search or filter to find what you need.</p>
        </Reveal>
        <Reveal className="flex flex-wrap gap-3 items-center mb-6">
          <div className="flex-1 min-w-[220px] relative">
            <svg viewBox="0 0 24 24" fill="none" stroke="#5C6672" strokeWidth="2" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              placeholder="Search guides, e.g. NSFAS, bursaries, careers…"
              aria-label="Search resources"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 border border-[#CFC5AF] rounded-lg focus:outline-none focus:border-[#C9A84C]"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {LIB_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                aria-pressed={activeFilter === f}
                className={`border rounded-full px-4 py-2 text-sm font-semibold transition-colors ${activeFilter === f ? 'bg-[#1A3A5C] text-white border-[#1A3A5C]' : 'bg-white text-[#1A3A5C] border-[#CFC5AF] hover:border-[#C9A84C]'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredResources.length === 0 ? (
            <div className="lg:col-span-4 text-center p-12 bg-white border border-dashed border-[#CFC5AF] rounded-2xl text-[#5C6672]">
              <strong className="text-[#1A3A5C]">No guides match your search.</strong><br />
              Try another word, or <a href="#contact" className="text-[#1E6B3C] font-bold">ask us directly</a> — we may be able to create the guide you need.
            </div>
          ) : (
            filteredResources.map((r, index) => (
              <Reveal key={index} className="bg-white border border-[#E3DCCE] rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className={`aspect-[3/4.2] p-4 flex flex-col relative ${coverStyles[r.cover as keyof typeof coverStyles]}`}>
                  <span className="text-[0.68rem] tracking-wider uppercase font-bold opacity-90">{r.cat} · {r.audience}</span>
                  <h3 className="mt-auto text-lg leading-tight tracking-wide">{r.title}</h3>
                  <div className="absolute left-0 right-0 bottom-0 h-1.5 bg-[linear-gradient(90deg,#1A3A5C_33%,#C9A84C_33%_66%,#1E6B3C_66%)]"></div>
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <p className="text-sm text-[#5C6672] flex-1">{r.summary}</p>
                  <div className="flex justify-between items-center text-xs text-[#5C6672]">
                    <span>{r.type} · {r.size} · {r.year}</span>
                    <a href={r.file} download className="font-bold text-[#1E6B3C] hover:underline">Download</a>
                  </div>
                </div>
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
