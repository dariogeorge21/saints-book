"use client";

import React, { useState } from "react";
import { SaintsBookLogo } from "./saintsbook-logo";
import { BRAND_COLORS } from "@/data/monographs";
import { X, Check, Copy, Palette, Type, Layers, Sparkles } from "lucide-react";

interface BrandIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BrandIdentityModal({ isOpen, onClose }: BrandIdentityModalProps) {
  const [activeTab, setActiveTab] = useState<"palette" | "typography" | "logo" | "components">("palette");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1e1625]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#3B2D47] border border-[rgba(194,189,206,0.18)] rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden z-10 text-[#C2BDCE]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(194,189,206,0.12)] bg-[#33253e]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF2477] shadow-[0_0_8px_#FF2477]" />
            <div>
              <h2 className="text-sm font-[200] tracking-[0.25em] uppercase text-[#F8F6FA]">
                Visual Identity & Design Direction
              </h2>
              <p className="text-xs font-[200] text-[#C2BDCE]/70 tracking-widest mt-0.5">
                SaintsBook Specification & Architectural Reference
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[rgba(194,189,206,0.15)] text-[#C2BDCE] hover:text-[#FF2477] hover:border-[#FF2477]/40 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[rgba(194,189,206,0.12)] bg-[#382a44] px-6 gap-2 overflow-x-auto text-xs uppercase tracking-[0.2em] font-[200]">
          <button
            onClick={() => setActiveTab("palette")}
            className={`flex items-center gap-2 py-3.5 px-3 border-b-2 transition-all duration-200 whitespace-nowrap ${
              activeTab === "palette"
                ? "border-[#FF2477] text-[#FF2477]"
                : "border-transparent text-[#C2BDCE]/70 hover:text-[#F8F6FA]"
            }`}
          >
            <Palette className="w-3.5 h-3.5 stroke-[1.5]" />
            Colour Palette
          </button>
          <button
            onClick={() => setActiveTab("typography")}
            className={`flex items-center gap-2 py-3.5 px-3 border-b-2 transition-all duration-200 whitespace-nowrap ${
              activeTab === "typography"
                ? "border-[#FF2477] text-[#FF2477]"
                : "border-transparent text-[#C2BDCE]/70 hover:text-[#F8F6FA]"
            }`}
          >
            <Type className="w-3.5 h-3.5 stroke-[1.5]" />
            Typography
          </button>
          <button
            onClick={() => setActiveTab("logo")}
            className={`flex items-center gap-2 py-3.5 px-3 border-b-2 transition-all duration-200 whitespace-nowrap ${
              activeTab === "logo"
                ? "border-[#FF2477] text-[#FF2477]"
                : "border-transparent text-[#C2BDCE]/70 hover:text-[#F8F6FA]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
            Logo Anatomy
          </button>
          <button
            onClick={() => setActiveTab("components")}
            className={`flex items-center gap-2 py-3.5 px-3 border-b-2 transition-all duration-200 whitespace-nowrap ${
              activeTab === "components"
                ? "border-[#FF2477] text-[#FF2477]"
                : "border-transparent text-[#C2BDCE]/70 hover:text-[#F8F6FA]"
            }`}
          >
            <Layers className="w-3.5 h-3.5 stroke-[1.5]" />
            Components
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-[#3B2D47]">
          {/* TAB 1: PALETTE */}
          {activeTab === "palette" && (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#FF2477]">
                  Chromatic Foundation
                </span>
                <h3 className="text-xl font-[200] text-[#F8F6FA] tracking-wider mt-1">
                  The Pink-on-Plum Aesthetic
                </h3>
                <p className="text-sm font-[200] text-[#C2BDCE] mt-1 leading-relaxed">
                  Deep plum serves as the atmospheric dark canvas, allowing the vibrant pink accent to act as a decisive focal beacon while pale lavender-grey guarantees serene editorial legibility.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {BRAND_COLORS.map((col) => (
                  <div
                    key={col.hex}
                    className="p-5 rounded-lg border border-[rgba(194,189,206,0.15)] bg-[#433352]/70 space-y-4 hover:border-[#FF2477]/40 transition-colors group"
                  >
                    <div
                      className="w-full h-24 rounded border border-[rgba(194,189,206,0.12)] flex items-end justify-between p-3"
                      style={{ backgroundColor: col.hex }}
                    >
                      <span
                        className="text-xs uppercase font-mono tracking-widest px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: col.hex === "#3B2D47" ? "#4E3C5D" : "#1e1625",
                          color: col.hex === "#3B2D47" ? "#C2BDCE" : "#F8F6FA",
                        }}
                      >
                        {col.hex}
                      </span>
                      <button
                        onClick={() => handleCopy(col.hex)}
                        className="p-1.5 rounded bg-black/40 text-white hover:bg-black/60 transition-colors"
                        title="Copy Hex"
                      >
                        {copiedCode === col.hex ? (
                          <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div>
                      <h4 className="text-sm font-[300] tracking-wider text-[#F8F6FA]">
                        {col.name}
                      </h4>
                      <p className="text-xs font-[200] text-[#FF2477] tracking-widest mt-0.5 uppercase">
                        {col.role}
                      </p>
                    </div>

                    <p className="text-xs font-[200] text-[#C2BDCE]/80 leading-relaxed">
                      {col.description}
                    </p>

                    <div className="pt-2 border-t border-[rgba(194,189,206,0.1)] text-[11px] font-[200] text-[#C2BDCE]/60">
                      <span className="text-[#F8F6FA]/70">Usage:</span> {col.usage}
                    </div>
                  </div>
                ))}
              </div>

              {/* Surface Elevation Matrix */}
              <div className="p-5 rounded-lg border border-[rgba(194,189,206,0.12)] bg-[#352741] space-y-3">
                <h4 className="text-xs uppercase tracking-[0.25em] text-[#F8F6FA] font-[200]">
                  Dark Surface Elevations
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-[200]">
                  <div className="p-3 rounded bg-[#271C31] border border-[rgba(194,189,206,0.1)]">
                    <span className="block text-[#FF2477] font-mono text-[10px]">#271C31</span>
                    <span className="text-[#C2BDCE]">Plum Ground / Void</span>
                  </div>
                  <div className="p-3 rounded bg-[#3B2D47] border border-[rgba(194,189,206,0.2)]">
                    <span className="block text-[#FF2477] font-mono text-[10px]">#3B2D47</span>
                    <span className="text-[#F8F6FA]">Base Canvas</span>
                  </div>
                  <div className="p-3 rounded bg-[#463654] border border-[rgba(194,189,206,0.1)]">
                    <span className="block text-[#FF2477] font-mono text-[10px]">#463654</span>
                    <span className="text-[#C2BDCE]">Card Surface</span>
                  </div>
                  <div className="p-3 rounded bg-[#523F62] border border-[rgba(194,189,206,0.1)]">
                    <span className="block text-[#FF2477] font-mono text-[10px]">#523F62</span>
                    <span className="text-[#C2BDCE]">Interactive Hover</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TYPOGRAPHY */}
          {activeTab === "typography" && (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#FF2477]">
                  Geometric & Airy
                </span>
                <h3 className="text-xl font-[200] text-[#F8F6FA] tracking-wider mt-1">
                  Ultra-Light Typographic Character
                </h3>
                <p className="text-sm font-[200] text-[#C2BDCE] mt-1 leading-relaxed">
                  Inspired by Avenir Next Ultra Light and Helvetica Neue Thin. Heavy, bold, or condensed typography is strictly avoided to preserve the editorial elegance and breathing room.
                </p>
              </div>

              {/* Typographic Hierarchy Specimen */}
              <div className="p-6 rounded-lg border border-[rgba(194,189,206,0.15)] bg-[#433352]/50 space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C2BDCE]/60">
                    Display Title (Weight 100 • Tracking 0.28em • Uppercase)
                  </span>
                  <div className="text-2xl sm:text-3xl font-[100] tracking-[0.28em] text-[#F8F6FA] uppercase mt-1">
                    THE ARCHITECTURE OF CONTEMPORARY FORM
                  </div>
                </div>

                <div className="h-[1px] bg-[rgba(194,189,206,0.12)]" />

                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C2BDCE]/60">
                    Editorial Subtitle (Weight 200 • Tracking 0.2em • Uppercase)
                  </span>
                  <div className="text-base sm:text-lg font-[200] tracking-[0.2em] text-[#FF2477] uppercase mt-1">
                    AN ARCHIVAL COMPENDIUM DEDICATED TO MONOLINE PURITY
                  </div>
                </div>

                <div className="h-[1px] bg-[rgba(194,189,206,0.12)]" />

                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C2BDCE]/60">
                    Body Copy (Weight 300 • Tracking 0.02em • Leading Relaxed)
                  </span>
                  <p className="text-sm font-[300] tracking-wide text-[#C2BDCE] mt-1 leading-relaxed max-w-2xl">
                    Every letterform is constructed as an architectural pavilion: thin, precise, and generously spaced. Generous line-height and letter-spacing transform the screen into a tactile reading room where ideas unfold without visual aggression.
                  </p>
                </div>

                <div className="h-[1px] bg-[rgba(194,189,206,0.12)]" />

                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C2BDCE]/60">
                    Colophon & Metadata (Weight 200 • Tracking 0.35em • Uppercase)
                  </span>
                  <div className="text-xs font-[200] tracking-[0.35em] text-[#C2BDCE]/80 uppercase mt-1">
                    CATALOGUE NO. 2026.04 // CURATED IN THE PLUM ARCHIVE // ALL RIGHTS RESERVED
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LOGO ANATOMY */}
          {activeTab === "logo" && (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#FF2477]">
                  Primary Visual Reference
                </span>
                <h3 className="text-xl font-[200] text-[#F8F6FA] tracking-wider mt-1">
                  Logo Construction & Two-Tone Separation
                </h3>
                <p className="text-sm font-[200] text-[#C2BDCE] mt-1 leading-relaxed">
                  The website is designed as a direct physical extension of this logotype. Note the two-tone division: vibrant pink for SAINTS and pale lavender-grey for BOOK, accompanied by the inverted chevron glyph.
                </p>
              </div>

              {/* Logo Showcases */}
              <div className="p-8 rounded-lg border border-[rgba(194,189,206,0.15)] bg-[#33253e] flex flex-col items-center justify-center gap-8 text-center">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C2BDCE]/60">
                    Official Reference Rendering
                  </span>
                  <div className="p-6 rounded-lg bg-[#3B2D47] border border-[rgba(194,189,206,0.12)] shadow-inner">
                    <SaintsBookLogo size="xl" glow />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left text-xs font-[200]">
                  <div className="p-4 rounded bg-[#3f304c] border border-[rgba(194,189,206,0.12)] space-y-2">
                    <div className="flex items-center gap-2 text-[#FF2477] font-[300]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF2477]" />
                      SAINTS / #FF2477
                    </div>
                    <p className="text-[#C2BDCE]/80 leading-relaxed">
                      Represents active human expression, vitalism, and modern energy. The &apos;A&apos; is constructed without a crossbar (inverted chevron), giving it an architectural apex.
                    </p>
                  </div>

                  <div className="p-4 rounded bg-[#3f304c] border border-[rgba(194,189,206,0.12)] space-y-2">
                    <div className="flex items-center gap-2 text-[#C2BDCE] font-[300]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C2BDCE]" />
                      BOOK / #C2BDCE
                    </div>
                    <p className="text-[#C2BDCE]/80 leading-relaxed">
                      Represents the timeless archive, literary permanence, and quiet intellect. Circular geometric &apos;O&apos;s reinforce optical harmony and balance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: COMPONENTS */}
          {activeTab === "components" && (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#FF2477]">
                  Design Language in Practice
                </span>
                <h3 className="text-xl font-[200] text-[#F8F6FA] tracking-wider mt-1">
                  Buttons, Micro-Interactions & Dividers
                </h3>
                <p className="text-sm font-[200] text-[#C2BDCE] mt-1 leading-relaxed">
                  Every interactive surface maintains ultra-light typography, understated plum elevation, and pink micro-transitions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Interactive Button States */}
                <div className="p-5 rounded-lg border border-[rgba(194,189,206,0.15)] bg-[#433352]/40 space-y-4">
                  <h4 className="text-xs uppercase tracking-[0.25em] text-[#F8F6FA] font-[200]">
                    Button Hierarchy
                  </h4>

                  <div className="space-y-3">
                    {/* Primary Button */}
                    <button className="w-full py-2.5 px-4 rounded bg-[#FF2477] hover:bg-[#ff3f8b] text-white text-xs uppercase tracking-[0.25em] font-[200] shadow-[0_0_20px_rgba(255,36,119,0.35)] transition-all hover:shadow-[0_0_25px_rgba(255,36,119,0.5)]">
                      Primary Action (Neon Pink)
                    </button>

                    {/* Secondary Button */}
                    <button className="w-full py-2.5 px-4 rounded border border-[rgba(194,189,206,0.3)] hover:border-[#FF2477] text-[#C2BDCE] hover:text-[#F8F6FA] text-xs uppercase tracking-[0.25em] font-[200] transition-all bg-transparent hover:bg-[#FF2477]/10">
                      Secondary Outline
                    </button>

                    {/* Subtle Ghost Button */}
                    <button className="w-full py-2.5 px-4 rounded text-[#C2BDCE] hover:text-[#FF2477] text-xs uppercase tracking-[0.25em] font-[200] transition-colors bg-[#33253e]/60 hover:bg-[#33253e]">
                      Ghost Surface
                    </button>
                  </div>
                </div>

                {/* Editorial Tags & Badges */}
                <div className="p-5 rounded-lg border border-[rgba(194,189,206,0.15)] bg-[#433352]/40 space-y-4">
                  <h4 className="text-xs uppercase tracking-[0.25em] text-[#F8F6FA] font-[200]">
                    Editorial Pills & Markers
                  </h4>

                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-[200] tracking-[0.2em] uppercase bg-[#FF2477]/15 text-[#FF2477] border border-[#FF2477]/30">
                      Curated Monograph
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-[200] tracking-[0.2em] uppercase bg-[#33253e] text-[#C2BDCE] border border-[rgba(194,189,206,0.2)]">
                      Limited Folio
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-[200] tracking-[0.2em] uppercase bg-[#271C31] text-[#C2BDCE]/80 border border-[rgba(194,189,206,0.1)]">
                      Archival Vault
                    </span>
                  </div>

                  <div className="pt-4 border-t border-[rgba(194,189,206,0.1)]">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C2BDCE]/60 block mb-1">
                      Pull-Quote Sample
                    </span>
                    <blockquote className="border-l-2 border-[#FF2477] pl-3 py-1 text-xs font-[200] italic text-[#F8F6FA] leading-relaxed">
                      “Where architectural form meets contemporary culture.”
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[rgba(194,189,206,0.12)] bg-[#33253e] flex items-center justify-between text-xs font-[200] tracking-widest text-[#C2BDCE]/70">
          <span>SaintsBook Identity Guidelines // 2026</span>
          <button
            onClick={onClose}
            className="text-[#FF2477] hover:underline uppercase tracking-[0.2em]"
          >
            Close Specimen
          </button>
        </div>
      </div>
    </div>
  );
}
