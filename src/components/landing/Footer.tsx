import { useState } from 'react';
import { Tricolour } from '../ui/Tricolour';
import { LOGO_SRC, NEWSLETTER_ENDPOINT } from '../../data/landingData';

export const Footer = () => {
  const [newsEmail, setNewsEmail] = useState('');
  const [newsNote, setNewsNote] = useState('');

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail || !newsEmail.includes('@')) {
      setNewsNote('Enter a valid email address to subscribe.');
      return;
    }
    
    // Convert to checking truthiness of the object URL if configured
    const hasEndpoint = typeof NEWSLETTER_ENDPOINT === 'string' 
      ? NEWSLETTER_ENDPOINT 
      : NEWSLETTER_ENDPOINT?.url;
      
    if (hasEndpoint) {
      setNewsNote('Thank you — you are on the list.');
    } else {
      setNewsNote('To make sure you are added, please email info@jernuambopathways.org with the word "Subscribe". Online signup is being connected.');
    }
    setNewsEmail('');
  };

  return (
    <footer className="bg-[#12293F] text-[#C7D2DE]">
      <Tricolour />
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-14">
          <div>
            <img src={LOGO_SRC} alt="Jernuambo Pathways" className="h-24 w-auto" />
            <p className="text-sm mt-4 max-w-[36ch]">We are committed to developing young people and creating opportunities that transform communities and build a better future.</p>
            <p className="text-xs text-[#8DA2B5] mt-2.5">Jernuambo Pathways NPC · Reg. No. 2026/283524/08<br />A registered non-profit company in South Africa.<br />Registered office: Wattville, Benoni, Gauteng (visits by appointment).</p>
          </div>
          <div>
            <h4 className="font-['Oswald',sans-serif] uppercase tracking-wider text-sm text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#gateway" className="hover:text-[#C9A84C]">Get Support</a></li>
              <li><a href="#campaign" className="hover:text-[#C9A84C]">100 Learners Campaign</a></li>
              <li><a href="#opportunities" className="hover:text-[#C9A84C]">Opportunities</a></li>
              <li><a href="#resources" className="hover:text-[#C9A84C]">Resource Library</a></li>
              <li><a href="#branches" className="hover:text-[#C9A84C]">Branches</a></li>
              <li><a href="#involve" className="hover:text-[#C9A84C]">Mentor &amp; Volunteer</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-['Oswald',sans-serif] uppercase tracking-wider text-sm text-white mb-4">Trust &amp; Policies</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#trust" className="hover:text-[#C9A84C]">Trust Centre</a></li>
              <li><a href="#privacy" className="hover:text-[#C9A84C]">Privacy Notice (POPIA)</a></li>
              <li><a href="#trust" className="hover:text-[#C9A84C]">Complaints &amp; Whistleblowing</a></li>
              <li><a href="#trust" className="hover:text-[#C9A84C]">Governance Structure</a></li>
              <li><a href="#contact" className="hover:text-[#C9A84C]">Contact the Information Officer</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-['Oswald',sans-serif] uppercase tracking-wider text-sm text-white mb-4">Newsletter</h4>
            <p className="text-sm">Opportunities, deadlines and resources — straight to your inbox.</p>
            <form onSubmit={handleNewsSubmit} noValidate className="flex mt-3.5 rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address for newsletter"
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                required
                className="flex-1 p-3 border-none text-sm text-[#2D2D2D] min-w-0"
              />
              <button type="submit" className="bg-[#1E6B3C] text-white border-none px-4 font-['Oswald',sans-serif] uppercase tracking-wider text-xs font-semibold cursor-pointer">Subscribe</button>
            </form>
            <p className="text-xs text-[#8DA2B5] mt-2.5" dangerouslySetInnerHTML={{ __html: newsNote }}></p>
            <h4 className="font-['Oswald',sans-serif] uppercase tracking-wider text-sm text-white mt-6 mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="tel:+27818458474" className="hover:text-[#C9A84C]">081 845 8474</a></li>
              <li><a href="mailto:info@jernuambopathways.org" className="hover:text-[#C9A84C]">info@jernuambopathways.org</a></li>
            </ul>
            <div className="flex gap-2 mt-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-dashed border-white/20 rounded-full px-3.5 py-1.5 text-xs text-[#9FB0C2]">Facebook — coming soon</span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-dashed border-white/20 rounded-full px-3.5 py-1.5 text-xs text-[#9FB0C2]">Instagram — coming soon</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 flex justify-between flex-wrap gap-4 text-xs">
          <span>© 2026 Jernuambo Pathways NPC. All rights reserved.</span>
          <span><a href="#privacy" className="hover:text-[#C9A84C]">Privacy Notice</a> &nbsp;|&nbsp; <a href="#trust" className="hover:text-[#C9A84C]">Trust Centre</a></span>
        </div>
      </div>
      <Tricolour />
    </footer>
  );
};
