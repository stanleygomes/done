import type { CliSettings } from "../types/settings.types";
import { SETTINGS_FILE_PATH } from "../utils/path-utils";
import { readJsonFile, writeJsonFile } from "../utils/json-storage";

const defaultSettings: CliSettings = {
  language: "en",
};

export class SettingsStore {
  constructor(private readonly filePath: string) {}

  async get(): Promise<CliSettings> {
    const settings = await readJsonFile<CliSettings>(this.filePath);
    return settings ?? defaultSettings;
  }

  async save(settings: CliSettings): Promise<void> {
    await writeJsonFile(this.filePath, settings);
  }

  async setActiveProject(id: string, name: string): Promise<void> {
    const settings = await this.get();
    await this.save({
      ...settings,
      activeProjectId: id,
      activeProjectName: name,
    });
  }

  async clearActiveProject(): Promise<void> {
    const settings = await this.get();
    const newSettings = { ...settings };
    delete newSettings.activeProjectId;
    delete newSettings.activeProjectName;
    await this.save(newSettings);
  }
}

export const settingsStore = new SettingsStore(SETTINGS_FILE_PATH);
