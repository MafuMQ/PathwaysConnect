import { useState } from "react";
import { GraduationCap, Search, Briefcase, Star, MapPin, Clock, ChevronRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Graduate {
  id: string;
  name: string;
  degree: string;
  university: string;
  subjects: string[];
  rating: number;
  hourlyRate: number;
  bio: string;
  avatar: string;
  location: string;
  yearsExp: number;
  available: boolean;
}

const mockGraduates: Graduate[] = [
  { id: "1", name: "Mandla Dlamini", degree: "BSc Computer Science", university: "Wits", subjects: ["Python", "Algorithms", "Data Structures"], rating: 4.8, hourlyRate: 100, bio: "Recent graduate passionate about making CS accessible. Struggled myself and now want to help others succeed.", avatar: "👨🏿‍🎓", location: "Johannesburg", yearsExp: 1, available: true },
  { id: "2", name: "Ayanda Cele", degree: "BCom Accounting", university: "UKZN", subjects: ["Financial Accounting", "Tax", "Auditing"], rating: 4.9, hourlyRate: 120, bio: "Completed my articles and now tutoring while job hunting. CA(SA) bound!", avatar: "👩🏾‍🎓", location: "Durban", yearsExp: 2, available: true },
  { id: "3", name: "Pieter du Plessis", degree: "BEng Electrical", university: "Stellenbosch", subjects: ["Circuit Theory", "Electronics", "Maths"], rating: 4.6, hourlyRate: 110, bio: "Engineering grad offering affordable tutoring. I know the struggle of late-night problem sets!", avatar: "👨🏻‍🎓", location: "Cape Town", yearsExp: 1, available: false },
  { id: "4", name: "Noluthando Khumalo", degree: "BA Psychology", university: "Rhodes", subjects: ["Research Methods", "Statistics", "Developmental Psych"], rating: 4.7, hourlyRate: 90, bio: "Honours grad helping students navigate psych and research methodology.", avatar: "👩🏾‍🎓", location: "Makhanda", yearsExp: 1, available: true },
  { id: "5", name: "Ravi Naidoo", degree: "BSc Actuarial Science", university: "UCT", subjects: ["Mathematics", "Statistics", "Financial Maths"], rating: 5.0, hourlyRate: 150, bio: "Qualified actuary offering expert tutoring in mathematical sciences. Limited availability.", avatar: "👨🏽‍🎓", location: "Cape Town", yearsExp: 3, available: true },
];

const GradDesk = () => {
  const [search, setSearch] = useState("");
  const [selectedGrad, setSelectedGrad] = useState<Graduate | null>(null);
  const [message, setMessage] = useState("");

  const filtered = mockGraduates.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.subjects.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
    g.degree.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-1">
          <span className="text-gradient-gold">Grad Desk</span>
        </h1>
        <p className="text-muted-foreground">Unemployed graduates offer affordable tutoring to current students</p>
      </div>

      {/* Info banner */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6 flex items-start gap-3">
        <GraduationCap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-foreground font-medium">Empowering graduates, supporting students</p>
          <p className="text-xs text-muted-foreground mt-1">Recent graduates earn income by tutoring, while students get quality help at student-friendly rates.</p>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search by name, degree, or subject..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
      </div>

      <div className="space-y-3">
        {filtered.map((grad) => (
          <div
            key={grad.id}
            onClick={() => setSelectedGrad(grad)}
            className="bg-gradient-card rounded-xl border border-border p-5 shadow-card hover:border-primary/30 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{grad.avatar}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display font-semibold text-foreground">{grad.name}</h3>
                  {grad.available ? (
                    <Badge className="bg-green-500/20 text-green-400 border-0 text-[10px]">Available</Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[10px]">Unavailable</Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{grad.degree} · {grad.university}</div>
                <div className="flex flex-wrap gap-1 my-2">
                  {grad.subjects.map((s) => (
                    <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-primary" /> {grad.rating}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {grad.location}</span>
                  <span className="font-semibold text-primary">R{grad.hourlyRate}/hr</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-2" />
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <GraduationCap className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>No graduates found</p>
        </div>
      )}

      {/* Graduate detail */}
      <Dialog open={!!selectedGrad} onOpenChange={() => setSelectedGrad(null)}>
        {selectedGrad && (
          <DialogContent className="max-w-md bg-card border-border">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedGrad.avatar}</span>
                <div>
                  <DialogTitle className="font-display text-foreground">{selectedGrad.name}</DialogTitle>
                  <DialogDescription>{selectedGrad.degree} · {selectedGrad.university}</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-primary" /> {selectedGrad.rating}</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {selectedGrad.location}</span>
              <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {selectedGrad.yearsExp}yr exp</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedGrad.subjects.map((s) => (
                <Badge key={s} variant="secondary">{s}</Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{selectedGrad.bio}</p>
            <div className="text-xl font-display font-bold text-primary">R{selectedGrad.hourlyRate}/hr</div>
            <div className="space-y-2">
              <Textarea
                placeholder="Send a message to introduce yourself..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-secondary border-border"
              />
              <Button className="w-full gap-2" disabled={!selectedGrad.available}>
                <Send className="w-4 h-4" /> {selectedGrad.available ? "Request Tutoring" : "Currently Unavailable"}
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default GradDesk;
