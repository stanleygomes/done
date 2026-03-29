import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Check, Trash2 } from "lucide-react";

interface SwipeableActionItemProps {
  children: React.ReactNode;
  onComplete?: () => void;
  onDelete?: () => void;
  threshold?: number;
  className?: string;
}

/**
 * SwipeableActionItem Component
 *
 * High-performance (60 FPS) dual-action swipe gesture.
 * Swipe Right (Green) -> Complete
 * Swipe Left (Red) -> Delete
 */
export function SwipeableActionItem({
  children,
  onComplete,
  onDelete,
  threshold = 80,
  className = "",
}: SwipeableActionItemProps) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Visibility and colors for RIGHT swipe (Complete)
  const completeOpacity = useTransform(x, [0, threshold], [0, 1]);
  const completeScale = useTransform(x, [0, threshold], [0.5, 1.2]);
  const completeBg = useTransform(
    x,
    [0, threshold],
    ["rgba(34, 197, 94, 0)", "rgba(34, 197, 94, 1)"],
  );

  // Visibility and colors for LEFT swipe (Delete)
  const deleteOpacity = useTransform(x, [0, -threshold], [0, 1]);
  const deleteScale = useTransform(x, [0, -threshold], [0.5, 1.2]);
  const deleteBg = useTransform(
    x,
    [0, -threshold],
    ["rgba(239, 68, 68, 0)", "rgba(239, 68, 68, 1)"],
  );

  const handleDragEnd = (_: any, info: any) => {
    // Determine the direction and if the threshold was met
    if (info.offset.x >= threshold && onComplete) {
      // Right Swipe -> Complete
      onComplete();
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
    } else if (info.offset.x <= -threshold && onDelete) {
      // Left Swipe -> Delete
      onDelete();
      // Snap back to reveal background/modal trigger
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
    } else {
      // Snap back to original position
      animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-base group ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      {/* Background Revealed on Right Swipe (Complete) */}
      <motion.div
        style={{
          opacity: completeOpacity,
          backgroundColor: completeBg,
          translateZ: 0,
        }}
        className="absolute inset-0 flex items-center pl-6 pointer-events-none"
      >
        <motion.div style={{ scale: completeScale }}>
          <Check className="text-white w-6 h-6" strokeWidth={3} />
        </motion.div>
      </motion.div>

      {/* Background Revealed on Left Swipe (Delete) */}
      <motion.div
        style={{
          opacity: deleteOpacity,
          backgroundColor: deleteBg,
          translateZ: 0,
        }}
        className="absolute inset-0 flex items-center justify-end pr-6 pointer-events-none"
      >
        <motion.div style={{ scale: deleteScale }}>
          <Trash2 className="text-white w-6 h-6" strokeWidth={3} />
        </motion.div>
      </motion.div>

      {/* Main Draggable Content */}
      <motion.div
        drag="x"
        dragConstraints={{
          left: onDelete ? -200 : 0,
          right: onComplete ? 200 : 0,
        }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        style={{
          x,
          willChange: "transform",
          translateZ: 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative z-10 cursor-grab active:cursor-grabbing bg-inherit"
      >
        {children}
      </motion.div>
    </div>
  );
}
