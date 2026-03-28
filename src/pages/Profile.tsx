import { useState } from "react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Building, Shield, Save, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const roleLabels: Record<UserRole, string> = {
  learner: "Learner",
  student_mentor: "Student Mentor",
  graduate_tutor: "Graduate Tutor",
  educator_admin: "Educator / Admin",
  donor_corporate: "Donor / Corporate",
};

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    institution: user?.institution || "",
    bio: user?.bio || "",
  });

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
    toast({ title: "Profile updated", description: "Your changes have been saved." });
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <h1 className="font-display text-2xl font-bold mb-6">My Profile</h1>

      <Card className="bg-gradient-card border-border shadow-card p-6">
        {/* Avatar & header */}
        <div className="flex items-center gap-5 mb-6">
          <div className="relative">
            <Avatar className="w-20 h-20 text-2xl">
              <AvatarFallback className="bg-primary/20 text-primary font-display font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-xl font-bold text-foreground truncate">{user?.name}</h2>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Shield className="w-3.5 h-3.5" />
              {user?.role ? roleLabels[user.role] : ""}
            </div>
          </div>
          <Button
            variant={editing ? "ghost" : "outline"}
            size="sm"
            onClick={() => {
              if (editing) {
                setForm({ name: user?.name || "", institution: user?.institution || "", bio: user?.bio || "" });
              }
              setEditing(!editing);
            }}
          >
            {editing ? "Cancel" : "Edit"}
          </Button>
        </div>

        <Separator className="mb-6" />

        {/* Fields */}
        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider">
              <User className="w-3.5 h-3.5" /> Full Name
            </Label>
            {editing ? (
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            ) : (
              <p className="text-foreground text-sm">{user?.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" /> Email
            </Label>
            <p className="text-foreground text-sm">{user?.email}</p>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider">
              <Building className="w-3.5 h-3.5" /> Institution
            </Label>
            {editing ? (
              <Input
                value={form.institution}
                onChange={(e) => setForm({ ...form, institution: e.target.value })}
                placeholder="Your school or university"
              />
            ) : (
              <p className="text-foreground text-sm">{user?.institution || "Not set"}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Bio</Label>
            {editing ? (
              <Textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Tell others about yourself…"
                rows={3}
              />
            ) : (
              <p className="text-foreground text-sm">{user?.bio || "No bio yet."}</p>
            )}
          </div>
        </div>

        {editing && (
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} className="shadow-gold">
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </Button>
          </div>
        )}
      </Card>

      {/* Activity summary */}
      <h2 className="font-display text-lg font-semibold mt-8 mb-4">Activity</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Matches", value: "0" },
          { label: "Messages", value: "0" },
          { label: "Documents", value: "0" },
          { label: "Societies", value: "0" },
        ].map((s) => (
          <div key={s.label} className="bg-gradient-card rounded-xl border border-border p-4 shadow-card text-center">
            <div className="text-xl font-display font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
