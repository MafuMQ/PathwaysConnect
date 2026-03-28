import { motion } from "framer-motion";
import {
  Heart,
  FolderLock,
  Sun,
  Video,
  Users,
  GraduationCap,
  ShoppingBag,
  Bell,
} from "lucide-react";

const features = [
  { icon: Heart, name: "CONNECT", desc: "Tinder-style swipe matching between learners and student mentors", color: "hsl(340 80% 60%)" },
  { icon: FolderLock, name: "VAULT", desc: "Secure upload and storage of all academic and registration documents", color: "hsl(210 80% 60%)" },
  { icon: Sun, name: "SPARK", desc: "Daily motivational messages and multi-faith scripture library", color: "hsl(38 92% 55%)" },
  { icon: Video, name: "THE CUBICLE", desc: "Live video tutoring sessions with screen sharing and whiteboard", color: "hsl(160 70% 50%)" },
  { icon: Users, name: "SOCIETIES", desc: "University and college society groups for all students", color: "hsl(270 70% 65%)" },
  { icon: GraduationCap, name: "GRAD DESK", desc: "Unemployed graduates offer tutoring to current students", color: "hsl(12 85% 60%)" },
  { icon: ShoppingBag, name: "BAZAAR", desc: "Buy and sell platform for student entrepreneurs", color: "hsl(180 60% 50%)" },
  { icon: Bell, name: "PULSE", desc: "Central news feed for campaigns, funding alerts and events", color: "hsl(50 85% 55%)" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Features = () => {
  return (
    <section className="py-28 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            One platform, <span className="text-gradient-gold">eight modules</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Everything a South African student needs — from mentorship to marketplace.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((f) => (
            <motion.div
              key={f.name}
              variants={item}
              className="group bg-gradient-card rounded-xl border border-border p-6 hover:border-primary/30 transition-colors duration-300 shadow-card"
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${f.color}15` }}
              >
                <f.icon className="w-5 h-5" style={{ color: f.color }} />
              </div>
              <h3 className="font-display font-semibold text-sm tracking-wider mb-2 text-foreground">
                {f.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
