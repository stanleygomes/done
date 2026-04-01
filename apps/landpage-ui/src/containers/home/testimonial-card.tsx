import React from "react";
import Image from "next/image";

export function TestimonialCard({
  name,
  role,
  content,
  avatarColor,
  avatarUrl,
}: {
  name: string;
  role: string;
  content: string;
  avatarColor?: string;
  avatarUrl?: string;
}) {
  return (
    <div className="flex-col h-full gap-4 rounded-base border-4 border-border bg-secondary-background p-8 shadow-[8px_8px_0px_0px_var(--border)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none flex">
      <div className="flex-1 text-base font-bold leading-relaxed text-foreground italic mb-6">
        &quot;{content}&quot;
      </div>
      <div className="flex items-center gap-4 border-t-2 border-border pt-6 mt-auto">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-base border-2 border-border shadow-[2px_2px_0px_0px_var(--border)] object-cover shrink-0"
          />
        ) : (
          <div
            className={`h-12 w-12 rounded-base border-2 border-border ${avatarColor} shadow-[2px_2px_0px_0px_var(--border)]`}
          />
        )}
        <div>
          <p className="text-sm font-black uppercase tracking-wider text-foreground">
            {name}
          </p>
          <p className="text-xs font-bold text-foreground/40">{role}</p>
        </div>
      </div>
    </div>
  );
}
