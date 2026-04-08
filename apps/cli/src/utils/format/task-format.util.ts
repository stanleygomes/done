import type { Task } from "@paul/entities";
import { humanizeDate } from "@paul/utils";

export class TaskFormatter {
  public static formatLine(task: Task): string {
    const date = task.createdAt ? humanizeDate(new Date(task.createdAt)) : "-";
    return `${task.id} | ${task.title} | ${date}`;
  }
}
