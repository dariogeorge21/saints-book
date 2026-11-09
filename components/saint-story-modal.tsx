"use client";

import React, { useState } from "react";
import { Saint } from "@/lib/data";
import { X, Calendar, Award, Sparkles, Heart, Share2, Check, Bookmark, ArrowLeft, ArrowRight } from "lucide-react";

interface SaintStoryModalProps {
  saint: Saint | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateNext?: () => void;
  onNavigatePrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export function SaintStoryModal({
  saint,
  isOpen,
  onClose,
  onNavigateNext,
  onNavigatePrev,
  hasNext,
  hasPrev,
}: SaintStoryModalProps) {
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen || !saint) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(
      `SaintsBook: The Story of ${saint.name} (Feast: ${saint.feastDate}) — "${saint.quote}"`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fontSizeClasses = {
    sm: "text-xs sm:text-sm leading-relaxed",
    md: "text-sm sm:text-base leading-relaxed sm:leading-loose",
    lg: "text-base sm:text-lg leading-loose",
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-[#1b1322]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Reader Dialog */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#3B2D47] border border-[rgba(194,189,206,0.2)] rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.7)] overflow-hidden z-10 text-[#C2BDCE]">
        {/* Top Masthead */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(194,189,206,0.12)] bg-[#31233b]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#FF2477]/15 text-[#FF2477] border border-[#FF2477]/30">
              Feast: {saint.feastDate}
            </span>
            <span className="hidden sm:inline text-xs font-[200] tracking-[0.25em] uppercase text-[#C2BDCE]/70">
              SaintsBook Archive // {saint.era}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Font Size Adjuster */}
            <div className="flex items-center gap-1 border border-[rgba(194,189,206,0.15)] rounded-md px-1.5 py-0.5 text-xs font-mono bg-[#281c30]">
              <button
                onClick={() => setFontSize("sm")}
                className={`px-1.5 py-0.5 rounded transition-colors ${fontSize === "sm" ? "text-[#FF2477]" : "text-[#C2BDCE]/60"}`}
                title="Small font size"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize("md")}
                className={`px-1.5 py-0.5 rounded transition-colors ${fontSize === "md" ? "text-[#FF2477]" : "text-[#C2BDCE]/60"}`}
                title="Default font size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize("lg")}
                className={`px-1.5 py-0.5 rounded transition-colors ${fontSize === "lg" ? "text-[#FF2477]" : "text-[#C2BDCE]/60"}`}
                title="Large font size"
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => setSaved(!saved)}
              className={`p-1.5 rounded-lg border border-[rgba(194,189,206,0.15)] transition-colors ${
                saved ? "text-[#FF2477] border-[#FF2477]" : "text-[#C2BDCE] hover:text-[#FF2477]"
              }`}
              title="Save to favorites"
            >
              <Bookmark className="w-4 h-4 stroke-[1.5]" />
            </button>

            {/* Share / Copy */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg border border-[rgba(194,189,206,0.15)] text-[#C2BDCE] hover:text-[#FF2477] transition-colors"
              title="Copy quote and story citation"
            >
              {copied ? <Check className="w-4 h-4 text-green-400 stroke-[1.5]" /> : <Share2 className="w-4 h-4 stroke-[1.5]" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-[rgba(194,189,206,0.15)] text-[#C2BDCE] hover:text-[#FF2477] hover:border-[#FF2477]/40 transition-colors"
              aria-label="Close reader"
            >
              <X className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Scrollable Saint Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-8 sm:py-12 space-y-10 bg-[#3B2D47]">
          {/* Saint Header Card */}
          <div className="space-y-4 border-b border-[rgba(194,189,206,0.14)] pb-8 text-center max-w-2xl mx-auto">
            <span className="inline-block text-[11px] uppercase font-[200] tracking-[0.35em] text-[#FF2477]">
              {saint.era} • {saint.location}
            </span>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-[100] tracking-[0.18em] uppercase text-[#F8F6FA] leading-tight">
              {saint.name}
            </h1>

            {saint.latinName && (
              <p className="text-xs sm:text-sm font-[200] italic text-[#C2BDCE]/80 tracking-widest">
                {saint.latinName}
              </p>
            )}

            <p className="text-xs sm:text-sm font-[200] text-[#FF2477] tracking-[0.18em] uppercase pt-1">
              {saint.epithet}
            </p>
          </div>

          {/* Chronological Milestone Matrix: Date of Birth, Beatified Date, Canonised Date, Feast Date */}
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 1. Date of Birth */}
            <div className="p-4 rounded-xl bg-[#32243d] border border-[rgba(194,189,206,0.14)] space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-[200] tracking-[0.25em] text-[#C2BDCE]/70">
                <Calendar className="w-3.5 h-3.5 text-[#FF2477] stroke-[1.5]" />
                <span>Date of Birth</span>
              </div>
              <p className="text-sm font-[200] text-[#F8F6FA] tracking-wide pt-1">
                {saint.dateOfBirth}
              </p>
            </div>

            {/* 2. Beatified Date (Beautified Date) */}
            <div className="p-4 rounded-xl bg-[#32243d] border border-[rgba(194,189,206,0.14)] space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-[200] tracking-[0.25em] text-[#C2BDCE]/70">
                <Sparkles className="w-3.5 h-3.5 text-[#FF2477] stroke-[1.5]" />
                <span>Beatified Date</span>
              </div>
              <p className="text-xs font-[200] text-[#F8F6FA] tracking-wide pt-1 leading-snug">
                {saint.beatifiedDate}
              </p>
            </div>

            {/* 3. Canonised Date */}
            <div className="p-4 rounded-xl bg-[#32243d] border border-[rgba(194,189,206,0.14)] space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-[200] tracking-[0.25em] text-[#C2BDCE]/70">
                <Award className="w-3.5 h-3.5 text-[#FF2477] stroke-[1.5]" />
                <span>Canonised Date</span>
              </div>
              <p className="text-xs font-[200] text-[#F8F6FA] tracking-wide pt-1 leading-snug">
                {saint.canonisedDate}
              </p>
            </div>

            {/* 4. Feast Date */}
            <div className="p-4 rounded-xl bg-[#4A3258] border border-[#FF2477]/40 space-y-1 shadow-[0_0_20px_rgba(255,36,119,0.2)]">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-[200] tracking-[0.25em] text-[#FF2477]">
                <Heart className="w-3.5 h-3.5 text-[#FF2477] stroke-[1.5]" />
                <span>Feast Day</span>
              </div>
              <p className="text-sm font-[300] text-white tracking-widest pt-1">
                {saint.feastDate}
              </p>
            </div>
          </div>

          {/* Inspirational Quote Block */}
          {saint.quote && (
            <div className="max-w-2xl mx-auto p-6 rounded-xl bg-[#33253e]/80 border-l-2 border-[#FF2477] border-y border-r border-[rgba(194,189,206,0.1)]">
              <p className="text-base sm:text-lg font-[200] italic text-[#F8F6FA] tracking-wide leading-relaxed">
                “{saint.quote}”
              </p>
              <div className="mt-2 text-right text-xs font-[200] uppercase tracking-[0.2em] text-[#FF2477]">
                — {saint.name}
              </div>
            </div>
          )}

          {/* Patronage Tags & Iconographic Attributes */}
          <div className="max-w-2xl mx-auto space-y-3 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase font-[200] tracking-[0.25em] text-[#C2BDCE]/70 mr-1">
                Patronages:
              </span>
              {saint.patronage.map((p) => (
                <span
                  key={p}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-[200] uppercase tracking-[0.18em] bg-[#33253e] text-[#C2BDCE] border border-[rgba(194,189,206,0.15)]"
                >
                  {p}
                </span>
              ))}
            </div>

            {saint.attributes && (
              <p className="text-xs font-[200] text-[#C2BDCE]/80 tracking-wide">
                <span className="text-[#FF2477] uppercase tracking-wider text-[10px]">Iconography: </span>
                {saint.attributes}
              </p>
            )}
          </div>

          {/* Multiple Paragraphs of the Saint's Story */}
          <div className="max-w-2xl mx-auto space-y-6 pt-4">
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase font-[200] tracking-[0.3em] text-[#FF2477]">
                The Story &amp; Divine Life
              </span>
              <div className="flex-1 h-[1px] bg-[rgba(194,189,206,0.12)]" />
            </div>

            {/* Paragraphs with natural editorial gaps and no numeric labels */}
            <div className="space-y-7 pt-2">
              {saint.story.map((paragraph, index) => (
                <p
                  key={index}
                  className={`font-[300] tracking-wide text-[#C2BDCE] ${fontSizeClasses}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 border-t border-[rgba(194,189,206,0.12)] bg-[#31233b] flex items-center justify-between text-xs font-[200] tracking-widest">
          {onNavigatePrev ? (
            <button
              onClick={onNavigatePrev}
              disabled={!hasPrev}
              className="flex items-center gap-1.5 text-[#C2BDCE] hover:text-[#FF2477] disabled:opacity-30 disabled:hover:text-[#C2BDCE] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Previous Saint</span>
            </button>
          ) : (
            <span />
          )}

          <span className="text-[10px] font-mono text-[#C2BDCE]/60 uppercase tracking-[0.25em]">
            SaintsBook Canon
          </span>

          {onNavigateNext ? (
            <button
              onClick={onNavigateNext}
              disabled={!hasNext}
              className="flex items-center gap-1.5 text-[#C2BDCE] hover:text-[#FF2477] disabled:opacity-30 disabled:hover:text-[#C2BDCE] transition-colors"
            >
              <span>Next Saint</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}
