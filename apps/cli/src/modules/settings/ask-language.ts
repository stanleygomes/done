import { select } from "@inquirer/prompts";
import { I18n } from "../../utils/i18n/i18n.util";
import type { Language } from "../../types/language.type";

export async function askLanguage(): Promise<Language> {
  return select({
    message: "Language",
    choices: I18n.choices,
  }) as Promise<Language>;
}
