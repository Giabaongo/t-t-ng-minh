import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { mindMapData, Branch, MindMapNode } from "@/data/mindMapData";
import MindMapNodeComponent from "./MindMapNode";

interface MindMapCanvasProps {
    onSelectBranch: (branch: Branch) => void;
    onSelectNode: (branch: Branch, node: MindMapNode) => void;
    selectedId: string | null;
    expandedBranchId: string | null;
    zoom: number;
    pan: { x: number; y: number };
}

const MindMapCanvas = ({
    onSelectBranch,
    onSelectNode,
    selectedId,
    expandedBranchId,
    zoom,
    pan
}: MindMapCanvasProps) => {
    const [hoveredBranch, setHoveredBranch] = useState<string | null>(null);

    const centerX = 500;
    const centerY = 350;
    const branchRadius = 160;
    const nodeDistance = 160; // Distance from branch to nodes (increased for better spacing)
    const nodeWidth = 140;
    const nodeHeight = 36;
    const branchWidth = 150;
    const branchHeight = 56;
    const centerRadius = 60; // Center node radius

    // Calculate branch positions in a circle
    const getBranchPosition = (index: number, total: number) => {
        const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
        return {
            x: centerX + Math.cos(angle) * branchRadius,
            y: centerY + Math.sin(angle) * branchRadius,
            angle
        };
    };

    // Calculate node positions - spread in a wide fan from the branch
    const getNodePosition = (branchPos: { x: number; y: number; angle?: number }, nodeIndex: number, totalNodes: number, branchIndex: number) => {
        // Get the outward angle from center through this branch
        const outwardAngle = (branchIndex * 2 * Math.PI) / 6 - Math.PI / 2;

        // Wide spread: 100 degrees total (about 50 degrees on each side)
        const totalSpread = (100 * Math.PI) / 180; // 100 degrees in radians

        // Calculate offset for each node: evenly spread across the fan
        let nodeAngleOffset: number;
        if (totalNodes === 1) {
            nodeAngleOffset = 0;
        } else if (totalNodes === 2) {
            nodeAngleOffset = (nodeIndex === 0 ? -1 : 1) * (totalSpread / 3);
        } else {
            // For 3 nodes: -50°, 0°, +50° (relative to outward direction)
            nodeAngleOffset = (nodeIndex - 1) * (totalSpread / 2);
        }

        const finalAngle = outwardAngle + nodeAngleOffset;

        // Increased base distance for better spacing
        const distance = nodeDistance + (Math.abs(nodeAngleOffset) > 0.3 ? 20 : 0);

        return {
            x: branchPos.x + Math.cos(finalAngle) * distance,
            y: branchPos.y + Math.sin(finalAngle) * distance,
            angle: finalAngle // Return angle for edge calculation
        };
    };

    // Calculate the point on node edge closest to the branch
    const getNodeEdgePoint = (nodeCenter: { x: number; y: number; angle?: number }, branchPos: { x: number; y: number }) => {
        // Direction from node center to branch
        const dx = branchPos.x - nodeCenter.x;
        const dy = branchPos.y - nodeCenter.y;
        const length = Math.sqrt(dx * dx + dy * dy);

        if (length === 0) return { x: nodeCenter.x, y: nodeCenter.y };

        // Normalize direction
        const dirX = dx / length;
        const dirY = dy / length;

        // Node dimensions (half sizes)
        const halfWidth = nodeWidth / 2;  // 70
        const halfHeight = nodeHeight / 2;  // 18

        // Calculate intersection with rectangle edge
        // We need to find t such that the ray from center hits the edge
        let t: number;

        if (Math.abs(dirX) > 0.001 && Math.abs(dirY) > 0.001) {
            // General case: calculate t for both x and y edges
            const tX = halfWidth / Math.abs(dirX);
            const tY = halfHeight / Math.abs(dirY);
            t = Math.min(tX, tY);
        } else if (Math.abs(dirX) > 0.001) {
            // Mostly horizontal
            t = halfWidth / Math.abs(dirX);
        } else {
            // Mostly vertical
            t = halfHeight / Math.abs(dirY);
        }

        return {
            x: nodeCenter.x + dirX * t,
            y: nodeCenter.y + dirY * t
        };
    };

    // Calculate the point on branch node edge closest to the center
    const getBranchEdgePoint = (branchPos: { x: number; y: number }, fromX: number, fromY: number) => {
        // Direction from branch to center
        const dx = fromX - branchPos.x;
        const dy = fromY - branchPos.y;
        const length = Math.sqrt(dx * dx + dy * dy);

        if (length === 0) return { x: branchPos.x, y: branchPos.y };

        // Normalize direction
        const dirX = dx / length;
        const dirY = dy / length;

        // Branch node dimensions (half sizes)
        const halfWidth = branchWidth / 2;  // 75
        const halfHeight = branchHeight / 2;  // 28

        // Calculate intersection with rounded rectangle edge
        let t: number;

        if (Math.abs(dirX) > 0.001 && Math.abs(dirY) > 0.001) {
            const tX = halfWidth / Math.abs(dirX);
            const tY = halfHeight / Math.abs(dirY);
            t = Math.min(tX, tY);
        } else if (Math.abs(dirX) > 0.001) {
            t = halfWidth / Math.abs(dirX);
        } else {
            t = halfHeight / Math.abs(dirY);
        }

        return {
            x: branchPos.x + dirX * t,
            y: branchPos.y + dirY * t
        };
    };

    // Calculate point on center circle edge
    const getCenterEdgePoint = (branchPos: { x: number; y: number }) => {
        const dx = branchPos.x - centerX;
        const dy = branchPos.y - centerY;
        const length = Math.sqrt(dx * dx + dy * dy);

        if (length === 0) return { x: centerX, y: centerY };

        return {
            x: centerX + (dx / length) * centerRadius,
            y: centerY + (dy / length) * centerRadius
        };
    };

    return (
        <div
            className="w-full h-full flex items-center justify-center"
            style={{
                transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                transformOrigin: "center center",
                transition: "transform 0.1s ease-out"
            }}
        >
            <motion.svg
                viewBox="0 0 1000 700"
                className="w-full h-full max-w-[1000px]"
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
                    // Calculate edge points for both center and branch
                    const centerEdge = getCenterEdgePoint(pos);
                    const branchEdge = getBranchEdgePoint(pos, centerX, centerY);
                    return (
                        <motion.line
                            key={`line-${branch.id}`}
                            x1={centerEdge.x}
                            y1={centerEdge.y}
                            x2={branchEdge.x}
                            y2={branchEdge.y}
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

                {/* Connection lines from branches to nodes - only show when expanded */}
                {mindMapData.branches.map((branch, branchIndex) => {
                    if (expandedBranchId !== branch.id) return null;
                    const branchPos = getBranchPosition(branchIndex, mindMapData.branches.length);
                    return branch.nodes.map((node, nodeIndex) => {
                        const nodePos = getNodePosition(branchPos, nodeIndex, branch.nodes.length, branchIndex);
                        // Calculate edge points for both branch and node
                        const branchEdgeToNode = getBranchEdgePoint(branchPos, nodePos.x, nodePos.y);
                        const nodeEdge = getNodeEdgePoint(nodePos, branchPos);
                        return (
                            <motion.line
                                key={`node-line-${node.id}`}
                                x1={branchEdgeToNode.x}
                                y1={branchEdgeToNode.y}
                                x2={nodeEdge.x}
                                y2={nodeEdge.y}
                                stroke={branch.color}
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeDasharray="4 2"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.6 }}
                                transition={{ duration: 0.3, delay: nodeIndex * 0.1 }}
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

                {/* Child nodes - only show when branch is expanded */}
                {mindMapData.branches.map((branch, branchIndex) => {
                    if (expandedBranchId !== branch.id) return null;
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
                                delay={nodeIndex * 0.1}
                            />
                        );
                    });
                })}
            </motion.svg>
        </div>
    );
};

export default MindMapCanvas;
