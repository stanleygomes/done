import { TaskProjectSelector } from "../../components/task-project-selector";

interface TaskProjectProps {
  projectId?: string;
  onUpdateProject: (projectId: string | undefined) => void;
}

export function TaskProject({ projectId, onUpdateProject }: TaskProjectProps) {
  return (
    <>
      <label className="mb-2 block text-sm font-black">Project</label>
      <TaskProjectSelector
        value={projectId || "none"}
        onChange={(value) =>
          onUpdateProject(value === "none" ? undefined : value)
        }
        isVisible={true}
        className="bg-[#fffaf0] w-full"
      />
    </>
  );
}
