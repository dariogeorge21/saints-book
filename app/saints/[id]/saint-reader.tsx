"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
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
  Share2,
  Check,
  Type,
  AlignLeft,
} from "lucide-react";

import { useLanguage } from "@/lib/language-context";
import { SUPPORTED_LANGUAGES, SupportedLanguage } from "@/lib/i18n";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { SaintImageCarousel } from "@/components/saint-image-carousel";
import { cn } from "@/lib/utils";
import type { SaintReaderProps, StoryFormat } from "./types";

/**
 * Calculates estimated reading time in minutes from markdown content.
 * Accounts for word count in Latin scripts and character length in Indic scripts.
 */
function calculateReadingTime(text: string, language: SupportedLanguage): number {
  if (!text) return 1;

  if (language === "ml" || language === "hi") {
    // Indic scripts: estimate ~450 characters per minute of reading
    const charCount = text.replace(/\s+/g, "").length;
    return Math.max(1, Math.ceil(charCount / 450));
  }

  // English: standard ~200 words per minute
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

/**
 * SaintReader Component
 *
 * Professional client-side reader for Christian saint chronicles.
 * Supports:
 * - Rich Markdown rendering with bold, italics, tables, and headers
 * - Dual story formats: "longStory" (Full Chronicle) & "shortStory" (Short Summary)
 * - Multilingual switching across English, Malayalam, and Hindi
 * - Adjustable font sizing (Comfortable, Standard, Large)
 * - Dynamic reading time estimation
 * - Four-date canonical milestone matrix
 * - Sequential saint navigation
 */
export function SaintReader({
  saint,
  stories,
  prevSaint,
  nextSaint,
}: SaintReaderProps) {
  const {
    language: globalLanguage,
    getSaintContent,
    t,
    isTransitioning: isGlobalTransitioning,
  } = useLanguage();

  // Local reader language override (allows independent story language exploration)
  const [overrideLanguage, setOverrideLanguage] =
    useState<SupportedLanguage | null>(null);
  const [isLocalTransitioning, setIsLocalTransitioning] =
    useState<boolean>(false);

  // Active language in reader: user override if selected, otherwise global active language
  const readerLanguage = overrideLanguage ?? globalLanguage;

  // Story format selection: "longStory" (default) or "shortStory"
  const [storyFormat, setStoryFormat] = useState<StoryFormat>("longStory");

  // Reader typography preference: sm | md | lg
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");

  // Load saved font size preference from localStorage on mount
  useEffect(() => {
    try {
      const savedFontSize = localStorage.getItem("saintsbook_reader_font_size");
      if (savedFontSize === "sm" || savedFontSize === "md" || savedFontSize === "lg") {
        setFontSize(savedFontSize);
      }
    } catch {
      // localStorage may fail in SSR or restricted environments
    }
  }, []);

  const handleFontSizeChange = (size: "sm" | "md" | "lg") => {
    setFontSize(size);
    try {
      localStorage.setItem("saintsbook_reader_font_size", size);
    } catch {
      // ignore
    }
  };

  // Share button confirmation feedback state
  const [hasCopiedShare, setHasCopiedShare] = useState<boolean>(false);

  /**
   * Smoothly transitions the reader when switching languages.
   */
  const handleLanguageChange = (lang: SupportedLanguage) => {
    setIsLocalTransitioning(true);
    setOverrideLanguage(lang);
    const timer = setTimeout(() => {
      setIsLocalTransitioning(false);
    }, 280);
    return () => clearTimeout(timer);
  };

  /**
   * Handles sharing the saint chronicle citation to clipboard.
   */
  const handleShareCitation = async () => {
    const citation = `SaintsBook: The Chronicle of ${saint.name} (${saint.epithet}) — Feast Day: ${saint.feastDate}`;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(citation);
        setHasCopiedShare(true);
        setTimeout(() => setHasCopiedShare(false), 2200);
      }
    } catch (error) {
      console.warn("Unable to copy to clipboard", error);
    }
  };

  // Localized metadata (name, epithet, milestones, patronages, quote)
  const localized = getSaintContent(saint, readerLanguage);

  /**
   * Resolves the active markdown text from the single source of truth (content files).
   * Priority:
   * 1. stories[readerLanguage][storyFormat] (preloaded from server via content files mapped in index.json)
   * 2. Fallback to English chronicle: stories["en"][storyFormat]
   */
  const activeMarkdownContent = useMemo(() => {
    // 1. Direct language match from preloaded server bundle
    const directMatch = stories[readerLanguage]?.[storyFormat];
    if (directMatch && directMatch.trim()) {
      return directMatch;
    }

    // 2. Fallback to English chronicle
    const englishFallback = stories["en"]?.[storyFormat];
    if (englishFallback && englishFallback.trim()) {
      return englishFallback;
    }

    return "";
  }, [stories, readerLanguage, storyFormat]);

  // Estimated reading time in minutes for the active story
  const readingTime = useMemo(() => {
    return calculateReadingTime(activeMarkdownContent, readerLanguage);
  }, [activeMarkdownContent, readerLanguage]);

  // Font size classes applied to the chronicle body
  const fontSizeStyle = {
    sm: "text-sm sm:text-base leading-relaxed",
    md: "text-base sm:text-lg leading-relaxed sm:leading-loose",
    lg: "text-lg sm:text-xl leading-loose",
  }[fontSize];

  // Ref for the narrative reading article section
  const readingSectionRef = useRef<HTMLElement>(null);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Monitor scroll position: active strictly when viewport is within the reading section
  useEffect(() => {
    const handleScroll = () => {
      if (!readingSectionRef.current) return;
      const rect = readingSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Active only when reading section top has reached near top of viewport (<= 80px)
      // and bottom has not yet scrolled past the top (>= 140px)
      const inReading = rect.top <= 80 && rect.bottom >= 140;
      setIsStickyVisible(inReading);

      if (inReading) {
        const totalHeight = rect.height - windowHeight * 0.4;
        const scrolled = -rect.top + 80;
        const progress = Math.min(100, Math.max(0, (scrolled / Math.max(1, totalHeight)) * 100));
        setReadingProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeMarkdownContent]);

  return (
    <div
      className={cn(
        "space-y-12 transition-all duration-300",
        (isGlobalTransitioning || isLocalTransitioning) && "lang-switch-active",
        readerLanguage === "ml" && "font-malayalam",
        readerLanguage === "hi" && "font-hindi"
      )}
    >
      {/* =========================================================================
          STICKY READING HEADER (Active strictly during narrative reading section)
         ========================================================================= */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-[#2D2138]/95 backdrop-blur-md border-b border-[rgba(194,189,206,0.15)] shadow-[0_12px_32px_rgba(0,0,0,0.55)] transition-all duration-300 ease-in-out",
          isStickyVisible
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        )}
        aria-hidden={!isStickyVisible}
      >
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-3">
          {/* Back Link */}
          <Link
            href="/saints"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs uppercase font-[200] tracking-[0.2em] sm:tracking-[0.25em] text-[#C2BDCE] hover:text-[#FF2477] transition-colors group cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5] group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">{t("story.back")}</span>
            <span className="sm:hidden">Saints</span>
          </Link>

          {/* Reader Controls: Font Size, Share, Language Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
            {/* Font Size Adjuster */}
            <div
              className="flex items-center gap-0.5 sm:gap-1 bg-[#352741]/90 p-1 rounded-xl border border-[rgba(194,189,206,0.15)] shrink-0"
              title="Adjust reading font size"
              role="group"
              aria-label="Font size adjuster"
            >
              <Type className="w-3.5 h-3.5 ml-1 text-[#C2BDCE]/60 stroke-[1.5] hidden xs:block" />
              <button
                type="button"
                onClick={() => handleFontSizeChange("sm")}
                className={cn(
                  "px-1.5 sm:px-2 py-0.5 rounded-lg text-xs font-mono transition-colors cursor-pointer",
                  fontSize === "sm"
                    ? "bg-[#FF2477] text-white"
                    : "text-[#C2BDCE]/70 hover:text-white"
                )}
                aria-label="Small font size"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => handleFontSizeChange("md")}
                className={cn(
                  "px-1.5 sm:px-2 py-0.5 rounded-lg text-xs font-mono transition-colors cursor-pointer",
                  fontSize === "md"
                    ? "bg-[#FF2477] text-white"
                    : "text-[#C2BDCE]/70 hover:text-white"
                )}
                aria-label="Default font size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => handleFontSizeChange("lg")}
                className={cn(
                  "px-1.5 sm:px-2 py-0.5 rounded-lg text-xs font-mono transition-colors cursor-pointer",
                  fontSize === "lg"
                    ? "bg-[#FF2477] text-white"
                    : "text-[#C2BDCE]/70 hover:text-white"
                )}
                aria-label="Large font size"
              >
                A+
              </button>
            </div>

            {/* Share Button */}
            <button
              type="button"
              onClick={handleShareCitation}
              className="p-1.5 sm:p-2 rounded-xl bg-[#352741]/90 border border-[rgba(194,189,206,0.15)] text-[#C2BDCE] hover:text-[#FF2477] transition-colors cursor-pointer shrink-0"
              title="Copy citation link"
              aria-label="Share this chronicle"
            >
              {hasCopiedShare ? (
                <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-green-400 stroke-[1.5]" />
              ) : (
                <Share2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[1.5]" />
              )}
            </button>

            {/* Language Switcher Tabs */}
            <div className="flex items-center gap-1 bg-[#352741]/90 p-1 rounded-xl border border-[rgba(194,189,206,0.15)] shrink-0">
              <div className="flex items-center gap-1.5 px-2 text-[10px] uppercase font-[200] tracking-[0.2em] text-[#FF2477] hidden md:flex">
                <Languages className="w-3.5 h-3.5" />
                <span>{t("story.readIn")}</span>
              </div>

              <div className="flex items-center gap-0.5 sm:gap-1">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isCurrent = readerLanguage === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleLanguageChange(lang.code)}
                      className={cn(
                        "px-2 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-[200] tracking-wide transition-all cursor-pointer whitespace-nowrap",
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
        </div>

        {/* Hairline Reading Progress Indicator */}
        <div
          className="h-[2px] bg-gradient-to-r from-[#FF2477] to-[#ff4b91] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
          aria-hidden="true"
        />
      </div>
      {/* =========================================================================
          TOP ACTION BAR: Breadcrumb, Language Switcher, Font Resizer & Share
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[rgba(194,189,206,0.12)] pb-6">
        {/* Back Link */}
        <Link
          href="/saints"
          className="inline-flex items-center gap-2 text-xs uppercase font-[200] tracking-[0.25em] text-[#C2BDCE] hover:text-[#FF2477] transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5] group-hover:-translate-x-1 transition-transform" />
          <span>{t("story.back")}</span>
        </Link>

        {/* Reader Controls: Language Tabs, Font Sizing & Share */}
        <div className="flex items-center flex-wrap gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
          {/* Font Size Adjuster */}
          <div
            className="flex items-center gap-1 bg-[#352741]/80 p-1 rounded-xl border border-[rgba(194,189,206,0.15)]"
            title="Adjust reading font size"
            role="group"
            aria-label="Font size adjuster"
          >
            <Type className="w-3.5 h-3.5 ml-1.5 text-[#C2BDCE]/60 stroke-[1.5]" />
            <button
              onClick={() => handleFontSizeChange("sm")}
              className={cn(
                "px-2 py-0.5 rounded-lg text-xs font-mono transition-colors cursor-pointer",
                fontSize === "sm"
                  ? "bg-[#FF2477] text-white"
                  : "text-[#C2BDCE]/70 hover:text-white"
              )}
              aria-label="Small font size"
            >
              A-
            </button>
            <button
              onClick={() => handleFontSizeChange("md")}
              className={cn(
                "px-2 py-0.5 rounded-lg text-xs font-mono transition-colors cursor-pointer",
                fontSize === "md"
                  ? "bg-[#FF2477] text-white"
                  : "text-[#C2BDCE]/70 hover:text-white"
              )}
              aria-label="Default font size"
            >
              A
            </button>
            <button
              onClick={() => handleFontSizeChange("lg")}
              className={cn(
                "px-2 py-0.5 rounded-lg text-xs font-mono transition-colors cursor-pointer",
                fontSize === "lg"
                  ? "bg-[#FF2477] text-white"
                  : "text-[#C2BDCE]/70 hover:text-white"
              )}
              aria-label="Large font size"
            >
              A+
            </button>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShareCitation}
            className="p-2 rounded-xl bg-[#352741]/80 border border-[rgba(194,189,206,0.15)] text-[#C2BDCE] hover:text-[#FF2477] transition-colors cursor-pointer"
            title="Copy citation link"
            aria-label="Share this chronicle"
          >
            {hasCopiedShare ? (
              <Check className="w-4 h-4 text-green-400 stroke-[1.5]" />
            ) : (
              <Share2 className="w-4 h-4 stroke-[1.5]" />
            )}
          </button>

          {/* Language Switcher Tabs */}
          <div className="flex items-center gap-1 bg-[#352741]/80 p-1 rounded-xl border border-[rgba(194,189,206,0.15)]">
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
      </div>

      {/* =========================================================================
          MASTHEAD HEADER: Era, Canonical Title, Latin Inscription & Location
         ========================================================================= */}
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

        <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-[100] uppercase tracking-[0.12em] sm:tracking-[0.16em] text-[#F8F6FA] leading-tight">
          {localized.name}
        </h1>

        {saint.latinName && (
          <p className="text-xs sm:text-sm font-[200] italic text-[#C2BDCE]/70 tracking-widest">
            {saint.latinName}
          </p>
        )}

        <p className="text-xs sm:text-sm font-[200] text-[#FF2477] tracking-[0.16em] sm:tracking-[0.2em] uppercase pt-1">
          {localized.epithet}
        </p>

        <div className="h-[1px] w-16 mx-auto bg-gradient-to-r from-transparent via-[#FF2477] to-transparent mt-4" />
      </header>

      {/* =========================================================================
          HERO SAINT ICONOGRAPHY SPOTLIGHT & IMAGE CAROUSEL
         ========================================================================= */}
      <section
        className="max-w-xl mx-auto w-full"
        aria-label="Saint Iconography & Sacred Imagery"
      >
        <SaintImageCarousel
          images={saint.images || []}
          name={localized.name}
          feastDate={localized.feastDate}
          aspectRatio="aspect-[16/10]"
          className="shadow-[0_20px_50px_rgba(0,0,0,0.45)] border-[#FF2477]/30"
          priority={true}
        />
      </section>

      {/* =========================================================================
          FOUR-DATE CANONICAL MILESTONE MATRIX
         ========================================================================= */}
      <section
        className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-[#352741]/60 border border-[rgba(194,189,206,0.14)] backdrop-blur-sm shadow-[0_15px_40px_rgba(0,0,0,0.3)]"
        aria-label="Canonical Milestones"
      >
        {/* 1. Date of Birth */}
        <div className="space-y-1.5 p-3 rounded-lg bg-[#30233b]/70 border border-[rgba(194,189,206,0.08)]">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-[200] tracking-[0.25em] text-[#C2BDCE]/70">
            <Calendar className="w-3 h-3 text-[#FF2477] stroke-[1.5]" />
            <span>{t("story.dob")}</span>
          </div>
          <p className="text-xs sm:text-sm font-[200] text-[#F8F6FA] tracking-wide">
            {localized.dateOfBirth || "Historical tradition"}
          </p>
        </div>

        {/* 2. Beatified Date */}
        <div className="space-y-1.5 p-3 rounded-lg bg-[#30233b]/70 border border-[rgba(194,189,206,0.08)]">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-[200] tracking-[0.25em] text-[#C2BDCE]/70">
            <Sparkles className="w-3 h-3 text-[#FF2477] stroke-[1.5]" />
            <span>{t("story.beatified")}</span>
          </div>
          <p className="text-xs font-[200] text-[#F8F6FA] tracking-wide leading-snug">
            {localized.beatifiedDate || "Pre-congregation"}
          </p>
        </div>

        {/* 3. Canonised Date */}
        <div className="space-y-1.5 p-3 rounded-lg bg-[#30233b]/70 border border-[rgba(194,189,206,0.08)]">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-[200] tracking-[0.25em] text-[#C2BDCE]/70">
            <Award className="w-3 h-3 text-[#FF2477] stroke-[1.5]" />
            <span>{t("story.canonised")}</span>
          </div>
          <p className="text-xs font-[200] text-[#F8F6FA] tracking-wide leading-snug">
            {localized.canonisedDate || "Universal veneration"}
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

      {/* =========================================================================
          INSPIRATIONAL QUOTE BLOCK
         ========================================================================= */}
      {localized.quote && (
        <div className="p-5 sm:p-8 lg:p-10 rounded-2xl bg-[#352741]/50 border-l-2 border-[#FF2477] border-y border-r border-[rgba(194,189,206,0.12)] max-w-3xl mx-auto shadow-md">
          <blockquote className="text-base sm:text-xl font-[200] italic text-[#F8F6FA] tracking-wide leading-relaxed">
            “{localized.quote}”
          </blockquote>
          <div className="mt-3 text-right text-xs font-[200] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#FF2477]">
            — {localized.name}
          </div>
        </div>
      )}

      {/* =========================================================================
          DEDICATED STORY SECTION (WITH LONG STORY / SHORT STORY TOGGLE)
         ========================================================================= */}
      <article ref={readingSectionRef} className="max-w-3xl mx-auto space-y-6 sm:space-y-8 pt-2 sm:pt-4">
        {/* Story Format Selector & Metadata Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-[rgba(194,189,206,0.12)]">
          {/* Toggle between Long Story (Full Chronicle) and Short Story (Summary) */}
          <div
            className="inline-flex items-center bg-[#30233b] p-1 rounded-xl border border-[rgba(194,189,206,0.14)] max-w-full overflow-x-auto"
            role="tablist"
            aria-label="Story format selection"
          >
            {/* 1. Full Chronicle (longStory) */}
            <button
              role="tab"
              aria-selected={storyFormat === "longStory"}
              onClick={() => setStoryFormat("longStory")}
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-[200] tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap",
                storyFormat === "longStory"
                  ? "bg-[#FF2477] text-white shadow-[0_0_12px_rgba(255,36,119,0.35)] font-[400]"
                  : "text-[#C2BDCE]/70 hover:text-white hover:bg-[#433352]/40"
              )}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t("story.fullChronicle")}</span>
            </button>

            {/* 2. Short Summary (shortStory) */}
            <button
              role="tab"
              aria-selected={storyFormat === "shortStory"}
              onClick={() => setStoryFormat("shortStory")}
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-[200] tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap",
                storyFormat === "shortStory"
                  ? "bg-[#FF2477] text-white shadow-[0_0_12px_rgba(255,36,119,0.35)] font-[400]"
                  : "text-[#C2BDCE]/70 hover:text-white hover:bg-[#433352]/40"
              )}
            >
              <AlignLeft className="w-3.5 h-3.5" />
              <span>{t("story.shortSummary")}</span>
            </button>
          </div>

          {/* Reading Time & Archive Identifier */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 text-[10px] font-mono tracking-wider sm:tracking-widest text-[#C2BDCE]/60 uppercase">
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#352741] border border-[rgba(194,189,206,0.1)] text-[#FF2477]">
              {t("story.readingTime", { minutes: readingTime })}
            </span>
            <span>
              {t("story.archive")} • {SUPPORTED_LANGUAGES.find((l) => l.code === readerLanguage)?.label}
            </span>
          </div>
        </div>

        {/* Dynamic Markdown Chronicle Content */}
        <div className={cn("markdown-container", fontSizeStyle)}>
          <MarkdownRenderer content={activeMarkdownContent} fontSize={fontSize} />
        </div>
      </article>

      {/* =========================================================================
          PATRONAGE & ICONOGRAPHY COLOPHON
         ========================================================================= */}
      <footer className="max-w-3xl mx-auto p-4 sm:p-6 rounded-2xl bg-[#32243d] border border-[rgba(194,189,206,0.12)] space-y-4">
        {/* Patronages */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-[10px] uppercase font-[200] tracking-[0.2em] sm:tracking-[0.25em] text-[#FF2477]">
            {t("story.patronages")}
          </span>
          {localized.patronage.map((p) => (
            <span
              key={p}
              className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] font-[200] uppercase tracking-[0.14em] sm:tracking-[0.16em] bg-[#3B2D47] text-[#C2BDCE] border border-[rgba(194,189,206,0.15)]"
            >
              {p}
            </span>
          ))}
        </div>

        {/* Iconography */}
        {localized.attributes && (
          <p className="text-xs font-[200] text-[#C2BDCE]/80 tracking-wide">
            <span className="text-[#FF2477] uppercase tracking-wider text-[10px]">
              {t("story.iconography")}{" "}
            </span>
            {localized.attributes}
          </p>
        )}

        {/* Geographic Sanctuary */}
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
      </footer>

      {/* =========================================================================
          SEQUENTIAL SAINT NAVIGATION (Prev / All / Next)
         ========================================================================= */}
      <nav
        className="flex items-center justify-between border-t border-[rgba(194,189,206,0.14)] pt-6 sm:pt-8 max-w-3xl mx-auto gap-2"
        aria-label="Sequential Saint Navigation"
      >
        {prevSaint ? (
          <Link
            href={`/saints/${prevSaint.id}`}
            className="flex items-center gap-1.5 sm:gap-2 text-xs font-[200] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#C2BDCE] hover:text-[#FF2477] transition-colors group cursor-pointer min-w-0"
          >
            <ArrowLeft className="w-4 h-4 stroke-[1.5] group-hover:-translate-x-1 transition-transform shrink-0" />
            <div className="text-left min-w-0">
              <span className="block text-[9px] text-[#C2BDCE]/50 tracking-widest">
                {t("story.prev")}
              </span>
              <span className="font-[300] block truncate max-w-[80px] xs:max-w-[130px] sm:max-w-xs">{prevSaint.name}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        <Link
          href="/saints"
          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-[rgba(194,189,206,0.18)] hover:border-[#FF2477] text-[11px] sm:text-xs font-[200] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#F8F6FA] hover:text-white transition-all bg-[#352741]/50 cursor-pointer shrink-0"
        >
          {t("story.viewAll")}
        </Link>

        {nextSaint ? (
          <Link
            href={`/saints/${nextSaint.id}`}
            className="flex items-center gap-1.5 sm:gap-2 text-xs font-[200] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#C2BDCE] hover:text-[#FF2477] transition-colors group text-right cursor-pointer min-w-0"
          >
            <div className="min-w-0">
              <span className="block text-[9px] text-[#C2BDCE]/50 tracking-widest">
                {t("story.next")}
              </span>
              <span className="font-[300] block truncate max-w-[80px] xs:max-w-[130px] sm:max-w-xs">{nextSaint.name}</span>
            </div>
            <ArrowRight className="w-4 h-4 stroke-[1.5] group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
