import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { usePomodoroSettings } from "@modules/pomodoro/use-pomodoro-settings";
import { SettingsMain } from "../settings-main";
import { SettingsHeader } from "../settings-header";
import { toast } from "@paul/ui";
import { Save } from "lucide-react";

export function PomodoroSettings() {
  const { t } = useTranslation();
  const [settings, setSettings] = usePomodoroSettings();
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = () => {
    setSettings(localSettings);
    toast.success(
      t("settings.pomodoro.saved_success") || "Pomodoro settings saved!",
    );
  };

  const hasChanges = JSON.stringify(localSettings) !== JSON.stringify(settings);

  return (
    <SettingsMain>
      <SettingsHeader />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 bg-secondary-background p-6 rounded-xl border-2 border-border shadow-shadow">
          <div className="flex flex-col gap-1">
            <h3 className="font-black text-xl uppercase tracking-tighter">
              {t("settings.pomodoro.title")}
            </h3>
            <p className="text-sm font-bold text-foreground/50">
              {t("settings.pomodoro.device_hint")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase text-foreground/60">
                {t("settings.pomodoro.focus_label")}
              </label>
              <input
                type="number"
                min={1}
                max={120}
                className="rounded-base border-2 border-border bg-background px-4 py-3 text-lg font-black shadow-shadow outline-none transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
                value={localSettings.focusTime}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    focusTime: Number(e.target.value) || 25,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase text-foreground/60">
                {t("settings.pomodoro.short_break_label")}
              </label>
              <input
                type="number"
                min={1}
                max={60}
                className="rounded-base border-2 border-border bg-background px-4 py-3 text-lg font-black shadow-shadow outline-none transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
                value={localSettings.shortBreakTime}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    shortBreakTime: Number(e.target.value) || 5,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase text-foreground/60">
                {t("settings.pomodoro.long_break_label")}
              </label>
              <input
                type="number"
                min={1}
                max={60}
                className="rounded-base border-2 border-border bg-background px-4 py-3 text-lg font-black shadow-shadow outline-none transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
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
        </div>

        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className="group flex w-full items-center justify-center gap-2 rounded-xl border-2 border-border bg-main py-4 text-lg font-black uppercase tracking-tighter text-main-foreground shadow-shadow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed cursor-pointer"
        >
          <Save size={20} strokeWidth={3} />
          {t("settings.pomodoro.save_button")}
        </button>
      </div>
    </SettingsMain>
  );
}
