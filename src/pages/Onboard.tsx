import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '@/contexts/DashboardContext';
import { useAuth } from '@/contexts/AuthContext';
import { Btn } from '@/components/dashboard/ui/DashboardUI';
import { LOGO_SRC } from '@/data/landingData';
import { Lock } from 'lucide-react';

const Onboard = () => {
  const { S, setS, handleOnboard } = useDashboard();
  const { updateProfile } = useAuth();
  const navigate = useNavigate();

  const onEnter = async () => {
    handleOnboard(S.name, 'Learner', S.faith);
    
    try {
      await updateProfile({ name: S.name, role: 'learner' });
      navigate('/app');
    } catch (error) {
      console.error("Failed to save profile", error);
      navigate('/app');
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-[#10263D] via-[#1A3A5C] to-[#274E77] text-white min-h-screen flex flex-col justify-center">
      <img src={LOGO_SRC} alt="Logo" className="w-28 mx-auto drop-shadow-lg" />
      <h1 className="font-['Playfair_Display'] font-bold text-2xl text-center mt-4">Bridging Potential to Opportunity</h1>
      <p className="text-[10.5px] tracking-[2.5px] text-[#C9A84C] font-bold text-center mt-1">PATHWAYSCONNECT · LEARNER PORTAL · ZERO LEARNERS LEFT BEHIND</p>
      
      <div className="mt-6">
        <label className="text-[11px] font-bold tracking-wide text-[#B9CBDD]">What is your first name?</label>
        <input 
          className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/25 text-white placeholder-[#8FA5BB] outline-none" 
          placeholder="e.g. Sipho" 
          value={S.name} 
          onChange={e => setS({ ...S, name: e.target.value })} 
        />
      </div>

      <div className="mt-4">
        <label className="text-[11px] font-bold tracking-wide text-[#B9CBDD]">My daily SPARK feed (private)</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {['Christianity', 'Islam', 'Hinduism', 'Judaism', 'Buddhism', 'Ubuntu', 'None'].map(f => (
            <button 
              key={f} 
              onClick={() => setS({ ...S, faith: f })}
              className={`p-3 rounded-xl border text-xs font-bold transition ${S.faith === f ? 'bg-[#C9A84C] text-[#10263D] border-[#C9A84C]' : 'bg-white/5 border-white/20 text-[#DCE7F1]'}`}
            >{f}</button>
          ))}
        </div>
      </div>

      <Btn color="gold" block className="mt-6" onClick={onEnter}>Enter PathwaysConnect →</Btn>
      <p className="text-[11.5px] text-[#9FB4C9] text-center mt-4 leading-relaxed flex items-center justify-center gap-1.5">
        <Lock className="w-3.5 h-3.5 inline" /> Verified community · POPIA compliant · Under-18 accounts require parent/guardian consent.
      </p>
    </div>
  );
};

export default Onboard;
