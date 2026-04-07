import { select } from "@inquirer/prompts";
import { listProjects } from "../../api/resources/project";
import { requireSessionToken } from "../../utils/auth-guard";
import { t } from "../../utils/i18n";
import { projectIdSchema } from "../../validators/project.validators";

export async function resolveProjectId(projectId?: string): Promise<string> {
  if (projectId) {
    return projectIdSchema.parse(projectId);
  }

  const token = await requireSessionToken();
  const projects = (await listProjects(token)).filter(
    (project) => !project.isDeleted,
  );

  if (projects.length === 0) {
    throw new Error(await t("noProjects"));
  }

  return select({
    message: await t("selectProject"),
    choices: projects.map((project) => ({
      name: project.name,
      value: project.id,
    })),
  });
}
