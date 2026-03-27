import { TaskImportantToggle } from "../../components/task-important-toggle";

interface TaskImportantProps {
  isImportant: boolean;
  onToggle: () => void;
}

export function TaskImportant({ isImportant, onToggle }: TaskImportantProps) {
  return (
    <div className="mb-3 flex flex-col items-start justify-between">
      <label className="text-sm font-black" htmlFor="important-task">
        Is it an important task?
      </label>
      <TaskImportantToggle
        isImportant={isImportant}
        onToggle={onToggle}
        className="bg-[#fffaf0]"
      />
    </div>
  );
}
