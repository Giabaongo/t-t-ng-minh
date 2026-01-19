import { useInView } from "@/hooks/useInView";
import { Quote } from "lucide-react";

const ConclusionSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="bg-primary text-primary-foreground">
      <div className="section-container">
        <div className={`max-w-3xl mx-auto text-center ${isInView ? "fade-in-up" : "opacity-0"}`}>
          <Quote className="w-12 h-12 mx-auto mb-6 opacity-50" />
          
          <blockquote className="text-2xl md:text-3xl font-serif leading-relaxed mb-8">
            "Học Tư tưởng Hồ Chí Minh không phải để ghi nhớ máy móc, 
            mà để hiểu và vận dụng vào thực tiễn cuộc sống."
          </blockquote>

          <div className="w-16 h-0.5 bg-primary-foreground/30 mx-auto mb-8" />

          <div className="space-y-2 text-primary-foreground/80 text-sm">
            <p className="font-medium">Nhóm thuyết trình</p>
            <p>Môn: Tư tưởng Hồ Chí Minh</p>
            <p>Trường Đại học</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConclusionSection;
