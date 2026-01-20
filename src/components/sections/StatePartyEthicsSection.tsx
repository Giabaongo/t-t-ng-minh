import { useInView } from "@/hooks/useInView";
import { Building, Award, Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import ethicsLeadershipArt from "@/assets/ethics-leadership-art.png";

const cards = [
  {
    icon: Building,
    title: "Nhà nước",
    subtitle: "Của dân – Do dân – Vì dân",
    items: ["Phục vụ lợi ích nhân dân", "Minh bạch, công khai", "Lắng nghe ý kiến dân"],
    accent: false,
  },
  {
    icon: Award,
    title: "Đảng và cán bộ",
    subtitle: "Gương mẫu, liêm chính",
    items: ["Đi đầu trong mọi công việc", "Chống tham ô, lãng phí", "Chống quan liêu"],
    accent: true,
  },
  {
    icon: Heart,
    title: "Đạo đức cách mạng",
    subtitle: "Cần – Kiệm – Liêm – Chính",
    items: ["Cần cù, siêng năng", "Tiết kiệm, không lãng phí", "Chí công vô tư"],
    accent: false,
  },
];

const StatePartyEthicsSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="bg-background relative overflow-hidden">
      {/* Floating Artistic Image */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-56 h-56 opacity-15 pointer-events-none hidden lg:block"
        animate={{ x: [0, 10, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={ethicsLeadershipArt} alt="" className="w-full h-full object-contain rounded-2xl" />
      </motion.div>

      <div className="section-container relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider">
            <Star className="w-4 h-4 text-gold fill-gold" />
            Phần 6
            <Star className="w-4 h-4 text-gold fill-gold" />
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            Nhà nước, Đảng và <span className="text-primary">Đạo đức</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={`feature-card ${card.accent ? "bg-gradient-to-br from-primary to-revolutionary-dark text-primary-foreground" : "golden-border hover:border-gold/50"}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <motion.div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${card.accent ? "bg-gold/20" : "bg-primary/10"}`}
                whileHover={{ rotate: 10 }}
              >
                <card.icon className={`w-7 h-7 ${card.accent ? "text-gold" : "text-primary"}`} />
              </motion.div>
              <h3 className="text-xl font-bold mb-1 font-sans">{card.title}</h3>
              <p className={`text-sm mb-4 ${card.accent ? "text-gold" : "text-muted-foreground"}`}>{card.subtitle}</p>
              <ul className="space-y-2">
                {card.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className={`w-2 h-2 rounded-full ${card.accent ? "bg-gold" : "bg-gold"}`} />
                    <span className={card.accent ? "text-primary-foreground/90" : "text-muted-foreground"}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatePartyEthicsSection;