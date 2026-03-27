"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@done/ui";
import { Maximize2 } from "lucide-react";
import type { Task } from "@models/task";
import { TaskForm } from "../containers/task-form";

interface TaskDrawerProps {
  task: Task | null;
  isOpen: boolean;
  isEditing: boolean;
  editingContent: string;
  onEditingContentChange: (value: string) => void;
  onClose: () => void;
  onToggle: (id: string) => void;
  onStartEdit: (task: Task) => void;
  onUpdateEdit: (id: string, content: string) => void;
  onCloseEdit: () => void;
  onDelete: (id: string) => void;
  onEnterZenMode?: (id: string) => void;
  onUpdateDetails: (
    id: string,
    details: Pick<
      Task,
      | "notes"
      | "important"
      | "dueDate"
      | "dueTime"
      | "url"
      | "subtasks"
      | "tags"
      | "projectId"
    >,
  ) => void;
  onOpenFullPage?: (id: string) => void;
}

export function TaskDrawer({
  task,
  isOpen,
  isEditing,
  editingContent,
  onEditingContentChange,
  onClose,
  onToggle,
  onStartEdit,
  onUpdateEdit,
  onCloseEdit,
  onDelete,
  onEnterZenMode,
  onUpdateDetails,
  onOpenFullPage,
}: TaskDrawerProps) {
  function handleDelete(id: string) {
    onDelete(id);
    onClose();
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      direction="right"
    >
      <DrawerContent className="bg-[#fef6d9] flex flex-col sm:!max-w-2xl w-full">
        <DrawerHeader className="border-b-2 border-black px-6 py-4 text-left shrink-0">
          <DrawerTitle className="text-xl font-black">Task Details</DrawerTitle>
          <DrawerDescription className="sr-only">
            View and edit the details of your task here.
          </DrawerDescription>
        </DrawerHeader>

        {task && (
          <div className="p-6 flex-1 overflow-y-auto h-full">
            <TaskForm
              task={task}
              isEditing={isEditing}
              editingContent={editingContent}
              onEditingContentChange={onEditingContentChange}
              onToggle={onToggle}
              onStartEdit={onStartEdit}
              onUpdateEdit={onUpdateEdit}
              onCloseEdit={onCloseEdit}
              onDelete={handleDelete}
              onUpdateDetails={onUpdateDetails}
            />

            <div className="mt-4 flex flex-col gap-3">
              {onEnterZenMode && (
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 rounded-base border-2 border-black bg-[#a7f3d0] py-4 text-lg font-black shadow-shadow transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-[#86efac]"
                  onClick={() => {
                    onEnterZenMode(task.id);
                    onClose();
                  }}
                >
                  <Maximize2 className="h-6 w-6" /> Enter Zen Mode
                </button>
              )}
              {onOpenFullPage && (
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 rounded-base border-2 border-black bg-white py-3 text-base font-bold shadow-shadow transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-gray-50"
                  onClick={() => {
                    onOpenFullPage(task.id);
                  }}
                >
                  <Maximize2 className="h-5 w-5" /> Open Full Page
                </button>
              )}
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
