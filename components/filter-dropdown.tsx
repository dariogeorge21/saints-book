"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterDropdownProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  align?: "left" | "right";
}

/**
 * FilterDropdown
 *
 * Professional liturgical-themed filter dropdown component.
 * Replaces horizontal tag rows with a compact, accessible, mobile-friendly dropdown.
 */
export function FilterDropdown({
  label,
  value,
  options,
  onChange,
  icon: Icon = Filter,
  className,
  align = "left",
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const activeOption = options.find((opt) => opt.value === value);
  const isFiltered = value !== "ALL" && value !== "";

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block text-left", className)}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-[200] tracking-[0.16em] uppercase transition-all duration-200 cursor-pointer select-none",
          isFiltered
            ? "bg-[#433352] text-[#F8F6FA] border border-[#FF2477]/50 shadow-[0_0_12px_rgba(255,36,119,0.2)]"
            : "bg-[#352741] text-[#C2BDCE] hover:text-[#F8F6FA] hover:bg-[#433352] border border-[rgba(194,189,206,0.14)]"
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Icon
          className={cn(
            "w-3.5 h-3.5 stroke-[1.5]",
            isFiltered ? "text-[#FF2477]" : "text-[#C2BDCE]/60"
          )}
        />
        <span className="flex items-center gap-1.5">
          <span className="text-[#C2BDCE]/60 lowercase text-[11px] font-mono tracking-wider">
            {label}:
          </span>
          <span
            className={cn(
              "font-[300]",
              isFiltered ? "text-white font-[400]" : "text-[#F8F6FA]"
            )}
          >
            {activeOption?.label || value}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-[#C2BDCE]/60 transition-transform duration-200 stroke-[1.5]",
            isOpen && "rotate-180 text-[#FF2477]"
          )}
        />
      </button>

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label={label}
          className={cn(
            "absolute top-full mt-2 z-50 min-w-[200px] sm:min-w-[220px] max-w-[calc(100vw-24px)] max-h-72 overflow-y-auto rounded-xl bg-[#2D2138] border border-[rgba(194,189,206,0.18)] shadow-[0_20px_45px_rgba(0,0,0,0.6)] p-1.5 backdrop-blur-xl animate-in fade-in-0 zoom-in-95",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                className={cn(
                  "w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-xs font-[200] tracking-[0.14em] uppercase transition-colors text-left cursor-pointer",
                  isSelected
                    ? "bg-[#FF2477]/15 text-[#FF2477] font-[400]"
                    : "text-[#C2BDCE] hover:text-[#F8F6FA] hover:bg-[#433352]/70"
                )}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-[#FF2477] stroke-[2] shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
