import { useInView } from "@/hooks/useInView";
import { Users, TrendingUp, Palette, Handshake, UserCircle } from "lucide-react";

const characteristics = [
  {
    icon: Users,
    title: "Nhân dân làm chủ xã hội",
    description: "Quyền lực thuộc về nhân dân",
  },
  {
    icon: TrendingUp,
    title: "Kinh tế gắn với công bằng",
    description: "Phát triển bền vững, chia sẻ thành quả",
  },
  {
    icon: Palette,
    title: "Văn hóa phong phú",
    description: "Đời sống tinh thần đa dạng, lành mạnh",
  },
  {
    icon: Handshake,
    title: "Đoàn kết xã hội",
    description: "Gắn bó, tương trợ lẫn nhau",
  },
  {
    icon: UserCircle,
    title: "Con người là trung tâm",
    description: "Phát triển con người toàn diện",
  },
];

const CharacteristicsSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="section-alt">
      <div className="section-container">
        <div className={`text-center mb-12 ${isInView ? "fade-in-up" : "opacity-0"}`}>
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Phần 3
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Đặc trưng cơ bản của xã hội XHCN
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characteristics.map((item, index) => (
            <div
              key={index}
              className={`feature-card text-center group ${isInView ? `fade-in-up stagger-${index + 1}` : "opacity-0"}`}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <item.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 font-sans">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharacteristicsSection;
