import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToContent = () => {
    document.getElementById("section-2")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen hero-gradient flex flex-col items-center justify-center relative px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="fade-in-up stagger-1">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Chương 3 – Giáo trình Tư tưởng Hồ Chí Minh
          </span>
        </div>
        
        <h1 className="fade-in-up stagger-2 text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
          Tư tưởng Hồ Chí Minh về{" "}
          <span className="text-primary">Chủ nghĩa Xã hội</span>
        </h1>
        
        <p className="fade-in-up stagger-3 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Theo Hồ Chí Minh, chủ nghĩa xã hội không phải là lý luận trừu tượng, 
          mà là con đường hướng tới cuộc sống ấm no, tự do, hạnh phúc cho nhân dân.
        </p>
        
        <div className="fade-in-up stagger-4">
          <Button 
            onClick={scrollToContent}
            size="lg"
            className="rounded-full px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Bắt đầu tìm hiểu
          </Button>
        </div>
      </div>
      
      <button 
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float text-muted-foreground hover:text-primary transition-colors"
        aria-label="Cuộn xuống"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default HeroSection;
