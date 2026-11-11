import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liturgical Feast Calendar",
  description:
    "Explore the complete chronological liturgical feast calendar of Christian saints across all 12 months. Find upcoming feast days, canonisation dates, and patronages.",
  openGraph: {
    title: "Liturgical Feast Calendar | SaintsBook",
    description:
      "Explore the complete chronological liturgical feast calendar of Christian saints across all 12 months. Find upcoming feast days and celebrations.",
  },
};

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
