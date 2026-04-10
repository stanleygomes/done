"use client";

import React from "react";
import { LoginProvider } from "../../modules/auth/login-context";
import LoginFooter from "./login-footer";

export default function LoginContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoginProvider>
      <div className="flex min-h-screen flex-col bg-background font-base">
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 bg-secondary-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:70px_70px]">
          {children}
        </div>
        <LoginFooter />
      </div>
    </LoginProvider>
  );
}
