import { forwardRef } from "react";
import type { Task } from "@models/task";
import { AutoResizeTextarea } from "../../components/auto-resize-textarea";

interface TaskTitleProps {
  task: Task;
  isEditing: boolean;
  editingContent: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  onStartEdit: (task: Task) => void;
}

export const TaskTitle = forwardRef<HTMLTextAreaElement, TaskTitleProps>(
  ({ task, isEditing, editingContent, onChange, onBlur, onStartEdit }, ref) => {
    return (
      <>
        {isEditing ? (
          <AutoResizeTextarea
            ref={ref}
            value={editingContent}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            rows={1}
            className="w-full resize-none overflow-hidden rounded-base border-2 border-black bg-[#fffaf0] px-3 py-2 font-black leading-tight outline-none focus:bg-white transition-all"
          />
        ) : (
          <h2
            className={`cursor-text whitespace-pre-wrap break-words py-2 font-black leading-tight border-2 border-transparent ${
              task.done ? "text-gray-500 line-through" : "text-black"
            }`}
            onClick={() => !task.done && onStartEdit(task)}
          >
            {task.content}
          </h2>
        )}
      </>
    );
  },
);

TaskTitle.displayName = "TaskTitle";
