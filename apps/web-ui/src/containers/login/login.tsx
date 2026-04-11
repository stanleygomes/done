"use client";

import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";
import { LoginProvider } from "../../modules/auth/login-context";

export default function LoginContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <LoginProvider>
      <div className="flex min-h-screen flex-col lg:flex-row bg-background font-base overflow-x-hidden">
        {/* Left Side (Desktop) / Bottom Side (Mobile) */}
        <div className="flex flex-col flex-1 w-full relative">
          {/* Mobile Top Image Section */}
          <div className="lg:hidden w-full h-[30vh] bg-main flex items-center justify-center p-6 relative overflow-hidden border-b-4 border-border">
            {/* Decorative elements for mobile */}
            <div className="absolute top-4 left-4 h-12 w-12 border-2 border-border bg-background rounded-base rotate-3 opacity-50" />
            <div className="absolute bottom-10 right-10 h-16 w-16 border-2 border-border bg-secondary-background rounded-full -rotate-12 opacity-50" />
            <div className="absolute top-1/2 right-4 -translate-y-1/2 h-8 w-8 border-2 border-border bg-foreground rotate-45 opacity-30" />

            <div className="relative h-full aspect-square max-h-[220px] z-10 drop-shadow-[5px_5px_0px_rgba(0,0,0,1)]">
              <Image
                src="/images/user-happy.png"
                alt="App mascot"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Form Content Area */}
          <div className="flex-1 flex flex-col lg:justify-center items-center w-full relative">
            {/* Desktop Brand Logo (Top Left) */}
            <div className="hidden lg:flex absolute top-8 left-8 items-center gap-3 z-30">
              <div className="relative h-10 w-10 overflow-hidden rounded-base border-2 border-border bg-main shadow-[2px_2px_0px_0px_var(--border)]">
                <Image
                  src="/images/logo.png"
                  alt="App Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-black text-xl uppercase tracking-tighter text-foreground">
                {t("login.title")}
              </span>
            </div>

            {/* Background pattern for the form area on desktop */}
            <div className="hidden lg:block absolute inset-0 bg-secondary-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:70px_70px] z-0" />

            {/* Scrollable container for forms */}
            <main
              className="w-full h-full flex flex-col items-center justify-start lg:justify-center p-4 py-8 md:p-10 lg:p-12 z-10 -mt-8 lg:mt-0 bg-background lg:bg-transparent rounded-t-[32px] lg:rounded-none"
              style={{ minHeight: "calc(65vh + 32px)" }}
            >
              <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-full max-w-lg rounded-base border-none md:border-4 border-border bg-transparent md:bg-secondary-background p-2 md:p-10 shadow-none md:shadow-[6px_6px_0px_0px_var(--border)] md:shadow-[10px_10px_0px_0px_var(--border)]">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Right Side (Desktop Decorative Panel) */}
        <div className="hidden lg:flex w-[45%] xl:w-1/2 bg-main relative items-center justify-center overflow-hidden border-l-4 border-border">
          {/* Decorative Neo-brutalist Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)] bg-[size:60px_60px]" />

          {/* Large Floating Shapes */}
          <div className="absolute top-20 right-[10%] h-48 w-48 border-4 border-border bg-secondary-background rounded-base rotate-12 shadow-[12px_12px_0px_0px_var(--border)]" />
          <div className="absolute bottom-20 left-[10%] h-40 w-40 border-4 border-border bg-background rounded-full -rotate-6 shadow-[12px_12px_0px_0px_var(--border)]" />
          <div className="absolute top-1/2 left-10 -translate-y-1/2 h-20 w-20 border-4 border-border bg-foreground rotate-45" />

          {/* Content Container */}
          <div className="relative w-full max-w-xl px-12 z-10 flex flex-col items-center gap-12 text-center">
            {/* Main Character Image */}
            <div className="relative w-full aspect-square max-w-[450px] transition-transform hover:scale-105 hover:rotate-2 duration-500">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl" />
              <Image
                src="/images/user-happy.png"
                alt="Done"
                fill
                className="object-contain drop-shadow-[30px_30px_0px_rgba(0,0,0,1)]"
                priority
              />
            </div>

            {/* Decorative Slogan Card */}
            <div className="bg-background p-8 border-4 border-border shadow-[12px_12px_0px_0px_var(--border)] -rotate-1 max-w-lg">
              <h2 className="text-4xl xl:text-5xl font-black uppercase tracking-tighter mb-4 text-foreground">
                {t("login.slogan.title")}
              </h2>
              <p className="text-lg xl:text-xl font-bold text-foreground/80 leading-snug italic">
                {t("login.slogan.subtitle")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </LoginProvider>
  );
}
