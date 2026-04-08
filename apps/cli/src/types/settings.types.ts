import type { Language } from "./language.types";

export interface CliSettings {
  language: Language;
  activeProjectId?: string;
  activeProjectName?: string;
}
