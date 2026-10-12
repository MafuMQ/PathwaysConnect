import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboard } from '@/contexts/DashboardContext';
import { UNIS, calcAPS, LVL } from '@/data/dashboardData';
import { Card, Eyebrow, Title, Sub, Btn } from '@/components/dashboard/ui/DashboardUI';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Upload, Trash2, X, Plus, Zap, Check } from 'lucide-react';

const VALID_SUBJECTS = [
  'Mathematics', 'Mathematical Literacy', 'English HL', 'English FAL', 
  'Afrikaans HL', 'Afrikaans FAL', 'Life Sciences', 'Physical Sciences', 
  'Accounting', 'Business Studies', 'Economics', 'Geography', 'History', 
  'Life Orientation', 'Tourism', 'Consumer Studies', 'Information Technology', 
  'Computer Applications Technology'
];

const STUDY_TABS = [
  { id: 'academic', label: 'Academic Info' },
  { id: 'vault', label: 'Academic Vault' },
  { id: 'aps', label: 'APS Calculator' },
];

const Study = () => {
  const { user, updateProfile } = useAuth();
  const { S, updateMark, deleteMark, uploadDoc, deleteDoc, showToast } = useDashboard();
  const navigate = useNavigate();
  const location = useLocation();
  const [studyTab, setStudyTab] = useState(location.state?.tab || 'academic');
  const [newSubject, setNewSubject] = useState("");

  const [editingAcademic, setEditingAcademic] = useState(false);
  const [academicForm, setAcademicForm] = useState({
    institution: user?.institution || "",
    grade: user?.grade || "",
    curriculum: user?.curriculum || "",
  });

  useEffect(() => {
    if (user) {
      setAcademicForm({
        institution: user.institution || "",
        grade: user.grade || "",
        curriculum: user.curriculum || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (location.state?.tab) {
      setStudyTab(location.state.tab);
    }
  }, [location.state?.tab]);

  const handleSaveAcademic = async () => {
    try {
      await updateProfile(academicForm);
      setEditingAcademic(false);
      showToast("Academic info updated");
    } catch (e) {
      console.error(e);
      showToast("Failed to update academic info");
    }
  };

  const aps = calcAPS(S.marks);

  return (
    <div className="p-4 pb-24">
      <Eyebrow>Study & Academic Hub</Eyebrow>
      <Title>Academic Records & Intelligence</Title>
      
      <div className="flex gap-1.5 my-3 overflow-x-auto no-scrollbar pb-1">
        {STUDY_TABS.map(t => (
          <button 
            key={t.id} 
            onClick={() => setStudyTab(t.id)} 
            className={`shrink-0 border rounded-full py-1.5 px-3.5 text-[11.5px] font-bold tracking-wide transition-colors ${
              studyTab === t.id 
                ? 'bg-[#1A3A5C] text-white border-[#1A3A5C]' 
                : 'bg-white border-[#E4E0D4] text-[#6B7688] hover:border-[#1A3A5C]/40'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {studyTab === 'academic' && (
        <div className="animate-in fade-in space-y-4">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <Eyebrow>Institutional Profile</Eyebrow>
                <Title>Academic Info</Title>
              </div>
              <Btn 
                size="sm" 
                color={editingAcademic ? 'ghost' : 'navy'} 
                onClick={() => {
                  if (editingAcademic) {
                    setAcademicForm({
                      institution: user?.institution || "",
                      grade: user?.grade || "",
                      curriculum: user?.curriculum || ""
                    });
                  }
                  setEditingAcademic(!editingAcademic);
                }}
              >
                {editingAcademic ? 'Cancel' : 'Edit Info'}
              </Btn>
            </div>
            
            <div className="space-y-4">
              <div>
                <Eyebrow>Institution / School</Eyebrow>
                {editingAcademic ? (
                  <input 
                    className="w-full p-2.5 border border-[#E4E0D4] rounded-xl text-sm font-semibold outline-none focus:border-[#C9A84C] bg-white" 
                    value={academicForm.institution} 
                    onChange={e => setAcademicForm({...academicForm, institution: e.target.value})} 
                    placeholder="e.g. Pretoria Boys High / North-West TVET" 
                  />
                ) : (
                  <p className="text-[14px] font-bold text-[#1A3A5C]">{user?.institution || 'Not set'}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <Eyebrow>Current Grade / Level</Eyebrow>
                  {editingAcademic ? (
                    <select 
                      className="w-full p-2.5 border border-[#E4E0D4] rounded-xl text-sm font-semibold outline-none focus:border-[#C9A84C] bg-white" 
                      value={academicForm.grade} 
                      onChange={e => setAcademicForm({...academicForm, grade: e.target.value})}
                    >
                      <option value="">Select Grade</option>
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                  ) : (
                    <p className="text-[14px] font-bold text-[#1A3A5C]">{user?.grade || 'Not set'}</p>
                  )}
                </div>
                <div>
                  <Eyebrow>Curriculum</Eyebrow>
                  {editingAcademic ? (
                    <select 
                      className="w-full p-2.5 border border-[#E4E0D4] rounded-xl text-sm font-semibold outline-none focus:border-[#C9A84C] bg-white" 
                      value={academicForm.curriculum} 
                      onChange={e => setAcademicForm({...academicForm, curriculum: e.target.value})}
                    >
                      <option value="">Select Curriculum</option>
                      <option value="CAPS">CAPS</option>
                      <option value="IEB">IEB</option>
                      <option value="Cambridge">Cambridge</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="text-[14px] font-bold text-[#1A3A5C]">{user?.curriculum || 'Not set'}</p>
                  )}
                </div>
              </div>

              {editingAcademic && (
                <div className="pt-3 border-t border-[#E4E0D4] flex justify-end">
                  <Btn color="gold" onClick={handleSaveAcademic}>Save Changes</Btn>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-2">
              <div>
                <Eyebrow>Subject Enrollment</Eyebrow>
                <Title>My Registered Subjects</Title>
              </div>
              <Btn size="sm" color="ghost" onClick={() => setStudyTab('aps')}>
                Manage Marks in APS Calculator →
              </Btn>
            </div>
            <Sub className="mb-3">
              Add your registered subjects below. You can update your numerical percentage marks in the APS Calculator tab.
            </Sub>

            <div className="flex flex-wrap gap-2 mb-4">
              {Object.keys(S.marks).length > 0 ? (
                Object.keys(S.marks).map(s => (
                  <div key={s} className="bg-[#E7F2EA] text-[#1E6B3C] border border-[#C6E0CE] rounded-full px-3 py-1.5 text-xs font-bold flex items-center gap-2 shadow-xs">
                    <span>{s}</span>
                    <span className="text-[10px] bg-white/70 px-1.5 py-0.5 rounded-full text-[#1E6B3C]">{S.marks[s]}%</span>
                    <button 
                      onClick={() => deleteMark(s)} 
                      className="hover:text-red-600 transition-colors ml-0.5" 
                      title="Remove subject"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-sm text-[#6B7688] italic py-2">No subjects registered yet. Search and add your subjects below.</div>
              )}
            </div>

            <div className="relative">
              <input 
                value={newSubject}
                onChange={e => setNewSubject(e.target.value)}
                placeholder="Search and add a subject (e.g. Mathematics, Physical Sciences)..."
                className="w-full border border-[#E4E0D4] rounded-xl p-3 text-sm font-semibold text-[#1A3A5C] outline-none focus:border-[#C9A84C] bg-[#F9F9F8]"
              />
              {newSubject && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-[#E4E0D4] rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  {VALID_SUBJECTS.filter(s => s.toLowerCase().includes(newSubject.toLowerCase()) && S.marks[s] === undefined).length > 0 ? (
                    VALID_SUBJECTS.filter(s => s.toLowerCase().includes(newSubject.toLowerCase()) && S.marks[s] === undefined).map(sub => (
                      <div 
                        key={sub}
                        className="p-2.5 text-sm text-[#1A3A5C] font-semibold hover:bg-[#F6EFD9] cursor-pointer border-b last:border-0 border-[#E4E0D4] flex items-center justify-between"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          updateMark(sub, 0);
                          setNewSubject("");
                          showToast(`Added ${sub} to subjects`);
                        }}
                      >
                        <span>{sub}</span>
                        <Plus className="w-4 h-4 text-[#8FA5BB]" />
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-xs text-[#6B7688] italic">No matching subjects found.</div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {studyTab === 'vault' && (
        <div className="animate-in fade-in space-y-4">
          <Card className="bg-[#F6EFD9] border-[#C9A84C]">
            <Eyebrow className="flex items-center gap-1.5 text-[#A8862F]">
              <Zap className="w-3.5 h-3.5" /> Academic Insights & Intelligence
            </Eyebrow>
            <p className="font-['Inter'] font-bold text-sm text-[#1A3A5C] my-2">
              {S.docs.some(d => d.n.includes('Grade 11') && d.ok) 
                ? 'Your Grade 11 report is uploaded. The intelligence layer is ready.' 
                : 'Upload your academic reports below to calculate your APS and unlock verified pathways.'}
            </p>
            <Btn color="navy" block onClick={() => setStudyTab('aps')}>
              Calculate my APS & view university options →
            </Btn>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-3">
              <div>
                <Eyebrow>Encrypted Document Storage</Eyebrow>
                <Title>Academic Vault</Title>
              </div>
              <Btn size="sm" color="ghost" onClick={() => showToast('All files exported as ZIP')}>
                Export all
              </Btn>
            </div>
            <Sub className="mb-3">
              Upload verified copies of your academic and identity records for one-click admissions and bursary applications.
            </Sub>

            <div className="divide-y divide-[#E4E0D4]">
              {S.docs.map((d, i) => (
                <div key={i} className="flex items-center gap-3 py-3 group">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${d.ok ? 'bg-[#E7F2EA] text-[#1E6B3C]' : 'bg-[#F1EFE7] text-[#B9B29C] border border-dashed border-[#CFC8B2]'}`}>
                    {d.ok ? <Check className="w-3.5 h-3.5 text-[#1E6B3C]" /> : <span className="w-1.5 h-1.5 rounded-full bg-[#B9B29C]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <b className="text-[13.5px] text-[#1A3A5C] truncate block">{d.n}</b>
                    <div className="text-xs text-[#6B7688] truncate">{d.d}</div>
                  </div>
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
            </div>
          </Card>
        </div>
      )}

      {studyTab === 'aps' && (
        <Card>
          <Eyebrow>Vault intelligence</Eyebrow>
          <div className="flex justify-between items-start mb-3">
            <div>
              <Title>APS Calculator</Title>
              <Sub>Best 6 subjects count, excluding Life Orientation.</Sub>
            </div>
            <Btn size="sm" color="ghost" onClick={() => showToast('Coming soon: Extract subjects from uploaded report!')}>Analyse / Extract Report</Btn>
          </div>
          
          {Object.keys(S.marks).length === 0 ? (
            <div className="text-center py-6 text-xs text-[#6B7688] italic border-b mb-4">
              No subjects added yet. Search and select a subject below to enter your marks.
            </div>
          ) : (
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
          )}

          <div className="mt-2 mb-6 p-3 bg-[#F9F9F8] rounded-xl border border-[#E4E0D4]">
            <div className="relative">
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

          <div className="bg-gradient-to-br from-[#10263D] to-[#1A3A5C] text-white rounded-2xl p-4 text-center">
            <div className="text-[10.5px] tracking-[2px] font-bold text-[#B9CBDD]">YOUR APS SCORE</div>
            <div className="font-['Playfair_Display'] font-black text-4xl text-[#C9A84C] my-1">{aps}</div>
            <div className="text-[10.5px] tracking-[2px] font-bold text-[#B9CBDD]">
              {aps >= 32 ? 'STRONG — UNIVERSITY RANGE' : aps >= 26 ? 'SOLID — MULTIPLE PATHWAYS' : aps > 0 ? 'BUILDING — TVET ROUTES OPEN' : 'ENTER MARKS TO CALCULATE APS'}
            </div>
          </div>

          <div className="mt-6">
            <Eyebrow>Your university options {S.career ? `· Career: ${S.career}` : ''}</Eyebrow>
            {UNIS.filter(u => u.cat === 'uni' && aps >= u.min).length > 0 ? (
              UNIS.filter(u => u.cat === 'uni' && aps >= u.min).map(u => (
                <div key={u.n} className="border border-[#E4E0D4] rounded-xl p-3 mb-2 bg-white">
                  <b className="font-['Playfair_Display']">{u.n}</b>
                  <div className="text-xs text-[#6B7688] mt-1">{u.course} · APS {u.min}–{u.max} · Apply by {u.deadline}</div>
                  <Btn size="sm" color="green" className="mt-2" onClick={() => showToast('Application started')}>Apply now</Btn>
                </div>
              ))
            ) : (
              <div className="text-center py-6 bg-white border border-[#E4E0D4] rounded-xl text-xs text-[#6B7688]">
                {UNIS.length === 0 ? 'No university listings currently configured.' : 'No matching university options found for your current APS score.'}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Study;
