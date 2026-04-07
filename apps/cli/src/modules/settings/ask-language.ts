import { select } from "@inquirer/prompts";
import { LANGUAGE_CHOICES } from "../../utils/i18n";
import type { Language } from "../../types/language.types";

export async function askLanguage(): Promise<Language> {
  return select({
    message: "Language",
    choices: LANGUAGE_CHOICES,
  });
}
