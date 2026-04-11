"use client";

import { useUser } from "@modules/user/use-user";
import { useTranslation } from "react-i18next";
import { UserProfileCard } from "./account";
import { LanguageSelector } from "./language";
import { LegalSection } from "./legal-section";
import { NotificationSettings } from "./notifications";
import { PomodoroSettings } from "./pomodoro";
import { SettingsHeader } from "./settings-header";
import { ThemeSelector } from "./theme";

export default function Settings() {
  const { user } = useUser();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="mx-auto max-w-2xl px-4 pt-8">
        <SettingsHeader />

        <div className="flex flex-col gap-10">
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-black text-foreground">
              {t("settings.account")}
            </h2>
            <UserProfileCard user={user} />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-black text-foreground">
              {t("settings.theme")}
            </h2>
            <ThemeSelector />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-black text-foreground">
              {t("settings.language.title")}
            </h2>
            <LanguageSelector />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-black text-foreground">
              {t("settings.notifications")}
            </h2>
            <NotificationSettings />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-black text-foreground">
              {t("settings.productivity")}
            </h2>
            <PomodoroSettings />
          </section>

          <section className="flex flex-col gap-4">
            <LegalSection />
          </section>
        </div>
      </div>
    </main>
  );
}
