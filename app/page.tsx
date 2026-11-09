"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { MonographsGallery } from "@/components/monographs-gallery";
import { Manifesto } from "@/components/manifesto";
import { ArchiveIndex } from "@/components/archive-index";
import { Inscription } from "@/components/inscription";
import { Footer } from "@/components/footer";
import { MonographReaderModal } from "@/components/monograph-reader-modal";
import { BrandIdentityModal } from "@/components/brand-identity-modal";
import { Monograph } from "@/types/monograph";

export default function Home() {
  const [selectedMonograph, setSelectedMonograph] = useState<Monograph | null>(null);
  const [readerOpen, setReaderOpen] = useState(false);
  const [identityModalOpen, setIdentityModalOpen] = useState(false);

  const handleOpenReader = (monograph: Monograph) => {
    setSelectedMonograph(monograph);
    setReaderOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#3B2D47] text-[#C2BDCE] selection:bg-[#FF2477] selection:text-white">
      {/* Editorial Navigation */}
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* Hero Showcase */}
        <Hero onOpenReader={handleOpenReader} />

        {/* Curated Monographs & Canon Section */}
        <section id="curations">
          <MonographsGallery onOpenReader={handleOpenReader} />
        </section>

        {/* The SaintsBook Manifesto & Aesthetic Principles */}
        <Manifesto />

        {/* Archival Index Ledger */}
        <ArchiveIndex />

        {/* Patron Inscription */}
        <Inscription />
      </main>

      {/* Colophon & Footer */}
      <Footer onOpenIdentityGuide={() => setIdentityModalOpen(true)} />

      {/* Interactive Reader Room Modal */}
      <MonographReaderModal
        monograph={selectedMonograph}
        isOpen={readerOpen}
        onClose={() => setReaderOpen(false)}
      />

      {/* Visual Identity & Design System Inspector */}
      <BrandIdentityModal
        isOpen={identityModalOpen}
        onClose={() => setIdentityModalOpen(false)}
      />
    </div>
  );
}
