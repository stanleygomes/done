import { httpClient } from "@done/http";

const AUTH_API_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL || "http://localhost:5000/api";

export interface SendCodeResponse {
  message: string;
  isRegistered: boolean;
}

export interface VerifyCodeResponse {
  token: string;
  refreshToken: string;
  isNew: boolean;
}

export const authService = {
  async sendCode(email: string): Promise<SendCodeResponse> {
    const response = await httpClient.post<SendCodeResponse>(
      `${AUTH_API_URL}/v1/auth/send-code`,
      {
        email,
      },
    );

    return response.data;
  },

  async verifyCode(email: string, code: string): Promise<VerifyCodeResponse> {
    const response = await httpClient.post<VerifyCodeResponse>(
      `${AUTH_API_URL}/v1/auth/verify-code`,
      {
        email,
        code,
      },
    );

    return response.data;
  },
};
