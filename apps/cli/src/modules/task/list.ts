import ora from "ora";
import { listTasks } from "../../api/resources/task";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderInfo } from "../../utils/output";
import { formatTaskLine } from "../../utils/format/task-format";

export async function runListTasksModule(): Promise<void> {
  const token = await requireSessionToken();
  const spinner = ora(await t("loading")).start();
  const tasks = (await listTasks(token)).filter((task) => !task.isDeleted);
  spinner.stop();

  if (tasks.length === 0) {
    renderInfo(await t("noTasks"));
    return;
  }

  for (const task of tasks) {
    console.log(formatTaskLine(task));
  }
}
