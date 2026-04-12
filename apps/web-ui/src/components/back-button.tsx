"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
}

export function BackButton({
  onClick,
  className = "",
  label,
}: BackButtonProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`group mb-8 inline-flex items-center gap-1 text-sm font-bold text-foreground/50 transition-colors hover:text-foreground cursor-pointer ${className}`}
    >
      <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
      {label || t("settings.back")}
    </button>
  );
}
