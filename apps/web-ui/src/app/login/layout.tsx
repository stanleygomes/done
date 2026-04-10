"use client";

import React from "react";
import LoginContainer from "@containers/login/login";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LoginContainer>{children}</LoginContainer>;
}
