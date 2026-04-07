import ora from "ora";
import { deleteTask } from "../../api/resources/task";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderSuccess } from "../../utils/output";
import { resolveTaskId } from "./resolve";

export async function runDeleteTaskModule(taskIdArg?: string): Promise<void> {
  const token = await requireSessionToken();
  const taskId = await resolveTaskId(taskIdArg);

  const spinner = ora(await t("loading")).start();
  await deleteTask(token, taskId);
  spinner.succeed();

  renderSuccess(await t("taskDeleted"));
}
