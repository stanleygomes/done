import { Pin } from "lucide-react";

interface TaskPinnedToggleProps {
  isPinned: boolean;
  onToggle: () => void;
}

export function TaskPinnedToggle({
  isPinned,
  onToggle,
}: TaskPinnedToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center justify-center rounded-base p-2 transition-colors duration-200 border-2 ${
        isPinned
          ? "bg-main border-border text-white"
          : "bg-secondary-background border-border text-secondary-text hover:bg-main hover:text-white"
      }`}
      title={isPinned ? "Unpin task" : "Pin task"}
    >
      <Pin
        size={20}
        className={`${isPinned ? "fill-current" : ""} transition-transform duration-200 ${
          isPinned ? "rotate-45" : ""
        }`}
      />
    </button>
  );
}
