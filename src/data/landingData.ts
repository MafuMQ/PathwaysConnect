export const LOGO_SRC = "/logo.png";

export const IMPACT = {
  updated: 'July 2026',
  verifiedBy: 'the National Executive',
  items: [
    { num: '1',   lbl: 'Founding branch — Wattville, Benoni (Gauteng)' },
    { num: '100', lbl: 'Free application spaces — 2026 campaign' },
    { num: '4',   lbl: 'Free guides published in the Resource Library' },
    { num: '9',   lbl: 'Provinces in our national expansion plan' }
  ]
};

export const CAMPAIGN = {
  total: 100, spacesTaken: 0, updated: 'July 2026',
  opens: 'Open now', closes: 'To be announced',
  eligibility: 'Grade 10–12 learners and recent matriculants in South Africa',
  selection: 'Spaces are allocated in order of application, with priority for Grade 12 learners.'
};

export const SHOW_UNVERIFIED = false;

export const OPPORTUNITIES: any[] = [];

export const RESOURCES = [
  { title:'NSFAS Application Guide', cat:'NSFAS', audience:'Matric', year:2026,
    cover:'cv-navy', file:'resources/nsfas-application-guide.pdf', type:'PDF', size:'2.4 MB',
    summary:'Step-by-step NSFAS application walkthrough with document checklist and common mistakes to avoid.' },
  { title:'University Application Checklist', cat:'University', audience:'Matric', year:2026,
    cover:'cv-green', file:'resources/university-application-checklist.pdf', type:'PDF', size:'1.8 MB',
    summary:'Everything you need before, during and after applying — dates, documents and APS basics.' },
  { title:'Career Guide for Matric Learners', cat:'Careers', audience:'Matric', year:2026,
    cover:'cv-gold', file:'resources/career-guide-matric.pdf', type:'PDF', size:'3.1 MB',
    summary:'Explore career fields, matching qualifications and where to study them in South Africa.' },
  { title:'Bursaries & Funding Opportunities', cat:'Bursaries', audience:'All grades', year:2026,
    cover:'cv-orange', file:'resources/bursaries-funding-opportunities.pdf', type:'PDF', size:'2.7 MB',
    summary:'A curated list of bursaries and funding routes, with eligibility notes and application tips.' }
];

export const LIB_FILTERS = ['All','NSFAS','University','Bursaries','Careers'];

export const BRANCHES = [
  { p:'Gauteng',        d:'Founding branch — Wattville, Benoni', status:'Active' },
  { p:'Eastern Cape',   d:'Expansion planned',                   status:'Planned' },
  { p:'Free State',     d:'Expansion planned',                   status:'Planned' },
  { p:'KwaZulu-Natal',  d:'Expansion planned',                   status:'Planned' },
  { p:'Limpopo',        d:'Expansion planned',                   status:'Planned' },
  { p:'Mpumalanga',     d:'Expansion planned',                   status:'Planned' },
  { p:'North West',     d:'Expansion planned',                   status:'Planned' },
  { p:'Northern Cape',  d:'Expansion planned',                   status:'Planned' },
  { p:'Western Cape',   d:'Expansion planned',                   status:'Planned' }
];

export const FORM_ENDPOINTS: Record<string, { url: string; entries: any }> = {
  learner: { url:'', entries:{ name:'', surname:'', contact:'', province:'', grade:'', school:'', message:'', ref:'' } },
  parent:  { url:'', entries:{ name:'', surname:'', contact:'', province:'', message:'', ref:'' } },
  mentor:  { url:'', entries:{ name:'', surname:'', contact:'', province:'', message:'', ref:'' } },
  partner: { url:'', entries:{ name:'', surname:'', contact:'', province:'', message:'', ref:'' } },
  branch:  { url:'', entries:{ name:'', surname:'', contact:'', province:'', message:'', ref:'' } }
};
export const NEWSLETTER_ENDPOINT = { url:'', entry:'' }; 

export const TAB_CONFIG = {
  learner: { msg:'What do you need help with?', learnerFields:true, label: 'Learner Support' },
  parent:  { msg:'What would you like to know or discuss?', learnerFields:false, label: 'Parent Enquiry' },
  mentor:  { msg:'Tell us about yourself and how you would like to help', learnerFields:false, label: 'Mentor / Volunteer' },
  partner: { msg:'Tell us about your organisation and the partnership you have in mind', learnerFields:false, label: 'Partnership' },
  branch:  { msg:'Tell us about your community or institution and your team', learnerFields:false, label: 'Start a Branch' }
};

export const coverStyles = {
  'cv-navy': 'bg-[linear-gradient(160deg,#12293F,#1A3A5C)] text-white',
  'cv-green': 'bg-[linear-gradient(160deg,#164F2D,#1E6B3C)] text-white',
  'cv-gold': 'bg-[linear-gradient(160deg,#A8873A,#C9A84C)] text-[#1A3A5C]',
  'cv-orange': 'bg-[linear-gradient(160deg,#9A4E12,#C4651A)] text-white'
};
