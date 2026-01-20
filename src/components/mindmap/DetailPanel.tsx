import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Branch, MindMapNode } from "@/data/mindMapData";

interface DetailPanelProps {
    isOpen: boolean;
    onClose: () => void;
    branch: Branch | null;
    node: MindMapNode | null;
}

const DetailPanel = ({ isOpen, onClose, branch, node }: DetailPanelProps) => {
    const data = node || branch;

    if (!data) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed right-0 top-0 h-full w-96 bg-card/95 backdrop-blur-xl shadow-2xl z-50 overflow-y-auto border-l border-border"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                >
                    {/* Header */}
                    <div
                        className="sticky top-0 p-6 border-b border-border bg-card/80 backdrop-blur-sm"
                        style={{ borderLeftColor: branch?.color, borderLeftWidth: 4 }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <span className="text-3xl mb-2 block">{branch?.icon}</span>
                        <h2 className="text-xl font-bold text-foreground pr-8">
                            {data.title}
                        </h2>
                        {node && (
                            <p className="text-sm text-muted-foreground mt-1">
                                {branch?.title}
                            </p>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Explanation */}
                        <div>
                            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                                Giải thích
                            </h3>
                            <p className="text-foreground/90 leading-relaxed">
                                {data.explanation}
                            </p>
                        </div>

                        {/* Example */}
                        <div className="p-4 rounded-lg bg-muted/50 border border-border">
                            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                                💡 Ví dụ thực tiễn
                            </h3>
                            <p className="text-foreground/80 leading-relaxed text-sm">
                                {data.example}
                            </p>
                        </div>

                        {/* Key Point */}
                        <motion.div
                            className="p-4 rounded-lg text-center"
                            style={{ backgroundColor: `${branch?.color}20` }}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">
                                ⭐ Ý chính cần nhớ
                            </h3>
                            <p
                                className="text-lg font-bold"
                                style={{ color: branch?.color }}
                            >
                                {data.keyPoint}
                            </p>
                        </motion.div>

                        {/* Child nodes list if viewing branch */}
                        {!node && branch && (
                            <div className="pt-4 border-t border-border">
                                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                                    Các nội dung chi tiết
                                </h3>
                                <div className="space-y-2">
                                    {branch.nodes.map((n, i) => (
                                        <motion.div
                                            key={n.id}
                                            className="p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/50 transition-colors cursor-pointer"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <span className="text-sm font-medium text-foreground">
                                                {n.title}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DetailPanel;
