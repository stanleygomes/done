import { useTranslation } from "react-i18next";

interface BoardHeaderProps {
  title: string;
  color?: string;
  isFilter?: boolean;
  onAction?: () => void;
  actionLabel?: string;
}

export function BoardHeader({
  title,
  color,
  isFilter = false,
  onAction,
  actionLabel,
}: BoardHeaderProps) {
  const { t } = useTranslation();

  const displayTitle = isFilter
    ? t("task_board.header.filter_tasks", {
        filter: t(`sidebar.filters.${title}`),
      })
    : title;

  return (
    <div className="mb-6 px-1 flex flex-col gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
      <div className="flex items-center mt-2 gap-2 justify-between">
        <div className="flex items-center gap-2">
          {color && (
            <div
              className="w-5 h-5 rounded-full border-2 border-border"
              style={{ backgroundColor: color }}
            ></div>
          )}
          <h2 className="text-2xl font-black">{displayTitle}</h2>
        </div>

        {onAction && actionLabel && (
          <button
            onClick={onAction}
            className="text-xs font-black uppercase cursor-pointer text-foreground/40 hover:text-red-500 transition-colors bg-secondary-background border-2 border-border px-3 py-1.5 rounded-base shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
