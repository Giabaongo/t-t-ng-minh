import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { mindMapData, Branch, MindMapNode } from "@/data/mindMapData";
import MindMapNodeComponent from "./MindMapNode";

interface MindMapCanvasProps {
    onSelectBranch: (branch: Branch) => void;
    onSelectNode: (branch: Branch, node: MindMapNode) => void;
    selectedId: string | null;
    zoom: number;
    pan: { x: number; y: number };
}

const MindMapCanvas = ({
    onSelectBranch,
    onSelectNode,
    selectedId,
    zoom,
    pan
}: MindMapCanvasProps) => {
    const [hoveredBranch, setHoveredBranch] = useState<string | null>(null);

    const centerX = 500;
    const centerY = 350;
    const branchRadius = 200;
    const nodeRadius = 100;

    // Calculate branch positions in a circle
    const getBranchPosition = (index: number, total: number) => {
        const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
        return {
            x: centerX + Math.cos(angle) * branchRadius,
            y: centerY + Math.sin(angle) * branchRadius
        };
    };

    // Calculate node positions around a branch
    const getNodePosition = (branchPos: { x: number; y: number }, nodeIndex: number, totalNodes: number, branchIndex: number) => {
        const baseAngle = (branchIndex * 2 * Math.PI) / 6 - Math.PI / 2;
        const spreadAngle = Math.PI / 4; // 45 degrees spread
        const nodeAngle = baseAngle + (nodeIndex - (totalNodes - 1) / 2) * (spreadAngle / totalNodes);

        return {
            x: branchPos.x + Math.cos(nodeAngle) * nodeRadius,
            y: branchPos.y + Math.sin(nodeAngle) * nodeRadius
        };
    };

    return (
        <motion.svg
            viewBox="0 0 1000 700"
            className="w-full h-full"
            style={{
                transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                transformOrigin: "center center"
            }}
        >
            <defs>
                {mindMapData.branches.map((branch) => (
                    <linearGradient
                        key={`gradient-${branch.id}`}
                        id={`gradient-${branch.id}`}
                        x1="0%" y1="0%" x2="100%" y2="100%"
                    >
                        <stop offset="0%" stopColor={branch.color} stopOpacity={0.8} />
                        <stop offset="100%" stopColor={branch.color} stopOpacity={0.4} />
                    </linearGradient>
                ))}
            </defs>

            {/* Connection lines from center to branches */}
            {mindMapData.branches.map((branch, i) => {
                const pos = getBranchPosition(i, mindMapData.branches.length);
                return (
                    <motion.line
                        key={`line-${branch.id}`}
                        x1={centerX}
                        y1={centerY}
                        x2={pos.x}
                        y2={pos.y}
                        stroke={branch.color}
                        strokeWidth={3}
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                        opacity={hoveredBranch && hoveredBranch !== branch.id ? 0.3 : 1}
                    />
                );
            })}

            {/* Connection lines from branches to nodes */}
            {mindMapData.branches.map((branch, branchIndex) => {
                const branchPos = getBranchPosition(branchIndex, mindMapData.branches.length);
                return branch.nodes.map((node, nodeIndex) => {
                    const nodePos = getNodePosition(branchPos, nodeIndex, branch.nodes.length, branchIndex);
                    return (
                        <motion.line
                            key={`node-line-${node.id}`}
                            x1={branchPos.x}
                            y1={branchPos.y}
                            x2={nodePos.x}
                            y2={nodePos.y}
                            stroke={branch.color}
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeDasharray="4 2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.8 + branchIndex * 0.1 + nodeIndex * 0.05, duration: 0.3 }}
                            opacity={hoveredBranch && hoveredBranch !== branch.id ? 0.2 : 0.6}
                        />
                    );
                });
            })}

            {/* Center node */}
            <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            >
                <motion.circle
                    cx={centerX}
                    cy={centerY}
                    r={70}
                    fill="url(#centerGradient)"
                    className="drop-shadow-xl"
                    animate={{
                        boxShadow: ["0 0 20px rgba(220, 38, 38, 0.5)", "0 0 40px rgba(220, 38, 38, 0.8)", "0 0 20px rgba(220, 38, 38, 0.5)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <defs>
                    <radialGradient id="centerGradient">
                        <stop offset="0%" stopColor="#DC2626" />
                        <stop offset="100%" stopColor="#991B1B" />
                    </radialGradient>
                </defs>
                <text
                    x={centerX}
                    y={centerY - 12}
                    textAnchor="middle"
                    fill="white"
                    fontSize={11}
                    fontWeight={700}
                    className="select-none"
                >
                    {mindMapData.center.title}
                </text>
                <text
                    x={centerX}
                    y={centerY + 8}
                    textAnchor="middle"
                    fill="#FCD34D"
                    fontSize={10}
                    fontWeight={600}
                    className="select-none"
                >
                    {mindMapData.center.subtitle}
                </text>
            </motion.g>

            {/* Branch nodes */}
            {mindMapData.branches.map((branch, i) => {
                const pos = getBranchPosition(i, mindMapData.branches.length);
                return (
                    <motion.g
                        key={branch.id}
                        onMouseEnter={() => setHoveredBranch(branch.id)}
                        onMouseLeave={() => setHoveredBranch(null)}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                    >
                        <motion.rect
                            x={pos.x - 75}
                            y={pos.y - 28}
                            width={150}
                            height={56}
                            rx={28}
                            fill={selectedId === branch.id ? branch.color : `${branch.color}25`}
                            stroke={branch.color}
                            strokeWidth={selectedId === branch.id ? 4 : 3}
                            className="cursor-pointer drop-shadow-lg"
                            onClick={() => onSelectBranch(branch)}
                            whileHover={{
                                scale: 1.1,
                                filter: "brightness(1.1)",
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                        />
                        <text
                            x={pos.x}
                            y={pos.y - 6}
                            textAnchor="middle"
                            fontSize={22}
                            className="pointer-events-none select-none"
                        >
                            {branch.icon}
                        </text>
                        <text
                            x={pos.x}
                            y={pos.y + 16}
                            textAnchor="middle"
                            fill={selectedId === branch.id ? "white" : "currentColor"}
                            fontSize={12}
                            fontWeight={600}
                            className="pointer-events-none select-none"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            {branch.title}
                        </text>
                    </motion.g>
                );
            })}

            {/* Child nodes */}
            {mindMapData.branches.map((branch, branchIndex) => {
                const branchPos = getBranchPosition(branchIndex, mindMapData.branches.length);
                return branch.nodes.map((node, nodeIndex) => {
                    const nodePos = getNodePosition(branchPos, nodeIndex, branch.nodes.length, branchIndex);
                    return (
                        <MindMapNodeComponent
                            key={node.id}
                            node={node}
                            color={branch.color}
                            isSelected={selectedId === node.id}
                            onClick={() => onSelectNode(branch, node)}
                            position={nodePos}
                            delay={1 + branchIndex * 0.1 + nodeIndex * 0.05}
                        />
                    );
                });
            })}
        </motion.svg>
    );
};

export default MindMapCanvas;
