"use client";

import { UserAvatar } from "./user-avatar";
import { SyncStatusBadge } from "./sync-status-badge";

interface UserMenuProps {
  className?: string;
}

export function UserMenu({ className }: UserMenuProps) {
  return (
    <div className="relative">
      <UserAvatar className={className} />
      <SyncStatusBadge />
    </div>
  );
}
