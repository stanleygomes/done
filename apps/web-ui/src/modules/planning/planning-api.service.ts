import { httpClient } from "@paul/http";
import { CORE_API_URL } from "../../config/api-config";

export interface PlanningMessage {
  role: "user" | "model";
  content: string;
}

export interface PlanningConversation {
  id: string;
  title: string;
  status: "active" | "finished";
  created_at: string;
  updated_at: string;
}

export const planningApiService = {
  async listConversations(token: string): Promise<PlanningConversation[]> {
    const response = await httpClient.get<{
      conversations: PlanningConversation[];
    }>(`${CORE_API_URL}/v1/planning/conversations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.conversations;
  },

  async createConversation(
    token: string,
    title?: string,
  ): Promise<PlanningConversation> {
    const response = await httpClient.post<PlanningConversation>(
      `${CORE_API_URL}/v1/planning/conversations`,
      { title },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response.data;
  },

  async deleteConversation(
    token: string,
    conversationId: string,
  ): Promise<void> {
    await httpClient.delete(
      `${CORE_API_URL}/v1/planning/conversations/${conversationId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
  },

  async getMessages(
    token: string,
    conversationId: string,
  ): Promise<PlanningMessage[]> {
    const response = await httpClient.get<{ messages: PlanningMessage[] }>(
      `${CORE_API_URL}/v1/planning/conversations/${conversationId}/messages`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response.data.messages;
  },

  async chat(
    token: string,
    conversationId: string,
    message: string,
  ): Promise<string> {
    const response = await httpClient.post<{ response: string }>(
      `${CORE_API_URL}/v1/planning/conversations/${conversationId}/messages`,
      { message },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response.data.response;
  },
};
