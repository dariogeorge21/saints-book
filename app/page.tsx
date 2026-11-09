"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { SaintsGallery } from "@/components/saints-gallery";
import { FeastCalendar } from "@/components/feast-calendar";
import { Manifesto } from "@/components/manifesto";
import { Inscription } from "@/components/inscription";
import { Footer } from "@/components/footer";
import { SaintStoryModal } from "@/components/saint-story-modal";
import { BrandIdentityModal } from "@/components/brand-identity-modal";
import { SAINTS_DATA, Saint } from "@/lib/data";

export default function Home() {
  const [selectedSaint, setSelectedSaint] = useState<Saint | null>(null);
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [identityModalOpen, setIdentityModalOpen] = useState(false);

  const handleOpenSaintStory = (saint: Saint) => {
    setSelectedSaint(saint);
    setStoryModalOpen(true);
  };

  const currentIndex = selectedSaint
    ? SAINTS_DATA.findIndex((s) => s.id === selectedSaint.id)
    : -1;

  const handleNextSaint = () => {
    if (currentIndex >= 0 && currentIndex < SAINTS_DATA.length - 1) {
      setSelectedSaint(SAINTS_DATA[currentIndex + 1]);
    }
  };

  const handlePrevSaint = () => {
    if (currentIndex > 0) {
      setSelectedSaint(SAINTS_DATA[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#3B2D47] text-[#C2BDCE] selection:bg-[#FF2477] selection:text-white">
      {/* Editorial Navigation */}
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* Hero Section with Featured Saint */}
        <Hero onOpenSaintStory={handleOpenSaintStory} />

        {/* The Saints Chronicles Directory */}
        <SaintsGallery onOpenSaintStory={handleOpenSaintStory} />

        {/* Liturgical Feast Day Calendar & Chronology */}
        <FeastCalendar onSelectSaint={handleOpenSaintStory} />

        {/* The SaintsBook Aesthetic Manifesto */}
        <Manifesto />

        {/* Patron Inscription & Dispatches */}
        <Inscription />
      </main>

      {/* Colophon & Footer */}
      <Footer onOpenIdentityGuide={() => setIdentityModalOpen(true)} />

      {/* Multi-Paragraph Sacred Chronicle Modal */}
      <SaintStoryModal
        saint={selectedSaint}
        isOpen={storyModalOpen}
        onClose={() => setStoryModalOpen(false)}
        onNavigateNext={handleNextSaint}
        onNavigatePrev={handlePrevSaint}
        hasNext={currentIndex < SAINTS_DATA.length - 1}
        hasPrev={currentIndex > 0}
      />

      {/* Visual Identity & Design System Inspector */}
      <BrandIdentityModal
        isOpen={identityModalOpen}
        onClose={() => setIdentityModalOpen(false)}
      />
    </div>
  );
}
