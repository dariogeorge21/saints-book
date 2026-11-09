"use client";

import React, { useState } from "react";
import { SAINTS_DATA, Saint } from "@/lib/data";
import { ArrowUpRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeastCalendarProps {
  onSelectSaint: (saint: Saint) => void;
}

export function FeastCalendar({ onSelectSaint }: FeastCalendarProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>("ALL");
  const [search, setSearch] = useState("");

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

  const filtered = SAINTS_DATA.filter((s) => {
    const matchesMonth = selectedMonth === "ALL" || s.feastMonth === selectedMonth;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      s.name.toLowerCase().includes(q) ||
      s.feastDate.toLowerCase().includes(q) ||
      s.patronage.some((p) => p.toLowerCase().includes(q));
    return matchesMonth && matchesSearch;
  });

  return (
    <section id="calendar" className="py-24 relative border-t border-[rgba(194,189,206,0.12)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[rgba(194,189,206,0.14)]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-[200] tracking-[0.3em] uppercase text-[#FF2477]">
              <span>[ LITURGICAL LEDGER &amp; CHRONOLOGY ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-[100] uppercase tracking-[0.18em] text-[#F8F6FA]">
              Feast Days &amp; Canonisations
            </h2>
            <p className="text-sm sm:text-base font-[200] text-[#C2BDCE] max-w-2xl leading-relaxed tracking-wide">
              Complete liturgical accession register tracking dates of birth, beatification decrees, solemn canonisations, and annual feast days.
            </p>
          </div>

          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 stroke-[1.5] absolute left-3 top-1/2 -translate-y-1/2 text-[#C2BDCE]/60" />
            <input
              type="text"
              placeholder="Search feast or saint..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#33253e] border border-[rgba(194,189,206,0.16)] focus:border-[#FF2477] focus:outline-none text-xs font-[200] tracking-wide text-[#F8F6FA] placeholder-[#C2BDCE]/50"
            />
          </div>
        </div>

        {/* Month Filter Pills */}
        <div className="flex gap-2 py-6 overflow-x-auto text-xs uppercase font-[200] tracking-[0.2em] no-scrollbar">
          {months.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              className={cn(
                "px-3.5 py-1.5 rounded-full border transition-all whitespace-nowrap",
                selectedMonth === m
                  ? "bg-[#FF2477] border-[#FF2477] text-white shadow-[0_0_12px_rgba(255,36,119,0.3)]"
                  : "border-[rgba(194,189,206,0.15)] text-[#C2BDCE] hover:text-[#F8F6FA] bg-[#33253e]/60"
              )}
            >
              {m === "ALL" ? "All Feasts" : m}
            </button>
          ))}
        </div>

        {/* Table of Saints */}
        <div className="rounded-2xl border border-[rgba(194,189,206,0.16)] bg-[#433352]/40 overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-[200]">
              <thead className="border-b border-[rgba(194,189,206,0.14)] bg-[#31233b]/80 uppercase tracking-[0.25em] text-[#C2BDCE]/70">
                <tr>
                  <th className="py-4 px-6 font-[200]">Feast Day</th>
                  <th className="py-4 px-6 font-[200]">Saint Name</th>
                  <th className="py-4 px-6 font-[200]">Born</th>
                  <th className="py-4 px-6 font-[200]">Beatified Date</th>
                  <th className="py-4 px-6 font-[200]">Canonised Date</th>
                  <th className="py-4 px-6 font-[200]">Primary Patronage</th>
                  <th className="py-4 px-6 font-[200] text-right">Story</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(194,189,206,0.08)]">
                {filtered.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => onSelectSaint(s)}
                    className="hover:bg-[#433352]/90 transition-colors group cursor-pointer"
                  >
                    <td className="py-4 px-6 font-mono text-[11px] text-[#FF2477] tracking-wider whitespace-nowrap">
                      {s.feastDate}
                    </td>
                    <td className="py-4 px-6 text-[#F8F6FA] uppercase tracking-[0.14em] font-[200] whitespace-nowrap">
                      {s.name}
                    </td>
                    <td className="py-4 px-6 text-[#C2BDCE]/80 tracking-wide whitespace-nowrap">
                      {s.dateOfBirth}
                    </td>
                    <td className="py-4 px-6 text-[#C2BDCE]/80 tracking-wide max-w-xs truncate">
                      {s.beatifiedDate}
                    </td>
                    <td className="py-4 px-6 text-[#C2BDCE]/80 tracking-wide max-w-xs truncate">
                      {s.canonisedDate}
                    </td>
                    <td className="py-4 px-6 text-[#C2BDCE]/80 tracking-wide">
                      <span className="px-2 py-0.5 rounded bg-[#31233b] border border-[rgba(194,189,206,0.1)] text-[10px]">
                        {s.patronage[0]}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSaint(s);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-[#C2BDCE] group-hover:text-[#FF2477] transition-colors"
                      >
                        <span>Read</span>
                        <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
