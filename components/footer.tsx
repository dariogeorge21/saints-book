"use client";

import React from "react";
import { SaintsBookLogo } from "./saintsbook-logo";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  onOpenIdentityGuide: () => void;
}

export function Footer({ onOpenIdentityGuide }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#2b1f35] border-t border-[rgba(194,189,206,0.14)] overflow-hidden pt-20 pb-12 text-[#C2BDCE]">
      {/* Subtle giant background watermark */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.06] whitespace-nowrap overflow-hidden w-full text-center">
        <SaintsBookLogo size="watermark" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Top Colophon Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[rgba(194,189,206,0.1)]">
          {/* Brand Colophon */}
          <div className="md:col-span-5 space-y-4">
            <SaintsBookLogo size="lg" glow />
            <p className="text-xs font-[200] text-[#C2BDCE] leading-relaxed max-w-sm tracking-wide mt-3">
              An independent cultural archive dedicated to contemporary architectural silence, monoline typographic purity, and enduring critical thought.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[10px] font-mono tracking-widest text-[#FF2477]">
              <span>#3B2D47</span>
              <span className="text-[#C2BDCE]/40">•</span>
              <span>#FF2477</span>
              <span className="text-[#C2BDCE]/40">•</span>
              <span>#C2BDCE</span>
            </div>
          </div>

          {/* Nav Column 1 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-[200] uppercase tracking-[0.25em] text-[#F8F6FA]">
              Curations
            </h4>
            <ul className="space-y-2 text-xs font-[200] tracking-wider text-[#C2BDCE]/80">
              <li><a href="#monographs" className="hover:text-[#FF2477] transition-colors">Monographs</a></li>
              <li><a href="#monographs" className="hover:text-[#FF2477] transition-colors">Architecture</a></li>
              <li><a href="#monographs" className="hover:text-[#FF2477] transition-colors">Typography</a></li>
              <li><a href="#monographs" className="hover:text-[#FF2477] transition-colors">Criticism</a></li>
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-[200] uppercase tracking-[0.25em] text-[#F8F6FA]">
              Archive
            </h4>
            <ul className="space-y-2 text-xs font-[200] tracking-wider text-[#C2BDCE]/80">
              <li><a href="#archive" className="hover:text-[#FF2477] transition-colors">Ledger Index</a></li>
              <li><a href="#manifesto" className="hover:text-[#FF2477] transition-colors">Manifesto</a></li>
              <li><a href="#inscription" className="hover:text-[#FF2477] transition-colors">Patron Vault</a></li>
              <li>
                <button
                  onClick={onOpenIdentityGuide}
                  className="hover:text-[#FF2477] text-left transition-colors uppercase tracking-[0.16em]"
                >
                  Identity Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Column 3 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-[200] uppercase tracking-[0.25em] text-[#F8F6FA]">
              Colophon Notes
            </h4>
            <div className="text-[11px] font-[200] space-y-1.5 text-[#C2BDCE]/70 leading-relaxed">
              <p>Typeface: Geometric Sans (Outfit ExtraLight)</p>
              <p>Format: Physical 120gsm Munken &amp; Digital Monograph</p>
              <p>ISSN: 2831-9042 // Volume IV</p>
              <p className="font-mono text-[10px] text-[#FF2477] pt-1">
                40.7128° N, 74.0060° W // ZURICH • NY
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Rights Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-[200] tracking-[0.25em] uppercase text-[#C2BDCE]/60">
          <div>
            © 2026 SaintsBook Archive. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[#C2BDCE] hover:text-[#FF2477] transition-colors p-2 rounded border border-[rgba(194,189,206,0.15)] hover:border-[#FF2477]"
            aria-label="Return to top"
          >
            <span>Apex</span>
            <ArrowUp className="w-3.5 h-3.5 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
