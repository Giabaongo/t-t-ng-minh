import { useInView } from "@/hooks/useInView";
import { MapPin, Ban, Clock, Puzzle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "Phù hợp điều kiện Việt Nam",
    description: "Xuất phát từ thực tiễn đất nước",
  },
  {
    number: "02",
    icon: Ban,
    title: "Không rập khuôn",
    description: "Sáng tạo, không áp dụng máy móc mô hình bên ngoài",
  },
  {
    number: "03",
    icon: Clock,
    title: "Tiến hành từng bước",
    description: "Quá trình lâu dài, kiên trì, bền bỉ",
  },
  {
    number: "04",
    icon: Puzzle,
    title: "Kết hợp đồng bộ",
    description: "Kinh tế – Văn hóa – Đạo đức – Xã hội",
  },
];

const PathwaySection = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="section-alt overflow-hidden">
      <div className="section-container">
        <div className={`text-center mb-12 ${isInView ? "fade-in-up" : "opacity-0"}`}>
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Phần 5
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Con đường đi lên Chủ nghĩa Xã hội
          </h2>
        </div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`${isInView ? `fade-in-up stagger-${index + 1}` : "opacity-0"}`}
              >
                <div className="feature-card text-center h-full">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg font-sans">
                    {step.number}
                  </div>
                  <step.icon className="w-6 h-6 mx-auto mb-3 text-primary" />
                  <h3 className="text-base font-bold text-foreground mb-2 font-sans">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PathwaySection;
