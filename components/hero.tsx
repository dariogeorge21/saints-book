"use client";

import React, { useState } from "react";
import { SaintsBookLogo } from "./saintsbook-logo";
import { MONOGRAPHS } from "@/data/monographs";
import { Monograph } from "@/types/monograph";
import { ArrowDownRight, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onOpenReader: (monograph: Monograph) => void;
}

export function Hero({ onOpenReader }: HeroProps) {
  const featuredMonograph = MONOGRAPHS[0]; // The Geometry of Silence
  const [activeTab, setActiveTab] = useState<"cover" | "abstract" | "colophon">("cover");

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-12 pb-20 overflow-hidden">
      {/* Ambient plum/pink atmospheric background gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#FF2477]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-[#4E3C5D]/40 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#271C31]/70 blur-[100px] pointer-events-none rounded-full" />

      {/* Subtle Hairline Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 border-x border-[rgba(194,189,206,0.15)] flex justify-between">
          <div className="w-[1px] h-full bg-[rgba(194,189,206,0.1)] hidden md:block" />
          <div className="w-[1px] h-full bg-[rgba(194,189,206,0.1)] hidden lg:block" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Proem & Typography */}
          <div className="lg:col-span-7 space-y-8">
            {/* Archival Eyebrow Tag */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-[rgba(194,189,206,0.18)] bg-[#352741]/80 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2477] shadow-[0_0_8px_#FF2477]" />
              <span className="text-[11px] font-[200] tracking-[0.3em] uppercase text-[#F8F6FA]">
                Volume IV • An Archival Monograph Compendium
              </span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-[100] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#F8F6FA] leading-[1.18] sm:leading-[1.15]">
                Where <span className="text-[#FF2477] font-[200]">Silence</span> &amp; Modern Form Resonate
              </h1>
              <div className="h-[1px] w-24 bg-gradient-to-r from-[#FF2477] to-transparent" />
            </div>

            {/* Editorial Lead Excerpt */}
            <p className="text-base sm:text-lg font-[200] text-[#C2BDCE] leading-relaxed max-w-xl tracking-wide">
              SaintsBook operates at the delicate threshold between architectural silence and typographic discipline. We curate rare monographs, permanent physical folios, and avant-garde criticism — bound in geometric pink-on-plum harmony.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#monographs"
                className="px-8 py-3.5 rounded bg-[#FF2477] hover:bg-[#ff3f8b] text-white text-xs uppercase tracking-[0.28em] font-[200] transition-all shadow-[0_0_25px_rgba(255,36,119,0.35)] hover:shadow-[0_0_35px_rgba(255,36,119,0.55)] text-center flex items-center justify-center gap-2 group"
              >
                <span>Explore Works</span>
                <ArrowDownRight className="w-4 h-4 stroke-[1.5] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={() => onOpenReader(featuredMonograph)}
                className="px-6 py-3.5 rounded border border-[rgba(194,189,206,0.25)] hover:border-[#FF2477] bg-[#433352]/40 hover:bg-[#FF2477]/10 text-xs uppercase tracking-[0.28em] font-[200] text-[#F8F6FA] transition-all flex items-center justify-center gap-2 group"
              >
                <BookOpen className="w-4 h-4 stroke-[1.5] text-[#FF2477]" />
                <span>Read Featured Entry</span>
              </button>
            </div>

            {/* Archival Attributes Meter */}
            <div className="pt-6 border-t border-[rgba(194,189,206,0.12)] grid grid-cols-3 gap-6 text-left">
              <div>
                <span className="block text-2xl font-[100] text-[#F8F6FA] tracking-widest">
                  42
                </span>
                <span className="text-[10px] font-[200] tracking-[0.25em] uppercase text-[#C2BDCE]/70">
                  Archived Folios
                </span>
              </div>
              <div>
                <span className="block text-2xl font-[100] text-[#FF2477] tracking-widest">
                  100%
                </span>
                <span className="text-[10px] font-[200] tracking-[0.25em] uppercase text-[#C2BDCE]/70">
                  Monoline Typo
                </span>
              </div>
              <div>
                <span className="block text-2xl font-[100] text-[#F8F6FA] tracking-widest">
                  #3B2D47
                </span>
                <span className="text-[10px] font-[200] tracking-[0.25em] uppercase text-[#C2BDCE]/70">
                  Deep Plum Base
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Featured Monograph Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-xl border border-[rgba(194,189,206,0.2)] bg-[#433352] p-7 shadow-[0_30px_70px_rgba(0,0,0,0.55)] backdrop-blur-md overflow-hidden group">
              {/* Card Aura */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#FF2477]/15 rounded-full blur-[80px] pointer-events-none" />

              {/* Monograph Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[rgba(194,189,206,0.12)]">
                <div className="flex items-center gap-2 text-xs font-[200] tracking-[0.25em] uppercase text-[#FF2477]">
                  <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Featured Release</span>
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-[#2e2238] border border-[rgba(194,189,206,0.15)] text-[#C2BDCE]">
                  {featuredMonograph.catalogNumber}
                </span>
              </div>

              {/* Interactive Card View Tabs */}
              <div className="flex gap-2 my-4 p-1 rounded bg-[#33253e] border border-[rgba(194,189,206,0.1)] text-[10px] uppercase font-[200] tracking-[0.2em]">
                <button
                  onClick={() => setActiveTab("cover")}
                  className={`flex-1 py-1.5 rounded transition-colors ${
                    activeTab === "cover"
                      ? "bg-[#FF2477] text-white shadow-[0_0_12px_rgba(255,36,119,0.35)]"
                      : "text-[#C2BDCE]/70 hover:text-white"
                  }`}
                >
                  Monograph
                </button>
                <button
                  onClick={() => setActiveTab("abstract")}
                  className={`flex-1 py-1.5 rounded transition-colors ${
                    activeTab === "abstract"
                      ? "bg-[#FF2477] text-white shadow-[0_0_12px_rgba(255,36,119,0.35)]"
                      : "text-[#C2BDCE]/70 hover:text-white"
                  }`}
                >
                  Abstract
                </button>
                <button
                  onClick={() => setActiveTab("colophon")}
                  className={`flex-1 py-1.5 rounded transition-colors ${
                    activeTab === "colophon"
                      ? "bg-[#FF2477] text-white shadow-[0_0_12px_rgba(255,36,119,0.35)]"
                      : "text-[#C2BDCE]/70 hover:text-white"
                  }`}
                >
                  Colophon
                </button>
              </div>

              {/* View 1: Cover Presentation */}
              {activeTab === "cover" && (
                <div className="space-y-6 py-2 animate-in fade-in duration-200">
                  <div className="p-6 rounded-lg bg-[#30233b] border border-[rgba(194,189,206,0.14)] text-center space-y-4">
                    <div className="text-[10px] uppercase font-[200] tracking-[0.35em] text-[#C2BDCE]/70">
                      SaintsBook Monograph Folio
                    </div>

                    <div className="py-2">
                      <SaintsBookLogo size="sm" />
                    </div>

                    <div className="h-[1px] w-12 mx-auto bg-[#FF2477]/40" />

                    <h3 className="text-xl sm:text-2xl font-[100] tracking-[0.2em] uppercase text-[#F8F6FA] leading-snug">
                      {featuredMonograph.title}
                    </h3>

                    <p className="text-xs font-[200] text-[#FF2477] tracking-[0.15em] uppercase">
                      By {featuredMonograph.author}
                    </p>
                  </div>

                  <blockquote className="border-l border-[#FF2477] pl-4 py-1 text-xs font-[200] italic text-[#C2BDCE] leading-relaxed">
                    {featuredMonograph.pullQuote}
                  </blockquote>
                </div>
              )}

              {/* View 2: Abstract */}
              {activeTab === "abstract" && (
                <div className="space-y-4 py-2 animate-in fade-in duration-200">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#FF2477] block">
                    Curatorial Summary
                  </span>
                  <p className="text-xs font-[200] text-[#F8F6FA] leading-relaxed tracking-wide">
                    {featuredMonograph.abstract}
                  </p>
                  <div className="p-3 rounded bg-[#33253e] border border-[rgba(194,189,206,0.1)] text-[11px] font-[200] text-[#C2BDCE]">
                    <span className="text-[#FF2477]">Key Thesis: </span>
                    {featuredMonograph.excerpt}
                  </div>
                </div>
              )}

              {/* View 3: Colophon */}
              {activeTab === "colophon" && (
                <div className="space-y-3 py-2 text-xs font-[200] animate-in fade-in duration-200">
                  <div className="flex justify-between py-1.5 border-b border-[rgba(194,189,206,0.1)]">
                    <span className="text-[#C2BDCE]/70 tracking-widest uppercase">Format</span>
                    <span className="text-[#F8F6FA] text-right">{featuredMonograph.editionDetails.format}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[rgba(194,189,206,0.1)]">
                    <span className="text-[#C2BDCE]/70 tracking-widest uppercase">Extent</span>
                    <span className="text-[#F8F6FA]">{featuredMonograph.editionDetails.pages} Pages</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[rgba(194,189,206,0.1)]">
                    <span className="text-[#C2BDCE]/70 tracking-widest uppercase">Curator</span>
                    <span className="text-[#F8F6FA]">{featuredMonograph.editionDetails.curator}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[rgba(194,189,206,0.1)]">
                    <span className="text-[#C2BDCE]/70 tracking-widest uppercase">Status</span>
                    <span className="text-[#FF2477] font-[300] tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {featuredMonograph.editionDetails.stock}
                    </span>
                  </div>
                </div>
              )}

              {/* Card Footer Action */}
              <div className="pt-5 mt-4 border-t border-[rgba(194,189,206,0.12)] flex items-center justify-between">
                <div className="text-[10px] uppercase font-[200] tracking-[0.25em] text-[#C2BDCE]/70">
                  {featuredMonograph.readTime}
                </div>
                <button
                  onClick={() => onOpenReader(featuredMonograph)}
                  className="inline-flex items-center gap-1.5 text-xs uppercase font-[200] tracking-[0.22em] text-[#FF2477] hover:text-[#ff4b91] transition-colors"
                >
                  <span>Open Full Monograph</span>
                  <ArrowDownRight className="w-3.5 h-3.5 stroke-[1.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Ticker at bottom of hero */}
      <div className="w-full border-y border-[rgba(194,189,206,0.12)] bg-[#33253e]/60 py-3 mt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-[10px] sm:text-[11px] font-[200] uppercase tracking-[0.3em] text-[#C2BDCE]/80 overflow-x-auto whitespace-nowrap gap-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2477]" />
            <span>SAINTSBOOK ARCHIVE</span>
          </div>
          <span className="text-[#FF2477]">•</span>
          <span>HAIRLINE GEOMETRIC PURITY</span>
          <span className="text-[#FF2477]">•</span>
          <span>PINK ON DEEP PLUM IDENTITY</span>
          <span className="text-[#FF2477]">•</span>
          <span>GLOBAL CIRCULATION VOL. IV</span>
        </div>
      </div>
    </section>
  );
}
