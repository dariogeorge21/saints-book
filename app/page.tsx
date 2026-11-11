"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { SaintsGallery } from "@/components/saints-gallery";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export default function Home() {
  const { language } = useLanguage();

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col bg-[#3B2D47] text-[#C2BDCE] selection:bg-[#FF2477] selection:text-white",
        language === "ml" && "font-malayalam",
        language === "hi" && "font-hindi"
      )}
    >
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
