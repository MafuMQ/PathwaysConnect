import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '@/contexts/DashboardContext';
import { MENTORS, Mentor } from '@/data/dashboardData';
import { Card, Eyebrow, Title, Sub, Pill, Btn } from '@/components/dashboard/ui/DashboardUI';
import { Users, UserPlus, UserCheck, MessageSquare, Star, BadgeCheck, GraduationCap, Search, Sparkles } from 'lucide-react';

const Connect = () => {
  const { S, setS, showToast } = useDashboard();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'matches'>('all');
  const [search, setSearch] = useState('');

  const toggleConnect = (m: Mentor) => {
    const isConnected = S.matches.some(match => match.n === m.n);
    if (isConnected) {
      setS(prev => ({
        ...prev,
        matches: prev.matches.filter(match => match.n !== m.n)
      }));
      showToast(`Disconnected from ${m.n}`);
    } else {
      setS(prev => ({
        ...prev,
        matches: [...prev.matches, m]
      }));
      showToast(`Connected with ${m.n} — shared Vault opened`);
    }
  };

  const filteredMentors = MENTORS.filter(m => 
    m.n.toLowerCase().includes(search.toLowerCase()) ||
    m.deg.toLowerCase().includes(search.toLowerCase()) ||
    m.inst.toLowerCase().includes(search.toLowerCase()) ||
    m.subj?.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-4 pb-24 space-y-4">
      <div>
        <Eyebrow>Connect · Mentors & Tertiary Network</Eyebrow>
        <Title>Connect with Mentors</Title>
        <Sub>
          Browse and connect with student mentors, tutors, and peers to guide your tertiary admissions, subject choices, and career journey.
        </Sub>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <button 
            onClick={() => setActiveTab('all')} 
            className={`shrink-0 border rounded-full py-1.5 px-3.5 text-[11.5px] font-bold tracking-wide transition-colors ${
              activeTab === 'all' 
                ? 'bg-[#1A3A5C] text-white border-[#1A3A5C]' 
                : 'bg-white border-[#E4E0D4] text-[#6B7688] hover:border-[#1A3A5C]/40'
            }`}
          >
            All Mentors ({MENTORS.length})
          </button>
          <button 
            onClick={() => setActiveTab('matches')} 
            className={`shrink-0 border rounded-full py-1.5 px-3.5 text-[11.5px] font-bold tracking-wide transition-colors ${
              activeTab === 'matches' 
                ? 'bg-[#1A3A5C] text-white border-[#1A3A5C]' 
                : 'bg-white border-[#E4E0D4] text-[#6B7688] hover:border-[#1A3A5C]/40'
            }`}
          >
            My Connections ({S.matches.length})
          </button>
        </div>

        {activeTab === 'all' && MENTORS.length > 0 && (
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8FA5BB]" />
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search mentors or subjects..."
              className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-full border border-[#E4E0D4] bg-white outline-none focus:border-[#C9A84C]"
            />
          </div>
        )}
      </div>

      {/* Directory Tab */}
      {activeTab === 'all' && (
        <div>
          {filteredMentors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMentors.map(m => {
                const isConnected = S.matches.some(match => match.n === m.n);
                return (
                  <Card key={m.n} className="flex flex-col justify-between hover:border-[#C9A84C]/50 transition-colors">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0" 
                            style={{ background: m.c || 'linear-gradient(135deg, #10263D, #1A3A5C)' }}
                          >
                            {m.i || m.n.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <b className="font-['Playfair_Display'] text-base text-[#1A3A5C]">{m.n}</b>
                              <BadgeCheck className="w-4 h-4 text-[#1E6B3C]" title="Verified Mentor" />
                            </div>
                            <div className="text-xs text-[#6B7688] flex items-center gap-1 mt-0.5">
                              <GraduationCap className="w-3.5 h-3.5" />
                              <span>{m.deg}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <Pill color="green">{m.pct}% match</Pill>
                          <div className="text-[11px] text-[#6B7688] flex items-center justify-end gap-1 mt-1 font-semibold">
                            <Star className="w-3 h-3 fill-[#C9A84C] text-[#C9A84C]" />
                            <span>{m.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-[#6B7688] mb-2 font-medium">
                        {m.inst} {m.langs ? `· ${m.langs}` : ''}
                      </div>

                      <p className="text-[13px] text-[#1A3A5C] leading-snug mb-3">
                        {m.bio}
                      </p>

                      {m.subj && m.subj.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {m.subj.map(s => (
                            <span key={s} className="bg-[#E7F2EA] text-[#1E6B3C] border border-[#C6E0CE] rounded-md px-2 py-0.5 text-[10.5px] font-bold">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#E4E0D4] flex items-center justify-between gap-2 mt-auto">
                      <button 
                        onClick={() => toggleConnect(m)} 
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          isConnected 
                            ? 'bg-[#E7F2EA] text-[#1E6B3C] border border-[#C6E0CE]' 
                            : 'bg-[#1A3A5C] text-white hover:bg-[#10263D]'
                        }`}
                      >
                        {isConnected ? (
                          <>
                            <UserCheck className="w-3.5 h-3.5" /> Connected
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-3.5 h-3.5" /> Connect
                          </>
                        )}
                      </button>

                      {isConnected && (
                        <Btn 
                          size="sm" 
                          color="ghost" 
                          onClick={() => navigate('/app/academic-record', { state: { tab: 'vault' } })}
                          className="shrink-0"
                        >
                          <MessageSquare className="w-3.5 h-3.5" /> Vault Chat
                        </Btn>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="text-center py-12">
              <Users className="w-12 h-12 text-[#8FA5BB] mx-auto mb-2" />
              <b className="font-['Playfair_Display'] text-base text-[#1A3A5C] block">
                {search ? 'No mentors match your search' : 'No mentors currently listed'}
              </b>
              <p className="text-xs text-[#6B7688] max-w-md mx-auto mt-1.5 mb-4">
                {search 
                  ? 'Try searching with different subject keywords or clear your query.' 
                  : 'Registered student mentors from tertiary institutions will appear here as they register on the platform.'}
              </p>
              <Btn size="sm" color="navy" onClick={() => showToast('Request sent to coordinator')}>
                Request a manual match
              </Btn>
            </Card>
          )}
        </div>
      )}

      {/* My Connections Tab */}
      {activeTab === 'matches' && (
        <div>
          {S.matches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {S.matches.map(m => (
                <Card key={m.n} className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0" 
                          style={{ background: m.c || 'linear-gradient(135deg, #10263D, #1A3A5C)' }}
                        >
                          {m.i || m.n.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <b className="font-['Playfair_Display'] text-base text-[#1A3A5C]">{m.n}</b>
                            <BadgeCheck className="w-4 h-4 text-[#1E6B3C]" />
                          </div>
                          <div className="text-xs text-[#6B7688] mt-0.5">{m.inst}</div>
                        </div>
                      </div>
                      <Pill color="green">Connected</Pill>
                    </div>

                    <p className="text-xs text-[#1A3A5C] my-2 leading-relaxed">
                      {m.deg} · {m.bio || 'Available for tertiary guidance and subject mentorship.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E4E0D4] flex items-center justify-between gap-2 mt-auto">
                    <Btn 
                      size="sm" 
                      color="navy" 
                      className="flex-1"
                      onClick={() => navigate('/app/academic-record', { state: { tab: 'vault' } })}
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> Open Shared Vault
                    </Btn>
                    <Btn 
                      size="sm" 
                      color="ghost" 
                      onClick={() => toggleConnect(m)}
                    >
                      Disconnect
                    </Btn>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <Users className="w-12 h-12 text-[#8FA5BB] mx-auto mb-2" />
              <b className="font-['Playfair_Display'] text-base text-[#1A3A5C] block">No active connections yet</b>
              <p className="text-xs text-[#6B7688] max-w-md mx-auto mt-1.5 mb-4">
                You haven't connected with any student mentors yet. Browse the mentor directory to request connections.
              </p>
              <Btn size="sm" color="navy" onClick={() => setActiveTab('all')}>
                Explore Mentor Directory →
              </Btn>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Connect;
