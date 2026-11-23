import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { SAINTS, getAllSaintIds } from "@/lib/content";
import { getCompleteSaint } from "@/lib/content-server";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SaintReader } from "./saint-reader";
import type { SaintPageParams } from "./types";

/**
 * Pre-computes static paths for all registered saints at build time.
 * Enables instant static page delivery across edge CDNs.
 */
export async function generateStaticParams() {
  const ids = getAllSaintIds();
  return ids.map((id) => ({ id }));
}

/**
 * Dynamically constructs rich SEO metadata, OpenGraph tags, and Twitter Cards
 * for the requested saint chronicle.
 */
export async function generateMetadata({
  params,
}: SaintPageParams): Promise<Metadata> {
  const { id } = await params;
  const saint = SAINTS.find((s) => s.id === id);

  if (!saint) {
    return {
      title: "Saint Not Found — SaintsBook",
      description:
        "The requested saint chronicle could not be found in the SaintsBook archive.",
    };
  }

  // Extract a brief excerpt for search engine indexing
  const excerpt = saint.story?.[0]?.slice(0, 160) || saint.epithet;

  return {
    title: `${saint.name} — Sacred Life, Milestones & Story`,
    description: `${saint.name} (${saint.epithet}): ${excerpt}... Feast Day: ${saint.feastDate}. Explore their complete chronicle on SaintsBook.`,
    keywords: [
      saint.name,
      saint.latinName || "",
      saint.epithet,
      saint.location,
      saint.feastDate,
      ...saint.patronage,
      "Christian Saint",
      "Catholic Saint",
      "SaintsBook",
      "Hagiography",
      "Christian Chronicle",
    ].filter(Boolean),
    openGraph: {
      title: `${saint.name} — SaintsBook Chronicle`,
      description: `${saint.epithet} • Feast Day: ${saint.feastDate}. ${excerpt}...`,
      type: "article",
      images: [
        {
          url: "/saintsbook.png",
          width: 800,
          height: 800,
          alt: `${saint.name} — SaintsBook Chronicle`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${saint.name} — SaintsBook Chronicle`,
      description: `${saint.epithet} • Feast Day: ${saint.feastDate}`,
      images: ["/saintsbook.png"],
    },
  };
}

/**
 * Loading skeleton displayed during streaming suspense.
 */
function SaintChronicleSkeleton() {
  return (
    <div
      className="space-y-12 animate-pulse"
      aria-busy="true"
      aria-label="Loading saint chronicle"
    >
      {/* Top action bar skeleton */}
      <div className="flex items-center justify-between border-b border-[rgba(194,189,206,0.12)] pb-6">
        <div className="h-4 w-28 rounded bg-[rgba(194,189,206,0.1)]" />
        <div className="h-8 w-44 rounded-xl bg-[rgba(194,189,206,0.08)]" />
      </div>

      {/* Header masthead skeleton */}
      <div className="space-y-4 text-center max-w-lg mx-auto">
        <div className="h-4 w-36 mx-auto rounded-full bg-[rgba(255,36,119,0.15)]" />
        <div className="h-12 w-3/4 mx-auto rounded-lg bg-[rgba(194,189,206,0.12)]" />
        <div className="h-4 w-1/2 mx-auto rounded bg-[rgba(194,189,206,0.08)]" />
      </div>

      {/* Milestone matrix skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-20 rounded-xl bg-[rgba(194,189,206,0.06)] border border-[rgba(194,189,206,0.08)]"
          />
        ))}
      </div>

      {/* Narrative paragraphs skeleton */}
      <div className="space-y-4 pt-6 max-w-3xl mx-auto">
        <div className="h-4 w-full rounded bg-[rgba(194,189,206,0.08)]" />
        <div className="h-4 w-11/12 rounded bg-[rgba(194,189,206,0.08)]" />
        <div className="h-4 w-4/5 rounded bg-[rgba(194,189,206,0.08)]" />
        <div className="h-4 w-full rounded bg-[rgba(194,189,206,0.08)]" />
        <div className="h-4 w-3/4 rounded bg-[rgba(194,189,206,0.08)]" />
      </div>
    </div>
  );
}

/**
 * Server-side Content Resolver:
 * Loads the raw multilingual markdown stories from content/ on the filesystem
 * and wires up sequential previous/next saint navigation.
 */
async function SaintChronicleContent({ params }: SaintPageParams) {
  const { id } = await params;
  const saintIndex = SAINTS.findIndex((s) => s.id === id);

  if (saintIndex === -1) {
    notFound();
  }

  const saint = SAINTS[saintIndex];

  // Concurrently fetch full raw markdown stories from the filesystem
  const completeSaint = await getCompleteSaint(id);

  // Compute neighboring saints for sequential reading
  const prevSaint = saintIndex > 0 ? SAINTS[saintIndex - 1] : null;
  const nextSaint =
    saintIndex < SAINTS.length - 1 ? SAINTS[saintIndex + 1] : null;

  return (
    <SaintReader
      saint={saint}
      stories={completeSaint?.stories || {}}
      prevSaint={prevSaint}
      nextSaint={nextSaint}
    />
  );
}

/**
 * Saint Story Page
 *
 * Route: /saints/[id]
 *
 * Dedicated archival page showcasing the divine life, canonisation milestones,
 * and editorial narrative stories of Christian saints.
 */
export default function SaintStoryPage({ params }: SaintPageParams) {
  return (
    <div className="min-h-screen flex flex-col bg-[#3B2D47] text-[#C2BDCE] selection:bg-[#FF2477] selection:text-white">
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main Archival Canvas */}
      <main className="flex-1 py-8 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <Suspense fallback={<SaintChronicleSkeleton />}>
            <SaintChronicleContent params={params} />
          </Suspense>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
