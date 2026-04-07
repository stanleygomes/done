import { coreClient } from "../../client/core";
import type { Task } from "@paul/entities";
import { taskListResponseSchema } from "../../../validators/task.validators";

export async function listTasks(token: string): Promise<Task[]> {
  const response = await coreClient.get<{ tasks: Task[] }>("/v1/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return taskListResponseSchema.parse(response.data).tasks;
}
