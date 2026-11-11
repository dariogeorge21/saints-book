"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SAINTS_DATA } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/lib/language-context";
import { Search, Filter, ArrowUpRight, ArrowLeft, Calendar, Award, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AllSaintsPage() {
  const { t, getSaintContent, isTransitioning, language } = useLanguage();
  const [selectedEra, setSelectedEra] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const eras = [
    "ALL",
    "Early Church",
    "Medieval",
    "Renaissance & Reformation",
    "Modern Era",
  ];

  const filteredSaints = SAINTS_DATA.filter((saint) => {
    const matchesEra = selectedEra === "ALL" || saint.era === selectedEra;
    const q = searchQuery.toLowerCase().trim();
    if (q === "") return matchesEra;

    const loc = getSaintContent(saint);
    const matchesSearch =
      saint.name.toLowerCase().includes(q) ||
      loc.name.toLowerCase().includes(q) ||
      saint.epithet.toLowerCase().includes(q) ||
      loc.epithet.toLowerCase().includes(q) ||
      saint.feastDate.toLowerCase().includes(q) ||
      loc.feastDate.toLowerCase().includes(q) ||
      saint.location.toLowerCase().includes(q) ||
      loc.location.toLowerCase().includes(q) ||
      saint.patronage.some((p) => p.toLowerCase().includes(q)) ||
      loc.patronage.some((p) => p.toLowerCase().includes(q)) ||
      saint.story.some((p) => p.toLowerCase().includes(q)) ||
      loc.story.some((p) => p.toLowerCase().includes(q));

    return matchesEra && matchesSearch;
  });

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col bg-[#3B2D47] text-[#C2BDCE] selection:bg-[#FF2477] selection:text-white",
        language === "ml" && "font-malayalam",
        language === "hi" && "font-hindi"
      )}
    >
      <Navbar />

      <main className="flex-1 py-12 sm:py-20">
        <div
          className={cn(
            "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 transition-all duration-300",
            isTransitioning && "lang-switch-active"
          )}
        >
          {/* Breadcrumb Back */}
          <div className="flex items-center justify-between border-b border-[rgba(194,189,206,0.12)] pb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase font-[200] tracking-[0.25em] text-[#C2BDCE] hover:text-[#FF2477] transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5] group-hover:-translate-x-1 transition-transform" />
              <span>{t("allSaints.backHome")}</span>
            </Link>

            <span className="text-[10px] font-mono tracking-widest text-[#FF2477] uppercase px-3 py-1 rounded-full bg-[#FF2477]/10 border border-[#FF2477]/30">
              {t("allSaints.saintsCount", {
                filtered: filteredSaints.length,
                total: SAINTS_DATA.length,
              })}
            </span>
          </div>

          {/* Page Masthead */}
          <header className="space-y-4 max-w-2xl">
            <span className="text-xs font-[200] tracking-[0.3em] uppercase text-[#FF2477]">
              {t("gallery.badge")}
            </span>
            <h1 className="text-3xl sm:text-5xl font-[100] uppercase tracking-[0.16em] text-[#F8F6FA]">
              {t("allSaints.title")}
            </h1>
            <p className="text-sm sm:text-base font-[200] text-[#C2BDCE] leading-relaxed tracking-wide">
              {t("allSaints.lead")}
            </p>
          </header>

          {/* Search & Era Filter Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 py-4 border-y border-[rgba(194,189,206,0.1)]">
            {/* Era Filter Pills with Full Localization */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <Filter className="w-3.5 h-3.5 text-[#C2BDCE]/60 mr-1 shrink-0 stroke-[1.5]" />
              {eras.map((era) => {
                const eraLabel = t(`era.${era}`);
                return (
                  <button
                    key={era}
                    onClick={() => setSelectedEra(era)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-xs font-[200] tracking-[0.2em] uppercase whitespace-nowrap transition-all cursor-pointer",
                      selectedEra === era
                        ? "bg-[#FF2477] text-white shadow-[0_0_12px_rgba(255,36,119,0.35)]"
                        : "bg-[#352741] text-[#C2BDCE] hover:text-[#F8F6FA] hover:bg-[#433352] border border-[rgba(194,189,206,0.12)]"
                    )}
                  >
                    {eraLabel}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="w-full md:w-80 relative">
              <Search className="w-4 h-4 stroke-[1.5] absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C2BDCE]/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("allSaints.searchPlaceholder")}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#33253e] border border-[rgba(194,189,206,0.18)] focus:border-[#FF2477] focus:outline-none text-xs font-[200] tracking-wide text-[#F8F6FA] placeholder-[#C2BDCE]/50"
              />
            </div>
          </div>

          {/* Saints Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSaints.map((saint) => {
              const localized = getSaintContent(saint);
              return (
                <article
                  key={saint.id}
                  className="group relative rounded-2xl border border-[rgba(194,189,206,0.15)] bg-[#433352]/60 hover:bg-[#433352] p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#FF2477]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:-translate-y-1"
                >
                  <div className="space-y-5">
                    {/* Top Meta: Feast Date & Clickable Location Anchor */}
                    <div className="flex items-center justify-between text-[11px] font-[200] gap-2 flex-wrap">
                      <span className="px-2.5 py-1 rounded-full bg-[#FF2477]/15 border border-[#FF2477]/30 text-[#FF2477] font-mono tracking-wider uppercase text-[10px]">
                        {t("gallery.feast")}: {localized.feastDate}
                      </span>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          localized.location
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] tracking-wider uppercase text-[#C2BDCE]/70 hover:text-[#FF2477] transition-colors underline underline-offset-2 decoration-[rgba(194,189,206,0.2)] hover:decoration-[#FF2477]"
                        title={`View ${localized.location} on Google Maps`}
                      >
                        <MapPin className="w-3 h-3 text-[#FF2477] stroke-[1.5]" />
                        <span className="line-clamp-1">{localized.location}</span>
                      </a>
                    </div>

                    {/* Name & Epithet */}
                    <div className="space-y-1.5">
                      <h2 className="text-xl sm:text-2xl font-[100] tracking-[0.16em] uppercase text-[#F8F6FA] group-hover:text-white transition-colors">
                        {localized.name}
                      </h2>
                      <p className="text-xs font-[200] text-[#FF2477] tracking-[0.14em] uppercase line-clamp-1">
                        {localized.epithet}
                      </p>
                    </div>

                    {/* Dates Preview */}
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-[200] py-2 border-y border-[rgba(194,189,206,0.08)]">
                      <div className="flex items-start gap-1 text-[#C2BDCE]/80">
                        <Calendar className="w-3 h-3 text-[#FF2477] shrink-0 mt-0.5 stroke-[1.5]" />
                        <div>
                          <span className="text-[#C2BDCE]/50 uppercase tracking-widest block text-[9px]">
                            {t("story.dob")}
                          </span>
                          <span className="text-[#F8F6FA] line-clamp-1">
                            {localized.dateOfBirth}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-1 text-[#C2BDCE]/80">
                        <Award className="w-3 h-3 text-[#FF2477] shrink-0 mt-0.5 stroke-[1.5]" />
                        <div>
                          <span className="text-[#C2BDCE]/50 uppercase tracking-widest block text-[9px]">
                            {t("story.canonised")}
                          </span>
                          <span className="text-[#F8F6FA] line-clamp-1">
                            {localized.canonisedDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Excerpt */}
                    <p className="text-xs font-[200] text-[#C2BDCE] leading-relaxed line-clamp-3 tracking-wide">
                      {localized.story[0]}
                    </p>

                    {/* Patronage Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {localized.patronage.slice(0, 3).map((p) => (
                        <span
                          key={p}
                          className="px-2 py-0.5 rounded text-[9px] font-[200] uppercase tracking-wider bg-[#33253e] text-[#C2BDCE]/80 border border-[rgba(194,189,206,0.1)]"
                        >
                          {p}
                        </span>
                      ))}
                      {localized.patronage.length > 3 && (
                        <span className="px-1.5 py-0.5 text-[9px] font-[200] text-[#FF2477]">
                          +{localized.patronage.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Redirect Link to Dedicated Page */}
                  <div className="pt-6 mt-6 border-t border-[rgba(194,189,206,0.1)]">
                    <Link
                      href={`/saints/${saint.id}`}
                      className="w-full py-2.5 px-4 rounded-lg border border-[rgba(194,189,206,0.2)] hover:border-[#FF2477] bg-[#33253e]/80 hover:bg-[#FF2477]/15 text-[#F8F6FA] hover:text-white text-xs uppercase tracking-[0.25em] font-[200] transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(255,36,119,0.2)] cursor-pointer"
                    >
                      <span>{t("gallery.readChronicle")}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5] text-[#FF2477] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredSaints.length === 0 && (
            <div className="text-center py-16 space-y-3">
              <p className="text-sm font-[200] text-[#C2BDCE]/70">
                {t("allSaints.noResults")}
              </p>
              <button
                onClick={() => {
                  setSelectedEra("ALL");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-lg bg-[#FF2477]/20 border border-[#FF2477]/40 text-xs font-[200] text-white hover:bg-[#FF2477] transition-all cursor-pointer"
              >
                {t("allSaints.clearFilter")}
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
