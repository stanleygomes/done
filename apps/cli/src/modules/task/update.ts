import { createApiClient } from "../../api/api";
import { AuthGuard } from "../../utils/auth-guard.util";
import { t } from "../../utils/i18n/i18n.util";
import { Output } from "../../utils/output.util";
import { Prompt } from "../../utils/prompt.util";
import { Loader } from "../../utils/spinner.util";
import { TaskValidator } from "../../validators/task.validators";
import { resolveTaskId } from "./resolve";

export async function runUpdateTaskModule(
  taskIdArg?: string,
  titleArg?: string,
): Promise<void> {
  const token = await AuthGuard.requireToken();
  const taskId = await resolveTaskId(taskIdArg);
  const title = await Prompt.ask({
    messageKey: "askTaskTitle",
    schema: TaskValidator.title,
    initialValue: titleArg,
  });

  const api = createApiClient(token);
  await Loader.run(() =>
    api.task.update(taskId, {
      title,
      updatedAt: Date.now(),
    }),
  );

  Output.success(await t("taskUpdated"));
}
