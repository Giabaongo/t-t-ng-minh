import { useInView } from "@/hooks/useInView";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import heroArt from "@/assets/hcm-hero-art.jpg";

const ConclusionSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroArt})` }} />
      <div className="absolute inset-0 bg-gradient-to-br from-revolutionary-dark/95 via-revolutionary-red/90 to-revolutionary-dark/95" />
      
      <motion.div className="absolute top-10 left-10 text-gold/20" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
        <Star className="w-20 h-20 fill-current" />
      </motion.div>

      <div className="section-container relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}>
            <Star className="w-12 h-12 mx-auto mb-6 text-gold fill-gold" />
          </motion.div>
          
          <blockquote className="text-2xl md:text-4xl font-serif leading-relaxed mb-8 text-primary-foreground">
            <span className="shimmer-text">"Học Tư tưởng Hồ Chí Minh không phải để ghi nhớ máy móc, mà để hiểu và vận dụng vào thực tiễn cuộc sống."</span>
          </blockquote>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />

          <div className="space-y-2 text-primary-foreground/80">
            <p className="font-medium text-gold text-lg">★ Nhóm thuyết trình ★</p>
            <p>Môn: Tư tưởng Hồ Chí Minh</p>
            <p>Trường Đại học</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConclusionSection;