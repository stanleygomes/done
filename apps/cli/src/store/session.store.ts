import type { SessionData } from "../types/session.type";
import { PathProvider } from "../utils/path.util";
import { JsonStorage } from "../utils/json-storage.util";

export class SessionStore {
  constructor(private readonly filePath: string) {}

  async get(): Promise<SessionData | null> {
    return JsonStorage.read<SessionData>(this.filePath);
  }

  async save(session: SessionData): Promise<void> {
    await JsonStorage.write(this.filePath, session);
  }

  async clear(): Promise<void> {
    await JsonStorage.write(this.filePath, null);
  }
}

export const sessionStore = new SessionStore(PathProvider.sessionFile);
