"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { SaintsBookLogo } from "./saintsbook-logo";
import { SAINTS } from "@/lib/content";
import { useLanguage } from "@/lib/language-context";
import {
  ArrowDownRight,
  BookOpen,
  Calendar,
  Heart,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

const AUTO_ROTATE_INTERVAL_MS = 6500;
const TICK_INTERVAL_MS = 50;

export function Hero() {
  const { t, getSaintContent, isTransitioning } = useLanguage();

  // State for sequential 3D rotating saint showcase (pure 180° X-axis flip)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [isFrontVisible, setIsFrontVisible] = useState(true);
  const [frontIndex, setFrontIndex] = useState(0);
  const [backIndex, setBackIndex] = useState(1);
  const [activeTab, setActiveTab] = useState<"dates" | "quote" | "patronage">("dates");
  const [isFlipping, setIsFlipping] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mouseTilt, setMouseTilt] = useState<{ x: number }>({ x: 0 });

  const cardRef = useRef<HTMLDivElement>(null);

  const frontSaint = SAINTS[frontIndex] || SAINTS[0];
  const backSaint = SAINTS[backIndex] || SAINTS[1] || SAINTS[0];

  // Core 180° rotation on X-axis only
  const handleRotate = useCallback(
    (targetIndex: number, direction: "next" | "prev") => {
      if (isFlipping) return;
      setIsFlipping(true);
      setProgress(0);

      const delta = direction === "next" ? 180 : -180;

      if (isFrontVisible) {
        setBackIndex(targetIndex);
        setRotationX((prev) => prev + delta);
        setIsFrontVisible(false);
      } else {
        setFrontIndex(targetIndex);
        setRotationX((prev) => prev + delta);
        setIsFrontVisible(true);
      }
      setCurrentIndex(targetIndex);

      setTimeout(() => {
        setIsFlipping(false);
      }, 760);
    },
    [isFlipping, isFrontVisible]
  );

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % SAINTS.length;
    handleRotate(nextIdx, "next");
  }, [currentIndex, handleRotate]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + SAINTS.length) % SAINTS.length;
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

  // Interactive 3D parallax tilt strictly on X-axis from the center
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipping) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relY = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    // Pivot from center: tilt vertically on X axis ONLY
    setMouseTilt({
      x: -relY * 10,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseTilt({ x: 0 });
  };

  const renderCardContent = (saint: (typeof SAINTS)[0], index: number) => {
    const localized = getSaintContent(saint);

    return (
      <>
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
              background: `radial-gradient(circle 280px at 50% ${
                (-mouseTilt.x / 12 + 0.5) * 100
              }%, rgba(255, 36, 119, 0.12), transparent 70%)`,
            }}
          />
        )}

        {/* Saint Header Row: Featured Badge & Dynamic Feast Date */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-[rgba(194,189,206,0.12)]">
          <div className="text-[11px] sm:text-xs font-[200] tracking-[0.16em] sm:tracking-[0.25em] uppercase text-[#FF2477] shrink-0 min-w-0">
            <span>{t("gallery.badge")}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="text-[10px] font-mono tracking-wider sm:tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#2e2238] border border-[#FF2477]/30 text-[#FF2477] whitespace-nowrap shrink-0 leading-none">
              {String(index + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(SAINTS.length).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-mono tracking-wider sm:tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#2e2238] border border-[rgba(194,189,206,0.15)] text-[#C2BDCE] whitespace-nowrap shrink-0 leading-none">
              {localized.feastDate}
            </span>
          </div>
        </div>

        {/* Saint Title & Epithet */}
        <div className="py-4 space-y-1.5 text-center">
          <div className="py-1">
            <SaintsBookLogo size="sm" />
          </div>
          <h3 className="text-2xl font-[100] tracking-[0.16em] uppercase text-[#F8F6FA] leading-snug">
            {localized.name}
          </h3>
          <p className="text-xs font-[200] text-[#FF2477] tracking-[0.14em] uppercase">
            {localized.epithet}
          </p>
          <p className="text-[10px] font-mono tracking-widest uppercase text-[#C2BDCE]/60 pt-0.5">
            {localized.location} • {saint.era}
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex gap-1.5 sm:gap-2 my-3 p-1 rounded-lg bg-[#33253e] border border-[rgba(194,189,206,0.1)] text-[9px] sm:text-[10px] uppercase font-[200] tracking-[0.14em] sm:tracking-[0.2em]">
          <button
            onClick={() => setActiveTab("dates")}
            className={cn(
              "flex-1 py-1.5 px-1 rounded transition-colors cursor-pointer truncate",
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
              "flex-1 py-1.5 px-1 rounded transition-colors cursor-pointer truncate",
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
              "flex-1 py-1.5 px-1 rounded transition-colors cursor-pointer truncate",
              activeTab === "patronage"
                ? "bg-[#FF2477] text-white shadow-[0_0_12px_rgba(255,36,119,0.35)]"
                : "text-[#C2BDCE]/70 hover:text-white"
            )}
          >
            {t("hero.tabPatronage")}
          </button>
        </div>

        {/* Tab 1: Portrait Showcase */}
        {activeTab === "dates" && (
          <div className="space-y-2.5 py-1 animate-in fade-in duration-200 text-xs font-[200]">
            <Link
              href={`/saints/${saint.id}`}
              className="block relative h-36 sm:h-40 w-full rounded-xl overflow-hidden border border-[rgba(194,189,206,0.15)] bg-[#271C31] group/img cursor-pointer"
              title={`View chronicle of ${localized.name}`}
            >
              {saint.images && saint.images.length > 0 ? (
                <Image
                  src={saint.images[0]}
                  alt={localized.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 420px"
                  className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                  priority
                />
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-[#C2BDCE]/60">
                  {localized.name}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#271C31]/80 via-transparent to-transparent pointer-events-none" />
            </Link>

            <div className="p-2.5 rounded-lg bg-[#463354] border border-[#FF2477]/40 flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-[#FF2477] uppercase tracking-wider text-[10px] shrink-0">
                <Heart className="w-3 h-3 text-[#FF2477] shrink-0" /> {t("story.feastDay")}
              </span>
              <span className="text-white font-mono text-[11px] sm:text-xs whitespace-nowrap">
                {localized.feastDate}
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Quote */}
        {activeTab === "quote" && (
          <div className="space-y-4 py-2 animate-in fade-in duration-200 min-h-[190px] flex flex-col justify-center">
            <blockquote className="border-l-2 border-[#FF2477] pl-4 py-1 text-xs font-[200] italic text-[#C2BDCE] leading-relaxed">
              “{localized.quote}”
            </blockquote>
            <p className="text-[11px] font-[200] text-[#C2BDCE]/80 leading-relaxed line-clamp-3">
              {localized.story?.[0] || localized.epithet}
            </p>
          </div>
        )}

        {/* Tab 3: Patronage */}
        {activeTab === "patronage" && (
          <div className="space-y-3 py-2 animate-in fade-in duration-200 text-xs font-[200] min-h-[190px] flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#FF2477] block">
              {t("story.patronages")}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {localized.patronage.map((p) => (
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
        <div className="pt-4 mt-3 border-t border-[rgba(194,189,206,0.12)] flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
          <Link
            href={`/saints/${saint.id}`}
            className="inline-flex items-center gap-1.5 text-xs uppercase font-[200] tracking-[0.18em] sm:tracking-[0.22em] text-[#FF2477] hover:text-[#ff4b91] transition-colors group shrink-0"
          >
            <span>{t("gallery.readChronicle")}</span>
            <ArrowDownRight className="w-3.5 h-3.5 stroke-[1.5] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </Link>

          {/* Manual 3D Switch Controls */}
          <div className="flex items-center gap-1 shrink-0">
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
      </>
    );
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
                  {SAINTS.length}
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

          {/* Right Column: Featured Saint Stories 3D Center-Pivot Rotating Showcase (Pure X-Axis 180° Flip) */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Perspective Wrapper */}
            <div className="w-full max-w-md [perspective:1400px]">
              {/* Rotating 3D Card Flipper - Pure X-Axis 180° Flip */}
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative w-full [transform-style:preserve-3d]"
                style={{
                  transform: `rotateX(${
                    rotationX + (isHovered && !isFlipping ? mouseTilt.x : 0)
                  }deg) scale3d(${
                    isHovered && !isFlipping ? 1.015 : 1
                  }, ${isHovered && !isFlipping ? 1.015 : 1}, 1)`,
                  transition: isFlipping
                    ? "transform 750ms cubic-bezier(0.4, 0, 0.2, 1)"
                    : isHovered
                    ? "transform 100ms ease-out"
                    : "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* FRONT FACE (rotateX: 0deg) */}
                <div
                  className="relative w-full min-h-[510px] rounded-2xl border border-[rgba(194,189,206,0.18)] bg-[#433352]/90 p-5 sm:p-7 shadow-[0_30px_70px_rgba(0,0,0,0.55)] backdrop-blur-md overflow-hidden select-none flex flex-col justify-between [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
                  style={{
                    transform: "rotateX(0deg)",
                    pointerEvents: isFrontVisible ? "auto" : "none",
                  }}
                >
                  {renderCardContent(frontSaint, frontIndex)}
                </div>

                {/* BACK FACE (rotateX: 180deg) */}
                <div
                  className="absolute inset-0 w-full h-full min-h-[510px] rounded-2xl border border-[rgba(194,189,206,0.18)] bg-[#433352]/90 p-5 sm:p-7 shadow-[0_30px_70px_rgba(0,0,0,0.55)] backdrop-blur-md overflow-hidden select-none flex flex-col justify-between [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
                  style={{
                    transform: "rotateX(180deg)",
                    pointerEvents: !isFrontVisible ? "auto" : "none",
                  }}
                >
                  {renderCardContent(backSaint, backIndex)}
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
              {SAINTS.map((saint, idx) => {
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
