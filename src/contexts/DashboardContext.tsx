import React, { createContext, useContext, useState, useEffect } from 'react';
import { MENTORS, SPARK } from '../data/dashboardData';
import { useAuth } from './AuthContext';
import { Check } from 'lucide-react';

interface DashboardState {
  name: string;
  role: string;
  faith: string;
  career: string;
  streak: number;
  aps: number | null;
  ready: number | null;
  marks: Record<string, number>;
  docs: any[];
  matches: any[];
  deckIdx: number;
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
  handleOnboard: (name: string, role: string, faith: string) => void;
  newSpark: () => void;
  sparkI: number;
  swipe: (like: boolean, navigateToVault: () => void) => void;
  applyOpp: (id: string) => void;
  uploadDoc: (i: number) => Promise<void>;
  deleteDoc: (i: number) => Promise<void>;
  updateMark: (subject: string, score: number) => Promise<void>;
  deleteMark: (subject: string) => Promise<void>;
  applyScannedResults: (newMarks: Record<string, number>, docToSave?: { name: string; url?: string }) => Promise<void>;
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
    name: '', role: 'Learner', faith: 'None', career: '',
    streak: 0, aps: null, ready: null,
    marks: DEFAULT_MARKS,
    docs: DEFAULT_DOCS,
    matches: [], deckIdx: 0,
    applied: {}, answered: 0, correct: 0, mistakes: []
  });

  const { user, updateProfile } = useAuth();

  useEffect(() => {
    if (user) {
      setS(prev => ({
        ...prev,
        name: user.name || prev.name,
        role: 'Learner',
        marks: user.marks !== undefined ? user.marks : DEFAULT_MARKS,
        docs: user.docs !== undefined ? user.docs : DEFAULT_DOCS
      }));
    }
  }, [user]);

  const [modal, setModal] = useState<{ title: string; content: React.ReactNode } | null>(null);
  const [toast, setToast] = useState('');
  const [toastId, setToastId] = useState<NodeJS.Timeout | null>(null);
  const [sparkI, setSparkI] = useState(0);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastId) clearTimeout(toastId);
    setToastId(setTimeout(() => setToast(''), 2600));
  };

  const handleOnboard = (name: string, _role: string, faith: string) => {
    const displayName = name || user?.name || '';
    setS(prev => ({ ...prev, name: displayName, role: 'Learner', faith }));
    showToast(`Welcome to PathwaysConnect${displayName ? ', ' + displayName : ''} — you are verified`);
  };

  const newSpark = () => {
    const list = SPARK[S.faith as keyof typeof SPARK] || SPARK.None;
    setSparkI(prev => (prev + 1) % list.length);
  };

  const swipe = (like: boolean, navigateToVault: () => void) => {
    if (S.deckIdx >= MENTORS.length || !MENTORS[S.deckIdx]) return;
    const m = MENTORS[S.deckIdx];
    setS(prev => ({ ...prev, deckIdx: prev.deckIdx + 1, matches: like ? [...prev.matches, m] : prev.matches }));
    if (like) {
      setModal({
        title: "It's a match!",
        content: (
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#E7F2EA] text-[#1E6B3C] flex items-center justify-center mx-auto mb-2 font-bold text-xl">
              <Check className="w-6 h-6" />
            </div>
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
    showToast('Application submitted & tracked');
  };

  const uploadDoc = async (i: number) => {
    const newDocs = [...S.docs];
    newDocs[i] = { ...newDocs[i], ok: true, d: 'Uploaded just now · verified queue' };
    setS(prev => ({ ...prev, docs: newDocs }));
    if (user) {
      await updateProfile({ docs: newDocs });
    }
    showToast('Uploaded & encrypted. Opportunity scores recalculated');
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
    showToast('Document removed');
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

  const applyScannedResults = async (
    newMarks: Record<string, number>, 
    docToSave?: { name: string; url?: string }
  ) => {
    // Completely override existing marks with newly scanned marks
    const finalMarks = { ...newMarks };
    const newDocs = [...S.docs];
    if (docToSave) {
      newDocs.unshift({
        n: docToSave.name || 'Scanned Academic Document',
        ok: true,
        d: `Uploaded via AI Scanner · ${new Date().toLocaleDateString('en-ZA')}`,
        url: docToSave.url
      });
    }
    setS(prev => ({ ...prev, marks: finalMarks, docs: newDocs }));
    if (user) {
      await updateProfile({ marks: finalMarks, docs: newDocs });
    }
    showToast('Academic marks and document updated!');
  };

  return (
    <DashboardContext.Provider value={{
      S, setS, modal, setModal, toast, showToast, handleOnboard, newSpark, sparkI, swipe, applyOpp, uploadDoc, deleteDoc, updateMark, deleteMark, applyScannedResults
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
