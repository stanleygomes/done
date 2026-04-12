"use client";

import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { useLocalStorage } from "usehooks-ts";
import { useAuth } from "@modules/auth/use-auth";
import { syncApiService } from "./sync-api.service";
import { SyncManager } from "./sync-manager";
import type { Task, Project } from "@paul/entities";
import { useUser } from "../user/use-user";

export interface SyncContextType {
  isSyncing: boolean;
  lastSyncAt: number | null;
  syncError: string | null;
  performSync: () => Promise<void>;
}

export const SyncContext = createContext<SyncContextType | null>(null);

export function SyncProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { user } = useUser();
  const tasksKey = user ? `todo-tasks:${user.id}` : "todo-tasks";
  const projectsKey = user ? `todo-projects:${user.id}` : "todo-projects";
  const lastSyncKey = user ? `app-last-sync-at:${user.id}` : "app-last-sync-at";

  const [tasks, setTasks] = useLocalStorage<Task[]>(tasksKey, []);
  const [projects, setProjects] = useLocalStorage<Project[]>(projectsKey, []);

  const [lastSyncAt, setLastSyncAt] = useLocalStorage<number | null>(
    lastSyncKey,
    null,
  );

  const [isSyncing, setIsSyncing] = useState(false);
  const isSyncingRef = useRef(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  const tasksRef = useRef(tasks);
  const projectsRef = useRef(projects);
  tasksRef.current = tasks;
  projectsRef.current = projects;

  const performSync = useCallback(async () => {
    if (isSyncingRef.current) return;

    try {
      isSyncingRef.current = true;
      setIsSyncing(true);
      setSyncError(null);

      const response = await syncApiService.syncTasksAndProjects(
        tasksRef.current,
        projectsRef.current,
      );

      const updatedTasks = SyncManager.mergeTasks(
        tasksRef.current,
        response.tasksToUpdate || [],
      );
      const updatedProjects = SyncManager.mergeProjects(
        projectsRef.current,
        response.projectsToUpdate || [],
      );

      setTasks(updatedTasks);
      setProjects(updatedProjects);
      setLastSyncAt(Date.now());
    } catch (err: any) {
      console.error("Sync failed", err);
      const status = err.response?.status;
      const message =
        err.response?.data?.message || err.message || "Sync failed";

      if (status === 401) {
        setSyncError("Session expired. Please login again.");
      } else {
        setSyncError(message);
      }
    } finally {
      isSyncingRef.current = false;
      setIsSyncing(false);
    }
  }, [setLastSyncAt, setProjects, setTasks]);

  const hasSyncedRef = useRef(false);

  // Initial sync on login
  useEffect(() => {
    if (isAuthenticated && !isSyncing && !hasSyncedRef.current) {
      performSync();
      hasSyncedRef.current = true;
    }
  }, [isAuthenticated, isSyncing, performSync]);

  // Periodic sync
  useEffect(() => {
    if (!isAuthenticated) {
      hasSyncedRef.current = false;
      return;
    }

    const interval = setInterval(
      () => {
        if (!document.hidden && !isSyncingRef.current) {
          performSync();
        }
      },
      5 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, [isAuthenticated, performSync]);

  return (
    <SyncContext.Provider
      value={{
        isSyncing,
        lastSyncAt,
        syncError,
        performSync,
      }}
    >
      {children}
    </SyncContext.Provider>
  );
}
