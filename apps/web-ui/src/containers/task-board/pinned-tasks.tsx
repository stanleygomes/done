import { useTranslation } from "react-i18next";
import { Task } from "@paul/entities";
import { PinnedTaskCard } from "./pinned-task-card";

interface PinnedTasksProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onUnpin: (id: string) => void;
  onOpenDrawer: (task: Task) => void;
  onUpdateDetails: (id: string, details: any) => void;
}

export function PinnedTasks({
  tasks,
  onToggle,
  onUnpin,
  onOpenDrawer,
  onUpdateDetails,
}: PinnedTasksProps) {
  const { t } = useTranslation();

  if (tasks.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">
          {t("task_board.pinned_tasks.title")}
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto py-6 -mx-4 px-4 scrollbar-hide snap-x">
        {tasks.map((task) => {
          return (
            <PinnedTaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onUnpin={onUnpin}
              onOpenDrawer={onOpenDrawer}
              onUpdateDetails={onUpdateDetails}
            />
          );
        })}
      </div>
    </div>
  );
}
