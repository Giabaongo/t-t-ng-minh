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
            Đặc trưng cơ bản của <span className="shimmer-text">XHCN</span>
          </h2>
        </motion.div>

        <div className="relative w-full max-w-6xl my-[-4rem] mx-auto h-[800px] md:h-[900px] flex items-center justify-center overflow-visible">
          {/* Vòng tròn viền */}
          <motion.div
            className="absolute w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full border-2 border-dashed border-gold/30"
            initial={{ scale: 0, rotate: 0 }}
            animate={isInView ? { scale: 1, rotate: 360 } : {}}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* Ngôi sao trung tâm */}
          <motion.div
            className="absolute w-24 h-24 rounded-full bg-gold/20 border-2 border-gold/50 flex items-center justify-center z-10"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <Star className="w-12 h-12 text-gold fill-gold" />
          </motion.div>

          {/* 5 Cards xung quanh */}
          {characteristics.map((item, index) => {
            // Tính toán vị trí theo vòng tròn - card đầu tiên ở trên cùng
            const angle = (index * 72) * (Math.PI / 180); // 72 độ cho mỗi item (360/5)
            const radius = 300; // Bán kính vòng tròn
            const x = Math.sin(angle) * radius;
            const y = -Math.cos(angle) * radius;

            console.log(`Card ${index}: angle=${index * 72}°, x=${x.toFixed(2)}, y=${y.toFixed(2)}`);

            return (
              <motion.div
                key={index}
                className="absolute bg-primary-foreground/15 backdrop-blur-sm p-6 rounded-xl text-center group border-2 border-gold/30 hover:border-gold transition-all w-44 shadow-xl"
                style={{
                  left: '50%',
                  top: '50%',
                  marginLeft: `${x - 88}px`, // 88 = 176px (w-44) / 2
                  marginTop: `${y - 70}px` // Ước lượng chiều cao / 2
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                transition={{ delay: 0.7 + index * 0.15, duration: 0.8, type: "spring", bounce: 0.4 }}
                whileHover={{ scale: 1.15, zIndex: 20 }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-3 rounded-full bg-gold/30 flex items-center justify-center group-hover:bg-gold transition-all duration-300"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className="w-8 h-8 text-gold group-hover:text-revolutionary-dark transition-colors" />
                </motion.div>
                <h3 className="text-sm font-bold text-primary-foreground mb-2 font-sans leading-tight">{item.title}</h3>
                <p className="text-xs text-primary-foreground/70 leading-snug">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CharacteristicsSection;