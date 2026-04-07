import { coreClient } from "../../client/core";
import type { Project } from "@paul/entities";
import { projectListResponseSchema } from "../../../validators/project.validators";

export async function listProjects(token: string): Promise<Project[]> {
  const response = await coreClient.get<{ projects: Project[] }>(
    "/v1/projects",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return projectListResponseSchema.parse(response.data).projects;
}
