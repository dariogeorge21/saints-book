import React, { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SAINTS } from "@/lib/content";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SaintChronicleReader } from "@/components/saint-chronicle-reader";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return SAINTS.map((saint) => ({
    id: saint.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const saint = SAINTS.find((s) => s.id === id);

  if (!saint) {
    return {
      title: "Saint Not Found",
      description: "The requested saint chronicle could not be found in the SaintsBook archive.",
    };
  }

  const excerpt = saint.story[0]?.slice(0, 160) || saint.epithet;

  return {
    title: `${saint.name} — Sacred Life, Milestones & Story`,
    description: `${saint.name} (${saint.epithet}): ${excerpt}... Feast Day: ${saint.feastDate}. Explore their complete chronicle on SaintsBook.`,
    keywords: [
      saint.name,
      saint.epithet,
      saint.location,
      saint.feastDate,
      ...saint.patronage,
      "Christian Saint",
      "Catholic Saint",
      "SaintsBook",
      "Hagiography",
    ],
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

function SaintChronicleSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      <div className="flex items-center justify-between border-b border-[rgba(194,189,206,0.12)] pb-6">
        <div className="h-4 w-28 rounded bg-[rgba(194,189,206,0.1)]" />
        <div className="h-8 w-44 rounded-xl bg-[rgba(194,189,206,0.08)]" />
      </div>

      <div className="space-y-4">
        <div className="h-5 w-40 rounded-full bg-[rgba(255,36,119,0.15)]" />
        <div className="h-12 w-3/4 max-w-lg rounded-lg bg-[rgba(194,189,206,0.12)]" />
        <div className="h-5 w-1/2 rounded bg-[rgba(194,189,206,0.08)]" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-20 rounded-xl bg-[rgba(194,189,206,0.06)] border border-[rgba(194,189,206,0.08)]"
          />
        ))}
      </div>

      <div className="space-y-4 pt-4">
        <div className="h-4 w-full rounded bg-[rgba(194,189,206,0.08)]" />
        <div className="h-4 w-11/12 rounded bg-[rgba(194,189,206,0.08)]" />
        <div className="h-4 w-4/5 rounded bg-[rgba(194,189,206,0.08)]" />
        <div className="h-4 w-full rounded bg-[rgba(194,189,206,0.08)]" />
      </div>
    </div>
  );
}

async function SaintChronicleContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const saintIndex = SAINTS.findIndex((s) => s.id === id);

  if (saintIndex === -1) {
    notFound();
  }

  const saint = SAINTS[saintIndex];
  const prevSaint = saintIndex > 0 ? SAINTS[saintIndex - 1] : null;
  const nextSaint =
    saintIndex < SAINTS.length - 1 ? SAINTS[saintIndex + 1] : null;

  return (
    <SaintChronicleReader
      saint={saint}
      prevSaint={prevSaint}
      nextSaint={nextSaint}
    />
  );
}

export default function SaintStoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#3B2D47] text-[#C2BDCE] selection:bg-[#FF2477] selection:text-white">
      <Navbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<SaintChronicleSkeleton />}>
            <SaintChronicleContent params={params} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
