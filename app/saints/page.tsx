"use client";

import React, { useState, useMemo, useDeferredValue } from "react";
import Link from "next/link";
import { SAINTS } from "@/lib/content";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/lib/language-context";
import { SaintsSearchBar } from "@/components/saints-search-bar";
import { SaintImageCarousel } from "@/components/saint-image-carousel";
import {
  Filter,
  ArrowUpRight,
  ArrowLeft,
  Calendar,
  Award,
  MapPin,
  SearchX,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AllSaintsPage() {
  const { t, getSaintContent, isTransitioning, language } = useLanguage();
  const [selectedEra, setSelectedEra] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // React 19 useDeferredValue keeps input instant while concurrently computing filtered items
  const deferredQuery = useDeferredValue(searchQuery);

  const eras = [
    "ALL",
    "Early Church",
    "Medieval",
    "Renaissance & Reformation",
    "Modern Era",
  ];

  // Efficient, memoized search matching across all fields and localized scripts
  const filteredSaints = useMemo(() => {
    const q = deferredQuery.toLowerCase().trim();

    return SAINTS.filter((saint) => {
      const matchesEra = selectedEra === "ALL" || saint.era === selectedEra;
      if (q === "") return matchesEra;

      const loc = getSaintContent(saint);
      const matchesSearch =
        saint.name.toLowerCase().includes(q) ||
        loc.name.toLowerCase().includes(q) ||
        (saint.latinName && saint.latinName.toLowerCase().includes(q)) ||
        saint.epithet.toLowerCase().includes(q) ||
        loc.epithet.toLowerCase().includes(q) ||
        saint.feastDate.toLowerCase().includes(q) ||
        loc.feastDate.toLowerCase().includes(q) ||
        (saint.feastMonth && saint.feastMonth.toLowerCase().includes(q)) ||
        saint.location.toLowerCase().includes(q) ||
        loc.location.toLowerCase().includes(q) ||
        saint.patronage.some((p) => p.toLowerCase().includes(q)) ||
        loc.patronage.some((p) => p.toLowerCase().includes(q)) ||
        saint.attributes.toLowerCase().includes(q) ||
        loc.attributes.toLowerCase().includes(q) ||
        saint.quote.toLowerCase().includes(q) ||
        loc.quote.toLowerCase().includes(q);

      return matchesEra && matchesSearch;
    });
  }, [selectedEra, deferredQuery, getSaintContent]);

  const handleResetFilters = () => {
    setSelectedEra("ALL");
    setSearchQuery("");
  };

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
          {/* Breadcrumb Navigation & Saint Count Pill */}
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
                total: SAINTS.length,
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

          {/* Interactive Search & Era Filter Controls */}
          <section
            aria-label="Filter and search saints archive"
            className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 py-6 border-y border-[rgba(194,189,206,0.1)]"
          >
            {/* Era Filter Pills with Full Localization */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <Filter className="w-3.5 h-3.5 text-[#C2BDCE]/60 mr-1 shrink-0 stroke-[1.5]" />
              {eras.map((era) => {
                const eraLabel = t(`era.${era}`);
                const isSelected = selectedEra === era;
                return (
                  <button
                    key={era}
                    onClick={() => setSelectedEra(era)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-xs font-[200] tracking-[0.2em] uppercase whitespace-nowrap transition-all cursor-pointer",
                      isSelected
                        ? "bg-[#FF2477] text-white shadow-[0_0_12px_rgba(255,36,119,0.35)] font-[400]"
                        : "bg-[#352741] text-[#C2BDCE] hover:text-[#F8F6FA] hover:bg-[#433352] border border-[rgba(194,189,206,0.12)]"
                    )}
                    aria-pressed={isSelected}
                  >
                    {eraLabel}
                  </button>
                );
              })}
            </div>

            {/* Accessible Saints Search Bar with live counter and shortcuts */}
            <div className="w-full lg:w-96">
              <SaintsSearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={t("allSaints.searchPlaceholder")}
                resultCount={filteredSaints.length}
                totalCount={SAINTS.length}
              />
            </div>
          </section>

          {/* Saints Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSaints.map((saint) => {
              const localized = getSaintContent(saint);
              return (
                <article
                  key={saint.id}
                  className="group relative rounded-2xl border border-[rgba(194,189,206,0.15)] bg-[#433352]/60 hover:bg-[#433352] p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#FF2477]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:-translate-y-1"
                >
                  <div className="space-y-5">
                    {/* Interactive Saint Image Showcase */}
                    <Link
                      href={`/saints/${saint.id}`}
                      className="block overflow-hidden rounded-xl group/img cursor-pointer"
                      title={`View chronicle of ${localized.name}`}
                    >
                      <SaintImageCarousel
                        images={saint.images || []}
                        name={localized.name}
                        feastDate={localized.feastDate}
                        aspectRatio="aspect-[4/3]"
                      />
                    </Link>

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

                    {/* Quote Wisdom Snippet */}
                    <p className="text-xs font-[200] text-[#C2BDCE] leading-relaxed line-clamp-3 tracking-wide italic">
                      {localized.quote ? `“${localized.quote}”` : localized.epithet}
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

          {/* Atmospheric Empty Search State */}
          {filteredSaints.length === 0 && (
            <div
              role="status"
              className="text-center py-20 px-4 max-w-md mx-auto space-y-5 rounded-2xl bg-[#352741]/40 border border-[rgba(194,189,206,0.12)]"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-[#FF2477]/10 border border-[#FF2477]/30 flex items-center justify-center text-[#FF2477]">
                <SearchX className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-[300] uppercase tracking-wider text-[#F8F6FA]">
                  No Saints Found
                </h3>
                <p className="text-xs font-[200] text-[#C2BDCE]/70 leading-relaxed">
                  {searchQuery ? (
                    <>No chronicles match &ldquo;<span className="text-white">{searchQuery}</span>&rdquo; in the selected era.</>
                  ) : (
                    t("allSaints.noResults")
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF2477] text-white text-xs font-[200] uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(255,36,119,0.3)] hover:shadow-[0_0_25px_rgba(255,36,119,0.5)] transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 stroke-[2]" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
