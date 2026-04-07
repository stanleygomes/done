import { select } from "@inquirer/prompts";
import { listTasks } from "../../api/resources/task";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { taskIdSchema } from "../../validators/task.validators";

export async function resolveTaskId(taskId?: string): Promise<string> {
  if (taskId) {
    return taskIdSchema.parse(taskId);
  }

  const token = await requireSessionToken();
  const tasks = (await listTasks(token)).filter((task) => !task.isDeleted);

  if (tasks.length === 0) {
    throw new Error(await t("noTasks"));
  }

  return select({
    message: await t("selectTask"),
    choices: tasks.map((task) => ({
      name: task.title,
      value: task.id,
    })),
  });
}
