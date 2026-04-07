import { z } from "zod";
import { projectSchema as sharedProjectSchema } from "@paul/entities";

export const projectNameSchema = z
  .string()
  .trim()
  .min(1, "Project title is required")
  .max(100, "Project title is too long");

export const projectIdSchema = z.string().uuid("Invalid project id");

// Use the shared project schema
export const projectSchema = sharedProjectSchema;

export const createProjectPayloadSchema = z.object({
  id: z.string().uuid(),
  name: projectNameSchema,
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Color must be a valid hex code"),
});

export const projectListResponseSchema = z.object({
  projects: z.array(projectSchema),
});
