import ora from "ora";
import { sendLoginCode, verifyLoginCode } from "../../api/resources/auth";
import { askAndParse } from "../../utils/prompt";
import { emailSchema, otpCodeSchema } from "../../validators/auth.validators";
import { saveSession } from "../../store/session-store";
import { renderInfo, renderSuccess } from "../../utils/output";
import { t } from "../../utils/i18n";

export async function runLoginModule(): Promise<void> {
  const email = await askAndParse({
    messageKey: "askEmail",
    schema: emailSchema,
  });

  const sendCodeSpinner = ora(await t("loading")).start();
  const sendCodeResult = await sendLoginCode(email);
  sendCodeSpinner.succeed();

  renderInfo(
    sendCodeResult.isRegistered
      ? await t("codeSentExisting")
      : await t("codeSentNew"),
  );

  const code = await askAndParse({
    messageKey: "askCode",
    schema: otpCodeSchema,
  });

  const verifyCodeSpinner = ora(await t("loading")).start();
  const verifyCodeResult = await verifyLoginCode(email, code);
  verifyCodeSpinner.succeed();

  await saveSession({
    token: verifyCodeResult.token,
    refreshToken: verifyCodeResult.refreshToken,
    email,
  });

  renderSuccess(await t("loginSuccess"));
}
