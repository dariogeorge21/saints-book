import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Language & Reading Settings",
  description:
    "Customize your SaintsBook experience. Choose your preferred language (English, Malayalam, or Hindi), manage storage persistence, and preview authentic typographic scripts.",
  openGraph: {
    title: "Language & Reading Settings | SaintsBook",
    description:
      "Customize your SaintsBook experience. Choose your preferred language (English, Malayalam, or Hindi), manage storage persistence, and preview authentic typographic scripts.",
  },
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
