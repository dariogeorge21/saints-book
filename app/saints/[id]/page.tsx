import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SAINTS_DATA } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SaintChronicleReader } from "@/components/saint-chronicle-reader";
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
  const nextSaint =
    saintIndex < SAINTS_DATA.length - 1 ? SAINTS_DATA[saintIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#3B2D47] text-[#C2BDCE] selection:bg-[#FF2477] selection:text-white">
      <Navbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SaintChronicleReader
            saint={saint}
            prevSaint={prevSaint}
            nextSaint={nextSaint}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
