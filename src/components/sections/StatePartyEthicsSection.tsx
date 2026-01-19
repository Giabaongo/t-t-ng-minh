import { useInView } from "@/hooks/useInView";
import { Building, Award, Heart } from "lucide-react";

const cards = [
  {
    icon: Building,
    title: "Nhà nước",
    subtitle: "Của dân – Do dân – Vì dân",
    items: [
      "Phục vụ lợi ích nhân dân",
      "Minh bạch, công khai",
      "Lắng nghe ý kiến dân",
    ],
    accent: false,
  },
  {
    icon: Award,
    title: "Đảng và cán bộ",
    subtitle: "Gương mẫu, liêm chính",
    items: [
      "Đi đầu trong mọi công việc",
      "Chống tham ô, lãng phí",
      "Chống quan liêu",
    ],
    accent: true,
  },
  {
    icon: Heart,
    title: "Đạo đức cách mạng",
    subtitle: "Cần – Kiệm – Liêm – Chính",
    items: [
      "Cần cù, siêng năng",
      "Tiết kiệm, không lãng phí",
      "Chí công vô tư",
    ],
    accent: false,
  },
];

const StatePartyEthicsSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="bg-background">
      <div className="section-container">
        <div className={`text-center mb-12 ${isInView ? "fade-in-up" : "opacity-0"}`}>
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Phần 6
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Nhà nước, Đảng và Đạo đức
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`feature-card ${card.accent ? "bg-primary text-primary-foreground" : ""} ${isInView ? `fade-in-up stagger-${index + 1}` : "opacity-0"}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.accent ? "bg-primary-foreground/20" : "bg-primary/10"}`}>
                <card.icon className={`w-6 h-6 ${card.accent ? "text-primary-foreground" : "text-primary"}`} />
              </div>
              <h3 className="text-xl font-bold mb-1 font-sans">{card.title}</h3>
              <p className={`text-sm mb-4 ${card.accent ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {card.subtitle}
              </p>
              <ul className="space-y-2">
                {card.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className={`w-1.5 h-1.5 rounded-full ${card.accent ? "bg-primary-foreground" : "bg-accent"}`} />
                    <span className={card.accent ? "text-primary-foreground/90" : "text-muted-foreground"}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatePartyEthicsSection;
