import { Task } from "@paul/entities";
import { PinnedTaskCard } from "./pinned-task-card";

interface PinnedTasksProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onUnpin: (id: string) => void;
  onOpenDrawer: (task: Task) => void;
}

export function PinnedTasks({
  tasks,
  onToggle,
  onUnpin,
  onOpenDrawer,
}: PinnedTasksProps) {
  if (tasks.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          Destaques
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto py-6">
        {tasks.map((task) => {
          return (
            <PinnedTaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onUnpin={onUnpin}
              onOpenDrawer={onOpenDrawer}
            />
          );
        })}
      </div>
    </div>
  );
}
