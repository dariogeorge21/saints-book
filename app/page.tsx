"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { SaintsGallery } from "@/components/saints-gallery";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#3B2D47] text-[#C2BDCE] selection:bg-[#FF2477] selection:text-white">
      {/* Clean Navigation */}
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* Minimal Hero with smooth scroll to reading section */}
        <Hero />

        {/* 3 Featured Saints with Read More redirect to /saints */}
        <SaintsGallery />
      </main>

      {/* Minimal Footer with Dario George & Contribute Link */}
      <Footer />
    </div>
  );
}
