import type { Project } from "@paul/entities";
import { humanizeDate } from "@paul/utils";

export class ProjectFormatter {
  public static formatLine(project: Project): string {
    const date = project.createdAt
      ? humanizeDate(new Date(project.createdAt))
      : "-";
    return `${project.id} | ${project.name} | ${date}`;
  }
}
