import type { z } from "zod";
import type { DictionaryKey } from "../utils/i18n/i18n.util";

export interface AskAndParseParams<T> {
  messageKey: DictionaryKey;
  schema: z.ZodSchema<T>;
  initialValue?: string | null;
}
