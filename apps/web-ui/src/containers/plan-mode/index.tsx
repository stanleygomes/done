"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { usePlanning } from "@modules/planning/use-planning";
import { useTasks } from "@modules/task/use-tasks";
import { toast } from "@paul/ui";
import { PlanWelcome } from "./welcome";
import { PlanMessageItem } from "./message-item";
import { PlanInput } from "./input";
import { PlanSyncLoader } from "./sync-loader";
import { PlanThinkingIndicator } from "./thinking-indicator";
import { PlanHistory } from "./history";
import { parseTaskFromResponse } from "./utils/task-parser";
import { AnimatePresence } from "framer-motion";
import { useTopMenu } from "@modules/menu-layout/use-top-menu";
import { UserAvatar } from "@components/user-avatar";
import { PageActions } from "@components/page-actions";
import { History, MessageSquarePlus } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useSidebar } from "@modules/menu-layout/use-sidebar";

import { PlanDesktopActions } from "./desktop-actions";

export default function PlanPage() {
  const { t } = useTranslation();
  const {
    messages,
    isLoading,
    sendMessage,
    isInitialLoading,
    conversations,
    currentConversationId,
    setCurrentConversationId,
    createNewConversation,
    deleteConversation,
    refreshConversations,
  } = usePlanning();

  const { createTask } = useTasks();
  const { isOpen, mounted } = useSidebar();
  const [inputValue, setInputValue] = useState("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setLeftContent, setRightContent } = useTopMenu();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const actions = useMemo(
    () => [
      {
        icon: MessageSquarePlus,
        onClick: () => {
          createNewConversation();
          setIsHistoryOpen(false);
        },
        label: t("common.components.chat.actions.new_chat"),
      },
      {
        icon: History,
        onClick: () => {
          setIsHistoryOpen(!isHistoryOpen);
          if (!isHistoryOpen) refreshConversations();
        },
        isActive: isHistoryOpen,
        label: t("common.components.chat.history.button"),
      },
    ],
    [createNewConversation, isHistoryOpen, refreshConversations, t],
  );

  useEffect(() => {
    setLeftContent(<UserAvatar className="h-12 w-12 ml-2" />);
    setRightContent(<PageActions actions={actions} />);

    return () => {
      setLeftContent(null);
      setRightContent(null);
    };
  }, [setLeftContent, setRightContent, isHistoryOpen, t, actions]);

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCreateTask = (taskData: any) => {
    createTask({
      content: taskData.title,
      notes: taskData.description,
      important: taskData.important,
      dueDate: taskData.dueDate,
      dueTime: taskData.dueTime,
    });
    toast.success("Task created from plan!");
  };

  return (
    <div className="relative flex flex-col h-screen bg-background overflow-hidden font-jakarta">
      <PlanDesktopActions
        isHistoryOpen={isHistoryOpen}
        onToggleHistory={() => {
          setIsHistoryOpen(!isHistoryOpen);
          if (!isHistoryOpen) refreshConversations();
        }}
        onNewChat={() => {
          createNewConversation();
          setIsHistoryOpen(false);
        }}
      />

      <div
        ref={scrollRef}
        className={`flex-1 overflow-y-auto px-4 pt-24 pb-48 w-full max-w-5xl mx-auto scroll-smooth no-scrollbar transition-all duration-300 ${
          isOpen && mounted ? "lg:ml-2" : ""
        }`}
      >
        {isInitialLoading ? (
          <PlanSyncLoader />
        ) : isHistoryOpen ? (
          <PlanHistory
            conversations={conversations}
            currentConversationId={currentConversationId || ""}
            onSelectConversation={(id) => {
              setCurrentConversationId(id);
              setIsHistoryOpen(false);
            }}
            onDeleteConversation={deleteConversation}
          />
        ) : messages.length === 0 ? (
          <PlanWelcome />
        ) : (
          <div className="py-4">
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <PlanMessageItem
                  key={i}
                  message={msg}
                  taskData={
                    msg.role === "model"
                      ? parseTaskFromResponse(msg.content)
                      : null
                  }
                  onCreateTask={handleCreateTask}
                />
              ))}
            </AnimatePresence>

            {isLoading && <PlanThinkingIndicator />}
          </div>
        )}
      </div>

      {!isInitialLoading && !isHistoryOpen && (
        <PlanInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          isLoading={isLoading}
          onSend={handleSend}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
}
