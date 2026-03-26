import { useEffect, useRef } from "react";
import type { Task } from "@models/task";
import { useDebouncedSave } from "../hooks/use-debounced-save";
import { AutoResizeTextarea } from "./auto-resize-textarea";
import { TaskToggle } from "./task-toggle";

interface TaskDrawerContentProps {
  task: Task;
  isEditing: boolean;
  editingContent: string;
  onEditingContentChange: (value: string) => void;
  onToggle: (id: string) => void;
  onStartEdit: (task: Task) => void;
  onUpdateEdit: (id: string, content: string) => void;
  onCloseEdit: () => void;
  onDelete: (id: string) => void;
}

export function TaskDrawerContent({
  task,
  isEditing,
  editingContent,
  onEditingContentChange,
  onToggle,
  onStartEdit,
  onUpdateEdit,
  onCloseEdit,
  onDelete,
}: TaskDrawerContentProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { save, flush } = useDebouncedSave(600);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  function handleChange(value: string) {
    onEditingContentChange(value);
    save(() => {
      onUpdateEdit(task.id, value);
    });
  }

  function handleBlur() {
    flush(() => {
      onUpdateEdit(task.id, editingContent);
    });
    onCloseEdit();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full">
        {isEditing ? (
          <AutoResizeTextarea
            ref={inputRef}
            value={editingContent}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            rows={1}
            className="w-full resize-none overflow-hidden rounded-base border-2 border-black bg-[#fffaf0] px-3 py-2 font-black leading-tight outline-none focus:bg-white transition-all shadow-shadow"
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
      </div>

      <div className="flex items-center gap-3 rounded-base border-2 border-black bg-white p-4 shadow-shadow">
        <TaskToggle task={task} onToggle={onToggle} className="mt-0" />
        <span className="text-lg font-bold">
          {task.done ? "Completed" : "Mark as completed"}
        </span>
      </div>

      {/* Placeholder for future functionalities below */}

      <div className="mt-4">
        <button
          type="button"
          className="w-full rounded-base border-2 border-black bg-[#ff8fab] py-3 text-base font-bold shadow-shadow transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-[#ff7597]"
          onClick={() => onDelete(task.id)}
        >
          Delete Task
        </button>
      </div>
    </div>
  );
}
