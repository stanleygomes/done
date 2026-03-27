import { TaskDatePicker } from "../../components/task-date-picker";
import { TaskTimeInput } from "../../components/task-time-input";

interface TaskDueDateProps {
  dueDate: string;
  dueTime: string;
  onUpdateDate: (date: string) => void;
  onUpdateTime: (time: string) => void;
}

export function TaskDueDate({
  dueDate,
  dueTime,
  onUpdateDate,
  onUpdateTime,
}: TaskDueDateProps) {
  return (
    <>
      <h3 className="mb-2 text-sm font-black">Due date</h3>
      <div className="flex flex-col gap-2">
        <TaskDatePicker
          dueDateStr={dueDate}
          onDateChange={onUpdateDate}
          className="bg-[#fffaf0] w-full justify-start py-2 px-3"
        />
        <TaskTimeInput
          value={dueTime}
          onChange={onUpdateTime}
          className="bg-[#fffaf0] w-full px-3 py-2"
        />
      </div>
    </>
  );
}
