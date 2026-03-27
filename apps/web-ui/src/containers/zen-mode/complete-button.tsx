import { Check } from "lucide-react";

interface ZenCompleteButtonProps {
  done: boolean;
  onClick: () => void;
}

export function ZenCompleteButton({ done, onClick }: ZenCompleteButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full md:w-auto justify-center items-center gap-4 rounded-base border-4 border-black px-10 py-5 text-3xl font-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none ${
        done ? "bg-[#a7f3d0] text-black" : "bg-[#cbf0f8] text-black"
      }`}
    >
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-black ${
          done ? "bg-black text-white" : "bg-white"
        }`}
      >
        {done && <Check className="w-6 h-6" strokeWidth={4} />}
      </div>
      {done ? "COMPLETED" : "COMPLETE TASK"}
    </button>
  );
}
