"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SAINTS_DATA } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { ArrowUpRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function FeastCalendar() {
  const { t, getSaintContent, isTransitioning } = useLanguage();
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
    if (q === "") return matchesMonth;

    const loc = getSaintContent(s);
    const matchesSearch =
      s.name.toLowerCase().includes(q) ||
      loc.name.toLowerCase().includes(q) ||
      s.feastDate.toLowerCase().includes(q) ||
      loc.feastDate.toLowerCase().includes(q) ||
      s.patronage.some((p) => p.toLowerCase().includes(q)) ||
      loc.patronage.some((p) => p.toLowerCase().includes(q));

    return matchesMonth && matchesSearch;
  });

  return (
    <section
      id="calendar"
      className={cn(
        "py-24 relative border-t border-[rgba(194,189,206,0.12)] transition-all duration-300",
        isTransitioning && "lang-switch-active"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[rgba(194,189,206,0.14)]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-[200] tracking-[0.3em] uppercase text-[#FF2477]">
              <span>{t("calendar.badge")}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-[100] uppercase tracking-[0.18em] text-[#F8F6FA]">
              {t("calendar.title")}
            </h2>
            <p className="text-sm sm:text-base font-[200] text-[#C2BDCE] max-w-2xl leading-relaxed tracking-wide">
              {t("calendar.lead")}
            </p>
          </div>

          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 stroke-[1.5] absolute left-3 top-1/2 -translate-y-1/2 text-[#C2BDCE]/60" />
            <input
              type="text"
              placeholder={t("calendar.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#33253e] border border-[rgba(194,189,206,0.16)] focus:border-[#FF2477] focus:outline-none text-xs font-[200] tracking-wide text-[#F8F6FA] placeholder-[#C2BDCE]/50"
            />
          </div>
        </div>

        {/* Month Filter Pills */}
        <div className="flex gap-2 py-2 overflow-x-auto text-xs uppercase font-[200] tracking-[0.2em] no-scrollbar">
          {months.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              className={cn(
                "px-3.5 py-1.5 rounded-full border transition-all whitespace-nowrap cursor-pointer",
                selectedMonth === m
                  ? "bg-[#FF2477] border-[#FF2477] text-white shadow-[0_0_12px_rgba(255,36,119,0.3)]"
                  : "border-[rgba(194,189,206,0.15)] text-[#C2BDCE] hover:text-[#F8F6FA] bg-[#33253e]/60"
              )}
            >
              {t(`month.${m}`)}
            </button>
          ))}
        </div>

        {/* Table of Saints with Direct Page Links */}
        <div className="rounded-2xl border border-[rgba(194,189,206,0.16)] bg-[#433352]/40 overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-[200]">
              <thead className="border-b border-[rgba(194,189,206,0.14)] bg-[#31233b]/80 uppercase tracking-[0.25em] text-[#C2BDCE]/70">
                <tr>
                  <th className="py-4 px-6 font-[200]">{t("story.feastDay")}</th>
                  <th className="py-4 px-6 font-[200]">{t("gallery.title")}</th>
                  <th className="py-4 px-6 font-[200]">{t("story.dob")}</th>
                  <th className="py-4 px-6 font-[200]">{t("story.beatified")}</th>
                  <th className="py-4 px-6 font-[200]">{t("story.canonised")}</th>
                  <th className="py-4 px-6 font-[200]">{t("story.patronages")}</th>
                  <th className="py-4 px-6 font-[200] text-right">{t("story.chronicle")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(194,189,206,0.08)]">
                {filtered.map((s) => {
                  const loc = getSaintContent(s);
                  return (
                    <tr
                      key={s.id}
                      className="hover:bg-[#433352]/90 transition-colors group"
                    >
                      <td className="py-4 px-6 font-mono text-[11px] text-[#FF2477] tracking-wider whitespace-nowrap">
                        {loc.feastDate}
                      </td>
                      <td className="py-4 px-6 text-[#F8F6FA] uppercase tracking-[0.14em] font-[200] whitespace-nowrap">
                        <Link
                          href={`/saints/${s.id}`}
                          className="hover:text-[#FF2477] transition-colors"
                        >
                          {loc.name}
                        </Link>
                      </td>
                      <td className="py-4 px-6 text-[#C2BDCE]/80 tracking-wide whitespace-nowrap">
                        {loc.dateOfBirth}
                      </td>
                      <td className="py-4 px-6 text-[#C2BDCE]/80 tracking-wide max-w-xs truncate">
                        {loc.beatifiedDate}
                      </td>
                      <td className="py-4 px-6 text-[#C2BDCE]/80 tracking-wide max-w-xs truncate">
                        {loc.canonisedDate}
                      </td>
                      <td className="py-4 px-6 text-[#C2BDCE]/80 tracking-wide">
                        <span className="px-2 py-0.5 rounded bg-[#31233b] border border-[rgba(194,189,206,0.1)] text-[10px]">
                          {loc.patronage[0]}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          href={`/saints/${s.id}`}
                          className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-[#C2BDCE] group-hover:text-[#FF2477] transition-colors"
                        >
                          <span>{t("gallery.readChronicle")}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5]" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
