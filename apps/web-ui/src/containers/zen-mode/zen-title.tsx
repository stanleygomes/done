import React from "react";

interface ZenTitleProps {
  content: string;
}

export function ZenTitle({ content }: ZenTitleProps) {
  return (
    <h1 className="w-full text-center text-4xl md:text-5xl font-black leading-tight tracking-tight text-foreground py-2">
      {content}
    </h1>
  );
}
