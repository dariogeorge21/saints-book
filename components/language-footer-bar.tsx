"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { SUPPORTED_LANGUAGES, SupportedLanguage } from "@/lib/i18n";
import { Globe, Settings, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageFooterBar() {
  const { language, setLanguage, mode, remainingDays, t } = useLanguage();

  return (
    <section className="relative z-30 bg-[#2b1f35] border-t border-[rgba(194,189,206,0.12)] py-5 text-[#C2BDCE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Language Indicator & Icon */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FF2477]/10 border border-[#FF2477]/30 flex items-center justify-center text-[#FF2477]">
            <Globe className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-[200] tracking-[0.25em] text-[#F8F6FA]">
                {t("footerBar.title")}
              </span>
              <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-[#352741] border border-[rgba(194,189,206,0.14)] text-[#FF2477]">
                {mode === "permanent"
                  ? t("footerBar.modePermanent")
                  : mode === "remember_7days"
                  ? `${t("footerBar.mode7days")}${
                      remainingDays !== null ? ` (${remainingDays}d)` : ""
                    }`
                  : t("footerBar.modeSession")}
              </span>
            </div>
            <p className="text-[11px] font-[200] text-[#C2BDCE]/60 tracking-wide hidden sm:block">
              English • മലയാളം • हिन्दी
            </p>
          </div>
        </div>

        {/* Center: Language Switch Buttons */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-[#352741]/80 border border-[rgba(194,189,206,0.14)] backdrop-blur-sm">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isActive = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-[200] tracking-wider transition-all flex items-center gap-1.5 cursor-pointer",
                  isActive
                    ? "bg-[#FF2477] text-white shadow-[0_0_12px_rgba(255,36,119,0.35)] font-[400]"
                    : "text-[#C2BDCE] hover:text-[#F8F6FA] hover:bg-[#433352]/50"
                )}
                title={`Switch language to ${lang.label}`}
              >
                {isActive && <Check className="w-3 h-3 stroke-[2]" />}
                <span>{lang.nativeLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Quick Settings Link */}
        <Link
          href="/settings"
          className="inline-flex items-center gap-1.5 text-xs uppercase font-[200] tracking-[0.2em] text-[#C2BDCE]/80 hover:text-[#FF2477] transition-colors py-1 px-3 rounded-lg border border-transparent hover:border-[rgba(194,189,206,0.15)] group"
          title="Open Language & Persistence Settings"
        >
          <Settings className="w-3.5 h-3.5 stroke-[1.5] group-hover:rotate-45 transition-transform duration-300" />
          <span>{t("footerBar.settings")}</span>
        </Link>
      </div>
    </section>
  );
}
