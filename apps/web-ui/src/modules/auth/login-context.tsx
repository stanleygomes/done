"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LoginContextType {
  email: string;
  setEmail: (email: string) => void;
  isNewUser: boolean;
  setIsNewUser: (isNew: boolean) => void;
  tempPassword?: string;
  setTempPassword: (password: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [tempPassword, setTempPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        email,
        setEmail,
        isNewUser,
        setIsNewUser,
        tempPassword,
        setTempPassword,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
}
