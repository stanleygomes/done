"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export type Theme = "classic" | "dark" | "ice" | "auto";

const THEME_KEY = "app-theme";

const THEMES: Exclude<Theme, "auto">[] = ["classic", "dark", "ice"];
const DEFAULT_LIGHT_THEME: Theme = "classic";
const DEFAULT_DARK_THEME: Theme = "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  THEMES.forEach((t) => {
    if (t !== "classic") {
      root.classList.remove(t);
    }
  });

  if (theme !== "classic" && theme !== "auto") {
    root.classList.add(theme);
  }
}

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>(THEME_KEY, "auto");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (theme === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const systemTheme = mediaQuery.matches
        ? DEFAULT_DARK_THEME
        : DEFAULT_LIGHT_THEME;
      applyTheme(systemTheme);

      const handleChange = (e: MediaQueryListEvent) =>
        applyTheme(e.matches ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME);

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    applyTheme(theme);
  }, [theme, mounted]);

  return { theme: mounted ? theme : "auto", setTheme };
}
