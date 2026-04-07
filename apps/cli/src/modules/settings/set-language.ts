import { languageSchema } from "../../validators/settings.validators";
import { languageLabel, setCurrentLanguage, t } from "../../utils/i18n";
import { getSettings, saveSettings } from "../../store/settings-store";
import { renderInfo, renderSuccess } from "../../utils/output";
import { askLanguage } from "./ask-language";

export async function runSetLanguageModule(
  languageArg?: string,
): Promise<void> {
  const settings = await getSettings();
  const languageValue = languageArg ?? (await askLanguage());
  const language = languageSchema.parse(languageValue);

  await saveSettings({
    ...settings,
    language,
  });
  setCurrentLanguage(language);

  renderSuccess(await t("languageUpdated"));
  renderInfo(languageLabel(language));
}
