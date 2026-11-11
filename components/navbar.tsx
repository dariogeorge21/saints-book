"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SaintsBookLogo } from "./saintsbook-logo";
import { ArrowRight, Calendar, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled
          ? "bg-[#3B2D47]/95 backdrop-blur-md border-b border-[rgba(194,189,206,0.12)] py-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent border-b border-transparent py-4 sm:py-5"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="SaintsBook Home"
        >
          <SaintsBookLogo size="md" glow />
        </Link>

        {/* Minimal Navigation & Direct Start Reading Action */}
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/calendar"
            className="flex items-center gap-1.5 text-xs uppercase font-[200] tracking-[0.2em] text-[#C2BDCE] hover:text-[#FF2477] transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 stroke-[1.5]" />
            <span className="hidden sm:inline">{t("nav.calendar")}</span>
          </Link>

          {/* Quick Settings & Language Indicator */}
          <Link
            href="/settings"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[rgba(194,189,206,0.15)] hover:border-[#FF2477]/50 text-xs font-[200] tracking-wider text-[#C2BDCE] hover:text-[#FF2477] transition-colors"
            title="Language & Preferences"
          >
            <Globe className="w-3.5 h-3.5 text-[#FF2477]" />
            <span className="text-[11px] font-mono uppercase">
              {activeLangObj?.flag || "EN"}
            </span>
          </Link>

          <Link
            href="/saints"
            className="px-4 sm:px-5 py-2 rounded-lg bg-[#FF2477] hover:bg-[#ff3f8b] text-white text-xs uppercase tracking-[0.25em] font-[200] transition-all shadow-[0_0_15px_rgba(255,36,119,0.3)] hover:shadow-[0_0_25px_rgba(255,36,119,0.5)] flex items-center gap-1.5 group"
          >
            <span>{t("nav.startReading")}</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[1.5] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </header>
  );
}
