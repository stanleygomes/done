"use client";

import { Suspense } from "react";
import PomodoroPageContainer from "src/containers/pomodoro-page";

export default function PomodoroPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <PomodoroPageContainer />
    </Suspense>
  );
}
