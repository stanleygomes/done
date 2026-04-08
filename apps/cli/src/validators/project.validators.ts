import { z } from "zod";
import { projectSchema as sharedProjectSchema } from "@paul/entities";

export class ProjectValidator {
  public static readonly name = z
    .string()
    .trim()
    .min(1, "Project title is required")
    .max(100, "Project title is too long");

  public static readonly id = z.string().uuid("Invalid project id");

  public static readonly project = sharedProjectSchema;

  public static readonly createPayload = z.object({
    id: z.string().uuid(),
    name: ProjectValidator.name,
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/, "Color must be a valid hex code"),
  });

  public static readonly listResponse = z.object({
    projects: z.array(ProjectValidator.project),
  });
}
