"use client";

import React, { useRef, useEffect } from "react";
import { Search, X, Command } from "lucide-react";
import { cn } from "@/lib/utils";

interface SaintsSearchBarProps {
  /**
   * The current search query string.
   */
  value: string;
  /**
   * Callback invoked when the user types or clears the query.
   */
  onChange: (query: string) => void;
  /**
   * Placeholder text shown when input is empty.
   */
  placeholder?: string;
  /**
   * Number of saints matching the active filters.
   */
  resultCount?: number;
  /**
   * Total number of registered saints.
   */
  totalCount?: number;
  /**
   * Optional additional CSS classes.
   */
  className?: string;
}

/**
 * Sanitizes search input to prevent unsafe control sequences and excess spaces.
 */
export function sanitizeSearchQuery(input: string): string {
  // Strip control characters while preserving unicode scripts (Latin, Malayalam, Devanagari)
  return input.replace(/[\u0000-\u001F\u007F-\u009F]/g, "").slice(0, 100);
}

/**
 * SaintsSearchBar Component
 *
 * Professional, accessible search input featuring:
 * - Real-time client-side search across all supported languages and metadata
 * - Quick clear button (X) when query is present
 * - Global keyboard shortcuts ('/' or 'Cmd/Ctrl + K') to instantly focus
 * - Accessible ARIA attributes and high-contrast focus rings
 */
export function SaintsSearchBar({
  value,
  onChange,
  placeholder = "Search by name, place, patronage, or feast day...",
  resultCount,
  totalCount,
  className,
}: SaintsSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut listener ('/' or 'Cmd/Ctrl + K')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in another input, textarea, or contentEditable
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if ((e.key === "/" && !isInput) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }

      // Escape key clears and blurs search
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        if (value) {
          onChange("");
        } else {
          inputRef.current?.blur();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [value, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeSearchQuery(e.target.value);
    onChange(sanitized);
  };

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div
      role="search"
      aria-label="Search saints archive"
      className={cn("relative w-full max-w-xl", className)}
    >
      <div className="relative flex items-center">
        {/* Left Magnifying Search Icon */}
        <Search
          className="w-4 h-4 stroke-[1.5] absolute left-3.5 text-[#C2BDCE]/60 pointer-events-none transition-colors group-focus-within:text-[#FF2477]"
          aria-hidden="true"
        />

        {/* Search Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          aria-label={placeholder}
          autoComplete="off"
          spellCheck="false"
          className={cn(
            "w-full pl-10 pr-12 sm:pr-24 py-2.5 rounded-xl bg-[#33253e] text-xs sm:text-sm font-[200] tracking-wide text-[#F8F6FA]",
            "border border-[rgba(194,189,206,0.18)] placeholder-[#C2BDCE]/50",
            "transition-all duration-200 outline-none",
            "focus:border-[#FF2477] focus:ring-2 focus:ring-[#FF2477]/20 focus:bg-[#382845]",
            "hover:border-[rgba(194,189,206,0.3)]"
          )}
        />

        {/* Right Action Cluster: Clear Button and Keyboard Shortcut Badge */}
        <div className="absolute right-2.5 flex items-center gap-1.5">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-lg text-[#C2BDCE]/70 hover:text-white hover:bg-[rgba(194,189,206,0.1)] transition-colors cursor-pointer"
              title="Clear search query (Esc)"
              aria-label="Clear search query"
            >
              <X className="w-3.5 h-3.5 stroke-[2]" />
            </button>
          )}

          {/* Keyboard shortcut hint */}
          <div
            className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono text-[#C2BDCE]/50 bg-[#2b1f33] border border-[rgba(194,189,206,0.1)] pointer-events-none select-none"
            title="Press '/' or 'Ctrl+K' to focus"
            aria-hidden="true"
          >
            <span className="text-[9px]">/</span>
          </div>
        </div>
      </div>

      {/* Live Result Counter indicator when query is active */}
      {value && typeof resultCount === "number" && typeof totalCount === "number" && (
        <div className="mt-2 flex items-center justify-between px-1 text-[11px] font-[200] text-[#C2BDCE]/70">
          <span>
            {resultCount === 0 ? (
              <span className="text-[#FF2477]">No saints found matching &ldquo;{value}&rdquo;</span>
            ) : (
              <span>
                Found <strong className="text-white font-[400]">{resultCount}</strong> of {totalCount} saints
              </span>
            )}
          </span>
          <button
            type="button"
            onClick={handleClear}
            className="text-[10px] uppercase font-mono tracking-wider text-[#FF2477] hover:underline cursor-pointer"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
