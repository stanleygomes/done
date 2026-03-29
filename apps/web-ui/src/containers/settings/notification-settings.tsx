"use client";

import { useState, useEffect } from "react";
import { NotificationManager } from "@modules/notifications/manager";
import { Bell, BellOff } from "lucide-react";

export function NotificationSettings() {
  const [permission, setPermission] = useState<
    NotificationPermission | "unsupported"
  >("default");

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    } else {
      setPermission("unsupported");
    }
  }, []);

  const handleRequest = async () => {
    const result = await NotificationManager.requestPermission();
    setPermission(result);
  };

  return (
    <div className="flex flex-col gap-4 rounded-base border-2 border-border bg-secondary-background p-6 shadow-shadow">
      <div className="flex items-center gap-3">
        {permission === "granted" ? (
          <div className="rounded-base border-2 border-border bg-main p-2">
            <Bell className="h-5 w-5 text-main-foreground" />
          </div>
        ) : (
          <div className="rounded-base border-2 border-border bg-background p-2">
            <BellOff className="h-5 w-5 text-foreground/50" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-sm font-black text-foreground">
            Lembretes de Tarefas
          </h3>
          <p className="text-xs font-medium text-foreground/60 leading-tight mt-1">
            {permission === "granted"
              ? "As notificações estão ativadas neste dispositivo."
              : permission === "unsupported"
                ? "Notificações não são suportadas pelo seu navegador."
                : "Ative para receber lembretes das tarefas agendadas."}
          </p>
        </div>
      </div>

      {permission !== "granted" && permission !== "unsupported" && (
        <button
          onClick={handleRequest}
          className="mt-2 w-full rounded-base border-2 border-border bg-main py-2 text-sm font-bold text-main-foreground shadow-shadow transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-main/90"
        >
          {permission === "denied"
            ? "Habilitar nas Configurações"
            : "Habilitar Notificações"}
        </button>
      )}
    </div>
  );
}
