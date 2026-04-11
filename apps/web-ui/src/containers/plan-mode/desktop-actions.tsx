"use client";

import { History, MessageSquarePlus } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DesktopActionsProps {
  isHistoryOpen: boolean;
  onToggleHistory: () => void;
  onNewChat: () => void;
}

export function PlanDesktopActions({
  isHistoryOpen,
  onToggleHistory,
  onNewChat,
}: DesktopActionsProps) {
  const { t } = useTranslation();

  return (
    <div className="hidden md:flex fixed top-8 right-8 flex-row-reverse gap-4 items-center z-40">
      <button
        onClick={onNewChat}
        className="flex items-center gap-3 px-6 py-3 rounded-2xl border-2 border-border bg-amber-400 text-black shadow-shadow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95"
      >
        <MessageSquarePlus size={24} strokeWidth={3} />
        <span className="font-black uppercase tracking-tighter text-sm">
          {t("common.components.chat.actions.new_chat")}
        </span>
      </button>

      <button
        onClick={onToggleHistory}
        className={`group flex items-center gap-3 px-5 py-3 rounded-2xl border-2 border-border bg-secondary-background shadow-shadow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95 ${
          isHistoryOpen
            ? "bg-main text-main-foreground shadow-none translate-x-[2px] translate-y-[2px]"
            : ""
        }`}
      >
        <History
          size={24}
          strokeWidth={3}
          className={
            isHistoryOpen ? "text-main-foreground" : "text-foreground/40"
          }
        />
        <span className="font-black uppercase tracking-tighter text-sm">
          {t("common.components.chat.history.button")}
        </span>
      </button>
    </div>
  );
}
