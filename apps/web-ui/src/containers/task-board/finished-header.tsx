interface FinishedHeaderProps {
  onClear: () => void;
}

export function FinishedHeader({ onClear }: FinishedHeaderProps) {
  return (
    <div className="flex items-center justify-between px-1">
      <h2 className="text-2xl font-black text-black">Finished</h2>
      <button
        onClick={onClear}
        className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
      >
        Delete all finished tasks
      </button>
    </div>
  );
}
