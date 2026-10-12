import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LOGO_SRC } from '../../data/landingData';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#1A3A5C] border-b border-white/10">
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 flex items-center justify-between py-2.5">
        <a href="#home" aria-label="Jernuambo Pathways home" className="flex items-center z-50 relative">
          <img src={LOGO_SRC} alt="Jernuambo Pathways" className="h-10 md:h-16 w-auto" />
        </a>
        
        <nav className={`${menuOpen ? 'fixed inset-0 bg-[#1A3A5C] flex flex-col items-center justify-center gap-8 z-40' : 'hidden'} md:flex md:items-center md:gap-6 md:static md:bg-transparent md:flex-row`}>
          <a href="#home" onClick={() => setMenuOpen(false)} className="text-[#E9EDF3] font-semibold text-2xl md:text-sm hover:text-[#C9A84C] transition-colors">Home</a>
          <a href="#gateway" onClick={() => setMenuOpen(false)} className="text-[#E9EDF3] font-semibold text-2xl md:text-sm hover:text-[#C9A84C] transition-colors">Get Support</a>
          <a href="#opportunities" onClick={() => setMenuOpen(false)} className="text-[#E9EDF3] font-semibold text-2xl md:text-sm hover:text-[#C9A84C] transition-colors">Opportunities</a>
          <a href="#resources" onClick={() => setMenuOpen(false)} className="text-[#E9EDF3] font-semibold text-2xl md:text-sm hover:text-[#C9A84C] transition-colors">Resources</a>
          <a href="#branches" onClick={() => setMenuOpen(false)} className="text-[#E9EDF3] font-semibold text-2xl md:text-sm hover:text-[#C9A84C] transition-colors">Branches</a>
          <a href="#trust" onClick={() => setMenuOpen(false)} className="text-[#E9EDF3] font-semibold text-2xl md:text-sm hover:text-[#C9A84C] transition-colors">Trust Centre</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="text-[#E9EDF3] font-semibold text-2xl md:text-sm hover:text-[#C9A84C] transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-2 md:gap-4 z-50 relative">
          <a href="#contact" className="hidden lg:inline-flex items-center gap-2 bg-[#C9A84C] text-[#1A3A5C] uppercase font-['Oswald',sans-serif] tracking-wider font-semibold text-xs py-3 px-5 rounded-lg hover:translate-y-[-2px] hover:shadow-lg transition-all whitespace-nowrap">
            Get Learner Support
          </a>
          <Link to="/login" className="inline-flex items-center justify-center rounded-full border border-white/70 px-3 py-1.5 md:px-5 md:py-2.5 text-xs md:text-sm font-semibold text-white transition-all hover:bg-white hover:text-[#1A3A5C] whitespace-nowrap">
            Log In
          </Link>
          <Link to="/signup" className="inline-flex items-center justify-center rounded-full bg-[#C9A84C] px-3 py-1.5 md:px-5 md:py-2.5 text-xs md:text-sm font-bold text-[#1A3A5C] transition-all hover:bg-[#b5953e] hover:shadow-md whitespace-nowrap">
            Sign Up
          </Link>
          <button 
            className="md:hidden bg-transparent border border-white/35 rounded-lg text-white px-2 py-1 text-lg cursor-pointer flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
