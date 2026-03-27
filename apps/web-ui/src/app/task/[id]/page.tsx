"use client";

import { useParams } from "next/navigation";
import TaskDetails from "src/containers/task-details";

export default function TaskPage() {
  const params = useParams();
  const id = params.id as string;

  return <TaskDetails id={id} />;
}
