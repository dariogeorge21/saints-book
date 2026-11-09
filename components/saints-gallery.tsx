"use client";

import React from "react";
import Link from "next/link";
import { SAINTS_DATA } from "@/lib/data";
import { ArrowUpRight, ArrowRight, Calendar, Award, MapPin } from "lucide-react";

export function SaintsGallery() {
  // Landing page displays exactly 3 featured saints as requested
  const featuredThreeSaints = SAINTS_DATA.slice(0, 3);

  return (
    <section id="saints" className="py-20 relative border-t border-[rgba(194,189,206,0.12)] scroll-mt-20">
      {/* Background ambient plum glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#FF2477]/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#271C31]/60 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[rgba(194,189,206,0.14)]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-[200] tracking-[0.3em] uppercase text-[#FF2477]">
              <span>[ CURATED SACRED CHRONICLES ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-[100] uppercase tracking-[0.18em] text-[#F8F6FA]">
              Featured Saints
            </h2>
            <p className="text-sm sm:text-base font-[200] text-[#C2BDCE] max-w-2xl leading-relaxed tracking-wide">
              Selected sacred biographies documenting holy virtues, trials, milestone dates, and divine calling. Select any saint to read their complete dedicated chronicle.
            </p>
          </div>

          <Link
            href="/saints"
            className="inline-flex items-center gap-2 text-xs uppercase font-[200] tracking-[0.25em] text-[#FF2477] hover:text-[#ff4b91] transition-colors group self-start md:self-end"
          >
            <span>View All {SAINTS_DATA.length} Saints</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[1.5] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Featured Saints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredThreeSaints.map((saint) => (
            <article
              key={saint.id}
              className="group relative rounded-2xl border border-[rgba(194,189,206,0.16)] bg-[#433352]/70 hover:bg-[#433352] p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#FF2477]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)] hover:-translate-y-1"
            >
              {/* Accent top indicator line on hover */}
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#FF2477] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-5">
                {/* Feast Date & Clickable Location Anchor */}
                <div className="flex items-center justify-between text-[11px] font-[200] gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full bg-[#FF2477]/15 border border-[#FF2477]/30 text-[#FF2477] font-mono tracking-wider uppercase text-[10px]">
                    Feast: {saint.feastDate}
                  </span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(saint.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] tracking-wider uppercase text-[#C2BDCE]/70 hover:text-[#FF2477] transition-colors underline underline-offset-2 decoration-[rgba(194,189,206,0.2)] hover:decoration-[#FF2477]"
                    title={`View ${saint.location} on Google Maps`}
                  >
                    <MapPin className="w-3 h-3 text-[#FF2477] stroke-[1.5]" />
                    <span className="line-clamp-1">{saint.location}</span>
                  </a>
                </div>

                {/* Saint Name & Epithet */}
                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-[100] tracking-[0.16em] uppercase text-[#F8F6FA] leading-snug group-hover:text-white transition-colors">
                    {saint.name}
                  </h3>
                  <p className="text-xs font-[200] text-[#FF2477] tracking-[0.14em] uppercase line-clamp-1">
                    {saint.epithet}
                  </p>
                </div>

                {/* Milestone Dates Preview */}
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
                </div>
              </div>

              {/* Direct Redirect to Dedicated Saint Page */}
              <div className="pt-6 mt-6 border-t border-[rgba(194,189,206,0.12)]">
                <Link
                  href={`/saints/${saint.id}`}
                  className="w-full py-2.5 px-4 rounded-lg border border-[rgba(194,189,206,0.2)] hover:border-[#FF2477] bg-[#33253e]/80 hover:bg-[#FF2477]/15 text-[#F8F6FA] hover:text-white text-xs uppercase tracking-[0.25em] font-[200] transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(255,36,119,0.2)]"
                >
                  <span>Read Full Chronicle</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5] text-[#FF2477] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Read More Redirect Banner */}
        <div className="p-8 sm:p-10 rounded-2xl border border-[rgba(194,189,206,0.16)] bg-gradient-to-r from-[#32233e] via-[#3B2D47] to-[#32233e] text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] uppercase font-[200] tracking-[0.3em] text-[#FF2477] block">
            The Complete Canon
          </span>
          <h3 className="text-xl sm:text-2xl font-[100] uppercase tracking-[0.16em] text-[#F8F6FA]">
            Explore All 12 Sacred Chronicles
          </h3>
          <p className="text-xs sm:text-sm font-[200] text-[#C2BDCE] leading-relaxed max-w-xl mx-auto tracking-wide">
            Access the full archival directory covering early Christian martyrs, Desert Fathers, monastic reformers, and modern doctors of the Church.
          </p>

          <div className="pt-2">
            <Link
              href="/saints"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#FF2477] hover:bg-[#ff3f8b] text-white text-xs uppercase tracking-[0.28em] font-[200] transition-all shadow-[0_0_20px_rgba(255,36,119,0.35)] hover:shadow-[0_0_30px_rgba(255,36,119,0.55)] group"
            >
              <span>Read More Chronicles</span>
              <ArrowRight className="w-4 h-4 stroke-[1.5] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
