interface TaskNotesProps {
  notes: string;
  onUpdateNotes: (notes: string) => void;
}

export function TaskNotes({ notes, onUpdateNotes }: TaskNotesProps) {
  return (
    <>
      <label className="mb-2 block text-sm font-black">Notes</label>
      <textarea
        value={notes}
        onChange={(e) => onUpdateNotes(e.target.value)}
        rows={4}
        className="w-full resize-y rounded-base border-2 border-black bg-[#fffaf0] px-3 py-2 outline-none"
        placeholder="Write notes about this task"
      />
    </>
  );
}
