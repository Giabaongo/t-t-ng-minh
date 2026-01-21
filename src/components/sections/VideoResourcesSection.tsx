import { useInView } from "@/hooks/useInView";
import { Youtube, Play, Star } from "lucide-react";
import { motion } from "framer-motion";

const videos = [
    {
        id: "kk0FTECgWJs",
        title: "Xây dựng con người và tư tưởng xã hội chủ nghĩa",
        url: "https://youtu.be/kk0FTECgWJs"
    },
    {
        id: "dnMCD3MGGFo",
        title: "Xây dựng Nhà nước của dân, do dân và vì dân",
        url: "https://youtu.be/dnMCD3MGGFo"
    },
    {
        id: "DTSdW1iAa64",
        title: "Tư tưởng HCM về xây dựng nhà nước của dân do dân và vì dân",
        url: "https://youtu.be/DTSdW1iAa64"
    }
];

const VideoResourcesSection = () => {
    const { ref, isInView } = useInView();

    return (
        <section ref={ref} className="bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--gold)) 1px, transparent 0)`,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <motion.div
                className="absolute top-10 right-10 text-red-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
                <Youtube className="w-32 h-32" />
            </motion.div>

            <div className="section-container relative z-10">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-flex items-center gap-2 text-red-500 font-medium text-sm uppercase tracking-wider">
                        <Youtube className="w-4 h-4" />
                        Tài liệu tham khảo
                        <Youtube className="w-4 h-4" />
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2">
                        Video <span className="text-red-500">YouTube</span> liên quan
                    </h2>
                    <p className="text-white/60 mt-4 max-w-2xl mx-auto">
                        Các video bài giảng bổ sung giúp bạn hiểu sâu hơn về tư tưởng Hồ Chí Minh
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {videos.map((video, index) => (
                        <motion.a
                            key={video.id}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-red-500/50 transition-all duration-300"
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            whileHover={{ scale: 1.03, y: -5 }}
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                                    alt={video.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        // Fallback to hqdefault if maxresdefault doesn't exist
                                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                                {/* Play button overlay */}
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:bg-red-500 transition-colors">
                                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                                    </div>
                                </motion.div>

                                {/* YouTube badge */}
                                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded bg-red-600 text-white text-xs font-medium">
                                    <Youtube className="w-3 h-3" />
                                    YouTube
                                </div>
                            </div>

                            {/* Title */}
                            <div className="p-4">
                                <h3 className="text-white font-medium line-clamp-2 group-hover:text-red-400 transition-colors">
                                    {video.title}
                                </h3>
                            </div>
                        </motion.a>
                    ))}
                </div>

                <motion.p
                    className="text-center text-white/40 mt-10 text-sm"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                >
                    Nhấn vào video để xem trên YouTube
                </motion.p>
            </div>
        </section>
    );
};

export default VideoResourcesSection;
