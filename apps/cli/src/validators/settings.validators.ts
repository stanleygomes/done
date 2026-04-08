import { z } from "zod";

export class SettingsValidator {
  public static readonly language = z.enum(["en", "pt"]);
}
