"use client";

import React from "react";
import Link from "next/link";
import { SaintsBookLogo } from "./saintsbook-logo";
import { ArrowUp, Settings } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { LanguageFooterBar } from "./language-footer-bar";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Near to Footer Option to Switch Language */}
      <LanguageFooterBar />

      <footer className="relative bg-[#2d2138] border-t border-[rgba(194,189,206,0.1)] py-12 text-[#C2BDCE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-[rgba(194,189,206,0.08)]">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center">
              <SaintsBookLogo size="sm" />
            </Link>

            {/* Minimal Quick Links */}
            <div className="flex items-center gap-6 text-xs uppercase font-[200] tracking-[0.2em] flex-wrap justify-center">
              <Link href="/saints" className="hover:text-[#FF2477] transition-colors">
                {t("nav.allSaints")}
              </Link>
              <Link href="/calendar" className="hover:text-[#FF2477] transition-colors">
                {t("nav.calendar")}
              </Link>
              <Link href="/settings" className="hover:text-[#FF2477] transition-colors flex items-center gap-1">
                <Settings className="w-3 h-3" />
                <span>{t("nav.settings")}</span>
              </Link>
              <a
                href="https://github.com/dariogeorge21/saints-book"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF2477] hover:underline flex items-center gap-1.5"
              >
                <FaGithub className="w-3.5 h-3.5" />
                <span>{t("nav.contribute")}</span>
              </a>
            </div>
          </div>

          {/* Creator & Handles */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-[200] tracking-wide text-[#C2BDCE]/70">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span>{t("footer.creator")}</span>
              <span className="text-[#F8F6FA] font-[300]">Dario George</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-5">
              <a
                href="https://github.com/dariogeorge21/saints-book"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF2477] transition-colors flex items-center gap-1.5"
                title="GitHub Repository"
              >
                <FaGithub className="w-3.5 h-3.5" />
                <span className="text-[11px] font-mono">GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/dariogeorge21/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF2477] transition-colors flex items-center gap-1.5"
                title="LinkedIn"
              >
                <FaLinkedin className="w-3.5 h-3.5" />
                <span className="text-[11px] font-mono">LinkedIn</span>
              </a>

              <a
                href="https://instagram.com/dariogeorge21"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF2477] transition-colors flex items-center gap-1.5"
                title="Instagram"
              >
                <FaInstagram className="w-3.5 h-3.5" />
                <span className="text-[11px] font-mono">Instagram</span>
              </a>

              <button
                onClick={scrollToTop}
                className="p-1.5 rounded-lg border border-[rgba(194,189,206,0.12)] hover:border-[#FF2477] text-[#C2BDCE] hover:text-[#FF2477] transition-colors ml-2 cursor-pointer"
                title={t("footer.scroll")}
                aria-label={t("footer.scroll")}
              >
                <ArrowUp className="w-3.5 h-3.5 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
