"use client";

import React, { useState } from "react";
import { MONOGRAPHS } from "@/data/monographs";
import { Category, Monograph } from "@/types/monograph";
import { BookOpen, Search, ArrowUpRight, Filter, BookmarkCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface MonographsGalleryProps {
  onOpenReader: (monograph: Monograph) => void;
}

export function MonographsGallery({ onOpenReader }: MonographsGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: Category[] = [
    "ALL",
    "ARCHITECTURE",
    "TYPOGRAPHY",
    "CONTEMPORARY ART",
    "ARCHIVAL THEORY",
    "CRITICISM",
  ];

  const filteredMonographs = MONOGRAPHS.filter((m) => {
    const matchesCategory =
      selectedCategory === "ALL" || m.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === "" ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="monographs" className="py-24 relative border-t border-[rgba(194,189,206,0.12)]">
      {/* Background glow accent */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#FF2477]/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#271C31]/50 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[rgba(194,189,206,0.14)]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-[200] tracking-[0.3em] uppercase text-[#FF2477]">
              <span>[ 02 // CURATED COLLECTION ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-[100] uppercase tracking-[0.18em] text-[#F8F6FA]">
              The Archival Canon
            </h2>
            <p className="text-sm sm:text-base font-[200] text-[#C2BDCE] max-w-xl leading-relaxed tracking-wide">
              Permanent monographs and critical essays produced in limited editions. Each physical folio is paired with digital open access.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 stroke-[1.5] absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C2BDCE]/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search canon or author..."
              className="w-full pl-10 pr-4 py-2.5 rounded bg-[#33253e] border border-[rgba(194,189,206,0.18)] focus:border-[#FF2477] focus:outline-none text-xs font-[200] tracking-wide text-[#F8F6FA] placeholder-[#C2BDCE]/50 transition-colors"
            />
          </div>
        </div>

        {/* Filter Navigation Pills */}
        <div className="flex items-center gap-2 py-8 overflow-x-auto no-scrollbar">
          <Filter className="w-3.5 h-3.5 text-[#C2BDCE]/60 mr-2 shrink-0 stroke-[1.5]" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-[200] tracking-[0.22em] uppercase whitespace-nowrap transition-all duration-200",
                selectedCategory === cat
                  ? "bg-[#FF2477] text-white shadow-[0_0_18px_rgba(255,36,119,0.35)]"
                  : "bg-[#352741] text-[#C2BDCE] hover:text-[#F8F6FA] hover:bg-[#433352] border border-[rgba(194,189,206,0.12)]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Monographs Grid */}
        {filteredMonographs.length === 0 ? (
          <div className="p-16 rounded-xl border border-[rgba(194,189,206,0.15)] bg-[#352741]/50 text-center space-y-3 my-8">
            <BookOpen className="w-8 h-8 stroke-[1.5] mx-auto text-[#FF2477]/60" />
            <p className="text-sm font-[200] tracking-widest uppercase text-[#F8F6FA]">
              No monographs match your query
            </p>
            <button
              onClick={() => {
                setSelectedCategory("ALL");
                setSearchQuery("");
              }}
              className="text-xs uppercase tracking-[0.25em] text-[#FF2477] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {filteredMonographs.map((monograph) => (
              <article
                key={monograph.id}
                className="group relative rounded-xl border border-[rgba(194,189,206,0.16)] bg-[#433352]/70 hover:bg-[#433352] p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#FF2477]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)] hover:-translate-y-1"
              >
                {/* Accent top indicator line on hover */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#FF2477] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-5">
                  {/* Card Meta Row */}
                  <div className="flex items-center justify-between text-[11px] font-[200]">
                    <span className="font-mono tracking-widest uppercase text-[#FF2477]">
                      {monograph.catalogNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#30233b] border border-[rgba(194,189,206,0.12)] text-[#C2BDCE]/80 tracking-widest uppercase text-[10px]">
                      {monograph.category}
                    </span>
                  </div>

                  {/* Monograph Titles */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-[100] tracking-[0.2em] uppercase text-[#F8F6FA] leading-snug group-hover:text-white transition-colors">
                      {monograph.title}
                    </h3>
                    <p className="text-xs font-[200] text-[#FF2477] tracking-[0.14em] uppercase">
                      {monograph.subtitle}
                    </p>
                  </div>

                  {/* Abstract preview */}
                  <p className="text-xs font-[200] text-[#C2BDCE] leading-relaxed line-clamp-3 tracking-wide">
                    {monograph.abstract}
                  </p>
                </div>

                {/* Card Bottom / Footer info */}
                <div className="pt-6 mt-6 border-t border-[rgba(194,189,206,0.12)] space-y-4">
                  <div className="flex items-center justify-between text-xs font-[200] text-[#C2BDCE]/70">
                    <span>{monograph.author}</span>
                    <span className="font-mono text-[10px]">{monograph.readTime}</span>
                  </div>

                  {/* Trigger Action */}
                  <button
                    onClick={() => onOpenReader(monograph)}
                    className="w-full py-2.5 px-4 rounded border border-[rgba(194,189,206,0.2)] hover:border-[#FF2477] bg-[#33253e]/80 hover:bg-[#FF2477]/15 text-[#F8F6FA] hover:text-white text-xs uppercase tracking-[0.25em] font-[200] transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(255,36,119,0.2)]"
                  >
                    <span>Read Monograph</span>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5] text-[#FF2477] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
