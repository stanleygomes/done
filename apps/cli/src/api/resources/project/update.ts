import { coreClient } from "../../client/core";
import type { Project } from "@paul/entities";

export async function updateProject(
  token: string,
  projectId: string,
  payload: Record<string, unknown>,
): Promise<Project> {
  const response = await coreClient.put<Project>(
    `/v1/projects/${projectId}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}
