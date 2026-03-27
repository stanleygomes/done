import { useEffect, useRef } from "react";
import type { Task } from "@models/task";
import { FormField } from "./form-field";

interface TaskSubtasksProps {
  subtasks: Task["subtasks"];
  onAddSubtask: () => void;
  onToggleSubtask: (id: string) => void;
  onUpdateSubtaskTitle: (id: string, title: string) => void;
}

export function TaskSubtasks({
  subtasks,
  onAddSubtask,
  onToggleSubtask,
  onUpdateSubtaskTitle,
}: TaskSubtasksProps) {
  const lastSubtaskCount = useRef(subtasks.length);
  const listContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (subtasks.length > lastSubtaskCount.current) {
      const inputs = listContainerRef.current?.querySelectorAll("input");
      if (inputs && inputs.length > 0) {
        const lastInput = inputs[inputs.length - 1] as HTMLInputElement;
        lastInput.focus();
      }
    }
    lastSubtaskCount.current = subtasks.length;
  }, [subtasks.length]);

  return (
    <FormField
      label="Subtasks"
      action={
        <button
          type="button"
          className="rounded-base border-2 border-black bg-[#ffe066] px-2 py-1 text-xs font-bold shadow-shadow transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
          onClick={onAddSubtask}
        >
          Add subtask
        </button>
      }
    >
      <div ref={listContainerRef} className="flex flex-col gap-2">
        {subtasks.map((subtask) => (
          <div key={subtask.id} className="flex items-center gap-2">
            <button
              type="button"
              className={`h-7 w-7 shrink-0 rounded-base border-2 border-black text-xs font-black ${
                subtask.done ? "bg-[#a7f3d0]" : "bg-white"
              }`}
              onClick={() => onToggleSubtask(subtask.id)}
              aria-label={
                subtask.done
                  ? "Mark subtask as not done"
                  : "Mark subtask as done"
              }
            >
              {subtask.done ? "✓" : ""}
            </button>
            <input
              value={subtask.title}
              onChange={(e) => onUpdateSubtaskTitle(subtask.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddSubtask();
                }
              }}
              className="w-full rounded-base border-2 border-black bg-[#fffaf0] px-2 py-1 text-sm outline-none"
              placeholder="Subtask title"
            />
          </div>
        ))}
      </div>
    </FormField>
  );
}
