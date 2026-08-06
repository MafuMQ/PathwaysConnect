import React, { createContext, useContext, useState, useEffect } from 'react';
import { MENTORS, BAZAAR, TUTORS, SPARK } from '../data/dashboardData';
import { useAuth } from './AuthContext';

interface DashboardState {
  name: string;
  role: string;
  faith: string;
  career: string;
  coins: number;
  streak: number;
  aps: number | null;
  ready: number | null;
  marks: Record<string, number>;
  docs: any[];
  matches: any[];
  deckIdx: number;
  tx: { t: string; v: number }[];
  applied: Record<string, boolean>;
  answered: number;
  correct: number;
  mistakes: any[];
}

interface DashboardContextType {
  S: DashboardState;
  setS: React.Dispatch<React.SetStateAction<DashboardState>>;
  modal: { title: string; content: React.ReactNode } | null;
  setModal: React.Dispatch<React.SetStateAction<{ title: string; content: React.ReactNode } | null>>;
  toast: string;
  showToast: (msg: string) => void;
  updateCoins: (v: number, label: string) => void;
  handleOnboard: (name: string, role: string, faith: string) => void;
  newSpark: () => void;
  sparkI: number;
  swipe: (like: boolean, navigateToVault: () => void) => void;
  applyOpp: (id: string) => void;
  donate: () => void;
  buyItem: (i: number) => void;
  bookTutor: (i: number) => void;
  uploadDoc: (i: number) => Promise<void>;
  deleteDoc: (i: number) => Promise<void>;
  updateMark: (subject: string, score: number) => Promise<void>;
  deleteMark: (subject: string) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const DEFAULT_MARKS: Record<string, number> = {};
const DEFAULT_DOCS = [
  { n: 'South African ID / Birth Certificate', ok: false, d: 'Required for all applications' },
  { n: 'Grade 11 Report', ok: false, d: 'APS trigger active' },
  { n: 'Grade 12 Report', ok: false, d: 'Required for university admission' },
  { n: 'Parent/Guardian income proof (NSFAS)', ok: false, d: 'Required for funding' },
  { n: 'Matric Results (NSC)', ok: false, d: 'Unlocks after results day' },
  { n: 'Proof of residence', ok: false, d: 'Needed for NSFAS & some bursaries' },
];

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [S, setS] = useState<DashboardState>({
    name: '', role: 'Learner', faith: 'Christianity', career: 'Health Sciences',
    coins: 120, streak: 1, aps: null, ready: null,
    marks: DEFAULT_MARKS,
    docs: DEFAULT_DOCS,
    matches: [], deckIdx: 0,
    tx: [{ t: 'Welcome bonus — verified registration', v: 100 }, { t: 'Referred a new verified user', v: 20 }],
    applied: {}, answered: 0, correct: 0, mistakes: []
  });

  const { user, updateProfile } = useAuth();

  useEffect(() => {
    if (user) {
      setS(prev => ({
        ...prev,
        name: user.name || prev.name,
        role: user.role || prev.role,
        marks: user.marks !== undefined ? user.marks : DEFAULT_MARKS,
        docs: user.docs !== undefined ? user.docs : DEFAULT_DOCS
      }));
    }
  }, [user?.id]);

  const [modal, setModal] = useState<{ title: string; content: React.ReactNode } | null>(null);
  const [toast, setToast] = useState('');
  const [toastId, setToastId] = useState<NodeJS.Timeout | null>(null);
  const [sparkI, setSparkI] = useState(0);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastId) clearTimeout(toastId);
    setToastId(setTimeout(() => setToast(''), 2600));
  };

  const updateCoins = (v: number, label: string) => {
    setS(prev => ({ ...prev, coins: prev.coins + v, tx: [{ t: label, v }, ...prev.tx] }));
    showToast(`${v > 0 ? '+' : ''}${v} PathwayCoin · ${label}`);
  };

  const handleOnboard = (name: string, role: string, faith: string) => {
    setS(prev => ({ ...prev, name: name || 'Sipho', role, faith }));
    showToast(`Welcome to PathwaysConnect, ${name || 'Sipho'} — you are verified ✅`);
  };

  const newSpark = () => {
    const list = SPARK[S.faith as keyof typeof SPARK] || SPARK.None;
    setSparkI(prev => (prev + 1) % list.length);
  };

  const swipe = (like: boolean, navigateToVault: () => void) => {
    if (S.deckIdx >= MENTORS.length) return;
    const m = MENTORS[S.deckIdx];
    setS(prev => ({ ...prev, deckIdx: prev.deckIdx + 1, matches: like ? [...prev.matches, m] : prev.matches }));
    if (like) {
      setModal({
        title: "It's a match!",
        content: (
          <div className="text-center">
            <div className="text-4xl mb-2">🎉</div>
            <div className="font-['Playfair_Display'] font-bold text-xl text-[#1A3A5C]">{m.n} accepted your request.</div>
            <div className="text-sm text-[#6B7688] my-3">A shared VAULT space has been created — your document checklist is already inside.</div>
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4" style={{ background: m.c }}>{m.i}</div>
            <button className="w-full bg-[#1E6B3C] text-white font-bold py-3 rounded-xl mb-2" onClick={() => { setModal(null); navigateToVault(); }}>Open our shared VAULT</button>
            <button className="w-full bg-white border border-[#E4E0D4] text-[#1A3A5C] font-bold py-3 rounded-xl" onClick={() => setModal(null)}>Keep swiping</button>
          </div>
        )
      });
    }
  };

  const applyOpp = (id: string) => {
    setS(prev => ({ ...prev, applied: { ...prev.applied, [id]: true } }));
    setModal(null);
    updateCoins(5, 'Application submitted 🎯');
    showToast('Submitted & tracked: Found → Matched → Submitted ▸ Interview ▸ Offer');
  };

  const donate = () => {
    if (S.coins < 50) return showToast('Not enough PathwayCoin — top up in your wallet');
    updateCoins(-50, 'Fund a Future donation');
    showToast('Matched by Standard Bank! 90% student · 5% Food Bank · 5% platform · 18A emailed 📧');
  };

  const buyItem = (i: number) => {
    const b = BAZAAR[i];
    if (S.coins < b.p) return showToast('Not enough PathwayCoin');
    updateCoins(-b.p, 'Bazaar · ' + b.n);
  };

  const bookTutor = (i: number) => {
    const t = TUTORS[i];
    if (S.coins < t.r) return showToast('Not enough PathwayCoin');
    updateCoins(-t.r, 'Cubicle session · ' + t.n);
    showToast(`Booked! ${t.n} earns ${Math.round(t.r * .88)} PC instantly`);
  };

  const uploadDoc = async (i: number) => {
    const newDocs = [...S.docs];
    newDocs[i] = { ...newDocs[i], ok: true, d: 'Uploaded just now · verified queue' };
    setS(prev => ({ ...prev, docs: newDocs }));
    if (user) {
      await updateProfile({ docs: newDocs });
    }
    showToast('Uploaded & encrypted 🔒 Opportunity scores recalculated');
  };

  const deleteDoc = async (i: number) => {
    const newDocs = [...S.docs];
    if (DEFAULT_DOCS[i]) {
      newDocs[i] = DEFAULT_DOCS[i];
    } else {
      newDocs[i] = { ...newDocs[i], ok: false, d: 'Removed' };
    }
    setS(prev => ({ ...prev, docs: newDocs }));
    if (user) {
      await updateProfile({ docs: newDocs });
    }
    showToast('Document removed 🗑️');
  };

  const updateMark = async (subject: string, score: number) => {
    const newMarks = { ...S.marks, [subject]: score };
    setS(prev => ({ ...prev, marks: newMarks }));
    if (user) {
      await updateProfile({ marks: newMarks });
    }
  };

  const deleteMark = async (subject: string) => {
    const newMarks = { ...S.marks };
    delete newMarks[subject];
    setS(prev => ({ ...prev, marks: newMarks }));
    if (user) {
      await updateProfile({ marks: newMarks });
    }
  };

  return (
    <DashboardContext.Provider value={{
      S, setS, modal, setModal, toast, showToast, updateCoins, handleOnboard, newSpark, sparkI, swipe, applyOpp, donate, buyItem, bookTutor, uploadDoc, deleteDoc, updateMark, deleteMark
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
