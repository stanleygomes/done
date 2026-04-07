import { input } from "@inquirer/prompts";
import { generateUUID } from "@paul/utils";
import ora from "ora";
import { createTask } from "../../api/resources/task";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderSuccess } from "../../utils/output";
import {
  createTaskPayloadSchema,
  taskTitleSchema,
} from "../../validators/task.validators";

export async function runCreateTaskModule(titleArg?: string): Promise<void> {
  const token = await requireSessionToken();
  const rawTitle =
    titleArg ?? (await input({ message: await t("askTaskTitle") }));
  const title = taskTitleSchema.parse(rawTitle);

  const payload = createTaskPayloadSchema.parse({
    id: generateUUID(),
    title,
    content: "",
    done: false,
    notes: "",
    important: false,
    dueDate: "",
    dueTime: "",
    url: "",
    subtasks: [],
    tags: [],
    isDeleted: false,
  });

  const spinner = ora(await t("loading")).start();
  await createTask(token, payload);
  spinner.succeed();

  renderSuccess(await t("taskCreated"));
}
