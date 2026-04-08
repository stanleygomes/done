import { sessionStore } from "../../store/session.store";
import { t } from "../../utils/i18n/i18n.util";
import { Output } from "../../utils/output.util";

export async function runTokenRefreshFailureModule() {
  await sessionStore.clear();
  Output.error(await t("sessionExpired"));
  Output.error(await t("loginAgain"));
}
