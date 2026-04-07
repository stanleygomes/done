import { input } from "@inquirer/prompts";
import { generateUUID } from "@paul/utils";
import ora from "ora";
import { createProject } from "../../api/resources/project";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderSuccess } from "../../utils/output";
import {
  createProjectPayloadSchema,
  projectNameSchema,
} from "../../validators/project.validators";

const DEFAULT_PROJECT_COLOR = "#4F46E5";

export async function runCreateProjectModule(nameArg?: string): Promise<void> {
  const token = await requireSessionToken();
  const rawName =
    nameArg ?? (await input({ message: await t("askProjectTitle") }));
  const name = projectNameSchema.parse(rawName);

  const payload = createProjectPayloadSchema.parse({
    id: generateUUID(),
    name,
    color: DEFAULT_PROJECT_COLOR,
  });

  const spinner = ora(await t("loading")).start();
  await createProject(token, payload);
  spinner.succeed();

  renderSuccess(await t("projectCreated"));
}
