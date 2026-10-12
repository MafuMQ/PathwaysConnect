import { useState } from "react";
import { Video, Search, Star, Clock, Calendar, Play, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Tutor {
  id: string;
  name: string;
  subjects: string[];
  rating: number;
  sessions: number;
  rate: number;
  bio: string;
  avatar: string;
  availability: string[];
  isLive: boolean;
}

const initialTutors: Tutor[] = [];

interface Session {
  id: string;
  tutor: string;
  subject: string;
  date: string;
  time: string;
  status: "upcoming" | "completed";
}

const initialSessions: Session[] = [];

const Cubicle = () => {
  const [search, setSearch] = useState("");
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

  const filtered = initialTutors.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subjects.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-1">
          <span className="text-gradient-gold">The Cubicle</span>
        </h1>
        <p className="text-muted-foreground">Live video tutoring with screen sharing & whiteboard</p>
      </div>

      <Tabs defaultValue="browse">
        <TabsList className="mb-6">
          <TabsTrigger value="browse">Find Tutors</TabsTrigger>
          <TabsTrigger value="sessions">My Sessions ({initialSessions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="browse">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by tutor or subject..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
          </div>

          {/* Live now banner */}
          {filtered.some((t) => t.isLive) && (
            <div className="mb-6">
              <h2 className="font-display text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Now
              </h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {filtered.filter((t) => t.isLive).map((tutor) => (
                  <div
                    key={tutor.id}
                    onClick={() => setSelectedTutor(tutor)}
                    className="bg-gradient-card rounded-xl border border-green-500/30 p-4 min-w-[220px] cursor-pointer hover:border-green-500/60 transition-colors shadow-card"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{tutor.avatar}</span>
                      <div>
                        <div className="text-sm font-medium text-foreground">{tutor.name}</div>
                        <div className="text-xs text-green-400">● Live</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {tutor.subjects.map((s) => (
                        <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All tutors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((tutor) => (
              <div
                key={tutor.id}
                onClick={() => setSelectedTutor(tutor)}
                className="bg-gradient-card rounded-xl border border-border p-5 shadow-card hover:border-primary/30 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{tutor.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-semibold text-foreground">{tutor.name}</h3>
                      {tutor.isLive && <span className="text-[10px] text-green-400 font-medium">● LIVE</span>}
                    </div>
                    <div className="flex flex-wrap gap-1 my-1.5">
                      {tutor.subjects.map((s) => (
                        <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{tutor.bio}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-primary" /> {tutor.rating}</span>
                      <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5" /> {tutor.sessions} sessions</span>
                      <span className="font-semibold text-primary">R{tutor.rate}/hr</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Video className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No tutors currently available</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="sessions">
          <div className="space-y-3">
            {initialSessions.map((session) => (
              <div key={session.id} className="bg-gradient-card rounded-xl border border-border p-5 shadow-card flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-semibold text-sm text-foreground">{session.subject}</div>
                  <div className="text-xs text-muted-foreground">with {session.tutor}</div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> {session.date} · {session.time}
                  </div>
                </div>
                <Button size="sm" className="gap-1.5 shrink-0">
                  <Play className="w-3.5 h-3.5" /> Join
                </Button>
              </div>
            ))}
            {initialSessions.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Video className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p>No sessions booked yet</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Tutor detail dialog */}
      <Dialog open={!!selectedTutor} onOpenChange={() => setSelectedTutor(null)}>
        {selectedTutor && (
          <DialogContent className="max-w-md bg-card border-border">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedTutor.avatar}</span>
                <div>
                  <DialogTitle className="font-display text-foreground">{selectedTutor.name}</DialogTitle>
                  <DialogDescription className="flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 text-primary" /> {selectedTutor.rating} · {selectedTutor.sessions} sessions
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="flex flex-wrap gap-1.5">
              {selectedTutor.subjects.map((s) => (
                <Badge key={s} variant="secondary">{s}</Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{selectedTutor.bio}</p>
            <div className="text-xl font-display font-bold text-primary">R{selectedTutor.rate}/hr</div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Availability</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTutor.availability.map((slot) => (
                  <Badge key={slot} variant="outline" className="text-xs">{slot}</Badge>
                ))}
              </div>
            </div>
            <Button className="w-full gap-2 mt-2">
              <Calendar className="w-4 h-4" /> Book Session
            </Button>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Cubicle;
