import { coreClient } from "../../client/core";
import type { Task } from "@paul/entities";

export async function createTask(
  token: string,
  task: Record<string, unknown>,
): Promise<Task> {
  const response = await coreClient.post<Task>("/v1/tasks", task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
