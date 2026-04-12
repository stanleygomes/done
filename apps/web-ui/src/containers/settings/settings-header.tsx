"use client";

import { useTranslation } from "react-i18next";
import { BackButton } from "../../components/back-button";

export function SettingsHeader() {
  const { t } = useTranslation();

  return (
    <>
      <BackButton />
      <h1 className="mb-8 text-4xl font-black tracking-tight text-foreground">
        {t("settings.title")}
      </h1>
    </>
  );
}
