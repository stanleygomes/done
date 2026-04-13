"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TaskBoard from "@containers/task-board";

function HomeContent() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const filter = searchParams.get("filter");

  return <TaskBoard projectId={projectId} filter={filter} />;
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pb-32" />}>
      <HomeContent />
    </Suspense>
  );
}
