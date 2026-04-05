"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface TopMenuContextType {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  setLeftContent: (content: React.ReactNode) => void;
  setRightContent: (content: React.ReactNode) => void;
}

const TopMenuContext = createContext<TopMenuContextType | undefined>(undefined);

export function TopMenuProvider({ children }: { children: React.ReactNode }) {
  const [leftContent, setLeftContentState] = useState<React.ReactNode>(null);
  const [rightContent, setRightContentState] = useState<React.ReactNode>(null);

  const setLeftContent = useCallback((content: React.ReactNode) => {
    setLeftContentState(content);
  }, []);

  const setRightContent = useCallback((content: React.ReactNode) => {
    setRightContentState(content);
  }, []);

  return (
    <TopMenuContext.Provider
      value={{ leftContent, rightContent, setLeftContent, setRightContent }}
    >
      {children}
    </TopMenuContext.Provider>
  );
}

export function useTopMenu() {
  const context = useContext(TopMenuContext);
  if (context === undefined) {
    throw new Error("useTopMenu must be used within a TopMenuProvider");
  }
  return context;
}
