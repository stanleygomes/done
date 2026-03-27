interface ZenNotesProps {
  notes?: string;
}

export function ZenNotes({ notes }: ZenNotesProps) {
  if (!notes) return null;

  return (
    <div className="w-full rounded-base border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="font-black text-xl mb-3 border-b-2 border-black pb-2">
        Notes
      </h3>
      <p className="whitespace-pre-wrap font-bold text-gray-700 text-lg">
        {notes}
      </p>
    </div>
  );
}
