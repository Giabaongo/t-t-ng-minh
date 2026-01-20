import { useInView } from "@/hooks/useInView";
import { Target, Lightbulb, GraduationCap, HeartHandshake, Stethoscope, User, Star } from "lucide-react";
import { motion } from "framer-motion";
import revolutionBg from "@/assets/revolution-abstract.jpg";

const myGoalsImage = "https://res.cloudinary.com/dgds0gqq1/image/upload/v1768835041/unnamed-1706752909_jlwcqs.jpg"; // Thay null bằng hình ảnh của bạn

const GoalsSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${revolutionBg})` }}
      />
      
      <div className="section-container relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider">
            <Star className="w-4 h-4 text-gold fill-gold" />
            Phần 2
            <Star className="w-4 h-4 text-gold fill-gold" />
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            Mục tiêu của <span className="text-primary">Chủ nghĩa Xã hội</span>
          </h2>
        </motion.div>

        {/* Layout 2 cột: Hình ảnh bên trái, Nội dung bên phải */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Cột hình ảnh */}
          {myGoalsImage && (
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden golden-border aspect-video">
                <img 
                  src={myGoalsImage}
                  alt="Mục tiêu của Chủ nghĩa Xã hội"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}

          {/* Cột nội dung */}
          <div className="space-y-6">
            <motion.div 
              className="feature-card golden-border hover:border-gold/50 relative overflow-hidden group"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center"
                  whileHover={{ rotate: 10 }}
                >
                  <Target className="w-6 h-6 text-primary-foreground" />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground font-sans">Mục tiêu tổng quát</h3>
              </div>
              <ul className="space-y-4 relative z-10">
                {[
                  "Giải phóng con người khỏi nghèo đói, bất công, lạc hậu",
                  "Nâng cao đời sống vật chất và tinh thần"
                ].map((text, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.15 }}
                  >
                    <span className="accent-dot mt-2" />
                    <span className="text-muted-foreground">{text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="feature-card golden-border hover:border-gold/50 relative overflow-hidden group"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-gold flex items-center justify-center"
                  whileHover={{ rotate: 10 }}
                >
                  <Lightbulb className="w-6 h-6 text-revolutionary-dark" />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground font-sans">Mục tiêu cụ thể</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                {[
                  { icon: HeartHandshake, text: "Phát triển kinh tế" },
                  { icon: User, text: "Công bằng xã hội" },
                  { icon: GraduationCap, text: "Giáo dục – văn hóa" },
                  { icon: Stethoscope, text: "Y tế – sức khỏe" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5 transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.p 
          className="text-center text-lg text-muted-foreground mt-10 italic max-w-2xl mx-auto golden-border rounded-lg p-4 bg-card/50"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <span className="text-gold text-xl">"</span>
          Phát triển không được đánh đổi bằng hạnh phúc con người.
          <span className="text-gold text-xl">"</span>
        </motion.p>
      </div>
    </section>
  );
};

export default GoalsSection;