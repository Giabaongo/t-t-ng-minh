import { useInView } from "@/hooks/useInView";
import { Users, HandHeart, GraduationCap, Building2 } from "lucide-react";

const forces = [
  {
    icon: Users,
    title: "Nhân dân",
    description: "Động lực quan trọng nhất, là chủ thể của mọi sự phát triển",
  },
  {
    icon: HandHeart,
    title: "Đoàn kết toàn dân tộc",
    description: "Sức mạnh tổng hợp từ khối đại đoàn kết dân tộc",
  },
  {
    icon: GraduationCap,
    title: "Giáo dục và khoa học",
    description: "Nền tảng tri thức để phát triển đất nước",
  },
  {
    icon: Building2,
    title: "Lãnh đạo đúng đắn",
    description: "Vai trò của Đảng và Nhà nước trong định hướng phát triển",
  },
];

const DrivingForcesSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="bg-background">
      <div className="section-container">
        <div className={`text-center mb-12 ${isInView ? "fade-in-up" : "opacity-0"}`}>
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Phần 4
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Động lực xây dựng CNXH
          </h2>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="timeline-line" />
          
          {forces.map((force, index) => (
            <div
              key={index}
              className={`relative pl-12 pb-10 last:pb-0 ${isInView ? `fade-in-up stagger-${index + 1}` : "opacity-0"}`}
            >
              <div className="timeline-dot" style={{ top: "4px" }} />
              <div className="feature-card">
                <div className="flex items-center gap-3 mb-2">
                  <force.icon className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-foreground font-sans">{force.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{force.description}</p>
              </div>
            </div>
          ))}
        </div>

        <blockquote className={`quote-block max-w-2xl mx-auto mt-10 ${isInView ? "fade-in-up stagger-5" : "opacity-0"}`}>
          "Không có nhân dân thì không thể xây dựng chủ nghĩa xã hội."
        </blockquote>
      </div>
    </section>
  );
};

export default DrivingForcesSection;
