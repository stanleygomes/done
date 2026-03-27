import { Trash2, Maximize2, ChevronRight } from "lucide-react";
import type { Task } from "@models/task";

interface TaskItemActionsProps {
  task: Task;
  onDelete: (id: string) => void;
  onEnterZenMode?: (id: string) => void;
  onOpenDrawer: (task: Task) => void;
}

export function TaskItemActions({
  task,
  onDelete,
  onEnterZenMode,
  onOpenDrawer,
}: TaskItemActionsProps) {
  return (
    <>
      <button
        type="button"
        className="mt-1 rounded-base border-2 border-black bg-[#ff8fab] p-1.5 shadow-shadow transition-all hover:bg-[#ff6b8e] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shrink-0"
        onClick={() => onDelete(task.id)}
        title="Delete task"
      >
        <Trash2 size={16} />
      </button>

      {onEnterZenMode && (
        <button
          type="button"
          className="shrink-0 rounded-base border-2 border-black bg-[#a7f3d0] p-1.5 text-black shadow-shadow transition-all hover:bg-[#86efac] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          onClick={() => onEnterZenMode(task.id)}
          aria-label="Enter Zen Mode"
          title="Enter Zen Mode"
        >
          <Maximize2 size={16} />
        </button>
      )}

      <button
        type="button"
        className="shrink-0 rounded-base border-2 border-black bg-white p-1.5 text-gray-400 shadow-shadow transition-all hover:bg-[#ffe066] hover:text-black active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        onClick={() => onOpenDrawer(task)}
        aria-label="Open task details"
        title="Open Task Details"
      >
        <ChevronRight size={16} />
      </button>
    </>
  );
}
