import { coreClient } from "../../client/core";
import type { Project } from "@paul/entities";

export async function createProject(
  token: string,
  project: Record<string, unknown>,
): Promise<Project> {
  const response = await coreClient.post<Project>("/v1/projects", project, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
