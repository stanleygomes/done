interface TaskUrlProps {
  url: string;
  onUpdateUrl: (url: string) => void;
}

export function TaskUrl({ url, onUpdateUrl }: TaskUrlProps) {
  return (
    <>
      <label className="mb-2 block text-sm font-black" htmlFor="task-url">
        URL
      </label>
      <input
        id="task-url"
        type="url"
        value={url}
        onChange={(e) => onUpdateUrl(e.target.value)}
        className="w-full rounded-base border-2 border-black bg-[#fffaf0] px-3 py-2 text-sm outline-none"
        placeholder="https://example.com"
      />
    </>
  );
}
