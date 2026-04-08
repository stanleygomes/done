import type { Language } from "../../types/language.type";
import { settingsStore } from "../../store/settings.store";

import { en } from "./locales/en";
import { pt } from "./locales/pt";

const dictionary = {
  en,
  pt,
} as const;

export type DictionaryKey = keyof (typeof dictionary)["en"];

export class I18n {
  private static currentLanguage: Language | null = null;

  public static readonly choices = [
    { name: "English", value: "en" },
    { name: "Português", value: "pt" },
  ] as const;

  public static async initialize(): Promise<void> {
    if (!I18n.currentLanguage) {
      const settings = await settingsStore.get();
      I18n.currentLanguage = settings.language;
    }
  }

  public static async t(key: DictionaryKey): Promise<string> {
    await I18n.initialize();
    const language = I18n.currentLanguage ?? "en";
    return dictionary[language][key];
  }

  public static setLanguage(language: Language): void {
    I18n.currentLanguage = language;
  }

  public static getLabel(language: Language): string {
    return language === "pt" ? "Português" : "English";
  }
}

export const t = I18n.t;
