import { useInView } from "@/hooks/useInView";
import { Users, HandHeart, GraduationCap, Building2, Star } from "lucide-react";
import { motion } from "framer-motion";

const forces = [
  {
    icon: Users,
    title: "Nhân dân",
    description: "Động lực quan trọng nhất, là chủ thể của mọi sự phát triển",
  },
  {
    icon: HandHeart,
    title: "Đoàn kết toàn dân tộc",
    description: "Sức mạnh tổng hợp từ khối đại đoàn kết dân tộc",
  },
  {
    icon: GraduationCap,
    title: "Giáo dục và khoa học",
    description: "Nền tảng tri thức để phát triển đất nước",
  },
  {
    icon: Building2,
    title: "Lãnh đạo đúng đắn",
    description: "Vai trò của Đảng và Nhà nước trong định hướng phát triển",
  },
];

const DrivingForcesSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="bg-background relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="section-container relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider">
            <Star className="w-4 h-4 text-gold fill-gold" />
            Phần 4
            <Star className="w-4 h-4 text-gold fill-gold" />
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            Động lực xây dựng <span className="text-primary">CNXH</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Animated timeline line */}
          <motion.div 
            className="absolute left-6 top-0 bottom-0 w-1 rounded-full overflow-hidden"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ originY: 0 }}
          >
            <div className="w-full h-full bg-gradient-to-b from-gold via-primary to-gold" />
          </motion.div>
          
          {forces.map((force, index) => (
            <motion.div
              key={index}
              className="relative pl-16 pb-10 last:pb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
            >
              {/* Animated dot */}
              <motion.div 
                className="absolute left-3.5 w-5 h-5 rounded-full bg-gold border-4 border-background"
                style={{ top: "8px" }}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.2, type: "spring" }}
              >
                <motion.div 
                  className="absolute inset-0 rounded-full bg-gold"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                />
              </motion.div>

              <motion.div 
                className="feature-card golden-border hover:border-gold/50 group"
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-colors"
                    whileHover={{ rotate: 10 }}
                  >
                    <force.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground font-sans">{force.title}</h3>
                </div>
                <p className="text-muted-foreground">{force.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.blockquote 
          className="quote-block max-w-2xl mx-auto mt-12 golden-border rounded-lg text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span className="text-gold text-2xl">"</span>
          Không có nhân dân thì không thể xây dựng chủ nghĩa xã hội.
          <span className="text-gold text-2xl">"</span>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default DrivingForcesSection;