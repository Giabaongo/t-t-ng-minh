import { motion } from "framer-motion";
import { MindMapNode as MindMapNodeType } from "@/data/mindMapData";

interface MindMapNodeProps {
    node: MindMapNodeType;
    color: string;
    isSelected: boolean;
    onClick: () => void;
    position: { x: number; y: number };
    delay?: number;
}

const MindMapNodeComponent = ({
    node,
    color,
    isSelected,
    onClick,
    position,
    delay = 0
}: MindMapNodeProps) => {
    return (
        <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, type: "spring", stiffness: 200 }}
        >
            <motion.rect
                x={position.x - 70}
                y={position.y - 18}
                width={140}
                height={36}
                rx={18}
                fill={isSelected ? color : `${color}20`}
                stroke={color}
                strokeWidth={isSelected ? 3 : 2}
                className="cursor-pointer"
                onClick={onClick}
                whileHover={{
                    scale: 1.08,
                    filter: "brightness(1.1)",
                    transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
            />
            <text
                x={position.x}
                y={position.y + 5}
                textAnchor="middle"
                fill={isSelected ? "white" : "currentColor"}
                fontSize={11}
                fontWeight={500}
                className="pointer-events-none select-none"
                style={{ fontFamily: "Inter, sans-serif" }}
            >
                {node.title.length > 18 ? node.title.slice(0, 18) + "..." : node.title}
            </text>
        </motion.g>
    );
};

export default MindMapNodeComponent;
