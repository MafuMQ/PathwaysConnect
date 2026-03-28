import { Bell, Megaphone, Calendar, DollarSign } from "lucide-react";

const feedItems = [
  { icon: Megaphone, type: "Campaign", title: "Pathways Winter Bursary Drive 2024", desc: "Applications are now open for the 2024 winter bursary programme. Apply before 30 June.", time: "2h ago", color: "hsl(38 92% 55%)" },
  { icon: Calendar, type: "Event", title: "Career Expo — Johannesburg", desc: "Join us at the Sandton Convention Centre for our annual career expo. Free entry for all students.", time: "5h ago", color: "hsl(210 80% 60%)" },
  { icon: DollarSign, type: "Funding", title: "NSFAS Update: 2025 Applications", desc: "NSFAS has announced that 2025 applications will open on 1 September 2024.", time: "1d ago", color: "hsl(160 70% 50%)" },
  { icon: Megaphone, type: "Campaign", title: "Mentor of the Month — March", desc: "Congratulations to Naledi Mokoena for being selected as Mentor of the Month!", time: "2d ago", color: "hsl(340 80% 60%)" },
];

const Pulse = () => {
  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold flex items-center gap-2">
          <Bell className="w-6 h-6 text-primary" /> PULSE
        </h1>
        <p className="text-sm text-muted-foreground">Stay updated with the latest from PathwaysConnect</p>
      </div>

      <div className="space-y-4">
        {feedItems.map((item, i) => (
          <div key={i} className="bg-gradient-card rounded-xl border border-border p-5 shadow-card hover:border-primary/20 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-display font-semibold tracking-wider" style={{ color: item.color }}>{item.type.toUpperCase()}</span>
                  <span className="text-xs text-muted-foreground">· {item.time}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pulse;
