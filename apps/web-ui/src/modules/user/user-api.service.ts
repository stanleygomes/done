import { httpClient } from "@paul/http";
import { CORE_API_URL } from "../../config/api-config";

export const userService = {
  async getMe(): Promise<any> {
    const response = await httpClient.get(`${CORE_API_URL}/v1/users/me`);
    return response.data;
  },

  async updateMe(data: { name: string }): Promise<any> {
    const response = await httpClient.patch(
      `${CORE_API_URL}/v1/users/me`,
      data,
    );
    return response.data;
  },
};
