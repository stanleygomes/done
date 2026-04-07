import { authClient } from "../../client/auth";
import type { SendCodeResponse } from "../../../types/auth.types";
import { sendCodeResponseSchema } from "../../../validators/auth.validators";

export async function sendLoginCode(email: string): Promise<SendCodeResponse> {
  const response = await authClient.post<SendCodeResponse>(
    "/v1/auth/send-code",
    {
      email,
    },
  );

  return sendCodeResponseSchema.parse(response.data);
}
