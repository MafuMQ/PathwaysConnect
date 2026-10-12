import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '@/contexts/DashboardContext';
import { SPARK, OPPS } from '@/data/dashboardData';
import { evalOpp, calcAPS } from '@/data/dashboardData';
import { Card, Eyebrow, Title, Sub, Pill, Btn } from '@/components/dashboard/ui/DashboardUI';
import { Target, Star, Sparkles, Flame, FolderArchive, Users, ArrowRight } from 'lucide-react';

const Home = () => {
  const { S, sparkI, newSpark, showToast } = useDashboard();
  const navigate = useNavigate();

  const sparkList = SPARK[S.faith as keyof typeof SPARK] || SPARK.None;
  const aps = calcAPS(S.marks);
  const evald = OPPS.map(o => ({ o, e: evalOpp(o, S.marks, S.career, S.docs) })).sort((a, b) => b.e.score - a.e.score);
  const top = evald[0];
  const qual = evald.filter(x => x.e.elig >= 1).length;
  const missingDocs = S.docs.filter(d => !d.ok);

  return (
    <div className="p-4 pb-24">
      <Title>Hello{S.name ? `, ${S.name}` : ''}!</Title>
      <Sub className="mb-4">{new Date().toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' })} · Learner account</Sub>
      
      <Card className="bg-gradient-to-br from-[#153252] to-[#1A3A5C] text-white border-[#C9A84C]/50 cursor-pointer" onClick={() => navigate('/app/opps')}>
        <div>
          <Eyebrow className="text-[#C9A84C] flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" /> Opportunity Engine™
          </Eyebrow>
          {top ? (
            <>
              <p className="font-['Playfair_Display'] text-[15.5px] font-bold leading-tight my-1">
                Found <span className="text-[#C9A84C]">{OPPS.length}</span> opportunities — you qualify for <span className="text-[#C9A84C]">{qual}</span>.
              </p>
              <div className="flex justify-between items-center mt-2">
                <Pill color="gold" className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#A8862F] inline" /> Top: {top.o.n}
                </Pill>
                {top.o.dl ? <span className="text-xs text-[#F3C98B]">closes in {top.o.dl}d →</span> : null}
              </div>
            </>
          ) : (
            <p className="font-['Playfair_Display'] text-[15.5px] font-bold leading-tight my-1">
              No active opportunities listed yet. Verified opportunities will appear here as they open.
            </p>
          )}
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-[#10263D] to-[#1A3A5C] text-white border-none relative overflow-hidden">
        <Eyebrow className="text-[#C9A84C] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Spark · Daily Fuel
        </Eyebrow>
        <p className="font-['Playfair_Display'] italic text-base my-2 relative z-10">{sparkList[sparkI]?.[0] || 'Perpetuate toward your goal.'}</p>
        <p className="text-xs text-[#C9A84C] font-bold">— {sparkList[sparkI]?.[1] || 'PathwaysConnect'}</p>
        <div className="flex gap-2 mt-3">
          <Btn size="sm" color="gold" onClick={newSpark}>New message</Btn>
          <Btn size="sm" className="bg-white/15 text-white" onClick={() => showToast('Shared to your societies')}>Share</Btn>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-white border border-[#E4E0D4] rounded-2xl p-3 text-center">
          <div className="font-bold text-lg text-[#1A3A5C] flex items-center justify-center gap-1">
            <span>{S.streak}</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-[10px] text-[#6B7688] font-bold uppercase">Streak</div>
        </div>
        <div className="bg-white border border-[#E4E0D4] rounded-2xl p-3 text-center">
          <div className="font-bold text-lg text-[#1A3A5C]">{aps}</div>
          <div className="text-[10px] text-[#6B7688] font-bold uppercase">APS score</div>
        </div>
        <div className="bg-white border border-[#E4E0D4] rounded-2xl p-3 text-center">
          <div className="font-bold text-lg text-[#1A3A5C]">—</div>
          <div className="text-[10px] text-[#6B7688] font-bold uppercase">Exam ready</div>
        </div>
      </div>

      <Card>
        <Eyebrow>What needs you today</Eyebrow>
        <div className="flex gap-3 py-3 border-b border-[#E4E0D4] cursor-pointer" onClick={() => navigate('/app/study', { state: { tab: 'vault' } })}>
          <div className="w-9 h-9 rounded-xl bg-[#F6EFD9] flex items-center justify-center text-[#1A3A5C] shrink-0">
            <FolderArchive className="w-5 h-5 text-[#A8862F]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[13.5px] text-[#1A3A5C]">
              {missingDocs.length > 0 ? `${missingDocs.length} document${missingDocs.length > 1 ? 's' : ''} pending in VAULT` : 'All documents uploaded in VAULT'}
            </div>
            <div className="text-xs text-[#6B7688]">
              {missingDocs.length > 0 ? `Upload ${missingDocs.slice(0, 2).map(d => d.n).join(', ')} to boost your verified profile.` : 'Your document vault is complete and ready for applications.'}
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#8FA5BB] self-center shrink-0" />
        </div>

        <div className="flex gap-3 py-3 border-b border-[#E4E0D4] cursor-pointer" onClick={() => navigate('/app/connect')}>
          <div className="w-9 h-9 rounded-xl bg-[#E7F2EA] flex items-center justify-center text-[#1E6B3C] shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[13.5px] text-[#1A3A5C]">
              {S.matches.length > 0 ? `${S.matches.length} mentor match${S.matches.length > 1 ? 'es' : ''}` : 'Find your mentor match'}
            </div>
            <div className="text-xs text-[#6B7688]">
              {S.matches.length > 0 ? 'Chat with your connected mentors in Connect.' : 'Explore student mentors ready to guide your tertiary journey.'}
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#8FA5BB] self-center shrink-0" />
        </div>

        <div className="flex gap-3 py-3 cursor-pointer" onClick={() => navigate('/app/opps')}>
          <div className="w-9 h-9 rounded-xl bg-[#FBEEDB] flex items-center justify-center text-[#B7791F] shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[13.5px] text-[#1A3A5C]">Opportunity Intelligence</div>
            <div className="text-xs text-[#6B7688]">Track applications, closing deadlines, and eligibility criteria.</div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#8FA5BB] self-center shrink-0" />
        </div>
      </Card>
    </div>
  );
};

export default Home;
