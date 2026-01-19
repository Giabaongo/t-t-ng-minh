import { ChevronDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroArt from "@/assets/hcm-hero-art.jpg";

const FloatingParticles = () => {
  return (
    <div className="floating-particles">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100],
            x: [0, Math.random() * 40 - 20],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  const scrollToContent = () => {
    document.getElementById("section-2")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroArt})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-revolutionary-dark/90 via-revolutionary-red/85 to-revolutionary-dark/95" />
      
      {/* Decorative Elements */}
      <FloatingParticles />
      
      {/* Golden Star Decorations */}
      <motion.div 
        className="absolute top-20 left-10 text-gold"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Star className="w-8 h-8 fill-current opacity-30" />
      </motion.div>
      <motion.div 
        className="absolute top-40 right-20 text-gold"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <Star className="w-6 h-6 fill-current opacity-20" />
      </motion.div>
      <motion.div 
        className="absolute bottom-40 left-20 text-gold"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Star className="w-10 h-10 fill-current" />
      </motion.div>

      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-6 py-2 rounded-full bg-gold/20 text-gold text-sm font-medium mb-6 backdrop-blur-sm border border-gold/30">
            ★ Chương 3 – Giáo trình Tư tưởng Hồ Chí Minh ★
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 text-primary-foreground"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Tư tưởng Hồ Chí Minh về{" "}
          <span className="shimmer-text">Chủ nghĩa Xã hội</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Theo Hồ Chí Minh, chủ nghĩa xã hội không phải là lý luận trừu tượng, 
          mà là con đường hướng tới cuộc sống ấm no, tự do, hạnh phúc cho nhân dân.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button 
            onClick={scrollToContent}
            size="lg"
            className="rounded-full px-10 py-7 text-base font-medium bg-gold hover:bg-gold-light text-revolutionary-dark shadow-lg hover:shadow-2xl transition-all duration-300 glow-pulse border-2 border-gold-light/30"
          >
            ★ Bắt đầu tìm hiểu
          </Button>
        </motion.div>
      </div>
      
      <motion.button 
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold hover:text-gold-light transition-colors"
        aria-label="Cuộn xuống"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={40} />
      </motion.button>
    </section>
  );
};

export default HeroSection;