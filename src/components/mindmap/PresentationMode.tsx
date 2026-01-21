import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, HelpCircle, CheckCircle2, XCircle } from "lucide-react";
import { mindMapData, Branch, MindMapNode, QuizQuestion } from "@/data/mindMapData";
import { Button } from "@/components/ui/button";

interface PresentationModeProps {
    isOpen: boolean;
    onClose: () => void;
    initialBranchIndex?: number;
}

const PresentationMode = ({ isOpen, onClose, initialBranchIndex = 0 }: PresentationModeProps) => {
    const [currentBranchIndex, setCurrentBranchIndex] = useState(initialBranchIndex);
    const [currentNodeIndex, setCurrentNodeIndex] = useState(-1); // -1 means showing branch overview
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Quiz states
    const [showQuiz, setShowQuiz] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [hasAnswered, setHasAnswered] = useState(false);

    const currentBranch = mindMapData.branches[currentBranchIndex];
    const currentNode = currentNodeIndex >= 0 ? currentBranch.nodes[currentNodeIndex] : null;
    const totalSlides = mindMapData.branches.length * 4; // 1 overview + 3 nodes per branch
    const currentSlide = currentBranchIndex * 4 + (currentNodeIndex + 2);

    // Get current quiz
    const currentQuiz: QuizQuestion | undefined = currentNode?.quiz || currentBranch?.quiz;

    // Reset quiz when slide changes
    useEffect(() => {
        setShowQuiz(false);
        setSelectedAnswer(null);
        setHasAnswered(false);
    }, [currentBranchIndex, currentNodeIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === "ArrowRight" || e.key === " ") {
                if (!showQuiz) handleNext();
            } else if (e.key === "ArrowLeft") {
                if (!showQuiz) handlePrevious();
            } else if (e.key === "Escape") {
                if (showQuiz) {
                    setShowQuiz(false);
                } else {
                    onClose();
                }
            } else if (e.key === "f") {
                toggleFullscreen();
            } else if (e.key === "q") {
                if (currentQuiz) setShowQuiz(!showQuiz);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, currentBranchIndex, currentNodeIndex, showQuiz, currentQuiz]);

    const handleNext = useCallback(() => {
        if (currentNodeIndex < currentBranch.nodes.length - 1) {
            setCurrentNodeIndex(currentNodeIndex + 1);
        } else if (currentBranchIndex < mindMapData.branches.length - 1) {
            setCurrentBranchIndex(currentBranchIndex + 1);
            setCurrentNodeIndex(-1);
        }
    }, [currentBranchIndex, currentNodeIndex, currentBranch]);

    const handlePrevious = useCallback(() => {
        if (currentNodeIndex > -1) {
            setCurrentNodeIndex(currentNodeIndex - 1);
        } else if (currentBranchIndex > 0) {
            setCurrentBranchIndex(currentBranchIndex - 1);
            setCurrentNodeIndex(mindMapData.branches[currentBranchIndex - 1].nodes.length - 1);
        }
    }, [currentBranchIndex, currentNodeIndex]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleAnswerSelect = (index: number) => {
        if (hasAnswered) return;
        setSelectedAnswer(index);
        setHasAnswered(true);
    };

    const data = currentNode || currentBranch;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <div className="flex items-center gap-4">
                            <span
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: currentBranch.color }}
                            />
                            <span className="text-white/60 text-sm">
                                Nhánh {currentBranchIndex + 1}/{mindMapData.branches.length}: {currentBranch.title}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-white/40 text-sm mr-4">
                                Slide {currentSlide}/{totalSlides}
                            </span>
                            {currentQuiz && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowQuiz(!showQuiz)}
                                    className={`text-white/60 hover:text-white ${showQuiz ? 'bg-yellow-500/20 text-yellow-400' : ''}`}
                                >
                                    <HelpCircle className="w-4 h-4 mr-2" />
                                    Quiz
                                </Button>
                            )}
                            <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-white/60 hover:text-white">
                                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                            </Button>
                            <Button variant="ghost" size="icon" onClick={onClose} className="text-white/60 hover:text-white">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
                        <AnimatePresence mode="wait">
                            {showQuiz && currentQuiz ? (
                                // Quiz UI
                                <motion.div
                                    key="quiz"
                                    className="max-w-2xl w-full"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                                        <div className="flex items-center gap-3 mb-6">
                                            <HelpCircle className="w-8 h-8 text-yellow-400" />
                                            <h2 className="text-2xl font-bold text-white">Câu hỏi Quiz</h2>
                                        </div>

                                        <p className="text-xl text-white/90 mb-8 leading-relaxed">
                                            {currentQuiz.question}
                                        </p>

                                        <div className="space-y-3">
                                            {currentQuiz.options.map((option, index) => {
                                                const isCorrect = index === currentQuiz.correctIndex;
                                                const isSelected = selectedAnswer === index;

                                                let bgColor = "bg-white/5 hover:bg-white/10";
                                                let borderColor = "border-white/20";
                                                let icon = null;

                                                if (hasAnswered) {
                                                    if (isCorrect) {
                                                        bgColor = "bg-green-500/20";
                                                        borderColor = "border-green-500";
                                                        icon = <CheckCircle2 className="w-5 h-5 text-green-400" />;
                                                    } else if (isSelected && !isCorrect) {
                                                        bgColor = "bg-red-500/20";
                                                        borderColor = "border-red-500";
                                                        icon = <XCircle className="w-5 h-5 text-red-400" />;
                                                    }
                                                }

                                                return (
                                                    <motion.button
                                                        key={index}
                                                        onClick={() => handleAnswerSelect(index)}
                                                        disabled={hasAnswered}
                                                        className={`w-full p-4 rounded-xl border ${borderColor} ${bgColor} text-left transition-all flex items-center justify-between group ${hasAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                                                        whileHover={!hasAnswered ? { scale: 1.02 } : {}}
                                                        whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span
                                                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${hasAnswered && isCorrect
                                                                        ? 'bg-green-500 text-white'
                                                                        : hasAnswered && isSelected && !isCorrect
                                                                            ? 'bg-red-500 text-white'
                                                                            : 'bg-white/20 text-white/80'
                                                                    }`}
                                                            >
                                                                {String.fromCharCode(65 + index)}
                                                            </span>
                                                            <span className="text-white/90">{option}</span>
                                                        </div>
                                                        {icon}
                                                    </motion.button>
                                                );
                                            })}
                                        </div>

                                        {hasAnswered && (
                                            <motion.div
                                                className={`mt-6 p-4 rounded-xl ${selectedAnswer === currentQuiz.correctIndex
                                                        ? 'bg-green-500/20 border border-green-500/50'
                                                        : 'bg-red-500/20 border border-red-500/50'
                                                    }`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                {selectedAnswer === currentQuiz.correctIndex ? (
                                                    <p className="text-green-400 font-medium flex items-center gap-2">
                                                        <CheckCircle2 className="w-5 h-5" />
                                                        🎉 Chính xác! Bạn đã trả lời đúng.
                                                    </p>
                                                ) : (
                                                    <p className="text-red-400 font-medium flex items-center gap-2">
                                                        <XCircle className="w-5 h-5" />
                                                        Chưa đúng. Đáp án chính xác là: <span className="text-white">{currentQuiz.options[currentQuiz.correctIndex]}</span>
                                                    </p>
                                                )}
                                            </motion.div>
                                        )}

                                        <div className="mt-6 flex justify-center">
                                            <Button
                                                onClick={() => setShowQuiz(false)}
                                                className="bg-white/10 hover:bg-white/20 text-white"
                                            >
                                                Quay lại nội dung
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                // Content UI (existing)
                                <motion.div
                                    key={`${currentBranchIndex}-${currentNodeIndex}`}
                                    className="max-w-4xl w-full"
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Icon & Title */}
                                    <div className="text-center mb-12">
                                        <motion.span
                                            className="text-7xl block mb-6"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", delay: 0.1 }}
                                        >
                                            {currentBranch.icon}
                                        </motion.span>
                                        <motion.h1
                                            className="text-4xl md:text-5xl font-bold text-white mb-4"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {data.title}
                                        </motion.h1>
                                        {currentNode && (
                                            <motion.p
                                                className="text-lg text-white/60"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                {currentBranch.title}
                                            </motion.p>
                                        )}
                                    </div>

                                    {/* Content Card */}
                                    <motion.div
                                        className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <p className="text-xl text-white/90 leading-relaxed mb-8">
                                            {data.explanation}
                                        </p>

                                        <div
                                            className="p-5 rounded-xl mb-8"
                                            style={{ backgroundColor: `${currentBranch.color}20` }}
                                        >
                                            <p className="text-white/60 text-sm uppercase tracking-wider mb-2">💡 Ví dụ thực tiễn</p>
                                            <p className="text-white/80">{data.example}</p>
                                        </div>

                                        {/* Key Point */}
                                        <motion.div
                                            className="text-center py-6 border-t border-white/10"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <p className="text-sm text-white/40 uppercase tracking-wider mb-2">⭐ Ý chính cần nhớ</p>
                                            <p
                                                className="text-2xl font-bold"
                                                style={{ color: currentBranch.color }}
                                            >
                                                {data.keyPoint}
                                            </p>
                                        </motion.div>

                                        {/* Quiz prompt */}
                                        {currentQuiz && (
                                            <motion.div
                                                className="mt-6 text-center"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.7 }}
                                            >
                                                <Button
                                                    onClick={() => setShowQuiz(true)}
                                                    className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/50"
                                                >
                                                    <HelpCircle className="w-4 h-4 mr-2" />
                                                    📝 Làm quiz để kiểm tra kiến thức
                                                </Button>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Navigation Footer */}
                    <div className="flex items-center justify-between p-6 border-t border-white/10">
                        <Button
                            variant="ghost"
                            onClick={handlePrevious}
                            disabled={currentBranchIndex === 0 && currentNodeIndex === -1}
                            className="text-white/60 hover:text-white disabled:opacity-30"
                        >
                            <ChevronLeft className="w-5 h-5 mr-2" />
                            Trước
                        </Button>

                        {/* Progress dots */}
                        <div className="flex items-center gap-2">
                            {mindMapData.branches.map((branch, i) => (
                                <div
                                    key={branch.id}
                                    className="flex items-center gap-1"
                                >
                                    <button
                                        onClick={() => { setCurrentBranchIndex(i); setCurrentNodeIndex(-1); }}
                                        className={`w-3 h-3 rounded-full transition-all ${i === currentBranchIndex ? "scale-125" : "opacity-50 hover:opacity-100"
                                            }`}
                                        style={{ backgroundColor: branch.color }}
                                    />
                                </div>
                            ))}
                        </div>

                        <Button
                            variant="ghost"
                            onClick={handleNext}
                            disabled={currentBranchIndex === mindMapData.branches.length - 1 && currentNodeIndex === currentBranch.nodes.length - 1}
                            className="text-white/60 hover:text-white disabled:opacity-30"
                        >
                            Tiếp
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>

                    {/* Keyboard hints */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs">
                        ← → để di chuyển • Q để mở quiz • F để fullscreen • ESC để thoát
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PresentationMode;
