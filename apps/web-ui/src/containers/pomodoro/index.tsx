"use client";

import { useSearchParams } from "next/navigation";
import { PomodoroClock } from "./clock";
import { PomodoroHeader } from "./header";
import { PomodoroTask } from "./task";

export default function Pomodoro() {
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");

  return (
    <div className="min-h-screen bg-background px-4 pb-32 pt-12">
      <div className="mx-auto max-w-lg flex flex-col gap-6">
        <PomodoroHeader />
        <PomodoroClock />
        <PomodoroTask taskId={taskId} />
      </div>
    </div>
  );
}
