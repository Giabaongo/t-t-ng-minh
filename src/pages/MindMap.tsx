import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Home,
    ZoomIn,
    ZoomOut,
    Maximize2,
    RotateCcw,
    Play,
    Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MindMapCanvas from "@/components/mindmap/MindMapCanvas";
import DetailPanel from "@/components/mindmap/DetailPanel";
import PresentationMode from "@/components/mindmap/PresentationMode";
import { Branch, MindMapNode } from "@/data/mindMapData";

const MindMap = () => {
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
    const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isPresentationMode, setIsPresentationMode] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle wheel zoom
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                setZoom(z => Math.min(Math.max(0.5, z + delta), 2));
            }
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, []);

    const handleSelectBranch = useCallback((branch: Branch) => {
        setSelectedBranch(branch);
        setSelectedNode(null);
        setIsPanelOpen(true);
    }, []);

    const handleSelectNode = useCallback((branch: Branch, node: MindMapNode) => {
        setSelectedBranch(branch);
        setSelectedNode(node);
        setIsPanelOpen(true);
    }, []);

    const handleClosePanel = useCallback(() => {
        setIsPanelOpen(false);
    }, []);

    const handleZoomIn = () => setZoom(z => Math.min(z + 0.2, 2));
    const handleZoomOut = () => setZoom(z => Math.max(z - 0.2, 0.5));
    const handleReset = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

    const selectedId = selectedNode?.id || selectedBranch?.id || null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Home className="w-5 h-5" />
                            <span className="hidden sm:inline">Trang chủ</span>
                        </Link>
                        <span className="text-muted-foreground/50">|</span>
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-gold fill-gold" />
                            <h1 className="font-bold text-foreground">Mind Map</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Zoom controls */}
                        <div className="hidden sm:flex items-center gap-1 mr-2">
                            <Button variant="ghost" size="icon" onClick={handleZoomOut} title="Thu nhỏ">
                                <ZoomOut className="w-4 h-4" />
                            </Button>
                            <span className="text-xs text-muted-foreground w-12 text-center">
                                {Math.round(zoom * 100)}%
                            </span>
                            <Button variant="ghost" size="icon" onClick={handleZoomIn} title="Phóng to">
                                <ZoomIn className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={handleReset} title="Reset">
                                <RotateCcw className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Presentation mode button */}
                        <Button
                            onClick={() => setIsPresentationMode(true)}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                        >
                            <Play className="w-4 h-4" />
                            <span className="hidden sm:inline">Thuyết trình</span>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Page Title */}
            <div className="pt-20 pb-4 text-center">
                <motion.h1
                    className="text-2xl md:text-3xl font-bold text-foreground"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Mind Map – Tư tưởng Hồ Chí Minh về CNXH
                </motion.h1>
                <motion.p
                    className="text-muted-foreground mt-2 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Click vào các nhánh để xem chi tiết • Ctrl + Scroll để zoom
                </motion.p>
            </div>

            {/* Mind Map Canvas */}
            <div
                ref={containerRef}
                className="relative w-full overflow-hidden"
                style={{ height: "calc(100vh - 160px)" }}
            >
                <motion.div
                    className="w-full h-full flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <MindMapCanvas
                        onSelectBranch={handleSelectBranch}
                        onSelectNode={handleSelectNode}
                        selectedId={selectedId}
                        zoom={zoom}
                        pan={pan}
                    />
                </motion.div>

                {/* Mobile zoom controls */}
                <div className="sm:hidden fixed bottom-4 left-4 flex flex-col gap-2 z-30">
                    <Button variant="outline" size="icon" onClick={handleZoomIn} className="bg-background">
                        <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleZoomOut} className="bg-background">
                        <ZoomOut className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Detail Panel */}
            <DetailPanel
                isOpen={isPanelOpen}
                onClose={handleClosePanel}
                branch={selectedBranch}
                node={selectedNode}
            />

            {/* Presentation Mode */}
            <PresentationMode
                isOpen={isPresentationMode}
                onClose={() => setIsPresentationMode(false)}
            />

            {/* Backdrop when panel is open */}
            {isPanelOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/20 z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClosePanel}
                />
            )}
        </div>
    );
};

export default MindMap;
