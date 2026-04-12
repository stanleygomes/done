"use client";

import { ReactNode } from "react";

interface SimpleCardProps {
  children: ReactNode;
  isActive?: boolean;
  className?: string;
}

export function SimpleCard({
  children,
  isActive = false,
  className = "",
}: SimpleCardProps) {
  return (
    <div
      className={`flex flex-col p-6 rounded-xl border-2 border-border transition-all ${
        isActive
          ? "bg-main/5 translate-x-[4px] translate-y-[4px] shadow-none"
          : "bg-secondary-background shadow-[4px_4px_0px_0px_var(--border)]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
