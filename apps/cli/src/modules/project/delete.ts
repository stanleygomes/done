import ora from "ora";
import { deleteProject } from "../../api/resources/project";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderSuccess } from "../../utils/output";
import { resolveProjectId } from "./resolve";

export async function runDeleteProjectModule(
  projectIdArg?: string,
): Promise<void> {
  const token = await requireSessionToken();
  const projectId = await resolveProjectId(projectIdArg);

  const spinner = ora(await t("loading")).start();
  await deleteProject(token, projectId);
  spinner.succeed();

  renderSuccess(await t("projectDeleted"));
}
