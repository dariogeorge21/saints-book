"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SaintsBookLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "watermark";
  mode?: "vector" | "image";
  showMarkOnly?: boolean;
  className?: string;
  glow?: boolean;
}

export function SaintsBookLogo({
  size = "md",
  mode = "vector",
  showMarkOnly = false,
  className,
  glow = false,
}: SaintsBookLogoProps) {
  if (mode === "image") {
    const dimensions = {
      sm: { width: 140, height: 24 },
      md: { width: 190, height: 32 },
      lg: { width: 260, height: 44 },
      xl: { width: 340, height: 58 },
      watermark: { width: 700, height: 120 },
    }[size];

    return (
      <div
        className={cn(
          "inline-flex items-center transition-all duration-300 select-none",
          glow && "drop-shadow-[0_0_16px_rgba(255,36,119,0.45)]",
          className
        )}
      >
        <Image
          src="/saintsbook.png"
          alt="SaintsBook Logo"
          width={dimensions.width}
          height={dimensions.height}
          priority
          className="h-auto object-contain"
        />
      </div>
    );
  }

  // Vector / Typographic Geometric Implementation
  // Faithfully mirroring the logo: geometric, ultra-light, uppercase, generous letter-spacing
  // "SAINTS" in #FF2477 with chevron 'A' without crossbar, "BOOK" in #C2BDCE
  const sizeClasses = {
    sm: "text-base tracking-[0.22em]",
    md: "text-xl sm:text-2xl tracking-[0.26em]",
    lg: "text-3xl sm:text-4xl tracking-[0.28em]",
    xl: "text-4xl sm:text-6xl tracking-[0.3em]",
    watermark: "text-6xl sm:text-8xl md:text-9xl tracking-[0.32em] opacity-15",
  }[size];

  if (showMarkOnly) {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center font-sans select-none tracking-widest font-[100] transition-all",
          glow && "drop-shadow-[0_0_12px_rgba(255,36,119,0.6)]",
          className
        )}
      >
        <span className="text-[#FF2477] font-[100]">S</span>
        <span className="text-[#C2BDCE] font-[100]">B</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center font-sans uppercase font-[100] select-none transition-all duration-300 group",
        sizeClasses,
        glow && "drop-shadow-[0_0_18px_rgba(255,36,119,0.4)]",
        className
      )}
      style={{ fontFamily: "var(--font-outfit), 'Helvetica Neue', Arial, sans-serif" }}
    >
      {/* SAINTS in #FF2477 with chevron A */}
      <span className="inline-flex items-center text-[#FF2477] font-[100] transition-colors duration-300 group-hover:text-[#ff4b91]">
        <span className="inline-block relative -mr-[0.1em]">S</span>
        {/* Geometric Inverted Chevron A matching the exact logo */}
        <span className="inline-block relative px-[0.09em]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[0.82em] h-[0.88em] inline-block align-baseline -mb-[0.11em] -ml-[0.1em] stroke-[1.15]"
          >
            <polyline points="3,21 12,3 21,21" />
          </svg>
        </span>
        <span>INTS</span>
      </span>

      {/* BOOK in #C2BDCE */}
      <span className="inline-flex items-center text-[#C2BDCE] font-[100] transition-colors duration-300 group-hover:text-[#ece9f1]">
        <span>BOOK</span>
      </span>
    </div>
  );
}
