"use client";

import "../modules/i18n/config";

import type { ReactNode } from "react";
import { useTheme } from "@modules/theme/use-theme";
import { TooltipProvider } from "@paul/ui/components/ui/tooltip";
import { Toaster } from "@paul/ui";

export function Providers({ children }: { children: ReactNode }) {
  useTheme();
  return (
    <TooltipProvider>
      {children}
      <Toaster />
    </TooltipProvider>
  );
}
