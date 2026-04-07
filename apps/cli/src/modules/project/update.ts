import { input } from "@inquirer/prompts";
import ora from "ora";
import { updateProject } from "../../api/resources/project";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderSuccess } from "../../utils/output";
import { projectNameSchema } from "../../validators/project.validators";
import { resolveProjectId } from "./resolve";

export async function runEditProjectModule(
  projectIdArg?: string,
  nameArg?: string,
): Promise<void> {
  const token = await requireSessionToken();
  const projectId = await resolveProjectId(projectIdArg);
  const rawName =
    nameArg ?? (await input({ message: await t("askProjectTitle") }));
  const name = projectNameSchema.parse(rawName);

  const spinner = ora(await t("loading")).start();
  await updateProject(token, projectId, {
    name,
    updatedAt: Date.now(),
  });
  spinner.succeed();

  renderSuccess(await t("projectUpdated"));
}
