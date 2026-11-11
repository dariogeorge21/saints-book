import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore the Saints Archive",
  description:
    "Browse stories and biographies of Christian saints throughout Church history. Filter by era, search by patronage or location, and discover inspirational lives.",
  openGraph: {
    title: "Explore the Saints Archive | SaintsBook",
    description:
      "Browse stories and biographies of Christian saints throughout Church history. Filter by era, search by patronage or location, and discover inspirational lives.",
  },
};

export default function SaintsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
