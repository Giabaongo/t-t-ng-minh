import { useInView } from "@/hooks/useInView";
import { MapPin, Ban, Clock, Puzzle, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

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
    <section ref={ref} className="section-alt overflow-hidden relative">
      {/* Decorative stars */}
      <motion.div 
        className="absolute top-20 right-20 text-gold/10"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Star className="w-40 h-40 fill-current" />
      </motion.div>

      <div className="section-container relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider">
            <span className="w-8 h-0.5 bg-gold" />
            Phần 5
            <span className="w-8 h-0.5 bg-gold" />
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            Con đường đi lên <span className="text-primary">Chủ nghĩa Xã hội</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connection line for desktop */}
          <motion.div 
            className="hidden md:block absolute top-20 left-0 right-0 h-1 z-0"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ originX: 0 }}
          >
            <div className="w-full h-full bg-gradient-to-r from-gold via-primary to-gold rounded-full" />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
              >
                <motion.div 
                  className="feature-card text-center h-full golden-border hover:border-gold/50 relative group"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  {/* Arrow connector */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-20 text-gold z-20">
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    </div>
                  )}

                  <motion.div 
                    className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold to-primary flex items-center justify-center text-primary-foreground font-bold text-xl font-sans shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {step.number}
                  </motion.div>
                  
                  <motion.div
                    className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-all"
                    whileHover={{ rotate: 10 }}
                  >
                    <step.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </motion.div>
                  
                  <h3 className="text-base font-bold text-foreground mb-2 font-sans">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PathwaySection;