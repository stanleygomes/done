import { TaskProjectSelector } from "../../components/task-project-selector";
import { FormField } from "./form-field";

interface TaskProjectProps {
  projectId?: string;
  onUpdateProject: (projectId: string | undefined) => void;
}

export function TaskProject({ projectId, onUpdateProject }: TaskProjectProps) {
  return (
    <FormField label="Project">
      <TaskProjectSelector
        value={projectId || "none"}
        onChange={(value) =>
          onUpdateProject(value === "none" ? undefined : value)
        }
        isVisible={true}
        className="bg-[#fffaf0] w-full"
      />
    </FormField>
  );
}
