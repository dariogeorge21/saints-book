"use client";

import React from "react";
import { Sparkles, Compass, ShieldCheck } from "lucide-react";

export function Manifesto() {
  const principles = [
    {
      number: "01",
      title: "Ultra-Light Cadence",
      subtitle: "Geometric Monoline Architecture",
      description:
        "We reject heavy, bold, and condensed typography. By reducing glyphs to their hairline mathematical essentials and extending letter-spacing, each sentence commands space through elegance rather than brute volume.",
      accent: "#FF2477",
      icon: Sparkles,
    },
    {
      number: "02",
      title: "Pink on Plum Polarity",
      subtitle: "Chromatic Contrast & Depth",
      description:
        "Deep muted plum (#3B2D47) provides an atmospheric resting canvas. The electric pink (#FF2477) acts as a sudden flare of intention, while pale lavender-grey (#C2BDCE) cradles extended editorial thought.",
      accent: "#FF2477",
      icon: Compass,
    },
    {
      number: "03",
      title: "Archival Permanence",
      subtitle: "Curatorial Subtraction",
      description:
        "In an epoch of disposable content streams, SaintsBook publishes deliberately. Every monograph, physical edition, and essay in our canon is curated with the expectation of enduring aesthetic authority fifty years hence.",
      accent: "#FF2477",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="manifesto" className="py-24 relative bg-[#352741]/50 border-t border-[rgba(194,189,206,0.12)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 pb-16">
          <div className="inline-flex items-center gap-2 text-xs font-[200] tracking-[0.3em] uppercase text-[#FF2477]">
            <span>[ 03 // THE SAINTSBOOK PHILOSOPHY ]</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-[100] uppercase tracking-[0.18em] text-[#F8F6FA] leading-tight">
            An Editorial Manifesto
          </h2>

          <div className="h-[1px] w-20 mx-auto bg-gradient-to-r from-transparent via-[#FF2477] to-transparent" />

          <p className="text-base sm:text-lg font-[200] text-[#C2BDCE] leading-relaxed tracking-wide">
            The website is not an arbitrary container for text — it is an architectural extension of the brandmark. Every proportion, margin, hairline rule, and micro-transition originates from a unified aesthetic vision.
          </p>
        </div>

        {/* 3 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.number}
                className="relative p-8 rounded-xl border border-[rgba(194,189,206,0.14)] bg-[#3B2D47]/80 hover:bg-[#433352]/90 space-y-6 transition-all duration-300 hover:border-[#FF2477]/40 hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between border-b border-[rgba(194,189,206,0.1)] pb-4">
                  <span className="text-2xl font-[100] font-mono text-[#FF2477] tracking-wider">
                    {p.number}
                  </span>
                  <div className="p-2 rounded-lg bg-[#30233b] border border-[rgba(194,189,206,0.12)] text-[#C2BDCE] group-hover:text-[#FF2477] transition-colors">
                    <Icon className="w-4 h-4 stroke-[1.5]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-[200] uppercase tracking-[0.2em] text-[#F8F6FA]">
                    {p.title}
                  </h3>
                  <p className="text-xs font-[200] tracking-[0.14em] uppercase text-[#FF2477]">
                    {p.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm font-[200] text-[#C2BDCE] leading-relaxed tracking-wide">
                  {p.description}
                </p>

                <div className="pt-4 border-t border-[rgba(194,189,206,0.08)] flex items-center gap-2 text-[10px] font-[200] tracking-[0.25em] uppercase text-[#C2BDCE]/60">
                  <span className="w-1 h-1 rounded-full bg-[#FF2477]" />
                  <span>Principle Specification</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full-width editorial quote block */}
        <div className="mt-16 p-8 sm:p-12 rounded-xl border border-[rgba(194,189,206,0.16)] bg-gradient-to-r from-[#30233b] via-[#3B2D47] to-[#30233b] text-center max-w-4xl mx-auto space-y-4">
          <blockquote className="text-lg sm:text-2xl font-[100] uppercase tracking-[0.16em] text-[#F8F6FA] leading-relaxed">
            “Airiness is not emptiness; it is the vital terrain in which contemporary ideas command their rightful gravity.”
          </blockquote>
          <div className="text-xs font-[200] tracking-[0.28em] uppercase text-[#FF2477]">
            — SaintsBook Archival Council // Zurich • Paris • New York
          </div>
        </div>
      </div>
    </section>
  );
}
