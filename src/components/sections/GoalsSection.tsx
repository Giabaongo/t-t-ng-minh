import { useInView } from "@/hooks/useInView";
import { Target, Lightbulb, GraduationCap, HeartHandshake, Stethoscope, User } from "lucide-react";

const GoalsSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="bg-background">
      <div className="section-container">
        <div className={`text-center mb-12 ${isInView ? "fade-in-up" : "opacity-0"}`}>
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Phần 2
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Mục tiêu của Chủ nghĩa Xã hội
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className={`feature-card ${isInView ? "fade-in-up stagger-1" : "opacity-0"}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-sans">Mục tiêu tổng quát</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="accent-dot mt-2" />
                <span className="text-muted-foreground">Giải phóng con người khỏi nghèo đói, bất công, lạc hậu</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="accent-dot mt-2" />
                <span className="text-muted-foreground">Nâng cao đời sống vật chất và tinh thần</span>
              </li>
            </ul>
          </div>

          <div className={`feature-card ${isInView ? "fade-in-up stagger-2" : "opacity-0"}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-sans">Mục tiêu cụ thể</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Phát triển kinh tế</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Công bằng xã hội</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Giáo dục – văn hóa</span>
              </div>
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Y tế – sức khỏe</span>
              </div>
            </div>
          </div>
        </div>

        <p className={`text-center text-muted-foreground mt-8 italic ${isInView ? "fade-in-up stagger-3" : "opacity-0"}`}>
          "Phát triển không được đánh đổi bằng hạnh phúc con người."
        </p>
      </div>
    </section>
  );
};

export default GoalsSection;
