import React, { useState } from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useDashboard } from '@/contexts/DashboardContext';
import { UNIS, calcAPS, LVL } from '@/data/dashboardData';
import { Card, Eyebrow, Title, Sub, Btn } from '@/components/dashboard/ui/DashboardUI';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Upload, Trash2, X } from "lucide-react";

const VALID_SUBJECTS = [
  'Mathematics', 'Mathematical Literacy', 'English HL', 'English FAL', 
  'Afrikaans HL', 'Afrikaans FAL', 'Life Sciences', 'Physical Sciences', 
  'Accounting', 'Business Studies', 'Economics', 'Geography', 'History', 
  'Life Orientation', 'Tourism', 'Consumer Studies', 'Information Technology', 
  'Computer Applications Technology'
];

const roleLabels: Record<UserRole, string> = {
  learner: "Learner",
  student_mentor: "Student Mentor",
  graduate_tutor: "Graduate Tutor",
  educator_admin: "Educator / Admin",
  donor_corporate: "Donor / Corporate",
};

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { S, setS, uploadDoc, deleteDoc, updateMark, deleteMark, showToast } = useDashboard();
  
  const [activeTab, setActiveTab] = useState<'profile' | 'vault'>('profile');
  const [vaultTab, setVaultTab] = useState('home');
  const [newSubject, setNewSubject] = useState("");
  
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    institution: user?.institution || "",
    bio: user?.bio || "",
  });

  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?";
  
  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
    showToast("Profile updated successfully ✨");
  };

  const aps = calcAPS(S.marks);

  return (
    <div className="p-4 pb-24">
      <Eyebrow>Account Settings</Eyebrow>
      <Title>My Profile</Title>
      
      <div className="flex gap-1.5 my-3 overflow-x-auto pb-1">
        <button onClick={() => setActiveTab('profile')} className={`shrink-0 border rounded-full py-1.5 px-3.5 text-[11.5px] font-bold tracking-wide ${activeTab === 'profile' ? 'bg-[#1A3A5C] text-white border-[#1A3A5C]' : 'bg-white border-[#E4E0D4] text-[#6B7688]'}`}>
          Profile Details
        </button>
        <button onClick={() => setActiveTab('vault')} className={`shrink-0 border rounded-full py-1.5 px-3.5 text-[11.5px] font-bold tracking-wide ${activeTab === 'vault' ? 'bg-[#1A3A5C] text-white border-[#1A3A5C]' : 'bg-white border-[#E4E0D4] text-[#6B7688]'}`}>
          Academic Vault
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="animate-in fade-in">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#10263D] to-[#1A3A5C] text-white flex items-center justify-center font-bold text-xl shadow-md">
                  {initials}
                </div>
                <div>
                  <b className="font-['Playfair_Display'] text-[19px] text-[#1A3A5C] leading-none">{user?.name}</b>
                  <div className="text-[10px] text-[#6B7688] font-bold uppercase tracking-[1px] mt-1">{user?.role ? roleLabels[user.role] : ""}</div>
                </div>
              </div>
              <Btn size="sm" color={editing ? 'ghost' : 'navy'} onClick={() => {
                if (editing) setForm({ name: user?.name || "", institution: user?.institution || "", bio: user?.bio || "" });
                setEditing(!editing);
              }}>
                {editing ? 'Cancel' : 'Edit'}
              </Btn>
            </div>
            
            <div className="space-y-3">
              <div>
                <Eyebrow>Full Name</Eyebrow>
                {editing ? (
                  <input className="w-full p-2.5 border border-[#E4E0D4] rounded-xl text-sm font-semibold outline-none focus:border-[#C9A84C]" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                ) : (
                  <p className="text-[13px] font-bold">{user?.name}</p>
                )}
              </div>
              
              <div>
                <Eyebrow>Email Address</Eyebrow>
                <p className="text-[13px] font-bold text-[#6B7688]">{user?.email}</p>
              </div>
              
              <div>
                <Eyebrow>Institution / School</Eyebrow>
                {editing ? (
                  <input className="w-full p-2.5 border border-[#E4E0D4] rounded-xl text-sm font-semibold outline-none focus:border-[#C9A84C]" value={form.institution} onChange={e => setForm({...form, institution: e.target.value})} placeholder="School or University" />
                ) : (
                  <p className="text-[13px] font-bold">{user?.institution || 'Not set'}</p>
                )}
              </div>

              <div>
                <Eyebrow>About Me</Eyebrow>
                {editing ? (
                  <textarea className="w-full p-2.5 border border-[#E4E0D4] rounded-xl text-sm font-semibold outline-none focus:border-[#C9A84C] resize-none" rows={3} value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} placeholder="Tell us about yourself..." />
                ) : (
                  <p className="text-[13px] font-bold text-[#6B7688]">{user?.bio || 'No bio provided yet.'}</p>
                )}
              </div>
            </div>

            {editing && (
              <div className="mt-4 pt-4 border-t border-[#E4E0D4] flex justify-end">
                <Btn color="gold" onClick={handleSave}>Save Changes</Btn>
              </div>
            )}
          </Card>

          <Card>
            <Eyebrow>Activity Summary</Eyebrow>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-[#F5F0E8] p-3 rounded-xl text-center"><div className="font-bold text-xl text-[#1A3A5C]">0</div><div className="text-[10px] uppercase font-bold text-[#6B7688] tracking-wide">Matches</div></div>
              <div className="bg-[#F5F0E8] p-3 rounded-xl text-center"><div className="font-bold text-xl text-[#1A3A5C]">0</div><div className="text-[10px] uppercase font-bold text-[#6B7688] tracking-wide">Messages</div></div>
              <div className="bg-[#F5F0E8] p-3 rounded-xl text-center"><div className="font-bold text-xl text-[#1A3A5C]">{S.docs.filter(d => d.ok).length}</div><div className="text-[10px] uppercase font-bold text-[#6B7688] tracking-wide">Docs</div></div>
              <div className="bg-[#F5F0E8] p-3 rounded-xl text-center"><div className="font-bold text-xl text-[#1A3A5C]">0</div><div className="text-[10px] uppercase font-bold text-[#6B7688] tracking-wide">Societies</div></div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'vault' && (
        <div className="animate-in fade-in">
          {vaultTab === 'home' && (
            <Card className="bg-[#F6EFD9] border-[#C9A84C]">
              <Eyebrow>⚡ Academic Insights</Eyebrow>
              <p className="font-['Inter'] font-bold text-sm text-[#1A3A5C] my-2">Your Grade 11 report is uploaded. The intelligence layer is ready.</p>
              <Btn color="navy" block onClick={() => setVaultTab('aps')}>Calculate my APS & view university options</Btn>
            </Card>
          )}

          {vaultTab === 'aps' && (
            <Card>
              <button className="text-[#1A3A5C] font-bold text-sm mb-3" onClick={() => setVaultTab('home')}>‹ Back to Vault</button>
              <Eyebrow>Vault intelligence</Eyebrow>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <Title>APS Calculator</Title>
                  <Sub>Best 6 subjects count, excluding Life Orientation.</Sub>
                </div>
                <Btn size="sm" color="ghost" onClick={() => showToast('Coming soon: Extract subjects from uploaded report!')}>Analyse / Extract Report</Btn>
              </div>
              
              <table className="w-full text-sm mb-4">
                <thead>
                  <tr className="text-[10px] text-[#6B7688] uppercase border-b">
                    <th className="text-left py-2">Subject</th>
                    <th>%</th>
                    <th>Level</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(S.marks).map(([s, p]) => (
                    <tr key={s} className="border-b">
                      <td className="py-3 font-bold text-[#1A3A5C]">{s}</td>
                      <td className="text-center">
                        <input 
                          type="number" 
                          value={p as number} 
                          onChange={e => updateMark(s, Math.min(100, Math.max(0, +e.target.value || 0)))}
                          className="w-14 p-1 border rounded-md text-center font-bold text-[#1A3A5C]"
                        />
                      </td>
                      <td className="text-center font-bold text-[#6B7688]">LVL {LVL(p as number)}</td>
                      <td className="text-right">
                        <button onClick={() => deleteMark(s)} className="text-[#C0392B] p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Remove subject">
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-2 mb-6 p-3 bg-[#F9F9F8] rounded-xl border border-[#E4E0D4]">
                <div className="relative">
                  <input 
                    value={newSubject}
                    onChange={e => setNewSubject(e.target.value)}
                    placeholder="Search and add a subject..."
                    className="w-full border border-[#E4E0D4] rounded-lg p-2 text-sm text-[#1A3A5C] outline-none focus:border-[#C9A84C]"
                  />
                  {newSubject && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-[#E4E0D4] rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {VALID_SUBJECTS.filter(s => s.toLowerCase().includes(newSubject.toLowerCase()) && S.marks[s] === undefined).length > 0 ? (
                        VALID_SUBJECTS.filter(s => s.toLowerCase().includes(newSubject.toLowerCase()) && S.marks[s] === undefined).map(sub => (
                          <div 
                            key={sub}
                            className="p-2 text-sm text-[#1A3A5C] hover:bg-[#F6EFD9] cursor-pointer border-b last:border-0 border-[#E4E0D4]"
                            onMouseDown={(e) => {
                              // onMouseDown fires before onBlur
                              e.preventDefault();
                              updateMark(sub, 0);
                              setNewSubject("");
                            }}
                          >
                            {sub}
                          </div>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-[#6B7688] italic">No matching subjects found.</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#10263D] to-[#1A3A5C] text-white rounded-2xl p-4 text-center">
                <div className="text-[10.5px] tracking-[2px] font-bold text-[#B9CBDD]">YOUR APS SCORE</div>
                <div className="font-['Playfair_Display'] font-black text-4xl text-[#C9A84C] my-1">{aps}</div>
                <div className="text-[10.5px] tracking-[2px] font-bold text-[#B9CBDD]">{aps >= 32 ? 'STRONG — UNIVERSITY RANGE' : aps >= 26 ? 'SOLID — MULTIPLE PATHWAYS' : 'BUILDING — TVET ROUTES OPEN'}</div>
              </div>

              <div className="mt-6">
                <Eyebrow>Your university options · Career: {S.career}</Eyebrow>
                {UNIS.filter(u => u.cat === 'uni' && aps >= u.min).map(u => (
                  <div key={u.n} className="border border-[#E4E0D4] rounded-xl p-3 mb-2 bg-white">
                    <b className="font-['Playfair_Display']">{u.n}</b>
                    <div className="text-xs text-[#6B7688] mt-1">{u.course} · APS {u.min}–{u.max} · Apply by {u.deadline}</div>
                    <Btn size="sm" color="green" className="mt-2" onClick={() => showToast('Application started 📌')}>Apply now</Btn>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {vaultTab === 'home' && (
            <>
              <Card>
                <div className="flex justify-between items-center mb-2">
                  <Eyebrow>Document checklist</Eyebrow>
                  <Btn size="sm" color="ghost" onClick={() => showToast('All files exported as ZIP 📦')}>Export all</Btn>
                </div>
                {S.docs.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-[#E4E0D4] last:border-0 group">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${d.ok ? 'bg-[#E7F2EA] text-[#1E6B3C]' : 'bg-[#F1EFE7] text-[#B9B29C] border border-dashed border-[#CFC8B2]'}`}>{d.ok ? '✓' : '•'}</div>
                    <div className="flex-1 min-w-0"><b className="text-[13px] text-[#1A3A5C] truncate block">{d.n}</b><div className="text-xs text-[#6B7688] truncate">{d.d}</div></div>
                    {!d.ok ? (
                      <Btn size="sm" color="ghost" onClick={() => uploadDoc(i)}>Upload</Btn>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 text-[#8FA5BB] transition-colors shrink-0">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 font-['Inter']">
                          <DropdownMenuItem onClick={() => uploadDoc(i)} className="cursor-pointer text-[13px]">
                            <Upload className="w-3.5 h-3.5 mr-2 text-[#10263D]" /> Overwrite
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteDoc(i)} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 text-[13px]">
                            <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                ))}
              </Card>

              <Card>
                <Eyebrow>Vault chat · Thandi M. (your mentor)</Eyebrow>
                <div className="space-y-2 py-2">
                  <div className="bg-white border p-2.5 rounded-2xl rounded-bl-sm max-w-[80%] text-[13.5px]">Sawubona! I saw your Grade 11 report upload — well done on the 72% for English 👏</div>
                  <div className="bg-white border p-2.5 rounded-2xl rounded-bl-sm max-w-[80%] text-[13.5px]">Run the APS tool and tag me on the report. Then we build your three-tier application plan together.</div>
                </div>
                <div className="flex gap-2 mt-3">
                  <input className="flex-1 p-3 border rounded-full text-sm outline-none" placeholder="Message Thandi…" />
                  <Btn size="sm" color="navy" onClick={() => showToast('Message sent')}>Send</Btn>
                </div>
              </Card>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
