import { useTranslation } from "react-i18next";
import React from "react";
import { Task } from "@paul/entities";
import { Star, Clock, Tag } from "lucide-react";
import { TaskDetailBadge } from "../../components/task-detail-badge";

export interface ZenBadgesProps {
  task: Task;
  project?: { name: string; color?: string } | null;
}

export function ZenBadges({ task, project }: ZenBadgesProps) {
  const { t } = useTranslation();

  const hasDueDate = Boolean(task.dueDate);
  const dueDateLabel = hasDueDate
    ? `${task.dueDate}${task.dueTime ? ` ${task.dueTime}` : ""}`
    : "";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
      {project && (
        <TaskDetailBadge className="flex items-center gap-2 bg-secondary-background/80 border-border/20 shadow-sm transition-transform hover:scale-105 active:scale-95">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: project.color }}
          />
          {project.name}
        </TaskDetailBadge>
      )}
      {task.important && (
        <TaskDetailBadge className="flex items-center gap-2 bg-main text-main-foreground border-main/20 shadow-sm transition-transform hover:scale-105 active:scale-95">
          <Star className="w-3.5 h-3.5" fill="currentColor" />
          {t("zen_mode.badges.important")}
        </TaskDetailBadge>
      )}
      {hasDueDate && (
        <TaskDetailBadge className="flex items-center gap-2 bg-secondary-background/80 border-border/20 shadow-sm transition-transform hover:scale-105 active:scale-95">
          <Clock className="w-3.5 h-3.5" />
          {dueDateLabel}
        </TaskDetailBadge>
      )}
      {task.tags &&
        task.tags.map((tag) => (
          <TaskDetailBadge
            key={tag}
            className="flex items-center gap-2 bg-[#cbf0f8]/80 dark:bg-[#cbf0f8]/10 text-black dark:text-white border-border/10 shadow-sm transition-transform hover:scale-105 active:scale-95"
          >
            <Tag className="w-3.5 h-3.5" />
            {tag}
          </TaskDetailBadge>
        ))}
    </div>
  );
}
