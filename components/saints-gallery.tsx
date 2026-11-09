"use client";

import React, { useState } from "react";
import { SAINTS_DATA, Saint } from "@/lib/data";
import { Search, Filter, BookOpen, ArrowUpRight, Calendar, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface SaintsGalleryProps {
  onOpenSaintStory: (saint: Saint) => void;
}

export function SaintsGallery({ onOpenSaintStory }: SaintsGalleryProps) {
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
    const matchesSearch =
      q === "" ||
      saint.name.toLowerCase().includes(q) ||
      saint.epithet.toLowerCase().includes(q) ||
      saint.feastDate.toLowerCase().includes(q) ||
      saint.location.toLowerCase().includes(q) ||
      saint.patronage.some((p) => p.toLowerCase().includes(q)) ||
      saint.story.some((p) => p.toLowerCase().includes(q));
    return matchesEra && matchesSearch;
  });

  return (
    <section id="saints" className="py-24 relative border-t border-[rgba(194,189,206,0.12)]">
      {/* Background glow accent */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#FF2477]/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#271C31]/60 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[rgba(194,189,206,0.14)]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-[200] tracking-[0.3em] uppercase text-[#FF2477]">
              <span>[ CHRONICLES OF THE SAINTS ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-[100] uppercase tracking-[0.18em] text-[#F8F6FA]">
              The Holy Canon
            </h2>
            <p className="text-sm sm:text-base font-[200] text-[#C2BDCE] max-w-2xl leading-relaxed tracking-wide">
              Explore the lives, trials, and enduring legacies of Christian saints across two millennia. Each record documents birth, beatification, canonisation, feast dates, and their full multi-paragraph sacred chronicle.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 stroke-[1.5] absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C2BDCE]/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saint, feast day, patronage..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#33253e] border border-[rgba(194,189,206,0.18)] focus:border-[#FF2477] focus:outline-none text-xs font-[200] tracking-wide text-[#F8F6FA] placeholder-[#C2BDCE]/50 transition-colors"
            />
          </div>
        </div>

        {/* Filter Navigation Pills */}
        <div className="flex items-center gap-2 py-8 overflow-x-auto no-scrollbar">
          <Filter className="w-3.5 h-3.5 text-[#C2BDCE]/60 mr-2 shrink-0 stroke-[1.5]" />
          {eras.map((era) => (
            <button
              key={era}
              onClick={() => setSelectedEra(era)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-[200] tracking-[0.22em] uppercase whitespace-nowrap transition-all duration-200",
                selectedEra === era
                  ? "bg-[#FF2477] text-white shadow-[0_0_18px_rgba(255,36,119,0.35)]"
                  : "bg-[#352741] text-[#C2BDCE] hover:text-[#F8F6FA] hover:bg-[#433352] border border-[rgba(194,189,206,0.12)]"
              )}
            >
              {era === "ALL" ? "All Eras" : era}
            </button>
          ))}
        </div>

        {/* Saints Grid */}
        {filteredSaints.length === 0 ? (
          <div className="p-16 rounded-xl border border-[rgba(194,189,206,0.15)] bg-[#352741]/50 text-center space-y-3 my-8">
            <BookOpen className="w-8 h-8 stroke-[1.5] mx-auto text-[#FF2477]/60" />
            <p className="text-sm font-[200] tracking-widest uppercase text-[#F8F6FA]">
              No saints match your search query
            </p>
            <button
              onClick={() => {
                setSelectedEra("ALL");
                setSearchQuery("");
              }}
              className="text-xs uppercase tracking-[0.25em] text-[#FF2477] hover:underline"
            >
              Reset Search &amp; Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {filteredSaints.map((saint) => (
              <article
                key={saint.id}
                className="group relative rounded-2xl border border-[rgba(194,189,206,0.16)] bg-[#433352]/70 hover:bg-[#433352] p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#FF2477]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)] hover:-translate-y-1"
              >
                {/* Accent top indicator line on hover */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#FF2477] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-5">
                  {/* Feast Date & Era Badge */}
                  <div className="flex items-center justify-between text-[11px] font-[200]">
                    <span className="px-2.5 py-1 rounded-full bg-[#FF2477]/15 border border-[#FF2477]/30 text-[#FF2477] font-mono tracking-wider uppercase text-[10px]">
                      Feast: {saint.feastDate}
                    </span>
                    <span className="text-[10px] tracking-widest uppercase text-[#C2BDCE]/70">
                      {saint.era}
                    </span>
                  </div>

                  {/* Saint Name & Epithet */}
                  <div className="space-y-1.5">
                    <h3 className="text-xl sm:text-2xl font-[100] tracking-[0.18em] uppercase text-[#F8F6FA] leading-snug group-hover:text-white transition-colors">
                      {saint.name}
                    </h3>
                    <p className="text-xs font-[200] text-[#FF2477] tracking-[0.14em] uppercase line-clamp-1">
                      {saint.epithet}
                    </p>
                  </div>

                  {/* Chronological Milestone Matrix preview */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-[200] py-2 border-y border-[rgba(194,189,206,0.1)]">
                    <div className="flex items-start gap-1 text-[#C2BDCE]/80">
                      <Calendar className="w-3 h-3 text-[#FF2477] shrink-0 mt-0.5 stroke-[1.5]" />
                      <div>
                        <span className="text-[#C2BDCE]/50 uppercase tracking-widest block text-[9px]">Born</span>
                        <span className="text-[#F8F6FA]">{saint.dateOfBirth}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-1 text-[#C2BDCE]/80">
                      <Award className="w-3 h-3 text-[#FF2477] shrink-0 mt-0.5 stroke-[1.5]" />
                      <div>
                        <span className="text-[#C2BDCE]/50 uppercase tracking-widest block text-[9px]">Canonised</span>
                        <span className="text-[#F8F6FA] line-clamp-1">{saint.canonisedDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Story Excerpt */}
                  <p className="text-xs font-[200] text-[#C2BDCE] leading-relaxed line-clamp-3 tracking-wide">
                    {saint.story[0]}
                  </p>

                  {/* Patronage Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {saint.patronage.slice(0, 3).map((p) => (
                      <span
                        key={p}
                        className="px-2 py-0.5 rounded text-[9px] font-[200] uppercase tracking-wider bg-[#33253e] text-[#C2BDCE]/80 border border-[rgba(194,189,206,0.1)]"
                      >
                        {p}
                      </span>
                    ))}
                    {saint.patronage.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[9px] font-[200] text-[#FF2477]">
                        +{saint.patronage.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-6 mt-6 border-t border-[rgba(194,189,206,0.12)]">
                  <button
                    onClick={() => onOpenSaintStory(saint)}
                    className="w-full py-2.5 px-4 rounded-lg border border-[rgba(194,189,206,0.2)] hover:border-[#FF2477] bg-[#33253e]/80 hover:bg-[#FF2477]/15 text-[#F8F6FA] hover:text-white text-xs uppercase tracking-[0.25em] font-[200] transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(255,36,119,0.2)]"
                  >
                    <span>Read Sacred Chronicle</span>
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
