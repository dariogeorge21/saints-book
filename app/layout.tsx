import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/app-providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://saints-book.vercel.app";

export const viewport: Viewport = {
  themeColor: "#3B2D47",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SaintsBook — Lives of Christian Saints, Chronicles & Feast Days",
    template: "%s | SaintsBook",
  },
  description:
    "Discover the inspiring lives, canonisation milestones, quotes, and feast day calendar of Christian saints across 2,000+ years of Church history. Read complete chronicles in English, Malayalam, and Hindi.",
  keywords: [
    "SaintsBook",
    "Christian Saints",
    "Catholic Saints",
    "Saints Chronicles",
    "Feast Days Calendar",
    "Canonised Lives",
    "Hagiography",
    "Patron Saints",
    "St. Francis of Assisi",
    "St. Alphonsa",
    "St. Carlo Acutis",
    "St. Euphrasia",
    "St. Kuriakose Elias Chavara",
    "Malayalam Saints",
    "Hindi Saints",
    "വിശുദ്ധർ",
    "ക്രൈസ്തവ വിശുദ്ധർ",
    "ईसाई संत",
    "संतों की जीवनियाँ",
  ],
  authors: [
    {
      name: "Dario George",
      url: "https://dariogeorge.in",
    },
  ],
  creator: "Dario George",
  publisher: "SaintsBook Archive",
  applicationName: "SaintsBook",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/?lang=en",
      ml: "/?lang=ml",
      hi: "/?lang=hi",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ml_IN", "hi_IN"],
    url: siteUrl,
    siteName: "SaintsBook",
    title: "SaintsBook — Lives of Christian Saints, Chronicles & Feast Days",
    description:
      "Discover the inspiring lives, canonisation milestones, quotes, and feast day calendar of Christian saints across 2,000+ years of Church history. Available in English, Malayalam, and Hindi.",
    images: [
      {
        url: "/saintsbook.png",
        width: 800,
        height: 800,
        alt: "SaintsBook — Archival Monograph Mark",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaintsBook — Lives of Christian Saints, Chronicles & Feast Days",
    description:
      "Explore the inspiring lives, canonisation milestones, and feast day calendar of Christian saints across 2,000+ years of Church history.",
    creator: "@dariogeorge21",
    images: ["/saintsbook.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/saintsbook.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  category: "Religion & Spirituality",
  classification: "Christian Hagiography & Historical Archive",
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
      <head>
        <meta name="apple-mobile-web-app-title" content="Saints Book" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@100..900&family=Noto+Sans+Malayalam:wght@100..900&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#3B2D47] text-[#C2BDCE] selection:bg-[#FF2477] selection:text-white">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
