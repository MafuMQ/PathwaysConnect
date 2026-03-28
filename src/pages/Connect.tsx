import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, PanInfo } from "framer-motion";
import { Heart, X, MessageCircle, MapPin, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import mentor1 from "@/assets/mentors/mentor1.jpg";
import mentor2 from "@/assets/mentors/mentor2.jpg";
import mentor3 from "@/assets/mentors/mentor3.jpg";
import mentor4 from "@/assets/mentors/mentor4.jpg";

interface MentorProfile {
  id: string;
  name: string;
  age: number;
  institution: string;
  field: string;
  bio: string;
  image: string;
  subjects: string[];
  rating: number;
  location: string;
}

const mockMentors: MentorProfile[] = [
  {
    id: "1", name: "Naledi Mokoena", age: 22, institution: "University of Cape Town",
    field: "Computer Science", bio: "Passionate about helping learners discover tech. Let's code together! 💻",
    image: mentor1, subjects: ["Mathematics", "IT", "Physical Science"], rating: 4.9, location: "Cape Town",
  },
  {
    id: "2", name: "Thabo Ndlovu", age: 24, institution: "Wits University",
    field: "Engineering", bio: "Mechanical engineering student who loves breaking down complex problems simply.",
    image: mentor2, subjects: ["Mathematics", "Physical Science", "Engineering"], rating: 4.7, location: "Johannesburg",
  },
  {
    id: "3", name: "Priya Naidoo", age: 21, institution: "University of KwaZulu-Natal",
    field: "Life Sciences", bio: "Future doctor helping matric learners ace biology and chemistry! 🧬",
    image: mentor3, subjects: ["Life Sciences", "Chemistry", "Mathematics"], rating: 4.8, location: "Durban",
  },
  {
    id: "4", name: "Arjun Pillay", age: 23, institution: "Stellenbosch University",
    field: "Commerce", bio: "Accounting and business studies are easier than you think. Let me show you!",
    image: mentor4, subjects: ["Accounting", "Business Studies", "Economics"], rating: 4.6, location: "Stellenbosch",
  },
];

const SwipeCard = ({ mentor, onSwipe, isTop }: { mentor: MentorProfile; onSwipe: (dir: "left" | "right") => void; isTop: boolean }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      const dir = info.offset.x > 0 ? "right" : "left";
      animate(x, info.offset.x > 0 ? 500 : -500, { duration: 0.3 });
      setTimeout(() => onSwipe(dir), 300);
    } else {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, rotate, zIndex: isTop ? 10 : 1 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border shadow-card bg-card">
        <img src={mentor.image} alt={mentor.name} className="w-full h-3/5 object-cover" loading="lazy" />

        {/* Like/Nope overlays */}
        <motion.div className="absolute top-8 left-8 px-4 py-2 rounded-lg border-2 border-green-500 text-green-500 font-display font-bold text-2xl -rotate-12" style={{ opacity: likeOpacity }}>
          MATCH!
        </motion.div>
        <motion.div className="absolute top-8 right-8 px-4 py-2 rounded-lg border-2 border-red-500 text-red-500 font-display font-bold text-2xl rotate-12" style={{ opacity: nopeOpacity }}>
          SKIP
        </motion.div>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-card p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-display font-bold text-xl text-foreground">{mentor.name}, {mentor.age}</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" /> {mentor.location}
              </div>
            </div>
            <div className="flex items-center gap-1 text-primary text-sm font-semibold">
              <Star className="w-4 h-4 fill-primary" /> {mentor.rating}
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <BookOpen className="w-3 h-3" /> {mentor.institution} · {mentor.field}
          </div>
          <p className="text-sm text-foreground/80 mb-3">{mentor.bio}</p>
          <div className="flex flex-wrap gap-1.5">
            {mentor.subjects.map((s) => (
              <span key={s} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Connect = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);

  const handleSwipe = (dir: "left" | "right") => {
    if (dir === "right") {
      setMatches((prev) => [...prev, mockMentors[currentIndex].name]);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleButton = (dir: "left" | "right") => {
    handleSwipe(dir);
  };

  const remaining = mockMentors.slice(currentIndex);

  return (
    <div className="p-6 md:p-8 max-w-lg mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">CONNECT</h1>
        <p className="text-sm text-muted-foreground">Swipe right to match with a mentor</p>
      </div>

      {remaining.length > 0 ? (
        <>
          <div className="relative w-full" style={{ height: "520px" }}>
            {remaining.slice(0, 2).reverse().map((mentor, i) => (
              <SwipeCard
                key={mentor.id}
                mentor={mentor}
                onSwipe={handleSwipe}
                isTop={i === (remaining.length > 1 ? 1 : 0)}
              />
            ))}
          </div>

          <div className="flex justify-center gap-6 mt-6">
            <Button onClick={() => handleButton("left")} size="lg" variant="outline" className="w-16 h-16 rounded-full border-destructive/50 text-destructive hover:bg-destructive/10">
              <X className="w-7 h-7" />
            </Button>
            <Button onClick={() => handleButton("right")} size="lg" className="w-16 h-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold">
              <Heart className="w-7 h-7" />
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold mb-2">All caught up!</h2>
          <p className="text-muted-foreground text-sm mb-4">You've seen all available mentors.</p>
          {matches.length > 0 && (
            <div className="bg-gradient-card rounded-xl border border-border p-4 inline-block shadow-card">
              <p className="text-sm text-primary font-medium mb-2">Your matches ({matches.length})</p>
              {matches.map((m) => (
                <div key={m} className="flex items-center gap-2 text-sm text-foreground">
                  <MessageCircle className="w-3.5 h-3.5 text-primary" /> {m}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Connect;
