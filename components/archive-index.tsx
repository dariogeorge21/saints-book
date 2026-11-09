"use client";

import React, { useState } from "react";
import { ARCHIVE_INDEX_ITEMS } from "@/data/monographs";
import { ArrowUpRight, Search, CheckCircle2, Lock, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function ArchiveIndex() {
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [search, setSearch] = useState("");

  const filteredItems = ARCHIVE_INDEX_ITEMS.filter((item) => {
    const matchesStatus =
      filterStatus === "ALL" || item.status.includes(filterStatus);
    const matchesSearch =
      search === "" ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.curator.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <section id="archive" className="py-24 relative border-t border-[rgba(194,189,206,0.12)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[rgba(194,189,206,0.14)]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-[200] tracking-[0.3em] uppercase text-[#FF2477]">
              <span>[ 04 // CHRONOLOGICAL REGISTER ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-[100] uppercase tracking-[0.18em] text-[#F8F6FA]">
              Archive Ledger
            </h2>
            <p className="text-sm sm:text-base font-[200] text-[#C2BDCE] max-w-xl leading-relaxed tracking-wide">
              A comprehensive accession catalog recording every folio, monograph, and critical treatise accessioned into the SaintsBook vault since inception.
            </p>
          </div>

          {/* Quick Filter & Search */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="w-4 h-4 stroke-[1.5] absolute left-3 top-1/2 -translate-y-1/2 text-[#C2BDCE]/60" />
              <input
                type="text"
                placeholder="Filter index ledger..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded bg-[#33253e] border border-[rgba(194,189,206,0.16)] focus:border-[#FF2477] focus:outline-none text-xs font-[200] tracking-wide text-[#F8F6FA] placeholder-[#C2BDCE]/50"
              />
            </div>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex gap-2 py-6 overflow-x-auto text-xs uppercase font-[200] tracking-[0.2em]">
          {["ALL", "AVAILABLE", "LIMITED ARCHIVE", "VAULT ONLY"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                "px-3.5 py-1.5 rounded-full border transition-all whitespace-nowrap",
                filterStatus === status
                  ? "bg-[#FF2477] border-[#FF2477] text-white"
                  : "border-[rgba(194,189,206,0.15)] text-[#C2BDCE] hover:text-[#F8F6FA] bg-[#33253e]/60"
              )}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Archival Table */}
        <div className="rounded-xl border border-[rgba(194,189,206,0.16)] bg-[#433352]/40 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-[200]">
              <thead className="border-b border-[rgba(194,189,206,0.14)] bg-[#31233b]/80 uppercase tracking-[0.25em] text-[#C2BDCE]/70">
                <tr>
                  <th className="py-4 px-6 font-[200]">Accession ID</th>
                  <th className="py-4 px-6 font-[200]">Monograph Title</th>
                  <th className="py-4 px-6 font-[200]">Volume</th>
                  <th className="py-4 px-6 font-[200]">Year</th>
                  <th className="py-4 px-6 font-[200]">Curator</th>
                  <th className="py-4 px-6 font-[200]">Status</th>
                  <th className="py-4 px-6 font-[200] text-right">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(194,189,206,0.08)]">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#433352]/80 transition-colors group"
                  >
                    <td className="py-4 px-6 font-mono text-[11px] text-[#FF2477] tracking-wider">
                      {item.id}
                    </td>
                    <td className="py-4 px-6 text-[#F8F6FA] uppercase tracking-[0.12em] font-[200]">
                      {item.title}
                    </td>
                    <td className="py-4 px-6 text-[#C2BDCE]/80 tracking-widest font-mono text-[11px]">
                      {item.volume}
                    </td>
                    <td className="py-4 px-6 text-[#C2BDCE]/80 font-mono text-[11px]">
                      {item.year}
                    </td>
                    <td className="py-4 px-6 text-[#C2BDCE]/80 tracking-wide">
                      {item.curator}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] tracking-widest uppercase font-mono border",
                          item.status === "AVAILABLE"
                            ? "bg-[#FF2477]/15 text-[#FF2477] border-[#FF2477]/30"
                            : item.status === "LIMITED ARCHIVE"
                            ? "bg-[#33253e] text-[#C2BDCE] border-[rgba(194,189,206,0.2)]"
                            : "bg-[#251b2e] text-[#C2BDCE]/60 border-[rgba(194,189,206,0.1)]"
                        )}
                      >
                        {item.status === "AVAILABLE" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : item.status === "LIMITED ARCHIVE" ? (
                          <Clock className="w-3 h-3" />
                        ) : (
                          <Lock className="w-3 h-3" />
                        )}
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <a
                        href="#monographs"
                        className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-[#C2BDCE] group-hover:text-[#FF2477] transition-colors"
                      >
                        <span>Inspect</span>
                        <ArrowUpRight className="w-3 h-3 stroke-[1.5]" />
                      </a>
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
