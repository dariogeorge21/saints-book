"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { SaintsGallery } from "@/components/saints-gallery";
import { FeastCalendar } from "@/components/feast-calendar";
import { Manifesto } from "@/components/manifesto";
import { Inscription } from "@/components/inscription";
import { Footer } from "@/components/footer";
import { BrandIdentityModal } from "@/components/brand-identity-modal";

export default function Home() {
  const [identityModalOpen, setIdentityModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#3B2D47] text-[#C2BDCE] selection:bg-[#FF2477] selection:text-white">
      {/* Minimal Editorial Navigation */}
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* Clean Hero with immediate navigation on page load */}
        <Hero />

        {/* Curated 3-Saint Section with Read More redirect to dedicated /saints */}
        <SaintsGallery />

        {/* Liturgical Feast Day Calendar with direct page links */}
        <FeastCalendar />

        {/* Editorial Aesthetic Manifesto */}
        <Manifesto />

        {/* Patron Inscription & Dispatches */}
        <Inscription />
      </main>

      {/* Colophon & Footer */}
      <Footer onOpenIdentityGuide={() => setIdentityModalOpen(true)} />

      {/* Brand Identity & Design System Inspector */}
      <BrandIdentityModal
        isOpen={identityModalOpen}
        onClose={() => setIdentityModalOpen(false)}
      />
    </div>
  );
}
