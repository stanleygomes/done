import { usePomodoroSettings } from "@modules/pomodoro/use-pomodoro-settings";
import { Input, toast } from "@paul/ui";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "src/components/button";
import { Label } from "src/components/label";
import { SimpleCard } from "src/components/simple-card";
import { Typography } from "src/components/typography";
import { SettingsContainer } from "../container";
import { SettingsHeader } from "../header";

export function PomodoroSettings() {
  const { t } = useTranslation();
  const [settings, setSettings] = usePomodoroSettings();
  const [localSettings, setLocalSettings] = useState(settings);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulado para o feedback visual do botão bonito
      await new Promise((resolve) => setTimeout(resolve, 300));
      setSettings(localSettings);
      toast.success(t("settings.pomodoro.saved_success"));
    } finally {
      setIsLoading(false);
    }
  };

  const hasChanges = JSON.stringify(localSettings) !== JSON.stringify(settings);

  return (
    <SettingsContainer>
      <SettingsHeader />
      <div className="flex flex-col gap-6">
        <SimpleCard className="flex flex-col gap-6 !p-6">
          <div className="flex flex-col gap-1">
            <Typography
              variant="h2"
              className="uppercase font-black tracking-tight"
            >
              {t("settings.pomodoro.title")}
            </Typography>
            <Typography
              variant="small"
              className="font-bold text-foreground/50"
            >
              {t("settings.pomodoro.device_hint")}
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-3">
              <Label>{t("settings.pomodoro.focus_label")}</Label>
              <Input
                type="number"
                min={1}
                max={120}
                className="h-14 text-lg font-black bg-background"
                value={localSettings.focusTime}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    focusTime: Number(e.target.value) || 25,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>{t("settings.pomodoro.short_break_label")}</Label>
              <Input
                type="number"
                min={1}
                max={60}
                className="h-14 text-lg font-black bg-background"
                value={localSettings.shortBreakTime}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    shortBreakTime: Number(e.target.value) || 5,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>{t("settings.pomodoro.long_break_label")}</Label>
              <Input
                type="number"
                min={1}
                max={60}
                className="h-14 text-lg font-black bg-background"
                value={localSettings.longBreakTime}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    longBreakTime: Number(e.target.value) || 15,
                  })
                }
              />
            </div>
          </div>
        </SimpleCard>

        <Button
          onClick={handleSave}
          disabled={!hasChanges}
          isLoading={isLoading}
          loadingText={t("actions.saving")}
          className="w-full h-14"
        >
          {t("settings.pomodoro.save_button")}
        </Button>
      </div>
    </SettingsContainer>
  );
}
