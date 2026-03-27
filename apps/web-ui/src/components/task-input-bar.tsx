import { FormEvent, useEffect, KeyboardEvent, useState } from "react";
import { format, parseISO, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Rocket,
  Star,
  Calendar as CalendarIcon,
  Clock,
  Folder,
} from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useDebouncedSave } from "../hooks/use-debounced-save";
import { AutoResizeTextarea } from "./auto-resize-textarea";
import { useProjects } from "@modules/todo/use-projects";
import { Task } from "@models/task";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Calendar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@done/ui";

interface TaskInputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (additionalProps?: Partial<Task>) => void;
  currentProjectId?: string | null;
}

export function TaskInputBar({
  value,
  onChange,
  onSubmit,
  currentProjectId,
}: TaskInputBarProps) {
  const [draft, setDraft, removeDraft] = useLocalStorage("task_draft", "");
  const { saveStatus, save, clear } = useDebouncedSave(600);
  const { projects } = useProjects();

  const [isImportant, setIsImportant] = useState(false);
  const [dueDateStr, setDueDateStr] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("none");

  const dueDate = dueDateStr ? parseISO(dueDateStr) : undefined;

  useEffect(() => {
    if (draft && !value) {
      onChange(draft);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(newValue: string) {
    onChange(newValue);
    save(() => {
      setDraft(newValue);
    });
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      handleSubmitAction();
    }
  }

  function handleTimeChange(newValue: string) {
    let value = newValue.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);

    if (value.length >= 3) {
      value = value.slice(0, 2) + ":" + value.slice(2);
    }

    // Validate HH range (00-23)
    if (value.length >= 2) {
      const hh = parseInt(value.slice(0, 2));
      if (hh > 23) value = "23" + value.slice(2);
    }
    // Validate mm range (00-59)
    if (value.length >= 5) {
      const mm = parseInt(value.slice(3, 5));
      if (mm > 59) value = value.slice(0, 3) + "59";
    }

    setDueTime(value);
  }

  function handleSubmitAction() {
    clear();
    removeDraft();
    onSubmit({
      important: isImportant,
      dueDate: dueDateStr,
      dueTime,
      projectId: selectedProjectId !== "none" ? selectedProjectId : undefined,
    });
    setIsImportant(false);
    setDueDateStr("");
    setDueTime("");
    setSelectedProjectId("none");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSubmitAction();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 right-0 bg-[#fef6d9] p-6"
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-2">
        <div className="flex flex-col overflow-hidden rounded-xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
          <div className="flex bg-white z-10">
            <AutoResizeTextarea
              value={value}
              onChange={(event) => handleChange(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="New task..."
              rows={1}
              className="flex-1 resize-none bg-transparent px-5 py-4 text-sm font-medium outline-none placeholder:text-black/30 max-h-[160px] overflow-y-auto"
            />
            <button
              type="submit"
              className="m-1.5 h-fit rounded-lg bg-black px-4 py-2.5 text-sm font-bold text-white transition-all hover:opacity-80 active:scale-95 flex items-center gap-1"
            >
              Add <Rocket className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t-2 border-gray-100 bg-gray-50 px-3 py-2 text-sm z-0">
            <button
              type="button"
              onClick={() => setIsImportant(!isImportant)}
              className={`flex items-center gap-1 rounded-base border-2 border-black px-2 py-1 font-bold shadow-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${
                isImportant
                  ? "bg-[#ffe066]"
                  : "bg-white text-gray-400 hover:text-black"
              }`}
              title="Mark as important"
            >
              <Star
                className="h-4 w-4"
                fill={isImportant ? "currentColor" : "none"}
              />
            </button>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={`flex items-center gap-1 rounded-base border-2 border-black bg-white px-2 py-1 shadow-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${
                    dueDateStr ? "text-black" : "text-gray-400"
                  }`}
                  title="Set due date"
                >
                  <CalendarIcon className="h-4 w-4 shrink-0" />
                  <span className="text-xs font-bold truncate max-w-[100px]">
                    {dueDate && isValid(dueDate)
                      ? format(dueDate, "dd/MM/yy")
                      : "Date"}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={(date) =>
                    setDueDateStr(date ? format(date, "yyyy-MM-dd") : "")
                  }
                  initialFocus
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>

            <div
              className={`flex items-center gap-1 rounded-base border-2 border-black bg-white px-2 py-1 shadow-sm transition-colors focus-within:text-black ${dueTime ? "text-black" : "text-gray-400"}`}
            >
              <Clock className="h-4 w-4 shrink-0" />
              <input
                type="text"
                value={dueTime}
                onChange={(e) => handleTimeChange(e.target.value)}
                placeholder="HH:mm"
                className="bg-transparent outline-none text-xs font-bold w-[45px] cursor-pointer placeholder:text-gray-300"
                maxLength={5}
              />
            </div>

            {!currentProjectId && (
              <Select
                value={selectedProjectId}
                onValueChange={setSelectedProjectId}
              >
                <SelectTrigger className="flex items-center gap-2 bg-white rounded-base border-2 border-black px-2 py-1 h-auto text-xs font-bold shadow-sm w-36 outline-none hover:bg-gray-50 focus:ring-0">
                  {selectedProjectId === "none" && (
                    <Folder className="h-4 w-4 shrink-0 text-gray-400" />
                  )}
                  <SelectValue placeholder="Project..." className="truncate" />
                </SelectTrigger>
                <SelectContent className="bg-[#fffaf0] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <SelectItem
                    value="none"
                    className="font-bold cursor-pointer hover:bg-black/5"
                  >
                    No project
                  </SelectItem>
                  {projects.map((p) => (
                    <SelectItem
                      key={p.id}
                      value={p.id}
                      className="font-bold cursor-pointer hover:bg-black/5"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 shrink-0 rounded-full border border-black"
                          style={{ backgroundColor: p.color }}
                        ></div>
                        <span className="truncate">{p.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between px-1">
          <p className="w-16 text-xs font-semibold text-black/40 transition-opacity">
            {saveStatus === "saving"
              ? "Saving..."
              : saveStatus === "saved"
                ? "Saved ✓"
                : ""}
          </p>
          <p className="text-center text-xs text-black/50">
            Type and press <kbd className="font-semibold">Ctrl + Enter</kbd> to
            add a task
          </p>
          <div className="w-16" />
        </div>
      </div>
    </form>
  );
}
