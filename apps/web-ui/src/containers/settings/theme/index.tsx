"use client";

import { useTranslation } from "react-i18next";
import { Typography } from "../../../components/typography";
import { SettingsHeader } from "../settings-header";
import { SettingsMain } from "../settings-main";
import { ThemeList } from "./theme-list";

export function ThemeSelector() {
  const { t } = useTranslation();

  return (
    <SettingsMain>
      <SettingsHeader />

      <div className="mb-8">
        <Typography variant="h2">{t("settings.theme_page.title")}</Typography>
        <Typography variant="p" className="font-bold">
          {t("settings.theme_page.subtitle")}
        </Typography>
      </div>

      <ThemeList />
    </SettingsMain>
  );
}
