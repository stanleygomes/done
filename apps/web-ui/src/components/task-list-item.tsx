import { Reorder, useDragControls } from "framer-motion";
import { ChevronRight, GripVertical } from "lucide-react";
import type { Task } from "@models/task";
import { TaskItemContent } from "./task-item-content";

interface TaskListItemProps {
  task: Task;
  isEditing: boolean;
  editingContent: string;
  onEditingContentChange: (value: string) => void;
  onToggle: (id: string) => void;
  onStartEdit: (task: Task) => void;
  onUpdateEdit: (id: string, content: string) => void;
  onCloseEdit: () => void;
  onDelete: (id: string) => void;
  onOpenDrawer: (task: Task) => void;
}

export function TaskListItem({
  task,
  isEditing,
  editingContent,
  onEditingContentChange,
  onToggle,
  onStartEdit,
  onUpdateEdit,
  onCloseEdit,
  onDelete,
  onOpenDrawer,
}: TaskListItemProps) {
  const controls = useDragControls();
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.done,
  ).length;
  const hasDueDate = Boolean(task.dueDate);
  const dueDateLabel = hasDueDate
    ? `${task.dueDate}${task.dueTime ? ` ${task.dueTime}` : ""}`
    : "";

  return (
    <Reorder.Item
      value={task}
      dragListener={false}
      dragControls={controls}
      className="rounded-base border-2 border-black bg-white p-4 shadow-shadow"
    >
      <div className="flex items-start gap-3">
        <div
          className="mt-1.5 shrink-0 touch-none cursor-grab text-gray-400 active:cursor-grabbing hover:text-black"
          onPointerDown={(e) => controls.start(e)}
          tabIndex={0}
          role="button"
          aria-label="Drag to reorder task"
        >
          <GripVertical size={16} />
        </div>

        <div className="flex-1 min-w-0">
          <TaskItemContent
            task={task}
            isEditing={isEditing}
            editingContent={editingContent}
            onEditingContentChange={onEditingContentChange}
            onToggle={onToggle}
            onStartEdit={onStartEdit}
            onUpdateEdit={onUpdateEdit}
            onCloseEdit={onCloseEdit}
            onDelete={onDelete}
          />

          <aside
            className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold"
            aria-label="Task metadata"
          >
            {task.important && (
              <span
                title="Important task"
                className="rounded-base border-2 border-black bg-[#ffe066] px-2 py-1"
              >
                ⭐
              </span>
            )}
            {hasDueDate && (
              <span
                className="rounded-base border-2 border-black bg-white px-2 py-1"
                aria-label={`Due date: ${dueDateLabel}`}
              >
                ⏰ {dueDateLabel}
              </span>
            )}
            {task.url && (
              <span
                title={task.url}
                className="rounded-base border-2 border-black bg-white px-2 py-1"
              >
                🌐
              </span>
            )}
            {task.notes.trim() && (
              <span
                title={task.notes}
                className="rounded-base border-2 border-black bg-white px-2 py-1"
              >
                📝
              </span>
            )}
            {task.subtasks.length > 0 && (
              <span
                className="rounded-base border-2 border-black bg-white px-2 py-1"
                aria-label={`Subtasks completed: ${completedSubtasks} of ${task.subtasks.length}`}
              >
                ✅ {completedSubtasks} / {task.subtasks.length}
              </span>
            )}
          </aside>
        </div>

        <button
          type="button"
          className="mt-1 shrink-0 rounded-base border-2 border-black bg-white p-1 text-gray-400 shadow-shadow transition-all hover:bg-[#ffe066] hover:text-black active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          onClick={() => onOpenDrawer(task)}
          aria-label="Open task details"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </Reorder.Item>
  );
}
