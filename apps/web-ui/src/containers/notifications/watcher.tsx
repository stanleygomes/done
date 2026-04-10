"use client";

import { useEffect, useRef } from "react";
import { useTasks } from "@modules/task/use-tasks";
import { NotificationManager } from "@modules/notifications/manager";
import { parseISO, isAfter } from "date-fns";

export function NotificationWatcher() {
  const { todoTasks } = useTasks();
  const prevTasksRef = useRef<string>("");

  useEffect(() => {
    if (
      typeof Notification === "undefined" ||
      Notification.permission !== "granted"
    )
      return;

    const currentTasksHash = JSON.stringify(
      todoTasks.map((t) => ({ id: t.id, date: t.dueDate, time: t.dueTime })),
    );

    if (currentTasksHash === prevTasksRef.current) return;
    prevTasksRef.current = currentTasksHash;

    todoTasks.forEach((task) => {
      if (!task.dueDate) {
        NotificationManager.cancel(task.id);
        return;
      }

      const dateStr = task.dueTime
        ? `${task.dueDate}T${task.dueTime}`
        : `${task.dueDate}T09:00:00`;

      try {
        const scheduledDate = parseISO(dateStr);
        if (isAfter(scheduledDate, new Date())) {
          NotificationManager.schedule(task.id, task.content, scheduledDate);
        } else {
          NotificationManager.cancel(task.id);
        }
      } catch (e) {
        console.error("Erro ao agendar notificação:", e);
      }
    });
  }, [todoTasks]);

  return null;
}
