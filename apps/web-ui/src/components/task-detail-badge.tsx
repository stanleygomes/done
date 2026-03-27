import { ReactNode } from "react";

interface TaskDetailBadgeProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function TaskDetailBadge({
  children,
  className = "",
  title,
}: TaskDetailBadgeProps) {
  return (
    <div
      className={`rounded-base border-2 border-black px-3 py-1 shadow-sm ${className}`}
      title={title}
    >
      {children}
    </div>
  );
}
