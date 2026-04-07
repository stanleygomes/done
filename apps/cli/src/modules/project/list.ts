import ora from "ora";
import { listProjects } from "../../api/resources/project";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { renderInfo } from "../../utils/output";
import { formatProjectLine } from "../../utils/format/project-format";

export async function runListProjectsModule(): Promise<void> {
  const token = await requireSessionToken();
  const spinner = ora(await t("loading")).start();
  const projects = (await listProjects(token)).filter(
    (project) => !project.isDeleted,
  );
  spinner.stop();

  if (projects.length === 0) {
    renderInfo(await t("noProjects"));
    return;
  }

  for (const project of projects) {
    console.log(formatProjectLine(project));
  }
}
