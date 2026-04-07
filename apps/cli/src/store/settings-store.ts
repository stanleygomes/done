import type { CliSettings } from "../types/settings.types";
import { SETTINGS_FILE_PATH } from "../utils/path-utils";
import { readJsonFile, writeJsonFile } from "../utils/json-storage";

const defaultSettings: CliSettings = {
  language: "en",
};

export async function getSettings(): Promise<CliSettings> {
  const settings = await readJsonFile<CliSettings>(SETTINGS_FILE_PATH);
  return settings ?? defaultSettings;
}

export async function saveSettings(settings: CliSettings): Promise<void> {
  await writeJsonFile(SETTINGS_FILE_PATH, settings);
}
