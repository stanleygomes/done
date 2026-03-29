"use client";

import type { ReactNode } from "react";
import { useTheme } from "@modules/theme/use-theme";
import { TooltipProvider } from "@done/ui/components/ui/tooltip";
import { Toaster } from "@done/ui";

export function Providers({ children }: { children: ReactNode }) {
  useTheme();
  return (
    <TooltipProvider>
      {children}
      <Toaster />
    </TooltipProvider>
  );
}
