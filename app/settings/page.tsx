"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage, PersistenceMode } from "@/lib/language-context";
import { SUPPORTED_LANGUAGES, SupportedLanguage } from "@/lib/i18n";
import { SAINTS_DATA } from "@/lib/data";
import {
  Globe,
  Settings,
  Check,
  RotateCcw,
  Clock,
  Sparkles,
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const {
    language,
    mode,
    expiresAt,
    remainingDays,
    setLanguage,
    setMode,
    resetPreferences,
    getSaintContent,
    t,
    isTransitioning,
  } = useLanguage();

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleLanguageSelect = (lang: SupportedLanguage) => {
    setLanguage(lang);
    showNotification(t("settings.savedSuccess"));
  };

  const handleModeChange = (newMode: PersistenceMode) => {
    setMode(newMode);
    showNotification(t("settings.savedSuccess"));
  };

  const handleReset = () => {
    resetPreferences();
    showNotification("Reset to English defaults successfully.");
  };

  // Preview sample saint (St. Alphonsa)
  const sampleSaint = SAINTS_DATA[1];
  const sampleContent = getSaintContent(sampleSaint, language);

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language);

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col bg-[#3B2D47] text-[#C2BDCE] selection:bg-[#FF2477] selection:text-white",
        language === "ml" && "font-malayalam",
        language === "hi" && "font-hindi"
      )}
    >
      <Navbar />

      <main className="flex-1 py-12 sm:py-20">
        <div
          className={cn(
            "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 transition-all duration-300",
            isTransitioning && "lang-switch-active"
          )}
        >
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between border-b border-[rgba(194,189,206,0.12)] pb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase font-[200] tracking-[0.25em] text-[#C2BDCE] hover:text-[#FF2477] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5] group-hover:-translate-x-1 transition-transform" />
              <span>{t("nav.home")}</span>
            </Link>

            <span className="text-[10px] font-mono tracking-widest text-[#FF2477] uppercase px-3 py-1 rounded-full bg-[#FF2477]/10 border border-[#FF2477]/30">
              SaintsBook Preferences
            </span>
          </div>

          {/* Page Header */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase font-[200] tracking-[0.3em] text-[#FF2477]">
              <Settings className="w-4 h-4 stroke-[1.5]" />
              <span>{t("settings.masthead")}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-[100] uppercase tracking-[0.16em] text-[#F8F6FA]">
              {t("settings.title")}
            </h1>

            <p className="text-sm sm:text-base font-[200] text-[#C2BDCE] max-w-2xl leading-relaxed tracking-wide">
              {t("settings.subtitle")}
            </p>
          </header>

          {/* Feedback Toast Notification */}
          {notification && (
            <div className="p-4 rounded-xl bg-[#FF2477]/15 border border-[#FF2477]/40 flex items-center gap-3 text-white text-xs font-[200] tracking-wide animate-in fade-in duration-300">
              <CheckCircle2 className="w-4 h-4 text-[#FF2477] flex-shrink-0" />
              <span>{notification}</span>
            </div>
          )}

          {/* Section 1: Choose Website Language */}
          <section className="space-y-6 p-6 sm:p-8 rounded-2xl bg-[#352741]/60 border border-[rgba(194,189,206,0.14)] backdrop-blur-sm">
            <div className="space-y-1">
              <h2 className="text-lg font-[200] uppercase tracking-[0.2em] text-[#F8F6FA] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#FF2477]" />
                <span>{t("settings.languageSection")}</span>
              </h2>
              <p className="text-xs font-[200] text-[#C2BDCE]/70 tracking-wide">
                {t("settings.languageSectionDesc")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={cn(
                      "p-5 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-4 cursor-pointer",
                      isSelected
                        ? "bg-[#FF2477]/15 border-[#FF2477] text-white shadow-[0_0_20px_rgba(255,36,119,0.25)]"
                        : "bg-[#30233b]/70 border-[rgba(194,189,206,0.1)] text-[#C2BDCE] hover:border-[rgba(194,189,206,0.3)] hover:bg-[#30233b]"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-[#FF2477] px-2 py-0.5 rounded bg-[#FF2477]/10 uppercase">
                        {lang.flag}
                      </span>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-[10px] font-mono tracking-wider text-[#FF2477]">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                          <span>{t("settings.activeBadge")}</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="text-xl font-[300] tracking-wide text-[#F8F6FA]">
                        {lang.nativeLabel}
                      </div>
                      <div className="text-xs font-[200] text-[#C2BDCE]/60 tracking-wider uppercase mt-0.5">
                        {lang.label} • {lang.script}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Section 2: Persistence Strategy */}
          <section className="space-y-6 p-6 sm:p-8 rounded-2xl bg-[#352741]/60 border border-[rgba(194,189,206,0.14)] backdrop-blur-sm">
            <div className="space-y-1">
              <h2 className="text-lg font-[200] uppercase tracking-[0.2em] text-[#F8F6FA] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF2477]" />
                <span>{t("settings.persistenceSection")}</span>
              </h2>
              <p className="text-xs font-[200] text-[#C2BDCE]/70 tracking-wide">
                {t("settings.persistenceSectionDesc")}
              </p>
            </div>

            <div className="space-y-3">
              {/* Option 1: Permanently set language */}
              <label
                className={cn(
                  "p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all",
                  mode === "permanent"
                    ? "bg-[#3d2c4c] border-[#FF2477] shadow-[0_0_15px_rgba(255,36,119,0.15)]"
                    : "bg-[#30233b]/60 border-[rgba(194,189,206,0.1)] hover:border-[rgba(194,189,206,0.25)]"
                )}
              >
                <input
                  type="radio"
                  name="persistenceMode"
                  checked={mode === "permanent"}
                  onChange={() => handleModeChange("permanent")}
                  className="mt-1 accent-[#FF2477]"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-[300] text-[#F8F6FA]">
                      {t("settings.permanentLabel", {
                        lang: currentLangObj?.nativeLabel || "English",
                      })}
                    </span>
                    <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-[#FF2477]/10 text-[#FF2477] uppercase">
                      Indefinite
                    </span>
                  </div>
                  <p className="text-xs font-[200] text-[#C2BDCE]/70 leading-relaxed">
                    {t("settings.permanentDesc")}
                  </p>
                </div>
              </label>

              {/* Option 2: Remember for 7 days */}
              <label
                className={cn(
                  "p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all",
                  mode === "remember_7days"
                    ? "bg-[#3d2c4c] border-[#FF2477] shadow-[0_0_15px_rgba(255,36,119,0.15)]"
                    : "bg-[#30233b]/60 border-[rgba(194,189,206,0.1)] hover:border-[rgba(194,189,206,0.25)]"
                )}
              >
                <input
                  type="radio"
                  name="persistenceMode"
                  checked={mode === "remember_7days"}
                  onChange={() => handleModeChange("remember_7days")}
                  className="mt-1 accent-[#FF2477]"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-[300] text-[#F8F6FA]">
                      {t("settings.sevenDaysLabel")}
                    </span>
                    <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-[#FF2477]/15 text-[#FF2477] uppercase">
                      Recommended
                    </span>
                    {remainingDays !== null && expiresAt && (
                      <span className="text-[10px] font-mono tracking-wider text-[#C2BDCE]/60">
                        {t("settings.expiresNotice", {
                          days: remainingDays,
                          date: new Date(expiresAt).toLocaleDateString(),
                        })}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-[200] text-[#C2BDCE]/70 leading-relaxed">
                    {t("settings.sevenDaysDesc")}
                  </p>
                </div>
              </label>

              {/* Option 3: Ask each time */}
              <label
                className={cn(
                  "p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all",
                  mode === "ask_each_time"
                    ? "bg-[#3d2c4c] border-[#FF2477] shadow-[0_0_15px_rgba(255,36,119,0.15)]"
                    : "bg-[#30233b]/60 border-[rgba(194,189,206,0.1)] hover:border-[rgba(194,189,206,0.25)]"
                )}
              >
                <input
                  type="radio"
                  name="persistenceMode"
                  checked={mode === "ask_each_time"}
                  onChange={() => handleModeChange("ask_each_time")}
                  className="mt-1 accent-[#FF2477]"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-[300] text-[#F8F6FA]">
                      {t("settings.askEachTimeLabel")}
                    </span>
                    <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-[#352741] text-[#C2BDCE]/60 uppercase">
                      Session
                    </span>
                  </div>
                  <p className="text-xs font-[200] text-[#C2BDCE]/70 leading-relaxed">
                    {t("settings.askEachTimeDesc")}
                  </p>
                </div>
              </label>
            </div>
          </section>

          {/* Section 3: Live Chronicle Typography Preview */}
          <section className="space-y-6 p-6 sm:p-8 rounded-2xl bg-[#32243d] border border-[rgba(194,189,206,0.14)]">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[rgba(194,189,206,0.1)] pb-4">
              <div className="space-y-1">
                <h2 className="text-base font-[200] uppercase tracking-[0.2em] text-[#F8F6FA] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#FF2477]" />
                  <span>{t("settings.previewSection")}</span>
                </h2>
                <p className="text-xs font-[200] text-[#C2BDCE]/70 tracking-wide">
                  {t("settings.previewSectionDesc")}
                </p>
              </div>

              <span className="text-[10px] font-mono tracking-widest text-[#FF2477] uppercase px-3 py-1 rounded-full bg-[#FF2477]/10 border border-[#FF2477]/30">
                Active: {currentLangObj?.nativeLabel}
              </span>
            </div>

            {/* Preview Card */}
            <div className="p-6 rounded-xl bg-[#2b1f35] border border-[rgba(194,189,206,0.1)] space-y-5">
              <div className="flex items-center justify-between text-xs font-[200]">
                <span className="text-[#FF2477] uppercase tracking-[0.25em] text-[10px]">
                  {sampleSaint.era} • {sampleContent.location}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#FF2477]/15 text-[#FF2477] text-[10px] font-mono">
                  {t("story.feastDay")}: {sampleContent.feastDate}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-[100] uppercase tracking-[0.15em] text-[#F8F6FA]">
                  {sampleContent.name}
                </h3>
                <p className="text-xs font-[200] text-[#FF2477] tracking-[0.18em] uppercase mt-1">
                  {sampleContent.epithet}
                </p>
              </div>

              {sampleContent.quote && (
                <blockquote className="p-4 rounded-lg bg-[#352741]/60 border-l-2 border-[#FF2477] text-xs sm:text-sm font-[200] italic text-[#F8F6FA]/90">
                  “{sampleContent.quote}”
                </blockquote>
              )}

              <p className="text-xs sm:text-sm font-[200] leading-relaxed text-[#C2BDCE] tracking-wide">
                {sampleContent.story[0]}
              </p>
            </div>
          </section>

          {/* Section 4: Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[rgba(194,189,206,0.12)]">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-xs font-[200] uppercase tracking-[0.22em] text-[#C2BDCE]/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-[#352741] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t("settings.resetButton")}</span>
            </button>

            <div className="flex items-center gap-3">
              <Link
                href="/saints"
                className="px-6 py-2.5 rounded-lg border border-[rgba(194,189,206,0.2)] hover:border-[#FF2477] text-xs uppercase tracking-[0.22em] font-[200] text-[#F8F6FA] hover:text-white transition-all bg-[#352741]/50"
              >
                {t("nav.allSaints")}
              </Link>
              <Link
                href="/"
                className="px-6 py-2.5 rounded-lg bg-[#FF2477] hover:bg-[#ff3f8b] text-white text-xs uppercase tracking-[0.25em] font-[200] transition-all shadow-[0_0_15px_rgba(255,36,119,0.3)] hover:shadow-[0_0_25px_rgba(255,36,119,0.5)]"
              >
                {t("nav.home")}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
