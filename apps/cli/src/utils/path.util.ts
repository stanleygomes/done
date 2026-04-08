import os from "node:os";
import path from "node:path";

export class PathProvider {
  public static readonly homeDir = path.join(os.homedir(), ".paul");
  public static readonly sessionFile = path.join(
    PathProvider.homeDir,
    "session.json",
  );
  public static readonly settingsFile = path.join(
    PathProvider.homeDir,
    "settings.json",
  );
}
