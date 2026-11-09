"use client";

import React, { useState } from "react";
import { Monograph } from "@/types/monograph";
import { X, Share2, Check, ArrowLeft, ArrowRight, Bookmark } from "lucide-react";

interface MonographReaderModalProps {
  monograph: Monograph | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MonographReaderModal({
  monograph,
  isOpen,
  onClose,
}: MonographReaderModalProps) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  if (!isOpen || !monograph) return null;

  const currentChapter = monograph.chapters[activeChapterIndex] || monograph.chapters[0];

  const handleShare = () => {
    navigator.clipboard.writeText(
      `SaintsBook Monograph: "${monograph.title}" by ${monograph.author} (${monograph.catalogNumber})`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fontSizeClass = {
    sm: "text-xs leading-relaxed",
    md: "text-sm leading-relaxed sm:text-base sm:leading-loose",
    lg: "text-base leading-loose sm:text-lg sm:leading-loose",
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 md:p-10 animate-in fade-in duration-200">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-[#191120]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Reader Container */}
      <div className="relative w-full max-w-4xl max-h-[95vh] flex flex-col bg-[#3B2D47] border border-[rgba(194,189,206,0.2)] rounded-xl shadow-[0_30px_90px_rgba(0,0,0,0.7)] overflow-hidden z-10 text-[#C2BDCE]">
        {/* Top Masthead */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(194,189,206,0.12)] bg-[#31233b]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tracking-widest text-[#FF2477] uppercase px-2 py-0.5 rounded bg-[#FF2477]/10 border border-[#FF2477]/30">
              {monograph.catalogNumber}
            </span>
            <span className="hidden sm:inline text-xs font-[200] tracking-[0.25em] uppercase text-[#C2BDCE]/70">
              SaintsBook Reading Room
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Font Size Selector */}
            <div className="hidden sm:flex items-center gap-1 border border-[rgba(194,189,206,0.15)] rounded px-1.5 py-0.5 text-xs font-mono bg-[#281c30]">
              <button
                onClick={() => setFontSize("sm")}
                className={`px-1.5 py-0.5 rounded ${fontSize === "sm" ? "text-[#FF2477]" : "text-[#C2BDCE]/60"}`}
                title="Small Font"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize("md")}
                className={`px-1.5 py-0.5 rounded ${fontSize === "md" ? "text-[#FF2477]" : "text-[#C2BDCE]/60"}`}
                title="Medium Font"
              >
                A
              </button>
              <button
                onClick={() => setFontSize("lg")}
                className={`px-1.5 py-0.5 rounded ${fontSize === "lg" ? "text-[#FF2477]" : "text-[#C2BDCE]/60"}`}
                title="Large Font"
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-1.5 rounded border border-[rgba(194,189,206,0.15)] transition-colors ${
                bookmarked ? "text-[#FF2477] border-[#FF2477]" : "text-[#C2BDCE] hover:text-[#FF2477]"
              }`}
              title="Bookmark monograph"
            >
              <Bookmark className="w-4 h-4 stroke-[1.5]" />
            </button>

            {/* Share / Citation */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded border border-[rgba(194,189,206,0.15)] text-[#C2BDCE] hover:text-[#FF2477] transition-colors"
              title="Copy citation"
            >
              {copied ? <Check className="w-4 h-4 text-green-400 stroke-[1.5]" /> : <Share2 className="w-4 h-4 stroke-[1.5]" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded border border-[rgba(194,189,206,0.15)] text-[#C2BDCE] hover:text-[#FF2477] hover:border-[#FF2477]/40 transition-colors"
              aria-label="Close reader"
            >
              <X className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-8 sm:py-12 space-y-10 bg-[#3B2D47]">
          {/* Monograph Header */}
          <div className="space-y-4 border-b border-[rgba(194,189,206,0.14)] pb-8 text-center max-w-2xl mx-auto">
            <span className="inline-block text-[10px] uppercase font-[200] tracking-[0.35em] text-[#FF2477]">
              {monograph.category} • {monograph.season} {monograph.year}
            </span>

            <h1 className="text-2xl sm:text-4xl font-[100] tracking-[0.2em] uppercase text-[#F8F6FA] leading-tight">
              {monograph.title}
            </h1>

            <p className="text-xs sm:text-sm font-[200] text-[#FF2477] tracking-[0.16em] uppercase">
              {monograph.subtitle}
            </p>

            <div className="pt-2 text-xs font-[200] text-[#C2BDCE]/70 tracking-widest">
              Authored by <span className="text-[#F8F6FA]">{monograph.author}</span> — {monograph.authorRole}
            </div>
          </div>

          {/* Pull Quote Callout */}
          <div className="max-w-2xl mx-auto p-6 rounded-lg bg-[#33253e]/80 border-l-2 border-[#FF2477] border-y border-r border-[rgba(194,189,206,0.1)]">
            <p className="text-base sm:text-lg font-[200] italic text-[#F8F6FA] tracking-wide leading-relaxed">
              {monograph.pullQuote}
            </p>
          </div>

          {/* Chapter Selector */}
          {monograph.chapters.length > 1 && (
            <div className="max-w-2xl mx-auto flex items-center justify-between border-b border-[rgba(194,189,206,0.1)] pb-3 text-xs uppercase font-[200] tracking-[0.25em]">
              <span className="text-[#C2BDCE]/60">Chapters:</span>
              <div className="flex gap-2">
                {monograph.chapters.map((ch, idx) => (
                  <button
                    key={ch.number}
                    onClick={() => setActiveChapterIndex(idx)}
                    className={`px-3 py-1 rounded transition-colors ${
                      activeChapterIndex === idx
                        ? "bg-[#FF2477] text-white"
                        : "bg-[#33253e] text-[#C2BDCE] hover:text-white"
                    }`}
                  >
                    Part {ch.number}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Chapter Reading Excerpt */}
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#FF2477]">
                SECTION {currentChapter.number}
              </span>
              <h2 className="text-lg sm:text-xl font-[200] text-[#F8F6FA] tracking-widest uppercase">
                {currentChapter.title}
              </h2>
            </div>

            <p className={`font-[300] tracking-wide text-[#C2BDCE] ${fontSizeClass}`}>
              {currentChapter.content}
            </p>

            <p className={`font-[300] tracking-wide text-[#C2BDCE]/90 ${fontSizeClass}`}>
              {monograph.abstract}
            </p>
          </div>

          {/* Archival Colophon Box */}
          <div className="max-w-2xl mx-auto p-6 rounded-lg bg-[#32243c] border border-[rgba(194,189,206,0.12)] space-y-3 text-xs font-[200]">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#FF2477] block">
              Archival Colophon
            </span>
            <div className="grid grid-cols-2 gap-3 text-[#C2BDCE]/80">
              <div>
                <span className="text-[#C2BDCE]/50 uppercase tracking-widest block text-[10px]">Print Format</span>
                <span>{monograph.editionDetails.format}</span>
              </div>
              <div>
                <span className="text-[#C2BDCE]/50 uppercase tracking-widest block text-[10px]">Extent</span>
                <span>{monograph.editionDetails.pages} Pages • Hardbound</span>
              </div>
              <div>
                <span className="text-[#C2BDCE]/50 uppercase tracking-widest block text-[10px]">ISBN</span>
                <span className="font-mono">{monograph.editionDetails.isbn}</span>
              </div>
              <div>
                <span className="text-[#C2BDCE]/50 uppercase tracking-widest block text-[10px]">Curator</span>
                <span>{monograph.editionDetails.curator}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reader Footer Navigation */}
        <div className="px-6 py-4 border-t border-[rgba(194,189,206,0.12)] bg-[#31233b] flex items-center justify-between text-xs font-[200] tracking-widest">
          <button
            onClick={() => setActiveChapterIndex(Math.max(0, activeChapterIndex - 1))}
            disabled={activeChapterIndex === 0}
            className="flex items-center gap-1.5 text-[#C2BDCE] hover:text-[#FF2477] disabled:opacity-30 disabled:hover:text-[#C2BDCE] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Previous Part</span>
          </button>

          <span className="text-[#C2BDCE]/60">
            {activeChapterIndex + 1} of {monograph.chapters.length}
          </span>

          <button
            onClick={() => setActiveChapterIndex(Math.min(monograph.chapters.length - 1, activeChapterIndex + 1))}
            disabled={activeChapterIndex === monograph.chapters.length - 1}
            className="flex items-center gap-1.5 text-[#C2BDCE] hover:text-[#FF2477] disabled:opacity-30 disabled:hover:text-[#C2BDCE] transition-colors"
          >
            <span>Next Part</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
