import React, { useEffect, useState } from "react";
import { Task } from "@models/task";
import { Star, Clock, Tag } from "lucide-react";
import { AutoResizeTextarea } from "../../components/auto-resize-textarea";
import { useProjects } from "@modules/todo/use-projects";
import { ZenBadge } from "../task-board/task-badge";
import { ZenSubtasks } from "./zen-subtasks";
import { ZenNotes } from "./zen-notes";
import { ZenExitButton } from "./exit-button";
import { ZenCompleteButton } from "./complete-button";

interface ZenModeViewProps {
  task: Task;
  onExit: () => void;
  onToggle: (id: string) => void;
  onUpdateContent?: (id: string, content: string) => void;
}

export function ZenModeView({
  task,
  onExit,
  onToggle,
  onUpdateContent,
}: ZenModeViewProps) {
  const [editingContent, setEditingContent] = useState(task.content);
  const { projects } = useProjects();
  const project = task.projectId
    ? projects.find((p) => p.id === task.projectId)
    : null;

  useEffect(() => {
    setEditingContent(task.content);
  }, [task.content]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const hasDueDate = Boolean(task.dueDate);
  const dueDateLabel = hasDueDate
    ? `${task.dueDate}${task.dueTime ? ` ${task.dueTime}` : ""}`
    : "";

  return (
    <div className="fixed inset-0 z-[9999] bg-[#fef6d9] overflow-y-auto animate-in fade-in duration-300">
      <div className="min-h-full flex flex-col items-center py-20">
        <ZenExitButton onClick={onExit} />

        <div className="w-full max-w-3xl px-6 flex flex-col items-center gap-10">
          <div className="w-full flex flex-col items-center justify-center gap-6">
            <AutoResizeTextarea
              value={editingContent}
              onChange={(e) => {
                setEditingContent(e.target.value);
                onUpdateContent?.(task.id, e.target.value);
              }}
              rows={1}
              className="w-full resize-none overflow-hidden bg-transparent text-center text-5xl md:text-6xl font-black leading-tight outline-none placeholder:text-gray-300 transition-all text-black"
            />

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-bold mt-2">
              {project && (
                <ZenBadge className="flex items-center gap-2 bg-white">
                  <div
                    className="w-3 h-3 rounded-full border border-black"
                    style={{ backgroundColor: project.color }}
                  />
                  {project.name}
                </ZenBadge>
              )}
              {task.important && (
                <ZenBadge className="flex items-center gap-2 bg-[#ffe066]">
                  <Star className="w-4 h-4" fill="currentColor" />
                  Important
                </ZenBadge>
              )}
              {hasDueDate && (
                <ZenBadge className="flex items-center gap-2 bg-white">
                  <Clock className="w-4 h-4" />
                  {dueDateLabel}
                </ZenBadge>
              )}
              {task.tags &&
                task.tags.map((tag) => (
                  <ZenBadge
                    key={tag}
                    className="flex items-center gap-2 bg-[#cbf0f8]"
                  >
                    <Tag className="w-4 h-4" />
                    {tag}
                  </ZenBadge>
                ))}
            </div>
          </div>

          {(task.notes || task.subtasks.length > 0) && (
            <div className="w-full mt-8 flex flex-col gap-6">
              <ZenNotes notes={task.notes} />
              <ZenSubtasks subtasks={task.subtasks} />
            </div>
          )}

          <div className="flex justify-center mt-12 mb-10 w-full">
            <ZenCompleteButton
              done={task.done}
              onClick={() => {
                onToggle(task.id);
                if (!task.done) {
                  onExit();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
