import { useInView } from "@/hooks/useInView";
import { Compass, Scale, Building2, GraduationCap, Star } from "lucide-react";
import { motion } from "framer-motion";

const significances = [
  { icon: Compass, text: "Giá trị định hướng phát triển đất nước" },
  { icon: Scale, text: "Gắn phát triển kinh tế với công bằng xã hội" },
  { icon: Building2, text: "Xây dựng Nhà nước trong sạch, vì nhân dân" },
  { icon: GraduationCap, text: "Giáo dục trách nhiệm và đạo đức công dân" },
];

const SignificanceSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="section-alt relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider">
            <span className="w-8 h-0.5 bg-gold" /> Phần 7 <span className="w-8 h-0.5 bg-gold" />
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            Ý nghĩa <span className="text-primary">hiện nay</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {significances.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-4 p-6 rounded-xl bg-card golden-border hover:border-gold/50"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 10 }}
            >
              <motion.div 
                className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: 10, backgroundColor: "hsl(var(--gold) / 0.2)" }}
              >
                <item.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <p className="text-foreground font-medium text-lg">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignificanceSection;