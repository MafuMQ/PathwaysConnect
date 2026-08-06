export const SPARK = {
  Christianity: [["“I can do all things through Christ who strengthens me.”","Philippians 4:13"],["“For I know the plans I have for you… plans to give you hope and a future.”","Jeremiah 29:11"],["“Commit your work to the Lord, and your plans will be established.”","Proverbs 16:3"]],
  Islam: [["“Indeed, with hardship comes ease.”","Qur'an 94:6"],["“And whoever puts their trust in Allah, He will be enough for them.”","Qur'an 65:3"]],
  Hinduism: [["“You have the right to work, but never to the fruit of work — act without attachment.”","Bhagavad Gita 2:47"],["“The mind is everything. What you think, you become.”","Vedic wisdom"]],
  Judaism: [["“Be strong and courageous… for the Lord your God goes with you.”","Deuteronomy 31:6"],["“Who is wise? One who learns from every person.”","Pirkei Avot 4:1"]],
  Buddhism: [["“To keep the body in good health is a duty — otherwise we cannot keep our mind strong and clear.”","The Dhammapada"],["“Drop by drop is the water pot filled.”","Dhammapada 122"]],
  Ubuntu: [["“Umuntu ngumuntu ngabantu — I am because we are.”","Ubuntu philosophy"],["“If you want to go fast, go alone. If you want to go far, go together.”","African proverb"]],
  None: [["“It always seems impossible until it is done.”","Nelson Mandela"],["“Never veer from your cause. Perpetuate toward the fixed end goal regardless of the odds.”","Jernuambo philosophy"],["“You may not control all the events that happen to you, but you can decide not to be reduced by them.”","Maya Angelou"]]
};

export const MENTORS = [
  { n: 'Thandi Mokoena', i: 'TM', c: '#1E6B3C', inst: 'University of Johannesburg', deg: '3rd yr · BNurs Nursing Science', pct: 94, langs: 'isiZulu · English', subj: ['Life Sciences', 'Maths'], bio: 'From Tembisa to UJ Nursing on NSFAS. I help learners build the exact application pack that got me in.', rating: 4.9 },
  { n: 'Michelle Ndlovu', i: 'MN', c: '#2C5F8A', inst: 'Wits University', deg: '2nd yr · MBBCh Medicine', pct: 88, langs: 'isiXhosa · English', subj: ['Physical Sciences', 'Life Sciences'], bio: 'Medicine is possible from a township school — I am proof. Ask me about NBTs and Wits requirements.', rating: 4.8 },
  { n: 'Sibusiso Dlamini', i: 'SD', c: '#A8862F', inst: 'Tshwane University of Technology', deg: 'Final yr · Dip Environmental Health', pct: 81, langs: 'Sepedi · English', subj: ['Geography', 'Maths Lit'], bio: 'TVET and universities of technology are real pathways, not backups. Let me show you the routes.', rating: 4.7 },
  { n: 'Naledi Khumalo', i: 'NK', c: '#7A4E9E', inst: 'University of Pretoria', deg: '2nd yr · BSc Health Sciences', pct: 76, langs: 'Setswana · English', subj: ['Maths', 'Physical Sciences'], bio: 'I re-wrote two subjects to lift my APS by 4 points. If your marks need a plan, I have one.', rating: 4.9 },
];

export const OPPS = [
  { id: 'netcare', n: 'Netcare Nursing Bursary 2027', type: 'Bursary', field: 'Health Sciences', minAPS: 28, subj: { 'Life Sciences': 60, 'Mathematics': 60 }, docs: ['South African ID / Birth Certificate', 'Grade 11 Report', 'Parent/Guardian income proof (NSFAS)'], dl: 23, comp: 'Medium', value: 'Full tuition + residence + stipend', need: true },
  { id: 'doh', n: 'Dept of Health Cadetship', type: 'Learnership', field: 'Health Sciences', minAPS: 30, subj: { 'Life Sciences': 65 }, docs: ['South African ID / Birth Certificate', 'Grade 11 Report'], dl: 31, comp: 'Medium', value: 'Stipend R4,500/month while studying', need: true },
  { id: 'nsfas', n: 'NSFAS 2027 Applications', type: 'Funding', field: 'Any', minAPS: 0, subj: {}, docs: ['South African ID / Birth Certificate', 'Parent/Guardian income proof (NSFAS)', 'Proof of residence'], dl: 45, comp: 'Low', value: 'Full cost of study at public institutions', need: true },
  { id: 'ujnurs', n: 'UJ BNurs — Application Window', type: 'University', field: 'Health Sciences', minAPS: 28, subj: { 'Life Sciences': 50, 'Mathematics': 50 }, docs: ['South African ID / Birth Certificate', 'Grade 11 Report'], dl: 83, comp: 'High', value: 'Nursing Science degree · NSFAS-eligible', need: false },
  { id: 'sasol', n: 'Sasol Engineering Bursary', type: 'Bursary', field: 'Engineering', minAPS: 34, subj: { 'Mathematics': 70, 'Physical Sciences': 70 }, docs: ['South African ID / Birth Certificate', 'Grade 11 Report'], dl: 12, comp: 'Very High', value: 'Full bursary + vac work + laptop', need: true },
  { id: 'samo', n: 'SA Mathematics Olympiad — Round 2', type: 'Competition', field: 'Any', minAPS: 0, subj: { 'Mathematics': 60 }, docs: [], dl: 9, comp: 'Medium', value: 'National recognition · boosts bursary profile', need: false },
  { id: 'allangray', n: 'Allan Gray Fellowship', type: 'Scholarship', field: 'Any', minAPS: 33, subj: { 'Mathematics': 70 }, docs: ['South African ID / Birth Certificate', 'Grade 11 Report'], dl: 38, comp: 'Very High', value: 'Full scholarship + entrepreneurship development', need: true },
  { id: 'ukznmed', n: 'UKZN B Medical Science', type: 'University', field: 'Health Sciences', minAPS: 30, subj: { 'Life Sciences': 60, 'Mathematics': 60 }, docs: ['South African ID / Birth Certificate', 'Grade 11 Report'], dl: 83, comp: 'High', value: 'Medical Science degree pathway', need: false },
];

export const UNIS = [
  { n: 'University of Johannesburg', course: 'BCom / BA / BEd / Nursing Science', min: 28, max: 32, deadline: '30 Sep 2026', cat: 'uni' },
  { n: 'Tshwane University of Technology', course: 'Dip Nursing / Environmental Health', min: 26, max: 30, deadline: '31 Aug 2026', cat: 'tvet' },
  { n: 'University of Pretoria', course: 'BSc / BNurs', min: 32, max: 36, deadline: '30 Jun 2026', cat: 'uni' },
  { n: 'Wits University', course: 'BHSc / MBBCh (with NBT)', min: 34, max: 42, deadline: '30 Jun 2026', cat: 'uni' },
  { n: 'UKZN', course: 'B Nursing / B Medical Science', min: 30, max: 33, deadline: '30 Sep 2026', cat: 'uni' },
  { n: 'Ekurhuleni East TVET College', course: 'NC(V) Health & Safety / Primary Health', min: 0, max: 0, deadline: 'Open entry — rolling intake', cat: 'tvet' },
  { n: 'South West Gauteng TVET', course: 'NC(V) Education & Development', min: 0, max: 0, deadline: 'Open entry — rolling intake', cat: 'tvet' },
];

export const COMPX = {
  netcare: { apps: 6200, spaces: 220, avg: 29 }, doh: { apps: 4100, spaces: 300, avg: 30 }, nsfas: { apps: 800000, spaces: 500000, avg: 0 },
  ujnurs: { apps: 11400, spaces: 480, avg: 30 }, sasol: { apps: 17400, spaces: 120, avg: 36 }, samo: { apps: 9000, spaces: 1500, avg: 0 },
  allangray: { apps: 8600, spaces: 80, avg: 35 }, ukznmed: { apps: 9800, spaces: 350, avg: 32 }
};

export const PREDICTED = [
  { n: 'Sasol Engineering Bursary — 2028 intake', open: '18 August', conf: 94, hist: 'Opened between 15–20 August for the last 7 years', docs: ['Certified ID copy', 'Latest report', 'Motivation letter'] },
  { n: 'Investec CSI Bursary', open: '2 September', conf: 88, hist: 'Opened first week of September, 5 years running', docs: ['ID', 'Household income proof', 'Transcript'] },
  { n: 'Transnet Engineering Learnership', open: '±25 September', conf: 76, hist: 'Q4 opening pattern since 2022 · watch SOE budget cycle', docs: ['ID', 'Grade 11 report'] },
];

export const FEEDX = [
  { ic: '🚗', n: 'Toyota Graduate Programme', d: 'Engineering & logistics · found on LinkedIn 02:14' },
  { ic: '🏥', n: 'Mediclinic Nursing Bursary', d: 'Quietly posted on corporate site 03:01' },
  { ic: '🧮', n: 'Old Mutual Actuarial Scholarship', d: 'Discovered via university dept page 03:22' },
];

export const TUTORS = [
  { n: 'Lwazi Mthembu', i: 'LM', c: '#1E6B3C', deg: 'BSc Maths (UJ, 2024)', s: 'Mathematics · Grade 10–12', r: 120, stars: 4.9, ses: 214 },
  { n: 'Ayesha Patel', i: 'AP', c: '#2C5F8A', deg: 'BSc Chemistry (Wits, 2023)', s: 'Physical Sciences P2', r: 150, stars: 4.8, ses: 167 },
  { n: 'Karabo Sithole', i: 'KS', c: '#A8862F', deg: 'BCom Accounting (UNISA, 2024)', s: 'Accounting · Grade 11–12', r: 100, stars: 4.7, ses: 98 },
];

export const BAZAAR = [
  { n: 'Handmade beaded bracelets', p: 80, ic: '📿', s: 'Zanele · UJ', bg: '#F6EFD9' },
  { n: 'Organic homemade rusks (jar)', p: 30, ic: '🫙', s: 'Bongi · TUT', bg: '#EFE7DA' },
  { n: 'Custom society T-shirts', p: 150, ic: '👕', s: 'Tumi · Wits', bg: '#E3EEF7' },
  { n: 'Life Sciences Gr12 notes (PDF)', p: 45, ic: '📓', s: 'Naledi · UP', bg: '#E7F2EA' },
  { n: '2nd-hand Maths textbook', p: 60, ic: '📗', s: 'Sello · UKZN', bg: '#E7F2EA' },
  { n: 'Braids & cornrows (on campus)', p: 120, ic: '💇🏾‍♀️', s: 'Palesa · UJ', bg: '#F5E4EA' },
];

export const FUNDS = [
  { k: 'naledi', n: 'Naledi M.', deg: '2nd yr Nursing · UJ', story: 'Passed all 8 modules last semester with a 71% average. R4,400 short on residence fees — verified against her UJ fee statement.', cat: 'Residence', ready: 82 },
  { k: 'kabelo', n: 'Kabelo T.', deg: '1st yr Electrical Eng · TUT', story: 'First in his family at tertiary. Needs textbooks and a semester data bundle. Every document verified in his VAULT.', cat: 'Textbooks & data', ready: 67 },
  { k: 'lerato', n: 'Lerato P.', deg: '3rd yr BEd · UNISA', story: 'Two modules from qualifying as a Foundation Phase teacher. Tuition gap verified by admin.', cat: 'Tuition', ready: 91 },
];

export const CAREERS = [
  { n: 'Medical Doctor', ic: '🩺', aps: '34–42', subj: 'Maths ≥70% · Physical Sci ≥70% · Life Sci ≥70%', sal: 'R650k–R1.4M/yr (specialist more)', unis: 'Wits · UCT · UKZN · UP · SMU · Stellenbosch', fund: 'DoH bursaries · Cuba programme · NSFAS', mentors: 1, demand: 'Critical shortage', note: 'NBT required at most medical schools. Plan the three-tier strategy: Medicine → Nursing/MedSci → Health TVET.' },
  { n: 'Professional Nurse', ic: '💉', aps: '28–32', subj: 'Life Sci ≥60% · Maths or Maths Lit ≥50%', sal: 'R280k–R550k/yr', unis: 'UJ · TUT · UKZN · UWC · Nursing colleges', fund: 'Netcare · DoH · provincial bursaries · NSFAS', mentors: 2, demand: 'High demand', note: 'Your current APS already qualifies — the Opportunity Engine has Netcare at 98/100 for you.' },
  { n: 'Civil / Structural Engineer', ic: '🏗️', aps: '33–38', subj: 'Maths ≥70% · Physical Sci ≥65%', sal: 'R420k–R950k/yr (Pr Eng more)', unis: 'Wits · UP · UJ · TUT · CPUT', fund: 'Sasol · SANRAL · Eskom · mining bursaries', mentors: 1, demand: 'Growing (infrastructure)', note: 'ECSA candidacy after graduating; bursaries often include vac work + guaranteed employment.' },
  { n: 'Chartered Accountant CA(SA)', ic: '🧾', aps: '32–36', subj: 'Maths ≥65% · Accounting recommended', sal: 'R550k–R1.2M/yr post-articles', unis: 'UJ · Wits · UP · UNISA (CTA)', fund: 'SAICA Thuthuka · Big-4 bursaries', mentors: 0, demand: 'Consistently strong', note: 'Thuthuka bursary covers everything — applications open early, watch the Opportunity Calendar.' },
  { n: 'Foundation Phase Teacher', ic: '🍎', aps: '26–30', subj: 'English ≥50% · any two languages help', sal: 'R230k–R480k/yr', unis: 'UNISA · UJ · NWU · CPUT', fund: 'Funza Lushaka (full bursary + placement)', mentors: 1, demand: 'High (esp. African languages)', note: 'Funza Lushaka guarantees a teaching post — one of the safest funded pathways in SA.' },
];

export const LVL = (p: number) => p >= 80 ? 7 : p >= 70 ? 6 : p >= 60 ? 5 : p >= 50 ? 4 : p >= 40 ? 3 : p >= 30 ? 2 : 1;

export const calcAPS = (marks: Record<string, number>) => 
  Object.entries(marks)
    .filter(([k]) => k !== 'Life Orientation')
    .map(([, v]) => LVL(v))
    .sort((a, b) => b - a)
    .slice(0, 6)
    .reduce((a, b) => a + b, 0);

export const DAY = 86400000;

export const today = () => { 
  const d = new Date(); 
  d.setHours(0, 0, 0, 0); 
  return d.getTime(); 
};

export function evalOpp(o: any, marks: any, career: string, docs: any[]) {
  const aps = calcAPS(marks);
  const checks: any[] = [];
  
  if (o.minAPS > 0) checks.push({ lab: 'APS ≥ ' + o.minAPS, ok: aps >= o.minAPS, gap: aps < o.minAPS ? ('APS +' + (o.minAPS - aps) + ' point' + (o.minAPS - aps > 1 ? 's' : '')) : null });
  
  Object.entries(o.subj).forEach(([s, m]) => { 
    const reqM = m as number;
    const have = marks[s] ?? 0; 
    checks.push({ lab: s + ' ≥ ' + reqM + '%', ok: have >= reqM, gap: have < reqM ? (s + ' +' + (reqM - have) + '%') : null }); 
  });
  
  checks.push({ lab: 'SA citizen', ok: true });
  
  if (o.field !== 'Any') checks.push({ lab: 'Career field: ' + o.field, ok: o.field === career });
  
  const missingDocs = o.docs.filter((d: string) => { const doc = docs.find(x => x.n === d); return doc && !doc.ok; });
  const met = checks.filter(c => c.ok).length;
  const elig = met / checks.length;
  const careerF = o.field === 'Any' ? 0.8 : (o.field === career ? 1 : 0.15);
  const acad = Math.min(1, aps / Math.max(1, o.minAPS || 24));
  const needF = o.need ? 1 : 0.6;
  const compF = { 'Low': 1, 'Medium': .75, 'High': .55, 'Very High': .35 }[o.comp as string] ?? 0.5;
  const dlF = o.dl <= 14 ? 1 : o.dl <= 30 ? .8 : .6;
  
  const score = Math.round(100 * (elig * .40 + careerF * .20 + Math.min(acad, 1) * .15 + needF * .10 + .05 + compF * .05 + dlF * .05));
  const gaps = checks.filter(c => c.gap).map(c => c.gap);
  const margin = o.minAPS > 0 ? Math.max(0, Math.min(1, (aps - o.minAPS) / 6)) : 0.7;
  const success = Math.round(100 * (0.45 * elig + 0.25 * margin + 0.20 * compF + 0.10 * careerF));
  
  return { checks, elig, score, gaps, missingDocs, success, chance: elig >= 1 ? (compF >= .7 ? 'High' : 'Moderate') : (elig >= .75 ? 'Moderate' : 'Low') };
}
