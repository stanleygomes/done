import type { Task } from "@models/task";
import { TaskToggle } from "../../components/task-toggle";

interface TaskStatusToggleProps {
  task: Task;
  onToggle: (id: string) => void;
}

export function TaskStatusToggle({ task, onToggle }: TaskStatusToggleProps) {
  return (
    <>
      <TaskToggle task={task} onToggle={onToggle} className="mt-0" />
      <span className="text-lg font-bold">
        {task.done ? "Completed" : "Mark as completed"}
      </span>
    </>
  );
}
