import { Check } from "lucide-react";
import type { Task } from "@models/task";

interface ZenSubtasksProps {
  subtasks: Task["subtasks"];
}

export function ZenSubtasks({ subtasks }: ZenSubtasksProps) {
  if (subtasks.length === 0) return null;

  return (
    <div className="w-full rounded-base border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="font-black text-xl mb-4 border-b-2 border-black pb-2">
        Subtasks
      </h3>
      <div className="flex flex-col gap-3">
        {subtasks.map((subtask) => (
          <div key={subtask.id} className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-base border-2 border-black shrink-0 ${
                subtask.done ? "bg-[#a7f3d0]" : "bg-gray-100"
              }`}
            >
              {subtask.done && <Check className="w-4 h-4" strokeWidth={3} />}
            </div>
            <span
              className={`font-bold text-lg ${
                subtask.done ? "text-gray-400 line-through" : "text-black"
              }`}
            >
              {subtask.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
