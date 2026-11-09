import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SAINTS_DATA } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowLeft, ArrowRight, Calendar, Sparkles, Award, Heart } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return SAINTS_DATA.map((saint) => ({
    id: saint.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const saint = SAINTS_DATA.find((s) => s.id === id);

  if (!saint) {
    return { title: "Saint Not Found — SaintsBook" };
  }

  return {
    title: `${saint.name} — SaintsBook Chronicle`,
    description: `The sacred life, milestones, and story of ${saint.name}. Feast Day: ${saint.feastDate}.`,
  };
}

export default async function SaintStoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const saintIndex = SAINTS_DATA.findIndex((s) => s.id === id);

  if (saintIndex === -1) {
    notFound();
  }

  const saint = SAINTS_DATA[saintIndex];
  const prevSaint = saintIndex > 0 ? SAINTS_DATA[saintIndex - 1] : null;
  const nextSaint = saintIndex < SAINTS_DATA.length - 1 ? SAINTS_DATA[saintIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#3B2D47] text-[#C2BDCE] selection:bg-[#FF2477] selection:text-white">
      <Navbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Back Navigation & Breadcrumb */}
          <div className="flex items-center justify-between border-b border-[rgba(194,189,206,0.12)] pb-6">
            <Link
              href="/saints"
              className="inline-flex items-center gap-2 text-xs uppercase font-[200] tracking-[0.25em] text-[#C2BDCE] hover:text-[#FF2477] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5] group-hover:-translate-x-1 transition-transform" />
              <span>All Saints Chronicles</span>
            </Link>

            <span className="text-[10px] font-mono tracking-widest text-[#FF2477] uppercase px-3 py-1 rounded-full bg-[#FF2477]/10 border border-[#FF2477]/30">
              Feast: {saint.feastDate}
            </span>
          </div>

          {/* Saint Masthead Title */}
          <header className="space-y-5 text-center max-w-3xl mx-auto">
            <span className="inline-block text-xs uppercase font-[200] tracking-[0.35em] text-[#FF2477]">
              {saint.era} • {saint.location}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-[100] uppercase tracking-[0.16em] text-[#F8F6FA] leading-tight">
              {saint.name}
            </h1>

            {saint.latinName && (
              <p className="text-sm font-[200] italic text-[#C2BDCE]/70 tracking-widest">
                {saint.latinName}
              </p>
            )}

            <p className="text-xs sm:text-sm font-[200] text-[#FF2477] tracking-[0.2em] uppercase pt-1">
              {saint.epithet}
            </p>

            <div className="h-[1px] w-16 mx-auto bg-gradient-to-r from-transparent via-[#FF2477] to-transparent mt-4" />
          </header>

          {/* Four-Date Minimal Milestone Matrix */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#352741]/60 border border-[rgba(194,189,206,0.14)] backdrop-blur-sm">
            {/* 1. Date of Birth */}
            <div className="space-y-1.5 p-3 rounded-lg bg-[#30233b]/70 border border-[rgba(194,189,206,0.08)]">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-[200] tracking-[0.25em] text-[#C2BDCE]/70">
                <Calendar className="w-3 h-3 text-[#FF2477] stroke-[1.5]" />
                <span>Date of Birth</span>
              </div>
              <p className="text-xs sm:text-sm font-[200] text-[#F8F6FA] tracking-wide">
                {saint.dateOfBirth}
              </p>
            </div>

            {/* 2. Beatified Date */}
            <div className="space-y-1.5 p-3 rounded-lg bg-[#30233b]/70 border border-[rgba(194,189,206,0.08)]">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-[200] tracking-[0.25em] text-[#C2BDCE]/70">
                <Sparkles className="w-3 h-3 text-[#FF2477] stroke-[1.5]" />
                <span>Beatified Date</span>
              </div>
              <p className="text-xs font-[200] text-[#F8F6FA] tracking-wide leading-snug">
                {saint.beatifiedDate}
              </p>
            </div>

            {/* 3. Canonised Date */}
            <div className="space-y-1.5 p-3 rounded-lg bg-[#30233b]/70 border border-[rgba(194,189,206,0.08)]">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-[200] tracking-[0.25em] text-[#C2BDCE]/70">
                <Award className="w-3 h-3 text-[#FF2477] stroke-[1.5]" />
                <span>Canonised Date</span>
              </div>
              <p className="text-xs font-[200] text-[#F8F6FA] tracking-wide leading-snug">
                {saint.canonisedDate}
              </p>
            </div>

            {/* 4. Feast Date */}
            <div className="space-y-1.5 p-3 rounded-lg bg-[#463354] border border-[#FF2477]/40 shadow-[0_0_15px_rgba(255,36,119,0.15)]">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-[200] tracking-[0.25em] text-[#FF2477]">
                <Heart className="w-3 h-3 text-[#FF2477] stroke-[1.5]" />
                <span>Feast Day</span>
              </div>
              <p className="text-xs sm:text-sm font-[300] text-white tracking-widest">
                {saint.feastDate}
              </p>
            </div>
          </section>

          {/* Inspirational Reflection Quote */}
          {saint.quote && (
            <div className="p-8 sm:p-10 rounded-2xl bg-[#352741]/50 border-l-2 border-[#FF2477] border-y border-r border-[rgba(194,189,206,0.12)] max-w-3xl mx-auto">
              <blockquote className="text-base sm:text-xl font-[200] italic text-[#F8F6FA] tracking-wide leading-relaxed">
                “{saint.quote}”
              </blockquote>
              <div className="mt-3 text-right text-xs font-[200] uppercase tracking-[0.25em] text-[#FF2477]">
                — {saint.name}
              </div>
            </div>
          )}

          {/* Dedicated Multi-Paragraph Sacred Story */}
          <article className="max-w-3xl mx-auto space-y-8 pt-6">
            <div className="flex items-center gap-4 pb-2 border-b border-[rgba(194,189,206,0.12)]">
              <span className="text-xs uppercase font-[200] tracking-[0.3em] text-[#FF2477]">
                Sacred Chronicle
              </span>
              <div className="flex-1" />
              <span className="text-[10px] font-mono tracking-widest text-[#C2BDCE]/60 uppercase">
                SaintsBook Archive
              </span>
            </div>

            {/* The paragraphs with clean editorial gaps */}
            <div className="space-y-8 text-base sm:text-lg font-[300] leading-relaxed sm:leading-loose text-[#C2BDCE] tracking-wide">
              {saint.story.map((paragraph, idx) => (
                <p key={idx} className="transition-colors hover:text-[#F8F6FA]">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Patronage & Iconography Footer Colophon */}
          <div className="max-w-3xl mx-auto p-6 rounded-xl bg-[#32243d] border border-[rgba(194,189,206,0.12)] space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase font-[200] tracking-[0.25em] text-[#FF2477]">
                Patronages:
              </span>
              {saint.patronage.map((p) => (
                <span
                  key={p}
                  className="px-2.5 py-1 rounded-full text-[10px] font-[200] uppercase tracking-[0.16em] bg-[#3B2D47] text-[#C2BDCE] border border-[rgba(194,189,206,0.15)]"
                >
                  {p}
                </span>
              ))}
            </div>

            {saint.attributes && (
              <p className="text-xs font-[200] text-[#C2BDCE]/80 tracking-wide">
                <span className="text-[#FF2477] uppercase tracking-wider text-[10px]">Iconography &amp; Symbols: </span>
                {saint.attributes}
              </p>
            )}
          </div>

          {/* Sequential Saint Navigation */}
          <nav className="flex items-center justify-between border-t border-[rgba(194,189,206,0.14)] pt-8 max-w-3xl mx-auto">
            {prevSaint ? (
              <Link
                href={`/saints/${prevSaint.id}`}
                className="flex items-center gap-2 text-xs font-[200] uppercase tracking-[0.22em] text-[#C2BDCE] hover:text-[#FF2477] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 stroke-[1.5] group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <span className="block text-[9px] text-[#C2BDCE]/50 tracking-widest">Previous Saint</span>
                  <span>{prevSaint.name}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/saints"
              className="px-4 py-2 rounded-lg border border-[rgba(194,189,206,0.18)] hover:border-[#FF2477] text-xs font-[200] uppercase tracking-[0.25em] text-[#F8F6FA] hover:text-white transition-all bg-[#352741]/50"
            >
              All Saints
            </Link>

            {nextSaint ? (
              <Link
                href={`/saints/${nextSaint.id}`}
                className="flex items-center gap-2 text-xs font-[200] uppercase tracking-[0.22em] text-[#C2BDCE] hover:text-[#FF2477] transition-colors group text-right"
              >
                <div>
                  <span className="block text-[9px] text-[#C2BDCE]/50 tracking-widest">Next Saint</span>
                  <span>{nextSaint.name}</span>
                </div>
                <ArrowRight className="w-4 h-4 stroke-[1.5] group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </div>
      </main>

      <Footer />
    </div>
  );
}
