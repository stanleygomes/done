"use client";

import { LucideIcon, Check } from "lucide-react";

interface IconBadgeProps {
  icon?: LucideIcon;
  className?: string;
  iconClassName?: string;
}

export function IconBadge({
  icon: Icon = Check,
  className = "",
  iconClassName = "",
}: IconBadgeProps) {
  return (
    <div
      className={`bg-main text-main-foreground p-1 rounded-full flex items-center justify-center ${className}`}
    >
      <Icon className={`size-4 font-black ${iconClassName}`} />
    </div>
  );
}
