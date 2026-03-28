import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Briefcase, Shield, Heart } from "lucide-react";

const users = [
  {
    icon: BookOpen,
    type: "LEARNER",
    who: "Grade 11 or 12 learner at a secondary school",
    features: "CONNECT, VAULT, SPARK, SOCIETIES, BAZAAR",
  },
  {
    icon: GraduationCap,
    type: "STUDENT MENTOR",
    who: "Currently enrolled tertiary student volunteering as mentor",
    features: "CONNECT, VAULT, SPARK, SOCIETIES, THE CUBICLE, BAZAAR, GRAD DESK",
  },
  {
    icon: Briefcase,
    type: "GRADUATE TUTOR",
    who: "Unemployed or underemployed graduate offering tutoring",
    features: "GRAD DESK, VAULT, SPARK, BAZAAR, SOCIETIES",
  },
  {
    icon: Shield,
    type: "EDUCATOR / ADMIN",
    who: "School teacher, university staff or Pathways coordinator",
    features: "All features with oversight tools & dashboards",
  },
  {
    icon: Heart,
    type: "DONOR / CORPORATE",
    who: "Company or individual sponsoring students",
    features: "PULSE feed, student profiles, impact reports",
  },
];

const UserTypes = () => {
  return (
    <section className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Built for <span className="text-gradient-gold">everyone</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Five user types, each with tailored access and features.
          </p>
        </motion.div>

        <div className="space-y-4">
          {users.map((u, i) => (
            <motion.div
              key={u.type}
              className="flex items-start gap-5 bg-gradient-card rounded-xl border border-border p-6 shadow-card hover:border-primary/20 transition-colors"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <u.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-semibold text-sm tracking-wider text-foreground mb-1">
                  {u.type}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{u.who}</p>
                <p className="text-xs text-primary/80 font-medium">{u.features}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTypes;
