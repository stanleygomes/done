"use client";

import { useTranslation } from "react-i18next";

export default function LoginFooter() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-8 md:mt-4 text-center flex flex-col items-center gap-4 z-10">
      <span className="text-xs font-bold text-foreground/40 leading-tight">
        {t("login.form.agreement")}{" "}
        <a
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline decoration-2 underline-offset-2 hover:text-main"
        >
          {t("login.links.privacy")}
        </a>{" "}
        {t("login.form.and")}{" "}
        <a
          href="/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline decoration-2 underline-offset-2 hover:text-main"
        >
          {t("login.links.terms")}
        </a>
        .
      </span>
      <div className="text-[10px] md:text-xs font-black uppercase tracking-wider text-foreground/30 italic">
        {t("login.footer", { year: currentYear })}
      </div>
    </footer>
  );
}
