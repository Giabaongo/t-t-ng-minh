import { useInView } from "@/hooks/useInView";
import { Users, Heart, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import patternBg from "@/assets/vietnamese-pattern.jpg";
import peopleUnityArt from "@/assets/people-unity-art.png";

const ConceptSection = () => {
  const { ref, isInView } = useInView();

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.6 }
    })
  };

  return (
    <section id="section-2" className="relative overflow-hidden" ref={ref}>
      {/* Decorative Background */}
      <div
        className="absolute right-0 top-0 w-1/3 h-full opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${patternBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background to-transparent" />

      {/* Floating Artistic Image */}
      <motion.div
        className="absolute -left-16 bottom-10 w-60 h-60 opacity-20 pointer-events-none hidden lg:block"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={peopleUnityArt} alt="" className="w-full h-full object-contain rounded-3xl" />
      </motion.div>

      <div className="section-container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <span className="w-8 h-0.5 bg-gold" />
              Phần 1
            </motion.span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Quan niệm về{" "}
              <span className="text-primary">Chủ nghĩa Xã hội</span>
            </h2>

            <div className="space-y-4">
              {[
                "Chủ nghĩa xã hội gắn liền với đời sống hằng ngày của nhân dân",
                "Không chỉ phát triển kinh tế mà còn chính trị, văn hóa, đạo đức và con người",
                "Mọi mục tiêu đều hướng tới hạnh phúc của nhân dân"
              ].map((text, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                >
                  <span className="accent-dot mt-2" />
                  <p className="text-muted-foreground leading-relaxed">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.blockquote
              className="quote-block mt-8 golden-border rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <span className="text-gold text-2xl mr-2">"</span>
              Chủ nghĩa xã hội là vì con người và do con người xây dựng.
              <span className="text-gold text-2xl ml-2">"</span>
            </motion.blockquote>
          </motion.div>

          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: Users, title: "Lấy dân làm gốc", desc: "Nhân dân là trung tâm", color: "primary" },
              { icon: Heart, title: "Hạnh phúc toàn dân", desc: "Mục tiêu cao nhất", color: "accent" },
              { icon: BookOpen, title: "Phát triển toàn diện", desc: "Kinh tế, văn hóa, đạo đức", color: "primary" }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="feature-card flex items-center gap-4 group golden-border hover:border-gold/50"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <motion.div
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${item.color === "accent"
                    ? "bg-gold/20 group-hover:bg-gold/30"
                    : "bg-primary/10 group-hover:bg-primary/20"
                    } transition-colors`}
                  whileHover={{ rotate: 10 }}
                >
                  <item.icon className={`w-7 h-7 ${item.color === "accent" ? "text-gold" : "text-primary"}`} />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-foreground font-sans text-lg">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConceptSection;