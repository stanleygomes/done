import { z } from "zod";
import { taskSchema as sharedTaskSchema } from "@paul/entities";

export class TaskValidator {
  public static readonly title = z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(500, "Title is too long");

  public static readonly content = z
    .string()
    .trim()
    .max(500, "Content is too long");

  public static readonly id = z.string().uuid("Invalid task id");

  public static readonly task = sharedTaskSchema;

  public static readonly createPayload = z.object({
    id: z.string().uuid(),
    title: TaskValidator.title,
    content: TaskValidator.content,
    done: z.boolean(),
    notes: z.string(),
    important: z.boolean(),
    dueDate: z.string(),
    dueTime: z.string(),
    url: z.string(),
    subtasks: z.array(TaskValidator.task),
    tags: z.array(z.string()),
    isDeleted: z.boolean(),
    projectId: z.string().uuid().optional().nullable(),
  });

  public static readonly listResponse = z.object({
    tasks: z.array(TaskValidator.task),
  });
}
