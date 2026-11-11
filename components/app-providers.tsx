"use client";

import React, { ReactNode, useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/lib/language-context";
import { LanguagePromptModal } from "@/components/language-prompt-modal";
import { cn } from "@/lib/utils";

function LanguageHtmlSync({ children }: { children: ReactNode }) {
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      if (language === "ml") {
        document.documentElement.classList.add("font-malayalam");
        document.documentElement.classList.remove("font-hindi");
      } else if (language === "hi") {
        document.documentElement.classList.add("font-hindi");
        document.documentElement.classList.remove("font-malayalam");
      } else {
        document.documentElement.classList.remove("font-malayalam");
        document.documentElement.classList.remove("font-hindi");
      }
    }
  }, [language]);

  return (
    <div
      className={cn(
        "min-h-full flex flex-col font-sans",
        language === "ml" && "font-malayalam",
        language === "hi" && "font-hindi"
      )}
    >
      {children}
    </div>
  );
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <LanguageHtmlSync>{children}</LanguageHtmlSync>
      <LanguagePromptModal />
    </LanguageProvider>
  );
}
