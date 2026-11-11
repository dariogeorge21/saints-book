"use client";

import React, { useState } from "react";
import { useLanguage, PersistenceMode } from "@/lib/language-context";
import { SUPPORTED_LANGUAGES, SupportedLanguage, UI_TRANSLATIONS } from "@/lib/i18n";
import { Globe, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguagePromptModal() {
  const { language, setLanguage, showPrompt, setShowPrompt } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(language);
  const [selectedMode, setSelectedMode] =
    useState<PersistenceMode>("remember_7days");

  if (!showPrompt) return null;

  // Dynamic localization helper based on the currently selected language in the modal
  const modalT = (key: string, replacements?: Record<string, string | number>): string => {
    const dict = UI_TRANSLATIONS[selectedLang] || UI_TRANSLATIONS.en;
    let text = dict[key] || UI_TRANSLATIONS.en[key] || key;
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
      });
    }
    return text;
  };

  const handleLanguageSelect = (lang: SupportedLanguage) => {
    setSelectedLang(lang);
    // Real-time live dynamic change before confirmation
    setLanguage(lang, selectedMode);
  };

  const handleModeChange = (mode: PersistenceMode) => {
    setSelectedMode(mode);
    setLanguage(selectedLang, mode);
  };

  const handleConfirm = () => {
    setLanguage(selectedLang, selectedMode);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setLanguage(selectedLang, "ask_each_time");
    setShowPrompt(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className={cn(
          "relative w-full max-w-lg bg-[#2f223a] border border-[#FF2477]/40 rounded-2xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.6)] space-y-6 transition-all duration-300",
          selectedLang === "ml" && "font-malayalam",
          selectedLang === "hi" && "font-hindi"
        )}
      >
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#C2BDCE]/60 hover:text-white hover:bg-[#3d2c4b] transition-colors cursor-pointer"
          aria-label="Close language selector"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header - Dynamically updates in selectedLang */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF2477]/15 border border-[#FF2477]/40 flex items-center justify-center text-[#FF2477] shrink-0">
            <Globe className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-[200] tracking-wider text-[#F8F6FA] uppercase">
              {modalT("prompt.title")}
            </h3>
            <p className="text-xs font-[200] text-[#C2BDCE]/70 tracking-wide mt-0.5">
              {modalT("prompt.subtitle")}
            </p>
          </div>
        </div>

        {/* Language Selection Buttons */}
        <div className="grid grid-cols-3 gap-3">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={cn(
                  "p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer",
                  isSelected
                    ? "bg-[#FF2477]/20 border-[#FF2477] text-white shadow-[0_0_15px_rgba(255,36,119,0.25)] ring-1 ring-[#FF2477]"
                    : "bg-[#382a46]/60 border-[rgba(194,189,206,0.12)] text-[#C2BDCE] hover:border-[rgba(194,189,206,0.25)] hover:text-white"
                )}
              >
                <span className="text-sm font-[300] tracking-wide">
                  {lang.nativeLabel}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#FF2477] uppercase">
                  {lang.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Persistence Preference Choice - Dynamically updates in selectedLang */}
        <div className="space-y-2 pt-2 border-t border-[rgba(194,189,206,0.1)]">
          <span className="text-[11px] font-[200] uppercase tracking-[0.2em] text-[#C2BDCE]/70 block">
            {modalT("prompt.persistenceLabel")}
          </span>

          <div className="space-y-1.5">
            {/* 7 Days Option */}
            <label
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-lg border text-xs font-[200] tracking-wide cursor-pointer transition-colors",
                selectedMode === "remember_7days"
                  ? "bg-[#3d2c4c] border-[#FF2477]/60 text-[#F8F6FA]"
                  : "bg-[#342640]/50 border-transparent text-[#C2BDCE]/70 hover:bg-[#342640]"
              )}
            >
              <input
                type="radio"
                name="persistence"
                checked={selectedMode === "remember_7days"}
                onChange={() => handleModeChange("remember_7days")}
                className="accent-[#FF2477]"
              />
              <span className="flex-1">{modalT("prompt.remember7days")}</span>
              <span className="text-[9px] font-mono tracking-widest text-[#FF2477] uppercase px-1.5 py-0.5 rounded bg-[#FF2477]/10 border border-[#FF2477]/20">
                {modalT("prompt.recommendedBadge")}
              </span>
            </label>

            {/* Permanent Option */}
            <label
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-lg border text-xs font-[200] tracking-wide cursor-pointer transition-colors",
                selectedMode === "permanent"
                  ? "bg-[#3d2c4c] border-[#FF2477]/60 text-[#F8F6FA]"
                  : "bg-[#342640]/50 border-transparent text-[#C2BDCE]/70 hover:bg-[#342640]"
              )}
            >
              <input
                type="radio"
                name="persistence"
                checked={selectedMode === "permanent"}
                onChange={() => handleModeChange("permanent")}
                className="accent-[#FF2477]"
              />
              <span className="flex-1">{modalT("prompt.permanent")}</span>
            </label>

            {/* Ask Each Time Option */}
            <label
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-lg border text-xs font-[200] tracking-wide cursor-pointer transition-colors",
                selectedMode === "ask_each_time"
                  ? "bg-[#3d2c4c] border-[#FF2477]/60 text-[#F8F6FA]"
                  : "bg-[#342640]/50 border-transparent text-[#C2BDCE]/70 hover:bg-[#342640]"
              )}
            >
              <input
                type="radio"
                name="persistence"
                checked={selectedMode === "ask_each_time"}
                onChange={() => handleModeChange("ask_each_time")}
                className="accent-[#FF2477]"
              />
              <span className="flex-1">{modalT("prompt.sessionOnly")}</span>
            </label>
          </div>
        </div>

        {/* Action Button - Dynamically updates in selectedLang */}
        <div className="pt-2">
          <button
            onClick={handleConfirm}
            className="w-full py-3 rounded-xl bg-[#FF2477] hover:bg-[#ff3f8b] text-white text-xs uppercase tracking-[0.25em] font-[200] transition-all shadow-[0_0_20px_rgba(255,36,119,0.35)] hover:shadow-[0_0_30px_rgba(255,36,119,0.55)] cursor-pointer flex items-center justify-center gap-2"
          >
            <Check className="w-3.5 h-3.5 stroke-[2]" />
            <span>{modalT("prompt.confirm")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
