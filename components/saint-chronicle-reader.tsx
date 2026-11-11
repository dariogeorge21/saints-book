"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Saint } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { SUPPORTED_LANGUAGES, SupportedLanguage } from "@/lib/i18n";
import {
  Calendar,
  Sparkles,
  Award,
  Heart,
  MapPin,
  Languages,
  ArrowLeft,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SaintChronicleReaderProps {
  saint: Saint;
  prevSaint: Saint | null;
  nextSaint: Saint | null;
}

export function SaintChronicleReader({
  saint,
  prevSaint,
  nextSaint,
}: SaintChronicleReaderProps) {
  const { language: globalLanguage, setLanguage, getSaintContent, t, isTransitioning } =
    useLanguage();

  // Local reader language: starts with the global active language, can be switched independently on this story
  const [readerLanguage, setReaderLanguage] =
    useState<SupportedLanguage>(globalLanguage);
  const [localTransitioning, setLocalTransitioning] = useState(false);

  // Sync if global language changes while viewing
  React.useEffect(() => {
    setReaderLanguage(globalLanguage);
  }, [globalLanguage]);

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLocalTransitioning(true);
    setReaderLanguage(lang);
    setTimeout(() => {
      setLocalTransitioning(false);
    }, 280);
  };

  const localized = getSaintContent(saint, readerLanguage);

  return (
    <div
      className={cn(
        "space-y-12 transition-all duration-300",
        (isTransitioning || localTransitioning) && "lang-switch-active",
        readerLanguage === "ml" && "font-malayalam",
        readerLanguage === "hi" && "font-hindi"
      )}
    >
      {/* Top Bar: Back Breadcrumb & Story Reader Language Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[rgba(194,189,206,0.12)] pb-6">
        <Link
          href="/saints"
          className="inline-flex items-center gap-2 text-xs uppercase font-[200] tracking-[0.25em] text-[#C2BDCE] hover:text-[#FF2477] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5] group-hover:-translate-x-1 transition-transform" />
          <span>{t("story.back")}</span>
        </Link>

        {/* Story Reader Language Switcher Tabs */}
        <div className="flex items-center gap-2 bg-[#352741]/80 p-1.5 rounded-xl border border-[rgba(194,189,206,0.15)] self-stretch sm:self-auto justify-between sm:justify-start">
          <div className="flex items-center gap-1.5 px-2 text-[10px] uppercase font-[200] tracking-[0.2em] text-[#FF2477] hidden md:flex">
            <Languages className="w-3.5 h-3.5" />
            <span>{t("story.readIn")}</span>
          </div>

          <div className="flex items-center gap-1">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isCurrent = readerLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-[200] tracking-wide transition-all cursor-pointer",
                    isCurrent
                      ? "bg-[#FF2477] text-white shadow-[0_0_12px_rgba(255,36,119,0.35)] font-[400]"
                      : "text-[#C2BDCE]/80 hover:text-white hover:bg-[#433352]/60"
                  )}
                  title={`Read chronicle in ${lang.label}`}
                >
                  {lang.nativeLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Saint Masthead Title */}
      <header className="space-y-5 text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs uppercase font-[200] tracking-[0.28em] text-[#FF2477] flex-wrap">
          <span>{saint.era}</span>
          <span>•</span>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              localized.location
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline underline-offset-4 decoration-[#FF2477]/40 hover:text-white hover:decoration-[#FF2477] transition-colors"
            title={`View ${localized.location} on Google Maps`}
          >
            <MapPin className="w-3.5 h-3.5 stroke-[1.5] text-[#FF2477]" />
            <span>{localized.location}</span>
          </a>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-[100] uppercase tracking-[0.16em] text-[#F8F6FA] leading-tight">
          {localized.name}
        </h1>

        {saint.latinName && (
          <p className="text-sm font-[200] italic text-[#C2BDCE]/70 tracking-widest">
            {saint.latinName}
          </p>
        )}

        <p className="text-xs sm:text-sm font-[200] text-[#FF2477] tracking-[0.2em] uppercase pt-1">
          {localized.epithet}
        </p>

        <div className="h-[1px] w-16 mx-auto bg-gradient-to-r from-transparent via-[#FF2477] to-transparent mt-4" />
      </header>

      {/* Four-Date Minimal Milestone Matrix */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#352741]/60 border border-[rgba(194,189,206,0.14)] backdrop-blur-sm">
        {/* 1. Date of Birth */}
        <div className="space-y-1.5 p-3 rounded-lg bg-[#30233b]/70 border border-[rgba(194,189,206,0.08)]">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-[200] tracking-[0.25em] text-[#C2BDCE]/70">
            <Calendar className="w-3 h-3 text-[#FF2477] stroke-[1.5]" />
            <span>{t("story.dob")}</span>
          </div>
          <p className="text-xs sm:text-sm font-[200] text-[#F8F6FA] tracking-wide">
            {localized.dateOfBirth}
          </p>
        </div>

        {/* 2. Beatified Date */}
        <div className="space-y-1.5 p-3 rounded-lg bg-[#30233b]/70 border border-[rgba(194,189,206,0.08)]">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-[200] tracking-[0.25em] text-[#C2BDCE]/70">
            <Sparkles className="w-3 h-3 text-[#FF2477] stroke-[1.5]" />
            <span>{t("story.beatified")}</span>
          </div>
          <p className="text-xs font-[200] text-[#F8F6FA] tracking-wide leading-snug">
            {localized.beatifiedDate}
          </p>
        </div>

        {/* 3. Canonised Date */}
        <div className="space-y-1.5 p-3 rounded-lg bg-[#30233b]/70 border border-[rgba(194,189,206,0.08)]">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-[200] tracking-[0.25em] text-[#C2BDCE]/70">
            <Award className="w-3 h-3 text-[#FF2477] stroke-[1.5]" />
            <span>{t("story.canonised")}</span>
          </div>
          <p className="text-xs font-[200] text-[#F8F6FA] tracking-wide leading-snug">
            {localized.canonisedDate}
          </p>
        </div>

        {/* 4. Feast Date */}
        <div className="space-y-1.5 p-3 rounded-lg bg-[#463354] border border-[#FF2477]/40 shadow-[0_0_15px_rgba(255,36,119,0.15)]">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-[200] tracking-[0.25em] text-[#FF2477]">
            <Heart className="w-3 h-3 text-[#FF2477] stroke-[1.5]" />
            <span>{t("story.feastDay")}</span>
          </div>
          <p className="text-xs sm:text-sm font-[300] text-white tracking-widest">
            {localized.feastDate}
          </p>
        </div>
      </section>

      {/* Inspirational Reflection Quote */}
      {localized.quote && (
        <div className="p-8 sm:p-10 rounded-2xl bg-[#352741]/50 border-l-2 border-[#FF2477] border-y border-r border-[rgba(194,189,206,0.12)] max-w-3xl mx-auto">
          <blockquote className="text-base sm:text-xl font-[200] italic text-[#F8F6FA] tracking-wide leading-relaxed">
            “{localized.quote}”
          </blockquote>
          <div className="mt-3 text-right text-xs font-[200] uppercase tracking-[0.25em] text-[#FF2477]">
            — {localized.name}
          </div>
        </div>
      )}

      {/* Dedicated Multi-Paragraph Sacred Story */}
      <article className="max-w-3xl mx-auto space-y-8 pt-4">
        <div className="flex items-center gap-4 pb-2 border-b border-[rgba(194,189,206,0.12)]">
          <div className="flex items-center gap-2 text-xs uppercase font-[200] tracking-[0.3em] text-[#FF2477]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t("story.chronicle")}</span>
          </div>
          <div className="flex-1" />
          <span className="text-[10px] font-mono tracking-widest text-[#C2BDCE]/60 uppercase">
            {t("story.archive")} • {SUPPORTED_LANGUAGES.find((l) => l.code === readerLanguage)?.label}
          </span>
        </div>

        {/* The story paragraphs */}
        <div className="space-y-8 text-base sm:text-lg font-[300] leading-relaxed sm:leading-loose text-[#C2BDCE] tracking-wide">
          {localized.story.map((paragraph, idx) => (
            <p key={idx} className="transition-colors hover:text-[#F8F6FA]">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {/* Patronage & Iconography Footer Colophon */}
      <div className="max-w-3xl mx-auto p-6 rounded-xl bg-[#32243d] border border-[rgba(194,189,206,0.12)] space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase font-[200] tracking-[0.25em] text-[#FF2477]">
            {t("story.patronages")}
          </span>
          {localized.patronage.map((p) => (
            <span
              key={p}
              className="px-2.5 py-1 rounded-full text-[10px] font-[200] uppercase tracking-[0.16em] bg-[#3B2D47] text-[#C2BDCE] border border-[rgba(194,189,206,0.15)]"
            >
              {p}
            </span>
          ))}
        </div>

        {localized.attributes && (
          <p className="text-xs font-[200] text-[#C2BDCE]/80 tracking-wide">
            <span className="text-[#FF2477] uppercase tracking-wider text-[10px]">
              {t("story.iconography")}{" "}
            </span>
            {localized.attributes}
          </p>
        )}

        <div className="pt-2 border-t border-[rgba(194,189,206,0.08)] flex items-center justify-between text-xs font-[200] flex-wrap gap-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C2BDCE]/60">
            {t("story.location")}
          </span>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              localized.location
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F8F6FA] hover:text-[#FF2477] underline underline-offset-4 decoration-[#FF2477]/40 flex items-center gap-1.5 transition-colors"
            title={`Open ${localized.location} on Google Maps`}
          >
            <MapPin className="w-3.5 h-3.5 stroke-[1.5] text-[#FF2477]" />
            <span>{localized.location}</span>
          </a>
        </div>
      </div>

      {/* Sequential Saint Navigation */}
      <nav className="flex items-center justify-between border-t border-[rgba(194,189,206,0.14)] pt-8 max-w-3xl mx-auto">
        {prevSaint ? (
          <Link
            href={`/saints/${prevSaint.id}`}
            className="flex items-center gap-2 text-xs font-[200] uppercase tracking-[0.22em] text-[#C2BDCE] hover:text-[#FF2477] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 stroke-[1.5] group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <span className="block text-[9px] text-[#C2BDCE]/50 tracking-widest">
                {t("story.prev")}
              </span>
              <span>{prevSaint.name}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        <Link
          href="/saints"
          className="px-4 py-2 rounded-lg border border-[rgba(194,189,206,0.18)] hover:border-[#FF2477] text-xs font-[200] uppercase tracking-[0.25em] text-[#F8F6FA] hover:text-white transition-all bg-[#352741]/50"
        >
          {t("story.viewAll")}
        </Link>

        {nextSaint ? (
          <Link
            href={`/saints/${nextSaint.id}`}
            className="flex items-center gap-2 text-xs font-[200] uppercase tracking-[0.22em] text-[#C2BDCE] hover:text-[#FF2477] transition-colors group text-right"
          >
            <div>
              <span className="block text-[9px] text-[#C2BDCE]/50 tracking-widest">
                {t("story.next")}
              </span>
              <span>{nextSaint.name}</span>
            </div>
            <ArrowRight className="w-4 h-4 stroke-[1.5] group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
