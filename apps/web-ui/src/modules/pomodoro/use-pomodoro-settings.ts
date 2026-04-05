import { useLocalStorage } from "usehooks-ts";

export interface PomodoroSettingsType {
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
}

export const defaultPomodoroSettings: PomodoroSettingsType = {
  focusTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
};

export function usePomodoroSettings() {
  return useLocalStorage<PomodoroSettingsType>(
    "pomodoro-settings",
    defaultPomodoroSettings,
  );
}
