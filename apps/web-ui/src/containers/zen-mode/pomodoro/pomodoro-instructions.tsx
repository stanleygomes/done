"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@paul/ui";
import { Info, X, Zap, Coffee, Wind, Compass } from "lucide-react";

const iconMap = {
  focus: <Zap className="w-5 h-5 text-main" />,
  short_break: <Coffee className="w-5 h-5 text-[#cbf0f8]" />,
  long_break: <Wind className="w-5 h-5 text-[#f8cbdf]" />,
  adapter: <Compass className="w-5 h-5 text-foreground" />,
};

export function PomodoroInstructions() {
  const { t } = useTranslation();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-border shadow-sm hover:scale-110 active:scale-95 hover:shadow-md transition-all bg-background text-foreground group"
          title={t("zen_mode.pomodoro.instructions.trigger_tooltip")}
        >
          <Info className="w-5 h-5 group-hover:text-main transition-colors" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="z-[10001]">
        <div className="flex flex-col h-full max-h-[85vh] overflow-y-auto font-['Outfit']">
          <DrawerHeader className="relative pb-6 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <DrawerTitle className="text-3xl font-black tracking-tight">
                  {t("zen_mode.pomodoro.instructions.title")}
                </DrawerTitle>
                <DrawerDescription className="text-lg font-base opacity-70">
                  {t("zen_mode.pomodoro.instructions.description")}
                </DrawerDescription>
              </div>
              <DrawerClose asChild>
                <button className="p-2 rounded-2xl border-2 border-transparent hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-90">
                  <X className="w-7 h-7" />
                </button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="p-8 flex flex-col gap-8 bg-secondary-background/30 rounded-t-[2rem]">
            <section className="bg-background/80 backdrop-blur-sm border-2 border-border p-6 rounded-[1.5rem] shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Info size={120} />
              </div>
              <h3 className="font-black text-xl mb-3 flex items-center gap-2">
                {t("zen_mode.pomodoro.instructions.origin_title")}
              </h3>
              <p className="text-lg leading-relaxed font-base leading-relaxed opacity-80">
                {t("zen_mode.pomodoro.instructions.origin_text")}
              </p>
            </section>

            <section className="bg-background/80 backdrop-blur-sm border-2 border-border p-6 rounded-[1.5rem] shadow-sm">
              <h3 className="font-black text-xl mb-6">
                {t("zen_mode.pomodoro.instructions.best_practices_title")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["focus", "short_break", "long_break", "adapter"].map(
                  (key) => (
                    <div
                      key={key}
                      className="flex gap-4 p-4 rounded-2xl border border-border/50 bg-background/50 hover:bg-background transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-secondary-background flex items-center justify-center shrink-0 border border-border/20 shadow-sm">
                        {iconMap[key as keyof typeof iconMap]}
                      </div>
                      <p
                        className="text-base font-base leading-snug"
                        dangerouslySetInnerHTML={{
                          __html: t(
                            `zen_mode.pomodoro.instructions.practices.${key}`,
                          ),
                        }}
                      />
                    </div>
                  ),
                )}
              </div>
            </section>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
