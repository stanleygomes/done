"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export function SettingsHeader() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => router.back()}
        className="mb-8 inline-flex items-center gap-1 text-sm font-bold text-foreground/50 transition-colors hover:text-foreground cursor-pointer"
      >
        ← {t("settings.back")}
      </button>
      <h1 className="mb-8 text-4xl font-black tracking-tight text-foreground">
        {t("settings.title")}
      </h1>
    </>
  );
}
