import { useInView } from "@/hooks/useInView";
import { Play, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const VideoAISection = () => {
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
            <span className="w-8 h-0.5 bg-gold" />
            <Sparkles className="w-4 h-4 text-gold" />
            Video AI
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="w-8 h-0.5 bg-gold" />
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            Tư tưởng Hồ Chí Minh về <span className="text-primary">Chủ nghĩa Xã hội</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Video được tạo bằng công nghệ AI, tái hiện sinh động những tư tưởng sâu sắc của Bác về con đường xây dựng CNXH ở Việt Nam
          </p>
        </motion.div>

        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <div className="relative rounded-2xl overflow-hidden golden-border aspect-video bg-black shadow-2xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/QGIa0syAde4"
              title="Video AI - Tư tưởng Hồ Chí Minh về Chủ nghĩa Xã hội"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <motion.div 
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 p-4 rounded-xl bg-card golden-border">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Công nghệ AI</h3>
                <p className="text-xs text-muted-foreground">Tạo bằng trí tuệ nhân tạo</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-card golden-border">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Play className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Nội dung sinh động</h3>
                <p className="text-xs text-muted-foreground">Dễ hiểu, dễ tiếp cận</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-card golden-border">
              <div className="w-10 h-10 rounded-full bg-revolutionary-red/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-revolutionary-red" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Ý nghĩa giáo dục</h3>
                <p className="text-xs text-muted-foreground">Truyền tải giá trị cốt lõi</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoAISection;
