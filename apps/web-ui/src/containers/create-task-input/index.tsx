import { FormEvent, useEffect, KeyboardEvent, useState, useRef } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useDebouncedSave } from "../../hooks/use-debounced-save";
import { useProjects } from "@modules/todo/use-projects";
import { Task } from "@models/task";
import { DatePicker } from "./date-picker";
import { ProjectSelector } from "./project-selector";
import { ImportantToggle } from "./important-toggle";
import { TimeInput } from "./time-input";
import { InputField } from "./input-field";
import { InputFooter } from "./footer";

interface CreateTaskInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (additionalProps?: Partial<Task>) => void;
  currentProjectId?: string | null;
}

export function CreateTaskInput({
  value,
  onChange,
  onSubmit,
  currentProjectId,
}: CreateTaskInputProps) {
  const [draft, setDraft, removeDraft] = useLocalStorage("task_draft", "");
  const { saveStatus, save, clear } = useDebouncedSave(600);
  const { projects } = useProjects();

  const [isImportant, setIsImportant] = useState(false);
  const [dueDateStr, setDueDateStr] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("none");

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (draft && !value) {
      onChange(draft);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
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
          <InputField
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <div className="flex flex-wrap items-center gap-2 border-t-2 border-gray-100 bg-gray-50 px-3 py-2 text-sm z-0">
            <ImportantToggle
              isImportant={isImportant}
              onToggle={() => setIsImportant(!isImportant)}
            />

            <DatePicker dueDateStr={dueDateStr} onDateChange={setDueDateStr} />

            <TimeInput value={dueTime} onChange={setDueTime} />

            <ProjectSelector
              projects={projects}
              value={selectedProjectId}
              onChange={setSelectedProjectId}
              isVisible={!currentProjectId}
            />
          </div>
        </div>
        <InputFooter saveStatus={saveStatus} />
      </div>
    </form>
  );
}
