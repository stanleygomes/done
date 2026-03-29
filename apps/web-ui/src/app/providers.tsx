"use client";

import type { ReactNode } from "react";
import { useTheme } from "@modules/theme/use-theme";
import { TooltipProvider } from "@done/ui/components/ui/tooltip";
import { Toaster } from "@done/ui";
import { NotificationWatcher } from "@containers/notifications/watcher";

export function Providers({ children }: { children: ReactNode }) {
  useTheme();
  return (
    <TooltipProvider>
      <NotificationWatcher />
      {children}
      <Toaster />
    </TooltipProvider>
  );
}
