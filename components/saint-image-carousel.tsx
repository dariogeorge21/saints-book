"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Calendar, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SaintImageCarouselProps {
  images?: string[];
  name: string;
  feastDate?: string;
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
  showControls?: boolean;
  showDots?: boolean;
  showCounter?: boolean;
}

/**
 * SaintImageCarousel
 *
 * High-UX interactive image showcase for Christian saint iconography.
 * Features:
 * - Pure auto-timer based transition: cycles every 2 seconds when idle (unhovered).
 * - Idle on hover: when hovered, auto-advance is completely paused with no switching.
 * - Looping manual controls: Lucide ChevronLeft & ChevronRight buttons loop across boundaries.
 * - Graceful fallback template: displays bold saint name and feast date when no images exist.
 * - Smooth crossfade transitions and ambient liturgical styling.
 */
export function SaintImageCarousel({
  images = [],
  name,
  feastDate,
  aspectRatio = "aspect-[4/3]",
  className,
  priority = false,
  showControls = true,
  showDots = true,
  showCounter = true,
}: SaintImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const hasMultipleImages = images.length > 1;

  // Next image handler (loops from last to first)
  const goToNext = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Previous image handler (loops from first to last)
  const goToPrev = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Jump to specific slide
  const goToIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < images.length) {
        setCurrentIndex(index);
      }
    },
    [images.length]
  );

  /**
   * Auto-timer effect:
   * When NOT hovered and there are multiple images, advances every 2 seconds (2000ms).
   * When hovered, the timer is cleared and the carousel stays completely idle.
   */
  useEffect(() => {
    if (!hasMultipleImages || isHovered) {
      return;
    }

    const timer = setInterval(() => {
      goToNext();
    }, 2000);

    return () => clearInterval(timer);
  }, [hasMultipleImages, isHovered, goToNext]);

  // 1. Fallback Template: Rendered when saint has no registered images
  if (!images || images.length === 0) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-[rgba(194,189,206,0.14)] bg-gradient-to-br from-[#4A3A59]/90 via-[#352741] to-[#271C31] flex flex-col justify-between p-6 select-none group shadow-inner",
          aspectRatio,
          className
        )}
        aria-label={`${name} archival placeholder`}
      >
        {/* Subtle liturgical background watermark */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#FF2477]/10 blur-2xl pointer-events-none" />
        <div className="absolute top-4 right-4 text-[rgba(194,189,206,0.12)] pointer-events-none">
          <Sparkles className="w-12 h-12 stroke-[1]" />
        </div>

        {/* Top: Liturgical Tag */}
        <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-[0.25em] text-[#FF2477]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF2477]" />
          <span>Saint Chronicle</span>
        </div>

        {/* Center: Bold Saint Name */}
        <div className="space-y-1 relative z-10 my-auto">
          <h4 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white line-clamp-2 drop-shadow-sm">
            {name}
          </h4>
          <p className="text-[11px] font-[200] uppercase tracking-[0.2em] text-[#C2BDCE]/80">
            Sacred Life & Chronicles
          </p>
        </div>

        {/* Bottom: Feast Date badge */}
        {feastDate && (
          <div className="flex items-center gap-1.5 text-xs text-[#C2BDCE] bg-[#271C31]/70 w-fit px-3 py-1 rounded-full border border-[rgba(194,189,206,0.15)] relative z-10 backdrop-blur-sm">
            <Calendar className="w-3.5 h-3.5 text-[#FF2477] stroke-[1.5]" />
            <span className="font-mono text-[10px] uppercase tracking-wider">
              Feast: {feastDate}
            </span>
          </div>
        )}
      </div>
    );
  }

  // 2. Active Carousel with Images
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-[rgba(194,189,206,0.15)] bg-[#271C31] group select-none transition-all duration-300",
        aspectRatio,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${name} image gallery`}
    >
      {/* Image Layers with Smooth Crossfade */}
      {images.map((src, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={src}
            className={cn(
              "absolute inset-0 transition-opacity duration-500 ease-in-out",
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
            aria-hidden={!isActive}
          >
            <Image
              src={src}
              alt={`${name} — Image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={priority && index === 0}
            />
            {/* Subtle bottom vignette gradient for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
          </div>
        );
      })}

      {/* Top Overlay: Image Counter Badge */}
      {showCounter && hasMultipleImages && (
        <div className="absolute top-3 right-3 z-20">
          <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full bg-black/60 text-white/95 backdrop-blur-md border border-white/15 shadow-sm">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      )}

      {/* Manual Looping Switch Buttons (ChevronLeft & ChevronRight) */}
      {showControls && hasMultipleImages && (
        <>
          {/* Previous Button (looping from index 0 -> last image) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goToPrev();
            }}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-[#FF2477] text-white flex items-center justify-center backdrop-blur-md border border-white/20 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
            aria-label="Previous saint image"
            title="Previous image"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Next Button (looping from last image -> index 0) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-[#FF2477] text-white flex items-center justify-center backdrop-blur-md border border-white/20 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
            aria-label="Next saint image"
            title="Next image"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </>
      )}

      {/* Bottom Overlay: Pagination Dots */}
      {showDots && hasMultipleImages && (
        <div
          className="absolute bottom-3 left-0 right-0 z-20 flex items-center justify-center gap-1.5"
          onClick={(e) => {
            // Prevent clicking dots area from triggering card link
            e.stopPropagation();
          }}
        >
          {images.map((_, dotIndex) => {
            const isDotActive = dotIndex === currentIndex;
            return (
              <button
                key={dotIndex}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goToIndex(dotIndex);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer shadow-sm",
                  isDotActive
                    ? "w-5 bg-[#FF2477] shadow-[0_0_8px_rgba(255,36,119,0.7)]"
                    : "w-1.5 bg-white/40 hover:bg-white/80"
                )}
                aria-label={`Jump to image ${dotIndex + 1}`}
                aria-current={isDotActive ? "true" : undefined}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
