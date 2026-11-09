import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "SaintsBook — Editorial & Digital Monograph Archive",
  description: "A premium, contemporary editorial archive with a distinctive pink-on-plum visual identity.",
  icons: {
    icon: "/saintsbook.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#3B2D47] text-[#C2BDCE] selection:bg-[#FF2477] selection:text-white">
        {children}
      </body>
    </html>
  );
}
