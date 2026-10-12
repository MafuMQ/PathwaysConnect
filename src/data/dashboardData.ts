export const SPARK = {
  Christianity: [["“I can do all things through Christ who strengthens me.”","Philippians 4:13"],["“For I know the plans I have for you… plans to give you hope and a future.”","Jeremiah 29:11"],["“Commit your work to the Lord, and your plans will be established.”","Proverbs 16:3"]],
  Islam: [["“Indeed, with hardship comes ease.”","Qur'an 94:6"],["“And whoever puts their trust in Allah, He will be enough for them.”","Qur'an 65:3"]],
  Hinduism: [["“You have the right to work, but never to the fruit of work — act without attachment.”","Bhagavad Gita 2:47"],["“The mind is everything. What you think, you become.”","Vedic wisdom"]],
  Judaism: [["“Be strong and courageous… for the Lord your God goes with you.”","Deuteronomy 31:6"],["“Who is wise? One who learns from every person.”","Pirkei Avot 4:1"]],
  Buddhism: [["“To keep the body in good health is a duty — otherwise we cannot keep our mind strong and clear.”","The Dhammapada"],["“Drop by drop is the water pot filled.”","Dhammapada 122"]],
  Ubuntu: [["“Umuntu ngumuntu ngabantu — I am because we are.”","Ubuntu philosophy"],["“If you want to go fast, go alone. If you want to go far, go together.”","African proverb"]],
  None: [["“It always seems impossible until it is done.”","Nelson Mandela"],["“Never veer from your cause. Perpetuate toward the fixed end goal regardless of the odds.”","Jernuambo philosophy"],["“You may not control all the events that happen to you, but you can decide not to be reduced by them.”","Maya Angelou"]]
};

export interface Mentor {
  n: string;
  i: string;
  c: string;
  inst: string;
  deg: string;
  pct: number;
  langs: string;
  subj: string[];
  bio: string;
  rating: number;
}

export interface Opportunity {
  id: string;
  n: string;
  type: string;
  field: string;
  minAPS: number;
  subj: Record<string, number>;
  docs: string[];
  dl: number;
  comp: string;
  value: string;
  need: boolean;
}

export interface UniversityOption {
  n: string;
  course: string;
  min: number;
  max: number;
  deadline: string;
  cat: string;
}

export interface CareerInfo {
  n: string;
  ic: string;
  aps: string;
  subj: string;
  sal: string;
  unis: string;
  fund: string;
  mentors: number;
  demand: string;
  note: string;
}

export const MENTORS: Mentor[] = [];

export const OPPS: Opportunity[] = [];

export const UNIS: UniversityOption[] = [];

export const COMPX: Record<string, { apps: number; spaces: number; avg: number }> = {};

export const PREDICTED: { n: string; open: string; conf: number; hist: string; docs: string[] }[] = [];

export const FEEDX: { ic: string; n: string; d: string }[] = [];



export const CAREERS: CareerInfo[] = [];

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
  if (!o) return { checks: [], elig: 0, score: 0, gaps: [], missingDocs: [], success: 0, chance: 'Low' };
  const aps = calcAPS(marks);
  const checks: any[] = [];
  
  if (o.minAPS > 0) checks.push({ lab: 'APS ≥ ' + o.minAPS, ok: aps >= o.minAPS, gap: aps < o.minAPS ? ('APS +' + (o.minAPS - aps) + ' point' + (o.minAPS - aps > 1 ? 's' : '')) : null });
  
  if (o.subj) {
    Object.entries(o.subj).forEach(([s, m]) => { 
      const reqM = m as number;
      const have = marks[s] ?? 0; 
      checks.push({ lab: s + ' ≥ ' + reqM + '%', ok: have >= reqM, gap: have < reqM ? (s + ' +' + (reqM - have) + '%') : null }); 
    });
  }
  
  checks.push({ lab: 'SA citizen', ok: true });
  
  if (o.field !== 'Any') checks.push({ lab: 'Career field: ' + o.field, ok: o.field === career });
  
  const missingDocs = (o.docs || []).filter((d: string) => { const doc = (docs || []).find(x => x.n === d); return doc && !doc.ok; });
  const met = checks.filter(c => c.ok).length;
  const elig = checks.length > 0 ? met / checks.length : 0;
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
