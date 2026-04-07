import { coreClient } from "../../client/core";
import type { Task } from "@paul/entities";

export async function updateTask(
  token: string,
  taskId: string,
  payload: Record<string, unknown>,
): Promise<Task> {
  const response = await coreClient.put<Task>(`/v1/tasks/${taskId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
