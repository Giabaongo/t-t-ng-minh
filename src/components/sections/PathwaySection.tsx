import { useInView } from "@/hooks/useInView";
import { MapPin, Ban, Clock, Puzzle, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

const myPathwayImage = "https://res.cloudinary.com/dgds0gqq1/image/upload/v1768834892/article_bnddfi.jpg";

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

        {/* Layout 2 cột: Nội dung bên trái, Ảnh bên phải */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Cột nội dung */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
              >
                <motion.div 
                  className="feature-card golden-border hover:border-gold/50 relative group overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="flex items-center gap-4 mb-3 relative z-10">
                    <motion.div 
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-[#B8651B] to-[#8B4513] flex items-center justify-center text-white font-bold text-xl font-sans shadow-lg flex-shrink-0"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.number}
                    </motion.div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-1 font-sans">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>

                    <motion.div
                      className="w-10 h-10 rounded-lg bg-[#E8D4D4] flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <step.icon className="w-5 h-5 text-[#8B4513]" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Cột hình ảnh */}
          {myPathwayImage && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden golden-border aspect-video">
                <img 
                  src={myPathwayImage}
                  alt="Con đường đi lên Chủ nghĩa Xã hội"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PathwaySection;