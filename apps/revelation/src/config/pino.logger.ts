import { Logger } from "@done/logger";
import { config } from "./environment.js";

export class PinoLogger {
  private static instance = Logger.getLogger(config.logger, "revelation-api");

  static getLogger() {
    return PinoLogger.instance;
  }
}
