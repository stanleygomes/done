import { GripVertical } from "lucide-react";
import { DragControls } from "framer-motion";

interface DragHandleProps {
  controls: DragControls;
}

export function DragHandle({ controls }: DragHandleProps) {
  return (
    <div
      className="mt-1.5 shrink-0 touch-none cursor-grab text-gray-400 active:cursor-grabbing hover:text-black"
      onPointerDown={(e) => controls.start(e)}
      tabIndex={0}
      role="button"
      aria-label="Drag to reorder task"
    >
      <GripVertical size={16} />
    </div>
  );
}
