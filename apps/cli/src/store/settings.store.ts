import type { CliSettings } from "../types/settings.type";
import { PathProvider } from "../utils/path.util";
import { JsonStorage } from "../utils/json-storage.util";

const defaultSettings: CliSettings = {
  language: "en",
};

export class SettingsStore {
  constructor(private readonly filePath: string) {}

  async get(): Promise<CliSettings> {
    const settings = await JsonStorage.read<CliSettings>(this.filePath);
    return settings ?? defaultSettings;
  }

  async save(settings: CliSettings): Promise<void> {
    await JsonStorage.write(this.filePath, settings);
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

export const settingsStore = new SettingsStore(PathProvider.settingsFile);
