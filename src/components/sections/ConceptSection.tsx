import { useInView } from "@/hooks/useInView";
import { Users, Heart, BookOpen } from "lucide-react";

const ConceptSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="section-2" className="section-alt" ref={ref}>
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 ${isInView ? "fade-in-up" : "opacity-0"}`}>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Phần 1
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Quan niệm về Chủ nghĩa Xã hội
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="accent-dot mt-2" />
                <p className="text-muted-foreground leading-relaxed">
                  Chủ nghĩa xã hội gắn liền với đời sống hằng ngày của nhân dân
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="accent-dot mt-2" />
                <p className="text-muted-foreground leading-relaxed">
                  Không chỉ phát triển kinh tế mà còn chính trị, văn hóa, đạo đức và con người
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="accent-dot mt-2" />
                <p className="text-muted-foreground leading-relaxed">
                  Mọi mục tiêu đều hướng tới hạnh phúc của nhân dân
                </p>
              </div>
            </div>
            
            <blockquote className="quote-block mt-8">
              "Chủ nghĩa xã hội là vì con người và do con người xây dựng."
            </blockquote>
          </div>
          
          <div className={`${isInView ? "fade-in-up stagger-2" : "opacity-0"}`}>
            <div className="grid grid-cols-1 gap-4">
              <div className="feature-card flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground font-sans">Lấy dân làm gốc</h4>
                  <p className="text-sm text-muted-foreground">Nhân dân là trung tâm</p>
                </div>
              </div>
              <div className="feature-card flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground font-sans">Hạnh phúc toàn dân</h4>
                  <p className="text-sm text-muted-foreground">Mục tiêu cao nhất</p>
                </div>
              </div>
              <div className="feature-card flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground font-sans">Phát triển toàn diện</h4>
                  <p className="text-sm text-muted-foreground">Kinh tế, văn hóa, đạo đức</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConceptSection;
