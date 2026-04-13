"use client";

import {
  usePomodoro,
  type PomodoroPhase,
} from "@modules/pomodoro/use-pomodoro";
import { Pause, Play, SkipForward } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Badge } from "@components/badge";
import { Button } from "@components/button";
import { SimpleCard } from "@components/simple-card";
import { Typography } from "@components/typography";

export function PomodoroClock() {
  const { t } = useTranslation();
  const { phase, timeLeft, isRunning, cycles, toggleTimer, skipPhase } =
    usePomodoro();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const phaseLabels: Record<PomodoroPhase, string> = {
    focus: t("pomodoro.phase.focus"),
    shortBreak: t("pomodoro.phase.short_break"),
    longBreak: t("pomodoro.phase.long_break"),
  };

  const renderButtonContent = () => {
    if (isRunning) {
      return (
        <>
          <Pause className="w-5 h-5" fill="currentColor" />
          {t("pomodoro.pause")}
        </>
      );
    }

    return (
      <>
        <Play className="w-5 h-5 translate-x-0.5" fill="currentColor" />
        {t("pomodoro.start")}
      </>
    );
  };

  return (
    <SimpleCard>
      <div className="flex flex-col items-center gap-6">
        <div className="flex w-full items-center justify-between">
          <Badge variant={phase === "focus" ? "yellow" : "default"}>
            {phaseLabels[phase]}
          </Badge>
          <Typography variant="small">
            {t("pomodoro.cycle", { current: (cycles % 4) + 1 })}
          </Typography>
        </div>

        <div className="text-8xl font-black tabular-nums tracking-[-0.05em] text-foreground py-2">
          {timeString}
        </div>

        <div className="flex gap-3 w-full">
          <Button onClick={toggleTimer} variant="primary" className="flex-1">
            {renderButtonContent()}
          </Button>
          <Button
            onClick={skipPhase}
            variant="secondary"
            title={t("pomodoro.skip")}
            className="w-14 p-0"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        <Link
          href="/settings/pomodoro"
          className="text-sm font-bold text-foreground/40 hover:text-foreground/80 transition-colors"
        >
          {t("pomodoro.settings_link")}
        </Link>
      </div>
    </SimpleCard>
  );
}
