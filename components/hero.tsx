"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { SaintsBookLogo } from "./saintsbook-logo";
import { SAINTS_DATA } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import {
  ArrowDownRight,
  BookOpen,
  Sparkles,
  Calendar,
  Award,
  Heart,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

const AUTO_ROTATE_INTERVAL_MS = 6500;
const TICK_INTERVAL_MS = 50;

export function Hero() {
  const { t, getSaintContent, isTransitioning } = useLanguage();

  // State for sequential 3D rotating saint showcase
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"dates" | "quote" | "patronage">("dates");
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mouseTilt, setMouseTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const cardRef = useRef<HTMLDivElement>(null);

  const currentSaint = SAINTS_DATA[currentIndex] || SAINTS_DATA[0];
  const localizedFeatured = getSaintContent(currentSaint);

  // Core 3D rotation transition on both X and Y axes from center
  const handleRotate = useCallback(
    (targetIndex: number, direction: "next" | "prev") => {
      if (isFlipping) return;
      setIsFlipping(true);
      setFlipDirection(direction);
      setProgress(0);

      // At halfway point (350ms of 700ms 3D flip):
      // The card is edge-on rotated 82deg on Y and 16deg on X.
      // Update saint index smoothly behind the edge:
      setTimeout(() => {
        setCurrentIndex(targetIndex);
      }, 350);

      // Settle 3D flip back to idle at 700ms:
      setTimeout(() => {
        setIsFlipping(false);
      }, 710);
    },
    [isFlipping]
  );

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % SAINTS_DATA.length;
    handleRotate(nextIdx, "next");
  }, [currentIndex, handleRotate]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + SAINTS_DATA.length) % SAINTS_DATA.length;
    handleRotate(prevIdx, "prev");
  }, [currentIndex, handleRotate]);

  const handleSelectSaint = useCallback(
    (targetIdx: number) => {
      if (targetIdx === currentIndex || isFlipping) return;
      const direction = targetIdx > currentIndex ? "next" : "prev";
      handleRotate(targetIdx, direction);
    },
    [currentIndex, isFlipping, handleRotate]
  );

  // Auto-advance progress timer with pause-on-hover
  useEffect(() => {
    if (!isAutoPlaying || isHovered || isFlipping) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + (TICK_INTERVAL_MS / AUTO_ROTATE_INTERVAL_MS) * 100;
      });
    }, TICK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, isFlipping, handleNext]);

  // Subtle interactive 3D parallax tilt on X & Y axes from the center
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipping) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    // Pivot from center: tilt vertically (X axis) & horizontally (Y axis)
    setMouseTilt({
      x: -relY * 12,
      y: relX * 12,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseTilt({ x: 0, y: 0 });
  };

  return (
    <section
      className={cn(
        "relative min-h-[88vh] flex flex-col justify-between pt-10 pb-16 overflow-hidden transition-all duration-300",
        isTransitioning && "lang-switch-active"
      )}
    >
      {/* Ambient plum/pink atmospheric background gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#FF2477]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-[#4E3C5D]/30 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#271C31]/70 blur-[100px] pointer-events-none rounded-full" />

      {/* Subtle Hairline Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 border-x border-[rgba(194,189,206,0.12)] flex justify-between">
          <div className="w-[1px] h-full bg-[rgba(194,189,206,0.08)] hidden md:block" />
          <div className="w-[1px] h-full bg-[rgba(194,189,206,0.08)] hidden lg:block" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Minimal Proem & Direct Action on Page Load */}
          <div className="lg:col-span-7 space-y-8">
            {/* Archival Eyebrow Tag */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-[rgba(194,189,206,0.18)] bg-[#352741]/80 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2477] shadow-[0_0_8px_#FF2477]" />
              <span className="text-[11px] font-[200] tracking-[0.3em] uppercase text-[#F8F6FA]">
                {t("hero.tagline")}
              </span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-[100] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#F8F6FA] leading-[1.18] sm:leading-[1.15]">
                {t("hero.titlePart1")}{" "}
                <span className="text-[#FF2477] font-[200]">
                  &amp; {t("hero.titlePart2")}
                </span>{" "}
                {t("hero.titlePart3")}
              </h1>
              <div className="h-[1px] w-20 bg-gradient-to-r from-[#FF2477] to-transparent" />
            </div>

            {/* Editorial Lead Excerpt */}
            <p className="text-base sm:text-lg font-[200] text-[#C2BDCE] leading-relaxed max-w-xl tracking-wide">
              {t("hero.lead")}
            </p>

            {/* Clear Direct Navigation on Page Load with Smooth Scroll to Reading Section */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#saints"
                className="px-8 py-3.5 rounded-lg bg-[#FF2477] hover:bg-[#ff3f8b] text-white text-xs uppercase tracking-[0.28em] font-[200] transition-all shadow-[0_0_25px_rgba(255,36,119,0.35)] hover:shadow-[0_0_35px_rgba(255,36,119,0.55)] text-center flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{t("hero.ctaStart")}</span>
                <ArrowDownRight className="w-4 h-4 stroke-[1.5] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <Link
                href="/saints"
                className="px-6 py-3.5 rounded-lg border border-[rgba(194,189,206,0.25)] hover:border-[#FF2477] bg-[#433352]/40 hover:bg-[#FF2477]/10 text-xs uppercase tracking-[0.28em] font-[200] text-[#F8F6FA] transition-all flex items-center justify-center gap-2 group"
              >
                <BookOpen className="w-4 h-4 stroke-[1.5] text-[#FF2477]" />
                <span>{t("nav.allSaints")}</span>
              </Link>

              <Link
                href="/calendar"
                className="px-4 py-3.5 text-xs uppercase tracking-[0.22em] font-[200] text-[#C2BDCE] hover:text-[#FF2477] transition-colors flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#FF2477]" />
                <span>{t("nav.calendar")}</span>
              </Link>
            </div>

            {/* Archival Attributes Meter */}
            <div className="pt-6 border-t border-[rgba(194,189,206,0.12)] grid grid-cols-2 gap-8 max-w-sm text-left">
              <div>
                <span className="block text-2xl font-[100] text-[#F8F6FA] tracking-widest">
                  {SAINTS_DATA.length}
                </span>
                <span className="text-[10px] font-[200] tracking-[0.25em] uppercase text-[#C2BDCE]/70">
                  Canonised Lives
                </span>
              </div>
              <div>
                <span className="block text-2xl font-[100] text-[#FF2477] tracking-widest">
                  2,000+
                </span>
                <span className="text-[10px] font-[200] tracking-[0.25em] uppercase text-[#C2BDCE]/70">
                  Years of History
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Saint Stories 3D Center-Pivot Rotating Showcase */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Perspective Wrapper */}
            <div className="w-full max-w-md [perspective:1300px]">
              {/* Rotating 3D Card Element */}
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(
                  "relative mx-auto w-full rounded-2xl border border-[rgba(194,189,206,0.18)] bg-[#433352]/90 p-7 shadow-[0_30px_70px_rgba(0,0,0,0.55)] backdrop-blur-md overflow-hidden select-none",
                  isFlipping &&
                    (flipDirection === "next"
                      ? "animate-saint-3d-next"
                      : "animate-saint-3d-prev")
                )}
                style={
                  isFlipping
                    ? {
                        transformOrigin: "center center",
                        transformStyle: "preserve-3d",
                      }
                    : {
                        transformOrigin: "center center",
                        transformStyle: "preserve-3d",
                        transform: `perspective(1300px) rotateX(${mouseTilt.x}deg) rotateY(${mouseTilt.y}deg) scale3d(${
                          isHovered ? 1.015 : 1
                        }, ${isHovered ? 1.015 : 1}, 1)`,
                        transition: isHovered
                          ? "transform 100ms ease-out"
                          : "transform 450ms cubic-bezier(0.16, 1, 0.3, 1)",
                      }
                }
              >
                {/* Auto-Rotation Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#352741] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF2477] via-[#ff5b9d] to-[#FF2477] transition-all duration-75"
                    style={{
                      width: `${progress}%`,
                      opacity: isHovered ? 0.35 : 0.95,
                    }}
                  />
                </div>

                {/* Ambient Aura */}
                <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#FF2477]/15 rounded-full blur-[80px] pointer-events-none" />

                {/* Interactive Dynamic Lighting Sheen */}
                {isHovered && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle 280px at ${
                        (mouseTilt.y / 12 + 0.5) * 100
                      }% ${
                        (-mouseTilt.x / 12 + 0.5) * 100
                      }%, rgba(255, 36, 119, 0.12), transparent 70%)`,
                    }}
                  />
                )}

                {/* Saint Header Row: Featured Badge & Dynamic Feast Date */}
                <div className="flex items-center justify-between pb-4 border-b border-[rgba(194,189,206,0.12)]">
                  <div className="flex items-center gap-2 text-xs font-[200] tracking-[0.25em] uppercase text-[#FF2477]">
                    <Sparkles className="w-3.5 h-3.5 stroke-[1.5] animate-pulse" />
                    <span>{t("gallery.badge")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#2e2238] border border-[#FF2477]/30 text-[#FF2477]">
                      {String(currentIndex + 1).padStart(2, "0")} /{" "}
                      {String(SAINTS_DATA.length).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#2e2238] border border-[rgba(194,189,206,0.15)] text-[#C2BDCE]">
                      {localizedFeatured.feastDate}
                    </span>
                  </div>
                </div>

                {/* Saint Title & Epithet */}
                <div className="py-4 space-y-1.5 text-center">
                  <div className="py-1">
                    <SaintsBookLogo size="sm" />
                  </div>
                  <h3 className="text-2xl font-[100] tracking-[0.16em] uppercase text-[#F8F6FA] leading-snug">
                    {localizedFeatured.name}
                  </h3>
                  <p className="text-xs font-[200] text-[#FF2477] tracking-[0.14em] uppercase">
                    {localizedFeatured.epithet}
                  </p>
                  <p className="text-[10px] font-mono tracking-widest uppercase text-[#C2BDCE]/60 pt-0.5">
                    {localizedFeatured.location} • {currentSaint.era}
                  </p>
                </div>

                {/* View Switcher Tabs */}
                <div className="flex gap-2 my-3 p-1 rounded-lg bg-[#33253e] border border-[rgba(194,189,206,0.1)] text-[10px] uppercase font-[200] tracking-[0.2em]">
                  <button
                    onClick={() => setActiveTab("dates")}
                    className={cn(
                      "flex-1 py-1.5 rounded transition-colors cursor-pointer",
                      activeTab === "dates"
                        ? "bg-[#FF2477] text-white shadow-[0_0_12px_rgba(255,36,119,0.35)]"
                        : "text-[#C2BDCE]/70 hover:text-white"
                    )}
                  >
                    {t("hero.tabDates")}
                  </button>
                  <button
                    onClick={() => setActiveTab("quote")}
                    className={cn(
                      "flex-1 py-1.5 rounded transition-colors cursor-pointer",
                      activeTab === "quote"
                        ? "bg-[#FF2477] text-white shadow-[0_0_12px_rgba(255,36,119,0.35)]"
                        : "text-[#C2BDCE]/70 hover:text-white"
                    )}
                  >
                    {t("hero.tabQuote")}
                  </button>
                  <button
                    onClick={() => setActiveTab("patronage")}
                    className={cn(
                      "flex-1 py-1.5 rounded transition-colors cursor-pointer",
                      activeTab === "patronage"
                        ? "bg-[#FF2477] text-white shadow-[0_0_12px_rgba(255,36,119,0.35)]"
                        : "text-[#C2BDCE]/70 hover:text-white"
                    )}
                  >
                    {t("hero.tabPatronage")}
                  </button>
                </div>

                {/* Tab 1: Key Dates */}
                {activeTab === "dates" && (
                  <div className="space-y-2.5 py-2 animate-in fade-in duration-200 text-xs font-[200]">
                    <div className="p-2.5 rounded-lg bg-[#352741] border border-[rgba(194,189,206,0.1)] flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#C2BDCE]/70 uppercase tracking-wider text-[10px]">
                        <Calendar className="w-3 h-3 text-[#FF2477]" /> {t("story.dob")}
                      </span>
                      <span className="text-[#F8F6FA]">{localizedFeatured.dateOfBirth}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#352741] border border-[rgba(194,189,206,0.1)] flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#C2BDCE]/70 uppercase tracking-wider text-[10px]">
                        <Sparkles className="w-3 h-3 text-[#FF2477]" /> {t("story.beatified")}
                      </span>
                      <span className="text-[#F8F6FA] text-right truncate max-w-[220px]">
                        {localizedFeatured.beatifiedDate}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#352741] border border-[rgba(194,189,206,0.1)] flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#C2BDCE]/70 uppercase tracking-wider text-[10px]">
                        <Award className="w-3 h-3 text-[#FF2477]" /> {t("story.canonised")}
                      </span>
                      <span className="text-[#F8F6FA] text-right truncate max-w-[220px]">
                        {localizedFeatured.canonisedDate}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#463354] border border-[#FF2477]/40 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#FF2477] uppercase tracking-wider text-[10px]">
                        <Heart className="w-3 h-3 text-[#FF2477]" /> {t("story.feastDay")}
                      </span>
                      <span className="text-white font-mono">{localizedFeatured.feastDate}</span>
                    </div>
                  </div>
                )}

                {/* Tab 2: Quote */}
                {activeTab === "quote" && (
                  <div className="space-y-4 py-2 animate-in fade-in duration-200">
                    <blockquote className="border-l-2 border-[#FF2477] pl-4 py-1 text-xs font-[200] italic text-[#C2BDCE] leading-relaxed">
                      “{localizedFeatured.quote}”
                    </blockquote>
                    <p className="text-[11px] font-[200] text-[#C2BDCE]/80 leading-relaxed line-clamp-3">
                      {localizedFeatured.story[0]}
                    </p>
                  </div>
                )}

                {/* Tab 3: Patronage */}
                {activeTab === "patronage" && (
                  <div className="space-y-3 py-2 animate-in fade-in duration-200 text-xs font-[200]">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#FF2477] block">
                      {t("story.patronages")}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {localizedFeatured.patronage.map((p) => (
                        <span
                          key={p}
                          className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider bg-[#30233b] border border-[rgba(194,189,206,0.12)] text-[#F8F6FA]"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Direct Redirect & In-Card Navigation Controls */}
                <div className="pt-4 mt-3 border-t border-[rgba(194,189,206,0.12)] flex items-center justify-between">
                  <Link
                    href={`/saints/${currentSaint.id}`}
                    className="inline-flex items-center gap-1.5 text-xs uppercase font-[200] tracking-[0.22em] text-[#FF2477] hover:text-[#ff4b91] transition-colors group"
                  >
                    <span>{t("gallery.readChronicle")}</span>
                    <ArrowDownRight className="w-3.5 h-3.5 stroke-[1.5] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                  </Link>

                  {/* Manual 3D Switch Controls */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      disabled={isFlipping}
                      aria-label={t("story.prev")}
                      title={t("story.prev")}
                      className="p-1.5 rounded-md text-[#C2BDCE] hover:text-white hover:bg-[#FF2477]/20 border border-[rgba(194,189,206,0.15)] hover:border-[#FF2477]/50 transition-colors disabled:opacity-40 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAutoPlaying((prev) => !prev);
                      }}
                      aria-label={isAutoPlaying ? "Pause auto-rotation" : "Resume auto-rotation"}
                      title={isAutoPlaying ? "Pause auto-rotation" : "Resume auto-rotation"}
                      className="p-1.5 rounded-md text-[#C2BDCE] hover:text-white hover:bg-[#FF2477]/20 border border-[rgba(194,189,206,0.15)] hover:border-[#FF2477]/50 transition-colors cursor-pointer"
                    >
                      {isAutoPlaying ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 text-[#FF2477]" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      disabled={isFlipping}
                      aria-label={t("story.next")}
                      title={t("story.next")}
                      className="p-1.5 rounded-md text-[#C2BDCE] hover:text-white hover:bg-[#FF2477]/20 border border-[rgba(194,189,206,0.15)] hover:border-[#FF2477]/50 transition-colors disabled:opacity-40 cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic 3D depth shadow beneath card */}
            <div
              className="mt-3 h-3 w-3/4 rounded-full bg-[#FF2477]/15 blur-lg transition-all duration-500 pointer-events-none"
              style={{
                transform: isFlipping
                  ? "scale(0.7) translateY(8px)"
                  : `scale(${isHovered ? 1.05 : 0.95}) translateY(0)`,
                opacity: isFlipping ? 0.25 : 0.65,
              }}
            />

            {/* 10 Saint Indicators / Dots with Tooltips */}
            <div className="mt-4 flex items-center justify-center gap-1.5 flex-wrap max-w-md mx-auto px-2">
              {SAINTS_DATA.map((saint, idx) => {
                const localized = getSaintContent(saint);
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={saint.id}
                    onClick={() => handleSelectSaint(idx)}
                    disabled={isFlipping}
                    title={`${idx + 1}. ${localized.name}`}
                    aria-label={`Switch to Saint ${idx + 1}: ${localized.name}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                      isActive
                        ? "w-7 bg-[#FF2477] shadow-[0_0_10px_#FF2477]"
                        : "w-2 bg-[rgba(194,189,206,0.22)] hover:bg-[#FF2477]/60 hover:w-3.5"
                    )}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
