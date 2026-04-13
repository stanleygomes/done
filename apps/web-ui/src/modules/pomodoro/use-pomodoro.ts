import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "@paul/ui";
import { useTranslation } from "react-i18next";
import {
  usePomodoroSettings,
  type PomodoroSettingsType,
} from "./use-pomodoro-settings";

export type PomodoroPhase = "focus" | "shortBreak" | "longBreak";

function getInitialTime(phase: PomodoroPhase, settings: PomodoroSettingsType) {
  if (phase === "focus") return settings.focusTime * 60;
  if (phase === "shortBreak") return settings.shortBreakTime * 60;
  return settings.longBreakTime * 60;
}

export function usePomodoro() {
  const { t } = useTranslation();
  const [settings] = usePomodoroSettings();
  const [phase, setPhase] = useState<PomodoroPhase>("focus");
  const [isRunning, setIsRunning] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [timeLeft, setTimeLeft] = useState(() => settings.focusTime * 60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const notify = useCallback((title: string, body: string) => {
    toast.success(`${title}: ${body}`);
  }, []);

  const handleFinish = useCallback(
    (currentPhase: PomodoroPhase, currentCycles: number) => {
      setIsRunning(false);

      if (currentPhase === "focus") {
        const nextCycles = currentCycles + 1;
        setCycles(nextCycles);
        const isLongBreak = nextCycles % 4 === 0;
        const nextPhase = isLongBreak ? "longBreak" : "shortBreak";
        setPhase(nextPhase);
        setTimeLeft(getInitialTime(nextPhase, settings));
        notify(
          t("pomodoro.notifications.focus_finished.title"),
          isLongBreak
            ? t("pomodoro.notifications.focus_finished.long_break")
            : t("pomodoro.notifications.focus_finished.short_break"),
        );
      } else {
        setPhase("focus");
        setTimeLeft(getInitialTime("focus", settings));
        notify(
          t("pomodoro.notifications.break_finished.title"),
          t("pomodoro.notifications.break_finished.body"),
        );
      }
    },
    [settings, notify, t],
  );

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      handleFinish(phase, cycles);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft, phase, cycles, handleFinish]);

  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const skipPhase = useCallback(() => {
    handleFinish(phase, cycles);
  }, [handleFinish, phase, cycles]);

  return {
    phase,
    timeLeft,
    isRunning,
    cycles,
    toggleTimer,
    skipPhase,
    settings,
  };
}
