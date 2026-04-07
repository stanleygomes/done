import { coreClient } from "../../client/core";

export async function deleteTask(token: string, taskId: string): Promise<void> {
  await coreClient.delete(`/v1/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
