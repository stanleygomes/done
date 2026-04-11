"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

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
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated: mounted ? isAuthenticated : false,
    isLoaded: mounted,
    login,
    logout,
  };
}
