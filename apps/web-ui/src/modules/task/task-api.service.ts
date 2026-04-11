import { httpClient } from "@paul/http";
import { CORE_API_URL } from "../../config/api-config";
import type { Task } from "@paul/entities";

export const taskApiService = {
  async getTasks(since?: number): Promise<Task[]> {
    const response = await httpClient.get<Task[]>(`${CORE_API_URL}/v1/tasks`, {
      params: since ? { since } : {},
    });
    return response.data;
  },

  async createTask(task: Task): Promise<Task> {
    const response = await httpClient.post<Task>(
      `${CORE_API_URL}/v1/tasks`,
      task,
    );
    return response.data;
  },

  async updateTask(taskId: string, task: Partial<Task>): Promise<Task> {
    const response = await httpClient.put<Task>(
      `${CORE_API_URL}/v1/tasks/${taskId}`,
      task,
    );
    return response.data;
  },

  async deleteTask(taskId: string): Promise<void> {
    await httpClient.delete(`${CORE_API_URL}/v1/tasks/${taskId}`);
  },

  async suggestSubtasks(taskId: string): Promise<string[]> {
    const response = await httpClient.post<{ subtasks: string[] }>(
      `${CORE_API_URL}/v1/tasks/${taskId}/suggest-subtasks`,
      {},
    );
    return response.data.subtasks;
  },
};
