"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const SENSITIVE_KEYS = [
  "todo-tasks",
  "todo-projects",
  "todo-zen-mode",
  "app-user",
  "app-is-authenticated",
];

export function clearUserData() {
  SENSITIVE_KEYS.forEach((key) => {
    localStorage.removeItem(key);
  });
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>(
    "app-is-authenticated",
    false,
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearUserData();
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated: mounted ? isAuthenticated : false,
    isLoaded: mounted,
    login,
    logout,
  };
}
