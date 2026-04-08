import ora from "ora";
import { listTasks } from "../../api/resources/task";
import { getSettings } from "../../store/settings-store";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderInfo } from "../../utils/output";
import { formatTaskLine } from "../../utils/format/task-format";

export async function runListTasksModule(): Promise<void> {
  const token = await requireSessionToken();
  const settings = await getSettings();
  const activeProjectId = settings.activeProjectId;

  const spinner = ora(await t("loading")).start();
  let tasks = (await listTasks(token)).filter((task) => !task.isDeleted);
  spinner.stop();

  if (activeProjectId) {
    tasks = tasks.filter((task) => task.projectId === activeProjectId);
    renderInfo(
      (await t("activeProjectInfo")).replace(
        "{name}",
        settings.activeProjectName || "",
      ),
    );
  }

  if (tasks.length === 0) {
    renderInfo(await t("noTasks"));
    return;
  }

  for (const task of tasks) {
    console.log(formatTaskLine(task));
  }
}
