import { input } from "@inquirer/prompts";
import type { z } from "zod";
import { t, type DictionaryKey } from "./i18n";

interface AskAndParseParams<T> {
  messageKey: DictionaryKey;
  schema: z.ZodSchema<T>;
  initialValue?: string | null;
}

export async function askAndParse<T>({
  messageKey,
  schema,
  initialValue,
}: AskAndParseParams<T>): Promise<T> {
  const message = await t(messageKey);
  const rawValue = initialValue ?? (await input({ message }));
  return schema.parse(rawValue);
}
