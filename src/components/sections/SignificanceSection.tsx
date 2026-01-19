import { useInView } from "@/hooks/useInView";
import { Compass, Scale, Building2, GraduationCap } from "lucide-react";

const significances = [
  {
    icon: Compass,
    text: "Giá trị định hướng phát triển đất nước",
  },
  {
    icon: Scale,
    text: "Gắn phát triển kinh tế với công bằng xã hội",
  },
  {
    icon: Building2,
    text: "Xây dựng Nhà nước trong sạch, vì nhân dân",
  },
  {
    icon: GraduationCap,
    text: "Giáo dục trách nhiệm và đạo đức công dân",
  },
];

const SignificanceSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="section-alt">
      <div className="section-container">
        <div className={`text-center mb-12 ${isInView ? "fade-in-up" : "opacity-0"}`}>
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Phần 7
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Ý nghĩa hiện nay
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Tư tưởng Hồ Chí Minh về chủ nghĩa xã hội vẫn còn nguyên giá trị 
            trong công cuộc xây dựng và phát triển đất nước hôm nay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {significances.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-6 rounded-xl bg-background border border-border hover:border-primary/30 hover:shadow-lg transition-all ${isInView ? `fade-in-up stagger-${index + 1}` : "opacity-0"}`}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-foreground font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignificanceSection;
