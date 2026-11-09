"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SaintsBookLogo } from "./saintsbook-logo";
import { SAINTS_DATA } from "@/lib/data";
import { ArrowDownRight, BookOpen, Sparkles, Calendar, Award, Heart } from "lucide-react";

export function Hero() {
  const featuredSaint = SAINTS_DATA[0]; // St. Francis of Assisi
  const [activeTab, setActiveTab] = useState<"dates" | "quote" | "patronage">("dates");

  return (
    <section className="relative min-h-[88vh] flex flex-col justify-between pt-10 pb-16 overflow-hidden">
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
                The Book of Christian Saints
              </span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-[100] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#F8F6FA] leading-[1.18] sm:leading-[1.15]">
                Sacred Lives <span className="text-[#FF2477] font-[200]">&amp; Enduring</span> Chronicles
              </h1>
              <div className="h-[1px] w-20 bg-gradient-to-r from-[#FF2477] to-transparent" />
            </div>

            {/* Editorial Lead Excerpt */}
            <p className="text-base sm:text-lg font-[200] text-[#C2BDCE] leading-relaxed max-w-xl tracking-wide">
              An architectural digital illuminated book dedicated to the stories, divine callings, and enduring legacies of Christian saints. Documenting dates of birth, beatification, canonisation, and annual feast days across two millennia.
            </p>

            {/* Clear Direct Navigation on Page Load with Smooth Scroll to Reading Section */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#saints"
                className="px-8 py-3.5 rounded-lg bg-[#FF2477] hover:bg-[#ff3f8b] text-white text-xs uppercase tracking-[0.28em] font-[200] transition-all shadow-[0_0_25px_rgba(255,36,119,0.35)] hover:shadow-[0_0_35px_rgba(255,36,119,0.55)] text-center flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Start Reading</span>
                <ArrowDownRight className="w-4 h-4 stroke-[1.5] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <Link
                href="/saints"
                className="px-6 py-3.5 rounded-lg border border-[rgba(194,189,206,0.25)] hover:border-[#FF2477] bg-[#433352]/40 hover:bg-[#FF2477]/10 text-xs uppercase tracking-[0.28em] font-[200] text-[#F8F6FA] transition-all flex items-center justify-center gap-2 group"
              >
                <BookOpen className="w-4 h-4 stroke-[1.5] text-[#FF2477]" />
                <span>All 12 Saints</span>
              </Link>

              <Link
                href="/calendar"
                className="px-4 py-3.5 text-xs uppercase tracking-[0.22em] font-[200] text-[#C2BDCE] hover:text-[#FF2477] transition-colors flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#FF2477]" />
                <span>Feast Calendar</span>
              </Link>
            </div>

            {/* Archival Attributes Meter */}
            <div className="pt-6 border-t border-[rgba(194,189,206,0.12)] grid grid-cols-3 gap-6 text-left">
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
                  365
                </span>
                <span className="text-[10px] font-[200] tracking-[0.25em] uppercase text-[#C2BDCE]/70">
                  Feast Days
                </span>
              </div>
              <div>
                <span className="block text-2xl font-[100] text-[#F8F6FA] tracking-widest">
                  2,000+
                </span>
                <span className="text-[10px] font-[200] tracking-[0.25em] uppercase text-[#C2BDCE]/70">
                  Years of History
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Saint Card with Direct Page Link */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-2xl border border-[rgba(194,189,206,0.18)] bg-[#433352]/90 p-7 shadow-[0_30px_70px_rgba(0,0,0,0.55)] backdrop-blur-md overflow-hidden group">
              {/* Card Aura */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#FF2477]/15 rounded-full blur-[80px] pointer-events-none" />

              {/* Saint Header Row */}
              <div className="flex items-center justify-between pb-5 border-b border-[rgba(194,189,206,0.12)]">
                <div className="flex items-center gap-2 text-xs font-[200] tracking-[0.25em] uppercase text-[#FF2477]">
                  <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Featured Chronicle</span>
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#2e2238] border border-[#FF2477]/30 text-[#FF2477]">
                  Feast: {featuredSaint.feastDate}
                </span>
              </div>

              {/* Saint Title & Epithet */}
              <div className="py-4 space-y-1.5 text-center">
                <div className="py-1">
                  <SaintsBookLogo size="sm" />
                </div>
                <h3 className="text-2xl font-[100] tracking-[0.16em] uppercase text-[#F8F6FA] leading-snug">
                  {featuredSaint.name}
                </h3>
                <p className="text-xs font-[200] text-[#FF2477] tracking-[0.14em] uppercase">
                  {featuredSaint.epithet}
                </p>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex gap-2 my-3 p-1 rounded-lg bg-[#33253e] border border-[rgba(194,189,206,0.1)] text-[10px] uppercase font-[200] tracking-[0.2em]">
                <button
                  onClick={() => setActiveTab("dates")}
                  className={`flex-1 py-1.5 rounded transition-colors ${
                    activeTab === "dates"
                      ? "bg-[#FF2477] text-white shadow-[0_0_12px_rgba(255,36,119,0.35)]"
                      : "text-[#C2BDCE]/70 hover:text-white"
                  }`}
                >
                  Key Dates
                </button>
                <button
                  onClick={() => setActiveTab("quote")}
                  className={`flex-1 py-1.5 rounded transition-colors ${
                    activeTab === "quote"
                      ? "bg-[#FF2477] text-white shadow-[0_0_12px_rgba(255,36,119,0.35)]"
                      : "text-[#C2BDCE]/70 hover:text-white"
                  }`}
                >
                  Reflection
                </button>
                <button
                  onClick={() => setActiveTab("patronage")}
                  className={`flex-1 py-1.5 rounded transition-colors ${
                    activeTab === "patronage"
                      ? "bg-[#FF2477] text-white shadow-[0_0_12px_rgba(255,36,119,0.35)]"
                      : "text-[#C2BDCE]/70 hover:text-white"
                  }`}
                >
                  Patronage
                </button>
              </div>

              {/* Tab 1: Key Dates */}
              {activeTab === "dates" && (
                <div className="space-y-2.5 py-2 animate-in fade-in duration-200 text-xs font-[200]">
                  <div className="p-2.5 rounded-lg bg-[#352741] border border-[rgba(194,189,206,0.1)] flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#C2BDCE]/70 uppercase tracking-wider text-[10px]">
                      <Calendar className="w-3 h-3 text-[#FF2477]" /> Date of Birth
                    </span>
                    <span className="text-[#F8F6FA]">{featuredSaint.dateOfBirth}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#352741] border border-[rgba(194,189,206,0.1)] flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#C2BDCE]/70 uppercase tracking-wider text-[10px]">
                      <Sparkles className="w-3 h-3 text-[#FF2477]" /> Beatified Date
                    </span>
                    <span className="text-[#F8F6FA] text-right">{featuredSaint.beatifiedDate}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#352741] border border-[rgba(194,189,206,0.1)] flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#C2BDCE]/70 uppercase tracking-wider text-[10px]">
                      <Award className="w-3 h-3 text-[#FF2477]" /> Canonised Date
                    </span>
                    <span className="text-[#F8F6FA] text-right">{featuredSaint.canonisedDate}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#463354] border border-[#FF2477]/40 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#FF2477] uppercase tracking-wider text-[10px]">
                      <Heart className="w-3 h-3 text-[#FF2477]" /> Feast Day
                    </span>
                    <span className="text-white font-mono">{featuredSaint.feastDate}</span>
                  </div>
                </div>
              )}

              {/* Tab 2: Quote */}
              {activeTab === "quote" && (
                <div className="space-y-4 py-2 animate-in fade-in duration-200">
                  <blockquote className="border-l-2 border-[#FF2477] pl-4 py-1 text-xs font-[200] italic text-[#C2BDCE] leading-relaxed">
                    “{featuredSaint.quote}”
                  </blockquote>
                  <p className="text-[11px] font-[200] text-[#C2BDCE]/80 leading-relaxed">
                    {featuredSaint.story[0]}
                  </p>
                </div>
              )}

              {/* Tab 3: Patronage */}
              {activeTab === "patronage" && (
                <div className="space-y-3 py-2 animate-in fade-in duration-200 text-xs font-[200]">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#FF2477] block">
                    Patron Of
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {featuredSaint.patronage.map((p) => (
                      <span
                        key={p}
                        className="px-2.5 py-1 rounded-full bg-[#352741] border border-[rgba(194,189,206,0.15)] text-[#F8F6FA] text-[10px] tracking-wider"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2 text-[10px] text-[#C2BDCE]/70">
                    <span className="text-[#FF2477]">Era: </span> {featuredSaint.era} ({featuredSaint.location})
                  </div>
                </div>
              )}

              {/* Direct Redirect to Dedicated Page */}
              <div className="pt-5 mt-4 border-t border-[rgba(194,189,206,0.12)] flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C2BDCE]/70">
                  Dedicated Story Page
                </span>
                <Link
                  href={`/saints/${featuredSaint.id}`}
                  className="inline-flex items-center gap-1.5 text-xs uppercase font-[200] tracking-[0.22em] text-[#FF2477] hover:text-[#ff4b91] transition-colors"
                >
                  <span>Read Chronicle Page</span>
                  <ArrowDownRight className="w-3.5 h-3.5 stroke-[1.5]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
