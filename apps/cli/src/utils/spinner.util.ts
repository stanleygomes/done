import ora from "ora";
import { t, type DictionaryKey } from "./i18n/i18n.util";

export class Loader {
  public static async run<T>(
    action: () => Promise<T>,
    messageKey: DictionaryKey = "loading",
  ): Promise<T> {
    const message = await t(messageKey);
    const spinner = ora(message).start();

    try {
      const result = await action();
      spinner.succeed();
      return result;
    } catch (error) {
      spinner.fail();
      throw error;
    }
  }
}
