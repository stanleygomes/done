import { useTranslation } from "react-i18next";
import { Trash2, Maximize2, ChevronRight, RotateCcw, Pin } from "lucide-react";
import type { Task } from "@paul/entities";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@paul/ui/components/ui/tooltip";

interface TaskItemActionsProps {
  task: Task;
  onDelete: (id: string) => void;
  onRestore?: (id: string) => void;
  onEnterZenMode?: (id: string) => void;
  onOpenDrawer: (task: Task) => void;
  onPin?: (id: string, isPinned: boolean) => void;
  isRecentlyDeleted?: boolean;
  className?: string;
}

export function TaskItemActions({
  task,
  onDelete,
  onRestore,
  onEnterZenMode,
  onOpenDrawer,
  onPin,
  isRecentlyDeleted,
  className = "",
}: TaskItemActionsProps) {
  const { t } = useTranslation();

  return (
    <div className={`flex items-start gap-2 ${className}`}>
      {onPin && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className={`shrink-0 rounded-base border-2 border-border p-1.5 shadow-shadow transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer ${
                task.isPinned
                  ? "bg-main text-white"
                  : "bg-[#fde047] dark:bg-[#fde047]/20 text-foreground hover:bg-[#facc15] dark:hover:bg-[#facc15]/30"
              }`}
              onClick={() => onPin(task.id, !task.isPinned)}
              aria-label={task.isPinned ? "Unpin task" : "Pin task"}
            >
              <Pin
                size={16}
                className={task.isPinned ? "fill-current rotate-45" : ""}
              />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            {task.isPinned ? "Unpin task" : "Pin task"}
          </TooltipContent>
        </Tooltip>
      )}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="rounded-base border-2 border-border bg-[#ff8fab] dark:bg-[#ff8fab]/20 p-1.5 shadow-shadow transition-all hover:bg-[#ff6b8e] dark:hover:bg-[#ff6b8e]/30 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shrink-0 cursor-pointer"
            onClick={() => onDelete(task.id)}
            aria-label={t("task_item.actions.delete")}
          >
            <Trash2 size={16} />
          </button>
        </TooltipTrigger>
        <TooltipContent>{t("task_item.actions.delete")}</TooltipContent>
      </Tooltip>

      {isRecentlyDeleted && onRestore && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="shrink-0 rounded-base border-2 border-border bg-main text-main-foreground p-1.5 shadow-shadow transition-all hover:bg-main/80 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
              onClick={() => onRestore(task.id)}
              aria-label={t("task_item.actions.restore")}
            >
              <RotateCcw size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>{t("task_item.actions.restore")}</TooltipContent>
        </Tooltip>
      )}

      {onEnterZenMode && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="shrink-0 rounded-base border-2 border-border bg-[#a7f3d0] dark:bg-[#a7f3d0]/20 p-1.5 text-foreground shadow-shadow transition-all hover:bg-[#86efac] dark:hover:bg-[#86efac]/30 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
              onClick={() => onEnterZenMode(task.id)}
              aria-label={t("task_item.actions.zen_mode")}
            >
              <Maximize2 size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>{t("task_item.actions.zen_mode")}</TooltipContent>
        </Tooltip>
      )}

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="shrink-0 rounded-base border-2 border-border bg-secondary-background p-1.5 text-foreground/40 shadow-shadow transition-all hover:bg-main hover:text-main-foreground active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
            onClick={() => onOpenDrawer(task)}
            aria-label={t("task_item.actions.details")}
          >
            <ChevronRight size={16} />
          </button>
        </TooltipTrigger>
        <TooltipContent>{t("task_item.actions.details")}</TooltipContent>
      </Tooltip>
    </div>
  );
}
