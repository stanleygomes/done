import { httpClient } from "@paul/http";
import { CORE_API_URL } from "../../config/api-config";
import type { Project } from "@paul/entities";

export const projectApiService = {
  async getProjects(): Promise<Project[]> {
    const response = await httpClient.get<Project[]>(
      `${CORE_API_URL}/v1/projects`,
    );
    return response.data;
  },

  async createProject(project: Project): Promise<Project> {
    const response = await httpClient.post<Project>(
      `${CORE_API_URL}/v1/projects`,
      project,
    );
    return response.data;
  },

  async updateProject(
    projectId: string,
    project: Partial<Project>,
  ): Promise<Project> {
    const response = await httpClient.put<Project>(
      `${CORE_API_URL}/v1/projects/${projectId}`,
      project,
    );
    return response.data;
  },

  async deleteProject(projectId: string): Promise<void> {
    await httpClient.delete(`${CORE_API_URL}/v1/projects/${projectId}`);
  },
};
