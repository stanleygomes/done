import { generateUUID } from "@paul/utils";
import ora from "ora";
import { createTask } from "../../api/resources/task";
import { getSettings } from "../../store/settings-store";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderSuccess } from "../../utils/output";
import { askAndParse } from "../../utils/prompt";
import {
  createTaskPayloadSchema,
  taskTitleSchema,
} from "../../validators/task.validators";

export async function runCreateTaskModule(titleArg?: string): Promise<void> {
  const token = await requireSessionToken();
  const settings = await getSettings();
  const activeProjectId = settings.activeProjectId;

  const title = await askAndParse({
    messageKey: "askTaskTitle",
    schema: taskTitleSchema,
    initialValue: titleArg,
  });

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
    projectId: activeProjectId || null,
  });

  const spinner = ora(await t("loading")).start();
  await createTask(token, payload);
  spinner.succeed();

  renderSuccess(await t("taskCreated"));
}
