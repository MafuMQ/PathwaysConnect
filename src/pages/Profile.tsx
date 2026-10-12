import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboard } from '@/contexts/DashboardContext';
import { Card, Eyebrow, Title, Sub, Btn } from '@/components/dashboard/ui/DashboardUI';
import { BookOpen, ShieldCheck, ArrowRight } from "lucide-react";

const roleLabels: Record<string, string> = {
  learner: "Learner",
};

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const { showToast } = useDashboard();
  
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?";
  
  const handleSave = async () => {
    try {
      await updateProfile(form);
      setEditing(false);
      showToast("Profile updated successfully");
    } catch (e) {
      console.error(e);
      showToast("Failed to update profile");
    }
  };

  return (
    <div className="p-4 pb-24 space-y-4">
      <div>
        <Eyebrow>Account Settings</Eyebrow>
        <Title>My Profile</Title>
      </div>

      <div className="animate-in fade-in space-y-4">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#10263D] to-[#1A3A5C] text-white flex items-center justify-center font-bold text-xl shadow-md">
                {initials}
              </div>
              <div>
                <b className="font-['Playfair_Display'] text-[19px] text-[#1A3A5C] leading-none">{user?.name || 'Learner'}</b>
                <div className="text-[10px] text-[#6B7688] font-bold uppercase tracking-[1px] mt-1">{user?.role ? roleLabels[user.role] : "Learner"}</div>
              </div>
            </div>
            <Btn size="sm" color={editing ? 'ghost' : 'navy'} onClick={() => {
              if (editing) setForm({ name: user?.name || "", bio: user?.bio || "" });
              setEditing(!editing);
            }}>
              {editing ? 'Cancel' : 'Edit Profile'}
            </Btn>
          </div>
          
          <div className="space-y-3">
            <div>
              <Eyebrow>Full Name</Eyebrow>
              {editing ? (
                <input 
                  className="w-full p-2.5 border border-[#E4E0D4] rounded-xl text-sm font-semibold outline-none focus:border-[#C9A84C] bg-white" 
                  value={form.name} 
                  onChange={e => setForm({...form, name: e.target.value})} 
                />
              ) : (
                <p className="text-[13px] font-bold text-[#1A3A5C]">{user?.name || 'Not set'}</p>
              )}
            </div>
            
            <div>
              <Eyebrow>Email Address</Eyebrow>
              <p className="text-[13px] font-bold text-[#6B7688]">{user?.email}</p>
            </div>
            
            <div>
              <Eyebrow>About Me</Eyebrow>
              {editing ? (
                <textarea 
                  className="w-full p-2.5 border border-[#E4E0D4] rounded-xl text-sm font-semibold outline-none focus:border-[#C9A84C] resize-none bg-white" 
                  rows={3} 
                  value={form.bio} 
                  onChange={e => setForm({...form, bio: e.target.value})} 
                  placeholder="Tell us about yourself..." 
                />
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

        {/* Academic Hub Quick Links (moved to Study) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="hover:border-[#C9A84C]/50 transition-colors cursor-pointer" onClick={() => navigate('/app/study', { state: { tab: 'academic' } })}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E7F2EA] text-[#1E6B3C] flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <b className="font-['Playfair_Display'] text-base text-[#1A3A5C]">Academic Info</b>
                  <ArrowRight className="w-4 h-4 text-[#8FA5BB]" />
                </div>
                <p className="text-xs text-[#6B7688] mt-1">
                  Manage your school, grade, curriculum, and registered subjects inside Study.
                </p>
              </div>
            </div>
          </Card>

          <Card className="hover:border-[#C9A84C]/50 transition-colors cursor-pointer" onClick={() => navigate('/app/study', { state: { tab: 'vault' } })}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F6EFD9] text-[#C9A84C] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#10263D]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <b className="font-['Playfair_Display'] text-base text-[#1A3A5C]">Academic Vault</b>
                  <ArrowRight className="w-4 h-4 text-[#8FA5BB]" />
                </div>
                <p className="text-xs text-[#6B7688] mt-1">
                  Access your encrypted documents, ID, and academic reports inside Study.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
