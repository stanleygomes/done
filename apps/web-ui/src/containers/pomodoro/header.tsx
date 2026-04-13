"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button } from "@components/button";
import { Typography } from "@components/typography";

export function PomodoroHeader() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <Typography variant="h2" className="uppercase tracking-tight">
        {t("pomodoro.title")}
      </Typography>
      <Button
        onClick={() => router.push("/")}
        variant="secondary"
        className="w-10 h-10 !p-0"
      >
        <X size={20} strokeWidth={2.5} className="shrink-0" />
      </Button>
    </div>
  );
}
