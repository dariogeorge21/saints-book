"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { SAINTS_DATA, Saint } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Search, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// Month numerical mapping for upcoming calculation
const MONTH_INDEX: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function parseFeastDate(feastDateStr: string): { month: number; day: number } | null {
  const parts = feastDateStr.trim().split(" ");
  if (parts.length < 2) return null;
  const monthName = parts[0].toLowerCase();
  const day = parseInt(parts[1], 10);
  if (MONTH_INDEX[monthName] !== undefined && !isNaN(day)) {
    return { month: MONTH_INDEX[monthName], day };
  }
  return null;
}

export default function FeastCalendarPage() {
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string>("ALL");
  const [upcomingSaint, setUpcomingSaint] = useState<Saint>(SAINTS_DATA[0]);

  const months = [
    "ALL",
    "January",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
  ];

  // Determine the most upcoming feast day relative to the user's current date in useEffect
  useEffect(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    let closestSaint = SAINTS_DATA[0];
    let minDaysDiff = Infinity;

    for (const saint of SAINTS_DATA) {
      const parsed = parseFeastDate(saint.feastDate);
      if (!parsed) continue;

      let feastYear = today.getFullYear();
      if (
        parsed.month < currentMonth ||
        (parsed.month === currentMonth && parsed.day < currentDay)
      ) {
        feastYear += 1;
      }

      const feastDateObj = new Date(feastYear, parsed.month, parsed.day);
      const diffMs = feastDateObj.getTime() - today.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays >= 0 && diffDays < minDaysDiff) {
        minDaysDiff = diffDays;
        closestSaint = saint;
      }
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUpcomingSaint(closestSaint);
  }, []);

  const filteredSaints = useMemo(() => {
    return SAINTS_DATA.filter((s) => {
      const matchesMonth = selectedMonth === "ALL" || s.feastMonth === selectedMonth;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        s.name.toLowerCase().includes(q) ||
        s.feastDate.toLowerCase().includes(q) ||
        s.patronage.some((p) => p.toLowerCase().includes(q)) ||
        s.location.toLowerCase().includes(q);
      return matchesMonth && matchesSearch;
    });
  }, [search, selectedMonth]);

  return (
    <div className="min-h-screen flex flex-col bg-[#3B2D47] text-[#C2BDCE] selection:bg-[#FF2477] selection:text-white">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between border-b border-[rgba(194,189,206,0.1)] pb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase font-[200] tracking-[0.25em] text-[#C2BDCE] hover:text-[#FF2477] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5] group-hover:-translate-x-1 transition-transform" />
              <span>Back to Reading</span>
            </Link>

            <span className="text-[10px] font-mono tracking-widest text-[#FF2477] uppercase px-3 py-1 rounded-full bg-[#FF2477]/10 border border-[#FF2477]/30">
              365 Liturgical Days
            </span>
          </div>

          {/* Page Masthead */}
          <header className="space-y-3">
            <span className="text-xs font-[200] tracking-[0.3em] uppercase text-[#FF2477]">
              [ LITURGICAL REPOSITORY ]
            </span>
            <h1 className="text-3xl sm:text-5xl font-[100] uppercase tracking-[0.16em] text-[#F8F6FA]">
              Feast Day Calendar
            </h1>
            <p className="text-sm sm:text-base font-[200] text-[#C2BDCE] max-w-xl leading-relaxed tracking-wide">
              A quiet, uncluttered calendar tracking annual feast days, canonisations, and direct links to each saint&apos;s chronicle.
            </p>
          </header>

          {/* UPCOMING FEAST BANNER (Maximum UX, Minimal UI, No large confetti) */}
          {upcomingSaint && (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#433352]/80 border border-[#FF2477]/40 shadow-[0_15px_40px_rgba(0,0,0,0.3)] space-y-4">
              <div className="flex items-center justify-between text-xs font-[200] tracking-[0.25em] uppercase">
                <span className="text-[#FF2477] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF2477]" />
                  Next Upcoming Feast
                </span>
                <span className="text-white font-mono text-[11px] bg-[#31233b] px-2.5 py-0.5 rounded border border-[rgba(194,189,206,0.15)]">
                  {upcomingSaint.feastDate}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-[100] uppercase tracking-[0.16em] text-[#F8F6FA]">
                    {upcomingSaint.name}
                  </h2>
                  <p className="text-xs font-[200] text-[#C2BDCE] tracking-wider">
                    {upcomingSaint.epithet} • Patron of {upcomingSaint.patronage[0]}
                  </p>
                </div>

                <Link
                  href={`/saints/${upcomingSaint.id}`}
                  className="px-6 py-2.5 rounded-lg bg-[#FF2477] hover:bg-[#ff3f8b] text-white text-xs uppercase tracking-[0.22em] font-[200] transition-all flex items-center justify-center gap-2 shrink-0 group shadow-[0_0_15px_rgba(255,36,119,0.3)]"
                >
                  <span>Read Chronicle</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[1.5] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}

          {/* Search & Month Filter Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 py-3 border-y border-[rgba(194,189,206,0.1)]">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {months.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(m)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-[200] tracking-[0.18em] uppercase whitespace-nowrap transition-all",
                    selectedMonth === m
                      ? "bg-[#FF2477] text-white"
                      : "bg-[#33253e] text-[#C2BDCE] hover:text-[#F8F6FA] border border-[rgba(194,189,206,0.1)]"
                  )}
                >
                  {m === "ALL" ? "All Months" : m}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="w-full md:w-72 relative">
              <Search className="w-4 h-4 stroke-[1.5] absolute left-3 top-1/2 -translate-y-1/2 text-[#C2BDCE]/60" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search feast or saint..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#33253e] border border-[rgba(194,189,206,0.15)] focus:border-[#FF2477] focus:outline-none text-xs font-[200] tracking-wide text-[#F8F6FA] placeholder-[#C2BDCE]/50"
              />
            </div>
          </div>

          {/* Clean Feast Register List (High UX, Minimal UI, Mobile-Responsive) */}
          <div className="space-y-3">
            {filteredSaints.map((saint) => (
              <Link
                key={saint.id}
                href={`/saints/${saint.id}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-xl bg-[#433352]/40 hover:bg-[#433352] border border-[rgba(194,189,206,0.12)] hover:border-[#FF2477]/40 transition-all gap-4"
              >
                <div className="flex items-start sm:items-center gap-4">
                  {/* Feast Date Pill */}
                  <div className="px-3 py-1.5 rounded-lg bg-[#30233b] border border-[#FF2477]/30 text-[#FF2477] font-mono text-xs tracking-wider text-center shrink-0 min-w-[100px]">
                    {saint.feastDate}
                  </div>

                  {/* Saint Info */}
                  <div className="space-y-0.5">
                    <h3 className="text-base sm:text-lg font-[200] uppercase tracking-[0.14em] text-[#F8F6FA] group-hover:text-white transition-colors">
                      {saint.name}
                    </h3>
                    <p className="text-xs font-[200] text-[#C2BDCE]/70 tracking-wide line-clamp-1">
                      {saint.epithet} • Patron of {saint.patronage.slice(0, 2).join(", ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-[200] border-t sm:border-t-0 border-[rgba(194,189,206,0.08)] pt-2 sm:pt-0">
                  <span className="text-[11px] font-mono text-[#C2BDCE]/60">
                    Born {saint.dateOfBirth}
                  </span>
                  <span className="text-[#FF2477] uppercase tracking-[0.2em] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
