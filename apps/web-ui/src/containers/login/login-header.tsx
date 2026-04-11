"use client";

import { Icon } from "@paul/ui/components/ui/icon";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

interface LoginHeaderProps {
  title: string;
  description?: React.ReactNode;
  backHref?: string;
  showLogo?: boolean;
  icon?: string;
}

export function LoginHeader({
  title,
  description,
  backHref,
  showLogo,
  icon,
}: LoginHeaderProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="pb-4 relative">
      {backHref && (
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => router.push(backHref)}
            className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-base border-2 border-border cursor-pointer bg-main text-main-foreground shadow-shadow transition-all hover:bg-main/90 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none z-10"
            title={t("settings.back")}
          >
            <ArrowLeft size={24} strokeWidth={3} />
          </button>
        </div>
      )}
      <div className="text-3xl font-black uppercase tracking-tighter text-foreground flex flex-col gap-4">
        {showLogo && (
          <div className="lg:hidden relative h-16 w-16 md:h-20 md:w-20 overflow-hidden rounded-base border-2 md:border-4 border-border bg-main shadow-shadow">
            <Image
              src="/images/logo.png"
              alt="Done Logo"
              fill
              className="object-cover"
            />
          </div>
        )}
        {icon && (
          <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-base border-2 md:border-4 border-border bg-main text-main-foreground shadow-shadow">
            <Icon icon={icon} className="h-6 w-6 md:h-8 md:w-8" />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <div className="text-2xl md:text-3xl leading-tight">{title}</div>
          {description && (
            <div className="text-xs md:text-sm font-bold text-foreground/40 normal-case tracking-normal">
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
