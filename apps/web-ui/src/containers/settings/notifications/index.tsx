"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { NotificationManager } from "@modules/notifications/manager";
import { Bell, BellOff } from "lucide-react";
import { SettingsContainer } from "../container";
import { SettingsHeader } from "../header";
import { SimpleCard } from "@components/simple-card";
import { Typography } from "@components/typography";
import { Button } from "@components/button";

export function NotificationSettings() {
  const { t } = useTranslation();
  const [permission, setPermission] = useState<
    NotificationPermission | "unsupported"
  >("default");

  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(window.Notification.permission);
    } else {
      setPermission("unsupported");
    }
  }, []);

  const handleRequest = async () => {
    setIsRequesting(true);
    try {
      const result = await NotificationManager.requestPermission();
      setPermission(result);
    } finally {
      setIsRequesting(false);
    }
  };

  const getNotificationConfig = () => {
    if (permission === "granted") {
      return {
        Icon: Bell,
        statusKey: "settings.notification_settings.status.granted",
        colorClass: "bg-main text-main-foreground",
        buttonTextKey: null,
      };
    }

    if (permission === "unsupported") {
      return {
        Icon: BellOff,
        statusKey: "settings.notification_settings.status.unsupported",
        colorClass: "bg-background text-foreground/50",
        buttonTextKey: null,
      };
    }

    return {
      Icon: BellOff,
      statusKey: "settings.notification_settings.status.default",
      colorClass: "bg-background text-foreground/50",
      buttonTextKey:
        permission === "denied"
          ? "settings.notification_settings.buttons.denied"
          : "settings.notification_settings.buttons.enable",
    };
  };

  const config = getNotificationConfig();

  return (
    <SettingsContainer>
      <SettingsHeader />
      <SimpleCard className="flex flex-col gap-6 !p-6">
        <div className="flex items-center gap-4">
          <div
            className={`rounded-base border-2 border-border p-3 shadow-[2px_2px_0px_0px_var(--border)] ${config.colorClass}`}
          >
            <config.Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <Typography
              variant="large"
              className="font-black uppercase tracking-tight"
            >
              {t("settings.notification_settings.title")}
            </Typography>
            <Typography
              variant="small"
              className="font-bold text-foreground/60 leading-tight"
            >
              {t(config.statusKey)}
            </Typography>
          </div>
        </div>

        {config.buttonTextKey && (
          <Button
            onClick={handleRequest}
            isLoading={isRequesting}
            loadingText={t("actions.saving")}
            className="w-full h-12"
          >
            {t(config.buttonTextKey)}
          </Button>
        )}
      </SimpleCard>
    </SettingsContainer>
  );
}
