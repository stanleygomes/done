"use client";

import { useLocalStorage } from "usehooks-ts";
import { Project } from "@models/project";
import { generateUUID } from "@done/utils";

export function useProjects() {
  const [projects, setProjects] = useLocalStorage<Project[]>(
    "todo-projects",
    [],
  );

  function createProject(name: string, color: string) {
    const newProject: Project = {
      id: generateUUID(),
      name,
      color,
    };
    setProjects((prev) => [...prev, newProject]);
  }

  function updateProject(id: string, name: string, color: string) {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name, color } : p)),
    );
  }

  function deleteProject(id: string) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  return {
    projects,
    createProject,
    updateProject,
    deleteProject,
  };
}
