"use client";

import { useTasks } from "@modules/todo/use-tasks";
import { AppHeader } from "../components/app-header";
import { TaskList } from "../components/task-list";
import { TaskInputBar } from "../components/task-input-bar";
import { TaskDrawer } from "../components/task-drawer";

export default function Home() {
  const {
    todoTasks,
    finishedTasks,
    newTask,
    setNewTask,
    editingTaskId,
    editingContent,
    setEditingContent,
    selectedTask,
    createTask,
    toggleTask,
    deleteTask,
    startEdit,
    updateEdit,
    updateTaskDetails,
    closeEdit,
    openDrawer,
    closeDrawer,
    reorderTodoTasks,
    reorderFinishedTasks,
    clearFinishedTasks,
  } = useTasks();

  return (
    <main className="min-h-screen bg-[#fef6d9] pb-32">
      <div className="mx-auto max-w-2xl px-4">
        <AppHeader />

        <section className="flex flex-col gap-4">
          <TaskList
            tasks={todoTasks}
            editingTaskId={editingTaskId}
            editingContent={editingContent}
            onEditingContentChange={setEditingContent}
            onToggle={toggleTask}
            onStartEdit={startEdit}
            onUpdateEdit={updateEdit}
            onCloseEdit={closeEdit}
            onDelete={deleteTask}
            onReorder={reorderTodoTasks}
            onOpenDrawer={openDrawer}
          />
        </section>

        {finishedTasks.length > 0 && (
          <section className="flex flex-col gap-4 mt-10">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-2xl font-black text-black">Finished</h2>
              <button
                onClick={clearFinishedTasks}
                className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
              >
                Delete all finished tasks
              </button>
            </div>
            <TaskList
              tasks={finishedTasks}
              editingTaskId={editingTaskId}
              editingContent={editingContent}
              onEditingContentChange={setEditingContent}
              onToggle={toggleTask}
              onStartEdit={startEdit}
              onUpdateEdit={updateEdit}
              onCloseEdit={closeEdit}
              onDelete={deleteTask}
              onReorder={reorderFinishedTasks}
              onOpenDrawer={openDrawer}
            />
          </section>
        )}
      </div>

      <TaskInputBar
        value={newTask}
        onChange={setNewTask}
        onSubmit={createTask}
      />

      <TaskDrawer
        task={selectedTask}
        isOpen={selectedTask !== null}
        isEditing={editingTaskId === selectedTask?.id}
        editingContent={editingContent}
        onEditingContentChange={setEditingContent}
        onClose={closeDrawer}
        onToggle={toggleTask}
        onStartEdit={startEdit}
        onUpdateEdit={updateEdit}
        onCloseEdit={closeEdit}
        onDelete={deleteTask}
        onUpdateDetails={updateTaskDetails}
      />
    </main>
  );
}
