import { useState } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Gateway } from './Gateway';
import { Campaign } from './Campaign';
import { WhatWeDo } from './WhatWeDo';
import { Opportunities } from './Opportunities';
import { ResourceLibrary } from './ResourceLibrary';
import { Branches } from './Branches';
import { GetInvolved } from './GetInvolved';
import { TrustCenter } from './TrustCenter';
import { Contact } from './Contact';
import { Footer } from './Footer';

const Index = () => {
  const [formType, setFormType] = useState('learner');

  return (
    <div className="font-['Public_Sans',sans-serif] text-[#2D2D2D] bg-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-0 focus:top-0 focus:bg-[#C9A84C] focus:text-[#1A3A5C] focus:py-3 focus:px-5 focus:font-bold focus:z-[200]">Skip to main content</a>
      
      <Navbar />

      <main id="main">
        <div className="bg-[#C9A84C] text-[#1A3A5C] text-center py-2 px-4 font-semibold text-sm">
          Now open: <strong>100 Learners Free Application Campaign</strong> — <a href="#campaign" className="font-bold underline underline-offset-2">See how it works and apply</a>
        </div>
        
        <Hero />
        <Gateway setFormType={setFormType} />
        <Campaign setFormType={setFormType} />
        <WhatWeDo />
        <Opportunities />
        <ResourceLibrary />
        <Branches setFormType={setFormType} />
        <GetInvolved setFormType={setFormType} />
        <TrustCenter />
        <Contact formType={formType} setFormType={setFormType} />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
