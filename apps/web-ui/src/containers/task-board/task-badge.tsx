import { ReactNode } from "react";

interface ZenBadgeProps {
  children: ReactNode;
  className?: string;
}

export function ZenBadge({ children, className = "" }: ZenBadgeProps) {
  return (
    <div
      className={`rounded-base border-2 border-black px-3 py-1 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
