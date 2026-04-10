import { z } from "zod";

export const userEmailSchema = z.string().email("E-mail inválido");

export const userPasswordSchema = z
  .string()
  .min(12, "A senha deve ter pelo menos 12 caracteres")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número")
  .regex(
    /[^a-zA-Z0-9]/,
    "A senha deve conter pelo menos um caractere especial",
  );

export const loginPasswordSchema = z.object({
  email: userEmailSchema,
  password: userPasswordSchema,
});

export const sendCodeSchema = z.object({
  email: userEmailSchema,
});

export const resetPasswordSchema = z.object({
  email: userEmailSchema,
  code: z.string().length(6, "O código deve ter 6 dígitos"),
  newPassword: userPasswordSchema,
});

export const registerSchema = z.object({
  email: userEmailSchema,
  password: userPasswordSchema,
});

export type LoginPasswordInput = z.infer<typeof loginPasswordSchema>;
export type SendCodeInput = z.infer<typeof sendCodeSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
