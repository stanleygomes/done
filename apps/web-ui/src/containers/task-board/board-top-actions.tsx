"use client";

import { Plus, Search } from "lucide-react";
import React from "react";

interface BoardTopActionsProps {
  onToggleSearch: () => void;
  isSearchVisible: boolean;
  onCreateTask?: () => void;
}

export function BoardTopActions({
  onToggleSearch,
  isSearchVisible,
  onCreateTask,
}: BoardTopActionsProps) {
  return (
    <div className="flex items-center bg-secondary-background border-2 border-border rounded-full p-1 mr-2 shadow-[2px_2px_0px_0px_var(--border)] overflow-hidden">
      <button
        onClick={onCreateTask}
        className="p-2 hover:bg-main hover:text-main-foreground rounded-full transition-colors group"
      >
        <Plus className="w-5 h-5" />
      </button>
      <div className="w-[2px] h-4 bg-border/50 mx-1" />
      <button
        onClick={onToggleSearch}
        className={`p-2 rounded-full transition-colors ${
          isSearchVisible
            ? "bg-main text-main-foreground shadow-[2px_2px_0px_0px_var(--border)] border-2 border-border"
            : "hover:bg-main/10 text-foreground/70"
        }`}
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
}
