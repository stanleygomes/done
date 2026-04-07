import { z } from "zod";
import { taskSchema as sharedTaskSchema } from "@paul/entities";

export const taskTitleSchema = z
  .string()
  .trim()
  .min(1, "Title is required")
  .max(500, "Title is too long");

export const taskContentSchema = z
  .string()
  .trim()
  .max(500, "Content is too long");

export const taskIdSchema = z.string().uuid("Invalid task id");

export const taskSchema = sharedTaskSchema;

export const createTaskPayloadSchema = z.object({
  id: z.string().uuid(),
  title: taskTitleSchema,
  content: taskContentSchema,
  done: z.boolean(),
  notes: z.string(),
  important: z.boolean(),
  dueDate: z.string(),
  dueTime: z.string(),
  url: z.string(),
  subtasks: z.array(taskSchema),
  tags: z.array(z.string()),
  isDeleted: z.boolean(),
});

export const taskListResponseSchema = z.object({
  tasks: z.array(taskSchema),
});
