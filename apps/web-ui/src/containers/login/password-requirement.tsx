"use client";

import { Check, Circle } from "lucide-react";

export function PasswordRequirement({
  label,
  met,
}: {
  label: string;
  met: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-wider transition-colors ${met ? "text-green-500" : "text-foreground/20"}`}
    >
      {met ? (
        <Check size={12} strokeWidth={4} />
      ) : (
        <Circle size={12} strokeWidth={4} />
      )}
      {label}
    </div>
  );
}
