import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Users, Search, Plus, MessageSquare, Calendar, UserPlus, UserMinus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Society {
  id: string;
  name: string;
  category: string;
  members: number;
  description: string;
  color: string;
  icon: string;
  posts: SocietyPost[];
  events: SocietyEvent[];
}

interface SocietyPost {
  id: string;
  author: string;
  content: string;
  time: string;
  likes: number;
}

interface SocietyEvent {
  id: string;
  title: string;
  date: string;
  location: string;
}

const mockSocieties: Society[] = [
  {
    id: "1", name: "Tech & Innovation Society", category: "Academic", members: 342,
    description: "For students passionate about technology, coding, AI and innovation. Weekly hackathons and workshops.",
    color: "hsl(210 80% 60%)", icon: "💻",
    posts: [
      { id: "p1", author: "Thabo M.", content: "Who's joining the hackathon this Saturday? We need a team of 4!", time: "2h ago", likes: 12 },
      { id: "p2", author: "Naledi K.", content: "Just finished my first React project! Thanks to everyone who helped 🎉", time: "5h ago", likes: 24 },
    ],
    events: [
      { id: "e1", title: "Weekend Hackathon", date: "Sat, 5 Apr", location: "Engineering Building, Lab 3" },
      { id: "e2", title: "AI Workshop: Intro to LLMs", date: "Wed, 9 Apr", location: "Online (Zoom)" },
    ],
  },
  {
    id: "2", name: "Debate & Public Speaking", category: "Culture", members: 189,
    description: "Sharpen your argumentation and public speaking skills. Compete in inter-university debates.",
    color: "hsl(340 80% 60%)", icon: "🎤",
    posts: [
      { id: "p3", author: "Sipho N.", content: "Motion for next week: 'This house believes AI will replace most jobs within 20 years'", time: "1h ago", likes: 8 },
    ],
    events: [
      { id: "e3", title: "Inter-Varsity Debate Finals", date: "Fri, 11 Apr", location: "Main Auditorium" },
    ],
  },
  {
    id: "3", name: "Entrepreneurship Club", category: "Business", members: 256,
    description: "Connect with fellow student entrepreneurs. Pitch nights, mentorship, and funding opportunities.",
    color: "hsl(38 92% 55%)", icon: "🚀",
    posts: [
      { id: "p4", author: "Amahle D.", content: "Looking for a co-founder for my EdTech startup. DM me if interested!", time: "3h ago", likes: 31 },
      { id: "p5", author: "Kagiso T.", content: "Pitch Night results are in! Congrats to EcoWash for winning R5,000 seed funding 🏆", time: "1d ago", likes: 45 },
    ],
    events: [
      { id: "e4", title: "Monthly Pitch Night", date: "Thu, 17 Apr", location: "Business School, Room 201" },
    ],
  },
  {
    id: "4", name: "Sports & Recreation", category: "Sports", members: 478,
    description: "Stay active! Join leagues, casual games, and fitness sessions across campus.",
    color: "hsl(160 70% 50%)", icon: "⚽",
    posts: [
      { id: "p6", author: "Bongani L.", content: "Soccer practice moved to 5pm today due to rain earlier", time: "30m ago", likes: 5 },
    ],
    events: [
      { id: "e5", title: "Inter-Res Soccer Tournament", date: "Sat, 12 Apr", location: "Main Sports Field" },
    ],
  },
  {
    id: "5", name: "Community Outreach", category: "Community", members: 134,
    description: "Making a difference beyond campus. Volunteer programs, drives, and community partnerships.",
    color: "hsl(270 70% 65%)", icon: "🤝",
    posts: [
      { id: "p7", author: "Lerato P.", content: "Thank you to everyone who helped at the food drive! We collected over 200kg of food 🙏", time: "6h ago", likes: 52 },
    ],
    events: [
      { id: "e6", title: "Township Tutoring Saturday", date: "Sat, 5 Apr", location: "Khayelitsha Community Hall" },
    ],
  },
  {
    id: "6", name: "Arts & Culture Collective", category: "Culture", members: 167,
    description: "Celebrate creativity through visual arts, music, dance, and cultural events.",
    color: "hsl(12 85% 60%)", icon: "🎨",
    posts: [
      { id: "p8", author: "Zanele M.", content: "Art exhibition submissions close Friday! Theme: 'Identity in the Digital Age'", time: "4h ago", likes: 18 },
    ],
    events: [
      { id: "e7", title: "Heritage Day Celebration", date: "Mon, 21 Apr", location: "Student Centre" },
    ],
  },
];

const categories = ["All", "Academic", "Business", "Culture", "Sports", "Community"];

const Societies = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [joined, setJoined] = useState<Set<string>>(new Set(["1", "3"]));
  const [selectedSociety, setSelectedSociety] = useState<Society | null>(null);
  const [newPost, setNewPost] = useState("");

  const filtered = mockSocieties.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || s.category === activeCategory;
    return matchSearch && matchCat;
  });

  const toggleJoin = (id: string) => {
    setJoined((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-1">
          <span className="text-gradient-gold">Societies</span>
        </h1>
        <p className="text-muted-foreground">Join campus communities, connect with peers, and stay involved</p>
      </div>

      {/* Search & filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search societies..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
        </div>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Society cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((society) => {
          const isMember = joined.has(society.id);
          return (
            <div
              key={society.id}
              className="bg-gradient-card rounded-xl border border-border p-5 shadow-card hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => setSelectedSociety(society)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{society.icon}</div>
                <Badge variant={isMember ? "default" : "secondary"} className={isMember ? "bg-primary/20 text-primary border-0" : ""}>
                  {isMember ? "Joined" : society.category}
                </Badge>
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1">{society.name}</h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{society.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> {society.members} members
                </span>
                <div className="flex gap-1.5">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" /> {society.posts.length}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {society.events.length}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Users className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>No societies found</p>
        </div>
      )}

      {/* Society detail dialog */}
      <Dialog open={!!selectedSociety} onOpenChange={() => setSelectedSociety(null)}>
        {selectedSociety && (
          <DialogContent className="max-w-lg bg-card border-border max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedSociety.icon}</span>
                <div>
                  <DialogTitle className="font-display text-foreground">{selectedSociety.name}</DialogTitle>
                  <DialogDescription>{selectedSociety.members} members · {selectedSociety.category}</DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <p className="text-sm text-muted-foreground">{selectedSociety.description}</p>

            <Button
              onClick={(e) => { e.stopPropagation(); toggleJoin(selectedSociety.id); }}
              variant={joined.has(selectedSociety.id) ? "outline" : "default"}
              className="w-full"
            >
              {joined.has(selectedSociety.id) ? (
                <><UserMinus className="w-4 h-4 mr-2" /> Leave Society</>
              ) : (
                <><UserPlus className="w-4 h-4 mr-2" /> Join Society</>
              )}
            </Button>

            <Tabs defaultValue="posts" className="mt-2">
              <TabsList className="w-full">
                <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
                <TabsTrigger value="events" className="flex-1">Events</TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="space-y-3 mt-3">
                {joined.has(selectedSociety.id) && (
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Write something..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="bg-secondary border-border text-sm min-h-[60px]"
                    />
                    <Button size="sm" className="self-end" disabled={!newPost.trim()} onClick={() => setNewPost("")}>
                      Post
                    </Button>
                  </div>
                )}
                {selectedSociety.posts.map((post) => (
                  <div key={post.id} className="bg-secondary/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{post.author}</span>
                      <span className="text-xs text-muted-foreground">{post.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{post.content}</p>
                    <span className="text-xs text-muted-foreground mt-2 inline-block">❤️ {post.likes}</span>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="events" className="space-y-3 mt-3">
                {selectedSociety.events.map((event) => (
                  <div key={event.id} className="bg-secondary/50 rounded-lg p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">{event.title}</div>
                      <div className="text-xs text-muted-foreground">{event.date} · {event.location}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Societies;
