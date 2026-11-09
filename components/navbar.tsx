"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SaintsBookLogo } from "./saintsbook-logo";
import { BrandIdentityModal } from "./brand-identity-modal";
import { Sparkles, Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [identityModalOpen, setIdentityModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Curations", href: "#curations" },
    { label: "Monographs", href: "#monographs" },
    { label: "Manifesto", href: "#manifesto" },
    { label: "Archive Index", href: "#archive" },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-[#3B2D47]/90 backdrop-blur-md border-b border-[rgba(194,189,206,0.14)] py-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            : "bg-transparent border-b border-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brandmark */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="SaintsBook Home"
          >
            <SaintsBookLogo size="md" glow />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase font-[200] tracking-[0.25em] text-[#C2BDCE] hover:text-[#FF2477] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#FF2477] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}

            {/* Design Spec Trigger */}
            <button
              onClick={() => setIdentityModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs uppercase font-[200] tracking-[0.22em] text-[#FF2477] px-3 py-1.5 rounded-full border border-[#FF2477]/40 bg-[#FF2477]/10 hover:bg-[#FF2477]/20 hover:border-[#FF2477] transition-all"
            >
              <Sparkles className="w-3 h-3 stroke-[1.5]" />
              <span>Identity Guide</span>
            </button>
          </nav>

          {/* Right Action Trigger */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="#inscription"
              className="relative group overflow-hidden px-4 py-2 rounded border border-[rgba(194,189,206,0.25)] bg-[#433352]/50 hover:border-[#FF2477] text-xs font-[200] uppercase tracking-[0.25em] text-[#F8F6FA] transition-all duration-300 flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,36,119,0.15)] hover:shadow-[0_0_20px_rgba(255,36,119,0.3)]"
            >
              <span className="relative z-10">Inscribe</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5] text-[#FF2477] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF2477]/10 to-[#FF2477]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIdentityModalOpen(true)}
              className="p-2 text-[#FF2477] hover:text-[#ff4b91]"
              aria-label="View Identity"
            >
              <Sparkles className="w-4 h-4 stroke-[1.5]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#C2BDCE] hover:text-[#F8F6FA]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#352741] border-b border-[rgba(194,189,206,0.15)] px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm uppercase font-[200] tracking-[0.25em] text-[#C2BDCE] hover:text-[#FF2477] py-1.5"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-[rgba(194,189,206,0.12)] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIdentityModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded border border-[#FF2477]/40 text-xs uppercase font-[200] tracking-[0.25em] text-[#FF2477] bg-[#FF2477]/10"
              >
                <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
                Identity Guide
              </button>
              <a
                href="#inscription"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-2.5 rounded bg-[#FF2477] text-white text-xs uppercase font-[200] tracking-[0.25em]"
              >
                Inscribe as Patron
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Brand Identity Modal */}
      <BrandIdentityModal
        isOpen={identityModalOpen}
        onClose={() => setIdentityModalOpen(false)}
      />
    </>
  );
}
