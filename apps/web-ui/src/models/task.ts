export interface Task {
  id: string;
  content: string;
  done: boolean;
  createdAt: number;
  notes: string;
  important: boolean;
  dueDate: string;
  dueTime: string;
  url: string;
  subtasks: TaskSubtask[];
}

export interface TaskSubtask {
  id: string;
  title: string;
  done: boolean;
}
