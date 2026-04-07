import { coreClient } from "../../client/core";

export async function deleteProject(
  token: string,
  projectId: string,
): Promise<void> {
  await coreClient.delete(`/v1/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
