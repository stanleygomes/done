import { authClient } from "../../client/auth";
import type { VerifyCodeResponse } from "../../../types/auth.types";
import { verifyCodeResponseSchema } from "../../../validators/auth.validators";

export async function verifyLoginCode(
  email: string,
  code: string,
): Promise<VerifyCodeResponse> {
  const response = await authClient.post<VerifyCodeResponse>(
    "/v1/auth/verify-code",
    {
      email,
      code,
    },
  );

  return verifyCodeResponseSchema.parse(response.data);
}
