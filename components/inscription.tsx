"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Mail, Sparkles } from "lucide-react";

export function Inscription() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Collector & Patron");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
  };

  return (
    <section id="inscription" className="py-24 relative bg-[#352741]/40 border-t border-[rgba(194,189,206,0.12)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="rounded-2xl border border-[rgba(194,189,206,0.18)] bg-[#3B2D47] p-8 sm:p-14 relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
          {/* Subtle neon pink aura in corner */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF2477]/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative space-y-8 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FF2477]/30 bg-[#FF2477]/10 text-xs font-[200] tracking-[0.3em] uppercase text-[#FF2477]">
              <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Patron Access &amp; Edition Dispatch</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-[100] uppercase tracking-[0.18em] text-[#F8F6FA] leading-tight">
                Inscribe into the Canon
              </h2>
              <div className="h-[1px] w-16 mx-auto bg-[#FF2477]" />
              <p className="text-sm font-[200] text-[#C2BDCE] leading-relaxed tracking-wide">
                Join our international register of architects, typographers, and bibliophiles. Patrons receive hand-numbered physical monographs and private archival dispatches.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-xl bg-[#30233b] border border-[#FF2477]/40 space-y-3 animate-in zoom-in-95 duration-300">
                <CheckCircle2 className="w-8 h-8 text-[#FF2477] mx-auto stroke-[1.5]" />
                <h3 className="text-lg font-[200] uppercase tracking-[0.2em] text-[#F8F6FA]">
                  Inscription Confirmed
                </h3>
                <p className="text-xs font-[200] text-[#C2BDCE] tracking-wider leading-relaxed">
                  Your entry has been accessioned. Welcome to the SaintsBook Patron Register. Dispatch notifications for Volume IV will arrive at <span className="text-[#FF2477] font-mono">{email}</span>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                  }}
                  className="mt-3 text-xs uppercase tracking-[0.25em] text-[#C2BDCE] hover:text-[#FF2477] underline"
                >
                  Inscribe Another Member
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                {/* Role Selector Pills */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-[200] tracking-[0.25em] text-[#C2BDCE]/70 block text-center sm:text-left">
                    Patron Affiliation
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {["Collector & Patron", "Architect / Designer", "Institutional Fellow"].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`py-2 px-3 rounded text-[11px] font-[200] uppercase tracking-[0.16em] border transition-all text-center ${
                          role === r
                            ? "bg-[#FF2477] border-[#FF2477] text-white"
                            : "bg-[#33253e] border-[rgba(194,189,206,0.15)] text-[#C2BDCE] hover:text-white"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Email input + Button */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 stroke-[1.5] absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C2BDCE]/60" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="curator@institution.org"
                      className="w-full pl-10 pr-4 py-3 rounded bg-[#31233b] border border-[rgba(194,189,206,0.2)] focus:border-[#FF2477] focus:outline-none text-xs font-[200] tracking-wide text-[#F8F6FA] placeholder-[#C2BDCE]/40 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-8 rounded bg-[#FF2477] hover:bg-[#ff3f8b] text-white text-xs uppercase tracking-[0.25em] font-[200] transition-all shadow-[0_0_20px_rgba(255,36,119,0.35)] hover:shadow-[0_0_30px_rgba(255,36,119,0.5)] flex items-center justify-center gap-2 group whitespace-nowrap"
                  >
                    <span>Inscribe</span>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 pt-2 text-[10px] font-[200] tracking-[0.2em] uppercase text-[#C2BDCE]/60 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF2477] stroke-[1.5]" />
                  <span>Strict confidentiality • No commercial advertising • Archival dispatches only</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
