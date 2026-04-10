import { z } from "zod";

export const executePromptSchema = z.object({
  contents: z.array(
    z.object({
      role: z.string(),
      parts: z.array(z.object({ text: z.string() })),
    }),
  ),
});

export type ExecutePromptInput = z.infer<typeof executePromptSchema>;

export function validateExecutePrompt(data: unknown): ExecutePromptInput {
  return executePromptSchema.parse(data);
}
