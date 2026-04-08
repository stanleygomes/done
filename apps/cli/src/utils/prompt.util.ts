import { input, select } from "@inquirer/prompts";
import { t } from "./i18n/i18n.util";
import type { AskAndParseParams } from "../types/ask-params.type";
import type { SelectAndParseParams } from "../types/select-params.type";

export class Prompt {
  public static async ask<T>({
    messageKey,
    schema,
    initialValue,
  }: AskAndParseParams<T>): Promise<T> {
    const message = await t(messageKey);
    const rawValue = initialValue ?? (await input({ message }));
    return schema.parse(rawValue);
  }

  public static async select<V>({
    messageKey,
    choices,
    initialValue,
  }: SelectAndParseParams<V>): Promise<V> {
    if (initialValue) return initialValue;

    const message = await t(messageKey);
    return select({
      message,
      choices,
    });
  }
}
