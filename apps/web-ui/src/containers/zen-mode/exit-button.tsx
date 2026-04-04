import { useTranslation } from "react-i18next";
import { Minimize2 } from "lucide-react";

interface ZenExitButtonProps {
  onClick: () => void;
}

export function ZenExitButton({ onClick }: ZenExitButtonProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed w-full flex justify-center left-0 bottom-0 py-6">
      <button
        onClick={onClick}
        className="cursor-pointer flex items-center gap-2 backdrop-blur-sm rounded-base border-2 border-border bg-[#ff8fab] dark:bg-[#ff8fab]/20 px-6 py-3 font-black shadow-shadow hover:shadow-none transition-all z-50 whitespace-nowrap"
      >
        <Minimize2 className="w-5 h-5" />
        {t("zen_mode.exit")}
      </button>
    </div>
  );
}
