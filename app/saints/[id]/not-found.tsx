import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowLeft, BookOpen, Compass } from "lucide-react";

/**
 * Dedicated Not Found Boundary for /saints/[id]
 * Displayed when an unindexed or invalid saint identifier is requested.
 */
export default function SaintNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#3B2D47] text-[#C2BDCE] selection:bg-[#FF2477] selection:text-white">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 sm:py-20 px-3 sm:px-6">
        <div className="max-w-md w-full text-center space-y-6 p-5 sm:p-10 rounded-2xl bg-[#352741]/60 border border-[rgba(194,189,206,0.15)] shadow-2xl">
          <div className="w-14 sm:w-16 h-14 sm:h-16 mx-auto rounded-full bg-[#FF2477]/10 border border-[#FF2477]/30 flex items-center justify-center text-[#FF2477]">
            <BookOpen className="w-6 sm:w-7 h-6 sm:h-7 stroke-[1.5]" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#FF2477] px-2.5 sm:px-3 py-1 rounded-full bg-[#FF2477]/10 border border-[#FF2477]/20">
              404 // Chronicle Not Found
            </span>
            <h1 className="text-xl sm:text-3xl font-[100] uppercase tracking-wider text-[#F8F6FA] pt-2">
              Saint Chronicle Missing
            </h1>
            <p className="text-xs sm:text-sm font-[200] text-[#C2BDCE]/70 leading-relaxed">
              The saint chronicle you are looking for has not been added to the SaintsBook archive yet, or the link may have expired.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/saints"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF2477] text-white text-xs font-[200] uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(255,36,119,0.35)] hover:shadow-[0_0_25px_rgba(255,36,119,0.5)] transition-all cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Browse All Saints</span>
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#32243d] border border-[rgba(194,189,206,0.18)] hover:border-[#FF2477] text-xs font-[200] uppercase tracking-[0.2em] text-[#F8F6FA] hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
