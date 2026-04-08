import { z } from "zod";

export class AuthValidator {
  public static readonly email = z.string().email("Invalid email");

  public static readonly emailInput = z.object({
    email: AuthValidator.email,
  });

  public static readonly otpCode = z
    .string()
    .regex(/^\d{6}$/, "Invalid verification code");

  public static readonly sendCodeResponse = z.object({
    message: z.string(),
    isRegistered: z.boolean(),
  });

  public static readonly verifyCodeResponse = z.object({
    token: z.string().min(1),
    refreshToken: z.string().min(1),
    isNew: z.boolean(),
  });
}
