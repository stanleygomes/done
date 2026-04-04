import { Task } from "@paul/entities";
import { PinOff, CheckCircle2, Circle } from "lucide-react";

interface PinnedTaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onUnpin: (id: string) => void;
  onOpenDrawer: (task: Task) => void;
}

export function PinnedTaskCard({
  task,
  onToggle,
  onUnpin,
  onOpenDrawer,
}: PinnedTaskCardProps) {
  return (
    <div
      onClick={() => onOpenDrawer(task)}
      className="relative h-44 border-2 border-border p-5 flex flex-col justify-between cursor-pointer group shadow-lg transition-shadow shadow-shadow overflow-hidden"
      style={{
        backgroundColor: task.color
          ? `${task.color}15`
          : "var(--secondary-background)",
        borderColor: task.color || "var(--border)",
      }}
    >
      {/* Background gradient hint */}
      {task.color && (
        <div
          className="absolute -right-10 -top-10 w-32 h-32 blur-3xl opacity-20"
          style={{ backgroundColor: task.color }}
        />
      )}

      <div className="flex justify-between items-start z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(task.id);
          }}
          className={`transition-colors duration-200 ${
            task.done ? "text-main" : "text-secondary-text hover:text-main"
          }`}
        >
          {task.done ? <CheckCircle2 size={30} /> : <Circle size={30} />}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onUnpin(task.id);
          }}
          className="p-1.5 rounded-full bg-background/50 backdrop-blur-sm border border-border text-secondary-text hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all opacity-0 group-hover:opacity-100"
          title="Remover destaque"
        >
          <PinOff size={16} />
        </button>
      </div>

      <div className="z-10">
        <h3
          className={`text-xl font-bold line-clamp-2 leading-tight ${task.done ? "line-through opacity-50" : "text-foreground"}`}
        >
          {task.title || task.content || "Sem título"}
        </h3>
        {task.notes && (
          <p className="text-xs text-secondary-text mt-2 line-clamp-1 opacity-70">
            {task.notes}
          </p>
        )}
      </div>

      {/* Tag indicator if present */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex gap-1 mt-auto z-10">
          {task.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-border/50 text-secondary-text"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
