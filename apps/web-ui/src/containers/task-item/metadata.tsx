import type { Task } from "@models/task";
import type { Project } from "@models/project";
import { Star, Clock, Globe, FileText, CheckCircle2, Tag } from "lucide-react";
import { TaskDetailBadge } from "../../components/task-detail-badge";

interface TaskMetadataProps {
  task: Task;
  project?: Project | null;
  showProject?: boolean;
}

export function TaskMetadata({
  task,
  project,
  showProject = true,
}: TaskMetadataProps) {
  const hasDueDate = Boolean(task.dueDate);
  const dueDateLabel = hasDueDate
    ? `${task.dueDate}${task.dueTime ? ` ${task.dueTime}` : ""}`
    : "";
  const completedSubtasks = task.subtasks.filter((s) => s.done).length;

  return (
    <aside
      className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold"
      aria-label="Task metadata"
    >
      {showProject && project && (
        <TaskDetailBadge
          className="bg-[#fef6d9] flex items-center gap-1.5 px-2"
          aria-label={`Project: ${project.name}`}
        >
          <div
            className="w-2.5 h-2.5 rounded-full border border-black"
            style={{ backgroundColor: project.color }}
          />
          {project.name}
        </TaskDetailBadge>
      )}
      {task.important && (
        <TaskDetailBadge
          title="Important task"
          className="bg-[#ffe066] flex items-center px-1.5"
        >
          <Star className="w-3.5 h-3.5 fill-current" />
        </TaskDetailBadge>
      )}
      {hasDueDate && (
        <TaskDetailBadge
          className="bg-white flex items-center gap-1.5 px-2"
          aria-label={`Due date: ${dueDateLabel}`}
        >
          <Clock className="w-3.5 h-3.5" />
          {dueDateLabel}
        </TaskDetailBadge>
      )}
      {task.url && (
        <TaskDetailBadge
          title={task.url}
          className="bg-white flex items-center px-1.5"
        >
          <Globe className="w-3.5 h-3.5" />
        </TaskDetailBadge>
      )}
      {task.notes.trim() && (
        <TaskDetailBadge
          title={task.notes}
          className="bg-white flex items-center px-1.5"
        >
          <FileText className="w-3.5 h-3.5" />
        </TaskDetailBadge>
      )}
      {task.subtasks.length > 0 && (
        <TaskDetailBadge
          className="bg-white flex items-center gap-1.5 px-2"
          aria-label={`Subtasks completed: ${completedSubtasks} of ${task.subtasks.length}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          {completedSubtasks} / {task.subtasks.length}
        </TaskDetailBadge>
      )}
      {task.tags?.map((tag) => (
        <TaskDetailBadge
          key={tag}
          className="bg-[#cbf0f8] flex items-center gap-1.5 px-2"
          aria-label={`Tag: ${tag}`}
        >
          <Tag className="w-3.5 h-3.5" />
          {tag}
        </TaskDetailBadge>
      ))}
    </aside>
  );
}
