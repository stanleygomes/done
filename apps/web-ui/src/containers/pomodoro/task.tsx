"use client";

import { useTranslation } from "react-i18next";
import { Star, Clock, Tag, Check } from "lucide-react";
import { SimpleCard } from "@components/simple-card";
import { Badge } from "@components/badge";
import { Typography } from "@components/typography";
import { useTasks } from "@modules/task/use-tasks";
import { useProjects } from "@modules/project/use-projects";

interface PomodoroTaskProps {
  taskId: string | null;
}

export function PomodoroTask({ taskId }: PomodoroTaskProps) {
  const { t } = useTranslation();
  const { todoTasks, finishedTasks } = useTasks();
  const { projects } = useProjects();

  if (!taskId) return null;

  const allTasks = [...todoTasks, ...finishedTasks];
  const task = allTasks.find((t) => t.id === taskId);

  if (!task) return null;

  const project = task.projectId
    ? projects.find((p) => p.id === task.projectId)
    : null;

  const hasDueDate = Boolean(task.dueDate);
  const dueDateLabel = hasDueDate
    ? `${task.dueDate}${task.dueTime ? ` ${task.dueTime}` : ""}`
    : "";

  const renderBadges = () => {
    return (
      <div className="flex flex-wrap gap-2">
        {project && (
          <Badge>
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: project.color }}
            />
            {project.name}
          </Badge>
        )}
        {task.important && (
          <Badge variant="yellow">
            <Star className="w-3 h-3" fill="currentColor" />
            {t("pomodoro.badges.important")}
          </Badge>
        )}
        {hasDueDate && (
          <Badge>
            <Clock className="w-3 h-3" />
            {dueDateLabel}
          </Badge>
        )}
        {task.tags?.map((tag) => (
          <Badge key={tag} variant="blue">
            <Tag className="w-3 h-3" />
            {tag}
          </Badge>
        ))}
      </div>
    );
  };

  const renderNotes = () => {
    if (!task.notes) return null;

    return (
      <div>
        <Typography variant="small" className="mb-1">
          {t("pomodoro.sections.notes")}
        </Typography>
        <Typography variant="p" className="whitespace-pre-wrap">
          {task.notes}
        </Typography>
      </div>
    );
  };

  const renderSubtasks = () => {
    if (!task.subtasks || task.subtasks.length === 0) return null;

    return (
      <div>
        <Typography variant="small" className="mb-2">
          {t("pomodoro.sections.subtasks")}
        </Typography>
        <div className="flex flex-col gap-2">
          {task.subtasks.map((subtask) => (
            <div key={subtask.id} className="flex items-center gap-3">
              <div
                className={`flex items-center justify-center w-5 h-5 rounded-base border-2 border-border shrink-0 ${
                  subtask.done
                    ? "bg-[#a7f3d0] dark:bg-[#a7f3d0]/30"
                    : "bg-secondary-background"
                }`}
              >
                {subtask.done && <Check className="w-3 h-3" strokeWidth={3} />}
              </div>
              <Typography
                variant="p"
                className={
                  subtask.done ? "line-through text-foreground/40" : ""
                }
              >
                {subtask.content}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <SimpleCard>
      <div className="flex flex-col gap-4">
        <Typography variant="h3">{task.content}</Typography>
        {renderBadges()}
        {renderNotes()}
        {renderSubtasks()}
      </div>
    </SimpleCard>
  );
}
