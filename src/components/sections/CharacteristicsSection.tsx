import { useInView } from "@/hooks/useInView";
import { Users, TrendingUp, Palette, Handshake, UserCircle, Star } from "lucide-react";
import { motion } from "framer-motion";
import hcmUnity from "@/assets/hcm-people-unity.jpg";

const characteristics = [
  {
    icon: Users,
    title: "Nhân dân làm chủ xã hội",
    description: "Quyền lực thuộc về nhân dân",
  },
  {
    icon: TrendingUp,
    title: "Kinh tế gắn với công bằng",
    description: "Phát triển bền vững, chia sẻ thành quả",
  },
  {
    icon: Palette,
    title: "Văn hóa phong phú",
    description: "Đời sống tinh thần đa dạng, lành mạnh",
  },
  {
    icon: Handshake,
    title: "Đoàn kết xã hội",
    description: "Gắn bó, tương trợ lẫn nhau",
  },
  {
    icon: UserCircle,
    title: "Con người là trung tâm",
    description: "Phát triển con người toàn diện",
  },
];

const CharacteristicsSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Background with artistic overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hcmUnity})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-revolutionary-dark/95 via-revolutionary-red/90 to-revolutionary-dark/95" />
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-10 right-10 text-gold/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <Star className="w-24 h-24 fill-current" />
      </motion.div>
      <motion.div 
        className="absolute bottom-10 left-10 text-gold/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <Star className="w-32 h-32 fill-current" />
      </motion.div>

      <div className="section-container relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-gold font-medium text-sm uppercase tracking-wider">
            <span className="w-8 h-0.5 bg-gold" />
            Phần 3
            <span className="w-8 h-0.5 bg-gold" />
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mt-2">
            Đặc trưng cơ bản của xã hội <span className="shimmer-text">XHCN</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characteristics.map((item, index) => (
            <motion.div
              key={index}
              className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl text-center group border border-gold/20 hover:border-gold/50 transition-all"
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <motion.div 
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gold/20 flex items-center justify-center group-hover:bg-gold group-hover:scale-110 transition-all duration-300"
                whileHover={{ rotate: 10 }}
              >
                <item.icon className="w-8 h-8 text-gold group-hover:text-revolutionary-dark transition-colors" />
              </motion.div>
              <h3 className="text-lg font-bold text-primary-foreground mb-2 font-sans">{item.title}</h3>
              <p className="text-sm text-primary-foreground/70">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharacteristicsSection;