import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const { S, setS, uploadDoc, deleteDoc, updateMark, deleteMark, showToast } = useDashboard();
  
  const [activeTab, setActiveTab] = useState<'profile' | 'academic' | 'vault'>('profile');
  const [vaultTab, setVaultTab] = useState('home');
  const [newSubject, setNewSubject] = useState("");
  
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    institution: user?.institution || "",
    bio: user?.bio || "",
    grade: user?.grade || "",
    curriculum: user?.curriculum || "",
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
        <button onClick={() => setActiveTab('academic')} className={`shrink-0 border rounded-full py-1.5 px-3.5 text-[11.5px] font-bold tracking-wide ${activeTab === 'academic' ? 'bg-[#1A3A5C] text-white border-[#1A3A5C]' : 'bg-white border-[#E4E0D4] text-[#6B7688]'}`}>
          Academic Info
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
                if (editing) setForm({ name: user?.name || "", institution: user?.institution || "", bio: user?.bio || "", grade: user?.grade || "", curriculum: user?.curriculum || "" });
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
        </div>
      )}

      {activeTab === 'academic' && (
        <div className="animate-in fade-in">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <Title>Academic Info</Title>
              <Btn size="sm" color={editing ? 'ghost' : 'navy'} onClick={() => {
                if (editing) setForm({ name: user?.name || "", institution: user?.institution || "", bio: user?.bio || "", grade: user?.grade || "", curriculum: user?.curriculum || "" });
                setEditing(!editing);
              }}>
                {editing ? 'Cancel' : 'Edit'}
              </Btn>
            </div>
            
            <div className="space-y-3">
              <div>
                <Eyebrow>Institution / School</Eyebrow>
                {editing ? (
                  <input className="w-full p-2.5 border border-[#E4E0D4] rounded-xl text-sm font-semibold outline-none focus:border-[#C9A84C]" value={form.institution} onChange={e => setForm({...form, institution: e.target.value})} placeholder="School or University" />
                ) : (
                  <p className="text-[13px] font-bold">{user?.institution || 'Not set'}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <Eyebrow>Current Grade</Eyebrow>
                  {editing ? (
                    <select className="w-full p-2.5 border border-[#E4E0D4] rounded-xl text-sm font-semibold outline-none focus:border-[#C9A84C]" value={form.grade} onChange={e => setForm({...form, grade: e.target.value})}>
                      <option value="">Select Grade</option>
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                  ) : (
                    <p className="text-[13px] font-bold">{user?.grade || 'Not set'}</p>
                  )}
                </div>
                <div>
                  <Eyebrow>Curriculum</Eyebrow>
                  {editing ? (
                    <select className="w-full p-2.5 border border-[#E4E0D4] rounded-xl text-sm font-semibold outline-none focus:border-[#C9A84C]" value={form.curriculum} onChange={e => setForm({...form, curriculum: e.target.value})}>
                      <option value="">Select Curriculum</option>
                      <option value="CAPS">CAPS</option>
                      <option value="IEB">IEB</option>
                      <option value="Cambridge">Cambridge</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="text-[13px] font-bold">{user?.curriculum || 'Not set'}</p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E4E0D4] mt-3">
                <Eyebrow>My Subjects</Eyebrow>
                <div className="flex flex-wrap gap-2 mt-1 mb-2">
                  {Object.keys(S.marks).length > 0 ? (
                    Object.keys(S.marks).map(s => (
                      <div key={s} className="bg-[#E7F2EA] text-[#1E6B3C] border border-[#C6E0CE] rounded-full px-3 py-1 text-[11px] font-bold flex items-center gap-1.5">
                        {s}
                        <button onClick={() => deleteMark(s)} className="hover:text-red-600 transition-colors" title="Remove subject"><X className="w-3 h-3" /></button>
                      </div>
                    ))
                  ) : (
                    <div className="text-[13px] text-[#6B7688] italic">No subjects added yet.</div>
                  )}
                </div>

                <div className="relative mt-2">
                  <input 
                    value={newSubject}
                    onChange={e => setNewSubject(e.target.value)}
                    placeholder="Search and add a subject..."
                    className="w-full border border-[#E4E0D4] rounded-lg p-2.5 text-sm font-semibold text-[#1A3A5C] outline-none focus:border-[#C9A84C] bg-[#F9F9F8]"
                  />
                  {newSubject && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-[#E4E0D4] rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {VALID_SUBJECTS.filter(s => s.toLowerCase().includes(newSubject.toLowerCase()) && S.marks[s] === undefined).length > 0 ? (
                        VALID_SUBJECTS.filter(s => s.toLowerCase().includes(newSubject.toLowerCase()) && S.marks[s] === undefined).map(sub => (
                          <div 
                            key={sub}
                            className="p-2 text-sm text-[#1A3A5C] font-semibold hover:bg-[#F6EFD9] cursor-pointer border-b last:border-0 border-[#E4E0D4]"
                            onMouseDown={(e) => {
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
            </div>

            {editing && (
              <div className="mt-4 pt-4 border-t border-[#E4E0D4] flex justify-end">
                <Btn color="gold" onClick={handleSave}>Save Changes</Btn>
              </div>
            )}
          </Card>
        </div>
      )}

      {activeTab === 'vault' && (
        <div className="animate-in fade-in">
          {vaultTab === 'home' && (
            <Card className="bg-[#F6EFD9] border-[#C9A84C]">
              <Eyebrow>⚡ Academic Insights</Eyebrow>
              <p className="font-['Inter'] font-bold text-sm text-[#1A3A5C] my-2">Your Grade 11 report is uploaded. The intelligence layer is ready.</p>
              <Btn color="navy" block onClick={() => navigate('/app/study', { state: { tab: 'aps' } })}>Calculate my APS & view university options</Btn>
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
